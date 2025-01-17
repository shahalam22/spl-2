import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testSeedData() {
  const users = await prisma.user.findMany();
  const notifications = await prisma.notification.findMany();
  const messages = await prisma.message.findMany();
  const events = await prisma.event.findMany();
  const categories = await prisma.category.findMany();
  const posts = await prisma.post.findMany();
  const transactions = await prisma.transaction.findMany();
  const bids = await prisma.bid.findMany();

  console.log('Users:', users);
  console.log('Notifications:', notifications);
  console.log('Messages:', messages);
  console.log('Events:', events);
  console.log('Categories:', categories);
  console.log('Posts:', posts);
  console.log('Transactions:', transactions);
  console.log('Bids:', bids);
}

testSeedData()
  .catch((e) => {
    console.error('Error testing seed data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
