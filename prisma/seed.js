// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // async function main() {
// //   // Seed Users
// //   const users = await prisma.user.createMany({
// //     data: [
// //       { username: 'john_doe', email: 'john@example.com', hashedPassword: 'hashed_password_1', profilePicture: null },
// //       { username: 'jane_doe', email: 'jane@example.com', hashedPassword: 'hashed_password_2', profilePicture: null },
// //       { username: 'alice_smith', email: 'alice@example.com', hashedPassword: 'hashed_password_3', profilePicture: null },
// //       { username: 'bob_brown', email: 'bob@example.com', hashedPassword: 'hashed_password_4', profilePicture: null },
// //       { username: 'charlie_adams', email: 'charlie@example.com', hashedPassword: 'hashed_password_5', profilePicture: null },
// //       { username: 'diana_clark', email: 'diana@example.com', hashedPassword: 'hashed_password_6', profilePicture: null },
// //       { username: 'edward_jones', email: 'edward@example.com', hashedPassword: 'hashed_password_7', profilePicture: null },
// //       { username: 'fiona_white', email: 'fiona@example.com', hashedPassword: 'hashed_password_8', profilePicture: null },
// //     ],
// //   });

// //   // Seed Notifications
// //   const notifications = await prisma.notification.createMany({
// //     data: [
// //       { title: 'Welcome', content: 'Welcome to the platform!', isRead: false, user_id: 1 },
// //       { title: 'Post Approved', content: 'Your post has been approved.', isRead: true, user_id: 2 },
// //       { title: 'New Event', content: 'New event created!', isRead: false, user_id: 3 },
// //       { title: 'Bid Accepted', content: 'Your bid was accepted.', isRead: true, user_id: 4 },
// //       { title: 'Profile Updated', content: 'Your profile was updated successfully.', isRead: false, user_id: 5 },
// //       { title: 'Password Changed', content: 'Your password was changed.', isRead: true, user_id: 6 },
// //       { title: 'New Message', content: 'You have a new message.', isRead: false, user_id: 7 },
// //       { title: 'Event Reminder', content: 'Don’t forget your upcoming event!', isRead: true, user_id: 8 },
// //     ],
// //   });

// //   // Seed Messages
// //   const messages = await prisma.message.createMany({
// //     data: [
// //       { content: 'Hello!', isRead: false, sender_id: 1, receiver_id: 2 },
// //       { content: 'How are you?', isRead: true, sender_id: 2, receiver_id: 3 },
// //       { content: 'Let’s collaborate.', isRead: false, sender_id: 3, receiver_id: 4 },
// //       { content: 'Sure, let’s do it.', isRead: true, sender_id: 4, receiver_id: 1 },
// //       { content: 'What’s your availability?', isRead: false, sender_id: 5, receiver_id: 6 },
// //       { content: 'I’m available next week.', isRead: true, sender_id: 6, receiver_id: 7 },
// //       { content: 'Can we meet tomorrow?', isRead: false, sender_id: 7, receiver_id: 8 },
// //       { content: 'Yes, let’s meet.', isRead: true, sender_id: 8, receiver_id: 5 },
// //     ],
// //   });

// //   // Seed Events
// //   const events = await prisma.event.createMany({
// //     data: [
// //       { title: 'Tech Conference', description: 'A conference about the latest in tech.', status: 'Scheduled', startTime: new Date('2025-02-01T10:00:00Z'), endTime: new Date('2025-02-01T18:00:00Z'), user_id: 1 },
// //       { title: 'Art Workshop', description: 'Learn painting techniques.', status: 'Completed', startTime: new Date('2025-01-10T14:00:00Z'), endTime: new Date('2025-01-10T17:00:00Z'), user_id: 2 },
// //       { title: 'Music Festival', description: 'Enjoy live music performances.', status: 'Scheduled', startTime: new Date('2025-03-05T12:00:00Z'), endTime: new Date('2025-03-05T22:00:00Z'), user_id: 3 },
// //       { title: 'Startup Pitch', description: 'Pitch your startup idea.', status: 'Cancelled', startTime: new Date('2025-01-20T09:00:00Z'), endTime: new Date('2025-01-20T12:00:00Z'), user_id: 4 },
// //       { title: 'Tech Meetup', description: 'Networking for tech enthusiasts.', status: 'Scheduled', startTime: new Date('2025-02-15T15:00:00Z'), endTime: new Date('2025-02-15T18:00:00Z'), user_id: 5 },
// //       { title: 'Photography Workshop', description: 'Learn photography basics.', status: 'Completed', startTime: new Date('2025-01-25T10:00:00Z'), endTime: new Date('2025-01-25T13:00:00Z'), user_id: 6 },
// //       { title: 'Coding Bootcamp', description: 'Learn to code in 2 weeks.', status: 'Scheduled', startTime: new Date('2025-03-10T09:00:00Z'), endTime: new Date('2025-03-24T17:00:00Z'), user_id: 7 },
// //       { title: 'Startup Fair', description: 'Showcase your startup.', status: 'Cancelled', startTime: new Date('2025-01-30T10:00:00Z'), endTime: new Date('2025-01-30T16:00:00Z'), user_id: 8 },
// //     ],
// //   });

