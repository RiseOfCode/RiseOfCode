/*
  Warnings:

  - The values [CYCLES] on the enum `Theme` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Theme_new" AS ENUM ('BASE', 'ARITHMETIC', 'LOGICS', 'IF', 'FOR', 'FOR2', 'WHILE', 'UNTIL', 'STRING', 'FUNCTION', 'ARRAY', 'ARRAY2', 'RECURSION', 'FILE', 'RANDOM', 'OTHER');
ALTER TABLE "task_themes" ALTER COLUMN "theme" TYPE "Theme_new" USING ("theme"::text::"Theme_new");
ALTER TYPE "Theme" RENAME TO "Theme_old";
ALTER TYPE "Theme_new" RENAME TO "Theme";
DROP TYPE "Theme_old";
COMMIT;
