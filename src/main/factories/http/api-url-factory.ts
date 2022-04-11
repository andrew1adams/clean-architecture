const ApiURLCreator = (path: string): string =>
  `http://fordevs.herokuapp.com/api${path}`;

export { ApiURLCreator };

