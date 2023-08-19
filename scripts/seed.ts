const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Famous People" },
        { name: "Musician" },
        { name: "Programmers" },
        { name: "Games" },
        { name: "Philosophy" },
        { name: "linguists" },
        { name: "Αuthors" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();
