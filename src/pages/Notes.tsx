import { type Component } from 'solid-js'

import Button from '../components/Button'
import Calendar from '../components/Calendar'
import Combobox from '../components/Combobox'

const Notes: Component = () => {
  return (
    <main class="flex flex-1 flex-col bg-[#fafafa]">
      <nav class="flex space-x-2 p-10">
        <Calendar />

        <Combobox />

        <Button>Filter</Button>
      </nav>
    </main>
  )
}

export default Notes
