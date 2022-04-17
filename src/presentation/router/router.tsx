import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from '@/presentation/pages'
import '@/presentation/styles/global.module.scss'

type MainRouterProps = {
  login: React.ReactElement
}

const Router: React.FC<MainRouterProps> = ({ login }: MainRouterProps) => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={login} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  </BrowserRouter>
)

export { Router }
