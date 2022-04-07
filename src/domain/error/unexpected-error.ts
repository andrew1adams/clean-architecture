class UnexpectedError extends Error {
  constructor() {
    super('Something was wrong, try again later.');
    this.name = 'UnexpectedError';
  }
}

export { UnexpectedError };

