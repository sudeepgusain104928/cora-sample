import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createAppStore } from '../store'

export function renderWithProviders(
  ui,
  {
    preloadedState,
    store = createAppStore(preloadedState),
    initialEntries = ['/'],
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    )
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
