// The A1 grammar syllabus: one lesson per learning day, five a week.
//
// The app shows `lessons[courseDay]` (see src/utils/course.ts), so lesson N here
// is what a learner meets on their Nth finished day. Weeks follow the order a
// beginner needs the structures; every learner-visible sentence uses only A1
// words (the audit and `node scripts/check-curated.mjs A1 --lessons` check it).
//
// Each lesson: a Hebrew explanation with English examples, then 3 questions.
// Weeks 1–5 are written; the rest of the 35 weeks in A1_GRAMMAR_WEEKS follow in
// later batches and fall back to the generated lessons until then.

const gap = (sentence, options, correctIndex, explanation) => ({
  question: sentence,
  questionHe: `השלימו: ${sentence}`,
  options,
  optionsHe: options,
  correctIndex,
  explanation,
});
const pick = (question, questionHe, options, correctIndex, explanation) => ({
  question,
  questionHe,
  options,
  optionsHe: options,
  correctIndex,
  explanation,
});
const lesson = (title, explanation, questions) => ({ title, explanation, questions });

/** The 35 weekly foci, in teaching order. */
export const A1_GRAMMAR_WEEKS = [
  { week: 1, title: "To be: am / is / are", titleHe: "הפועל to be" },
  { week: 2, title: "To be in use", titleHe: "to be בשימוש" },
  { week: 3, title: "Articles and plurals", titleHe: "תווית ורבים" },
  { week: 4, title: "This / that and possessives", titleHe: "זה / ההוא ושייכות" },
  { week: 5, title: "Have / has and there is / are", titleHe: "יש לי ו-there is" },
  { week: 6, title: "Present simple: I, you, we, they", titleHe: "הווה פשוט" },
  { week: 7, title: "Present simple: he, she, it", titleHe: "הווה פשוט בגוף שלישי" },
  { week: 8, title: "Present simple: don't / doesn't", titleHe: "שלילה בהווה פשוט" },
  { week: 9, title: "Present simple questions", titleHe: "שאלות בהווה פשוט" },
  { week: 10, title: "Question words", titleHe: "מילות שאלה" },
  { week: 11, title: "How often: always, never", titleHe: "תדירות" },
  { week: 12, title: "Prepositions of place", titleHe: "מילות יחס של מקום" },
  { week: 13, title: "Prepositions of time", titleHe: "מילות יחס של זמן" },
  { week: 14, title: "Can / can't", titleHe: "יכולת" },
  { week: 15, title: "Commands and let's", titleHe: "ציווי והצעה" },
  { week: 16, title: "Some / any", titleHe: "some ו-any" },
  { week: 17, title: "How much / how many", titleHe: "כמה" },
  { week: 18, title: "Like, love, hate", titleHe: "אוהב ושונא" },
  { week: 19, title: "Present continuous", titleHe: "הווה ממושך" },
  { week: 20, title: "Simple or continuous?", titleHe: "פשוט או ממושך" },
  { week: 21, title: "Adjectives", titleHe: "שמות תואר" },
  { week: 22, title: "Comparing two things", titleHe: "השוואה" },
  { week: 23, title: "The best, the biggest", titleHe: "הפלגה" },
  { week: 24, title: "Object pronouns", titleHe: "כינויי מושא" },
  { week: 25, title: "Want, need, would like", titleHe: "רוצה וצריך" },
  { week: 26, title: "Was / were", titleHe: "to be בעבר" },
  { week: 27, title: "Past simple: -ed verbs", titleHe: "עבר פשוט" },
  { week: 28, title: "Past simple: questions and no", titleHe: "שאלות ושלילה בעבר" },
  { week: 29, title: "Time words for the past", titleHe: "מילות זמן לעבר" },
  { week: 30, title: "Going to", titleHe: "עתיד עם going to" },
  { week: 31, title: "And, but, or", titleHe: "מילות חיבור" },
  { week: 32, title: "Because and so", titleHe: "כי ולכן" },
  { week: 33, title: "Asking politely", titleHe: "בקשות מנומסות" },
  { week: 34, title: "Questions review", titleHe: "חזרה על שאלות" },
  { week: 35, title: "Everything together", titleHe: "חזרה כללית" },
];

