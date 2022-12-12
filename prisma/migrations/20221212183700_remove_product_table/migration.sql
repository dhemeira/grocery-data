/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productsofpurchases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_productTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `productsofpurchases` DROP FOREIGN KEY `ProductsOfPurchases_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productsofpurchases` DROP FOREIGN KEY `ProductsOfPurchases_purchaseId_fkey`;

-- AlterTable
ALTER TABLE `price` MODIFY `date` DATETIME(3) NOT NULL DEFAULT NOW();

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `productsofpurchases`;

-- CreateTable
CREATE TABLE `ProductTypesOfPurchases` (
    `productTypeId` INTEGER NOT NULL,
    `purchaseId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`productTypeId`, `purchaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductTypesOfPurchases` ADD CONSTRAINT `ProductTypesOfPurchases_productTypeId_fkey` FOREIGN KEY (`productTypeId`) REFERENCES `ProductType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductTypesOfPurchases` ADD CONSTRAINT `ProductTypesOfPurchases_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `Purchase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
