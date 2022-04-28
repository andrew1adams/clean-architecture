import React from 'react'

import { render } from '@testing-library/react'
import { Outlet, Router } from 'react-router-dom'

import { createMemoryHistory } from 'history'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { PrivateRoute } from '@/presentation/components'
import { MainContext } from '@/presentation/contexts'

type SutTypes = {
  history: ReturnType<typeof createMemoryHistory>
}

const SystemUnderTestCreator = (account: AccountModel = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <MainContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router navigator={history} location='/'>
        <PrivateRoute element={<Outlet />} />
      </Router>
    </MainContext.Provider>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('Should redirect to "/login" if token is empty', () => {
    const { history } = SystemUnderTestCreator(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render current component if token is not empty', () => {
    const { history } = SystemUnderTestCreator()
    expect(history.location.pathname).toBe('/')
  })
})
