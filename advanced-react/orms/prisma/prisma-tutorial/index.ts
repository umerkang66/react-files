import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.userPreferences.deleteMany();

  const preference = await prisma.userPreferences.create({
    data: { emailUpdates: true },
  });

  const user = await prisma.user.create({
    data: {
      name: 'Umer',
      email: 'test@test.com',
      age: 27,
      preferences: {
        connect: { id: preference.id },
      },
    },
    include: { preferences: true, writtenPosts: true },
  });

  await Promise.all([
    prisma.post.create({
      data: {
        title: 'First Post',
        averageRating: 4.1,
        author: { connect: { id: user.id } },
      },
    }),
    prisma.post.create({
      data: {
        title: 'First Post',
        averageRating: 4.1,
        author: { connect: { id: user.id } },
      },
    }),
  ]);

  const foundUser = await prisma.user.findUnique({
    where: { email: 'test@test.com' },
    include: { preferences: true, writtenPosts: true },
  });

  console.log(foundUser);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
