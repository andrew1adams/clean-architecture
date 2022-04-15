class RequiredFieldError extends Error {
  constructor() {
    super('Required Field')
    this.name = 'RequiredFieldError'
  }
}

export { RequiredFieldError }
