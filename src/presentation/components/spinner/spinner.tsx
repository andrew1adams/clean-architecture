import React from 'react'
import Styles from './spinner.module.scss'

const { spinner } = Styles

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) =>
    <div
      {...props}
      data-testid="spinner"
      className={[spinner, props.className].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>

export { Spinner }
