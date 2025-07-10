-- CreateTable
CREATE TABLE "Experiment" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "brandDescription" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Experiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperimentImage" (
    "id" TEXT NOT NULL,
    "experimentId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ExperimentImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExperimentImage" ADD CONSTRAINT "ExperimentImage_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
