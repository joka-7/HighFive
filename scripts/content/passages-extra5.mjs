// Round 5 of additional Reading, Listening and Speaking content.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

export const MORE_READINGS5 = {
  A1: [
    R("The Bus to School (האוטובוס לבית הספר)",
      "Every morning I take the bus to school. The bus comes at eight. My friend Noa sits next to me. We talk and look out the window. School starts at half past eight.",
      "כל בוקר אני נוסע לבית הספר באוטובוס. האוטובוס מגיע בשמונה. החברה שלי נועה יושבת לידי. אנחנו מדברים ומסתכלים מהחלון. הלימודים מתחילים בשמונה וחצי.",
      [g("morning", "noun", "תחילת היום", "Every morning.", "בוקר"), g("next to", "phrase", "ליד", "Sit next to me.", "ליד/לצד"), g("start", "verb", "להתחיל", "School starts.", "מתחיל")],
      [q("When does the bus come?", "מתי מגיע האוטובוס?", ["At seven", "At eight", "At nine", "At ten"], ["בשבע", "בשמונה", "בתשע", "בעשר"], 1, "'The bus comes at eight'."), q("Who sits next to the writer?", "מי יושב ליד הכותב?", ["The teacher", "Noa", "The driver", "No one"], ["המורה", "נועה", "הנהג", "אף אחד"], 1, "'My friend Noa sits next to me'.")]),
    R("A Rainy Afternoon (אחר צהריים גשום)",
      "It is raining today. I cannot go to the park. So I stay home with my brother. We play a game and then we draw. Later, Mom makes hot soup. It is a nice day after all.",
      "היום יורד גשם. אני לא יכול ללכת לפארק. אז אני נשאר בבית עם אחי. אנחנו משחקים במשחק ואחר כך מציירים. מאוחר יותר אמא מכינה מרק חם. בסך הכול, זה יום נחמד.",
      [g("raining", "verb", "יורד גשם", "It is raining.", "יורד גשם"), g("stay", "verb", "להישאר", "Stay home.", "להישאר"), g("soup", "noun", "מרק", "Hot soup.", "מרק")],
      [q("Why does the child stay home?", "למה הילד נשאר בבית?", ["It is hot", "It is raining", "It is late", "It is a holiday"], ["חם", "יורד גשם", "מאוחר", "יש חג"], 1, "'It is raining today'."), q("What does Mom make?", "מה אמא מכינה?", ["Cake", "Hot soup", "Bread", "Tea"], ["עוגה", "מרק חם", "לחם", "תה"], 1, "'Mom makes hot soup'.")]),
  ],
  A2: [
    R("A Surprise Party (מסיבת הפתעה)",
      "We planned a surprise party for my father's fiftieth birthday. It was hard to keep the secret! When he came home and everyone shouted 'Surprise!', his face was priceless. He said it was the best birthday of his life.",
      "תכננו מסיבת הפתעה ליום ההולדת החמישים של אבא שלי. היה קשה לשמור את הסוד! כשהוא הגיע הביתה וכולם צעקו \"הפתעה!\", ההבעה על הפנים שלו הייתה שווה הכול. הוא אמר שזה היה יום ההולדת הכי טוב בחייו.",
      [g("surprise", "noun", "הפתעה", "A nice surprise.", "הפתעה"), g("secret", "noun", "סוד", "Keep the secret.", "סוד"), g("priceless", "adjective", "שאין לו מחיר, יקר מאוד", "A priceless look.", "שאין לו מחיר")],
      [q("What was the party for?", "לכבוד מה הייתה המסיבה?", ["A wedding", "A 50th birthday", "A new job", "A holiday"], ["חתונה", "יום הולדת 50", "עבודה חדשה", "חג"], 1, "'my father's fiftieth birthday'."), q("What was hard to do?", "מה היה קשה לעשות?", ["Cook", "Keep the secret", "Invite people", "Find a place"], ["לבשל", "לשמור את הסוד", "להזמין אנשים", "למצוא מקום"], 1, "'hard to keep the secret'.")]),
    R("Learning to Drive (ללמוד לנהוג)",
      "I am learning to drive. At first I was scared of the busy roads. My instructor is calm and explains everything twice. Last week I drove on the highway for the first time. I was nervous, but I did it!",
      "אני לומד לנהוג. בהתחלה פחדתי מהכבישים העמוסים. המורה שלי לנהיגה רגוע ומסביר כל דבר פעמיים. בשבוע שעבר נהגתי בכביש מהיר בפעם הראשונה. הייתי לחוץ, אבל הצלחתי!",
      [g("scared", "adjective", "מפוחד", "I was scared.", "מפוחד"), g("instructor", "noun", "מדריך", "A driving instructor.", "מדריך"), g("highway", "noun", "כביש מהיר", "On the highway.", "כביש מהיר")],
      [q("What was the writer scared of?", "ממה הכותב פחד?", ["The instructor", "Busy roads", "The car", "The test"], ["מהמורה לנהיגה", "מכבישים עמוסים", "מהמכונית", "מהמבחן"], 1, "'scared of the busy roads'."), q("What happened last week?", "מה קרה בשבוע שעבר?", ["Failed a test", "Drove on the highway", "Bought a car", "Quit"], ["נכשל במבחן", "נהג בכביש מהיר", "קנה מכונית", "ויתר"], 1, "'I drove on the highway for the first time'.")]),
  ],
  B1: [
    R("Borrowing, Not Buying (לשאול, לא לקנות)",
      "Last year I needed a drill for one small job. Instead of buying one, I borrowed it from a neighbour. That led to a 'tool library' in our street, where people share things they rarely use. We save money and meet each other — two problems solved at once.",
      "בשנה שעברה הייתי צריך מקדחה לעבודה קטנה אחת. במקום לקנות, שאלתי אחת מהשכן. זה הוביל להקמת \"ספריית כלים\" ברחוב שלנו, שבה אנשים חולקים דברים שהם משתמשים בהם רק לעיתים רחוקות. אנחנו חוסכים כסף ומכירים זה את זה — שתי בעיות נפתרו בבת אחת.",
      [g("drill", "noun", "מקדחה", "An electric drill.", "מקדחה"), g("borrow", "verb", "לשאול לזמן מה", "Borrow a book.", "לשאול"), g("share", "verb", "לחלוק", "Share the cost.", "לחלוק")],
      [q("What did the writer do instead of buying a drill?", "מה עשה הכותב במקום לקנות מקדחה?", ["Rented one", "Borrowed from a neighbour", "Did without", "Made one"], ["שכר אחת", "שאל מהשכן", "הסתדר בלי", "בנה אחת"], 1, "'I borrowed it from a neighbour'."), q("What did this lead to?", "למה זה הוביל?", ["A shop", "A tool library", "An argument", "A class"], ["לחנות", "לספריית כלים", "לוויכוח", "לשיעור"], 1, "'a tool library in our street'.")]),
    R("The Long Way Home (הדרך הארוכה הביתה)",
      "Most days I take the quick route home, head down, thinking about work. One evening I chose the longer path through the park. I noticed a small bookshop I'd passed a hundred times without seeing. Slowing down, it turns out, is its own kind of arriving.",
      "ברוב הימים אני הולך הביתה בדרך המהירה, עם הראש למטה, וחושב על העבודה. ערב אחד בחרתי בשביל הארוך יותר דרך הפארק. הבחנתי בחנות ספרים קטנה שעברתי לידה מאה פעמים בלי לראות אותה. מסתבר שהאטה היא סוג של הגעה בפני עצמה.",
      [g("route", "noun", "מסלול, דרך", "The quick route.", "מסלול"), g("path", "noun", "שביל", "A garden path.", "שביל"), g("noticed", "verb", "הבחין", "I noticed it.", "הבחין")],
      [q("What did the writer usually do on the way home?", "מה הכותב עשה בדרך כלל בדרך הביתה?", ["Walk slowly", "Take the quick route, thinking of work", "Take the bus", "Visit shops"], ["הלך לאט", "הלך בדרך המהירה וחשב על העבודה", "נסע באוטובוס", "ביקר בחנויות"], 1, "'the quick route home, head down, thinking about work'."), q("What did slowing down let the writer do?", "מה ההאטה אפשרה לכותב לעשות?", ["Save time", "Notice a bookshop", "Meet a friend", "Avoid rain"], ["לחסוך זמן", "להבחין בחנות ספרים", "לפגוש חבר", "להימנע מהגשם"], 1, "'noticed a small bookshop'.")]),
  ],
  B2: [
    R("The Illusion of Busyness (אשליית העומס)",
      "Being busy has become a badge of honour, a way of signalling importance. Yet busyness and productivity are not the same; one can be frantically occupied and achieve very little. The harder, less glamorous skill is to protect unhurried time for the few things that genuinely move the needle.",
      "להיות עסוק הפך לאות כבוד, לדרך לאותת על חשיבות. אבל עומס ופרודוקטיביות אינם אותו דבר; אפשר להיות עסוק בקדחתנות ולהשיג מעט מאוד. המיומנות הקשה יותר, והפחות זוהרת, היא לשמור על זמן נינוח עבור הדברים המעטים שבאמת עושים את ההבדל.",
      [g("badge", "noun", "תג, סמל", "A badge of honour.", "תג/סמל"), g("frantically", "adverb", "בטירוף, בקדחתנות", "Frantically busy.", "בקדחתנות"), g("unhurried", "adjective", "ללא חיפזון, נינוח", "Unhurried time.", "ללא חיפזון")],
      [q("What has being busy become?", "״להיות עסוק״ הפך ל…?", ["A problem", "A badge of honour", "Rare", "Illegal"], ["לבעיה", "לאות כבוד", "לדבר נדיר", "לדבר לא חוקי"], 1, "'a badge of honour'."), q("What is the 'harder skill'?", "מהי \"המיומנות הקשה יותר\"?", ["Doing more", "Protecting unhurried time for what matters", "Looking busy", "Working faster"], ["לעשות יותר", "לשמור על זמן נינוח למה שחשוב", "להיראות עסוק", "לעבוד מהר יותר"], 1, "'protect unhurried time for the few things'.")]),
    R("Strong Opinions, Loosely Held (דעות נחרצות, אחיזה רופפת)",
      "A useful principle for thinking is to hold strong opinions but loosely. Commit firmly enough to act and to test your ideas, yet stay willing to drop them the moment better evidence appears. The trap at both extremes is real: endless doubt paralyses, while rigid certainty blinds.",
      "עיקרון שימושי לחשיבה הוא להחזיק בדעות נחרצות, אבל באחיזה רופפת. התחייבו מספיק כדי לפעול ולבחון את הרעיונות שלכם, אבל היו מוכנים לוותר עליהם ברגע שמופיעות ראיות טובות יותר. המלכודת בשני הקצוות אמיתית: ספק אינסופי משתק, ואילו ודאות נוקשה מעוורת.",
      [g("principle", "noun", "עיקרון", "A guiding principle.", "עיקרון"), g("commit", "verb", "להתחייב", "Commit to it.", "להתחייב"), g("rigid", "adjective", "נוקשה", "Rigid rules.", "נוקשה")],
      [q("What does the principle recommend?", "מה ממליץ העיקרון?", ["No opinions", "Strong opinions, loosely held", "Permanent doubt", "Fixed beliefs"], ["לא להחזיק בדעות", "דעות נחרצות באחיזה רופפת", "ספק תמידי", "אמונות קבועות"], 1, "'hold strong opinions but loosely'."), q("What does rigid certainty do?", "מה עושה ודאות נוקשה?", ["Helps act", "Blinds", "Paralyses", "Nothing"], ["עוזרת לפעול", "מעוורת", "משתקת", "כלום"], 1, "'rigid certainty blinds'.")]),
  ],
  C1: [
    R("The Paradox of Documentation (פרדוקס התיעוד)",
      "We photograph experiences to remember them, yet a growing body of evidence suggests the camera can become a substitute for attention rather than an aid to it. Filming the concert, we half-miss the concert. The record we create of a moment is sometimes purchased with the very presence that made the moment worth recording.",
      "אנחנו מצלמים חוויות כדי לזכור אותן, אך גוף הולך וגדל של ראיות מרמז שהמצלמה עלולה להפוך לתחליף לתשומת לב במקום לעזר לה. כשאנחנו מצלמים את ההופעה, אנחנו מחמיצים אותה למחצה. התיעוד שאנו יוצרים לרגע נקנה לעיתים במחיר הנוכחות עצמה שהפכה את הרגע לראוי לתיעוד.",
      [g("substitute", "noun", "תחליף", "A poor substitute.", "תחליף"), g("aid", "noun", "עזר, סיוע", "A memory aid.", "עזר/סיוע"), g("presence", "noun", "נוכחות", "Full presence.", "נוכחות")],
      [q("What can the camera become, per the text?", "למה עלולה המצלמה להפוך, לפי הטקסט?", ["An aid to memory", "A substitute for attention", "A toy", "A burden"], ["לעזר לזיכרון", "לתחליף לתשומת לב", "לצעצוע", "לנטל"], 1, "'a substitute for attention'."), q("What is the record sometimes 'purchased with'?", "במה התיעוד \"נקנה\" לעיתים?", ["Money", "The presence that made the moment worth recording", "Time", "Skill"], ["בכסף", "בנוכחות שהפכה את הרגע לראוי לתיעוד", "בזמן", "במיומנות"], 1, "'the very presence that made the moment worth recording'.")]),
    R("Chesterton's Fence (הגדר של צ'סטרטון)",
      "Encountering a fence across a road, the impatient reformer says, 'It's useless — remove it.' The wiser reply is: 'If you don't see its use, I won't let you remove it; go and find out why it's there.' Many traditions look absurd until you understand the problem they were quietly solving.",
      "כשהוא נתקל בגדר החוסמת דרך, הרפורמטור חסר הסבלנות אומר: \"היא חסרת תועלת — הסירו אותה.\" התשובה הנבונה יותר היא: \"אם אינך רואה את התועלת שבה, לא אתן לך להסיר אותה; לך וברר מדוע היא שם.\" מסורות רבות נראות אבסורדיות עד שמבינים איזו בעיה הן פתרו בשקט.",
      [g("encountering", "verb", "נתקל ב-", "Encountering a problem.", "נתקל ב-"), g("reformer", "noun", "מתקן, רפורמטור", "An eager reformer.", "מתקן/רפורמטור"), g("absurd", "adjective", "אבסורדי, חסר היגיון", "It seems absurd.", "אבסורדי")],
      [q("What does the impatient reformer want to do?", "מה רוצה הרפורמטור חסר הסבלנות לעשות?", ["Study the fence", "Remove the useless fence", "Build a fence", "Paint it"], ["לחקור את הגדר", "להסיר את הגדר חסרת התועלת", "לבנות גדר", "לצבוע אותה"], 1, "'It's useless — remove it'."), q("What is the wiser approach?", "מהי הגישה הנבונה יותר?", ["Remove it fast", "Find out why it's there first", "Ignore it", "Copy it"], ["להסיר אותה מהר", "לברר קודם מדוע היא שם", "להתעלם ממנה", "להעתיק אותה"], 1, "'go and find out why it's there'.")]),
  ],
  C2: [
    R("The Eloquence of Restraint (רהיטות שבריסון)",
      "There is a kind of power available only to those willing not to use all of it. The writer who resists the dazzling word, the speaker who leaves the cutting retort unsaid, the negotiator who declines the small victory — each trades momentary effect for a quieter, more durable authority. Restraint, paradoxically, can be the loudest statement of all.",
      "יש סוג של כוח שזמין רק למי שמוכן שלא להשתמש בכולו. הכותב שעומד בפיתוי של המילה המסנוורת, הדובר שמשאיר את התשובה העוקצנית בלתי נאמרת, מנהל המשא ומתן שמוותר על הניצחון הקטן — כל אחד מהם מחליף אפקט רגעי בסמכות שקטה ועמידה יותר. האיפוק, באופן פרדוקסלי, יכול להיות ההצהרה הרועמת מכולן.",
      [g("dazzling", "adjective", "מסנוור, מרהיב", "A dazzling display.", "מסנוור/מרהיב"), g("retort", "noun", "תשובה עוקצנית", "A sharp retort.", "תשובה עוקצנית"), g("durable", "adjective", "בר-קיימא, עמיד", "Durable authority.", "בר-קיימא")],
      [q("Who has this 'kind of power'?", "למי יש \"סוג הכוח\" הזה?", ["Those who use all of it", "Those willing not to use all of it", "The loudest", "The richest"], ["למי שמשתמש בכולו", "למי שמוכן שלא להשתמש בכולו", "לקולניים ביותר", "לעשירים ביותר"], 1, "'available only to those willing not to use all of it'."), q("What does restraint trade momentary effect for?", "תמורת מה מחליף האיפוק את האפקט הרגעי?", ["Nothing", "Quieter, more durable authority", "Money", "Fame"], ["תמורת כלום", "תמורת סמכות שקטה ועמידה יותר", "תמורת כסף", "תמורת תהילה"], 1, "'a quieter, more durable authority'.")]),
    R("Maps of the Self (מפות העצמי)",
      "The labels we accept for ourselves — shy, ambitious, a 'numbers person' — begin as rough descriptions and quietly harden into walls. We then live down to them, declining opportunities on the grounds that they aren't 'us'. The self is far more provisional than the noun we use to name it; identity is a verb wearing the costume of a fact.",
      "התוויות שאנו מקבלים על עצמנו — ביישן, שאפתן, \"איש של מספרים\" — מתחילות כתיאורים גסים ובשקט מתקשות לכדי חומות. אז אנחנו מצמצמים את עצמנו כדי להתאים להן, ודוחים הזדמנויות בטענה שהן \"לא אנחנו\". העצמי זמני הרבה יותר משם העצם שבו אנו מכנים אותו; הזהות היא פועל העוטה תחפושת של עובדה.",
      [g("harden", "verb", "להתקשות, להפוך לקשיח", "Attitudes harden.", "להתקשות"), g("provisional", "adjective", "זמני, בלתי סופי", "A provisional self.", "זמני"), g("costume", "noun", "תחפושת", "Wearing a costume.", "תחפושת")],
      [q("What do self-labels harden into?", "לכדי מה מתקשות התוויות העצמיות?", ["Maps", "Walls", "Verbs", "Costumes"], ["למפות", "לחומות", "לפעלים", "לתחפושות"], 1, "'quietly harden into walls'."), q("How does the writer reframe identity?", "כיצד הכותב ממסגר מחדש את הזהות?", ["A fixed fact", "A verb wearing the costume of a fact", "A label", "A noun"], ["עובדה קבועה", "פועל העוטה תחפושת של עובדה", "תווית", "שם עצם"], 1, "'identity is a verb wearing the costume of a fact'.")]),
  ],
};

