-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
