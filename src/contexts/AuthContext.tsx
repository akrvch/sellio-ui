import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { GetCurrentUserQuery } from '@graphql/queries'
import { RequestAuthCodeMutation, VerifyAuthCodeMutation, CompleteProfileMutation, UpdateProfileMutation, LogoutMutation } from '@graphql/mutations'

export type User = {
  id: number
  phone: string
  firstName: string | null
  secondName: string | null
  lastName: string | null
  email: string | null
  isProfileCompleted: boolean
  isSuperuser: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  
  // Auth flow methods
  requestAuthCode: (phone: string) => Promise<{ status: string; message: string }>
  verifyAuthCode: (phone: string, code: string) => Promise<{
    status: string
    message: string
    profileRequired: boolean
  }>
  completeProfile: (data: {
    firstName: string
    secondName: string
    lastName: string
    email: string
  }) => Promise<{ status: string; message: string }>
  updateProfile: (data: {
    firstName?: string
    secondName?: string
    lastName?: string
    email?: string
  }) => Promise<{ status: string; message: string; missingFields?: string[] }>
  logout: () => Promise<void>
  
  // Utility
  refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Query current user
  const { data, loading, refetch } = useQuery(GetCurrentUserQuery, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all', // Don't throw errors, just return them in data
    onCompleted: (data) => {
      setUser(data?.currentUser || null)
      setIsInitialized(true)
    },
    onError: (error) => {
      // Silently handle error - user is just not authenticated
      console.log('User not authenticated:', error.message)
      setUser(null)
      setIsInitialized(true)
    },
  })

  // Mutations
  const [requestCodeMutation] = useMutation(RequestAuthCodeMutation)
  const [verifyCodeMutation] = useMutation(VerifyAuthCodeMutation)
  const [completeProfileMutation] = useMutation(CompleteProfileMutation)
  const [updateProfileMutation] = useMutation(UpdateProfileMutation)
  const [logoutMutation] = useMutation(LogoutMutation)

  useEffect(() => {
    setUser(data?.currentUser || null)
    if (!loading) {
      setIsInitialized(true)
    }
  }, [data, loading])

  const requestAuthCode = useCallback(
    async (phone: string) => {
      try {
        const { data } = await requestCodeMutation({
          variables: { phone },
        })
        return {
          status: data.requestAuthCode.status,
          message: data.requestAuthCode.message,
        }
      } catch (error: any) {
        throw new Error(error.message || 'Failed to request auth code')
      }
    },
    [requestCodeMutation]
  )

  const verifyAuthCode = useCallback(
    async (phone: string, code: string) => {
      try {
        const { data } = await verifyCodeMutation({
          variables: { phone, code },
        })
        
        const result = data.verifyAuthCode
        
        // If successful, refetch user data
        if (result.status === 'SUCCESS' || result.status === 'PROFILE_INFO_REQUIRED') {
          await refetch()
        }
        
        return {
          status: result.status,
          message: result.message,
          profileRequired: result.profileRequired,
        }
      } catch (error: any) {
        throw new Error(error.message || 'Failed to verify code')
      }
    },
    [verifyCodeMutation, refetch]
  )

  const completeProfile = useCallback(
    async (data: {
      firstName: string
      secondName: string
      lastName: string
      email: string
    }) => {
      try {
        const { data: responseData } = await completeProfileMutation({
          variables: data,
        })
        
        // Refetch user after profile completion
        await refetch()
        
        return {
          status: responseData.completeProfile.status,
          message: responseData.completeProfile.message,
        }
      } catch (error: any) {
        throw new Error(error.message || 'Failed to complete profile')
      }
    },
    [completeProfileMutation, refetch]
  )

  const updateProfile = useCallback(
    async (data: {
      firstName?: string
      secondName?: string
      lastName?: string
      email?: string
    }) => {
      try {
        const { data: responseData } = await updateProfileMutation({
          variables: data,
        })
        
        const result = responseData.updateProfile
        
        if (result.status === 'SUCCESS') {
          // Refetch user after profile update
          await refetch()
        }
        
        return {
          status: result.status,
          message: result.message,
          missingFields: result.missingFields,
        }
      } catch (error: any) {
        throw new Error(error.message || 'Failed to update profile')
      }
    },
    [updateProfileMutation, refetch]
  )

  const logout = useCallback(async () => {
    try {
      await logoutMutation()
      setUser(null)
      // Don't refetch after logout - user is already logged out
      // and the query would fail anyway
    } catch (error: any) {
      console.error('Logout error:', error)
      // Don't throw error on logout - just log it
      // User should still be logged out locally
      setUser(null)
    }
  }, [logoutMutation])

  const refetchUser = useCallback(async () => {
    await refetch()
  }, [refetch])

  const value: AuthContextType = {
    user,
    loading: loading || !isInitialized,
    isAuthenticated: !!user,
    requestAuthCode,
    verifyAuthCode,
    completeProfile,
    updateProfile,
    logout,
    refetchUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

