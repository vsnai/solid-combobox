import {
  For,
  Match,
  Show,
  Switch,
  createSignal,
  type Component,
} from 'solid-js'

type Account = {
  id: string
  borrower: string
  coBorrower: string
}

type SearchTypeOption = {
  id: string
  display: string
}

const database: Account[] = [
  { id: '111', borrower: 'john', coBorrower: 'jane' },
  { id: '222', borrower: 'foo', coBorrower: 'bar' },
]

const searchTypeOptions: SearchTypeOption[] = [
  { id: 'id', display: 'ID' },
  { id: 'ssn', display: 'SSN' },
]

const Search: Component = () => {
  let inputRef!: HTMLInputElement

  const [search, setSearch] = createSignal('')
  const [searchType, setSearchType] = createSignal(searchTypeOptions[0].id)

  function isValid() {
    if (searchType() === 'id') {
      return search().length === 3
    }

    if (searchType() === 'ssn') {
      return search().length === 4
    }

    return false
  }

  const [isLoading, setIsLoading] = createSignal(false)
  const [account, setAccount] = createSignal<Account>()
  const [error, setError] = createSignal<string>()

  const handleChange = ({ target }: Event) => {
    if (target instanceof HTMLSelectElement) {
      setSearchType(target.value)
    }
  }

  async function handleSearch(event: Event) {
    event.preventDefault()

    setIsLoading(true)
    setAccount()
    setError()

    await new Promise((r) => setTimeout(r, 1000))

    const result = database.find(({ id }) => id === search())

    setIsLoading(false)
    inputRef.focus()

    if (!result) {
      setError('No account was found.')

      return
    }

    setAccount(result)
  }

  return (
    <>
      <div class="flex flex-col">
        <form onSubmit={handleSearch}>
          <fieldset
            class={`${isLoading() ? 'opacity-70' : ''} flex space-x-4`}
            disabled={isLoading()}
          >
            <select value={searchType()} onChange={handleChange}>
              <For each={searchTypeOptions}>
                {(option) => (
                  <option value={option.id}>{option.display}</option>
                )}
              </For>
            </select>

            <input
              class={`flex-1 ${
                isValid()
                  ? 'border-lime-700 focus:border-lime-700 focus:ring-lime-700'
                  : 'border-rose-600 focus:border-rose-600 focus:ring-rose-600'
              }`}
              type={searchType() === 'ssn' ? 'password' : 'text'}
              value={search()}
              onInput={(e) => setSearch(e.target.value)}
              autofocus
              ref={inputRef}
            />

            <button class="px-4 font-medium bg-gray-900 text-white">
              Search
            </button>
          </fieldset>
        </form>
      </div>

      <Show when={isLoading() || error() || account()}>
        <div class="flex flex-col p-4 bg-gray-200">
          <Switch>
            <Match when={isLoading()}>Loading...</Match>
            <Match when={error()}>{error()}</Match>
            <Match when={account()}>
              <div>Borrower: {account()?.borrower}</div>

              <div>Co-Borrower: {account()?.coBorrower}</div>
            </Match>
          </Switch>
        </div>
      </Show>
    </>
  )
}

export default Search
