import { ulid } from "ulid";
import { faker } from '@faker-js/faker';

export const graphqlMocks = {
  Date: () => new Date().toISOString(),
  Email: () => `mockemail@souv.tv`,
  ID: () => ulid(),
  Object: () => ({
    mock: true,
  }),
  Query: {
    hellos: () => Array.from({ length: 50 })
  },
  Hello: {
    title: () => faker.book.author(),
    description: () => faker.lorem.sentence(),
    createdAt: () => faker.date.anytime().toISOString(),
    createdBy: () => faker.person.fullName(),
  },

}