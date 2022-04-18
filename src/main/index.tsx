import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/router'
import { LoginComponent, SignUpComponent } from '@/main/factories'

ReactDOM.render(
  <Router login={<LoginComponent />} signUp={<SignUpComponent />} />,
  document.getElementById('main')
)
