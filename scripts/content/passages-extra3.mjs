// Round 3 of additional Reading, Listening and Speaking content, merged into
// the pools by the generator.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

export const MORE_READINGS3 = {
  A1: [
    R("At the Doctor (אצל הרופא)",
      "I do not feel well. My head hurts and I am hot. My mother takes me to the doctor. The doctor says I must rest and drink water. Tomorrow I will feel better.",
      "אני לא מרגיש טוב. כואב לי הראש ויש לי חום. אמא שלי לוקחת אותי לרופא. הרופא אומר שאני חייב לנוח ולשתות מים. מחר ארגיש יותר טוב.",
      [g("hurts", "verb", "כואב", "My leg hurts.", "כואב"), g("doctor", "noun", "מי שמטפל בחולים", "See a doctor.", "רופא"), g("rest", "verb", "לנוח", "You must rest.", "לנוח")],
      [q("What is the problem?", "מה הבעיה?", ["A broken leg", "A headache and fever", "A cold foot", "Nothing"], ["רגל שבורה", "כאב ראש וחום", "רגל קרה", "שום דבר"], 1, "'My head hurts and I am hot'."), q("What must the child do?", "מה הילד חייב לעשות?", ["Run", "Rest and drink water", "Eat cake", "Go to school"], ["לרוץ", "לנוח ולשתות מים", "לאכול עוגה", "ללכת לבית הספר"], 1, "'rest and drink water'.")]),
    R("My Room (החדר שלי)",
      "This is my room. There is a bed, a desk and a small window. On the desk I have books and a lamp. I like my room because it is quiet.",
      "זה החדר שלי. יש בו מיטה, שולחן כתיבה וחלון קטן. על השולחן יש לי ספרים ומנורה. אני אוהב את החדר שלי כי הוא שקט.",
      [g("desk", "noun", "שולחן כתיבה", "Sit at the desk.", "שולחן כתיבה"), g("lamp", "noun", "מנורה", "Turn on the lamp.", "מנורה"), g("quiet", "adjective", "שקט", "A quiet room.", "שקט")],
      [q("What is on the desk?", "מה יש על השולחן?", ["A bed", "Books and a lamp", "A window", "A door"], ["מיטה", "ספרים ומנורה", "חלון", "דלת"], 1, "'books and a lamp'."), q("Why does the writer like the room?", "למה הכותב אוהב את החדר?", ["It is big", "It is quiet", "It is new", "It is warm"], ["הוא גדול", "הוא שקט", "הוא חדש", "הוא חם"], 1, "'because it is quiet'.")]),
  ],
  A2: [
    R("A Change of Plans (שינוי בתוכניות)",
      "We wanted to go camping, but the weather forecast said heavy rain. So we changed our plans and visited a museum instead. It turned out to be a great day, and we learned a lot about history.",
      "רצינו לצאת לקמפינג, אבל תחזית מזג האוויר אמרה שיהיה גשם כבד. אז שינינו את התוכניות וביקרנו במוזיאון במקום. בסוף זה היה יום נהדר, ולמדנו הרבה על היסטוריה.",
      [g("forecast", "noun", "תחזית", "The weather forecast.", "תחזית"), g("instead", "adverb", "במקום", "Tea instead of coffee.", "במקום"), g("history", "noun", "היסטוריה", "Ancient history.", "היסטוריה")],
      [q("Why did they change plans?", "למה הם שינו את התוכניות?", ["No money", "Heavy rain forecast", "They were tired", "The car broke"], ["לא היה כסף", "תחזית לגשם כבד", "הם היו עייפים", "המכונית התקלקלה"], 1, "'the weather forecast said heavy rain'."), q("Where did they go instead?", "לאן הם הלכו במקום?", ["Home", "A museum", "The beach", "A friend's house"], ["הביתה", "למוזיאון", "לחוף הים", "לבית של חבר"], 1, "'visited a museum instead'.")]),
    R("My First Job (העבודה הראשונה שלי)",
      "My first job was in a small café. I had to wake up early and I was often tired. But I learned how to talk to customers and work in a team. The money was not great, but the experience was worth it.",
      "העבודה הראשונה שלי הייתה בבית קפה קטן. הייתי צריך לקום מוקדם והרבה פעמים הייתי עייף. אבל למדתי איך לדבר עם לקוחות ולעבוד בצוות. הכסף לא היה משהו, אבל הניסיון היה שווה את זה.",
      [g("customers", "noun", "לקוחות", "Happy customers.", "לקוחות"), g("team", "noun", "צוות", "Work in a team.", "צוות"), g("worth", "adjective", "שווה את זה", "Worth the effort.", "שווה")],
      [q("Where was the first job?", "איפה הייתה העבודה הראשונה?", ["A shop", "A small café", "An office", "A school"], ["בחנות", "בבית קפה קטן", "במשרד", "בבית ספר"], 1, "'in a small café'."), q("What did the writer learn?", "מה הכותב למד?", ["To cook", "To talk to customers and work in a team", "To drive", "To sing"], ["לבשל", "לדבר עם לקוחות ולעבוד בצוות", "לנהוג", "לשיר"], 1, "'talk to customers and work in a team'.")]),
  ],
  B1: [
    R("Digital Detox (ניקוי דיגיטלי)",
      "Last weekend I tried a 'digital detox' — no phone, no computer for two days. The first hours were strange; I kept reaching for a phone that wasn't there. But by Sunday I felt calmer and slept better. I won't quit technology, but I'll plan these breaks more often.",
      "בסוף השבוע שעבר ניסיתי ״ניקוי דיגיטלי״ — בלי טלפון ובלי מחשב במשך יומיים. השעות הראשונות היו מוזרות; כל הזמן הושטתי יד לטלפון שלא היה שם. אבל עד יום ראשון הרגשתי רגוע יותר וישנתי טוב יותר. אני לא אוותר על הטכנולוגיה, אבל אתכנן הפסקות כאלה לעיתים קרובות יותר.",
      [g("detox", "noun", "ניקוי, היטהרות", "A digital detox.", "ניקוי/גמילה"), g("reaching", "verb", "מושיט יד אל", "Reaching for the phone.", "מושיט יד"), g("calmer", "adjective", "רגוע יותר", "I feel calmer.", "רגוע יותר")],
      [q("What was the 'digital detox'?", "מה היה ה״ניקוי הדיגיטלי״?", ["A new app", "No phone or computer for two days", "A diet", "A holiday abroad"], ["אפליקציה חדשה", "בלי טלפון ובלי מחשב במשך יומיים", "דיאטה", "חופשה בחו״ל"], 1, "'no phone, no computer for two days'."), q("How did the writer feel by Sunday?", "איך הרגיש הכותב עד יום ראשון?", ["Worse", "Calmer and slept better", "Bored", "Angry"], ["גרוע יותר", "רגוע יותר וישן טוב יותר", "משועמם", "כועס"], 1, "'I felt calmer and slept better'.")]),
    R("The Kindness of Strangers (חסד של זרים)",
      "When my car broke down on a quiet road at night, I felt completely alone. Within minutes, a passing driver stopped, helped me push the car, and waited until help arrived. We never exchanged names. Small acts like that quietly restore your faith in people.",
      "כשהמכונית שלי התקלקלה בכביש שקט בלילה, הרגשתי לבד לגמרי. תוך כמה דקות עצר נהג שעבר במקום, עזר לי לדחוף את המכונית וחיכה עד שהגיעה עזרה. אפילו לא אמרנו זה לזה את השמות שלנו. מעשים קטנים כאלה מחזירים בשקט את האמונה שלך בבני אדם.",
      [g("broke down", "phrase", "התקלקל ונעצר", "The car broke down.", "התקלקל"), g("exchanged", "verb", "החליפו זה עם זה", "We exchanged numbers.", "החליפו"), g("restore", "verb", "להחזיר, לשקם", "Restore faith.", "לשקם/להשיב")],
      [q("What happened to the writer's car?", "מה קרה למכונית של הכותב?", ["It was stolen", "It broke down at night", "It crashed", "It ran out of fuel"], ["היא נגנבה", "היא התקלקלה בלילה", "היא עשתה תאונה", "נגמר לה הדלק"], 1, "'my car broke down on a quiet road at night'."), q("What did the stranger do?", "מה עשה האדם הזר?", ["Called the police", "Helped push and waited", "Drove away", "Sold a part"], ["התקשר למשטרה", "עזר לדחוף וחיכה", "נסע משם", "מכר חלק"], 1, "'helped me push the car, and waited'.")]),
  ],
  B2: [
    R("The Skill of Saying No (האומנות של לומר לא)",
      "Many of us say yes too easily — to favours, meetings, and projects — and then resent the lack of time we are left with. Learning to decline politely is not selfish; it is what makes our yes meaningful. A calendar full of reluctant agreements helps no one.",
      "רבים מאיתנו אומרים כן בקלות רבה מדי — לבקשות טובה, לפגישות ולפרויקטים — ואז חשים טינה על המחסור בזמן שנשאר לנו. ללמוד לסרב בנימוס זה לא אנוכיות; זה מה שנותן משמעות ל״כן״ שלנו. יומן מלא בהסכמות שניתנו בחוסר רצון לא עוזר לאף אחד.",
      [g("resent", "verb", "לחוש טינה או מרירות", "I resent the demand.", "לחוש טינה"), g("decline", "verb", "לסרב בנימוס", "Decline the offer.", "לסרב"), g("reluctant", "adjective", "מהסס, לא מרצון", "A reluctant yes.", "מהסס")],
      [q("What problem does the text describe?", "איזו בעיה הטקסט מתאר?", ["Saying no too much", "Saying yes too easily", "Working too little", "Being rude"], ["לומר לא יותר מדי", "לומר כן בקלות רבה מדי", "לעבוד מעט מדי", "להיות גס רוח"], 1, "'say yes too easily... resent the lack of time'."), q("Why is saying no valuable?", "למה יש ערך בלומר לא?", ["It is selfish", "It makes our yes meaningful", "It saves money", "It impresses others"], ["זה אנוכי", "זה נותן משמעות ל״כן״ שלנו", "זה חוסך כסף", "זה מרשים אחרים"], 1, "'what makes our yes meaningful'.")]),
    R("Reading the Reviews (לקרוא את הביקורות)",
      "Online reviews feel democratic, but they are easily skewed. The very happy and the very angry are far more likely to post than the quietly satisfied majority. A wise reader looks past the star rating to the patterns: recurring complaints matter more than a single furious paragraph.",
      "ביקורות ברשת נראות דמוקרטיות, אבל הן מוטות בקלות. מי שמרוצים מאוד ומי שכועסים מאוד נוטים לפרסם הרבה יותר מהרוב המרוצה והשקט. קורא נבון מסתכל מעבר לדירוג הכוכבים אל הדפוסים: תלונות שחוזרות על עצמן חשובות יותר מפסקה זועמת אחת.",
      [g("skewed", "verb", "מוטה, מעוות", "Skewed results.", "מוטה"), g("majority", "noun", "רוב", "The silent majority.", "רוב"), g("recurring", "adjective", "חוזר ונשנה", "A recurring problem.", "חוזר ונשנה")],
      [q("Who is most likely to post reviews?", "מי הכי סביר שיפרסם ביקורות?", ["The satisfied majority", "The very happy and very angry", "Experts", "No one"], ["הרוב המרוצה", "המרוצים מאוד והכועסים מאוד", "מומחים", "אף אחד"], 1, "'the very happy and the very angry'."), q("What should a wise reader focus on?", "במה קורא נבון צריך להתמקד?", ["The star rating", "Recurring patterns", "One angry review", "The newest review"], ["דירוג הכוכבים", "דפוסים שחוזרים על עצמם", "ביקורת כועסת אחת", "הביקורת החדשה ביותר"], 1, "'recurring complaints matter more'.")]),
  ],
  C1: [
    R("The Curse of Knowledge (קללת הידע)",
      "Once we know something well, it becomes almost impossible to imagine not knowing it. Experts forget what beginners find confusing, and so explain badly the very things they understand best. Good teaching, then, is partly an act of memory — recalling the difficulty of the path you have long since climbed.",
      "ברגע שאנחנו יודעים משהו היטב, כמעט בלתי אפשרי לדמיין שאיננו יודעים אותו. מומחים שוכחים מה מבלבל מתחילים, ולכן מסבירים גרוע דווקא את הדברים שהם מבינים הכי טוב. הוראה טובה, אם כן, היא במידה מסוימת פעולה של זיכרון — היזכרות בקושי של הדרך שטיפסת בה מזמן.",
      [g("imagine", "verb", "לדמיין", "Hard to imagine.", "לדמיין"), g("confusing", "adjective", "מבלבל", "A confusing rule.", "מבלבל"), g("recalling", "verb", "להיזכר ב-", "Recalling the past.", "להיזכר")],
      [q("What becomes hard once we know something well?", "מה נעשה קשה ברגע שאנחנו יודעים משהו היטב?", ["Teaching fast", "Imagining not knowing it", "Learning more", "Forgetting it"], ["ללמד מהר", "לדמיין שאיננו יודעים אותו", "ללמוד עוד", "לשכוח אותו"], 1, "'impossible to imagine not knowing it'."), q("Good teaching is partly described as…", "הוראה טובה מתוארת במידה מסוימת כ…", ["Speed", "An act of memory", "Strict rules", "Natural talent"], ["מהירות", "פעולה של זיכרון", "כללים נוקשים", "כישרון טבעי"], 1, "'partly an act of memory'.")]),
    R("Beautiful Constraints (אילוצים מועילים)",
      "We tend to see limits as the enemy of creativity, yet the opposite is often true. A poet bound by a strict form, a designer working within a tiny budget, a chef with only five ingredients — each is forced into invention precisely because the easy paths are closed. Freedom can paralyse; constraint can liberate.",
      "אנחנו נוטים לראות במגבלות את האויב של היצירתיות, אך לעיתים קרובות ההפך הוא הנכון. משורר הכבול לתבנית שירית נוקשה, מעצב שעובד בתקציב זעיר, שף שיש לו רק חמישה מרכיבים — כל אחד מהם נאלץ להמציא דווקא משום שהדרכים הקלות חסומות. חופש עלול לשתק; אילוץ עשוי לשחרר.",
      [g("constraints", "noun", "אילוצים, מגבלות", "Tight constraints.", "אילוצים"), g("bound", "verb", "מחויב, כבול", "Bound by rules.", "כבול/מחויב"), g("paralyse", "verb", "לשתק", "Fear can paralyse.", "לשתק")],
      [q("How do we usually see limits?", "איך אנחנו בדרך כלל רואים מגבלות?", ["As helpful", "As the enemy of creativity", "As rare", "As freedom"], ["כמועילות", "כאויב של היצירתיות", "כנדירות", "כחופש"], 1, "'the enemy of creativity'."), q("What is the writer's paradox?", "מהו הפרדוקס של הכותב?", ["Freedom always helps", "Constraint can liberate", "Budgets ruin art", "Rules kill poems"], ["חופש תמיד עוזר", "אילוץ עשוי לשחרר", "תקציבים הורסים אמנות", "כללים הורגים שירים"], 1, "'constraint can liberate'.")]),
  ],
  C2: [
    R("The Authenticity Trap (מלכודת האותנטיות)",
      "We are urged endlessly to 'be authentic', as though the self were a fixed treasure to be uncovered rather than an ongoing act of creation. But the demand contains a paradox: the moment authenticity becomes a performance staged for others, it curdles into its opposite. Perhaps the most genuine people are those who never think to ask whether they are.",
      "מפצירים בנו בלי סוף ״להיות אותנטיים״, כאילו העצמי הוא אוצר קבוע שיש לחשוף ולא פעולת יצירה מתמשכת. אבל הדרישה הזאת טומנת בחובה פרדוקס: ברגע שהאותנטיות הופכת להופעה שמבוימת למען אחרים, היא מחמיצה והופכת להיפוכה. אולי האנשים הכנים ביותר הם אלה שאף פעם לא עולה בדעתם לשאול אם הם כאלה.",
      [g("urged", "verb", "נדחקים, מומרצים", "Urged to act.", "נדחקים"), g("staged", "verb", "מבוים, מוצג", "A staged photo.", "מבוים"), g("genuine", "adjective", "אמיתי, כן", "Genuine concern.", "אמיתי/כן")],
      [q("How is 'be authentic' usually framed?", "איך בדרך כלל מוצגת הקריאה ״להיות אותנטי״?", ["As creation", "As uncovering a fixed self", "As impossible", "As selfish"], ["כיצירה", "כחשיפה של עצמי קבוע", "כבלתי אפשרית", "כאנוכית"], 1, "'a fixed treasure to be uncovered'."), q("What paradox does the writer note?", "על איזה פרדוקס מצביע הכותב?", ["Authenticity is easy", "As a performance, it becomes its opposite", "Genuine people ask most", "Selves never change"], ["אותנטיות היא דבר קל", "כשהיא הופכת להופעה, היא נהפכת להיפוכה", "אנשים כנים שואלים הכי הרבה", "העצמי לעולם אינו משתנה"], 1, "'staged for others, it curdles into its opposite'.")]),
    R("The Limits of Empathy (גבולות האמפתיה)",
      "Empathy is widely treated as an unalloyed good, but it has a quiet bias: it flows most easily toward the near, the visible, and the similar. The single named child moves us more than the statistic of thousands. A morality built on feeling alone will therefore be generous and unjust at once — vivid where it should be fair.",
      "אמפתיה נתפסת בדרך כלל כטוב צרוף, אבל יש בה הטיה שקטה: היא זורמת בקלות הרבה ביותר אל הקרוב, הנראה והדומה. ילד אחד שיש לו שם מרגש אותנו יותר מסטטיסטיקה של אלפים. מוסר שבנוי על רגש בלבד יהיה לכן נדיב ולא צודק בעת ובעונה אחת — מוחשי במקום שבו עליו להיות הוגן.",
      [g("unalloyed", "adjective", "טהור, ללא סייג", "Unalloyed joy.", "טהור/ללא סייג"), g("bias", "noun", "הטיה", "A hidden bias.", "הטיה"), g("vivid", "adjective", "חי, מוחשי", "A vivid image.", "חי/מוחשי")],
      [q("What 'quiet bias' does empathy have?", "איזו ״הטיה שקטה״ יש לאמפתיה?", ["Toward strangers", "Toward the near, visible and similar", "Toward statistics", "Toward enemies"], ["כלפי זרים", "כלפי הקרוב, הנראה והדומה", "כלפי סטטיסטיקות", "כלפי אויבים"], 1, "'toward the near, the visible, and the similar'."), q("What is the risk of a morality built on feeling alone?", "מה הסכנה במוסר שבנוי על רגש בלבד?", ["Too fair", "Generous and unjust at once", "Too cold", "Too slow"], ["הוגן מדי", "נדיב ולא צודק בעת ובעונה אחת", "קר מדי", "איטי מדי"], 1, "'generous and unjust at once'.")]),
  ],
};

