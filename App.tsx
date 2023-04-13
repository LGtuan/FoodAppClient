import React from 'react'
import RootNavigation from './src/navigations'
import { Provider } from 'react-redux'
import { store } from './src/redux'

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  )
}

export default App