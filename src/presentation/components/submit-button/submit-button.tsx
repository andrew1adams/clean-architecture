import { LoginFormContext } from '@/presentation/contexts'
import React, { useContext } from 'react'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(LoginFormContext)

  return (
    <button data-testid='submit-btn' disabled={state.isFormInvalid} type='submit'>
      {text}
    </button>
  )
}

export { SubmitButton }
