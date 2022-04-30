import React, { useContext } from 'react'

import { SurveyContext } from '@/presentation/contexts'

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
    <div>
      <span data-testid='error-wrapper'>{state.error}</span>
      <button data-testid='reload-btn' onClick={handleReload}>
        Tentar novamente
      </button>
    </div>
  )
}

export { SurveyError }
