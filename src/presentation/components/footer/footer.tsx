import React, { memo } from 'react'
import Styles from './footer.module.scss'

const { footer } = Styles

const Footer: React.FC = memo(() => <footer className={footer}></footer>)

export { Footer }
