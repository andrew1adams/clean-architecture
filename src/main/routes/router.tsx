import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages'
import { LoginComponent, SignUpComponent } from '@/main/factories'
import { MainContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { PrivateRoute } from '@/presentation/components'

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
