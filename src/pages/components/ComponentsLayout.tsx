import { A } from '@solidjs/router'
import { For, ParentProps } from 'solid-js'
import Button from '../../components/Button'

const components = ['Button', 'Input']

export default function ComponentsLayout(props: ParentProps) {
  return (
    <div class="flex h-full flex-col">
      <nav class="flex justify-between bg-gray-200 px-10 py-4">
        <div class="space-x-4">
          <A href="/">Home</A>
        </div>
      </nav>

      <main class="flex flex-1 bg-gray-50 divide-x">
        <div class="flex flex-col space-y-2 w-64 p-10">
          <h3 class="text-sm text-gray-500 uppercase tracking-wider">
            Components
          </h3>

          <For each={components}>
            {(component) => (
              <A href={`/components/${component.toLowerCase()}`}>
                <Button class="w-full">{component}</Button>
              </A>
            )}
          </For>
        </div>

        <div class="flex flex-col space-y-2 p-10">{props.children}</div>
      </main>

      <footer class="flex justify-center bg-black p-4 text-white">2024</footer>
    </div>
  )
}
