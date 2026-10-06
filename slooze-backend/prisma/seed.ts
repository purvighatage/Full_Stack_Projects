import { PrismaClient, Role, Country } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Users from Problem Statement
  const users = [
    { email: 'nick.fury@slooze.com', password: hashedPassword, role: Role.ADMIN, country: Country.INDIA }, // Admin is org-wide, but needs a default country in DB
    { email: 'captain.marvel@slooze.com', password: hashedPassword, role: Role.MANAGER, country: Country.INDIA },
    { email: 'captain.america@slooze.com', password: hashedPassword, role: Role.MANAGER, country: Country.AMERICA },
    { email: 'thanos@slooze.com', password: hashedPassword, role: Role.MEMBER, country: Country.INDIA },
    { email: 'thor@slooze.com', password: hashedPassword, role: Role.MEMBER, country: Country.INDIA },
    { email: 'travis@slooze.com', password: hashedPassword, role: Role.MEMBER, country: Country.AMERICA },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Clear existing data to ensure idempotency
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();

  // Restaurants & Menu Items
  await prisma.restaurant.create({
    data: {
      name: 'Spice Garden (India)',
      country: Country.INDIA,
      menuItems: {
        create: [
          { name: 'Paneer Butter Masala', price: 250 },
          { name: 'Butter Naan', price: 50 },
          { name: 'Biryani', price: 300 },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: 'Burger King (America)',
      country: Country.AMERICA,
      menuItems: {
        create: [
          { name: 'Whopper', price: 8.99 },
          { name: 'Fries', price: 3.49 },
          { name: 'Coke', price: 1.99 },
        ],
      },
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
