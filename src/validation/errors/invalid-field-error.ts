class InvalidFieldError extends Error {
  constructor() {
    super('Invalid Field')
    this.name = 'InvalidFieldError'
  }
}

export { InvalidFieldError }
