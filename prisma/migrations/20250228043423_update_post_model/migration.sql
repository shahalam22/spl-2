-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "delivery" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "impactinfo" TEXT,
ADD COLUMN     "location" JSONB,
ADD COLUMN     "pickup" JSONB,
ADD COLUMN     "quantity" INTEGER;
