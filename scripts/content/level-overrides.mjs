// The app's own level decisions where CEFR-J 1.5 disagrees with what learners
// meet at that stage. CEFR-J was built from Japanese learners' course books,
// so a few basic words come out several levels too high (foot = B1,
// friendly = B2). Each entry was reviewed by hand; the content audit uses
// these levels in place of the list's when it checks sentences.

export const LEVEL_OVERRIDES = {
  // Body words and frequency adverbs that beginner courses teach first.
  foot: "A1",
  finger: "A1",
  sometimes: "A1",
  // Classroom language from the first lesson ("I don't understand").
  understand: "A1",
  // Common in beginner materials; CEFR-J rates them B2 and B1.
  friendly: "A2",
  fresh: "A2",
};
