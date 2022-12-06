import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productTypeGet = async (event) => {
  event.context;
  const productTypes = await prisma.productType.findMany({
    include: {
      prices: {
        select: {
          value: true,
        },
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
    orderBy: { name: 'asc' },
  });
  return productTypes.map(({ prices, ...productType }) => ({
    ...productType,
    price: prices[0].value,
  }));
};

export const productTypePost = async (event) => {
  const body = await readBody(event);
  const result = await prisma.productType.create({
    data: {
      name: body.name,
      prices: {
        create: [{ value: body.value }],
      },
    },
    include: {
      prices: true,
    },
  });
  return {
    result,
  };
};

export const pricePost = async (event) => {
  const body = await readBody(event);
  // const result = await prisma.productType.update({
  //   where: {
  //     id: body.id,
  //   },
  //   data: {
  //     prices: {
  //       create: [{ value: body.value }],
  //     },
  //   },
  // });
  const result = await prisma.price.create({
    data: {
      value: body.value,
      productTypeId: body.id,
    },
  });
  return {
    result,
  };
};

export const purchaseGet = async (event) => {
  event.context;
  const purchases = await prisma.purchase.findMany({
    where: { status: 'finished' },
    orderBy: { date: 'asc' },
    include: {
      products: true,
    },
  });
  return {
    purchases,
  };
};

export const purchaseGetActive = async (event) => {
  event.context;
  const purchases = await prisma.purchase.findMany({
    where: { status: 'active' },
    include: {
      products: true,
    },
  });
  return {
    purchases,
  };
};

export const purchasePost = async (event) => {
  const body = await readBody(event);
  const result = await prisma.purchase.create({
    data: {
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      value: body.value,
      // status: 'active',
    },
  });
  return {
    result,
  };
};
