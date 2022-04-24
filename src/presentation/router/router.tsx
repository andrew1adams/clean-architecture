import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/presentation/styles/global.module.scss'
import { SurveyList } from '@/presentation/pages'

type RouterFactory = {
  login: React.ReactElement
  signUp: React.ReactElement
}

const Router: React.FC<RouterFactory> = (factory: RouterFactory) => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={factory.login} />
      <Route path='/sign-up' element={factory.signUp} />
      <Route path='/' element={<SurveyList />} />
    </Routes>
  </BrowserRouter>
)

export { Router }
