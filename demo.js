import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.eventParticipant.findMany({
    where: { user_id: 14 },
    select: {
      id: true,
      event_id: true,
      user_id: true,
      joinedAt: true,
    },
  });
  console.log(users);

}


main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
