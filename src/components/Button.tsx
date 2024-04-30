import { type JSX } from 'solid-js'

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

export default function Button(props: Props) {
  return (
    <button
      {...props}
      class={`flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm text-white shadow hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none ${props.class ?? ''}`}
    >
      {props.children}
    </button>
  )
}
