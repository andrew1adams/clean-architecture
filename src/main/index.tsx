import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/router'
import { LoginComponent } from '@/main/factories'

ReactDOM.render(
  <Router login={<LoginComponent />} />,
  document.getElementById('main')
)
