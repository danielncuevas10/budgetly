import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const u = await prisma.user.upsert({
    where: { email: 'demo@you.com' },
    update: {},
    create: {
      id: 'demo-user', // remove this if your User.id is auto-generated
      email: 'demo@you.com',
      name: 'Demo User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.transaction.createMany({
    data: [
      { userId: u.id, description: 'Coffee', amount: 3.5 },
      { userId: u.id, description: 'Salary', amount: 2500 },
    ],
  });

  await prisma.onboarding.upsert({
    where: { userId: u.id },
    update: {},
    create: { userId: u.id, currency: 'USD', goal: 'Save 20%' },
  });

  console.log('Seed done');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
