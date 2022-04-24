import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages'
import { LoginComponent, SignUpComponent } from '@/main/factories'
import { MainContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '@/main/adapters'

const Router: React.FC = () => (
  <MainContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/sign-up' element={<SignUpComponent />} />
        <Route path='/' element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  </MainContext.Provider>
)

export { Router }
