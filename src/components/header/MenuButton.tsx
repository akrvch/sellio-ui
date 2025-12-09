import React from 'react'
import { useQuery } from '@apollo/client/react'
import { cn } from '@lib/cn'
import GetMenuQuery from '@graphql/queries/GetMenuQuery.graphql'

type Category = {
  key: string
  label: string
  icon: string
  url: string
}

type ChildCategory = {
  id: number
  name: string
  alias: string
  url: string
  childCategories?: ChildCategory[]
}

type MenuCategory = {
  id: number
  alias: string
  name: string
  url: string
  childCategories: ChildCategory[]
}

type MenuData = {
  menu: MenuCategory[]
}

// Мапінг іконок за id категорії (в порядку оригінальних моканих даних)
const ICON_MAP: Record<number, string> = {
  1: 'tech',
  2: 'beauty',
  3: 'clothes',
  4: 'auto',
  5: 'accessories',
  6: 'pets',
  7: 'kids',
  8: 'sport',
  9: 'office',
}

export default function MenuButton() {
  const { data, loading, error } = useQuery<MenuData>(GetMenuQuery)
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState<Category | null>(null)
  const [expandedMobile, setExpandedMobile] = React.useState<string | null>(null)
  const rootRef = React.useRef<HTMLButtonElement | null>(null)
  const menuRef = React.useRef<HTMLDivElement | null>(null)

  // Map GraphQL data to categories format
  const categories: Category[] = React.useMemo(() => {
    if (!data?.menu) return []
    return data.menu.map((item: MenuCategory) => ({
      key: item.alias,
      label: item.name,
      icon: `/icons/categories/${ICON_MAP[item.id] || item.alias}.svg`,
      url: item.url,
    }))
  }, [data])

  // Set first category as active when data loads
  React.useEffect(() => {
    if (categories.length > 0 && !active) {
      setActive(categories[0])
    }
  }, [categories, active])

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      // Only for desktop - check if click is outside both button and menu
      if (window.innerWidth >= 640) {
        const target = e.target as Node
        const isInsideButton = rootRef.current?.contains(target)
        const isInsideMenu = menuRef.current?.contains(target)
        
        if (!isInsideButton && !isInsideMenu) {
          setOpen(false)
        }
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])


  return (
    <>
      <button
        ref={rootRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => {
            const next = !v
            if (next && categories.length > 0) setActive(categories[0])
            return next
          })
        }}
        className={cn(
          'flex items-center gap-2 rounded bg-indigo-100 px-4 py-2 text-brand-black',
          'hover:bg-indigo-100/80 transition',
          'sm:px-4 px-3'
        )}
      >
        <img src="/icons/grid.svg" alt="" className="h-5 w-5" />
        <span className="font-semibold hidden sm:inline">Каталог</span>
      </button>

      {open && !loading && categories.length > 0 && active && (
        <>
          {/* Desktop Menu */}
          <div
            ref={menuRef}
            role="menu"
            className="hidden sm:block absolute left-0 right-0 top-full mt-4 z-50"
          >
            <div className="rounded border-2 border-indigo-600 bg-white shadow-lg p-8">
              <div className="flex h-[400px] overflow-hidden">
                <div className="w-72 border-r border-gray-200 pr-8 overflow-y-auto scrollbar-indigo">
                  <ul className="py-1">
                    {categories.map((c) => {
                      const isActive = c.key === active.key
                      return (
                        <li key={c.key}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(c)}
                            onClick={() => setActive(c)}
                            className={cn(
                              'w-full text-left flex items-center gap-3 rounded px-3 py-2 text-[16px] leading-[24px] text-brand-black',
                              isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'
                            )}
                          >
                            <img src={c.icon} alt="" className="h-5 w-5" />
                            <span>{c.label}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="flex-1 pl-4 overflow-y-auto pr-2 min-w-0 scrollbar-indigo">
                  <div className="grid grid-cols-3 gap-6 pb-2">
                    {data?.menu
                      .find((m: MenuCategory) => m.alias === active.key)
                      ?.childCategories.map((child: ChildCategory) => (
                        <div key={child.alias} className="min-w-0">
                          <div className="font-semibold mb-2 break-words">{child.name}</div>
                          {child.childCategories && child.childCategories.length > 0 ? (
                            <>
                              <ul className="space-y-2">
                                {child.childCategories.map((subChild: ChildCategory) => (
                                  <li key={subChild.alias}>
                                    <a
                                      href={subChild.url}
                                      className="text-brand-black hover:underline break-words"
                                    >
                                      {subChild.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              <a
                                href={child.url}
                                className="mt-2 block text-indigo-600 hover:underline break-words"
                              >
                                Дивитися більше
                              </a>
                            </>
                          ) : (
                            <a
                              href={child.url}
                              className="text-brand-black hover:underline break-words"
                            >
                              Дивитися всі
                            </a>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Full Screen */}
          <div
            role="menu"
            className="sm:hidden fixed inset-0 z-50 bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <div className="flex items-center gap-2">
                <img src="/icons/grid.svg" alt="" className="h-6 w-6" />
                <span className="text-lg font-semibold">Каталог</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
                aria-label="Закрити"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Categories List */}
            <div className="px-4 py-2">
              {categories.map((c) => {
                const isExpanded = expandedMobile === c.key
                const childCategories =
                  data?.menu.find((m: MenuCategory) => m.alias === c.key)?.childCategories || []

                return (
                  <div key={c.key}>
                    <button
                      type="button"
                      onClick={() => setExpandedMobile(isExpanded ? null : c.key)}
                      className={cn(
                        'w-full flex items-center gap-3 rounded px-3 py-3 text-left',
                        isExpanded ? 'bg-indigo-50' : ''
                      )}
                    >
                      <img src={c.icon} alt="" className="h-6 w-6" />
                      <span className="text-base font-normal text-brand-black">{c.label}</span>
                    </button>

                    {/* Expanded Subcategories */}
                    {isExpanded && childCategories.length > 0 && (
                      <div className="px-3 pb-4 pt-2 space-y-4">
                        {childCategories.map((child: ChildCategory) => (
                          <div key={child.alias}>
                            <div className="font-semibold text-base text-brand-black mb-3">
                              {child.name}
                            </div>
                            {child.childCategories && child.childCategories.length > 0 ? (
                              <>
                                <ul className="space-y-3">
                                  {child.childCategories.map((subChild: ChildCategory) => (
                                    <li key={subChild.alias}>
                                      <a
                                        href={subChild.url}
                                        className="text-base text-gray-400 hover:text-indigo-600"
                                        onClick={() => setOpen(false)}
                                      >
                                        {subChild.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                                <a
                                  href={child.url}
                                  className="mt-3 inline-block text-base text-indigo-600 hover:underline"
                                  onClick={() => setOpen(false)}
                                >
                                  Дивитися більше
                                </a>
                              </>
                            ) : (
                              <a
                                href={child.url}
                                className="text-base text-gray-400 hover:text-indigo-600 block"
                                onClick={() => setOpen(false)}
                              >
                                Дивитися всі
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}