// //   // Seed Categories
// //   const categories = await prisma.category.createMany({
// //     data: [
// //       { title: 'Technology', description: 'Tech-related posts and events.' },
// //       { title: 'Art', description: 'Art-related posts and events.' },
// //       { title: 'Music', description: 'Music-related posts and events.' },
// //       { title: 'Business', description: 'Business-related posts and events.' },
// //       { title: 'Health', description: 'Health-related posts and events.' },
// //       { title: 'Education', description: 'Education-related posts and events.' },
// //       { title: 'Sports', description: 'Sports-related posts and events.' },
// //       { title: 'Travel', description: 'Travel-related posts and events.' },
// //     ],
// //   });

// //   // Seed Posts
// //   const posts = await prisma.post.createMany({
// //     data: [
// //       { title: 'Looking for a web developer', description: 'Need help building a website.', price: 500, isRequest: true, status: 'Open', user_id: 1, category_id: 1 },
// //       { title: 'Selling a painting', description: 'Beautiful landscape painting for sale.', price: 200, isRequest: false, status: 'Sold', user_id: 2, category_id: 2 },
// //       { title: 'Offering guitar lessons', description: 'Learn to play guitar in 4 weeks.', price: 100, isRequest: false, status: 'Open', user_id: 3, category_id: 3 },
// //       { title: 'Looking for a business partner', description: 'Seeking a partner for a startup idea.', price: 0, isRequest: true, status: 'Open', user_id: 4, category_id: 4 },
// //       { title: 'Selling a laptop', description: 'Lightly used laptop for sale.', price: 800, isRequest: false, status: 'Open', user_id: 5, category_id: 1 },
// //       { title: 'Offering painting services', description: 'Professional painting services.', price: 300, isRequest: false, status: 'Open', user_id: 6, category_id: 2 },
// //       { title: 'Looking for a piano teacher', description: 'Need piano lessons.', price: 150, isRequest: true, status: 'Open', user_id: 7, category_id: 3 },
// //       { title: 'Selling a business idea', description: 'Innovative business idea for sale.', price: 1000, isRequest: false, status: 'Open', user_id: 8, category_id: 4 },
// //     ],
// //   });

// //   // Seed Transactions
// //   const transactions = await prisma.transaction.createMany({
// //     data: [
// //       { amount: 500, method: 'Credit Card', status: 'Completed', user_id: 1, post_id: 1 },
// //       { amount: 200, method: 'PayPal', status: 'Completed', user_id: 2, post_id: 2 },
// //       { amount: 100, method: 'Bank Transfer', status: 'Pending', user_id: 3, post_id: 3 },
// //       { amount: 0, method: 'Cash', status: 'Completed', user_id: 4, post_id: 4 },
// //       { amount: 800, method: 'Credit Card', status: 'Completed', user_id: 5, post_id: 5 },
// //       { amount: 300, method: 'PayPal', status: 'Pending', user_id: 6, post_id: 6 },
// //       { amount: 150, method: 'Bank Transfer', status: 'Pending', user_id: 7, post_id: 7 },
// //       { amount: 1000, method: 'Cash', status: 'Completed', user_id: 8, post_id: 8 },
// //     ],
// //   });

