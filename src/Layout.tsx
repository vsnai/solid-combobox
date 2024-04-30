import { A } from '@solidjs/router'
import { ParentProps, Show, type Component } from 'solid-js'
import { useUser } from './contexts/User'

const Layout: Component = (props: ParentProps) => {
  const { user, login, logout } = useUser()

  function handleLogin() {
    login({ id: 5, email: 'john@example.com' })
  }

  return (
    <div class="flex h-full flex-col">
      <nav class="flex justify-between bg-gray-200 px-10 py-4">
        <div class="space-x-4">
          <A href="/">Home</A>
        </div>

        <div>
          <Show
            when={user() !== null}
            fallback={<button onClick={handleLogin}>Login</button>}
          >
            <button onClick={logout}>Logout</button>
          </Show>
        </div>
      </nav>

      {props.children}

      <footer class="flex justify-center bg-gray-900 p-4 text-white">
        2024
      </footer>
    </div>
  )
}

export default Layout
