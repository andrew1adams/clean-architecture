import React, { useContext } from 'react'

import { LoginFormContext } from '@/presentation/contexts'

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

  const getStatus = (): string => (errorStatus ? `${error}` : `${success}`)

  return (
    <div className={inputWrapper}>
      <input
        {...props}
        placeholder=' '
        name={props.name}
        id={props.name}
        data-testid={`${props.name}-input`}
        readOnly
        onFocus={handleFocus}
        onChange={handleChange}
      />
      <label htmlFor={props.name}>{props.placeholder}</label>
      <span
        title={errorStatus}
        data-testid={`${props.name}-status`}
        className={`${status} ${getStatus()}`}
      />
    </div>
  )
}

export { Input }
