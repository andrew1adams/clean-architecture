import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/presentation/styles/global.module.scss'

type MainRouterProps = {
  login: React.ReactElement
}

const Router: React.FC<MainRouterProps> = ({ login }: MainRouterProps) => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={login} />
    </Routes>
  </BrowserRouter>
)

export { Router }
