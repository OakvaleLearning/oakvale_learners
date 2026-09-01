-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "balanceDueDate" TIMESTAMP(3),
ADD COLUMN     "depositEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "enrolledEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "reminderEmailSentAt" TIMESTAMP(3);