export const MORE_LISTENINGS5 = {
  A1: [
    L("Hello! My name is Lily. I am six years old. I have a red bike and I like to ride it in the park.",
      "שלום! קוראים לי לילי. אני בת שש. יש לי אופניים אדומים ואני אוהבת לרכוב עליהם בפארק.",
      [q("How old is Lily?", "בת כמה לילי?", ["Five", "Six", "Seven", "Eight"], ["חמש", "שש", "שבע", "שמונה"], 1, "'I am six years old'."), q("What does Lily like to ride?", "על מה לילי אוהבת לרכוב?", ["A bus", "A red bike", "A horse", "A train"], ["על אוטובוס", "על אופניים אדומים", "על סוס", "על רכבת"], 1, "'a red bike and I like to ride it'.")]),
    L("Good night, everyone. It is late now. Please turn off the lights. We will see the stars tomorrow.",
      "לילה טוב לכולם. עכשיו כבר מאוחר. בבקשה כבו את האורות. נראה את הכוכבים מחר.",
      [q("What time of day is it?", "איזה חלק של היום עכשיו?", ["Morning", "Night", "Evening", "Afternoon"], ["בוקר", "לילה", "ערב", "אחר הצהריים"], 1, "'Good night... It is late now'."), q("What should people turn off?", "מה צריך לכבות?", ["The TV", "The lights", "The radio", "The computer"], ["את הטלוויזיה", "את האורות", "את הרדיו", "את המחשב"], 1, "'turn off the lights'.")]),
  ],
  A2: [
    L("Hi, this is the school office. Tomorrow's trip is cancelled because of the rain. Normal classes will take place instead.",
      "שלום, כאן מזכירות בית הספר. הטיול של מחר בוטל בגלל הגשם. במקום זה יתקיימו שיעורים רגילים.",
      [q("Why is the trip cancelled?", "למה הטיול בוטל?", ["No bus", "Because of the rain", "A holiday", "No teachers"], ["אין אוטובוס", "בגלל הגשם", "יש חג", "אין מורים"], 1, "'cancelled because of the rain'."), q("What will happen instead?", "מה יקרה במקום?", ["A day off", "Normal classes", "A different trip", "An exam"], ["יום חופש", "שיעורים רגילים", "טיול אחר", "מבחן"], 1, "'Normal classes will take place'.")]),
    L("Welcome to the museum. Please note that you can take photos, but food and drink are not allowed in the galleries.",
      "ברוכים הבאים למוזיאון. שימו לב: מותר לצלם, אבל אסור להכניס אוכל ושתייה לאולמות התצוגה.",
      [q("What is allowed?", "מה מותר?", ["Nothing", "Taking photos", "Eating", "Drinking"], ["שום דבר", "לצלם", "לאכול", "לשתות"], 1, "'you can take photos'."), q("What is NOT allowed in the galleries?", "מה אסור באולמות התצוגה?", ["Photos", "Food and drink", "Talking", "Walking"], ["צילומים", "אוכל ושתייה", "לדבר", "ללכת"], 1, "'food and drink are not allowed'.")]),
  ],
  B1: [
    L("Hi, it's the vet's office. Bella's test results are back and everything looks normal. You can pick up her medication any time before six.",
      "שלום, כאן מרפאת הווטרינר. תוצאות הבדיקות של בלה הגיעו והכול נראה תקין. אפשר לאסוף את התרופות שלה בכל שעה עד שש.",
      [q("Whose results are these?", "של מי התוצאות האלה?", ["The caller's", "Bella's (a pet)", "A child's", "No one's"], ["של המתקשר", "של בלה (חיית מחמד)", "של ילד", "של אף אחד"], 1, "'Bella's test results are back'."), q("What are the results?", "מהן התוצאות?", ["Worrying", "Everything looks normal", "Unclear", "Delayed"], ["מדאיגות", "הכול נראה תקין", "לא ברורות", "מתעכבות"], 1, "'everything looks normal'.")]),
    L("Quick announcement: the lift is being serviced this morning, so please use the stairs. It should be working again by lunchtime. Thanks for your patience.",
      "הודעה קצרה: המעלית עוברת טיפול הבוקר, אז בבקשה השתמשו במדרגות. היא אמורה לחזור לפעול עד הצהריים. תודה על הסבלנות.",
      [q("Why use the stairs?", "למה להשתמש במדרגות?", ["A fire drill", "The lift is being serviced", "It's faster", "The lift is full"], ["תרגיל כיבוי אש", "המעלית עוברת טיפול", "זה מהיר יותר", "המעלית מלאה"], 1, "'the lift is being serviced this morning'."), q("When should the lift work again?", "מתי המעלית אמורה לפעול שוב?", ["Tomorrow", "By lunchtime", "Next week", "Never"], ["מחר", "עד הצהריים", "בשבוע הבא", "אף פעם"], 1, "'working again by lunchtime'.")]),
  ],
  B2: [
    L("Let me set expectations honestly. This first version won't have every feature you asked for. We chose to ship something solid and small rather than something big and shaky, and we'll add the rest based on what you actually use.",
      "אני רוצה לתאם ציפיות בכנות. הגרסה הראשונה הזו לא תכלול את כל הפיצ'רים שביקשתם. בחרנו להשיק משהו יציב וקטן ולא משהו גדול ורעוע, ואת השאר נוסיף לפי מה שאתם באמת משתמשים בו.",
      [q("What won't the first version have?", "מה לא יהיה בגרסה הראשונה?", ["Any features", "Every requested feature", "A design", "Users"], ["שום פיצ'ר", "כל פיצ'ר שהתבקש", "עיצוב", "משתמשים"], 1, "'won't have every feature you asked for'."), q("What was the team's choice?", "מה הייתה הבחירה של הצוות?", ["Big and shaky", "Solid and small", "Fast and cheap", "Late and full"], ["גדול ורעוע", "יציב וקטן", "מהיר וזול", "מאוחר ומלא"], 1, "'solid and small rather than... big and shaky'.")]),
    L("One clarification on the policy: remote work is fully supported, but we do ask that everyone is reachable during core hours, roughly ten to three, so meetings don't become impossible to schedule.",
      "הבהרה אחת לגבי המדיניות: עבודה מרחוק נתמכת באופן מלא, אבל אנחנו מבקשים שכולם יהיו זמינים בשעות הליבה, בערך מעשר עד שלוש, כדי שלא יהיה בלתי אפשרי לקבוע פגישות.",
      [q("What is the policy on remote work?", "מהי המדיניות לגבי עבודה מרחוק?", ["Banned", "Fully supported with core hours", "Mandatory", "Discouraged"], ["אסורה", "נתמכת באופן מלא, עם שעות ליבה", "חובה", "לא מומלצת"], 1, "'remote work is fully supported, but... core hours'."), q("What are the core hours?", "מהן שעות הליבה?", ["9 to 5", "Roughly 10 to 3", "8 to 4", "All day"], ["9 עד 5", "בערך 10 עד 3", "8 עד 4", "כל היום"], 1, "'core hours, roughly ten to three'.")]),
  ],
  C1: [
    L("I'd offer one reframing. We keep asking why engagement dropped, as if the old numbers were the natural baseline. But those numbers were inflated by a novelty that was always going to fade. The question isn't why it fell, but what a healthy, sustainable level actually looks like.",
      "אני מציע מסגור אחר. אנחנו ממשיכים לשאול למה המעורבות ירדה, כאילו המספרים הישנים היו קו הבסיס הטבעי. אבל המספרים האלה היו מנופחים בגלל אפקט חידוש שממילא היה עתיד לדעוך. השאלה אינה למה היא ירדה, אלא איך נראית בפועל רמה בריאה ובת קיימא.",
      [q("What assumption does the speaker question?", "באיזו הנחה הדובר מטיל ספק?", ["That engagement matters", "That the old numbers were the natural baseline", "That novelty lasts", "That data is real"], ["שהמעורבות חשובה", "שהמספרים הישנים היו קו הבסיס הטבעי", "שהחידוש נמשך", "שהנתונים אמיתיים"], 1, "'as if the old numbers were the natural baseline'."), q("What is the better question?", "מהי השאלה הטובה יותר?", ["Why it fell", "What a healthy sustainable level looks like", "Who is to blame", "When it started"], ["למה היא ירדה", "איך נראית רמה בריאה ובת קיימא", "מי אשם", "מתי זה התחיל"], 1, "'what a healthy, sustainable level actually looks like'.")]),
    L("I want to be fair to the critics. Their objection isn't unreasonable; it's just aimed at a version of the proposal we abandoned weeks ago. We should update them rather than dismiss them.",
      "אני רוצה להיות הוגן כלפי המבקרים. ההתנגדות שלהם אינה בלתי סבירה; היא פשוט מכוונת לגרסה של ההצעה שנטשנו לפני שבועות. עלינו לעדכן אותם ולא לבטל אותם.",
      [q("How does the speaker treat the critics?", "איך הדובר מתייחס למבקרים?", ["Dismisses them", "Wants to be fair and update them", "Mocks them", "Ignores them"], ["מבטל אותם", "רוצה להיות הוגן ולעדכן אותם", "לועג להם", "מתעלם מהם"], 1, "'I want to be fair to the critics'."), q("What is the problem with their objection?", "מה הבעיה בהתנגדות שלהם?", ["It's unreasonable", "It targets an abandoned version", "It's too late", "It's rude"], ["היא לא סבירה", "היא מכוונת לגרסה שננטשה", "היא מאוחרת מדי", "היא גסה"], 1, "'aimed at a version of the proposal we abandoned'.")]),
  ],
  C2: [
    L("Permit me a note of skepticism. The case studies are compelling, but they're also self-selected: we hear from the ventures that survived to tell the tale, never from the identical strategies that quietly sank. Survivorship is doing more persuading here than the argument is.",
      "הרשו לי להביע מעט ספקנות. מקרי הבוחן משכנעים, אבל הם גם מדגם מוטה: אנחנו שומעים מהמיזמים ששרדו כדי לספר את הסיפור, ואף פעם לא מהאסטרטגיות הזהות שטבעו בשקט. הטיית השורדים משכנעת כאן יותר מהטיעון עצמו.",
      [q("What is the speaker skeptical about?", "לגבי מה הדובר ספקן?", ["The data quality", "Self-selected, survivor case studies", "The speakers", "The cost"], ["איכות הנתונים", "מקרי בוחן של שורדים, במדגם מוטה", "הדוברים", "העלות"], 1, "'self-selected: we hear from the ventures that survived'."), q("What is 'doing more persuading'?", "מה \"משכנע יותר\"?", ["The argument", "Survivorship", "The visuals", "The numbers"], ["הטיעון", "הטיית השורדים", "החומרים החזותיים", "המספרים"], 1, "'Survivorship is doing more persuading here than the argument'.")]),
    L("I'd gently dismantle the dichotomy we've been assuming. It needn't be tradition versus progress; the most enduring institutions tend to be precisely those that conserve a core while continuously reforming at the edges.",
      "הייתי מפרק בעדינות את הדיכוטומיה שהנחנו עד עכשיו. זה לא חייב להיות מסורת מול קדמה; המוסדות המחזיקים מעמד הכי הרבה זמן הם לרוב בדיוק אלה ששומרים על גרעין ובמקביל מתחדשים ללא הרף בשוליים.",
      [q("What 'dichotomy' does the speaker dismantle?", "איזו \"דיכוטומיה\" הדובר מפרק?", ["Cost vs speed", "Tradition versus progress", "Old vs young", "Local vs global"], ["עלות מול מהירות", "מסורת מול קדמה", "ישן מול צעיר", "מקומי מול גלובלי"], 1, "'tradition versus progress'."), q("What do the most enduring institutions do?", "מה עושים המוסדות העמידים ביותר?", ["Reject change", "Conserve a core while reforming at the edges", "Change everything", "Freeze"], ["דוחים שינוי", "שומרים על גרעין ומתחדשים בשוליים", "משנים הכול", "קופאים במקום"], 1, "'conserve a core while continuously reforming at the edges'.")]),
  ],
};

