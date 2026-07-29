// Round 9 of additional Reading, Listening and Speaking content.
//
// Unlike rounds 1–8, every item here is **fully bilingual**: passages carry a
// Hebrew translation (`textHe` / `transcriptHe`) and every comprehension
// question carries `questionHe` + `optionsHe`. That is what makes an item
// eligible for the curated pools the generator writes out
// (`*.reading.curated.json` / `*.listening.curated.json`) — the app shows a
// curated passage whenever the learner's vocabulary covers it, and falls back
// to the progressive word-of-the-day passage otherwise.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

// --- READING ---------------------------------------------------------------
export const MORE_READINGS9 = {
  A1: [
    R(
      "The Bus to Work (האוטובוס לעבודה)",
      "I go to work by bus every morning. The bus comes at eight. I sit near the window and I read a book. The trip is short.",
      "אני נוסע לעבודה באוטובוס כל בוקר. האוטובוס מגיע בשמונה. אני יושב ליד החלון וקורא ספר. הנסיעה קצרה.",
      [
        g("bus", "noun", "כלי תחבורה ציבורי גדול", "The bus is full.", "אוטובוס"),
        g("window", "noun", "פתח בקיר שמכניס אור", "I sit near the window.", "חלון"),
        g("short", "adjective", "לא ארוך", "The trip is short.", "קצר"),
      ],
      [
        q("When does the bus come?", "מתי מגיע האוטובוס?", ["At seven", "At eight", "At nine", "At ten"], ["בשבע", "בשמונה", "בתשע", "בעשר"], 1, "כתוב 'The bus comes at eight'."),
        q("What does the writer do on the bus?", "מה עושה הכותב באוטובוס?", ["Sleeps", "Reads a book", "Eats", "Works"], ["ישן", "קורא ספר", "אוכל", "עובד"], 1, "כתוב 'I read a book'."),
      ],
    ),
    R(
      "A Cold Day (יום קר)",
      "Today it is very cold. I wear a warm coat and a hat. My sister makes hot tea for us. We sit at home and we look at the rain.",
      "היום מאוד קר. אני לובש מעיל חם וכובע. אחותי מכינה לנו תה חם. אנחנו יושבים בבית ומסתכלים על הגשם.",
      [
        g("cold", "adjective", "בטמפרטורה נמוכה", "The water is cold.", "קר"),
        g("coat", "noun", "בגד חם שלובשים מעל", "I wear a coat.", "מעיל"),
        g("rain", "noun", "מים שיורדים מהשמיים", "I look at the rain.", "גשם"),
      ],
      [
        q("What is the weather today?", "מה מזג האוויר היום?", ["Hot", "Very cold", "Warm", "Windy"], ["חם", "מאוד קר", "חמים", "סוער"], 1, "כתוב 'Today it is very cold'."),
        q("Who makes the tea?", "מי מכינה את התה?", ["The mother", "The sister", "The father", "The writer"], ["האמא", "האחות", "האבא", "הכותב"], 1, "כתוב 'My sister makes hot tea'."),
      ],
    ),
    R(
      "My New Shoes (הנעליים החדשות שלי)",
      "My mother buys me new shoes. They are blue and very nice. I wear them to school. My friend says they are good shoes.",
      "אמא שלי קונה לי נעליים חדשות. הן כחולות ומאוד יפות. אני נועל אותן לבית הספר. החבר שלי אומר שאלה נעליים טובות.",
      [
        g("buy", "verb", "לתת כסף ולקבל מוצר", "I buy bread.", "לקנות"),
        g("blue", "adjective", "בצבע של השמיים", "The shoes are blue.", "כחול"),
        g("school", "noun", "מקום שבו לומדים", "I go to school.", "בית ספר"),
      ],
      [
        q("What colour are the shoes?", "באיזה צבע הנעליים?", ["Red", "Blue", "Black", "White"], ["אדום", "כחול", "שחור", "לבן"], 1, "כתוב 'They are blue'."),
        q("Where does the writer wear them?", "לאן הכותב נועל אותן?", ["To work", "To school", "To the park", "To a party"], ["לעבודה", "לבית הספר", "לפארק", "למסיבה"], 1, "כתוב 'I wear them to school'."),
      ],
    ),
    R(
      "Dinner at Home (ארוחת ערב בבית)",
      "In the evening my family eats dinner together. My father makes soup and bread. We talk about our day. After dinner I wash the plates.",
      "בערב המשפחה שלי אוכלת ארוחת ערב ביחד. אבא שלי מכין מרק ולחם. אנחנו מדברים על היום שלנו. אחרי הארוחה אני שוטף את הצלחות.",
      [
        g("dinner", "noun", "הארוחה של הערב", "We eat dinner at seven.", "ארוחת ערב"),
        g("soup", "noun", "מאכל נוזלי וחם", "The soup is hot.", "מרק"),
        g("plate", "noun", "כלי שאוכלים ממנו", "I wash the plates.", "צלחת"),
      ],
      [
        q("Who makes the soup?", "מי מכין את המרק?", ["The mother", "The father", "The sister", "The writer"], ["האמא", "האבא", "האחות", "הכותב"], 1, "כתוב 'My father makes soup'."),
        q("What happens after dinner?", "מה קורה אחרי ארוחת הערב?", ["They sleep", "The writer washes the plates", "They go out", "They cook again"], ["הם הולכים לישון", "הכותב שוטף את הצלחות", "הם יוצאים", "הם מבשלים שוב"], 1, "כתוב 'I wash the plates'."),
      ],
    ),
  ],
  A2: [
    R(
      "The Long Walk Home (ההליכה הארוכה הביתה)",
      "Yesterday I missed the last bus, so I had to walk home. It took almost an hour, but the streets were quiet and the air was cool. By the time I arrived, I felt calm instead of tired. Now I sometimes choose to walk on purpose.",
      "אתמול פספסתי את האוטובוס האחרון, ולכן נאלצתי ללכת הביתה ברגל. זה לקח כמעט שעה, אבל הרחובות היו שקטים והאוויר היה קריר. עד שהגעתי, הרגשתי רגוע במקום עייף. עכשיו אני לפעמים בוחר ללכת ברגל בכוונה.",
      [
        g("miss", "verb", "לא להספיק להגיע בזמן", "I missed the bus.", "לפספס"),
        g("quiet", "adjective", "בלי רעש", "The street was quiet.", "שקט"),
        g("calm", "adjective", "רגוע, בלי לחץ", "I felt calm.", "רגוע"),
      ],
      [
        q("Why did the writer walk home?", "למה הכותב הלך הביתה ברגל?", ["For exercise", "The last bus was missed", "The bus was full", "It was a short way"], ["בשביל ספורט", "הוא פספס את האוטובוס האחרון", "האוטובוס היה מלא", "הדרך הייתה קצרה"], 1, "כתוב 'I missed the last bus'."),
        q("How did the writer feel at the end?", "איך הרגיש הכותב בסוף?", ["Angry", "Calm", "Afraid", "Bored"], ["כועס", "רגוע", "מפוחד", "משועמם"], 1, "כתוב 'I felt calm instead of tired'."),
      ],
    ),
    R(
      "A Small Kitchen (מטבח קטן)",
      "Our kitchen is small, but we cook in it every day. There is space for two people if we are careful. My partner cuts the vegetables while I watch the pot. Somehow the food always tastes better when we make it together.",
      "המטבח שלנו קטן, אבל אנחנו מבשלים בו כל יום. יש מקום לשני אנשים אם נזהרים. בן הזוג שלי חותך את הירקות בזמן שאני משגיח על הסיר. משום מה האוכל תמיד טעים יותר כשאנחנו מכינים אותו ביחד.",
      [
        g("space", "noun", "מקום פנוי", "There is space for two.", "מקום"),
        g("careful", "adjective", "זהיר, שם לב", "Be careful with the knife.", "זהיר"),
        g("taste", "verb", "להיות בעל טעם מסוים", "The food tastes good.", "להיות בטעם"),
      ],
      [
        q("How big is the kitchen?", "כמה גדול המטבח?", ["Very large", "Small", "Medium", "It is not said"], ["מאוד גדול", "קטן", "בינוני", "לא נאמר"], 1, "כתוב 'Our kitchen is small'."),
        q("Who cuts the vegetables?", "מי חותך את הירקות?", ["The writer", "The partner", "A friend", "Nobody"], ["הכותב", "בן הזוג", "חבר", "אף אחד"], 1, "כתוב 'My partner cuts the vegetables'."),
      ],
    ),
    R(
      "Learning to Say No (ללמוד להגיד לא)",
      "For years I said yes to everything, and then I had no time left for myself. A friend told me that saying no is also a way of being honest. It felt rude at first, but nobody was angry. Now my week has space in it again.",
      "במשך שנים אמרתי כן להכול, ואז לא נשאר לי זמן לעצמי. חבר אמר לי שלהגיד לא זו גם דרך להיות כן. בהתחלה זה הרגיש גס, אבל אף אחד לא כעס. עכשיו יש שוב מקום בשבוע שלי.",
      [
        g("honest", "adjective", "אומר את האמת", "Be honest with me.", "כן/ישר"),
        g("rude", "adjective", "לא מנומס", "It felt rude.", "גס רוח"),
        g("angry", "adjective", "כועס", "Nobody was angry.", "כועס"),
      ],
      [
        q("What was the writer's problem?", "מה הייתה הבעיה של הכותב?", ["Too little work", "Saying yes to everything", "Rude friends", "No friends"], ["מעט מדי עבודה", "אמירת כן להכול", "חברים גסי רוח", "אין חברים"], 1, "כתוב 'I said yes to everything'."),
        q("How did people react?", "איך אנשים הגיבו?", ["They were angry", "Nobody was angry", "They stopped calling", "They complained"], ["הם כעסו", "אף אחד לא כעס", "הם הפסיקו להתקשר", "הם התלוננו"], 1, "כתוב 'nobody was angry'."),
      ],
    ),
    R(
      "The Old Bicycle (האופניים הישנים)",
      "My grandfather gave me his old bicycle when I was twelve. It was heavy and slow, and the paint was gone in places. I rode it for six years and never wanted a new one. Some things become better exactly because they are old.",
      "סבא שלי נתן לי את האופניים הישנים שלו כשהייתי בן שתים עשרה. הם היו כבדים ואיטיים, והצבע ירד במקומות מסוימים. רכבתי עליהם שש שנים ומעולם לא רציתי חדשים. יש דברים שנעשים טובים יותר דווקא בגלל שהם ישנים.",
      [
        g("heavy", "adjective", "שוקל הרבה", "The bicycle was heavy.", "כבד"),
        g("ride", "verb", "לרכוב על אופניים או סוס", "I ride a bicycle.", "לרכוב"),
        g("paint", "noun", "החומר הצבעוני שמורחים", "The paint is gone.", "צבע"),
      ],
      [
        q("Who gave the bicycle to the writer?", "מי נתן לכותב את האופניים?", ["A friend", "The grandfather", "The father", "A neighbour"], ["חבר", "הסבא", "האבא", "שכן"], 1, "כתוב 'My grandfather gave me his old bicycle'."),
        q("How long did the writer ride it?", "כמה זמן הכותב רכב עליהם?", ["Two years", "Six years", "Twelve years", "One year"], ["שנתיים", "שש שנים", "שתים עשרה שנים", "שנה"], 1, "כתוב 'I rode it for six years'."),
      ],
    ),
  ],
  B1: [
    R(
      "The Cost of Cheap Clothes (המחיר של בגדים זולים)",
      "A cheap shirt looks like a bargain until you count how often you replace it. Clothes made quickly tend to lose their shape after a few washes, so the real cost per year is higher than it seems. Buying less but better is not only about money — it also produces far less waste. The hardest part is resisting the feeling that a low price is always a win.",
      "חולצה זולה נראית כמו מציאה עד שסופרים כל כמה זמן מחליפים אותה. בגדים שמיוצרים במהירות נוטים לאבד את צורתם אחרי כמה כביסות, כך שהעלות האמיתית לשנה גבוהה ממה שנדמה. לקנות פחות אבל טוב יותר זה לא רק עניין של כסף — זה גם מייצר הרבה פחות פסולת. החלק הקשה הוא לעמוד בתחושה שמחיר נמוך הוא תמיד ניצחון.",
      [
        g("bargain", "noun", "קנייה זולה במיוחד", "This coat was a bargain.", "מציאה"),
        g("replace", "verb", "להחליף במשהו אחר", "I replace my shoes every year.", "להחליף"),
        g("waste", "noun", "פסולת, דברים שנזרקים", "It produces less waste.", "פסולת"),
      ],
      [
        q("Why is a cheap shirt not always cheap?", "למה חולצה זולה לא תמיד זולה?", ["It costs more in the shop", "It has to be replaced often", "It is hard to wash", "It is heavy"], ["היא עולה יותר בחנות", "צריך להחליף אותה לעיתים קרובות", "קשה לכבס אותה", "היא כבדה"], 1, "כתוב 'how often you replace it'."),
        q("What other benefit does buying better have?", "איזו תועלת נוספת יש בקנייה איכותית?", ["More choice", "Less waste", "Faster delivery", "Better colours"], ["יותר בחירה", "פחות פסולת", "משלוח מהיר יותר", "צבעים טובים יותר"], 1, "כתוב 'it also produces far less waste'."),
      ],
    ),
    R(
      "Why We Forget Names (למה אנחנו שוכחים שמות)",
      "Most people remember a face easily but lose the name within seconds. The reason is that a name carries no meaning on its own — it is an arbitrary label, while a face is a rich picture. Memory experts suggest connecting the name to something you already know. Repeating it out loud once in the first minute also helps far more than people expect.",
      "רוב האנשים זוכרים פנים בקלות אבל מאבדים את השם תוך שניות. הסיבה היא ששם אינו נושא משמעות בפני עצמו — הוא תווית שרירותית, בעוד שפנים הן תמונה עשירה. מומחי זיכרון ממליצים לקשר את השם למשהו שאתם כבר מכירים. גם חזרה עליו בקול פעם אחת בדקה הראשונה עוזרת הרבה יותר משנדמה לאנשים.",
      [
        g("remember", "verb", "לשמור מידע בזיכרון", "I remember his face.", "לזכור"),
        g("meaning", "noun", "המשמעות של מילה או דבר", "The word has no meaning.", "משמעות"),
        g("repeat", "verb", "לומר או לעשות שוב", "Repeat the name out loud.", "לחזור על"),
      ],
      [
        q("Why are names hard to remember?", "למה קשה לזכור שמות?", ["They are too long", "They carry no meaning on their own", "They sound alike", "People speak quickly"], ["הם ארוכים מדי", "אין להם משמעות בפני עצמם", "הם נשמעים דומה", "אנשים מדברים מהר"], 1, "כתוב 'a name carries no meaning on its own'."),
        q("What does the text suggest doing?", "מה מציע הטקסט לעשות?", ["Writing it down", "Repeating it out loud early", "Asking again later", "Using a nickname"], ["לכתוב אותו", "לחזור עליו בקול מוקדם", "לשאול שוב מאוחר יותר", "להשתמש בכינוי"], 1, "כתוב 'Repeating it out loud once in the first minute'."),
      ],
    ),
    R(
      "The Quiet Carriage (הקרון השקט)",
      "Some trains have a carriage where phone calls are not allowed. At first it sounds like a small detail, but for many travellers it is the only quiet hour of the day. Interestingly, passengers there rarely need to enforce the rule — the shared expectation does the work. It is a good example of how a simple agreement can change behaviour without any punishment.",
      "בחלק מהרכבות יש קרון שבו אסור לדבר בטלפון. בהתחלה זה נשמע כמו פרט קטן, אבל עבור נוסעים רבים זו השעה השקטה היחידה ביום. מעניין שהנוסעים שם כמעט אף פעם לא צריכים לאכוף את הכלל — הציפייה המשותפת עושה את העבודה. זו דוגמה טובה לאיך הסכמה פשוטה יכולה לשנות התנהגות בלי שום ענישה.",
      [
        g("allow", "verb", "לאפשר, לתת רשות", "Calls are not allowed.", "לאפשר"),
        g("shared", "adjective", "משותף לכמה אנשים", "A shared expectation.", "משותף"),
        g("behaviour", "noun", "הדרך שבה אנשים מתנהגים", "It changes behaviour.", "התנהגות"),
      ],
      [
        q("What is special about that carriage?", "מה מיוחד בקרון הזה?", ["It is cheaper", "Phone calls are not allowed", "It has more seats", "It is faster"], ["הוא זול יותר", "אסור לדבר בטלפון", "יש בו יותר מושבים", "הוא מהיר יותר"], 1, "כתוב 'phone calls are not allowed'."),
        q("Why does the rule work?", "למה הכלל עובד?", ["Guards enforce it", "The shared expectation does the work", "There are fines", "Phones do not work there"], ["שומרים אוכפים אותו", "הציפייה המשותפת עושה את העבודה", "יש קנסות", "הטלפונים לא עובדים שם"], 1, "כתוב 'the shared expectation does the work'."),
      ],
    ),
    R(
      "Learning in Public (ללמוד בפומבי)",
      "Many adults avoid speaking a new language because they are afraid of sounding foolish. Yet children learn fast precisely because they are willing to be wrong in front of others. Every mistake you make out loud gets corrected far sooner than a mistake you keep to yourself. The discomfort is real, but it is also the shortest route to fluency.",
      "מבוגרים רבים נמנעים מלדבר שפה חדשה כי הם חוששים להישמע טיפשיים. ובכל זאת ילדים לומדים מהר דווקא משום שהם מוכנים לטעות מול אחרים. כל טעות שאתם עושים בקול מתוקנת הרבה יותר מהר מטעות שאתם שומרים לעצמכם. אי הנוחות אמיתית, אבל היא גם הדרך הקצרה ביותר לשליטה בשפה.",
      [
        g("avoid", "verb", "להימנע ממשהו", "They avoid speaking.", "להימנע"),
        g("mistake", "noun", "טעות", "Every mistake helps.", "טעות"),
        g("fluent", "adjective", "מדבר שפה בשטף", "She is fluent in English.", "רהוט/שוטף"),
      ],
      [
        q("Why do many adults avoid speaking?", "למה מבוגרים רבים נמנעים מלדבר?", ["No time", "Fear of sounding foolish", "No teacher", "It is boring"], ["אין זמן", "פחד להישמע טיפשיים", "אין מורה", "זה משעמם"], 1, "כתוב 'afraid of sounding foolish'."),
        q("Why do children learn faster?", "למה ילדים לומדים מהר יותר?", ["Better memory", "They are willing to be wrong", "More lessons", "They read more"], ["זיכרון טוב יותר", "הם מוכנים לטעות", "יותר שיעורים", "הם קוראים יותר"], 1, "כתוב 'willing to be wrong in front of others'."),
      ],
    ),
  ],
  B2: [
    R(
      "The Myth of Multitasking (המיתוס של ריבוי משימות)",
      "Research consistently shows that what we call multitasking is really rapid switching between tasks, and every switch carries a cost. The brain needs time to reload the context it just abandoned, so a person answering messages while writing a report finishes both more slowly and less accurately. Organisations that protect blocks of uninterrupted time tend to report better output with fewer hours. The implication is uncomfortable: availability and productivity often pull in opposite directions.",
      "מחקרים מראים באופן עקבי שמה שאנחנו מכנים ריבוי משימות הוא למעשה מעבר מהיר בין משימות, ולכל מעבר יש מחיר. המוח זקוק לזמן כדי לטעון מחדש את ההקשר שזה עתה נטש, ולכן אדם שעונה להודעות בזמן כתיבת דוח מסיים את שניהם לאט יותר ובדיוק נמוך יותר. ארגונים ששומרים על מקטעי זמן ללא הפרעה נוטים לדווח על תפוקה טובה יותר בפחות שעות. המסקנה לא נוחה: זמינות ופרודוקטיביות מושכות לרוב לכיוונים מנוגדים.",
      [
        g("switch", "noun", "מעבר בין דברים", "Every switch carries a cost.", "מעבר"),
        g("context", "noun", "ההקשר שבו משהו קורה", "The brain reloads the context.", "הקשר"),
        g("output", "noun", "התפוקה שנוצרת", "Better output in fewer hours.", "תפוקה"),
      ],
      [
        q("What is multitasking, according to the text?", "מהו ריבוי משימות לפי הטקסט?", ["Doing two things at once", "Rapid switching between tasks", "Working faster", "Delegating work"], ["עשיית שני דברים בו זמנית", "מעבר מהיר בין משימות", "עבודה מהירה יותר", "האצלת עבודה"], 1, "כתוב 'really rapid switching between tasks'."),
        q("What do organisations gain by protecting focus time?", "מה מרוויחים ארגונים ששומרים על זמן מרוכז?", ["More meetings", "Better output with fewer hours", "Lower salaries", "Faster replies"], ["יותר פגישות", "תפוקה טובה יותר בפחות שעות", "משכורות נמוכות יותר", "מענה מהיר יותר"], 1, "כתוב 'better output with fewer hours'."),
      ],
    ),
    R(
      "Cities That Slow Cars Down (ערים שמאטות מכוניות)",
      "Several European cities have lowered urban speed limits to thirty kilometres per hour, and the results have been striking. Serious injuries fell sharply, while average journey times barely changed, because in dense traffic the limiting factor is junctions rather than top speed. Residents who initially objected often became the policy's strongest defenders once the streets grew quieter. The case illustrates how strongly public opinion can shift after a measure is actually experienced.",
      "כמה ערים באירופה הורידו את מגבלת המהירות העירונית לשלושים קילומטרים לשעה, והתוצאות היו מרשימות. פציעות קשות ירדו בחדות, בעוד שזמני הנסיעה הממוצעים כמעט לא השתנו, משום שבתנועה צפופה הגורם המגביל הוא הצמתים ולא המהירות המרבית. תושבים שהתנגדו בתחילה הפכו לא פעם למגיניה החזקים ביותר של המדיניות ברגע שהרחובות נעשו שקטים יותר. המקרה ממחיש עד כמה דעת הקהל יכולה להשתנות אחרי שאמצעי כלשהו נחווה בפועל.",
      [
        g("striking", "adjective", "מרשים ובולט מאוד", "The results were striking.", "מרשים"),
        g("dense", "adjective", "צפוף, מלא", "In dense traffic.", "צפוף"),
        g("object", "verb", "להתנגד למשהו", "Residents objected at first.", "להתנגד"),
      ],
      [
        q("Why did journey times barely change?", "למה זמני הנסיעה כמעט לא השתנו?", ["Fewer cars", "Junctions limit speed, not the top limit", "New roads", "Better engines"], ["פחות מכוניות", "הצמתים מגבילים, לא המהירות המרבית", "כבישים חדשים", "מנועים טובים יותר"], 1, "כתוב 'the limiting factor is junctions'."),
        q("What happened to residents who objected?", "מה קרה לתושבים שהתנגדו?", ["They moved away", "Many became strong supporters", "They sued the city", "Nothing changed"], ["הם עברו דירה", "רבים הפכו לתומכים חזקים", "הם תבעו את העירייה", "שום דבר לא השתנה"], 1, "כתוב 'became the policy's strongest defenders'."),
      ],
    ),
    R(
      "The Value of Boredom (הערך של השעמום)",
      "Boredom has a bad reputation, yet psychologists increasingly treat it as a productive state rather than a failure of entertainment. When nothing external demands attention, the mind drifts and begins to connect ideas that focused work keeps apart. Filling every empty moment with a screen removes precisely the conditions under which original thinking appears. Protecting a little boredom may be one of the cheapest creative investments available.",
      "לשעמום יש מוניטין רע, ובכל זאת פסיכולוגים רואים בו יותר ויותר מצב פורה ולא כישלון של בידור. כשדבר חיצוני אינו דורש תשומת לב, המחשבה נודדת ומתחילה לחבר רעיונות שעבודה ממוקדת מפרידה ביניהם. מילוי כל רגע ריק במסך מבטל בדיוק את התנאים שבהם מופיעה חשיבה מקורית. שמירה על מעט שעמום היא אולי אחת ההשקעות היצירתיות הזולות ביותר.",
      [
        g("reputation", "noun", "המוניטין של משהו", "Boredom has a bad reputation.", "מוניטין"),
        g("drift", "verb", "לנוע בלי כיוון קבוע", "The mind drifts.", "לנדוד"),
        g("original", "adjective", "מקורי, חדשני", "Original thinking appears.", "מקורי"),
      ],
      [
        q("How do psychologists increasingly view boredom?", "איך פסיכולוגים רואים יותר ויותר את השעמום?", ["As a disorder", "As a productive state", "As laziness", "As harmless"], ["כהפרעה", "כמצב פורה", "כעצלות", "כלא מזיק"], 1, "כתוב 'a productive state'."),
        q("What does filling every moment with a screen remove?", "מה מבטל מילוי כל רגע במסך?", ["Free time", "The conditions for original thinking", "Social contact", "Sleep"], ["זמן פנוי", "התנאים לחשיבה מקורית", "קשר חברתי", "שינה"], 1, "כתוב 'removes precisely the conditions'."),
      ],
    ),
    R(
      "Deadlines and Quality (מועדי יעד ואיכות)",
      "A deadline is often blamed for poor work, but the evidence points the other way: without one, projects tend to expand indefinitely rather than improve. What damages quality is not the existence of a limit but a limit set without regard to the work involved. Teams that negotiate scope alongside the date consistently deliver better results than teams handed both. In practice, the useful question is rarely when, but what by when.",
      "לא פעם מאשימים מועד יעד בעבודה גרועה, אך העדויות מצביעות על ההפך: בלעדיו פרויקטים נוטים להתרחב ללא סוף במקום להשתפר. מה שפוגע באיכות אינו עצם קיומה של מגבלה אלא מגבלה שנקבעת בלי התחשבות בעבודה הכרוכה בכך. צוותים שמנהלים משא ומתן על ההיקף לצד התאריך מספקים באופן עקבי תוצאות טובות יותר מצוותים שמקבלים את שניהם. בפועל, השאלה המועילה היא רק לעיתים רחוקות מתי, אלא מה עד מתי.",
      [
        g("deadline", "noun", "המועד האחרון להגשה", "The deadline is Friday.", "מועד אחרון"),
        g("scope", "noun", "היקף העבודה", "They negotiate scope.", "היקף"),
        g("expand", "verb", "לגדול ולהתרחב", "Projects expand indefinitely.", "להתרחב"),
      ],
      [
        q("What happens to projects without a deadline?", "מה קורה לפרויקטים בלי מועד יעד?", ["They improve", "They tend to expand indefinitely", "They are cancelled", "They cost less"], ["הם משתפרים", "הם נוטים להתרחב ללא סוף", "הם מבוטלים", "הם עולים פחות"], 1, "כתוב 'expand indefinitely'."),
        q("What actually damages quality?", "מה באמת פוגע באיכות?", ["Any limit", "A limit set without regard to the work", "Large teams", "Long projects"], ["כל מגבלה", "מגבלה שנקבעת בלי התחשבות בעבודה", "צוותים גדולים", "פרויקטים ארוכים"], 1, "כתוב 'a limit set without regard to the work involved'."),
      ],
    ),
  ],
  C1: [
    R(
      "The Tyranny of Metrics (עריצות המדדים)",
      "Once a measure becomes a target, it tends to stop measuring anything useful. Hospitals judged on waiting times learn to reclassify patients; schools judged on averages quietly discourage weaker candidates from sitting exams. None of this requires dishonesty — it emerges naturally wherever a single number carries disproportionate weight. The remedy is rarely a better metric but a willingness to hold several imperfect ones in view at once.",
      "ברגע שמדד הופך ליעד, הוא נוטה להפסיק למדוד משהו מועיל. בתי חולים שנשפטים לפי זמני המתנה לומדים לסווג מחדש מטופלים; בתי ספר שנשפטים לפי ממוצעים מרתיעים בשקט מועמדים חלשים מלגשת לבחינות. שום דבר מזה אינו מחייב חוסר יושר — הוא מתהווה באופן טבעי בכל מקום שבו מספר יחיד נושא משקל בלתי מידתי. התרופה היא רק לעיתים רחוקות מדד טוב יותר, אלא נכונות להחזיק כמה מדדים לא מושלמים בו זמנית.",
      [
        g("metric", "noun", "מדד כמותי", "A single metric misleads.", "מדד"),
        g("emerge", "verb", "להתהוות, להופיע בהדרגה", "It emerges naturally.", "להתהוות"),
        g("remedy", "noun", "פתרון לבעיה", "The remedy is not a better metric.", "תרופה/פתרון"),
      ],
      [
        q("What happens when a measure becomes a target?", "מה קורה כשמדד הופך ליעד?", ["It becomes precise", "It stops measuring anything useful", "It is abandoned", "It gets cheaper"], ["הוא נעשה מדויק", "הוא מפסיק למדוד משהו מועיל", "הוא ננטש", "הוא נעשה זול יותר"], 1, "כתוב 'stop measuring anything useful'."),
        q("What remedy does the text propose?", "איזה פתרון מציע הטקסט?", ["One better metric", "Holding several imperfect metrics in view", "Removing all metrics", "Stricter audits"], ["מדד אחד טוב יותר", "החזקת כמה מדדים לא מושלמים יחד", "ביטול כל המדדים", "ביקורות מחמירות"], 1, "כתוב 'several imperfect ones in view at once'."),
      ],
    ),
    R(
      "Restoring, Not Rebuilding (לשמר, לא לבנות מחדש)",
      "Conservation architecture rests on an uncomfortable premise: that a building's flaws may carry as much meaning as its finest features. A wall rebuilt to modern standards is technically superior and historically mute. Practitioners therefore distinguish between repairs that keep a structure standing and interventions that quietly erase its biography. Where the line falls is contested, which is precisely why the discipline demands judgement rather than rules.",
      "אדריכלות שימור נשענת על הנחה לא נוחה: שפגמיו של מבנה עשויים לשאת משמעות רבה כמו תכונותיו המשובחות ביותר. קיר שנבנה מחדש לפי תקנים מודרניים עדיף טכנית ואילם היסטורית. לכן אנשי המקצוע מבחינים בין תיקונים ששומרים על המבנה עומד לבין התערבויות שמוחקות בשקט את הביוגרפיה שלו. היכן עובר הקו שנוי במחלוקת, וזו בדיוק הסיבה שהתחום דורש שיקול דעת ולא כללים.",
      [
        g("premise", "noun", "הנחת יסוד", "An uncomfortable premise.", "הנחת יסוד"),
        g("intervention", "noun", "התערבות מכוונת", "Interventions erase history.", "התערבות"),
        g("contested", "adjective", "שנוי במחלוקת", "Where the line falls is contested.", "שנוי במחלוקת"),
      ],
      [
        q("What is the field's uncomfortable premise?", "מהי הנחת היסוד הלא נוחה של התחום?", ["Old buildings are unsafe", "Flaws can carry as much meaning as fine features", "Modern standards are wrong", "Repairs are always harmful"], ["מבנים ישנים אינם בטוחים", "פגמים יכולים לשאת משמעות כמו תכונות משובחות", "תקנים מודרניים שגויים", "תיקונים תמיד מזיקים"], 1, "כתוב 'flaws may carry as much meaning'."),
        q("Why does the discipline demand judgement?", "למה התחום דורש שיקול דעת?", ["Rules are expensive", "The line between repair and erasure is contested", "There are no experts", "Buildings differ in size"], ["כללים יקרים", "הקו בין תיקון למחיקה שנוי במחלוקת", "אין מומחים", "מבנים נבדלים בגודל"], 1, "כתוב 'Where the line falls is contested'."),
      ],
    ),
    R(
      "The Half-Life of Expertise (זמן מחצית החיים של מומחיות)",
      "In fast-moving fields, a substantial share of what a specialist knows becomes obsolete within a decade, yet professional status is often awarded for accumulated knowledge rather than current learning. This creates a quiet incentive to defend old positions instead of revising them. The most durable experts tend to treat their conclusions as provisional, holding them firmly enough to act and loosely enough to abandon. Confidence and revisability, it turns out, are not opposites.",
      "בתחומים שמשתנים במהירות, חלק ניכר ממה שמומחה יודע מתיישן בתוך עשור, ובכל זאת מעמד מקצועי מוענק לרוב על ידע שנצבר ולא על למידה עכשווית. הדבר יוצר תמריץ שקט להגן על עמדות ישנות במקום לעדכן אותן. המומחים העמידים ביותר נוטים להתייחס למסקנותיהם כזמניות, ולהחזיק בהן חזק מספיק כדי לפעול ורופף מספיק כדי לזנוח אותן. מסתבר שביטחון ויכולת תיקון אינם הפכים.",
      [
        g("obsolete", "adjective", "מיושן ולא רלוונטי", "The knowledge becomes obsolete.", "מיושן"),
        g("incentive", "noun", "תמריץ לפעולה", "A quiet incentive appears.", "תמריץ"),
        g("provisional", "adjective", "זמני, נתון לשינוי", "Conclusions are provisional.", "זמני"),
      ],
      [
        q("What is professional status often awarded for?", "על מה מוענק לרוב מעמד מקצועי?", ["Current learning", "Accumulated knowledge", "Publications", "Years of service"], ["למידה עכשווית", "ידע שנצבר", "פרסומים", "שנות ותק"], 1, "כתוב 'awarded for accumulated knowledge'."),
        q("How do durable experts treat conclusions?", "איך מומחים עמידים מתייחסים למסקנות?", ["As final", "As provisional", "As secrets", "As irrelevant"], ["כסופיות", "כזמניות", "כסודות", "כלא רלוונטיות"], 1, "כתוב 'treat their conclusions as provisional'."),
      ],
    ),
    R(
      "Silence in Negotiation (שתיקה במשא ומתן)",
      "Skilled negotiators exploit a simple asymmetry: most people find silence intolerable and rush to fill it, often with a concession nobody asked for. Holding a pause after an offer therefore transfers pressure across the table at no cost. The technique is neither aggressive nor deceptive, which is why it survives repeated exposure. Its main limitation is cultural — in settings where pauses are ordinary, the silence simply reads as thought.",
      "מנהלי משא ומתן מיומנים מנצלים אי סימטריה פשוטה: רוב האנשים מתקשים לשאת שתיקה וממהרים למלא אותה, לא פעם בוויתור שאיש לא ביקש. לכן החזקת הפסקה אחרי הצעה מעבירה לחץ אל הצד השני בלי שום מחיר. הטכניקה אינה תוקפנית ואינה מטעה, ולכן היא שורדת חשיפה חוזרת. מגבלתה העיקרית היא תרבותית — בסביבות שבהן הפסקות הן דבר רגיל, השתיקה פשוט נקראת כמחשבה.",
      [
        g("asymmetry", "noun", "אי שוויון בין צדדים", "A simple asymmetry.", "אי סימטריה"),
        g("concession", "noun", "ויתור במשא ומתן", "A concession nobody asked for.", "ויתור"),
        g("deceptive", "adjective", "מטעה", "The technique is not deceptive.", "מטעה"),
      ],
      [
        q("What do most people do with silence?", "מה רוב האנשים עושים עם שתיקה?", ["Enjoy it", "Rush to fill it", "Leave the room", "Repeat the offer"], ["נהנים ממנה", "ממהרים למלא אותה", "עוזבים את החדר", "חוזרים על ההצעה"], 1, "כתוב 'rush to fill it'."),
        q("What is the technique's main limitation?", "מהי המגבלה העיקרית של הטכניקה?", ["It is aggressive", "It is cultural", "It is expensive", "It is illegal"], ["היא תוקפנית", "היא תרבותית", "היא יקרה", "היא אינה חוקית"], 1, "כתוב 'Its main limitation is cultural'."),
      ],
    ),
  ],
  C2: [
    R(
      "The Archive and the Absence (הארכיון וההיעדר)",
      "Every archive is an argument disguised as a collection, since what was kept was chosen and what was discarded rarely announces itself. Historians working on marginal communities therefore read as much for silences as for statements, treating gaps as evidence in their own right. The danger is symmetrical: absence can be over-read as suppression when it merely reflects indifference. Rigour here consists less in resolving that ambiguity than in refusing to pretend it has been resolved.",
      "כל ארכיון הוא טיעון שמתחפש לאוסף, שכן מה שנשמר נבחר ומה שהושלך כמעט אף פעם אינו מכריז על עצמו. לכן היסטוריונים שעוסקים בקהילות שוליים קוראים לא פחות את השתיקות מאשר את האמירות, ומתייחסים לפערים כאל עדות בפני עצמה. הסכנה סימטרית: היעדר עלול להיקרא ביתר כדיכוי כשהוא משקף אך ורק אדישות. הקפדנות כאן מתבטאת פחות ביישוב העמימות הזאת ויותר בסירוב להעמיד פנים שהיא יושבה.",
      [
        g("archive", "noun", "אוסף מסמכים היסטורי", "Every archive is an argument.", "ארכיון"),
        g("suppression", "noun", "השתקה או דיכוי", "Absence read as suppression.", "דיכוי"),
        g("rigour", "noun", "קפדנות מתודולוגית", "Rigour consists in refusing.", "קפדנות"),
      ],
      [
        q("Why is an archive called an argument?", "למה ארכיון מכונה טיעון?", ["It is written by scholars", "What was kept was chosen", "It contains debates", "It is often wrong"], ["הוא נכתב על ידי חוקרים", "מה שנשמר נבחר", "הוא מכיל ויכוחים", "הוא לרוב שגוי"], 1, "כתוב 'what was kept was chosen'."),
        q("What does rigour consist in, per the text?", "במה מתבטאת הקפדנות לפי הטקסט?", ["Resolving the ambiguity", "Refusing to pretend it is resolved", "Collecting more sources", "Avoiding gaps"], ["ביישוב העמימות", "בסירוב להעמיד פנים שהיא יושבה", "באיסוף מקורות נוספים", "בהימנעות מפערים"], 1, "כתוב 'refusing to pretend it has been resolved'."),
      ],
    ),
    R(
      "Translation as Loss (תרגום כאובדן)",
      "The translator's predicament is that fidelity to sense and fidelity to sound are frequently incompatible, and no amount of ingenuity dissolves the conflict entirely. What distinguishes an accomplished translation is not the absence of loss but the coherence of the losses chosen. A version that sacrifices metre to preserve argument is defensible; one that sacrifices both to preserve literal wording rarely is. Readers, unaware of the negotiation, judge only its residue.",
      "מצוקתו של המתרגם היא שנאמנות למשמעות ונאמנות לצליל אינן מתיישבות זו עם זו לעיתים קרובות, ושום כמות של תושייה אינה מפוגגת את הסתירה כליל. את התרגום המשובח מבדילה לא היעדר האובדן אלא הלכידות של האובדנים שנבחרו. גרסה שמקריבה משקל כדי לשמר טיעון היא בת הגנה; גרסה שמקריבה את שניהם כדי לשמר ניסוח מילולי כמעט אף פעם אינה כזאת. הקוראים, שאינם מודעים למשא ומתן, שופטים רק את שאריתו.",
      [
        g("fidelity", "noun", "נאמנות למקור", "Fidelity to sense and sound.", "נאמנות"),
        g("coherence", "noun", "לכידות פנימית", "The coherence of the losses.", "לכידות"),
        g("residue", "noun", "מה שנותר בסוף", "Readers judge the residue.", "שארית"),
      ],
      [
        q("What is the translator's predicament?", "מהי מצוקת המתרגם?", ["Too few words", "Sense and sound are often incompatible", "Deadlines", "Unclear originals"], ["מעט מדי מילים", "משמעות וצליל לרוב אינם מתיישבים", "מועדי יעד", "מקורות לא ברורים"], 1, "כתוב 'fidelity to sense and fidelity to sound are frequently incompatible'."),
        q("What marks an accomplished translation?", "מה מאפיין תרגום משובח?", ["No loss at all", "The coherence of the losses chosen", "Literal wording", "Shorter length"], ["היעדר אובדן כלל", "לכידות האובדנים שנבחרו", "ניסוח מילולי", "אורך קצר יותר"], 1, "כתוב 'the coherence of the losses chosen'."),
      ],
    ),
    R(
      "Expertise and Intuition (מומחיות ואינטואיציה)",
      "Intuition earns its authority only in domains that supply regular, unambiguous feedback; elsewhere it merely rehearses confident error. Chess masters and firefighters develop reliable instincts because reality corrects them quickly and often, whereas long-range forecasters are corrected slowly, if at all. Consequently the question is never whether to trust intuition but whether the environment in question was ever capable of training it. Framed that way, humility becomes an empirical conclusion rather than a virtue.",
      "האינטואיציה זוכה לסמכותה רק בתחומים שמספקים משוב סדיר וחד משמעי; בכל מקום אחר היא רק חוזרת על טעות בטוחה בעצמה. אמני שחמט וכבאים מפתחים אינסטינקטים אמינים משום שהמציאות מתקנת אותם מהר ולעיתים קרובות, בעוד שחזאים לטווח ארוך מתוקנים לאט, אם בכלל. לפיכך השאלה לעולם אינה אם לסמוך על אינטואיציה אלא אם הסביבה הנדונה הייתה מסוגלת אי פעם לאמן אותה. במסגור כזה, הענווה הופכת למסקנה אמפירית ולא לסגולה.",
      [
        g("intuition", "noun", "תחושת בטן מקצועית", "Intuition earns authority.", "אינטואיציה"),
        g("feedback", "noun", "משוב על תוצאה", "Regular feedback trains skill.", "משוב"),
        g("humility", "noun", "ענווה", "Humility becomes a conclusion.", "ענווה"),
      ],
      [
        q("When does intuition earn authority?", "מתי אינטואיציה זוכה לסמכות?", ["With experience alone", "With regular, unambiguous feedback", "With formal training", "With confidence"], ["מניסיון בלבד", "עם משוב סדיר וחד משמעי", "עם הכשרה פורמלית", "עם ביטחון"], 1, "כתוב 'domains that supply regular, unambiguous feedback'."),
        q("What does humility become, per the text?", "למה הופכת הענווה לפי הטקסט?", ["A virtue", "An empirical conclusion", "A strategy", "A weakness"], ["לסגולה", "למסקנה אמפירית", "לאסטרטגיה", "לחולשה"], 1, "כתוב 'humility becomes an empirical conclusion'."),
      ],
    ),
    R(
      "The Politics of Standards (הפוליטיקה של תקנים)",
      "Technical standards appear neutral precisely because their consequences are distributed slowly and unevenly, long after the committees disband. A decision about file formats or plug shapes quietly determines who can enter a market for decades. Firms understand this better than legislators, which is why standard-setting bodies attract disproportionate corporate attention. Treating such forums as merely administrative is therefore among the more consequential misreadings in contemporary governance.",
      "תקנים טכניים נראים ניטרליים דווקא משום שהשלכותיהם מתפזרות לאט ובאופן לא אחיד, זמן רב אחרי שהוועדות מתפרקות. החלטה על פורמטים של קבצים או על צורת תקעים קובעת בשקט מי יוכל להיכנס לשוק במשך עשורים. חברות מבינות זאת טוב יותר ממחוקקים, ולכן גופי התקינה מושכים תשומת לב תאגידית בלתי מידתית. התייחסות לפורומים כאלה כאל מנהליים בלבד היא אפוא אחת הקריאות השגויות בעלות ההשלכות הגדולות ביותר בממשל בן זמננו.",
      [
        g("standard", "noun", "תקן מוסכם", "Technical standards appear neutral.", "תקן"),
        g("disband", "verb", "להתפרק, לחדול מלהתקיים", "After the committees disband.", "להתפרק"),
        g("governance", "noun", "ממשל וניהול ציבורי", "Contemporary governance.", "ממשל"),
      ],
      [
        q("Why do standards appear neutral?", "למה תקנים נראים ניטרליים?", ["They are voluntary", "Their consequences appear slowly and unevenly", "They are technical", "Nobody reads them"], ["הם וולונטריים", "השלכותיהם מופיעות לאט ולא אחיד", "הם טכניים", "אף אחד לא קורא אותם"], 1, "כתוב 'distributed slowly and unevenly'."),
        q("Who understands their importance best?", "מי מבין את חשיבותם הכי טוב?", ["Legislators", "Firms", "Consumers", "Engineers"], ["מחוקקים", "חברות", "צרכנים", "מהנדסים"], 1, "כתוב 'Firms understand this better than legislators'."),
      ],
    ),
  ],
};

