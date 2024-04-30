import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from 'date-fns'
import { For, Show, createSignal, type Component } from 'solid-js'
import Button from './Button'

const Calendar: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  const [monthString, setMonthString] = createSignal(
    format(new Date(), 'yyyy-MM')
  )
  const [isStartDate, setIsStartDate] = createSignal(true)
  const [startDate, setStartDate] = createSignal(subYears(new Date(), 30))
  const [endDate, setEndDate] = createSignal(new Date())

  function month() {
    return parse(monthString(), 'yyyy-MM', new Date())
  }

  function nextMonth() {
    const next = addMonths(month(), 1)

    setMonthString(format(next, 'yyyy-MM'))
  }

  function previousMonth() {
    const previous = subMonths(month(), 1)

    setMonthString(format(previous, 'yyyy-MM'))
  }

  function days() {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(month())),
      end: endOfWeek(endOfMonth(month())),
    })
  }

  function handleDaySelection(day: Date) {
    if (isStartDate()) {
      setStartDate(day)
    } else {
      setEndDate(day)
    }

    setIsStartDate((isStartDate) => !isStartDate)
  }

  return (
    <div class="relative flex">
      <button
        class="flex h-10 w-72 shrink-0 items-center justify-between space-x-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-light shadow-sm hover:bg-gray-50"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <svg
          class="h-4 w-4 text-current"
          fill="none"
          height="24"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          width="24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <path d="M16 2v4"></path>
          <path d="M8 2v4"></path>
          <path d="M3 10h18"></path>
        </svg>

        <div>
          {format(startDate(), 'MMM dd, yyyy')} -{' '}
          {format(endDate(), 'MMM dd, yyyy')}
        </div>

        <svg
          class={`right-3 h-[18px] w-[18px] transform text-current transition-transform ${
            isOpen() ? 'rotate-180' : ''
          }`}
          fill="none"
          height="24"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </button>

      <Show when={isOpen()}>
        <div class="absolute left-0 top-12 w-72 rounded border border-gray-300 bg-white text-sm shadow-sm">
          <header class="flex h-10 items-center justify-between px-4">
            <div class="font-medium">{format(month(), 'MMMM yyyy')}</div>

            <div class="flex items-center space-x-4">
              <button onClick={previousMonth}>
                <svg
                  class="h-4 w-4 text-gray-500 hover:text-black"
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M15 18l-6-6 6-6"></path>
                </svg>
              </button>

              <button onClick={nextMonth}>
                <svg
                  class="h-4 w-4 text-gray-500 hover:text-black"
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </header>

          <hr />

          <div class="grid grid-cols-7 justify-items-center px-1 pt-2 text-xs font-medium text-black/30">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          <div class="grid grid-cols-7 justify-items-center gap-y-1 px-1 pt-2 font-light">
            <For each={days()}>
              {(day) => (
                <button
                  class={`flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-200 hover:text-black 
                  ${isToday(day) ? 'bg-rose-600 text-white' : ''}
                  ${isSameMonth(day, month()) ? '' : 'text-black/20'}
                  `}
                  onClick={() => handleDaySelection(day)}
                >
                  {format(day, 'd')}
                </button>
              )}
            </For>
          </div>

          <hr class="mt-2" />

          <form
            class="p-4"
            onSubmit={(event: SubmitEvent) => {
              event.preventDefault()

              const startDate = event.target?.startDate.value
              const endDate = event.target?.endDate.value

              console.log(event.target.startDate.value)
            }}
          >
            <div class="flex items-center space-x-4">
              <label class="w-12 text-sm font-light text-black/70">Start</label>

              <div class="relative">
                <Show when={isStartDate()}>
                  <div class="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-600" />
                </Show>

                <input
                  name="startDate"
                  class="flex h-10 w-full rounded border border-gray-300 text-sm font-light shadow-sm"
                  value={format(startDate(), 'MMM dd, yyyy')}
                />
              </div>
            </div>

            <div class="mt-2 flex items-center justify-between space-x-4">
              <label class="w-12 text-sm font-light text-black/70">End</label>

              <div class="relative">
                <Show when={!isStartDate()}>
                  <div class="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-600" />
                </Show>

                <input
                  name="endDate"
                  class="flex h-10 w-full rounded border border-gray-300 text-sm font-light shadow-sm"
                  value={format(endDate(), 'MMM dd, yyyy')}
                />
              </div>
            </div>

            <Button class="mt-4 w-full">Apply</Button>
          </form>
        </div>
      </Show>
    </div>
  )
}

export default Calendar
