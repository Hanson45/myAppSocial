/*
  Warnings:

  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `google` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `role` VARCHAR(45) NULL DEFAULT 'USER_ROLE',
    ADD COLUMN `state` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `email` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `category_id_key`(`id`),
    UNIQUE INDEX `category_name_key`(`name`),
    UNIQUE INDEX `category_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `priceUni` FLOAT NOT NULL,
    `category_id` INTEGER NOT NULL,
    `available` BOOLEAN NOT NULL,
    `user_id` TINYINT NOT NULL,

    UNIQUE INDEX `product_id_key`(`id`),
    UNIQUE INDEX `product_name_key`(`name`),
    UNIQUE INDEX `product_category_id_key`(`category_id`),
    UNIQUE INDEX `product_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
