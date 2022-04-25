import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { PrivateRoute } from '@/presentation/components'

describe('', () => {
  test('Should redirect to "/login" if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router navigator={history} location='/'>
        <PrivateRoute />
      </Router>
    )

    expect(history.location.pathname).toBe('/login')
  })
})
