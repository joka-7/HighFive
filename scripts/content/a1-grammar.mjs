// The A1 grammar syllabus: one lesson per learning day, five a week.
//
// The app shows `lessons[courseDay]` (see src/utils/course.ts), so lesson N here
// is what a learner meets on their Nth finished day. Weeks follow the order a
// beginner needs the structures; every learner-visible sentence uses only A1
// words (the audit and `node scripts/check-curated.mjs A1 --lessons` check it).
//
// Each lesson: a Hebrew explanation with English examples, then 3 questions.
// Weeks 1–15 are written; the rest of the 35 weeks in A1_GRAMMAR_WEEKS follow in
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
    "עם we (אנחנו) ו-they (הם, הן) משתמשים ב-are: We are friends. They are at school. גם עם שני אנשים או יותר: My mother and my father are in the house.",
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
      gap("I have ___ apple.", ["a", "an", "is", "two"], 1, "apple מתחיל בתנועה, לכן an."),
      gap("She is ___ girl.", ["an", "a", "two", "is"], 1, "girl מתחיל בעיצור, לכן a."),
      gap("He has ___ egg.", ["a", "two", "an", "is"], 2, "egg מתחיל בתנועה, לכן an."),
    ],
  ),
  lesson(
    "The (התווית המיודעת)",
    "משתמשים ב-the כשמדברים על דבר מסוים, שכבר הזכרנו או שכולם יודעים מהו: I have a dog. The dog is brown. אותה מילה לכל המספרים: the dog, the dogs.",
    [
      gap("I have a dog. ___ dog is brown.", ["Two", "An", "The", "Is"], 2, "הכלב כבר הוזכר, לכן the."),
      gap("I see a cat. ___ cat is big.", ["The", "An", "Is", "Two"], 0, "החתול כבר הוזכר, לכן the."),
      gap("Open ___ door, please.", ["the", "an", "is", "two"], 0, "מדובר בדלת מסוימת, לכן the."),
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
    "בשמות כמו bus ו-box מוסיפים בסוף עוד הברה: buses, boxes. בשמות כמו baby (עיצור לפני סוף המילה) משנים את סוף המילה: babies. אחרי תנועה, כמו ב-boy, רק מוסיפים s: boys.",
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
      gap("one fish, three ___", ["fish", "fishs", "fish's", "a fish"], 0, "fish נשארת אותה מילה ברבים: three fish."),
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
    "these ו-those הם הרבים של this ו-that: These are my shoes (קרוב). Those are birds (רחוק). אחריהם בא are (These are shoes) או שם עצם ברבים (These shoes are big).",
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
      gap("She is my sister. ___ name is on the book. (the name of my sister)", ["His", "Her", "My", "Their"], 1, "אחות היא בת, לכן her."),
      gap("I have a dog. ___ dog is big. (the dog is mine)", ["My", "Your", "Her", "His"], 0, "הכלב שלי: my dog."),
      gap("He is a boy. ___ mother is here. (the mother of the boy)", ["Her", "My", "His", "Your"], 2, "הוא בן, לכן his."),
    ],
  ),
  lesson(
    "Our and their (שלנו, שלהם)",
    "our הוא “שלנו” ו-their הוא “שלהם” או “שלהן”: We have a house. Our house is big. The girls have bags. Their bags are red.",
    [
      gap("We have a house. ___ house is big. (the house of us)", ["Their", "My", "Our", "Her"], 2, "הבית שלנו: our house."),
      gap("The girls have bags. ___ bags are red. (the bags of the girls)", ["Our", "Their", "His", "Your"], 1, "התיקים שלהן: their bags."),
      gap("You and I are friends. ___ teacher is here. (the teacher of you and me)", ["Their", "Her", "Your", "Our"], 3, "המורה של שנינו, אני ואתה: our teacher."),
    ],
  ),
  lesson(
    "'s for owners (הבית של...)",
    "כדי לומר שמשהו שייך למישהו מוסיפים 's לבעלים: the girl's book (הספר של הילדה), my brother's room (החדר של אחי). זה הסדר ההפוך מהעברית.",
    [
      gap("the book of the girl = the ___ book", ["girls", "girl's", "girl", "girl is"], 1, "מוסיפים גרש ו-s: the girl's book."),
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
      gap("___ is a book on the table.", ["There", "They", "We", "I"], 0, "פותחים ב-there is: There is a book."),
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

  // --- Week 6: present simple, I / you / we / they -------------------------
  lesson(
    "I play, you play (הווה פשוט)",
    "הווה פשוט מתאר הרגלים, שגרה ודברים שתמיד נכונים: I play football on Sunday. You eat at home. עם I ו-you הפועל נשאר בצורה הבסיסית, בלי סיומת.",
    [
      gap("I ___ football on Sunday.", ["play", "plays", "playing", "am play"], 0, "עם I הפועל נשאר בצורה הבסיסית: I play."),
      gap("You ___ milk in the morning.", ["drinks", "drink", "drinking", "is drink"], 1, "עם you הפועל נשאר בצורה הבסיסית: You drink."),
      gap("I ___ at school.", ["study", "studies", "studying", "am study"], 0, "עם I אין סיומת: I study."),
    ],
  ),
  lesson(
    "We eat, they live (אנחנו והם)",
    "גם עם we ו-they הפועל נשאר בצורה הבסיסית: We eat bread for breakfast. They live in a big house. שני אנשים, כמו my friend and I, הם we.",
    [
      gap("We ___ bread for breakfast.", ["eats", "eating", "eat", "is eat"], 2, "עם we הפועל נשאר בצורה הבסיסית: We eat."),
      gap("They ___ in a big house.", ["live", "lives", "living", "are live"], 0, "עם they הפועל נשאר בצורה הבסיסית: They live."),
      gap("My friend and I ___ games.", ["plays", "play", "playing", "is play"], 1, "my friend and I הם we, לכן: play."),
    ],
  ),
  lesson(
    "Every day (שגרה)",
    "הווה פשוט מתאים לשגרה, ובדרך כלל מוסיפים מתי: in the morning, at night, on Monday. I wake up at seven. They watch TV in the evening.",
    [
      gap("I ___ up at seven.", ["wake", "wakes", "waking", "am wake"], 0, "עם I: I wake up."),
      gap("We ___ lunch at school.", ["eats", "eating", "is eat", "eat"], 3, "עם we: We eat."),
      gap("They ___ TV in the evening.", ["watch", "watches", "watching", "is watch"], 0, "עם they: They watch."),
    ],
  ),
  lesson(
    "Things that are always true (עובדות)",
    "משתמשים בהווה פשוט גם לעובדות: Fish swim. Dogs drink water. People live in houses. שמות עצם ברבים מתנהגים כמו they, והפועל בצורה הבסיסית.",
    [
      gap("Dogs ___ water.", ["drink", "drinks", "drinking", "is drink"], 0, "dogs הוא רבים: Dogs drink."),
      gap("People ___ in houses.", ["lives", "living", "live", "is live"], 2, "people הוא רבים: People live."),
      gap("Fish ___ in water.", ["swim", "swims", "swimming", "is swim"], 0, "fish כאן הוא רבים: Fish swim."),
    ],
  ),
  lesson(
    "I, you, we, they together (חזרה)",
    "חזרה: עם I, you, we ו-they הפועל בצורה הבסיסית. אין am, is או are לפני פועל רגיל, ואין סיומת של פעולה מתמשכת בהווה פשוט.",
    [
      pick("Which sentence is right?", "איזה משפט נכון?", ["I plays football.", "I play football.", "I am play football.", "I playing football."], 1, "עם I: I play football."),
      gap("You ___ to school.", ["go", "goes", "going", "is go"], 0, "עם you: You go."),
      gap("They ___ a book at night.", ["reads", "reading", "read", "is read"], 2, "עם they: They read."),
    ],
  ),

  // --- Week 7: present simple, he / she / it ---------------------------------
  lesson(
    "She plays, he plays (s בגוף שלישי)",
    "עם he, she ו-it מוסיפים s לפועל: She plays football. He speaks to me. The cat drinks milk. זה הכלל הכי חשוב בהווה פשוט.",
    [
      gap("She ___ football.", ["play", "plays", "playing", "is play"], 1, "עם she מוסיפים s: She plays."),
      gap("He ___ to me.", ["speak", "speaking", "speaks", "is speak"], 2, "עם he מוסיפים s: He speaks."),
      gap("The cat ___ milk.", ["drinks", "drink", "drinking", "is drink"], 0, "the cat הוא it, לכן מוסיפים s: drinks."),
    ],
  ),
  lesson(
    "Watches, goes (סיומות מיוחדות)",
    "בפעלים כמו watch ו-go מוסיפים בסוף שתי אותיות ולא רק אחת: He watches TV. She goes to school. בשאר הפעלים מוסיפים רק s.",
    [
      gap("He ___ TV at night.", ["watch", "watchs", "watches", "watching"], 2, "אחרי watch מוסיפים עוד הברה: watches."),
      gap("She ___ to school.", ["go", "gos", "goes", "going"], 2, "go הופך ל-goes."),
      gap("My brother ___ football on Sunday.", ["play", "plays", "playing", "is play"], 1, "בפועל רגיל מוסיפים רק s: plays."),
    ],
  ),
  lesson(
    "Study becomes studies (שינוי סוף הפועל)",
    "בפועל כמו study, שיש עיצור לפני האות האחרונה שלו, משנים את סוף המילה: study → studies. בפועל כמו play, שיש תנועה לפני האות האחרונה שלו, רק מוסיפים s: play → plays. She studies at school. He plays football.",
    [
      gap("She ___ at school.", ["study", "studys", "studies", "studying"], 2, "study הופך ל-studies."),
      gap("She ___ football.", ["plays", "plaies", "playes", "play"], 0, "אחרי תנועה רק מוסיפים s: plays."),
      pick("Which sentence is right?", "איזה משפט נכון?", ["He studys at school.", "He studies at school.", "He study at school.", "He is studies at school."], 1, "study הופך ל-studies עם he."),
    ],
  ),
  lesson(
    "Has and does (פעלים מיוחדים)",
    "שני פעלים משתנים לגמרי עם he, she, it: have → has, do → does. She has a dog. He does his work at home.",
    [
      gap("She ___ a dog.", ["have", "has", "haves", "having"], 1, "have הופך ל-has: She has a dog."),
      gap("He ___ his work at home.", ["do", "does", "dos", "doing"], 1, "do הופך ל-does: He does his work."),
      pick("Which sentence is right?", "איזה משפט נכון?", ["My sister haves a cat.", "My sister has a cat.", "My sister have a cat.", "My sister is has a cat."], 1, "עם my sister (she): has."),
    ],
  ),
  lesson(
    "Who gets the s? (מי מקבל s)",
    "יחיד: he, she, it ושם עצם ביחיד מקבלים s. רבים, I ו-you לא. My sister lives here. My brothers play football. The dog sleeps in the garden.",
    [
      gap("My sister ___ in a big house.", ["live", "lives", "living", "are live"], 1, "my sister הוא she: lives."),
      gap("My brothers ___ football.", ["plays", "playing", "is play", "play"], 3, "my brothers הם they: play."),
      gap("The dog ___ in the garden.", ["sleep", "sleeping", "sleeps", "are sleep"], 2, "the dog הוא it: sleeps."),
    ],
  ),

  // --- Week 8: present simple, don't / doesn't -------------------------------
  lesson(
    "I don't, you don't (שלילה)",
    "כדי לשלול בהווה פשוט משתמשים ב-don't לפני הפועל: I don't like milk. You don't eat bread. אחרי don't הפועל בצורה הבסיסית. don't הוא do not.",
    [
      gap("I ___ like milk.", ["don't", "doesn't", "am not", "not"], 0, "עם I שוללים עם don't."),
      gap("You ___ eat bread.", ["doesn't", "don't", "aren't", "isn't"], 1, "עם you שוללים עם don't."),
      gap("I don't ___ TV.", ["watch", "watches", "watching", "to watch"], 0, "אחרי don't הפועל בצורה הבסיסית: watch."),
    ],
  ),
  lesson(
    "She doesn't, he doesn't (שלילה בגוף שלישי)",
    "עם he, she ו-it שוללים עם doesn't. הפועל אחריו חוזר לצורה הבסיסית, בלי s: She doesn't like fish. He doesn't speak to me.",
    [
      gap("She ___ like fish.", ["don't", "doesn't", "isn't", "not"], 1, "עם she שוללים עם doesn't."),
      gap("He doesn't ___ to me.", ["speak", "speaks", "speaking", "is speak"], 0, "אחרי doesn't אין s: speak."),
      pick("Which sentence is right?", "איזה משפט נכון?", ["She doesn't likes tea.", "She doesn't like tea.", "She don't like tea.", "She not like tea."], 1, "doesn't + פועל בלי s: She doesn't like tea."),
    ],
  ),
  lesson(
    "We don't, they don't (שלילה ברבים)",
    "עם we, they ושמות עצם ברבים שוללים עם don't: We don't live in a big house. They don't play football. My friends don't like milk.",
    [
      gap("We ___ live in a big house.", ["doesn't", "don't", "isn't", "not"], 1, "עם we שוללים עם don't."),
      gap("They ___ play football.", ["don't", "doesn't", "aren't", "isn't"], 0, "עם they שוללים עם don't."),
      gap("My friends ___ like milk.", ["doesn't", "don't", "aren't", "isn't"], 1, "my friends הם they: don't."),
    ],
  ),
  lesson(
    "Don't or doesn't? (בחירה)",
    "בוחרים לפי הנושא: don't עם I, you, we, they ורבים. doesn't עם he, she, it ויחיד. My mother doesn't work on Sunday. My brother and I don't eat fish.",
    [
      gap("My mother ___ work on Sunday.", ["don't", "doesn't", "isn't", "aren't"], 1, "my mother היא she: doesn't."),
      gap("My brother and I ___ eat fish.", ["doesn't", "isn't", "don't", "aren't"], 2, "my brother and I הם we: don't."),
      gap("The cat ___ drink water.", ["don't", "doesn't", "isn't", "aren't"], 1, "the cat הוא it: doesn't."),
    ],
  ),
  lesson(
    "Do not, does not (צורה מלאה)",
    "don't הוא do not, ו-doesn't הוא does not. בכתיבה מלאה אומרים: I do not like cold water. She does not like tea. תמיד אחריהם פועל בצורה הבסיסית.",
    [
      gap("She does ___ like tea.", ["not", "no", "don't", "isn't"], 0, "does not = doesn't."),
      gap("We do ___ play here.", ["not", "no", "doesn't", "isn't"], 0, "do not = don't."),
      gap("I ___ not like cold water.", ["do", "does", "am", "is"], 0, "עם I: I do not."),
    ],
  ),

  // --- Week 9: present simple questions --------------------------------------
  lesson(
    "Do you...? (שאלות)",
    "כדי לשאול בהווה פשוט מתחילים ב-do לפני הנושא: Do you like milk? Do they play football? אחרי הנושא בא פועל בצורה הבסיסית.",
    [
      gap("___ you like rice?", ["Do", "Does", "Are", "Is"], 0, "שאלה עם you מתחילה ב-Do."),
      gap("___ they play football?", ["Do", "Does", "Are", "Is"], 0, "שאלה עם they מתחילה ב-Do."),
      gap("Do you ___ to him?", ["speak", "speaks", "speaking", "to speak"], 0, "אחרי Do you בא פועל בצורה הבסיסית."),
    ],
  ),
  lesson(
    "Does she...? (שאלות בגוף שלישי)",
    "עם he, she ו-it שואלים עם does: Does she live here? Does he have a dog? אחרי does הפועל בצורה הבסיסית, בלי s, כי does כבר נושא את ה-s.",
    [
      gap("___ she live here?", ["Do", "Does", "Is", "Are"], 1, "שאלה עם she מתחילה ב-Does."),
      gap("Does he ___ a dog?", ["have", "has", "having", "is"], 0, "אחרי does: have, לא has."),
      gap("___ your mother work at home?", ["Do", "Does", "Is", "Are"], 1, "your mother היא she: Does."),
    ],
  ),
  lesson(
    "Yes, I do / No, she doesn't (תשובות קצרות)",
    "עונים בקצרה עם do או does, בלי לחזור על הפועל: Do you like tea? Yes, I do. Does she live here? No, she doesn't.",
    [
      gap("Do you like tea? Yes, I ___.", ["do", "does", "like", "am"], 0, "עונים: Yes, I do."),
      gap("Does she live here? No, she ___.", ["don't", "doesn't", "isn't", "not"], 1, "עונים: No, she doesn't."),
      gap("Do they play? Yes, they ___.", ["do", "does", "play", "are"], 0, "עונים: Yes, they do."),
    ],
  ),
  lesson(
    "Word order in questions (סדר המילים)",
    "הסדר בשאלה הוא: Do או Does, אחריו הנושא, ואחריו הפועל בצורה הבסיסית. Do you like milk? Does she play football? לא אומרים Does she plays.",
    [
      pick("Which question is right? (milk)", "איזו שאלה נכונה? (חלב)", ["Do you like milk?", "Do you milk like?", "Like you milk?", "Do like you milk?"], 0, "הסדר: Do + נושא + פועל."),
      pick("Which question is right? (football)", "איזו שאלה נכונה? (כדורגל)", ["Does she plays football?", "Does she play football?", "Do she play football?", "She does plays football?"], 1, "אחרי Does she בא פועל בלי s."),
      gap("___ your friends live here?", ["Do", "Does", "Is", "Are"], 0, "your friends הם they: Do."),
    ],
  ),
  lesson(
    "Is, are, do or does? (שילוב)",
    "עם to be (am, is, are) שואלים בלי do: Is she a teacher? Are they at home? עם פועל רגיל שואלים עם do או does: Does she like school?",
    [
      gap("___ she a teacher?", ["Is", "Does", "Do", "Are"], 0, "עם to be: Is she a teacher?"),
      gap("___ she like school?", ["Is", "Does", "Do", "Are"], 1, "עם פועל רגיל: Does she like school?"),
      gap("___ they at home?", ["Do", "Does", "Are", "Is"], 2, "עם to be: Are they at home?"),
    ],
  ),

  // --- Week 10: question words ------------------------------------------------
  lesson(
    "What (מה)",
    "what שואל על דבר. אחריו בא do או does ואז הנושא: What do you eat? What does she drink? What do you do on Sunday?",
    [
      gap("___ do you eat? I eat bread.", ["What", "Where", "Who", "When"], 0, "התשובה היא דבר, לכן what."),
      gap("What ___ she drink? She drinks milk.", ["do", "does", "is", "are"], 1, "עם she: does."),
      gap("What ___ you do on Sunday? I play football.", ["do", "does", "are", "is"], 0, "עם you: do."),
    ],
  ),
  lesson(
    "Where (איפה)",
    "where שואל על מקום: Where do you live? Where does your father work? Where do they play? גם כאן do או does אחרי מילת השאלה.",
    [
      gap("___ do you live? I live in a house.", ["Where", "What", "Who", "Why"], 0, "התשובה היא מקום, לכן where."),
      gap("Where ___ your father work?", ["do", "does", "is", "are"], 1, "your father הוא he: does."),
      gap("Where ___ they play? They play in the park.", ["do", "does", "is", "are"], 0, "עם they: do."),
    ],
  ),
  lesson(
    "When and what time (מתי)",
    "when שואל על זמן: When do you wake up? אפשר לשאול גם What time...? בתשובה שעה: At seven. What time is it? It is ten.",
    [
      gap("___ do you wake up? At seven.", ["When", "Where", "Who", "Why"], 0, "התשובה היא זמן, לכן when."),
      gap("What ___ is it? It is ten.", ["time", "year", "where", "who"], 0, "שואלים על השעה: What time is it?"),
      gap("When ___ she play? On Monday.", ["do", "does", "is", "are"], 1, "עם she: does."),
    ],
  ),
  lesson(
    "Who and why (מי ולמה)",
    "who שואל על אדם: Who lives here? why שואל על סיבה, והתשובה מתחילה ב-because: Why do you like it? Because it is big.",
    [
      gap("___ lives here? My sister.", ["Who", "Where", "What", "When"], 0, "התשובה היא אדם, לכן who."),
      gap("___ do you like it? Because it is big.", ["Why", "Who", "Where", "When"], 0, "התשובה היא סיבה, לכן why."),
      gap("Who ___ the girl? She is my friend.", ["is", "does", "do", "are"], 0, "עם the girl: Who is the girl?"),
    ],
  ),
  lesson(
    "How (איך)",
    "how שואל איך עושים משהו, וגם שואל על גיל או על תדירות (How old, How often): How do you go to school? By bus. How old are you? I am ten. שימו לב לסדר: מילת שאלה, do או does, נושא, פועל.",
    [
      gap("___ do you go to school? By bus.", ["How", "Who", "Why", "When"], 0, "התשובה היא איך נוסעים, לכן how."),
      gap("How ___ are you?", ["old", "time", "who", "what"], 0, "שואלים על גיל: How old are you?"),
      pick("Which question is right?", "איזו שאלה נכונה?", ["What you do on Sunday?", "What do you do on Sunday?", "What you are do on Sunday?", "What does you do on Sunday?"], 1, "הסדר: What + do + you + פועל."),
    ],
  ),

  // --- Week 11: how often ------------------------------------------------------
  lesson(
    "Always, usually, sometimes, never (תדירות)",
    "מילות תדירות אומרות כמה פעמים עושים משהו: always (תמיד), usually (בדרך כלל), often (לעיתים קרובות), sometimes (לפעמים), never (אף פעם).",
    [
      gap("I ___ eat bread for breakfast. (every day)", ["always", "never", "sometimes", "usually"], 0, "כל יום הוא always."),
      gap("She ___ drinks coffee. (not at all)", ["never", "always", "usually", "often"], 0, "בכלל לא הוא never."),
      pick("What does never mean?", "מה פירוש never?", ["אף פעם", "תמיד", "לפעמים", "בדרך כלל"], 0, "never = אף פעם."),
    ],
  ),
  lesson(
    "Before the verb (מקום המילה)",
    "מילת התדירות באה לפני הפועל הרגיל: I always play football. He never watches TV. They sometimes go to school by bus.",
    [
      pick("Which sentence is right? (always)", "איזה משפט נכון? (always)", ["I always play football.", "I play always football.", "I play football always is.", "I always am play football."], 0, "מילת התדירות לפני הפועל: I always play."),
      pick("Which sentence is right? (never)", "איזה משפט נכון? (never)", ["He never watches TV.", "He watches never TV.", "He never watch TV.", "He is never watches TV."], 0, "He never watches TV."),
      gap("They ___ go to school by bus.", ["sometimes", "are sometimes", "is sometimes", "am sometimes"], 0, "sometimes לפני הפועל."),
    ],
  ),
  lesson(
    "After am, is, are (עם to be)",
    "עם to be המילה באה אחרי הפועל: She is always happy. We are often at school. I am never late.",
    [
      pick("Which sentence is right? (always happy)", "איזה משפט נכון? (always happy)", ["She is always happy.", "She always is happy.", "She always happy.", "She is happy always is."], 0, "אחרי is: She is always happy."),
      pick("Which sentence is right? (often at school)", "איזה משפט נכון? (often at school)", ["We are often at school.", "We often are at school.", "We often at school.", "We are at school often is."], 0, "אחרי are: We are often at school."),
      gap("I am ___ happy at school. (every day)", ["always", "never", "sometimes", "often"], 0, "אחרי am: I am always happy."),
    ],
  ),
  lesson(
    "How often? (כל כמה זמן)",
    "How often...? שואל על תדירות: How often do you play football? Sometimes. How often does she go to school? Always. עונים עם מילת תדירות.",
    [
      gap("___ do you play football? Sometimes.", ["How often", "How old", "What time", "Where"], 0, "התשובה היא תדירות: How often."),
      gap("How often ___ she go to school? Always.", ["do", "does", "is", "are"], 1, "עם she: does."),
      gap("How often do you eat fish? ___.", ["Never", "Yes, I do", "At home", "By bus"], 0, "תשובה על תדירות: Never."),
    ],
  ),
  lesson(
    "Always, often, never: practice (חזרה)",
    "חזרה: מילת תדירות לפני פועל רגיל ואחרי to be. אם אפשר, הוסיפו גם מתי: I usually wake up at seven.",
    [
      pick("Which sentence is right? (usually)", "איזה משפט נכון? (usually)", ["I usually wake up at seven.", "I wake usually up at seven.", "Usually wake I up at seven.", "I am usually wake up at seven."], 0, "מילת התדירות לפני הפועל."),
      pick("Which sentence is right? (often)", "איזה משפט נכון? (often)", ["My father is often at home.", "My father often is at home.", "My father often at home.", "My father is at home often is."], 0, "אחרי is: is often."),
      gap("She ___ drinks milk in the morning. (every day)", ["always", "never", "sometimes", "often"], 0, "כל יום הוא always."),
    ],
  ),

  // --- Week 12: prepositions of place ------------------------------------------
  lesson(
    "In and on (ב-, על)",
    "in אומר שמשהו בתוך משהו: in the box, in the house. on אומר שמשהו על משטח: on the table, on the bed.",
    [
      gap("The book is ___ the table. (on top of it)", ["in", "on", "at", "by"], 1, "על השולחן הוא on."),
      gap("The milk is ___ the box. (inside it)", ["in", "on", "at", "next"], 0, "בתוך הקופסה הוא in."),
      gap("The cat is ___ the chair. (on top of it)", ["in", "at", "on", "by"], 2, "על הכיסא הוא on."),
    ],
  ),
  lesson(
    "At (ב-, נקודת מקום)",
    "at משמש למקום כנקודה: at school, at home, at the door. Is he at home? She is at school.",
    [
      gap("My brother is ___ school.", ["at", "on", "under", "between"], 0, "at school."),
      gap("I am ___ home.", ["in", "at", "on", "to"], 1, "at home."),
      gap("She is ___ the door. (she stands near it)", ["at", "in", "under", "between"], 0, "at the door."),
    ],
  ),
  lesson(
    "Under, behind, in front of (מתחת, מאחורי, לפני)",
    "under הוא מתחת, behind הוא מאחורי, in front of הוא לפני. The dog is under the table. The garden is behind the house. The bus is in front of the school.",
    [
      gap("The dog is ___ the table. (below it)", ["under", "on", "in", "at"], 0, "מתחת הוא under."),
      gap("The garden is ___ the house. (at the back of it)", ["behind", "in front of", "under", "on"], 0, "מאחורי הוא behind."),
      gap("The bus is ___ the school. (at the front of it)", ["in front of", "behind", "under", "on"], 0, "לפני הוא in front of."),
    ],
  ),
  lesson(
    "Next to and between (ליד, בין)",
    "next to הוא ליד, between הוא בין שני דברים: The shop is next to the school. The park is between the shop and the school.",
    [
      gap("The shop is ___ the school. (at its side)", ["next to", "between", "under", "behind"], 0, "ליד הוא next to."),
      gap("The park is ___ the shop and the school. (in the middle)", ["between", "next", "in", "at"], 0, "בין שניים הוא between."),
      gap("The girl is ___ her mother. (at her side)", ["under", "between", "next to", "behind"], 2, "ליד הוא next to."),
    ],
  ),
  lesson(
    "Where is it? (איפה זה)",
    "עונים על Where? עם to be ומילת יחס: Where is the cat? It is under the bed. Where are my books? They are in the bag.",
    [
      gap("Where is the cat? It is ___ the bed. (below it)", ["under", "on", "between", "behind"], 0, "מתחת הוא under."),
      gap("Where are my books? They are ___ the bag. (inside it)", ["in", "on", "at", "under"], 0, "בתוך התיק הוא in."),
      pick("Which answer is right? Where is the dog?", "איזו תשובה נכונה? Where is the dog?", ["It is in front of the house.", "It is in front the house.", "It is front of the house.", "It in front of the house."], 0, "צריך לכתוב את כל הביטוי: in front of."),
    ],
  ),

  // --- Week 13: prepositions of time --------------------------------------------
  lesson(
    "At seven (על שעה)",
    "עם שעה משתמשים ב-at: I wake up at seven. The lesson is at ten. We eat lunch at twelve.",
    [
      gap("I eat breakfast ___ seven.", ["at", "on", "in", "to"], 0, "עם שעה: at."),
      gap("The lesson is ___ ten.", ["on", "at", "in", "to"], 1, "עם שעה: at."),
      gap("We eat lunch ___ twelve.", ["in", "on", "to", "at"], 3, "עם שעה: at."),
    ],
  ),
  lesson(
    "On Monday (על יום)",
    "עם ימי השבוע משתמשים ב-on: I read a book on Sunday. She works on Monday. The shop is open on Saturday.",
    [
      gap("I read a book ___ Sunday.", ["on", "at", "in", "to"], 0, "עם יום: on."),
      gap("She works ___ Monday.", ["at", "in", "on", "to"], 2, "עם יום: on."),
      gap("The shop is open ___ Saturday.", ["on", "at", "in", "to"], 0, "עם יום: on."),
    ],
  ),
  lesson(
    "In winter, in January (בחודש ובעונה)",
    "עם חודשים ועונות משתמשים ב-in: It is cold in winter. My birthday is in January. It is hot in summer.",
    [
      gap("It is cold ___ winter.", ["in", "on", "at", "to"], 0, "עם עונה: in."),
      gap("My birthday is ___ January.", ["on", "at", "in", "to"], 2, "עם חודש: in."),
      gap("It is hot ___ summer.", ["in", "on", "at", "to"], 0, "עם עונה: in."),
    ],
  ),
  lesson(
    "In the morning, at night (חלקי היום)",
    "אומרים in the morning, in the afternoon, in the evening, אבל at night. I eat breakfast in the morning. I sleep at night.",
    [
      gap("I eat breakfast ___ the morning.", ["in", "at", "on", "by"], 0, "in the morning."),
      gap("I sleep ___ night.", ["at", "in", "on", "by"], 0, "at night."),
      gap("We watch TV ___ the evening.", ["at", "on", "to", "in"], 3, "in the evening."),
    ],
  ),
  lesson(
    "At, on or in? (בחירה)",
    "חזרה: at לשעה, on ליום, in לחודש, לעונה ולחלקי היום (חוץ מ-at night).",
    [
      gap("She plays ___ the afternoon.", ["in", "on", "at", "by"], 0, "in the afternoon."),
      gap("We go to school ___ Sunday.", ["in", "at", "on", "by"], 2, "עם יום: on."),
      gap("My mother wakes up ___ six.", ["at", "on", "in", "to"], 0, "עם שעה: at."),
    ],
  ),

  // --- Week 14: can / can't --------------------------------------------------------
  lesson(
    "I can swim (יכולת)",
    "can אומר שאפשר או שיודעים לעשות משהו: I can swim. She can sing. אחרי can בא פועל בצורה הבסיסית, בלי s ובלי to, גם עם he ו-she.",
    [
      gap("I ___ swim.", ["can", "cans", "am", "to"], 0, "can + פועל: I can swim."),
      gap("She ___ sing.", ["can", "cans", "is", "to"], 0, "גם עם she: can, בלי s."),
      gap("Fish ___ swim.", ["can", "cans", "are", "does"], 0, "גם עם רבים: can swim."),
    ],
  ),
  lesson(
    "I can't swim (אי-יכולת)",
    "השלילה היא can't: I can't swim. She can't sing. אחרי can't הפועל בצורה הבסיסית.",
    [
      gap("I ___ swim, so I do not go in the water.", ["can't", "can", "doesn't", "not"], 0, "אם אי אפשר לשחות, לא נכנסים למים: can't."),
      gap("He can ___ to me.", ["speak", "speaks", "speaking", "to speak"], 0, "אחרי can פועל בצורה הבסיסית."),
      pick("Which sentence is right?", "איזה משפט נכון?", ["She can't sings.", "She can't sing.", "She doesn't can sing.", "She can't to sing."], 1, "can't + פועל בצורה הבסיסית."),
    ],
  ),
  lesson(
    "Can you...? (שאלה)",
    "בשאלה can עובר לפני הנושא: Can you swim? Can she sing? תשובה קצרה: Yes, I can. No, I can't.",
    [
      gap("___ you swim?", ["Can", "Does", "Are", "Is"], 0, "שאלה על יכולת: Can you swim?"),
      gap("Can she ___ to you?", ["speak", "speaks", "speaking", "to speak"], 0, "אחרי Can she: פועל בצורה הבסיסית."),
      gap("Can you ride a bike? Yes, I ___.", ["can", "do", "am", "does"], 0, "עונים: Yes, I can."),
    ],
  ),
  lesson(
    "Can I...? (בקשה ורשות)",
    "can משמש גם לבקשה ולרשות: Can I open the door, please? Can you open the window, please? כך מבקשים בנימוס.",
    [
      gap("___ I open the door, please?", ["Can", "Are", "Is", "Does"], 0, "בקשת רשות: Can I...?"),
      gap("Can you ___ the door, please?", ["open", "opens", "opening", "to open"], 0, "אחרי Can you: open."),
      pick("Which sentence is right?", "איזה משפט נכון?", ["Can I to open the window?", "Can I open the window?", "Can I opens the window?", "Can I opening the window?"], 1, "Can I + פועל בצורה הבסיסית."),
    ],
  ),
  lesson(
    "Can, can't, do, don't (שילוב)",
    "חזרה: can לא משתנה ואחריו פועל בצורה הבסיסית. בשאלה ובשלילה עם פועל רגיל משתמשים ב-do או does.",
    [
      gap("My brother ___ swim, but he can't sing.", ["can", "cans", "does", "is"], 0, "can בלי s."),
      gap("___ your sister sing?", ["Can", "Are", "Is", "Am"], 0, "שאלה על יכולת: Can."),
      gap("I ___ like milk, but I can drink water.", ["don't", "can", "am", "isn't"], 0, "אומרים don't like."),
    ],
  ),

  // --- Week 15: commands and let's -----------------------------------------------
  lesson(
    "Open the door (ציווי)",
    "כדי לתת הוראה מתחילים בפועל, בלי נושא: Open the door. Read your book. Sit here. הפועל בצורה הבסיסית.",
    [
      gap("___ the door, please.", ["Open", "Opens", "Opening", "To open"], 0, "הוראה: Open."),
      gap("___ your book.", ["Read", "Reads", "Reading", "To read"], 0, "הוראה: Read."),
      gap("___ here.", ["Sit", "Sits", "Sitting", "Is sit"], 0, "הוראה: Sit."),
    ],
  ),
  lesson(
    "Don't run (איסור)",
    "כדי לאסור מתחילים ב-don't: Don't run in the school. Don't sit here. אחרי don't פועל בצורה הבסיסית.",
    [
      gap("___ run in the school.", ["Don't", "Doesn't", "Not", "No"], 0, "איסור: Don't."),
      gap("Don't ___ here.", ["sit", "sits", "sitting", "to sit"], 0, "אחרי Don't: sit."),
      pick("Which sentence is right?", "איזה משפט נכון?", ["Don't to run.", "Don't run.", "No run.", "Not run."], 1, "Don't run."),
    ],
  ),
  lesson(
    "Please (בבקשה)",
    "כדי להיות מנומסים מוסיפים please בתחילת ההוראה או בסופה: Please open the window. Close the door, please.",
    [
      pick("Which sentence is good to say to a teacher?", "איזה משפט טוב לומר למורה?", ["Please open the door.", "Open the door!", "Door open!", "Open it now!"], 0, "please עושה את ההוראה לנימוסית."),
      gap("___ open the window.", ["Please", "Pleasing", "Pleased", "Pleases"], 0, "please בתחילת ההוראה."),
      gap("Sit here, ___.", ["please", "pleasing", "pleased", "pleases"], 0, "please בסוף ההוראה."),
    ],
  ),
  lesson(
    "Let's play! (בואו)",
    "Let's הוא let us ופירושו “בואו”: Let's play football. Let's go to the park. אחרי Let's פועל בצורה הבסיסית.",
    [
      gap("Let's ___ football.", ["play", "plays", "playing", "to play"], 0, "אחרי Let's: play."),
      gap("It is hot. ___ go to the park!", ["Let's", "Does", "Is", "Am"], 0, "הצעה משותפת: Let's."),
      pick("Which sentence is right?", "איזה משפט נכון?", ["Let's to go home.", "Let's go home.", "Lets goes home.", "Let's going home."], 1, "Let's + פועל בצורה הבסיסית."),
    ],
  ),
  lesson(
    "Commands and let's together (חזרה)",
    "חזרה: הוראה היא פועל בצורה הבסיסית, איסור מתחיל ב-don't, בקשה מנומסת עם please, והצעה משותפת עם Let's.",
    [
      gap("It is hot. ___ the window, please.", ["Open", "Opens", "Opening", "To open"], 0, "הוראה: Open."),
      gap("The baby is in bed. ___ run here!", ["Don't", "Doesn't", "Not", "No"], 0, "איסור: Don't run."),
      gap("___ read a book!", ["Let's", "Let", "Is", "Does"], 0, "הצעה משותפת: Let's read."),
    ],
  ),
];
