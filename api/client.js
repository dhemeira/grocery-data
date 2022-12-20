import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get all product types
 */
export const getProducts = async (event) => {
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

/**
 * Create new product type
 * @param name Name of product
 * @param value Price of product
 */
export const createProduct = async (event) => {
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

/**
 * Add new product to active shopping list
 * @param purchase Id of active purchase
 * @param amount Amount of product
 * @param product Id of product
 */
export const addToList = async (event) => {
  const body = await readBody(event);

  const result = await prisma.purchase.update({
    where: { id: 1 },
    data: {
      products: {
        create: [
          {
            amount: body.amount,
            product: {
              connect: {
                id: body.product,
              },
            },
          },
        ],
      },
    },
    include: {
      products: true,
    },
  });

  return {
    result,
  };
};

/**
 * Manages the shopping finishing process
 * @param purchase Id of active purchase
 * @param value Full price of purchase
 */
export const finishList = async (event) => {
  const body = await readBody(event);

  const result = await prisma.productTypesOfPurchases.findMany({
    where: { purchaseId: body.purchase },
  });

  const newPurchase = await prisma.purchase.create({
    data: {
      date: new Date(),
      value: body.value,
    },
  });

  var res;

  result.forEach(async (element) => {
    res = await prisma.purchase.update({
      where: { id: newPurchase.id },
      data: {
        products: {
          create: [
            {
              amount: element.amount,
              product: {
                connect: {
                  id: element.productTypeId,
                },
              },
            },
          ],
        },
      },
    });
  });

  await prisma.purchase.update({
    where: {
      id: body.purchase,
    },
    data: {
      products: {
        deleteMany: {},
      },
    },
  });

  return {
    res,
  };
};

/**
 * Update the amount of a product in the shopping list
 * @param product Id of product
 * @param purchase Id of purchase
 * @param amount Amount of product
 */
export const updateProductAmount = async (event) => {
  const body = await readBody(event);

  const result = await prisma.productTypesOfPurchases.update({
    where: { productTypeId_purchaseId: { productTypeId: body.product, purchaseId: body.purchase } },
    data: {
      amount: body.amount,
    },
  });

  return {
    result,
  };
};

/**
 * Update the name of product type
 * @param product Id of product
 * @param name New name of the product
 */
export const updateProductName = async (event) => {
  const body = await readBody(event);

  const result = await prisma.productType.update({
    where: { id: body.product },
    data: {
      name: body.name,
    },
  });

  return {
    result,
  };
};

/**
 * Update the price of a product type
 * @param value New price of product
 * @param id Id of product
 */
export const updatePrice = async (event) => {
  const body = await readBody(event);

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

/**
 * Get all past purchases
 */
export const getPurchases = async (event) => {
  const purchases = await prisma.purchase.findMany({
    where: { status: 'finished' },
    orderBy: { date: 'asc' },
  });
  let result = await Promise.all(
    purchases.map(async (p) => {
      const products = await prisma.productType.findMany({
        where: {
          purchases: { some: { purchaseId: p.id } },
        },
        include: {
          prices: {
            select: {
              value: true,
            },
            orderBy: { date: 'desc' },
            take: 1,
          },
          purchases: {
            select: {
              amount: true,
            },
          },
        },
      });
      return {
        ...p,
        products: products.map(({ purchases, prices, ...products }) => ({
          ...products,
          amount: purchases[0].amount,
          price: prices[0].value,
        })),
      };
    })
  );
  return result;
};

/**
 * Get the current shopping list with all of it's products
 */
export const getActivePurchase = async (event) => {
  const purchases = await prisma.purchase.findFirst({
    where: { status: 'active' },
  });
  const products = await prisma.productType.findMany({
    where: {
      purchases: { some: { purchaseId: purchases.id } },
    },
    include: {
      prices: {
        select: {
          value: true,
        },
        orderBy: { date: 'desc' },
        take: 1,
      },
      purchases: {
        select: {
          amount: true,
        },
      },
    },
  });

  return {
    ...purchases,
    products: products.map(({ purchases, prices, ...products }) => ({
      ...products,
      amount: purchases[0].amount,
      price: prices[0].value,
    })),
  };
};

/**
 * Removes a product from the shopping list
 * @param id Id of product
 */
export const removeFromList = async (event) => {
  const body = await readBody(event);

  const result = await prisma.purchase.update({
    where: {
      id: 1,
    },
    data: {
      products: {
        delete: [{ productTypeId_purchaseId: { productTypeId: body.id, purchaseId: 1 } }],
      },
    },
  });

  return {
    result,
  };
};

/**
 * Get the price history of a single product
 * @param id Id of product
 */
export const getProductPrices = async (event) => {
  const body = getQuery(event);

  const product = await prisma.productType.findFirst({
    where: { id: parseInt(body.id) },
    include: {
      prices: {
        orderBy: { date: 'asc' },
      },
    },
  });
  return product;
};

/**
 * Get products ordered by number of times bought
 */
export const getProductsByCount = async (event) => {
  const purchases = await prisma.productTypesOfPurchases.groupBy({
    by: ['productTypeId'],
    where: { purchaseId: { not: { equals: 1 } } },
    _count: { productTypeId: true },
    orderBy: { _count: { productTypeId: 'desc' } },
  });

  let result = await Promise.all(
    purchases.map(async ({ _count, ...purchases }) => ({
      ...(await prisma.productType.findFirst({
        where: { id: purchases.productTypeId },
      })),

      count: _count.productTypeId,
    }))
  );
  return result;
};

/**
 * Get a single purchase
 * @param id Id of puchase
 */
export const getOnePurchase = async (event) => {
  const body = getQuery(event);

  const purchase = await prisma.purchase.findFirst({
    where: { status: 'finished', id: parseInt(body.id) },
    include: {
      products: {
        include: {
          product: {
            include: {
              prices: {
                select: {
                  value: true,
                },
                orderBy: { date: 'desc' },
                take: 1,
              },
              purchases: {
                select: {
                  amount: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return {
    ...purchase,
    products: purchase.products.map((p) => ({
      id: p.product.id,
      name: p.product.name,
      amount: p.amount,
      price: p.product.prices[0].value,
    })),
  };
};

/**
 * Deletes a purchase
 * @param id Id of puchase
 */
export const deletePurchase = async (event) => {
  const body = await readBody(event);

  await prisma.purchase.update({
    where: {
      id: body.id,
    },
    data: {
      products: {
        deleteMany: {},
      },
    },
  });

  const result = await prisma.purchase.delete({
    where: {
      id: body.id,
    },
  });

  return {
    result,
  };
};

/**
 * Deletes a product if its haven't been purchased yet
 * @param id Id of product
 */
export const deleteProduct = async (event) => {
  const body = await readBody(event);

  const product = await prisma.productType.findFirst({
    where: {
      id: body.id,
    },
    include: { purchases: true },
  });

  if (product.purchases == '') {
    await prisma.productType.update({
      where: {
        id: body.id,
      },
      data: {
        prices: {
          deleteMany: {},
        },
      },
    });

    const result = await prisma.productType.delete({
      where: {
        id: body.id,
      },
    });

    return {
      result,
    };
  }
  throw createError({
    statusCode: 400,
    message: 'Product cannot be deleted',
    statusMessage: 'Cannot be deleted',
    stack: '',
  });
};
