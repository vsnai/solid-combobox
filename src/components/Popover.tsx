import {
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type Component,
} from 'solid-js'

import Button from './Button'

const Popover: Component = () => {
  let triggerRef: HTMLButtonElement | undefined
  let popoverRef: HTMLDivElement | undefined

  const [isOpen, setIsOpen] = createSignal(false)

  function handleOutsideClick(event: MouseEvent) {
    if (
      triggerRef &&
      popoverRef &&
      !triggerRef.contains(event.target as Node) &&
      !popoverRef.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  function handleKeyDownForPopover(event: KeyboardEvent) {
    const { key } = event

    if (key === 'Escape') {
      setIsOpen(false)
    }
  }

  createEffect(() => {
    if (isOpen() && popoverRef) {
      const q = 'input, textarea, select, button, [href]'
      const el = popoverRef.querySelector(q) as HTMLElement | null

      el?.focus()
    }
  })

  onMount(() => {
    window.addEventListener('mousedown', handleOutsideClick)
  })

  onCleanup(() => {
    window.removeEventListener('mousedown', handleOutsideClick)
  })

  return (
    <div class="flex relative">
      <Button ref={triggerRef} onClick={() => setIsOpen((isOpen) => !isOpen)}>
        Trigger
      </Button>

      <Show when={isOpen()}>
        <div
          ref={popoverRef}
          class="absolute z-10 flex justify-center p-4 left-0 top-12 bg-white border border-gray-100 rounded shadow"
          tabindex="-1"
          onKeyDown={handleKeyDownForPopover}
        >
          <input />

          <Button>Submit</Button>
        </div>
      </Show>
    </div>
  )
}

export default Popover
