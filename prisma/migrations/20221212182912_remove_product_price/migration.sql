/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `price` MODIFY `date` DATETIME(3) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `product` DROP COLUMN `price`;
