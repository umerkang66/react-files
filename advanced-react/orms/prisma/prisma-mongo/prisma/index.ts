// https://stackoverflow.com/questions/72282755/prisma-mongodb-cant-create-a-user-model
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
