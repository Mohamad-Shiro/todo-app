import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  const user = await prisma.user.create({
    data: {
      username: "shiro",
      password: "24862",
      firstName: "mohamad",
      lastName: "ashraf",
      email: "mohamad.shiro80026@gmail.com",
    },
  });

  console.log(user);
};

seed()
  .then(() => {
    prisma.$disconnect();
  })
  .catch(console.error)
  .finally(() => console.log("Finally"));
