import React, { useContext } from 'react'

import { SurveyContext } from '@/presentation/contexts'

import styles from './survey-error.module.scss'

const { errorWrapper } = styles

const SurveyError: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  const handleReload = (): void => {
    setState({
      surveys: [],
      error: '',
      isReload: !state.isReload
    })
  }

  return (
    <div className={errorWrapper}>
      <span data-testid='error-wrapper'>{state.error}</span>
      <button data-testid='reload-btn' onClick={handleReload}>
        Tentar novamente
      </button>
    </div>
  )
}

export { SurveyError }
