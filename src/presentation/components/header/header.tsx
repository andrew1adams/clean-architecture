import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import styles from './header.module.scss'

const { headerWrapper, headerContent, logoutWrapper } = styles

const Header: React.FC = memo(() => {
  return (
    <header className={headerWrapper}>
      <div className={headerContent}>
        <Logo />
        <div className={logoutWrapper}>
          <span>Username</span>
          <a href='#'>Sair</a>
        </div>
      </div>
    </header>
  )
})

export { Header }
