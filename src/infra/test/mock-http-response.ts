import faker from 'faker'

const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number()
})

export { mockHttpResponse }
