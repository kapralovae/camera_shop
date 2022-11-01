import faker from 'faker';

export default function createFakeCamera() {
  return {
    id: faker.datatype.number(5),
    name: faker.name.firstName(),
    vendorCode: faker.datatype.uuid(),
    type: faker.random.alpha({count: 5}),
    category: faker.random.alpha({count: 10}),
    description: faker.lorem.paragraph(),
    level: faker.random.alpha({count: 15}),
    rating: faker.datatype.number(3),
    price: faker.datatype.number(5),
    previewImg: faker.image.image(),
    previewImg2x: faker.image.image(),
    previewImgWebp: faker.image.image(),
    previewImgWebp2x: faker.image.image(),
    reviewCount: faker.datatype.number(3),
  };
}