// --- LISTENING -------------------------------------------------------------
export const MORE_LISTENINGS9 = {
  A1: [
    L(
      "Good morning! My name is Dan. I work in a small shop near the station. I open the shop at eight and I close it at six.",
      "בוקר טוב! שמי דן. אני עובד בחנות קטנה ליד התחנה. אני פותח את החנות בשמונה וסוגר אותה בשש.",
      [
        q("Where does Dan work?", "איפה דן עובד?", ["In a school", "In a small shop", "At home", "In a hotel"], ["בבית ספר", "בחנות קטנה", "בבית", "במלון"], 1, "נאמר 'I work in a small shop'."),
        q("When does he close the shop?", "מתי הוא סוגר את החנות?", ["At five", "At six", "At seven", "At eight"], ["בחמש", "בשש", "בשבע", "בשמונה"], 1, "נאמר 'I close it at six'."),
      ],
    ),
    L(
      "Excuse me, is this seat free? Thank you. It is very hot today, so I want to sit near the window.",
      "סליחה, המושב הזה פנוי? תודה. היום מאוד חם, ולכן אני רוצה לשבת ליד החלון.",
      [
        q("What does the speaker ask?", "מה שואל הדובר?", ["For water", "If the seat is free", "For the time", "For help"], ["מים", "אם המושב פנוי", "מה השעה", "עזרה"], 1, "נאמר 'is this seat free?'."),
        q("Why does the speaker want to sit near the window?", "למה הדובר רוצה לשבת ליד החלון?", ["To read", "Because it is very hot", "To sleep", "To see friends"], ["כדי לקרוא", "כי מאוד חם", "כדי לישון", "כדי לראות חברים"], 1, "נאמר 'It is very hot today'."),
      ],
    ),
    L(
      "My little sister is six. She likes to draw with red and blue pens. Every evening she gives me a new picture.",
      "אחותי הקטנה בת שש. היא אוהבת לצייר בעטים אדומים וכחולים. כל ערב היא נותנת לי ציור חדש.",
      [
        q("How old is the sister?", "בת כמה האחות?", ["Four", "Six", "Eight", "Ten"], ["ארבע", "שש", "שמונה", "עשר"], 1, "נאמר 'My little sister is six'."),
        q("What does she give every evening?", "מה היא נותנת כל ערב?", ["A book", "A new picture", "A pen", "Food"], ["ספר", "ציור חדש", "עט", "אוכל"], 1, "נאמר 'she gives me a new picture'."),
      ],
    ),
    L(
      "It is raining, so we do not go to the park today. We stay at home and we play a game. Tomorrow the sun comes back.",
      "יורד גשם, ולכן אנחנו לא הולכים לפארק היום. אנחנו נשארים בבית ומשחקים משחק. מחר השמש חוזרת.",
      [
        q("Why do they stay at home?", "למה הם נשארים בבית?", ["It is cold", "It is raining", "They are sick", "It is late"], ["קר", "יורד גשם", "הם חולים", "מאוחר"], 1, "נאמר 'It is raining'."),
        q("What do they do at home?", "מה הם עושים בבית?", ["Sleep", "Play a game", "Cook", "Read"], ["ישנים", "משחקים משחק", "מבשלים", "קוראים"], 1, "נאמר 'we play a game'."),
      ],
    ),
  ],
  A2: [
    L(
      "I started running last winter, mostly because I wanted to sleep better. The first weeks were hard and I almost stopped. Now I run three times a week and I actually look forward to it.",
      "התחלתי לרוץ בחורף שעבר, בעיקר כי רציתי לישון טוב יותר. השבועות הראשונים היו קשים וכמעט הפסקתי. עכשיו אני רץ שלוש פעמים בשבוע ואני באמת מחכה לזה.",
      [
        q("Why did the speaker start running?", "למה הדובר התחיל לרוץ?", ["To lose weight", "To sleep better", "To meet people", "For a race"], ["כדי לרזות", "כדי לישון טוב יותר", "כדי לפגוש אנשים", "בשביל מרוץ"], 1, "נאמר 'I wanted to sleep better'."),
        q("How often does the speaker run now?", "כמה פעמים הדובר רץ עכשיו?", ["Once a week", "Three times a week", "Every day", "Twice a month"], ["פעם בשבוע", "שלוש פעמים בשבוע", "כל יום", "פעמיים בחודש"], 1, "נאמר 'three times a week'."),
      ],
    ),
    L(
      "Welcome to the museum. Photography is allowed, but please turn off the flash. The last rooms close half an hour before the main entrance.",
      "ברוכים הבאים למוזיאון. מותר לצלם, אבל נא לכבות את המבזק. החדרים האחרונים נסגרים חצי שעה לפני הכניסה הראשית.",
      [
        q("What is not allowed?", "מה אסור?", ["Photography", "Using the flash", "Bags", "Talking"], ["צילום", "שימוש במבזק", "תיקים", "דיבור"], 1, "נאמר 'please turn off the flash'."),
        q("When do the last rooms close?", "מתי נסגרים החדרים האחרונים?", ["At the same time", "Half an hour earlier", "An hour earlier", "Later"], ["באותו זמן", "חצי שעה קודם", "שעה קודם", "מאוחר יותר"], 1, "נאמר 'half an hour before the main entrance'."),
      ],
    ),
    L(
      "I ordered a jacket online and the wrong size arrived. I called the shop and they were very polite about it. A new one is coming on Thursday and I keep the old one until then.",
      "הזמנתי מעיל באינטרנט והגיעה המידה הלא נכונה. התקשרתי לחנות והם היו מאוד אדיבים בעניין. חדש מגיע ביום חמישי ואני שומר את הישן עד אז.",
      [
        q("What was the problem?", "מה הייתה הבעיה?", ["The wrong colour", "The wrong size", "A late delivery", "A high price"], ["צבע לא נכון", "מידה לא נכונה", "משלוח מאוחר", "מחיר גבוה"], 1, "נאמר 'the wrong size arrived'."),
        q("When is the new jacket coming?", "מתי מגיע המעיל החדש?", ["Tuesday", "Thursday", "Friday", "Sunday"], ["יום שלישי", "יום חמישי", "יום שישי", "יום ראשון"], 1, "נאמר 'coming on Thursday'."),
      ],
    ),
    L(
      "My neighbour leaves for work before six every morning, so the building is quiet after that. I used to find it strange, but now I like the early hours too.",
      "השכן שלי יוצא לעבודה לפני שש כל בוקר, ולכן הבניין שקט אחרי זה. פעם זה נראה לי מוזר, אבל עכשיו גם אני אוהב את השעות המוקדמות.",
      [
        q("When does the neighbour leave?", "מתי השכן יוצא?", ["After seven", "Before six", "At noon", "At night"], ["אחרי שבע", "לפני שש", "בצהריים", "בלילה"], 1, "נאמר 'before six every morning'."),
        q("How does the speaker feel now?", "איך מרגיש הדובר עכשיו?", ["Annoyed", "Likes the early hours", "Tired", "Worried"], ["מוטרד", "אוהב את השעות המוקדמות", "עייף", "מודאג"], 1, "נאמר 'now I like the early hours too'."),
      ],
    ),
  ],
  B1: [
    L(
      "We tried a four-day week for six months. Output stayed roughly the same, but meetings were cut in half because nobody had time to waste. The main complaint was that Mondays became noticeably heavier.",
      "ניסינו שבוע עבודה בן ארבעה ימים במשך שישה חודשים. התפוקה נשארה בערך זהה, אבל הפגישות קוצצו בחצי כי לאיש לא היה זמן לבזבז. התלונה העיקרית הייתה שימי שני נעשו כבדים בהרבה.",
      [
        q("What happened to output?", "מה קרה לתפוקה?", ["It fell sharply", "It stayed roughly the same", "It doubled", "It was not measured"], ["היא ירדה בחדות", "היא נשארה בערך זהה", "היא הוכפלה", "היא לא נמדדה"], 1, "נאמר 'Output stayed roughly the same'."),
        q("What was the main complaint?", "מה הייתה התלונה העיקרית?", ["Lower pay", "Heavier Mondays", "More meetings", "Longer days"], ["שכר נמוך יותר", "ימי שני כבדים יותר", "יותר פגישות", "ימים ארוכים יותר"], 1, "נאמר 'Mondays became noticeably heavier'."),
      ],
    ),
    L(
      "The library now lends tools as well as books. You can borrow a drill for three days at no cost, which makes sense when you consider how rarely most people use one. Membership numbers have grown ever since.",
      "הספרייה משאילה עכשיו גם כלי עבודה ולא רק ספרים. אפשר לשאול מקדחה לשלושה ימים בחינם, וזה הגיוני כשחושבים כמה נדיר שאנשים משתמשים בה. מספר המנויים גדל מאז.",
      [
        q("What can you borrow now?", "מה אפשר לשאול עכשיו?", ["Only books", "Tools as well as books", "Furniture", "Cars"], ["רק ספרים", "גם כלי עבודה וגם ספרים", "רהיטים", "מכוניות"], 1, "נאמר 'lends tools as well as books'."),
        q("What happened to membership?", "מה קרה למספר המנויים?", ["It fell", "It has grown", "It stayed flat", "It is unknown"], ["הוא ירד", "הוא גדל", "הוא נשאר יציב", "לא ידוע"], 1, "נאמר 'Membership numbers have grown'."),
      ],
    ),
    L(
      "I kept a spending diary for one month, writing down every purchase. Nothing about my income changed, yet I spent nearly a fifth less. Apparently the act of recording is itself a kind of brake.",
      "ניהלתי יומן הוצאות במשך חודש אחד, וכתבתי כל קנייה. שום דבר בהכנסה שלי לא השתנה, ובכל זאת הוצאתי כמעט חמישית פחות. כנראה שעצם התיעוד הוא סוג של בלם.",
      [
        q("What did the speaker do for a month?", "מה עשה הדובר במשך חודש?", ["Stopped shopping", "Wrote down every purchase", "Saved a fixed sum", "Used only cash"], ["הפסיק לקנות", "כתב כל קנייה", "חסך סכום קבוע", "השתמש רק במזומן"], 1, "נאמר 'writing down every purchase'."),
        q("What was the result?", "מה הייתה התוצאה?", ["Higher income", "Nearly a fifth less spending", "No change", "More debt"], ["הכנסה גבוהה יותר", "כמעט חמישית פחות הוצאות", "אין שינוי", "יותר חובות"], 1, "נאמר 'I spent nearly a fifth less'."),
      ],
    ),
    L(
      "Our school replaced homework with twenty minutes of reading at home. Test results did not improve immediately, but after two years the reading scores were clearly ahead of the district average.",
      "בית הספר שלנו החליף שיעורי בית בעשרים דקות של קריאה בבית. תוצאות המבחנים לא השתפרו מיד, אבל אחרי שנתיים ציוני הקריאה היו גבוהים בבירור מהממוצע האזורי.",
      [
        q("What replaced homework?", "מה החליף את שיעורי הבית?", ["Extra lessons", "Twenty minutes of reading", "Group projects", "Nothing"], ["שיעורים נוספים", "עשרים דקות קריאה", "עבודות קבוצתיות", "כלום"], 1, "נאמר 'twenty minutes of reading at home'."),
        q("When did the effect appear?", "מתי הופיעה ההשפעה?", ["Immediately", "After two years", "After one term", "It never did"], ["מיד", "אחרי שנתיים", "אחרי סמסטר", "מעולם לא"], 1, "נאמר 'after two years'."),
      ],
    ),
  ],
  B2: [
    L(
      "The trial compared two teaching methods across eleven schools. The difference in outcomes was small but consistent, which matters more than a single dramatic result. Crucially, the cheaper method performed just as well, so the policy recommendation was straightforward.",
      "הניסוי השווה בין שתי שיטות הוראה באחד עשר בתי ספר. ההפרש בתוצאות היה קטן אך עקבי, וזה חשוב יותר מתוצאה דרמטית בודדת. חשוב מכך, השיטה הזולה יותר הניבה תוצאות זהות, ולכן המלצת המדיניות הייתה פשוטה.",
      [
        q("What was notable about the difference?", "מה היה בולט בהפרש?", ["It was dramatic", "It was small but consistent", "It disappeared", "It was negative"], ["הוא היה דרמטי", "הוא היה קטן אך עקבי", "הוא נעלם", "הוא היה שלילי"], 1, "נאמר 'small but consistent'."),
        q("Why was the recommendation straightforward?", "למה ההמלצה הייתה פשוטה?", ["Only one school took part", "The cheaper method performed just as well", "Results were dramatic", "Costs were equal"], ["רק בית ספר אחד השתתף", "השיטה הזולה הניבה תוצאות זהות", "התוצאות היו דרמטיות", "העלויות היו שוות"], 1, "נאמר 'the cheaper method performed just as well'."),
      ],
    ),
    L(
      "We rewrote the terms of service in plain language and the number of support calls fell by a third. Legal review took longer than the writing itself, because every simplification had to survive scrutiny. It was worth it, but nobody should pretend it was quick.",
      "כתבנו מחדש את תנאי השימוש בשפה פשוטה ומספר פניות התמיכה ירד בשליש. הבדיקה המשפטית ארכה יותר מהכתיבה עצמה, כי כל פישוט היה צריך לעמוד בבחינה. זה היה שווה את זה, אבל שאיש לא יעמיד פנים שזה היה מהיר.",
      [
        q("What was the measurable effect?", "מה הייתה ההשפעה הנמדדת?", ["More sign-ups", "Support calls fell by a third", "Fewer refunds", "Higher prices"], ["יותר הרשמות", "פניות התמיכה ירדו בשליש", "פחות החזרים", "מחירים גבוהים יותר"], 1, "נאמר 'support calls fell by a third'."),
        q("What took the longest?", "מה ארך הכי הרבה זמן?", ["The writing", "The legal review", "The design", "The testing"], ["הכתיבה", "הבדיקה המשפטית", "העיצוב", "הבדיקות"], 1, "נאמר 'Legal review took longer than the writing itself'."),
      ],
    ),
    L(
      "Remote hiring widened our candidate pool enormously, but it also exposed how much of our old process depended on informal signals. We had to define, for the first time, what we were actually assessing. That turned out to be the real benefit.",
      "גיוס מרחוק הרחיב מאוד את מאגר המועמדים שלנו, אבל הוא גם חשף עד כמה התהליך הישן שלנו הסתמך על אותות בלתי פורמליים. נאלצנו להגדיר, בפעם הראשונה, מה בעצם אנחנו מעריכים. זה התברר כתועלת האמיתית.",
      [
        q("What did remote hiring expose?", "מה חשף הגיוס מרחוק?", ["Weak candidates", "Reliance on informal signals", "High costs", "Slow interviews"], ["מועמדים חלשים", "הסתמכות על אותות בלתי פורמליים", "עלויות גבוהות", "ראיונות איטיים"], 1, "נאמר 'depended on informal signals'."),
        q("What was the real benefit?", "מה הייתה התועלת האמיתית?", ["A bigger pool", "Defining what was being assessed", "Lower costs", "Faster hiring"], ["מאגר גדול יותר", "הגדרת מה נבחן", "עלויות נמוכות יותר", "גיוס מהיר יותר"], 1, "נאמר 'define what we were actually assessing'."),
      ],
    ),
    L(
      "The council published the raw data alongside its conclusions, which is still unusual. Two independent groups reanalysed it and reached slightly different estimates, yet the direction of the finding held. Transparency did not settle the argument; it improved it.",
      "המועצה פרסמה את הנתונים הגולמיים לצד המסקנות, וזה עדיין דבר לא שגרתי. שתי קבוצות עצמאיות ניתחו אותם מחדש והגיעו להערכות שונות במקצת, אך כיוון הממצא נותר בעינו. השקיפות לא סיימה את הוויכוח; היא שיפרה אותו.",
      [
        q("What was unusual about the publication?", "מה היה לא שגרתי בפרסום?", ["It was late", "The raw data was included", "It was short", "It was anonymous"], ["הוא איחר", "הנתונים הגולמיים נכללו", "הוא היה קצר", "הוא היה אנונימי"], 1, "נאמר 'published the raw data alongside its conclusions'."),
        q("What did transparency do to the argument?", "מה עשתה השקיפות לוויכוח?", ["Ended it", "Improved it", "Hid it", "Delayed it"], ["סיימה אותו", "שיפרה אותו", "הסתירה אותו", "עיכבה אותו"], 1, "נאמר 'it improved it'."),
      ],
    ),
  ],
  C1: [
    L(
      "The committee's remit was narrow, yet its recommendations reshaped procurement across the whole sector. That happens more often than people assume: a technical body sets a default, and the default outlives every argument that produced it.",
      "סמכות הוועדה הייתה צרה, ובכל זאת המלצותיה עיצבו מחדש את הרכש בכל המגזר. זה קורה יותר משמקובל לחשוב: גוף טכני קובע ברירת מחדל, וברירת המחדל שורדת את כל הוויכוחים שהולידו אותה.",
      [
        q("What was the committee's remit?", "מה הייתה סמכות הוועדה?", ["Very broad", "Narrow", "Undefined", "Temporary"], ["רחבה מאוד", "צרה", "לא מוגדרת", "זמנית"], 1, "נאמר 'The committee's remit was narrow'."),
        q("What outlives the arguments?", "מה שורד את הוויכוחים?", ["The committee", "The default it sets", "The budget", "The report"], ["הוועדה", "ברירת המחדל שהיא קובעת", "התקציב", "הדוח"], 1, "נאמר 'the default outlives every argument'."),
      ],
    ),
    L(
      "What struck me about the exhibition was the curator's restraint. Almost nothing was explained, and the labels gave only dates. Visitors were left to do the interpretive work themselves, which some found frustrating and others found unusually respectful.",
      "מה שהרשים אותי בתערוכה היה האיפוק של האוצר. כמעט שום דבר לא הוסבר, והתוויות נתנו רק תאריכים. המבקרים נותרו לעשות את עבודת הפרשנות בעצמם, מה שחלקם מצאו מתסכל ואחרים מצאו מכבד באופן חריג.",
      [
        q("What characterised the curator's approach?", "מה איפיין את גישת האוצר?", ["Detailed explanation", "Restraint", "Loud design", "Chronology"], ["הסבר מפורט", "איפוק", "עיצוב רועש", "כרונולוגיה"], 1, "נאמר 'the curator's restraint'."),
        q("How did visitors react?", "איך הגיבו המבקרים?", ["All were pleased", "Reactions were divided", "All complained", "Nobody noticed"], ["כולם היו מרוצים", "התגובות היו חלוקות", "כולם התלוננו", "איש לא שם לב"], 1, "נאמר 'some found frustrating and others found respectful'."),
      ],
    ),
    L(
      "Peer review is often defended as a filter, but it functions better as a conversation. Reviewers rarely detect fraud; what they do reliably is force an author to state assumptions that would otherwise stay implicit.",
      "ביקורת עמיתים מוגנת לרוב כמסננת, אך היא מתפקדת טוב יותר כשיחה. מבקרים כמעט אף פעם אינם מגלים הונאה; מה שהם עושים באופן אמין הוא לאלץ מחבר לנסח הנחות שאחרת היו נשארות מרומזות.",
      [
        q("How is peer review usually defended?", "איך בדרך כלל מגנים על ביקורת עמיתים?", ["As a conversation", "As a filter", "As a formality", "As a ranking"], ["כשיחה", "כמסננת", "כפורמליות", "כדירוג"], 1, "נאמר 'defended as a filter'."),
        q("What do reviewers reliably do?", "מה מבקרים עושים באופן אמין?", ["Detect fraud", "Force assumptions to be stated", "Improve style", "Shorten papers"], ["מגלים הונאה", "מאלצים לנסח הנחות", "משפרים סגנון", "מקצרים מאמרים"], 1, "נאמר 'force an author to state assumptions'."),
      ],
    ),
    L(
      "The restoration took eleven years, largely because the team refused to guess. Where evidence for the original colour was missing, they left the surface deliberately blank rather than inventing a plausible answer.",
      "השימור נמשך אחת עשרה שנים, בעיקר משום שהצוות סירב לנחש. במקומות שבהם חסרו עדויות לצבע המקורי, הם השאירו את המשטח ריק במכוון במקום להמציא תשובה סבירה.",
      [
        q("Why did the restoration take so long?", "למה השימור ארך זמן רב כל כך?", ["Lack of funding", "The team refused to guess", "Bad weather", "Legal disputes"], ["מחסור במימון", "הצוות סירב לנחש", "מזג אוויר רע", "סכסוכים משפטיים"], 1, "נאמר 'the team refused to guess'."),
        q("What did they do where evidence was missing?", "מה הם עשו במקום שבו חסרו עדויות?", ["Guessed the colour", "Left the surface blank", "Copied another work", "Used modern paint"], ["ניחשו את הצבע", "השאירו את המשטח ריק", "העתיקו יצירה אחרת", "השתמשו בצבע מודרני"], 1, "נאמר 'they left the surface deliberately blank'."),
      ],
    ),
  ],
  C2: [
    L(
      "The paper's argument is elegant but rests on a sample that cannot bear it. Once you restrict the analysis to comparable institutions, the effect shrinks to something indistinguishable from noise — which the authors, to their credit, concede in a footnote.",
      "הטיעון של המאמר אלגנטי אך נשען על מדגם שאינו יכול לשאת אותו. ברגע שמצמצמים את הניתוח למוסדות בני השוואה, האפקט מצטמצם למשהו שאינו ניתן להבחנה מרעש — דבר שהמחברים, לזכותם, מודים בו בהערת שוליים.",
      [
        q("What is the problem with the paper?", "מה הבעיה במאמר?", ["Poor writing", "The sample cannot support the argument", "Old data", "No conclusion"], ["כתיבה גרועה", "המדגם אינו תומך בטיעון", "נתונים ישנים", "אין מסקנה"], 1, "נאמר 'rests on a sample that cannot bear it'."),
        q("Where do the authors concede this?", "היכן המחברים מודים בכך?", ["In the abstract", "In a footnote", "In the title", "Nowhere"], ["בתקציר", "בהערת שוליים", "בכותרת", "בשום מקום"], 1, "נאמר 'concede in a footnote'."),
      ],
    ),
    L(
      "What is remarkable is not that the policy failed but that its failure was predicted, in print, by three separate analysts before it began. Institutions absorb such warnings without acting on them, which suggests the problem is structural rather than informational.",
      "מה שראוי לציון אינו שהמדיניות נכשלה אלא שכישלונה נחזה, בדפוס, על ידי שלושה אנליסטים נפרדים לפני שהחלה. מוסדות סופגים אזהרות כאלה בלי לפעול לפיהן, מה שמרמז שהבעיה מבנית ולא בעיה של מידע.",
      [
        q("What is described as remarkable?", "מה מתואר כראוי לציון?", ["The failure itself", "That the failure was predicted in advance", "The cost", "The speed"], ["הכישלון עצמו", "שהכישלון נחזה מראש", "העלות", "המהירות"], 1, "נאמר 'its failure was predicted'."),
        q("What does this suggest about the problem?", "מה זה מרמז על הבעיה?", ["It is informational", "It is structural", "It is temporary", "It is personal"], ["היא בעיה של מידע", "היא מבנית", "היא זמנית", "היא אישית"], 1, "נאמר 'structural rather than informational'."),
      ],
    ),
    L(
      "Her prose resists quotation, which is a compliment. The effect accumulates across paragraphs rather than concentrating in a line, so any extract inevitably misrepresents the whole.",
      "הפרוזה שלה מתנגדת לציטוט, וזו מחמאה. האפקט מצטבר לאורך פסקאות במקום להתרכז בשורה אחת, ולכן כל קטע מצוטט מעוות בהכרח את השלם.",
      [
        q("Why does her prose resist quotation?", "למה הפרוזה שלה מתנגדת לציטוט?", ["It is obscure", "The effect accumulates across paragraphs", "It is too long", "It is translated"], ["היא סתומה", "האפקט מצטבר לאורך פסקאות", "היא ארוכה מדי", "היא מתורגמת"], 1, "נאמר 'accumulates across paragraphs'."),
        q("How is the resistance to quotation meant?", "כיצד נתפסת ההתנגדות לציטוט?", ["As criticism", "As a compliment", "As neutral", "As a warning"], ["כביקורת", "כמחמאה", "כניטרלי", "כאזהרה"], 1, "נאמר 'which is a compliment'."),
      ],
    ),
    L(
      "The treaty survived because it was vague in exactly the right places. Every party could report a victory domestically, and the ambiguities were left to be litigated slowly, by which time the relationship itself had changed.",
      "האמנה שרדה משום שהייתה עמומה בדיוק במקומות הנכונים. כל צד יכול היה לדווח על ניצחון בבית, והעמימויות נותרו להתברר לאט, ועד אז מערכת היחסים עצמה כבר השתנתה.",
      [
        q("Why did the treaty survive?", "למה האמנה שרדה?", ["It was very detailed", "It was vague in the right places", "It was short", "It was secret"], ["היא הייתה מפורטת מאוד", "היא הייתה עמומה במקומות הנכונים", "היא הייתה קצרה", "היא הייתה חשאית"], 1, "נאמר 'vague in exactly the right places'."),
        q("What happened to the ambiguities?", "מה קרה לעמימויות?", ["They were removed", "They were litigated slowly", "They were published", "They were ignored forever"], ["הן הוסרו", "הן התבררו לאט", "הן פורסמו", "הן זכו להתעלמות לנצח"], 1, "נאמר 'left to be litigated slowly'."),
      ],
    ),
  ],
};

