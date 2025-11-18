import React from 'react'
import { cn } from '@lib/cn'

export type CategoryItem = {
  id: string
  label: string
  icon?: string // path to svg
}

export type MenuButtonProps = {
  className?: string
  categories?: CategoryItem[]
}

const defaultCategories: CategoryItem[] = [
  { id: 'tech', label: 'Техніка та електроніка', icon: '/icons/categories/tech.svg' },
  { id: 'beauty', label: 'Краса та здоровʼя', icon: '/icons/categories/beauty.svg' },
  { id: 'clothes', label: 'Одяг та взуття', icon: '/icons/categories/clothes.svg' },
  { id: 'auto', label: 'Все для авто', icon: '/icons/categories/auto.svg' },
  { id: 'accessories', label: 'Аксесуари та прикраси', icon: '/icons/categories/accessories.svg' },
  { id: 'pets', label: 'Зоотовари', icon: '/icons/categories/pets.svg' },
  { id: 'kids', label: 'Товари для дітей', icon: '/icons/categories/kids.svg' },
  { id: 'sport', label: 'Спорт та відпочинок', icon: '/icons/categories/sport.svg' },
  { id: 'office', label: 'Канцелярія та книги', icon: '/icons/categories/office.svg' },
]

export default function MenuButton({ className, categories = defaultCategories }: MenuButtonProps) {
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className={cn('relative', className)} ref={rootRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded bg-indigo-100 px-4 py-2 text-brand-black hover:bg-indigo-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
      >
        <img src="/icons/grid.svg" alt="" className="h-5 w-5" />
        Каталог
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 z-50 mt-2 w-80 rounded border border-gray-200 bg-white p-2 shadow-lg"
        >
          <ul className="max-h-[60vh] overflow-auto">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded px-3 py-2 text-[16px] leading-[24px] text-brand-black hover:bg-gray-50"
                  role="menuitem"
                >
                  <img
                    src={c.icon || '/icons/categories/default.svg'}
                    alt=""
                    className="h-5 w-5 shrink-0"
                  />
                  <span>{c.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


