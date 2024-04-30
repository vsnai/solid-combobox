import { ParentProps, createContext, createSignal, useContext } from 'solid-js'

export type User = {
  id: number
  email: string
}

const UserContext = createContext<{
  user: () => User | null
  login: (user: User) => void
  logout: () => void
}>()

export function UserProvider(props: ParentProps) {
  const [user, setUser] = createSignal<User | null>(null)

  return (
    <UserContext.Provider
      value={{
        user: () => user(),
        login: (user: User) => setUser(user),
        logout: () => setUser(null),
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
