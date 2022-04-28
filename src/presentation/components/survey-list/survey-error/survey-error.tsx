import React, { useContext } from 'react'
import { SurveyContext } from '@/presentation/contexts'

const SurveyError: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div>
      <span data-testid='error-wrapper'>{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export { SurveyError }
