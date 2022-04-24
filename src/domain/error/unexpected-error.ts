class UnexpectedError extends Error {
  constructor() {
    super('Algo de errado ocorreu, tente novamente mais tarde')
    this.name = 'UnexpectedError'
  }
}

export { UnexpectedError }
