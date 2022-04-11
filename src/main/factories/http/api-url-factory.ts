const ApiURLCreator = (path: string): string =>
  `${process.env.REACT_APP_API_URL}${path}`;

export { ApiURLCreator };

