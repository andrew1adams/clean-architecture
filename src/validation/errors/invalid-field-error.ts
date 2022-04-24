class InvalidFieldError extends Error {
  constructor() {
    super('Campo inválido')
    this.name = 'InvalidFieldError'
  }
}

export { InvalidFieldError }
