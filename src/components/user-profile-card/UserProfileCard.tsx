import React from 'react'
import { Text } from '@ui'
import type { User } from '@contexts'

interface UserProfileCardProps {
  user: User
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        {/* Avatar with initials or ? */}
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <Text variant="title-3" className="text-indigo-600 font-bold">
            {user.firstName && user.lastName
              ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
              : '?'}
          </Text>
        </div>
        
        {/* User name and phone */}
        <div className="flex-1 min-w-0 flex flex-col">
          <Text variant="body-1" className="font-semibold truncate">
            {user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : 'Новий користувач'}
          </Text>
          <Text variant="body-2" color="muted" className="truncate">
            {user.phone}
          </Text>
        </div>
      </div>
    </div>
  )
}

