import { type Accessor, type JSX, type Setter } from 'solid-js'

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  input: Accessor<string>
  setInput: Setter<string>
}

export default function Input(props: Props) {
  return (
    <input
      {...props}
      class={`h-10 w-full rounded-md border-gray-300 bg-gray-50 text-sm transition duration-150 placeholder:text-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 ${
        props.class ?? ''
      }`}
      value={props.input()}
      onInput={(event) => props.setInput(() => event.target.value)}
    />
  )
}