// //   // Seed Bids
// //   const bids = await prisma.bid.createMany({
// //     data: [
// //       { bidAmount: 450, status: 'Accepted', user_id: 1, event_id: 1, post_id: 1 },
// //       { bidAmount: 300, status: 'Rejected', user_id: 2, event_id: 2, post_id: 2 },
// //       { bidAmount: 150, status: 'Pending', user_id: 3, event_id: 3, post_id: 3 },
// //       { bidAmount: 500, status: 'Accepted', user_id: 4, event_id: 4, post_id: 4 },
// //       { bidAmount: 350, status: 'Pending', user_id: 5, event_id: 5, post_id: 5 },
// //       { bidAmount: 250, status: 'Rejected', user_id: 6, event_id: 6, post_id: 6 },
// //       { bidAmount: 400, status: 'Accepted', user_id: 7, event_id: 7, post_id: 7 },
// //       { bidAmount: 600, status: 'Pending', user_id: 8, event_id: 8, post_id: 8 },
// //     ],
// //   });

// //   console.log('Database seeded successfully!');
// // }

// // main()
// //   .catch((e) => {
// //     console.error('Error seeding database:', e);
// //     process.exit(1);
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });











import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Deleting existing events...");
  await prisma.event.deleteMany(); // Clears existing data

  console.log("Seeding new events...");
  await prisma.event.createMany({
    data: [
      {
        title: "Global Tech Summit 2025",
        description: "A conference bringing together global tech leaders.",
        status: "upcoming",
        date: new Date("2025-05-10"),
        startTime: new Date("2025-05-10T09:00:00Z"),
        endTime: new Date("2025-05-10T18:00:00Z"),
        timezone: "UTC",
        max_participant: 500,
        image: "/uploads/tech-summit.jpg",
        location: {
          city: "San Francisco",
          country: "USA",
          state: "California",
          street: "456 Tech Avenue",
          zip: "94103"
        },
        user_id: 1 // Assuming a user with ID 1 exists
      },
      {
        title: "World Music Festival",
        description: "A music festival featuring top artists from around the world.",
        status: "upcoming",
        date: new Date("2025-06-15"),
        startTime: new Date("2025-06-15T16:00:00-08:00"),
        endTime: new Date("2025-06-15T23:00:00-08:00"),
        timezone: "PST",
        max_participant: 1000,
        image: "/uploads/music-festival.jpg",
        location: {
          city: "Los Angeles",
          country: "USA",
          state: "California",
          street: "789 Sunset Blvd",
          zip: "90028"
        },
        user_id: 2
      },
      {
        title: "Startup Pitch Night",
        description: "A networking and pitch event for early-stage startups.",
        status: "upcoming",
        date: new Date("2025-07-10"),
        startTime: new Date("2025-07-10T18:00:00-05:00"),
        endTime: new Date("2025-07-10T21:00:00-05:00"),
        timezone: "EST",
        max_participant: 300,
        image: "/uploads/startup-pitch.jpg",
        location: {
          city: "New York",
          country: "USA",
          state: "New York",
          street: "123 Business Hub",
          zip: "10001"
        },
        user_id: 3
      },
      {
        title: "Paris Art Exhibition",
        description: "A showcase of modern and classical artwork.",
        status: "upcoming",
        date: new Date("2025-08-05"),
        startTime: new Date("2025-08-05T11:00:00+01:00"),
        endTime: new Date("2025-08-05T17:00:00+01:00"),
        timezone: "CET",
        max_participant: 200,
        image: "/uploads/art-exhibition.jpg",
        location: {
          city: "Paris",
          country: "France",
          state: "Île-de-France",
          street: "12 Louvre Street",
          zip: "75001"
        },
        user_id: 4
      },
      {
        title: "Full-Stack Coding Bootcamp",
        description: "An immersive hands-on coding bootcamp for web developers.",
        status: "upcoming",
        date: new Date("2025-09-20"),
        startTime: new Date("2025-09-20T09:00:00+05:30"),
        endTime: new Date("2025-09-20T18:00:00+05:30"),
        timezone: "IST",
        max_participant: 150,
        image: "/uploads/coding-bootcamp.jpg",
        location: {
          city: "Bangalore",
          country: "India",
          state: "Karnataka",
          street: "22 Tech Park",
          zip: "560001"
        },
        user_id: 5
      },
      {
        title: "Green Energy Summit",
        description: "A summit discussing the future of renewable energy.",
        status: "upcoming",
        date: new Date("2025-10-15"),
        startTime: new Date("2025-10-15T10:00:00Z"),
        endTime: new Date("2025-10-15T17:00:00Z"),
        timezone: "UTC",
        max_participant: 400,
        image: "/uploads/green-energy.jpg",
        location: {
          city: "Berlin",
          country: "Germany",
          state: "Berlin",
          street: "99 Eco Street",
          zip: "10117"
        },
        user_id: 6
      }
    ],
  });

  console.log("Database seeding complete!");
}


