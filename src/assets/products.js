import { faker } from "@faker-js/faker";

const products = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price({ min: 10, max: 500, dec: 2 }),
  image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
  rating: faker.number.int({ min: 1, max: 5 }),
}));

export default products;