// --- SPEAKING --------------------------------------------------------------
export const MORE_SPEAKING9 = {
  A1: [
    { text: "I have breakfast at seven.", translation: "אני אוכל ארוחת בוקר בשבע." },
    { text: "The market is near my house.", translation: "השוק ליד הבית שלי." },
    { text: "Please take an umbrella today.", translation: "בבקשה קח מטרייה היום." },
    { text: "My shoes are wet.", translation: "הנעליים שלי רטובות." },
  ],
  A2: [
    { text: "Could you tell me where the bench is?", translation: "תוכל להגיד לי איפה הספסל?" },
    { text: "I would like to pay in cash, please.", translation: "אני רוצה לשלם במזומן, בבקשה." },
    { text: "My colleague will call you tomorrow.", translation: "העמית שלי לעבודה יתקשר אליך מחר." },
    { text: "The deadline is on Friday morning.", translation: "המועד האחרון הוא ביום שישי בבוקר." },
  ],
  B1: [
    { text: "I need to concentrate before the meeting.", translation: "אני צריך להתרכז לפני הפגישה." },
    { text: "We reached a compromise that works for everyone.", translation: "הגענו לפשרה שמתאימה לכולם." },
    { text: "That is not a convenient time for me.", translation: "זו לא שעה נוחה בשבילי." },
    { text: "I was completely exhausted after the trip.", translation: "הייתי מותש לגמרי אחרי הטיול." },
  ],
  B2: [
    { text: "Let me condense the report into one page.", translation: "אתמצת את הדוח לעמוד אחד." },
    { text: "The delay will disrupt the whole schedule.", translation: "העיכוב ישבש את כל לוח הזמנים." },
    { text: "I would rather not equate price with quality.", translation: "אני מעדיף לא להשוות בין מחיר לאיכות." },
    { text: "We should cultivate a habit of asking questions.", translation: "כדאי לנו לטפח הרגל של שאילת שאלות." },
  ],
  C1: [
    { text: "Quick action averted a much larger problem.", translation: "פעולה מהירה מנעה בעיה גדולה בהרבה." },
    { text: "I cannot condone that kind of behaviour.", translation: "אני לא יכול להשלים עם התנהגות כזאת." },
    { text: "Budget limits constrain what we can promise.", translation: "מגבלות תקציב מגבילות את מה שנוכל להבטיח." },
    { text: "The two arguments converge on the same point.", translation: "שני הטיעונים מתכנסים לאותה נקודה." },
  ],
  C2: [
    { text: "Let us not conflate the two questions.", translation: "בואו לא נערבב בין שתי השאלות." },
    { text: "The proposal is bereft of any real detail.", translation: "ההצעה נטולת כל פירוט אמיתי." },
    { text: "That point is not germane to our decision.", translation: "הנקודה הזאת אינה רלוונטית להחלטה שלנו." },
    { text: "She delivered the verdict with unusual gravitas.", translation: "היא מסרה את פסק הדין בכובד ראש חריג." },
  ],
};