export const MORE_LISTENINGS3 = {
  A1: [
    L("Hello, this is the school. Tomorrow there are no classes. The school is closed for a holiday. See you on Monday.",
      "שלום, כאן בית הספר. מחר אין לימודים. בית הספר סגור בגלל חג. נתראה ביום שני.",
      [q("What is happening tomorrow?", "מה קורה מחר?", ["A test", "No classes", "A trip", "A party"], ["מבחן", "אין לימודים", "טיול", "מסיבה"], 1, "'there are no classes'."), q("When will they meet again?", "מתי הם ייפגשו שוב?", ["Tomorrow", "On Monday", "On Sunday", "Next month"], ["מחר", "ביום שני", "ביום ראשון", "בחודש הבא"], 1, "'See you on Monday'.")]),
    L("Good morning. It is sunny today. Don't forget your hat. We will go to the park after lunch.",
      "בוקר טוב. היום שמשי. אל תשכחו את הכובע. נלך לפארק אחרי ארוחת הצהריים.",
      [q("What is the weather like?", "איך מזג האוויר?", ["Rainy", "Sunny", "Cold", "Cloudy"], ["גשום", "שמשי", "קר", "מעונן"], 1, "'It is sunny today'."), q("When will they go to the park?", "מתי הם ילכו לפארק?", ["Before lunch", "After lunch", "At night", "Tomorrow"], ["לפני ארוחת הצהריים", "אחרי ארוחת הצהריים", "בלילה", "מחר"], 1, "'after lunch'.")]),
  ],
  A2: [
    L("Hi, this is the library. The book you reserved is now available. Please collect it within five days, or we'll return it to the shelf.",
      "שלום, כאן הספרייה. הספר שהזמנת זמין עכשיו. נא לאסוף אותו תוך חמישה ימים, אחרת נחזיר אותו למדף.",
      [q("Why is the library calling?", "למה הספרייה מתקשרת?", ["A late fee", "A reserved book is available", "It is closing", "A new book"], ["קנס על איחור", "ספר שהוזמן זמין", "היא נסגרת", "ספר חדש"], 1, "'The book you reserved is now available'."), q("How long to collect it?", "כמה זמן יש לאסוף אותו?", ["Two days", "Five days", "Ten days", "A month"], ["יומיים", "חמישה ימים", "עשרה ימים", "חודש"], 1, "'within five days'.")]),
    L("Welcome to the ferry to the island. The trip takes about forty minutes. Hot drinks are available upstairs. Please keep children close to you.",
      "ברוכים הבאים למעבורת לאי. ההפלגה נמשכת כ-40 דקות. משקאות חמים אפשר לקבל בקומה העליונה. נא לשמור על הילדים קרוב אליכם.",
      [q("How long is the ferry trip?", "כמה זמן נמשכת ההפלגה במעבורת?", ["Twenty minutes", "Forty minutes", "An hour", "Two hours"], ["20 דקות", "40 דקות", "שעה", "שעתיים"], 1, "'about forty minutes'."), q("Where can you get hot drinks?", "איפה אפשר לקבל משקאות חמים?", ["Downstairs", "Upstairs", "Outside", "At the café"], ["למטה", "למעלה", "בחוץ", "בבית הקפה"], 1, "'Hot drinks are available upstairs'.")]),
  ],
  B1: [
    L("Hi, it's the estate agent. The flat you liked is still available, but there's a lot of interest. If you'd like to see it again, I'd suggest coming this week rather than next.",
      "שלום, מדבר המתווך. הדירה שאהבת עדיין פנויה, אבל יש הרבה מתעניינים. אם תרצה לראות אותה שוב, הייתי מציע לבוא השבוע ולא בשבוע הבא.",
      [q("What is the agent calling about?", "בקשר למה המתווך מתקשר?", ["A sold flat", "A flat still available with lots of interest", "A price drop", "A new listing"], ["דירה שנמכרה", "דירה שעדיין פנויה ויש בה הרבה מתעניינים", "ירידת מחיר", "מודעה חדשה"], 1, "'still available, but there's a lot of interest'."), q("What does the agent suggest?", "מה המתווך מציע?", ["Wait a month", "Come this week rather than next", "Buy now", "Look elsewhere"], ["לחכות חודש", "לבוא השבוע ולא בשבוע הבא", "לקנות עכשיו", "לחפש במקום אחר"], 1, "'coming this week rather than next'.")]),
    L("Thanks for joining the cooking class. Today we'll make a simple soup. Everything you need is on your table. If you're missing anything, just raise your hand and I'll bring it over.",
      "תודה שהצטרפתם לשיעור הבישול. היום נכין מרק פשוט. כל מה שאתם צריכים נמצא על השולחן שלכם. אם חסר לכם משהו, פשוט הרימו יד ואני אביא אותו.",
      [q("What will they cook today?", "מה הם יבשלו היום?", ["A cake", "A simple soup", "Pasta", "Bread"], ["עוגה", "מרק פשוט", "פסטה", "לחם"], 1, "'we'll make a simple soup'."), q("What should you do if something is missing?", "מה צריך לעשות אם חסר משהו?", ["Leave", "Raise your hand", "Share with a neighbour", "Wait"], ["לצאת", "להרים יד", "לחלוק עם השכן", "לחכות"], 1, "'raise your hand and I'll bring it over'.")]),
  ],
  B2: [
    L("A note on the schedule change: the keynote has been moved to the afternoon to accommodate the speaker's flight. The morning workshops will run as planned, so please check the updated program at the entrance.",
      "הערה לגבי שינוי בלוח הזמנים: הרצאת המפתח הועברה לשעות אחר הצהריים כדי להתאים לטיסה של המרצה. סדנאות הבוקר יתקיימו כמתוכנן, אז אנא בדקו את התוכנייה המעודכנת בכניסה.",
      [q("Why was the keynote moved?", "למה הועברה הרצאת המפתח?", ["Low interest", "To accommodate the speaker's flight", "A room issue", "Bad weather"], ["עניין נמוך", "כדי להתאים לטיסה של המרצה", "בעיה עם החדר", "מזג אוויר גרוע"], 1, "'to accommodate the speaker's flight'."), q("What runs as planned?", "מה מתקיים כמתוכנן?", ["The keynote", "The morning workshops", "Nothing", "The closing talk"], ["הרצאת המפתח", "סדנאות הבוקר", "שום דבר", "הרצאת הסיום"], 1, "'The morning workshops will run as planned'.")]),
    L("I'll be honest about the trade-off. The cheaper supplier would save us money now, but their delivery record is patchy, and a single late shipment could cost us more than we'd save. I lean toward reliability.",
      "אני אהיה כן לגבי הפשרה כאן. הספק הזול יותר יחסוך לנו כסף עכשיו, אבל רקורד המשלוחים שלו לא עקבי, ומשלוח אחד שמאחר עלול לעלות לנו יותר ממה שנחסוך. אני נוטה לכיוון האמינות.",
      [q("What is the trade-off?", "מהי הפשרה?", ["Speed vs color", "Cost now vs reliability", "Size vs weight", "Old vs new"], ["מהירות מול צבע", "עלות עכשיו מול אמינות", "גודל מול משקל", "ישן מול חדש"], 1, "'cheaper... but their delivery record is patchy'."), q("Which does the speaker lean toward?", "לאיזה כיוון הדובר נוטה?", ["The cheaper supplier", "Reliability", "Neither", "Delaying"], ["הספק הזול יותר", "אמינות", "אף אחד מהם", "דחייה"], 1, "'I lean toward reliability'.")]),
  ],
  C1: [
    L("Let me temper the optimism slightly. Early adopters love the product, but early adopters always do — they forgive friction that ordinary users won't. The real test comes when we reach people who didn't go looking for us.",
      "הרשו לי למתן מעט את האופטימיות. המאמצים המוקדמים אוהבים את המוצר, אבל מאמצים מוקדמים תמיד אוהבים — הם סולחים על חיכוכים שמשתמשים רגילים לא יסלחו עליהם. המבחן האמיתי יגיע כשנגיע לאנשים שלא חיפשו אותנו.",
      [q("Who currently loves the product?", "מי אוהב את המוצר כרגע?", ["Everyone", "Early adopters", "Critics", "No one"], ["כולם", "המאמצים המוקדמים", "המבקרים", "אף אחד"], 1, "'Early adopters love the product'."), q("When does the 'real test' come?", "מתי מגיע ״המבחן האמיתי״?", ["At launch", "When reaching people who weren't looking for it", "Never", "In testing"], ["בהשקה", "כשמגיעים לאנשים שלא חיפשו את המוצר", "אף פעם", "בשלב הבדיקות"], 1, "'people who didn't go looking for us'.")]),
    L("I'd push back on framing this as a failure. We set out to test an assumption, and we tested it: the assumption was wrong. Learning that early, cheaply, is precisely what the experiment was for.",
      "אני מסתייג מהצגת הדבר ככישלון. יצאנו לבדוק הנחה, ובדקנו אותה: ההנחה הייתה שגויה. ללמוד את זה מוקדם ובזול — זו בדיוק הייתה מטרת הניסוי.",
      [q("How does the speaker reframe the result?", "איך הדובר מציג מחדש את התוצאה?", ["A clear success", "Not a failure but a useful test", "A disaster", "A waste"], ["הצלחה ברורה", "לא כישלון אלא בדיקה מועילה", "אסון", "בזבוז"], 1, "'push back on framing this as a failure'."), q("What was the experiment for?", "מה הייתה מטרת הניסוי?", ["To launch", "To test an assumption cheaply", "To raise money", "To hire"], ["להשיק", "לבדוק הנחה בזול", "לגייס כסף", "לגייס עובדים"], 1, "'Learning that early, cheaply... is what the experiment was for'.")]),
  ],
  C2: [
    L("I'd introduce a note of caution amid the celebration. The figure is real, but it's a snapshot, and snapshots flatter or damn depending entirely on when the shutter happens to fall.",
      "הייתי מוסיף נימה של זהירות בתוך החגיגה. הנתון אמיתי, אבל הוא תמונת מצב, ותמונות מצב מחמיאות או מרשיעות — תלוי לגמרי ברגע שבו במקרה נלחץ כפתור המצלמה.",
      [q("What does the speaker call the figure?", "איך הדובר מכנה את הנתון?", ["A trend", "A snapshot", "A forecast", "An error"], ["מגמה", "תמונת מצב", "תחזית", "טעות"], 1, "'it's a snapshot'."), q("What determines whether a snapshot flatters or damns?", "מה קובע אם תמונת מצב מחמיאה או מרשיעה?", ["Its size", "When it is taken", "Who reads it", "Its color"], ["הגודל שלה", "מתי היא מצולמת", "מי קורא אותה", "הצבע שלה"], 1, "'when the shutter happens to fall'.")]),
    L("The disagreement here is less about the facts than about which facts we choose to foreground. We're not contradicting each other so much as illuminating different corners of the same dim room.",
      "המחלוקת כאן נוגעת פחות לעובדות עצמן ויותר לשאלה אילו עובדות אנחנו בוחרים להבליט. אנחנו לא כל כך סותרים זה את זה, אלא מאירים פינות שונות של אותו חדר אפלולי.",
      [q("What is the disagreement really about?", "על מה המחלוקת באמת?", ["The facts themselves", "Which facts to foreground", "Nothing", "Definitions"], ["העובדות עצמן", "אילו עובדות להבליט", "שום דבר", "הגדרות"], 1, "'which facts we choose to foreground'."), q("What metaphor does the speaker use?", "באיזו מטאפורה הדובר משתמש?", ["A bright stage", "Different corners of the same dim room", "A locked door", "A clear window"], ["במה מוארת", "פינות שונות של אותו חדר אפלולי", "דלת נעולה", "חלון שקוף"], 1, "'different corners of the same dim room'.")]),
  ],
};

export const MORE_SPEAKING3 = {
  A1: [
    { text: "Excuse me, where is the toilet?", translation: "סליחה, איפה השירותים?" },
    { text: "I am hungry. Let's eat.", translation: "אני רעב. בוא נאכל." },
    { text: "What is this in English?", translation: "איך אומרים את זה באנגלית?" },
    { text: "It is very cold today.", translation: "קר מאוד היום." },
  ],
  A2: [
    { text: "I'd like to return this, please.", translation: "אשמח להחזיר את זה, בבקשה." },
    { text: "Do you have this in a different size?", translation: "יש לכם את זה במידה אחרת?" },
    { text: "We missed the last bus home.", translation: "פספסנו את האוטובוס האחרון הביתה." },
    { text: "Can you take a photo of us, please?", translation: "תוכל לצלם אותנו, בבקשה?" },
  ],
  B1: [
    { text: "I'm not feeling well; I think I'll stay in.", translation: "אני לא מרגיש טוב; אני חושב שאשאר בבית." },
    { text: "Could you explain that one more time?", translation: "תוכל להסביר את זה עוד פעם אחת?" },
    { text: "I'd prefer to pay in cash if possible.", translation: "אני מעדיף לשלם במזומן אם אפשר." },
    { text: "That sounds like a great idea to me.", translation: "זה נשמע לי רעיון מצוין." },
  ],
  B2: [
    { text: "I'd like to get everyone's input before we decide.", translation: "אשמח לשמוע את כולם לפני שנחליט." },
    { text: "Let's table that for now and move on.", translation: "בוא נשאיר את זה בצד לעת עתה ונמשיך." },
    { text: "I'm not entirely sure that's the whole story.", translation: "אני לא לגמרי בטוח שזו כל התמונה." },
    { text: "Could we find a compromise that works for both sides?", translation: "נוכל למצוא פשרה שמתאימה לשני הצדדים?" },
  ],
  C1: [
    { text: "I'd frame it slightly differently, if I may.", translation: "הייתי מנסח את זה קצת אחרת, אם יורשה לי." },
    { text: "There's a tension here we shouldn't gloss over.", translation: "יש כאן מתח שאסור לנו לטשטש." },
    { text: "Let's not let the perfect be the enemy of the good.", translation: "בוא לא ניתן למושלם להיות אויב של הטוב." },
    { text: "I'm cautiously optimistic, but I'd hedge my bets.", translation: "אני אופטימי בזהירות, אבל הייתי מפזר את ההימורים." },
  ],
  C2: [
    { text: "I'd be loath to draw a sweeping conclusion from one case.", translation: "הייתי נרתע מלהסיק מסקנה גורפת ממקרה אחד." },
    { text: "The argument is seductive precisely because it's so simple.", translation: "הטיעון מפתה דווקא משום שהוא כה פשוט." },
    { text: "We'd do well to distinguish correlation from mere coincidence.", translation: "מוטב שנבחין בין מתאם לבין צירוף מקרים גרידא." },
    { text: "I take the point, but it strikes me as somewhat overstated.", translation: "אני מקבל את הנקודה, אך היא נראית לי מוגזמת במקצת." },
  ],
};
