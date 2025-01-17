import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'john_doe',
        email: 'john@example.com',
        hashedPassword: 'hashed_password_1',
        profilePicture: null,
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        hashedPassword: 'hashed_password_2',
        profilePicture: null,
      },
      {
        username: 'alice_smith',
        email: 'alice@example.com',
        hashedPassword: 'hashed_password_3',
        profilePicture: null,
      },
      {
        username: 'bob_brown',
        email: 'bob@example.com',
        hashedPassword: 'hashed_password_4',
        profilePicture: null,
      },
    ],
  });

  // Seed Notifications
  const notifications = await prisma.notification.createMany({
    data: [
      {
        title: 'Welcome',
        content: 'Welcome to the platform!',
        isRead: false,
        user_id: 1,
      },
      {
        title: 'Post Approved',
        content: 'Your post has been approved.',
        isRead: true,
        user_id: 2,
      },
      {
        title: 'New Event',
        content: 'New event created!',
        isRead: false,
        user_id: 3,
      },
      {
        title: 'Bid Accepted',
        content: 'Your bid was accepted.',
        isRead: true,
        user_id: 4,
      },
    ],
  });

  // Seed Messages
  const messages = await prisma.message.createMany({
    data: [
      { content: 'Hello!', isRead: false, sender_id: 1, receiver_id: 2 },
      { content: 'How are you?', isRead: true, sender_id: 2, receiver_id: 3 },
      { content: 'Let’s collaborate.', isRead: false, sender_id: 3, receiver_id: 4 },
      { content: 'Sure, let’s do it.', isRead: true, sender_id: 4, receiver_id: 1 },
    ],
  });

  // Seed Events
  const events = await prisma.event.createMany({
    data: [
      {
        title: 'Tech Conference',
        description: 'A conference about the latest in tech.',
        status: 'Scheduled',
        startTime: new Date('2025-02-01T10:00:00Z'),
        endTime: new Date('2025-02-01T18:00:00Z'),
        user_id: 1,
      },
      {
        title: 'Art Workshop',
        description: 'Learn painting techniques.',
        status: 'Completed',
        startTime: new Date('2025-01-10T14:00:00Z'),
        endTime: new Date('2025-01-10T17:00:00Z'),
        user_id: 2,
      },
      {
        title: 'Music Festival',
        description: 'Enjoy live music performances.',
        status: 'Scheduled',
        startTime: new Date('2025-03-05T12:00:00Z'),
        endTime: new Date('2025-03-05T22:00:00Z'),
        user_id: 3,
      },
      {
        title: 'Startup Pitch',
        description: 'Pitch your startup idea.',
        status: 'Cancelled',
        startTime: new Date('2025-01-20T09:00:00Z'),
        endTime: new Date('2025-01-20T12:00:00Z'),
        user_id: 4,
      },
    ],
  });

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { title: 'Technology', description: 'Tech-related posts and events.' },
      { title: 'Art', description: 'Art-related posts and events.' },
      { title: 'Music', description: 'Music-related posts and events.' },
      { title: 'Business', description: 'Business-related posts and events.' },
    ],
  });

  // Seed Posts
  const posts = await prisma.post.createMany({
    data: [
      {
        title: 'Looking for a web developer',
        description: 'Need help building a website.',
        price: 500,
        isRequest: true,
        status: 'Open',
        user_id: 1,
        category_id: 1,
      },
      {
        title: 'Selling a painting',
        description: 'Beautiful landscape painting for sale.',
        price: 200,
        isRequest: false,
        status: 'Sold',
        user_id: 2,
        category_id: 2,
      },
      {
        title: 'Offering guitar lessons',
        description: 'Learn to play guitar in 4 weeks.',
        price: 100,
        isRequest: false,
        status: 'Open',
        user_id: 3,
        category_id: 3,
      },
      {
        title: 'Looking for a business partner',
        description: 'Seeking a partner for a startup idea.',
        price: 0,
        isRequest: true,
        status: 'Open',
        user_id: 4,
        category_id: 4,
      },
    ],
  });

  // Seed Transactions
  const transactions = await prisma.transaction.createMany({
    data: [
      { amount: 500, method: 'Credit Card', status: 'Completed', user_id: 1, post_id: 1 },
      { amount: 200, method: 'PayPal', status: 'Completed', user_id: 2, post_id: 2 },
      { amount: 100, method: 'Bank Transfer', status: 'Pending', user_id: 3, post_id: 3 },
      { amount: 0, method: 'Cash', status: 'Completed', user_id: 4, post_id: 4 },
    ],
  });

  // Seed Bids
  const bids = await prisma.bid.createMany({
    data: [
      { bidAmount: 450, status: 'Accepted', user_id: 1, event_id: 1, product_id: 1 },
      { bidAmount: 300, status: 'Rejected', user_id: 2, event_id: 2 , product_id: 2 },
      { bidAmount: 150, status: 'Pending', user_id: 3, event_id: 3 , product_id: 3 },
      { bidAmount: 500, status: 'Accepted', user_id: 4, event_id: 4 , product_id: 4 },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
