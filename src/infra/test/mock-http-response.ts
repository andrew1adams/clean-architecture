import faker from 'faker';

const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.random.number(),
});

export { mockHttpResponse };

