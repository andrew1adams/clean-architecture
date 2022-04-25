import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { PrivateRoute } from '@/presentation/components'

type SutTypes = {
  history: ReturnType<typeof createMemoryHistory>
}

const SystemUnderTestCreator = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router navigator={history} location='/'>
      <PrivateRoute />
    </Router>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('Should redirect to "/login" if token is empty', () => {
    const { history } = SystemUnderTestCreator()
    expect(history.location.pathname).toBe('/login')
  })
})