export const A1_GRAMMAR = [
  // --- Week 1: to be --------------------------------------------------------
  lesson(
    "I am / you are (אני, אתה)",
    "כמעט כל משפט באנגלית צריך פועל, ו-to be (להיות) אומר מי אנחנו או איך אנחנו. בעברית אין פועל כזה בהווה, באנגלית חובה. עם I אומרים am: I am happy. עם you אומרים are: You are my friend.",
    [
      gap("I ___ a student.", ["am", "is", "are", "be"], 0, "עם I הצורה היא am: I am a student."),
      gap("You ___ my friend.", ["is", "am", "are", "be"], 2, "עם you הצורה היא are: You are my friend."),
      gap("___ am happy.", ["You", "I", "He", "They"], 1, "am הולך רק עם I: I am happy."),
    ],
  ),
  lesson(
    "He is / she is / it is (הוא, היא)",
    "עם he, she ו-it משתמשים ב-is. he לגבר או לילד, she לאישה או לילדה, it לדבר או לחיה: He is a boy. She is my sister. It is a cat.",
    [
      gap("He ___ a teacher.", ["am", "is", "are", "be"], 1, "עם he הצורה היא is: He is a teacher."),
      gap("She ___ happy.", ["are", "am", "is", "be"], 2, "עם she הצורה היא is: She is happy."),
      gap("___ is my sister.", ["She", "I", "You", "They"], 0, "my sister היא בת, לכן she is."),
    ],
  ),
  lesson(
    "We are / they are (אנחנו, הם)",
    "עם we (אנחנו) ו-they (הם, הן) משתמשים ב-are: We are friends. They are at school. גם עם שלושה אנשים או יותר: My mother and my father are in the house.",
    [
      gap("We ___ friends.", ["is", "am", "are", "be"], 2, "עם we הצורה היא are: We are friends."),
      gap("They ___ at school.", ["are", "is", "am", "be"], 0, "עם they הצורה היא are: They are at school."),
      gap("___ are in the house.", ["She", "It", "I", "We"], 3, "are הולך עם we: We are in the house."),
    ],
  ),
  lesson(
    "I am not / he is not (שלילה)",
    "כדי לשלול מוסיפים not אחרי הפועל to be: I am not tired. She is not happy. They are not at home. אפשר גם לקצר: is not = isn't, are not = aren't.",
    [
      gap("I ___ not tired.", ["am", "is", "are", "be"], 0, "עם I נשארים עם am ומוסיפים not: I am not tired."),
      gap("He is ___ a doctor.", ["no", "not", "don't", "isn't"], 1, "not בא אחרי is: He is not a doctor."),
      gap("The boys ___ not at home.", ["is", "am", "are", "be"], 2, "the boys זה רבים, לכן are: The boys are not at home."),
    ],
  ),
  lesson(
    "Am I? Is he? Are you? (שאלות)",
    "כדי לשאול הופכים את הסדר: הפועל בא לפני הנושא. You are a student → Are you a student? She is happy → Is she happy? בתשובה קצרה חוזרים על הפועל: Yes, I am. No, she is not.",
    [
      gap("___ you a student?", ["Is", "Am", "Are", "Be"], 2, "שאלה עם you: Are you a student?"),
      gap("___ she your sister?", ["Is", "Are", "Am", "Be"], 0, "שאלה עם she: Is she your sister?"),
      gap("Is he happy? Yes, he ___.", ["is", "am", "are", "does"], 0, "עונים עם אותו פועל: Yes, he is."),
    ],
  ),

  // --- Week 2: to be in use -------------------------------------------------
  lesson(
    "Where things are (היכן)",
    "עם to be אפשר לומר איפה דבר נמצא: The book is on the table. My brothers are in the kitchen. השאלה: Where is my bag? (יחיד) Where are my bags? (רבים).",
    [
      gap("The book ___ on the table.", ["am", "is", "are", "be"], 1, "the book הוא יחיד, לכן is."),
      gap("My brothers ___ in the kitchen.", ["is", "am", "are", "be"], 2, "my brothers זה רבים, לכן are."),
      gap("Where ___ my bag?", ["is", "are", "am", "be"], 0, "my bag הוא יחיד: Where is my bag?"),
    ],
  ),
  lesson(
    "How things are (תיאור)",
    "אחרי to be אפשר לשים שם תואר: The water is cold. The apples are red. I am hungry. בעברית אומרים “אני רעב” בלי פועל, באנגלית צריך am.",
    [
      gap("The water ___ cold.", ["am", "are", "be", "is"], 3, "the water הוא יחיד: The water is cold."),
      gap("The apples ___ red.", ["are", "is", "am", "be"], 0, "the apples זה רבים: The apples are red."),
      gap("I ___ hungry.", ["is", "are", "am", "be"], 2, "עם I תמיד am: I am hungry."),
    ],
  ),
  lesson(
    "How old are you? (גיל)",
    "באנגלית לא אומרים “יש לי עשר שנים” אלא משתמשים ב-to be: I am ten years old. השאלה היא How old are you? המילים years old אפשר להשמיט: I am ten.",
    [
      gap("How old ___ you?", ["is", "am", "have", "are"], 3, "שואלים על גיל עם to be: How old are you?"),
      gap("I ___ nine years old.", ["am", "have", "is", "are"], 0, "גיל נאמר עם am ולא עם have: I am nine years old."),
      pick(
        "Which sentence is right?",
        "איזה משפט נכון?",
        ["I have ten years.", "I am ten years old.", "I ten years old.", "I are ten."],
        1,
        "באנגלית גיל נאמר עם to be: I am ten years old.",
      ),
    ],
  ),
  lesson(
    "What, where, who (מילות שאלה עם to be)",
    "מתחילים שאלה במילת שאלה ואחריה is או are: What is your name? Where is the teacher? Who is that boy? What לדבר, where למקום, who לאדם.",
    [
      gap("___ is your name?", ["Where", "Who", "What", "Are"], 2, "שואלים על דבר עם what: What is your name?"),
      gap("___ is the teacher? She is in the room.", ["Where", "What", "Who", "Is"], 0, "התשובה היא מקום, לכן where."),
      gap("___ is that boy? He is my brother.", ["What", "Where", "Is", "Who"], 3, "התשובה היא אדם, לכן who."),
    ],
  ),
  lesson(
    "I'm, he's, they're (צורות מקוצרות)",
    "בדיבור מקצרים: I am = I'm, he is = he's, she is = she's, we are = we're, they are = they're. הגרש מחליף את האות שהושמטה: I'm a boy. They're at home.",
    [
      gap("Short form: I am a boy. = ___ a boy.", ["I'm", "He's", "You're", "They're"], 0, "I am מתקצר ל-I'm, עם גרש."),
      gap("He's my father. = He ___ my father.", ["am", "are", "is", "be"], 2, "he's הוא he is."),
      gap("Short form: They are at home. = ___ at home.", ["They're", "We're", "I'm", "He's"], 0, "they are מתקצר ל-they're."),
    ],
  ),

  // --- Week 3: articles and plurals -----------------------------------------
  lesson(
    "A or an (תווית לא מיודעת)",
    "לפני שם עצם ביחיד משתמשים ב-a או an. a לפני צליל עיצור: a book, a girl. an לפני צליל של תנועה: an apple, an egg. עם שמות עצם ברבים לא משתמשים בהם.",
    [
      gap("I have ___ apple.", ["a", "an", "the", "two"], 1, "apple מתחיל בתנועה, לכן an."),
      gap("She is ___ girl.", ["an", "a", "two", "is"], 1, "girl מתחיל בעיצור, לכן a."),
      gap("He has ___ egg.", ["a", "the", "an", "is"], 2, "egg מתחיל בתנועה, לכן an."),
    ],
  ),
  lesson(
    "The (התווית המיודעת)",
    "משתמשים ב-the כשמדברים על דבר מסוים, שכבר הזכרנו או שכולם יודעים מהו: I have a dog. The dog is brown. אותה מילה לכל המספרים: the dog, the dogs.",
    [
      gap("I have a dog. ___ dog is brown.", ["A", "An", "The", "Is"], 2, "הכלב כבר הוזכר, לכן the."),
      gap("I see a cat. ___ cat is big.", ["The", "An", "Is", "A"], 0, "החתול כבר הוזכר, לכן the."),
      gap("Open ___ door, please.", ["a", "the", "an", "is"], 1, "מדובר בדלת מסוימת, לכן the."),
    ],
  ),
  lesson(
    "More than one: -s (רבים)",
    "כדי ליצור רבים מוסיפים s לשם העצם: one book, two books. one cat, three cats. one apple, five apples. עם רבים הפועל הוא are.",
    [
      gap("one book, two ___", ["book", "books", "bookes", "book's"], 1, "מוסיפים s: two books."),
      gap("one cat, three ___", ["cat", "cates", "cats", "cat's"], 2, "מוסיפים s: three cats."),
      gap("There are five ___ on the table.", ["apple", "apples", "an apple", "a apple"], 1, "אחרי five בא רבים: five apples."),
    ],
  ),
  lesson(
    "-es and -ies (רבים מיוחדים)",
    "בשמות כמו bus ו-box מוסיפים בסוף עוד הברה: buses, boxes. בשמות כמו baby משנים את סוף המילה: babies. בשמות כמו boy רק מוסיפים s: boys.",
    [
      gap("one box, two ___", ["boxs", "boxes", "box", "a box"], 1, "אחרי הצליל האחרון של box מוסיפים סיומת נוספת: boxes."),
      gap("one baby, three ___", ["babys", "babyes", "babies", "baby"], 2, "האות האחרונה של baby מוחלפת: babies."),
      gap("one bus, two ___", ["bus", "buss", "a bus", "buses"], 3, "אחרי הצליל האחרון של bus מוסיפים סיומת נוספת: buses."),
    ],
  ),
  lesson(
    "Fish and people (רבים בלי שינוי)",
    "יש שמות עצם שלא משתנים ברבים: one fish, two fish. המילה people היא כבר רבים, ולכן הפועל אחריה הוא are: The people are happy. לא אומרים peoples.",
    [
      gap("one fish, three ___", ["fish", "fishes", "fish's", "a fish"], 0, "fish נשארת אותה מילה ברבים: three fish."),
      gap("The people ___ happy.", ["is", "am", "are", "be"], 2, "people הוא רבים, לכן are."),
      pick(
        "Which sentence is right?",
        "איזה משפט נכון?",
        ["I see two fish.", "I see two a fish.", "I see two fish's.", "I see an fish."],
        0,
        "אחרי two בא רבים, ו-fish לא משתנה: two fish.",
      ),
    ],
  ),

  // --- Week 4: this / that and possessives ----------------------------------
  lesson(
    "This and that (זה, ההוא)",
    "this מצביע על משהו קרוב אלינו, that על משהו רחוק: This is my book. That is a house. שניהם לדבר אחד. לשאלה: What is this? What is that?",
    [
      gap("___ is my book. (it is near me)", ["That", "This", "These", "Those"], 1, "הספר קרוב אליי, לכן this."),
      gap("___ is a house. (it is not here)", ["This", "These", "That", "Is"], 2, "הבית רחוק, לכן that."),
      gap("What is ___? (you hold it in your hand)", ["that", "this", "those", "these"], 1, "דבר שמחזיקים ביד הוא קרוב: this."),
    ],
  ),
  lesson(
    "These and those (אלה, ההם)",
    "these ו-those הם הרבים של this ו-that: These are my shoes (קרוב). Those are birds (רחוק). אחריהם בא are, ושם העצם ברבים.",
    [
      gap("___ are my shoes. (they are near me)", ["This", "That", "Those", "These"], 3, "הנעליים קרובות ורבים: these."),
      gap("___ are birds. (they are not here)", ["Those", "These", "That", "This"], 0, "הציפורים רחוקות ורבים: those."),
      gap("Those ___ big.", ["is", "am", "are", "be"], 2, "those הוא רבים, לכן are."),
    ],
  ),
  lesson(
    "My, your, his, her (של מי?)",
    "מילות שייכות באות לפני שם עצם: my (שלי), your (שלך), his (שלו), her (שלה). I have a dog. My dog is big. He is a boy. His mother is here.",
    [
      gap("She is my sister. ___ name is on the book.", ["His", "Her", "My", "Their"], 1, "אחות היא בת, לכן her."),
      gap("I have a dog. ___ dog is big.", ["My", "Your", "Her", "His"], 0, "הכלב שלי: my dog."),
      gap("He is a boy. ___ mother is here.", ["Her", "My", "His", "Your"], 2, "הוא בן, לכן his."),
    ],
  ),
  lesson(
    "Our and their (שלנו, שלהם)",
    "our הוא “שלנו” ו-their הוא “שלהם” או “שלהן”: We have a house. Our house is big. The girls have bags. Their bags are red.",
    [
      gap("We have a house. ___ house is big.", ["Their", "My", "Our", "Her"], 2, "הבית שלנו: our house."),
      gap("The girls have bags. ___ bags are red.", ["Our", "Their", "His", "Your"], 1, "התיקים שלהן: their bags."),
      gap("You and I are friends. ___ teacher is here.", ["Their", "Her", "Your", "Our"], 3, "החברות שלנו, של אני ואתה: our."),
    ],
  ),
  lesson(
    "'s for owners (הבית של...)",
    "כדי לומר שמשהו שייך למישהו מוסיפים 's לבעלים: the girl's book (הספר של הילדה), my brother's room (החדר של אחי). זה הסדר ההפוך מהעברית.",
    [
      gap("the book of the girl = the ___ book", ["girls", "girl's", "girl", "girls'"], 1, "מוסיפים גרש ו-s: the girl's book."),
      gap("the room of my brother = my ___ room", ["brother", "brothers", "brother is", "brother's"], 3, "מוסיפים גרש ו-s: my brother's room."),
      pick(
        "Which sentence is right?",
        "איזה משפט נכון?",
        ["This is my mothers bag.", "This is my mother bag.", "This is my mother's bag.", "This is my mother is bag."],
        2,
        "שייכות נבנית עם 's: my mother's bag.",
      ),
    ],
  ),

  // --- Week 5: have / has and there is / there are --------------------------
  lesson(
    "I have, she has (יש לי)",
    "“יש לי” באנגלית הוא have: I have a dog. עם he, she, it הצורה היא has: She has a cat. עם you, we, they חוזרים ל-have: They have two bags.",
    [
      gap("I ___ a dog.", ["has", "have", "am", "is"], 1, "עם I הצורה היא have."),
      gap("She ___ a cat.", ["have", "is", "has", "are"], 2, "עם she הצורה היא has."),
      gap("They ___ two bags.", ["has", "have", "is", "are"], 1, "עם they הצורה היא have."),
    ],
  ),
  lesson(
    "I don't have (אין לי)",
    "כדי לומר “אין לי” משתמשים ב-do not (don't) או does not (doesn't) לפני have, והפועל נשאר have: I don't have a bike. She doesn't have a dog. אחרי doesn't אין s.",
    [
      gap("She ___ not have a dog.", ["do", "is", "does", "has"], 2, "עם she השלילה היא does not."),
      gap("We ___ not have a car.", ["does", "do", "is", "are"], 1, "עם we השלילה היא do not."),
      pick(
        "Which sentence is right?",
        "איזה משפט נכון?",
        ["He doesn't has a bike.", "He doesn't have a bike.", "He don't have a bike.", "He not have a bike."],
        1,
        "אחרי doesn't בא have בלי s: He doesn't have a bike.",
      ),
    ],
  ),
  lesson(
    "There is, there are (יש)",
    "כדי לומר שיש משהו במקום מסוים: There is a book on the table (יחיד). There are three chairs in the room (רבים). הפועל מתאים לשם העצם שאחריו.",
    [
      gap("___ is a book on the table.", ["It", "There", "Here", "They"], 1, "פותחים ב-there is: There is a book."),
      gap("There ___ three chairs.", ["is", "am", "are", "be"], 2, "three chairs הוא רבים, לכן are."),
      gap("There ___ a cat in the house.", ["are", "is", "am", "have"], 1, "a cat הוא יחיד, לכן is."),
    ],
  ),
  lesson(
    "There isn't, is there? (אין ושאלה)",
    "שלילה: There isn't (is not) / There aren't (are not). שאלה: Is there a school here? Are there two beds? עונים: Yes, there is. No, there isn't. Yes, there are.",
    [
      gap("There ___ a school here.", ["aren't", "isn't", "not", "don't"], 1, "יחיד בשלילה: There isn't a school here."),
      gap("___ there a cat in the house?", ["Are", "Do", "Has", "Is"], 3, "שואלים עם יחיד: Is there a cat?"),
      gap("Are there two beds? Yes, there ___.", ["is", "are", "have", "do"], 1, "עונים עם are: Yes, there are."),
    ],
  ),
  lesson(
    "Weeks 1–5 together (חזרה)",
    "חזרה על מה שלמדנו: am / is / are, a / an / the, רבים, this / that, my / your / his / her, have / has ו-there is / there are. קראו כל משפט בקול לפני שבוחרים.",
    [
      gap("She ___ an apple and two books.", ["have", "has", "is", "are"], 1, "she has: She has an apple and two books."),
      gap("___ are my friends. (near me)", ["This", "That", "These", "Those"], 2, "רבים וקרובים: these."),
      gap("There ___ five boys in the room.", ["is", "has", "are", "am"], 2, "five boys זה רבים: There are five boys."),
    ],
  ),
];
