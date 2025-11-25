import React from 'react'
import { cn } from '@lib/cn'

type Category = {
  key: string
  label: string
  icon: string // path to icon
}

const CATEGORIES: Category[] = [
  { key: 'tech', label: 'Техніка та електроніка', icon: '/icons/categories/tech.svg' },
  { key: 'beauty', label: 'Краса та здоровʼя', icon: '/icons/categories/beauty.svg' },
  { key: 'clothes', label: 'Одяг та взуття', icon: '/icons/categories/clothes.svg' },
  { key: 'auto', label: 'Все для авто', icon: '/icons/categories/auto.svg' },
  { key: 'accessories', label: 'Аксесуари та прикраси', icon: '/icons/categories/accessories.svg' },
  { key: 'pets', label: 'Зоотовари', icon: '/icons/categories/pets.svg' },
  { key: 'kids', label: 'Товари для дітей', icon: '/icons/categories/kids.svg' },
  { key: 'sport', label: 'Спорт та відпочинок', icon: '/icons/categories/sport.svg' },
  { key: 'office', label: 'Канцелярія та книги', icon: '/icons/categories/office.svg' },
]

type SubSection = { title: string; items: string[] }
type SubMap = Record<string, SubSection[]>

const SUBCATEGORIES: SubMap = {
  tech: [
    { title: 'Аудіо техніка та аксесуари', items: ['Навушники та гарнітури', 'Кабелі для електроніки', 'Портативні колонки', 'Акустичні системи', 'Плеєри MP3, MP4'] },
    { title: 'Телефони та аксесуари', items: ['Мобільні телефони, смартфони', 'Годинники та фітнес браслети', 'Аксесуари для мобільних телефонів', 'Комплектуючі', 'Стаціонарні телефони'] },
    { title: 'Зарядні станції та павербанки', items: ['Павербанки', 'Комплектуючі для павербанків', 'Зарядні станції'] },
  ],
  beauty: [
    { title: 'Краса та здоровʼя', items: ['Догляд за волоссям', 'Стайлери', 'Епілятори', 'Масажери', 'Ваги'] },
  ],
  clothes: [
    { title: 'Одяг', items: ['Чоловічий одяг', 'Жіночий одяг', 'Взуття', 'Аксесуари'] },
  ],
  auto: [
    { title: 'Авто', items: ['Автоаксесуари', 'Електроніка для авто', 'Шини та диски', 'Запчастини'] },
  ],
  accessories: [
    { title: 'Прикраси', items: ['Годинники', 'Сережки', 'Каблучки', 'Браслети'] },
  ],
  pets: [
    { title: 'Зоотовари', items: ['Корма', 'Лотки та наповнювачі', 'Аксесуари', 'Ласощі'] },
  ],
  kids: [
    { title: 'Для дітей', items: ['Іграшки', 'Дитячий транспорт', 'Догляд та гігієна', 'Коляски та автокрісла'] },
  ],
  sport: [
    { title: 'Спорт', items: ['Фітнес', 'Туризм', 'Велоспорт', 'Спортивний одяг'] },
  ],
  office: [
    { title: 'Канцелярія та книги', items: ['Ноутбуки та аксесуари', 'Книги', 'Рюкзаки та сумки', 'Офісна техніка'] },
  ],
}

export default function MenuButton() {
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState<Category>(CATEGORIES[0])
  const [expandedMobile, setExpandedMobile] = React.useState<string | null>(null)
  const rootRef = React.useRef<HTMLButtonElement | null>(null)
  const menuRef = React.useRef<HTMLDivElement | null>(null)

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
            if (next) setActive(CATEGORIES[0])
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

      {open && (
        <>
          {/* Desktop Menu */}
          <div
            ref={menuRef}
            role="menu"
            className="hidden sm:block absolute left-0 right-0 top-full mt-4 z-50"
          >
            <div className="rounded border-2 border-indigo-600 bg-white shadow-lg p-8">
              <div className="flex">
                <div className="w-72 border-r border-gray-200 pr-8">
                  <ul className="max-h-[60vh] overflow-auto py-1">
                    {CATEGORIES.map((c) => {
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
                <div className="flex-1 pl-4">
                  <div className="grid grid-cols-3 gap-6 max-h-[60vh] overflow-auto pr-2">
                    {(SUBCATEGORIES[active.key] || []).map((sec) => (
                      <div key={sec.title}>
                        <div className="font-semibold mb-2">{sec.title}</div>
                        <ul className="space-y-2">
                          {sec.items.map((item) => (
                            <li key={item}>
                              <a href="#" className="text-brand-black hover:underline">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <a href="#" className="mt-2 inline-block text-indigo-600 hover:underline">
                          Дивитися більше
                        </a>
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
              {CATEGORIES.map((c) => {
                const isExpanded = expandedMobile === c.key
                const subs = SUBCATEGORIES[c.key] || []
                
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
                    {isExpanded && (
                      <div className="px-3 pb-4 pt-2 space-y-4">
                        {subs.map((sec) => (
                          <div key={sec.title}>
                            <div className="font-semibold text-base text-brand-black mb-3">
                              {sec.title}
                            </div>
                            <ul className="space-y-3">
                              {sec.items.map((item) => (
                                <li key={item}>
                                  <a
                                    href="#"
                                    className="text-base text-gray-400 hover:text-indigo-600"
                                    onClick={() => setOpen(false)}
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                            <a
                              href="#"
                              className="mt-3 inline-block text-base text-indigo-600 hover:underline"
                              onClick={() => setOpen(false)}
                            >
                              Дивитися більше
                            </a>
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