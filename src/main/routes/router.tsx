import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { LoginComponent, SignUpComponent } from '@/main/factories'
import { PrivateRoute } from '@/presentation/components'
import { MainContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => (
  <MainContext.Provider
    value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/sign-up' element={<SignUpComponent />} />
        <Route path='/' element={<PrivateRoute element={<SurveyList />} />} />
      </Routes>
    </BrowserRouter>
  </MainContext.Provider>
)

export { Router }
