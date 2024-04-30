import { Route, Router } from '@solidjs/router'
import { render } from 'solid-js/web'

import { UserProvider } from './contexts/User'
import './index.css'
import AccountDashboard from './pages/AccountDashboard'
import CommandPalette from './pages/CommandPalette'
import Search from './pages/Search'
import PopoverPage from './pages/PopoverPage'
import Notes from './pages/Notes'

import ButtonPage from './pages/components/ButtonPage'
import InputPage from './pages/components/InputPage'
import ComponentsLayout from './pages/components/ComponentsLayout'

render(
  () => (
    <UserProvider>
      <Router>
        <Route path="/account-dashboard" component={AccountDashboard} />
        <Route path="/cmd" component={CommandPalette} />
        <Route path="/components/popover" component={PopoverPage} />
        <Route path="/notes" component={Notes} />
        <Route path="/search" component={Search} />

        <Route path="/components" component={ComponentsLayout}>
          <Route path="/button" component={ButtonPage} />
          <Route path="/input" component={InputPage} />
        </Route>

        {/* <Route path="/" component={Home} /> */}

        <Route path="*404" component={() => <>404</>} />
      </Router>
    </UserProvider>
  ),
  document.getElementById('app')!,
)
