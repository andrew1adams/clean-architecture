import { LoginFormContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import Styles from './input.module.scss'

const { inputWrapper, status, error, success } = Styles

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(LoginFormContext)
  const errorStatus = state[`${props.name}Error`]

  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
    ev.target.readOnly = false
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = ev.target
    setState({
      ...state,
      [name]: value
    })
  }

  const getStatus = (): string => (errorStatus ? `${status} ${error}` : `${status} ${success}`)

  const getTitle = (): string => errorStatus || 'Filled in Correctly'

  return (
    <div className={inputWrapper}>
      <input
        data-testid={`${props.name}-input`}
        {...props}
        readOnly
        onFocus={handleFocus}
        onChange={handleChange}
      />
      <span title={getTitle()} data-testid={`${props.name}-status`} className={getStatus()} />
    </div>
  )
}

export { Input }
