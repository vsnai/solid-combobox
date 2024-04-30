import { Show, type Component } from 'solid-js'
import { useUser } from '../contexts/User'

const AccountDashboard: Component = () => {
  const { user } = useUser()

  return (
    <div class="flex flex-col bg-gray-200 rounded p-4 w-64">
      <Show when={user() !== null} fallback={<>User not found</>}>
        <div>{user()?.email.toUpperCase()}</div>
      </Show>
    </div>
  )
}

export default AccountDashboard
