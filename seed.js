// esto es para agregar los roles definidos a la bd
// ejecutar " node seed.js " desde el terminal para que cargue

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'ADMIN_ROLE' },
    { name: 'USER_ROLE' },
    { name: 'VENTAS_ROLE' },
  ];

  for (let role of roles) {
    await prisma.role.create({
      data: role,
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });