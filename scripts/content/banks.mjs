// Curated base content banks for the offline generator.
//
// Everything here is hand-verified source material. The generator
// (scripts/generate-content.mjs) expands these banks into a full year (365
// daily instances) per CEFR level using deterministic rotation, so the data is
// correct-by-construction and fully reproducible — re-running the generator
// yields byte-identical output.
//
// Hebrew (definitions, translations, explanations) is written for native
// Hebrew speakers learning English, matching the app's existing tone.

// ---------------------------------------------------------------------------
// Verb table — base / 3rd-person-singular / past / past-participle / -ing.
// Hand-checked, including irregulars. Tagged with the lowest CEFR level the
// verb is appropriate for, so each level draws from its own band and below.
// ---------------------------------------------------------------------------
export const VERBS = [
  { base: "go", third: "goes", past: "went", pp: "gone", ing: "going", he: "ללכת", lvl: 0 },
  { base: "eat", third: "eats", past: "ate", pp: "eaten", ing: "eating", he: "לאכול", lvl: 0 },
  { base: "drink", third: "drinks", past: "drank", pp: "drunk", ing: "drinking", he: "לשתות", lvl: 0 },
  { base: "see", third: "sees", past: "saw", pp: "seen", ing: "seeing", he: "לראות", lvl: 0 },
  { base: "make", third: "makes", past: "made", pp: "made", ing: "making", he: "לעשות/להכין", lvl: 0 },
  { base: "take", third: "takes", past: "took", pp: "taken", ing: "taking", he: "לקחת", lvl: 0 },
  { base: "come", third: "comes", past: "came", pp: "come", ing: "coming", he: "לבוא", lvl: 0 },
  { base: "give", third: "gives", past: "gave", pp: "given", ing: "giving", he: "לתת", lvl: 0 },
  { base: "study", third: "studies", past: "studied", pp: "studied", ing: "studying", he: "ללמוד", lvl: 0 },
  { base: "watch", third: "watches", past: "watched", pp: "watched", ing: "watching", he: "לצפות", lvl: 0 },
  { base: "play", third: "plays", past: "played", pp: "played", ing: "playing", he: "לשחק/לנגן", lvl: 0 },
  { base: "work", third: "works", past: "worked", pp: "worked", ing: "working", he: "לעבוד", lvl: 0 },
  { base: "write", third: "writes", past: "wrote", pp: "written", ing: "writing", he: "לכתוב", lvl: 1 },
  { base: "read", third: "reads", past: "read", pp: "read", ing: "reading", he: "לקרוא", lvl: 1 },
  { base: "buy", third: "buys", past: "bought", pp: "bought", ing: "buying", he: "לקנות", lvl: 1 },
  { base: "bring", third: "brings", past: "brought", pp: "brought", ing: "bringing", he: "להביא", lvl: 1 },
  { base: "think", third: "thinks", past: "thought", pp: "thought", ing: "thinking", he: "לחשוב", lvl: 1 },
  { base: "find", third: "finds", past: "found", pp: "found", ing: "finding", he: "למצוא", lvl: 1 },
  { base: "speak", third: "speaks", past: "spoke", pp: "spoken", ing: "speaking", he: "לדבר", lvl: 1 },
  { base: "leave", third: "leaves", past: "left", pp: "left", ing: "leaving", he: "לעזוב", lvl: 2 },
  { base: "meet", third: "meets", past: "met", pp: "met", ing: "meeting", he: "לפגוש", lvl: 2 },
  { base: "pay", third: "pays", past: "paid", pp: "paid", ing: "paying", he: "לשלם", lvl: 2 },
  { base: "build", third: "builds", past: "built", pp: "built", ing: "building", he: "לבנות", lvl: 2 },
  { base: "choose", third: "chooses", past: "chose", pp: "chosen", ing: "choosing", he: "לבחור", lvl: 2 },
  { base: "win", third: "wins", past: "won", pp: "won", ing: "winning", he: "לנצח", lvl: 2 },
  { base: "teach", third: "teaches", past: "taught", pp: "taught", ing: "teaching", he: "ללמד", lvl: 2 },
  { base: "understand", third: "understands", past: "understood", pp: "understood", ing: "understanding", he: "להבין", lvl: 3 },
  { base: "achieve", third: "achieves", past: "achieved", pp: "achieved", ing: "achieving", he: "להשיג", lvl: 3 },
  { base: "rise", third: "rises", past: "rose", pp: "risen", ing: "rising", he: "לעלות/לזרוח", lvl: 3 },
  { base: "seek", third: "seeks", past: "sought", pp: "sought", ing: "seeking", he: "לחפש/לבקש", lvl: 4 },
  { base: "arise", third: "arises", past: "arose", pp: "arisen", ing: "arising", he: "להתעורר/לצוץ", lvl: 4 },
  { base: "undertake", third: "undertakes", past: "undertook", pp: "undertaken", ing: "undertaking", he: "לקחת על עצמו", lvl: 5 },
];

// ---------------------------------------------------------------------------
// Adjectives with verified comparative / superlative forms.
// ---------------------------------------------------------------------------
export const ADJECTIVES = [
  { adj: "big", comp: "bigger", sup: "biggest", he: "גדול", lvl: 0 },
  { adj: "small", comp: "smaller", sup: "smallest", he: "קטן", lvl: 0 },
  { adj: "fast", comp: "faster", sup: "fastest", he: "מהיר", lvl: 0 },
  { adj: "happy", comp: "happier", sup: "happiest", he: "שמח", lvl: 0 },
  { adj: "easy", comp: "easier", sup: "easiest", he: "קל", lvl: 0 },
  { adj: "good", comp: "better", sup: "best", he: "טוב", lvl: 0 },
  { adj: "bad", comp: "worse", sup: "worst", he: "רע", lvl: 1 },
  { adj: "expensive", comp: "more expensive", sup: "most expensive", he: "יקר", lvl: 1 },
  { adj: "important", comp: "more important", sup: "most important", he: "חשוב", lvl: 2 },
  { adj: "interesting", comp: "more interesting", sup: "most interesting", he: "מעניין", lvl: 2 },
  { adj: "difficult", comp: "more difficult", sup: "most difficult", he: "קשה", lvl: 2 },
  { adj: "comfortable", comp: "more comfortable", sup: "most comfortable", he: "נוח", lvl: 3 },
];

// Nouns tagged with their correct indefinite article (a/an), for article drills.
export const ARTICLE_NOUNS = [
  { noun: "apple", art: "an", he: "תפוח" },
  { noun: "orange", art: "an", he: "תפוז" },
  { noun: "hour", art: "an", he: "שעה" },
  { noun: "umbrella", art: "an", he: "מטרייה" },
  { noun: "egg", art: "an", he: "ביצה" },
  { noun: "idea", art: "an", he: "רעיון" },
  { noun: "book", art: "a", he: "ספר" },
  { noun: "car", art: "a", he: "מכונית" },
  { noun: "house", art: "a", he: "בית" },
  { noun: "university", art: "a", he: "אוניברסיטה" },
  { noun: "dog", art: "a", he: "כלב" },
  { noun: "table", art: "a", he: "שולחן" },
];

// Preposition items: a sentence with a blank, the correct preposition, and
// distractors. Hand-written so each is unambiguous.
export const PREP_ITEMS = [
  { before: "The keys are ", after: " the table.", correct: "on", wrong: ["in", "at", "to"], he: "'on' = על (משטח)." },
  { before: "She lives ", after: " London.", correct: "in", wrong: ["on", "at", "to"], he: "'in' לערים ומדינות." },
  { before: "We meet ", after: " 8 o'clock.", correct: "at", wrong: ["in", "on", "by"], he: "'at' לשעה מדויקת." },
  { before: "He is good ", after: " math.", correct: "at", wrong: ["in", "on", "for"], he: "'good at' = טוב ב־." },
  { before: "I'm waiting ", after: " the bus.", correct: "for", wrong: ["to", "at", "on"], he: "'wait for' = לחכות ל־." },
  { before: "They went ", after: " the beach.", correct: "to", wrong: ["at", "in", "on"], he: "'to' לכיוון/יעד." },
  { before: "The picture is ", after: " the wall.", correct: "on", wrong: ["in", "at", "by"], he: "'on the wall' = על הקיר." },
  { before: "She arrived ", after: " Monday.", correct: "on", wrong: ["in", "at", "to"], he: "'on' לימים ותאריכים." },
];

// ---------------------------------------------------------------------------
// Vocabulary banks — verified word / part-of-speech / Hebrew definition /
// English example / Hebrew translation, per CEFR level.
// ---------------------------------------------------------------------------
export const WORD_BANKS = {
  A1: [
    { word: "house", partOfSpeech: "noun", definition: "מבנה שבו אנשים גרים", example: "My house is near the school.", translation: "בית" },
    { word: "water", partOfSpeech: "noun", definition: "נוזל שקוף שאנחנו שותים", example: "I drink water every morning.", translation: "מים" },
    { word: "friend", partOfSpeech: "noun", definition: "אדם שאתה אוהב ומבלה איתו", example: "She is my best friend.", translation: "חבר/ה" },
    { word: "happy", partOfSpeech: "adjective", definition: "מרגיש טוב ושמח", example: "I am happy today.", translation: "שמח" },
    { word: "big", partOfSpeech: "adjective", definition: "גדול בגודלו", example: "They live in a big city.", translation: "גדול" },
    { word: "eat", partOfSpeech: "verb", definition: "להכניס אוכל לפה ולבלוע", example: "We eat dinner at seven.", translation: "לאכול" },
    { word: "go", partOfSpeech: "verb", definition: "לנוע ממקום למקום", example: "I go to work by bus.", translation: "ללכת/לנסוע" },
    { word: "morning", partOfSpeech: "noun", definition: "החלק הראשון של היום", example: "Good morning!", translation: "בוקר" },
    { word: "school", partOfSpeech: "noun", definition: "מקום שבו לומדים", example: "The children are at school.", translation: "בית ספר" },
    { word: "family", partOfSpeech: "noun", definition: "ההורים, הילדים והקרובים", example: "I love my family.", translation: "משפחה" },
    { word: "day", partOfSpeech: "noun", definition: "תקופה של 24 שעות", example: "Have a nice day.", translation: "יום" },
    { word: "book", partOfSpeech: "noun", definition: "דפים עם טקסט לקריאה", example: "This book is very good.", translation: "ספר" },
    { word: "love", partOfSpeech: "verb", definition: "לחבב מאוד מישהו או משהו", example: "I love this song.", translation: "לאהוב" },
    { word: "small", partOfSpeech: "adjective", definition: "קטן בגודלו", example: "It is a small dog.", translation: "קטן" },
    { word: "name", partOfSpeech: "noun", definition: "המילה שבה קוראים לאדם", example: "What is your name?", translation: "שם" },
    { word: "work", partOfSpeech: "verb", definition: "לעשות עבודה", example: "I work in an office.", translation: "לעבוד" },
    { word: "good", partOfSpeech: "adjective", definition: "בעל איכות חיובית", example: "This is a good idea.", translation: "טוב" },
    { word: "child", partOfSpeech: "noun", definition: "אדם צעיר, ילד", example: "The child is playing.", translation: "ילד" },
  ],
  A2: [
    { word: "travel", partOfSpeech: "verb", definition: "לנסוע ממקום למקום, בדרך כלל למרחקים", example: "They travel abroad every summer.", translation: "לטייל/לנסוע" },
    { word: "weather", partOfSpeech: "noun", definition: "מצב האוויר — שמש, גשם, חום או קור", example: "The weather is nice today.", translation: "מזג אוויר" },
    { word: "expensive", partOfSpeech: "adjective", definition: "עולה הרבה כסף", example: "This restaurant is too expensive.", translation: "יקר" },
    { word: "remember", partOfSpeech: "verb", definition: "לשמור משהו בזיכרון ולהיזכר בו", example: "I remember her name.", translation: "לזכור" },
    { word: "different", partOfSpeech: "adjective", definition: "לא דומה, שונה ממשהו אחר", example: "These two cars are very different.", translation: "שונה" },
    { word: "because", partOfSpeech: "conjunction", definition: "מילה שמציינת סיבה", example: "I stayed home because I was tired.", translation: "כי/בגלל ש" },
    { word: "enough", partOfSpeech: "adverb", definition: "בכמות מספקת", example: "We have enough food for everyone.", translation: "מספיק" },
    { word: "decide", partOfSpeech: "verb", definition: "לבחור מה לעשות", example: "She decided to study medicine.", translation: "להחליט" },
    { word: "busy", partOfSpeech: "adjective", definition: "עסוק, עם הרבה דברים לעשות", example: "I am busy this week.", translation: "עסוק" },
    { word: "money", partOfSpeech: "noun", definition: "מטבעות ושטרות שמשלמים בהם", example: "He saved a lot of money.", translation: "כסף" },
    { word: "early", partOfSpeech: "adverb", definition: "לפני הזמן הרגיל", example: "I woke up early today.", translation: "מוקדם" },
    { word: "country", partOfSpeech: "noun", definition: "מדינה עם גבולות וממשלה", example: "Italy is a beautiful country.", translation: "מדינה" },
    { word: "learn", partOfSpeech: "verb", definition: "לרכוש ידע או מיומנות", example: "I want to learn English.", translation: "ללמוד" },
    { word: "always", partOfSpeech: "adverb", definition: "בכל פעם, תמיד", example: "She is always on time.", translation: "תמיד" },
    { word: "problem", partOfSpeech: "noun", definition: "מצב קשה שצריך פתרון", example: "We solved the problem together.", translation: "בעיה" },
    { word: "help", partOfSpeech: "verb", definition: "לעזור למישהו", example: "Can you help me, please?", translation: "לעזור" },
    { word: "place", partOfSpeech: "noun", definition: "מקום מסוים", example: "This is a quiet place.", translation: "מקום" },
    { word: "start", partOfSpeech: "verb", definition: "להתחיל משהו", example: "The film starts at eight.", translation: "להתחיל" },
  ],
  B1: [
    { word: "achieve", partOfSpeech: "verb", definition: "להשיג מטרה לאחר מאמץ ועבודה קשה", example: "She worked hard to achieve her goals.", translation: "להשיג" },
    { word: "challenge", partOfSpeech: "noun", definition: "אתגר — משימה קשה שדורשת מאמץ", example: "Learning a language is a real challenge.", translation: "אתגר" },
    { word: "recommend", partOfSpeech: "verb", definition: "להמליץ — לייעץ לנסות משהו", example: "Can you recommend a good book?", translation: "להמליץ" },
    { word: "however", partOfSpeech: "adverb", definition: "עם זאת, אולם — מילת ניגוד", example: "It was late; however, we kept working.", translation: "עם זאת" },
    { word: "experience", partOfSpeech: "noun", definition: "ניסיון — ידע שנרכש מהחיים", example: "She has years of experience.", translation: "ניסיון/חוויה" },
    { word: "suggest", partOfSpeech: "verb", definition: "להציע רעיון או פעולה לשקול", example: "I suggest we leave early.", translation: "להציע" },
    { word: "improve", partOfSpeech: "verb", definition: "לשפר — לגרום למשהו להיות טוב יותר", example: "Reading will improve your vocabulary.", translation: "לשפר" },
    { word: "although", partOfSpeech: "conjunction", definition: "למרות ש — מציין ניגוד", example: "Although it rained, we went out.", translation: "למרות ש" },
    { word: "develop", partOfSpeech: "verb", definition: "לפתח — לגרום לצמיחה או הרחבה", example: "The company will develop a new app.", translation: "לפתח" },
    { word: "purpose", partOfSpeech: "noun", definition: "מטרה — הסיבה שעושים משהו", example: "The purpose of the meeting was clear.", translation: "מטרה" },
    { word: "available", partOfSpeech: "adjective", definition: "זמין — קיים ואפשר להשתמש בו", example: "Tickets are available online.", translation: "זמין" },
    { word: "increase", partOfSpeech: "verb", definition: "להגדיל או לגדול בכמות", example: "Prices increased last year.", translation: "להגדיל/לעלות" },
    { word: "depend", partOfSpeech: "verb", definition: "להיות תלוי במשהו אחר", example: "The answer depends on the situation.", translation: "להיות תלוי" },
    { word: "consider", partOfSpeech: "verb", definition: "לשקול — לחשוב על משהו ברצינות", example: "Please consider my offer.", translation: "לשקול" },
    { word: "particular", partOfSpeech: "adjective", definition: "מסוים, ספציפי", example: "Is there a particular reason?", translation: "מסוים" },
    { word: "opportunity", partOfSpeech: "noun", definition: "הזדמנות — מצב מתאים לפעולה", example: "This is a great opportunity.", translation: "הזדמנות" },
    { word: "require", partOfSpeech: "verb", definition: "לדרוש — להיות צורך הכרחי", example: "This job requires patience.", translation: "לדרוש" },
    { word: "successful", partOfSpeech: "adjective", definition: "מצליח — משיג את מטרתו", example: "She is a successful lawyer.", translation: "מצליח" },
  ],
  B2: [
    { word: "significant", partOfSpeech: "adjective", definition: "משמעותי — בעל חשיבות או השפעה ניכרת", example: "There was a significant change in sales.", translation: "משמעותי" },
    { word: "approach", partOfSpeech: "noun", definition: "גישה — דרך התמודדות עם בעיה", example: "We need a new approach.", translation: "גישה" },
    { word: "establish", partOfSpeech: "verb", definition: "לבסס או להקים משהו באופן יציב", example: "They established the company in 2005.", translation: "לבסס/להקים" },
    { word: "consequence", partOfSpeech: "noun", definition: "תוצאה — מה שקורה בעקבות פעולה", example: "Every choice has consequences.", translation: "תוצאה/השלכה" },
    { word: "demonstrate", partOfSpeech: "verb", definition: "להדגים או להוכיח בבירור", example: "The study demonstrates a clear link.", translation: "להדגים/להוכיח" },
    { word: "appropriate", partOfSpeech: "adjective", definition: "מתאים — הולם את המצב", example: "Wear appropriate clothes for the interview.", translation: "מתאים/הולם" },
    { word: "obtain", partOfSpeech: "verb", definition: "להשיג או לקבל משהו", example: "You can obtain a permit online.", translation: "להשיג" },
    { word: "tendency", partOfSpeech: "noun", definition: "נטייה — מגמה לפעול בדרך מסוימת", example: "He has a tendency to arrive late.", translation: "נטייה" },
    { word: "emphasize", partOfSpeech: "verb", definition: "להדגיש — לתת חשיבות מיוחדת למשהו", example: "She emphasized the need for caution.", translation: "להדגיש" },
    { word: "reluctant", partOfSpeech: "adjective", definition: "מהסס — לא ששׂ לעשות משהו", example: "He was reluctant to agree.", translation: "מהסס" },
    { word: "acquire", partOfSpeech: "verb", definition: "לרכוש ידע, מיומנות או נכס", example: "Children acquire language quickly.", translation: "לרכוש" },
    { word: "perspective", partOfSpeech: "noun", definition: "נקודת מבט — דרך לראות נושא", example: "Try to see it from her perspective.", translation: "נקודת מבט" },
    { word: "substantial", partOfSpeech: "adjective", definition: "ניכר — גדול בכמות או בחשיבות", example: "They made a substantial profit.", translation: "ניכר/משמעותי" },
    { word: "regardless", partOfSpeech: "adverb", definition: "ללא קשר — לא משנה מה", example: "We will continue regardless of the cost.", translation: "ללא קשר/בכל מקרה" },
    { word: "implement", partOfSpeech: "verb", definition: "ליישם — להוציא תוכנית לפועל", example: "The school implemented new rules.", translation: "ליישם" },
    { word: "evident", partOfSpeech: "adjective", definition: "ברור — נראה לעין בבירור", example: "It was evident that he was tired.", translation: "ברור/גלוי" },
    { word: "framework", partOfSpeech: "noun", definition: "מסגרת — מבנה בסיסי לרעיון או מערכת", example: "We built a legal framework.", translation: "מסגרת" },
    { word: "anticipate", partOfSpeech: "verb", definition: "לצפות מראש — לחזות ולהיערך", example: "We anticipate strong demand.", translation: "לצפות מראש" },
  ],
  C1: [
    { word: "nevertheless", partOfSpeech: "adverb", definition: "אף על פי כן — מילת ניגוד פורמלית", example: "The plan was risky; nevertheless, it worked.", translation: "אף על פי כן" },
    { word: "compelling", partOfSpeech: "adjective", definition: "משכנע — חזק ומושך תשומת לב", example: "She made a compelling argument.", translation: "משכנע" },
    { word: "undermine", partOfSpeech: "verb", definition: "לחתור תחת — להחליש בהדרגה", example: "Constant criticism can undermine confidence.", translation: "לחתור תחת/להחליש" },
    { word: "inherent", partOfSpeech: "adjective", definition: "מובנה — קיים מטבעו של דבר", example: "There are inherent risks in any investment.", translation: "מובנה/טבוע" },
    { word: "comprehensive", partOfSpeech: "adjective", definition: "מקיף — כולל את כל ההיבטים", example: "The report is comprehensive and detailed.", translation: "מקיף" },
    { word: "advocate", partOfSpeech: "verb", definition: "לתמוך ולקדם רעיון בפומבי", example: "She advocates for equal rights.", translation: "לתמוך/לדגול" },
    { word: "discrepancy", partOfSpeech: "noun", definition: "אי-התאמה — הבדל בין דברים שאמורים להיות זהים", example: "There is a discrepancy in the figures.", translation: "אי-התאמה" },
    { word: "mitigate", partOfSpeech: "verb", definition: "להקל או להפחית חומרה של בעיה", example: "Steps were taken to mitigate the damage.", translation: "להקל/למתן" },
    { word: "profound", partOfSpeech: "adjective", definition: "עמוק — בעל משמעות או השפעה רבה", example: "The book had a profound effect on me.", translation: "עמוק" },
    { word: "prevalent", partOfSpeech: "adjective", definition: "נפוץ — קיים במידה רבה", example: "This view is prevalent among experts.", translation: "נפוץ/רווח" },
    { word: "coherent", partOfSpeech: "adjective", definition: "קוהרנטי — הגיוני ומאורגן היטב", example: "She gave a coherent explanation.", translation: "קוהרנטי/בהיר" },
    { word: "diminish", partOfSpeech: "verb", definition: "להתמעט או להפחית בהדרגה", example: "His interest gradually diminished.", translation: "להתמעט/לפחות" },
    { word: "scrutiny", partOfSpeech: "noun", definition: "בחינה קפדנית ומדוקדקת", example: "The deal came under close scrutiny.", translation: "בחינה קפדנית" },
    { word: "viable", partOfSpeech: "adjective", definition: "בר-ביצוע — מעשי ויכול להצליח", example: "It is the only viable option.", translation: "בר-ביצוע" },
    { word: "underlying", partOfSpeech: "adjective", definition: "בסיסי — שנמצא ביסוד הדברים אך אינו גלוי", example: "We must address the underlying cause.", translation: "בסיסי/שביסוד" },
    { word: "alleviate", partOfSpeech: "verb", definition: "להקל על כאב, סבל או בעיה", example: "The medicine alleviates the pain.", translation: "להקל/לשכך" },
    { word: "notwithstanding", partOfSpeech: "preposition", definition: "על אף — למרות (פורמלי)", example: "Notwithstanding the delays, the project succeeded.", translation: "על אף" },
    { word: "intricate", partOfSpeech: "adjective", definition: "מורכב ומסובך, עם פרטים רבים", example: "The watch has an intricate design.", translation: "מורכב/סבוך" },
  ],
  C2: [
    { word: "ubiquitous", partOfSpeech: "adjective", definition: "נמצא בכל מקום בו-זמנית", example: "Smartphones are now ubiquitous.", translation: "נמצא בכל מקום" },
    { word: "ephemeral", partOfSpeech: "adjective", definition: "בן-חלוף — נמשך זמן קצר בלבד", example: "Fame can be ephemeral.", translation: "בן-חלוף" },
    { word: "meticulous", partOfSpeech: "adjective", definition: "קפדן — מדקדק בכל פרט קטן", example: "She kept meticulous records.", translation: "קפדן/דקדקני" },
    { word: "paradigm", partOfSpeech: "noun", definition: "פרדיגמה — מודל או תפיסה מקובלת", example: "The discovery caused a paradigm shift.", translation: "פרדיגמה/מודל" },
    { word: "juxtapose", partOfSpeech: "verb", definition: "להציב זה לצד זה לשם השוואה", example: "The film juxtaposes wealth and poverty.", translation: "להציב זה לצד זה" },
    { word: "esoteric", partOfSpeech: "adjective", definition: "אזוטרי — מובן רק למעטים", example: "The lecture was rather esoteric.", translation: "אזוטרי/נסתר" },
    { word: "pragmatic", partOfSpeech: "adjective", definition: "פרגמטי — מעשי ומכוון לתוצאות", example: "We need a pragmatic solution.", translation: "פרגמטי/מעשי" },
    { word: "nuance", partOfSpeech: "noun", definition: "ניואנס — הבדל דק במשמעות או בגוון", example: "He understood every nuance of the text.", translation: "ניואנס/גוון דק" },
    { word: "quintessential", partOfSpeech: "adjective", definition: "מובהק — הדוגמה המושלמת לסוגו", example: "It is the quintessential British novel.", translation: "מובהק/טיפוסי ביותר" },
    { word: "obfuscate", partOfSpeech: "verb", definition: "לטשטש — לעשות משהו לא ברור בכוונה", example: "The report obfuscates the real costs.", translation: "לטשטש/לערפל" },
    { word: "tenuous", partOfSpeech: "adjective", definition: "רופף — חלש או לא משכנע", example: "The link is tenuous at best.", translation: "רופף/קלוש" },
    { word: "proliferate", partOfSpeech: "verb", definition: "להתרבות במהירות ובכמות גדולה", example: "Online courses have proliferated.", translation: "להתרבות/לשגשג" },
    { word: "salient", partOfSpeech: "adjective", definition: "בולט — החשוב והניכר ביותר", example: "Let me note the salient points.", translation: "בולט/מרכזי" },
    { word: "anomaly", partOfSpeech: "noun", definition: "חריגה מהנורמה או מהצפוי", example: "The data showed a strange anomaly.", translation: "חריגה/אנומליה" },
    { word: "cogent", partOfSpeech: "adjective", definition: "משכנע ומבוסס היטב הגיונית", example: "She presented a cogent case.", translation: "משכנע/מנומק" },
    { word: "dichotomy", partOfSpeech: "noun", definition: "ניגוד חד בין שני דברים נפרדים", example: "There is a dichotomy between theory and practice.", translation: "ניגוד/דיכוטומיה" },
    { word: "espouse", partOfSpeech: "verb", definition: "לאמץ ולתמוך ברעיון או באמונה", example: "He espoused liberal values.", translation: "לאמץ/לדגול" },
    { word: "inexorable", partOfSpeech: "adjective", definition: "בלתי-נמנע — שאי אפשר לעצור", example: "The inexorable rise of technology continues.", translation: "בלתי-נמנע" },
  ],
};
