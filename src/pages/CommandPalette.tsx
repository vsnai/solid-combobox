import { For, Show, createEffect, createSignal, type Component } from 'solid-js'

type Item = {
  id: string
  value: string
}

const options: Item[] = [
  { id: 'at', value: 'Austria' },
  { id: 'be', value: 'Belgium' },
  { id: 'bg', value: 'Bulgaria Bulgaria Bulgaria' },
  { id: 'hr', value: 'Croatia' },
  { id: 'cy', value: 'Cyprus' },
  { id: 'cz', value: 'Czechia' },
  { id: 'dk', value: 'Denmark' },
  { id: 'ee', value: 'Estonia' },
  { id: 'fi', value: 'Finland' },
  { id: 'fr', value: 'France' },
  { id: 'de', value: 'Germany' },
  { id: 'el', value: 'Greece' },
  { id: 'hu', value: 'Hungary' },
  { id: 'is', value: 'Iceland' },
  { id: 'ie', value: 'Ireland' },
  { id: 'it', value: 'Italy' },
  { id: 'lv', value: 'Latvia' },
  { id: 'li', value: 'Liechtenstein' },
  { id: 'lt', value: 'Lithuania' },
  { id: 'lu', value: 'Luxembourg' },
  { id: 'mt', value: 'Malta' },
  { id: 'nl', value: 'Netherlands' },
  { id: 'no', value: 'Norway' },
  { id: 'pl', value: 'Poland' },
  { id: 'pt', value: 'Portugal' },
  { id: 'ro', value: 'Romania' },
  { id: 'sk', value: 'Slovakia' },
  { id: 'si', value: 'Slovenia' },
  { id: 'es', value: 'Spain' },
  { id: 'se', value: 'Sweden' },
  { id: 'ch', value: 'Switzerland' },
]

const CommandPalette: Component = () => {
  let inputRef: HTMLInputElement

  const [selected, setSelected] = createSignal<Item>()
  const [isOpen, setIsOpen] = createSignal(false)
  const [searchQuery, setSearchQuery] = createSignal('')
  const [hoverIndex, setHoverIndex] = createSignal(0)

  createEffect(() => {
    if (isOpen()) {
      inputRef.focus()

      if (selected()) {
        document.querySelector('#' + selected()!.id)!.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    } else {
      setHoverIndex(0)
      setSearchQuery('')
    }
  })

  function filteredOptions() {
    return options.filter(({ id, value }) => {
      const s = searchQuery().toLowerCase()

      return id.toLowerCase().includes(s) || value.toLowerCase().includes(s)
    })
  }

  function handleInputKey(event: KeyboardEvent) {
    const { key } = event

    if (key === 'Escape') {
      setIsOpen(false)
    }

    if (key === 'ArrowDown') {
      if (hoverIndex() >= filteredOptions().length - 1) {
        setHoverIndex(0)
      } else {
        setHoverIndex(hoverIndex() + 1)
      }
    }

    if (key === 'ArrowUp') {
      event.preventDefault()

      if (hoverIndex() <= 0) {
        setHoverIndex(filteredOptions().length - 1)
      } else {
        setHoverIndex(hoverIndex() - 1)
      }
    }

    if (key === 'Enter') {
      const result = filteredOptions()[hoverIndex()]

      setSelected(result)
      setIsOpen(false)
    }
  }

  return (
    <>
      <form>
        <input type="radio" value="1" />
      </form>

      <div class="flex space-x-2">
        <div class="flex relative">
          <button
            class={`flex items-center px-4 py-2 w-64 border rounded hover:bg-gray-100 ${
              selected() === undefined && 'text-gray-500'
            }`}
            onClick={() => setIsOpen(!isOpen())}
          >
            {selected() ? selected()!.value : 'Search for a country...'}
          </button>

          <Show when={isOpen()}>
            <div class="absolute mt-12 w-64 border-gray-200 border rounded shadow-md">
              <div class="flex items-center px-4">
                <svg
                  class="w-4 h-4 shrink-0 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>

                <input
                  ref={(el) => (inputRef = el)}
                  type="text"
                  class="w-48 py-2 border-none focus:ring-0"
                  placeholder="Search ..."
                  value={searchQuery()}
                  onInput={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleInputKey}
                  onBlur={() => setIsOpen(false)}
                />
              </div>

              <hr class="border-gray-200" />

              <Show
                when={filteredOptions().length > 0}
                fallback={
                  <div class="flex justify-center text-slate-700 text-sm px-4 py-3">
                    No country found ...
                  </div>
                }
              >
                <div
                  class="flex flex-col max-h-64 overflow-auto p-1"
                  tabIndex="-1"
                >
                  <For each={filteredOptions()}>
                    {({ id, value }, index) => (
                      <button
                        tabIndex="-1"
                        id={id}
                        class={`flex items-center px-3 py-2 hover:bg-gray-200 rounded text-left ${
                          hoverIndex() === index() ? 'bg-gray-100' : ''
                        }`}
                        onMouseDown={() => {
                          setSelected(options.find((c) => c.id === id))

                          setIsOpen(false)
                        }}
                      >
                        <span class="flex items-center justify-center mr-2 w-8 h-6 text-xs text-white bg-gray-800 rounded">
                          {id}
                        </span>

                        <span class="flex-1 truncate">{value}</span>

                        <Show when={value === selected()?.value}>
                          <span class="flex justify-center items-center w-8">
                            ✓
                          </span>
                        </Show>
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          </Show>
        </div>

        <button class="inline-flex items-center justify-center px-4 py-2 bg-black text-white whitespace-nowrap rounded-md text-sm font-medium shadow hover:bg-black/90">
          Filter
        </button>
      </div>
    </>
  )
}

export default CommandPalette
