class EmailInUseError extends Error {
  constructor() {
    super('E-mail is already being used')
    this.name = 'EmailInUseError'
  }
}

export { EmailInUseError }
