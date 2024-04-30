import { createSignal } from 'solid-js'
import Input from '../../components/Input'

export default function InputPage() {
  const [username, setUsername] = createSignal('')

  return (
    <>
      <h3 class="text-sm text-gray-500 uppercase tracking-wider">Input</h3>

      <Input
        id="username"
        input={username}
        setInput={setUsername}
        placeholder="Username"
      />
    </>
  )
}