main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




















// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("Deleting existing events...");
//   await prisma.event.deleteMany(); // Clears existing data

//   console.log("Seeding new events...");
//   await prisma.event.createMany({
//     data: [
//       {
//         title: "Global Tech Summit 2025",
//         description: "A conference bringing together global tech leaders.",
//         status: "upcoming",
//         date: new Date("2025-05-10"),
//         startTime: new Date("2025-05-10T09:00:00Z"),
//         endTime: new Date("2025-05-10T18:00:00Z"),
//         timezone: "UTC",
//         max_participant: 500,
//         image: "/uploads/tech-summit.jpg",
//         location: {
//           city: "San Francisco",
//           country: "USA",
//           state: "California",
//           street: "456 Tech Avenue",
//           zip: "94103"
//         },
//         user_id: 1 // Assuming a user with ID 1 exists
//       },
//       {
//         title: "World Music Festival",
//         description: "A music festival featuring top artists from around the world.",
//         status: "upcoming",
//         date: new Date("2025-06-15"),
//         startTime: new Date("2025-06-15T16:00:00-08:00"),
//         endTime: new Date("2025-06-15T23:00:00-08:00"),
//         timezone: "PST",
//         max_participant: 1000,
//         image: "/uploads/music-festival.jpg",
//         location: {
//           city: "Los Angeles",
//           country: "USA",
//           state: "California",
//           street: "789 Sunset Blvd",
//           zip: "90028"
//         },
//         user_id: 2
//       },
//       {
//         title: "Startup Pitch Night",
//         description: "A networking and pitch event for early-stage startups.",
//         status: "upcoming",
//         date: new Date("2025-07-10"),
//         startTime: new Date("2025-07-10T18:00:00-05:00"),
//         endTime: new Date("2025-07-10T21:00:00-05:00"),
//         timezone: "EST",
//         max_participant: 300,
//         image: "/uploads/startup-pitch.jpg",
//         location: {
//           city: "New York",
//           country: "USA",
//           state: "New York",
//           street: "123 Business Hub",
//           zip: "10001"
//         },
//         user_id: 3
//       },
//       {
//         title: "Paris Art Exhibition",
//         description: "A showcase of modern and classical artwork.",
//         status: "upcoming",
//         date: new Date("2025-08-05"),
//         startTime: new Date("2025-08-05T11:00:00+01:00"),
//         endTime: new Date("2025-08-05T17:00:00+01:00"),
//         timezone: "CET",
//         max_participant: 200,
//         image: "/uploads/art-exhibition.jpg",
//         location: {
//           city: "Paris",
//           country: "France",
//           state: "Île-de-France",
//           street: "12 Louvre Street",
//           zip: "75001"
//         },
//         user_id: 4
//       },
//       {
//         title: "Full-Stack Coding Bootcamp",
//         description: "An immersive hands-on coding bootcamp for web developers.",
//         status: "upcoming",
//         date: new Date("2025-09-20"),
//         startTime: new Date("2025-09-20T09:00:00+05:30"),
//         endTime: new Date("2025-09-20T18:00:00+05:30"),
//         timezone: "IST",
//         max_participant: 150,
//         image: "/uploads/coding-bootcamp.jpg",
//         location: {
//           city: "Bangalore",
//           country: "India",
//           state: "Karnataka",
//           street: "22 Tech Park",
//           zip: "560001"
//         },
//         user_id: 5
//       },
//       {
//         title: "Green Energy Summit",
//         description: "A summit discussing the future of renewable energy.",
//         status: "upcoming",
//         date: new Date("2025-10-15"),
//         startTime: new Date("2025-10-15T10:00:00Z"),
//         endTime: new Date("2025-10-15T17:00:00Z"),
//         timezone: "UTC",
//         max_participant: 400,
//         image: "/uploads/green-energy.jpg",
//         location: {
//           city: "Berlin",
//           country: "Germany",
//           state: "Berlin",
//           street: "99 Eco Street",
//           zip: "10117"
//         },
//         user_id: 6
//       }
//     ],
//   });

//   console.log("Database seeding complete!");
// }

// main()
//   .catch((error) => {
//     console.error("Error seeding database:", error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


  