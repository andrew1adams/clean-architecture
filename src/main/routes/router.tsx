import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages'
import { LoginComponent, SignUpComponent } from '@/main/factories'

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginComponent />} />
      <Route path='/sign-up' element={<SignUpComponent />} />
      <Route path='/' element={<SurveyList />} />
    </Routes>
  </BrowserRouter>
)

export { Router }
