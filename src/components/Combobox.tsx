import { type Component } from 'solid-js'

const Combobox: Component = () => {
  return (
    <div class="relative flex w-full items-center">
      {/* <svg
        class="pointer-events-none absolute left-3 h-[18px] w-[18px] text-current"
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
        <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path>
        <path d="M16 16l4.5 4.5"></path>
      </svg> */}

      <svg
        class="pointer-events-none absolute left-3 h-4 w-4 text-current"
        height="16"
        stroke-linejoin="round"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
          fill="currentColor"
        ></path>
      </svg>

      <input
        class="flex h-10 w-full items-center justify-between space-x-2 rounded border border-gray-300 bg-white px-8 py-2 text-sm font-light shadow-sm placeholder:text-black/25 focus:border-black/75 focus:outline-none focus:ring-2 focus:ring-black/25 focus:ring-offset-1 active:ring-black/30"
        placeholder="All Activity Codes"
      />

      <svg
        class="pointer-events-none absolute right-3 h-[18px] w-[18px] text-current"
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
    </div>
  )
}

export default Combobox
