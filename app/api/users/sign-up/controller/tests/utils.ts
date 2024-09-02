import db from "@/db";
import { Prisma } from "@prisma/client";

export const initDB = async () => {
  try {
    await db.users.create({
      data: {
        email: "jperez@test.com",
        password: "passtesting",
        name: "Juan",
        lastname: "Perez",
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message);
    }
  }
};

export const cleanDB = async () => {
  try {
    await db.users.deleteMany();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message);
    }
  }
};
