import { PrismaClient, ROLE } from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.DEFAULT_EMAIL_ADMIN;
  const password = process.env.DEFAULT_PASSWORD_ADMIN;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existUser = await prisma.user.findMany({
    where: {
      email,
    },
  });
  if (existUser.length > 0) return;
  await prisma.user.create({
    data: {
      name: "Jair",
      lastName: "Balcazar",
      role: ROLE.SUPERADMIN,
      email,
      password: hashedPassword,
    },
  });

  console.log("Data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
