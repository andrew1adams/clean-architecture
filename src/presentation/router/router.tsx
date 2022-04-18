import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from '@/presentation/pages'
import '@/presentation/styles/global.module.scss'

type RouterFactory = {
  login: React.ReactElement
  signUp: React.ReactElement
}

const Router: React.FC<RouterFactory> = (factory: RouterFactory) => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={factory.login} />
      <Route path='/sign-up' element={factory.signUp} />
    </Routes>
  </BrowserRouter>
)

export { Router }