export const MORE_SPEAKING5 = {
  A1: [
    { text: "I live near the park.", translation: "אני גר ליד הפארק." },
    { text: "Can you say that again, please?", translation: "תוכל לומר את זה שוב, בבקשה?" },
    { text: "See you tomorrow morning.", translation: "נתראה מחר בבוקר." },
  ],
  A2: [
    { text: "I'm sorry, I didn't understand.", translation: "אני מצטער, לא הבנתי." },
    { text: "Could I have a glass of water?", translation: "אפשר כוס מים?" },
    { text: "We arrived a little early.", translation: "הגענו קצת מוקדם." },
  ],
  B1: [
    { text: "I'd be happy to help if you need anything.", translation: "אשמח לעזור אם תצטרך משהו." },
    { text: "Let's agree on a time that suits everyone.", translation: "בוא נסכים על זמן שמתאים לכולם." },
    { text: "I'm not sure that's the best approach.", translation: "אני לא בטוח שזו הגישה הטובה ביותר." },
  ],
  B2: [
    { text: "Let me play that back to make sure I understood.", translation: "תן לי לחזור על זה כדי לוודא שהבנתי." },
    { text: "I'd rather we addressed this sooner than later.", translation: "אני מעדיף שנטפל בזה מוקדם ולא מאוחר." },
    { text: "That's a valid concern; let's factor it in.", translation: "זו נקודה מוצדקת; בוא ניקח אותה בחשבון." },
  ],
  C1: [
    { text: "I'd be cautious about generalising from one example.", translation: "הייתי נזהר מהכללה על סמך דוגמה אחת." },
    { text: "On reflection, I think we moved too quickly.", translation: "במחשבה שנייה, אני חושב שמיהרנו מדי." },
    { text: "Let's keep our options open for now.", translation: "בוא נשאיר את האפשרויות פתוחות לעת עתה." },
  ],
  C2: [
    { text: "I'd resist drawing a firm conclusion from such thin evidence.", translation: "הייתי נמנע ממסקנה נחרצת על סמך ראיות כה דלות." },
    { text: "The point is well taken, though I'd qualify it slightly.", translation: "הנקודה מתקבלת, אם כי הייתי מסייג אותה מעט." },
    { text: "We risk solving the wrong problem rather elegantly.", translation: "אנחנו מסתכנים בכך שנפתור את הבעיה הלא נכונה בצורה אלגנטית." },
  ],
};
