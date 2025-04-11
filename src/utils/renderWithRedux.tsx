import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../store'
import { FC, PropsWithChildren } from 'react'


export const renderWithRedux = (component: React.ReactNode, options?: RenderOptions) => {
  const store = setupStore()

  const Providers: FC<PropsWithChildren> = ({children}) => <Provider store={store}>{children}</Provider>

  return  (
    render(component, {
      wrapper: Providers,
      ...options
    })
  )
}