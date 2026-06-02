import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { createAppStore } from '@/store'

export { centeredParameters, fullscreenParameters } from '../parameters'

export function withReduxProvider(Story, context) {
  const preloadedState = context.parameters?.redux?.preloadedState
  const store = useMemo(
    () => createAppStore(preloadedState),
    // context.storyId ensures the store resets when the active story changes
    [context.storyId, preloadedState],
  )

  return (
    <Provider store={store}>
      <Story />
    </Provider>
  )
}

export function padded(Story) {
  return (
    <div className="w-full max-w-4xl p-8">
      <Story />
    </div>
  )
}

export function fullscreen(Story) {
  return (
    <div className="min-h-screen w-full">
      <Story />
    </div>
  )
}

export function onBlueBackground(Story) {
  return (
    <div className="w-full bg-cora-blue p-10">
      <Story />
    </div>
  )
}
