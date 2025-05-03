/*
  Warnings:

  - You are about to drop the column `suplierId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_suplierId_fkey`;

-- DropIndex
DROP INDEX `Product_suplierId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `suplierId`;

-- DropTable
DROP TABLE `customer`;

-- CreateTable
CREATE TABLE `TSuplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl` DATETIME(3) NOT NULL,
    `suplierId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionOut` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl` DATETIME(3) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('OUTBOUND', 'SUPPLIER') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `transactionoutId` INTEGER NULL,
    `tsuplierId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TSuplier` ADD CONSTRAINT `TSuplier_suplierId_fkey` FOREIGN KEY (`suplierId`) REFERENCES `Suplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TSuplier` ADD CONSTRAINT `TSuplier_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionOut` ADD CONSTRAINT `TransactionOut_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_transactionoutId_fkey` FOREIGN KEY (`transactionoutId`) REFERENCES `TransactionOut`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_tsuplierId_fkey` FOREIGN KEY (`tsuplierId`) REFERENCES `TSuplier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
