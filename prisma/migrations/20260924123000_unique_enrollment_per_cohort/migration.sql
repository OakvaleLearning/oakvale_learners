-- Collapse pre-existing duplicate enrolments before enforcing uniqueness.
-- For each (userId, track, cohort) we keep the row that carries money (or the
-- newest one if none do) and remove only leftovers that have never been paid,
-- so no payment history is discarded. If a learner somehow has two paid rows
-- for the same cohort, the index below fails loudly rather than quietly
-- dropping a paid enrolment.
DELETE FROM "Enrollment" WHERE "id" IN (
  SELECT ranked."id" FROM (
    SELECT e."id", e."amountPaid", ROW_NUMBER() OVER (
      PARTITION BY e."userId", e."track", e."cohort"
      ORDER BY (e."amountPaid" > 0) DESC, e."createdAt" DESC
    ) AS rn
    FROM "Enrollment" e
  ) ranked
  WHERE ranked.rn > 1 AND ranked."amountPaid" = 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_track_cohort_key" ON "Enrollment"("userId", "track", "cohort");
