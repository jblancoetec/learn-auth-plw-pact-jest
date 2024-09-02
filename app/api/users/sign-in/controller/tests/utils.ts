import db from "@/db";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export const initDB = async () => {
  try {
    await db.users.create({
      data: {
        email: "jdoe@test.com",
        password: await bcrypt.hash("passtesting", 10),
        name: "John",
        lastname: "Doe",
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
