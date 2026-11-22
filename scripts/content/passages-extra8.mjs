// Round 8 of additional Reading, Listening and Speaking content.
// Weighted to A1-B1. Merged into the data set by the generator.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

export const MORE_READINGS8 = {
  A1: [
    R("My School Bag (התיק שלי)",
      "I have a blue school bag. Inside there are books, pens and a small box for lunch. The bag is heavy on Mondays. I carry it on my back every day.",
      "יש לי תיק בית ספר כחול. בפנים יש ספרים, עטים וקופסה קטנה לארוחת הצהריים. התיק כבד בימי שני. אני נושא אותו על הגב כל יום.",
      [g("bag", "noun", "תיק", "A school bag.", "תיק"), g("heavy", "adjective", "כבד", "It is heavy.", "כבד"), g("carry", "verb", "לשאת, לסחוב", "I carry it.", "לשאת/לסחוב")],
      [
        q("What colour is the bag?", "באיזה צבע התיק?", ["Red", "Blue", "Green", "Black"], ["אדום", "כחול", "ירוק", "שחור"], 1, "'a blue school bag'."),
        q("When is the bag heavy?", "מתי התיק כבד?", ["On Fridays", "On Mondays", "On Sundays", "Every night"], ["בימי שישי", "בימי שני", "בימי ראשון", "כל ערב"], 1, "'heavy on Mondays'."),
      ]),
    R("The Little Red Ball (הכדור האדום הקטן)",
      "My dog Rex loves his little red ball. I throw it and he runs fast. He brings it back to me every time. We play in the garden until the sun goes down.",
      "הכלב שלי, רקס, אוהב את הכדור האדום הקטן שלו. אני זורק אותו והוא רץ מהר. הוא מחזיר לי אותו כל פעם. אנחנו משחקים בגינה עד שהשמש שוקעת.",
      [g("throw", "verb", "לזרוק", "I throw the ball.", "לזרוק"), g("fast", "adverb", "מהר", "He runs fast.", "מהר"), g("bring", "verb", "להביא", "He brings it back.", "להביא")],
      [
        q("What does Rex love?", "מה רקס אוהב?", ["A bone", "His little red ball", "A shoe", "Food"], ["עצם", "את הכדור האדום הקטן שלו", "נעל", "אוכל"], 1, "'his little red ball'."),
        q("Where do they play?", "איפה הם משחקים?", ["In the park", "In the garden", "Inside", "On the street"], ["בפארק", "בגינה", "בתוך הבית", "ברחוב"], 1, "'We play in the garden'."),
      ]),
    R("Brushing My Teeth (מצחצח שיניים)",
      "Every morning and every night I brush my teeth. I use a green toothbrush and white toothpaste. It takes two minutes. Clean teeth are healthy and strong.",
      "כל בוקר וכל ערב אני מצחצח שיניים. אני משתמש במברשת שיניים ירוקה ובמשחת שיניים לבנה. זה לוקח שתי דקות. שיניים נקיות הן בריאות וחזקות.",
      [g("brush", "verb", "לצחצח, להבריש", "Brush your teeth.", "לצחצח"), g("teeth", "noun", "שיניים", "Clean teeth.", "שיניים"), g("healthy", "adjective", "בריא", "Healthy teeth.", "בריא"), g("toothbrush", "noun", "מברשת שיניים", "A green toothbrush.", "מברשת שיניים"), g("toothpaste", "noun", "משחת שיניים", "White toothpaste.", "משחת שיניים")],
      [
        q("How often does the child brush?", "כמה פעמים הילד מצחצח שיניים?", ["Once a day", "Morning and night", "Once a week", "Never"], ["פעם ביום", "בבוקר ובערב", "פעם בשבוע", "אף פעם"], 1, "'Every morning and every night'."),
        q("How long does it take?", "כמה זמן זה לוקח?", ["One minute", "Two minutes", "Five minutes", "Ten minutes"], ["דקה אחת", "שתי דקות", "חמש דקות", "עשר דקות"], 1, "'It takes two minutes'."),
      ]),
    R("A Visit to the Farm (ביקור בחווה)",
      "On the farm we see cows, sheep and a brown horse. The farmer gives us fresh milk. I feed the chickens with corn. The farm smells of grass and animals.",
      "בחווה אנחנו רואים פרות, כבשים וסוס חום. החוואי נותן לנו חלב טרי. אני מאכיל את התרנגולות בתירס. בחווה יש ריח של דשא ושל בעלי חיים.",
      [g("farm", "noun", "חווה, משק", "On the farm.", "חווה/משק"), g("sheep", "noun", "כבשה/כבשים", "We see sheep.", "כבשה/כבשים"), g("feed", "verb", "להאכיל", "I feed the chickens.", "להאכיל"), g("fresh", "adjective", "טרי, חדש", "Fresh milk.", "טרי")],
      [
        q("What colour is the horse?", "באיזה צבע הסוס?", ["Black", "Brown", "White", "Grey"], ["שחור", "חום", "לבן", "אפור"], 1, "'a brown horse'."),
        q("What does the child feed the chickens?", "במה הילד מאכיל את התרנגולות?", ["Bread", "Corn", "Grass", "Milk"], ["בלחם", "בתירס", "בדשא", "בחלב"], 1, "'I feed the chickens with corn'."),
      ]),
    R("My Best Friend (החבר הכי טוב שלי)",
      "My best friend is Omar. We sit together at school and share our snacks. He is funny and makes me laugh. After school we ride our bikes home.",
      "החבר הכי טוב שלי הוא עומר. אנחנו יושבים יחד בבית הספר וחולקים את החטיפים שלנו. הוא מצחיק וגורם לי לצחוק. אחרי בית הספר אנחנו רוכבים על האופניים הביתה.",
      [g("share", "verb", "לחלוק", "We share snacks.", "לחלוק"), g("funny", "adjective", "מצחיק", "He is funny.", "מצחיק"), g("laugh", "verb", "לצחוק", "He makes me laugh.", "לצחוק")],
      [
        q("Who is the best friend?", "מי החבר הכי טוב?", ["Omar", "Rex", "Sam", "Ben"], ["עומר", "רקס", "סם", "בן"], 0, "'My best friend is Omar'."),
        q("What do they do after school?", "מה הם עושים אחרי בית הספר?", ["Study", "Ride their bikes home", "Watch TV", "Sleep"], ["לומדים", "רוכבים על האופניים הביתה", "רואים טלוויזיה", "ישנים"], 1, "'we ride our bikes home'."),
      ]),
  ],
  A2: [
    R("The Power Cut (הפסקת חשמל)",
      "Last night the power went out during a storm. The whole house was suddenly dark. We lit some candles and played cards together. Strangely, it became one of the nicest evenings we had had in months.",
      "אתמול בלילה החשמל נפל בזמן סערה. כל הבית נהיה פתאום חשוך. הדלקנו כמה נרות ושיחקנו יחד בקלפים. באופן מוזר, זה הפך לאחד הערבים הכי נעימים שהיו לנו מזה חודשים.",
      [g("power cut", "noun", "הפסקת חשמל", "A sudden power cut.", "הפסקת חשמל"), g("candle", "noun", "נר", "Light a candle.", "נר"), g("strangely", "adverb", "באופן מוזר", "Strangely nice.", "באופן מוזר")],
      [
        q("Why did the power go out?", "למה החשמל נפל?", ["A fault", "During a storm", "No reason", "Repairs"], ["תקלה", "בזמן סערה", "בלי סיבה", "תיקונים"], 1, "'the power went out during a storm'."),
        q("What did the family do?", "מה המשפחה עשתה?", ["Slept", "Lit candles and played cards", "Left the house", "Watched TV"], ["ישנה", "הדליקה נרות ושיחקה בקלפים", "יצאה מהבית", "צפתה בטלוויזיה"], 1, "'We lit some candles and played cards'."),
      ]),
    R("A Job Interview (ראיון עבודה)",
      "I had a job interview this morning. I wore my best shirt and arrived ten minutes early. The questions were hard, but I stayed calm and honest. They said they will call me next week.",
      "הבוקר היה לי ראיון עבודה. לבשתי את החולצה הכי טובה שלי והגעתי עשר דקות מוקדם. השאלות היו קשות, אבל נשארתי רגוע וכן. הם אמרו שיתקשרו אליי בשבוע הבא.",
      [g("interview", "noun", "ראיון", "A job interview.", "ראיון"), g("arrive", "verb", "להגיע", "I arrived early.", "להגיע"), g("honest", "adjective", "כן, ישר", "Calm and honest.", "כן/ישר")],
      [
        q("When did the writer arrive?", "מתי הכותב הגיע?", ["Late", "Ten minutes early", "On time", "An hour early"], ["באיחור", "עשר דקות מוקדם", "בזמן", "שעה מוקדם"], 1, "'arrived ten minutes early'."),
        q("When will they call?", "מתי הם יתקשרו?", ["Today", "Next week", "Never", "Tomorrow"], ["היום", "בשבוע הבא", "אף פעם", "מחר"], 1, "'they will call me next week'."),
      ]),
    R("Planting a Tree (שותלים עץ)",
      "On Saturday our class planted a tree in the schoolyard. We dug a hole, placed the young tree inside, and covered the roots with soil. The teacher said that one day it will give shade to other children.",
      "בשבת הכיתה שלנו שתלה עץ בחצר בית הספר. חפרנו בור, הכנסנו לתוכו את העץ הצעיר וכיסינו את השורשים באדמה. המורה אמרה שיום אחד הוא ייתן צל לילדים אחרים.",
      [g("plant", "verb", "לשתול", "Plant a tree.", "לשתול"), g("dig", "verb", "לחפור", "We dug a hole.", "לחפור"), g("shade", "noun", "צל", "Give shade.", "צל"), g("soil", "noun", "אדמה שבה צמחים גדלים", "Cover the roots with soil.", "אדמה")],
      [
        q("Where did they plant the tree?", "איפה הם שתלו את העץ?", ["In a park", "In the schoolyard", "At home", "In a field"], ["בפארק", "בחצר בית הספר", "בבית", "בשדה"], 1, "'planted a tree in the schoolyard'."),
        q("What will the tree give one day?", "מה העץ ייתן יום אחד?", ["Fruit", "Shade", "Flowers", "Wood"], ["פירות", "צל", "פרחים", "עצים להסקה"], 1, "'it will give shade to other children'."),
      ]),
    R("The Wrong Bus (האוטובוס הלא נכון)",
      "I was in a hurry and jumped on the first bus I saw. Ten minutes later I realised it was going the wrong way! I got off, crossed the road, and waited for the right one. I still made it on time.",
      "מיהרתי וקפצתי על האוטובוס הראשון שראיתי. אחרי עשר דקות הבנתי שהוא נוסע לכיוון הלא נכון! ירדתי, חציתי את הכביש וחיכיתי לאוטובוס הנכון. ובכל זאת הגעתי בזמן.",
      [g("hurry", "noun", "חיפזון, מהירות", "In a hurry.", "חיפזון"), g("realise", "verb", "להבין, לקלוט", "I realised my mistake.", "להבין/לקלוט"), g("cross", "verb", "לחצות", "Cross the road.", "לחצות")],
      [
        q("What mistake did the writer make?", "איזו טעות עשה הכותב?", ["Lost a ticket", "Took the wrong bus", "Missed the bus", "Forgot money"], ["איבד כרטיס", "עלה על האוטובוס הלא נכון", "פספס את האוטובוס", "שכח כסף"], 1, "'it was going the wrong way'."),
        q("Did the writer arrive on time?", "האם הכותב הגיע בזמן?", ["No", "Yes, still on time", "Very late", "Early"], ["לא", "כן, בכל זאת בזמן", "באיחור גדול", "מוקדם"], 1, "'I still made it on time'."),
      ]),
    R("A Gift for My Mother (מתנה לאמא שלי)",
      "My mother's birthday was coming, and I had little money. So I decided to make her a gift instead of buying one. I painted a picture of our house and wrote her a card. She said it was the best present ever.",
      "יום ההולדת של אמא שלי התקרב, והיה לי מעט כסף. אז החלטתי להכין לה מתנה במקום לקנות. ציירתי תמונה של הבית שלנו וכתבתי לה כרטיס ברכה. היא אמרה שזו המתנה הכי טובה שקיבלה אי פעם.",
      [g("gift", "noun", "מתנה", "A handmade gift.", "מתנה"), g("instead", "adverb", "במקום", "Make instead of buy.", "במקום"), g("present", "noun", "מתנה", "The best present.", "מתנה")],
      [
        q("Why did the writer make a gift?", "למה הכותב הכין מתנה?", ["For fun", "Had little money", "It was a rule", "By mistake"], ["בשביל הכיף", "היה לו מעט כסף", "זה היה כלל", "בטעות"], 1, "'I had little money'."),
        q("What did the writer make?", "מה הכין הכותב?", ["A cake", "A painting and a card", "A scarf", "A song"], ["עוגה", "ציור וכרטיס ברכה", "צעיף", "שיר"], 1, "'I painted a picture... and wrote her a card'."),
      ]),
  ],
  B1: [
    R("Cooking for One (לבשל לאחד)",
      "When I started living alone, cooking for just myself felt pointless. Gradually I learned to see it differently: a good meal is a way of caring for yourself. Now I light a candle, plate the food nicely, and enjoy my own company.",
      "כשהתחלתי לגור לבד, לבשל רק בשביל עצמי הרגיש חסר טעם. בהדרגה למדתי לראות את זה אחרת: ארוחה טובה היא דרך לדאוג לעצמך. היום אני מדליק נר, מגיש את האוכל יפה בצלחת ונהנה מהחברה של עצמי.",
      [g("pointless", "adjective", "חסר טעם, חסר תועלת", "It felt pointless.", "חסר טעם/חסר תועלת"), g("gradually", "adverb", "בהדרגה", "Gradually I learned.", "בהדרגה"), g("company", "noun", "חברה, נוכחות", "My own company.", "חברה/נוכחות")],
      [
        q("How did cooking for one feel at first?", "איך הרגיש הבישול לאדם אחד בהתחלה?", ["Fun", "Pointless", "Easy", "Exciting"], ["כיפי", "חסר טעם", "קל", "מרגש"], 1, "'cooking for just myself felt pointless'."),
        q("How does the writer see it now?", "איך הכותב רואה את זה עכשיו?", ["A chore", "A way of caring for yourself", "A waste", "A hobby only"], ["מטלה", "דרך לדאוג לעצמך", "בזבוז", "רק תחביב"], 1, "'a way of caring for yourself'."),
      ]),
    R("The Second-Hand Bookshop (חנות הספרים המשומשים)",
      "There is an old bookshop near my home where every book has already lived another life. I love finding notes in the margins left by strangers. Buying a used book feels like joining a quiet conversation that began long before me.",
      "ליד הבית שלי יש חנות ספרים ישנה שבה כל ספר כבר חי חיים אחרים. אני אוהב למצוא הערות בשוליים שהשאירו אנשים זרים. קניית ספר משומש מרגישה כמו הצטרפות לשיחה שקטה שהתחילה הרבה לפניי.",
      [g("second-hand", "adjective", "יד שנייה, משומש", "A second-hand book.", "יד שנייה/משומש"), g("margin", "noun", "שוליים", "Notes in the margins.", "שוליים"), g("stranger", "noun", "זר, אדם לא מוכר", "Left by strangers.", "זר")],
      [
        q("What does the writer love finding?", "מה הכותב אוהב למצוא?", ["New books", "Notes in the margins", "Cheap prices", "Maps"], ["ספרים חדשים", "הערות בשוליים", "מחירים זולים", "מפות"], 1, "'finding notes in the margins'."),
        q("Buying a used book feels like what?", "למה דומה קניית ספר משומש?", ["Wasting money", "Joining a quiet conversation", "A risk", "A chore"], ["לבזבוז כסף", "להצטרפות לשיחה שקטה", "לסיכון", "למטלה"], 1, "'joining a quiet conversation'."),
      ]),
    R("Walking the Dog at Dawn (מטייל עם הכלב עם שחר)",
      "My dog wakes me at five, whether I like it or not. At first I resented those early walks. Now I treasure them: the empty streets, the cool air, the city before it remembers to be busy. He gave me the mornings I never knew I wanted.",
      "הכלב שלי מעיר אותי בחמש, בין אם אני רוצה ובין אם לא. בהתחלה התמרמרתי על הטיולים המוקדמים האלה. היום אני מוקיר אותם: הרחובות הריקים, האוויר הקריר, העיר לפני שהיא נזכרת להיות עמוסה. הוא נתן לי את הבקרים שלא ידעתי שאני רוצה.",
      [g("dawn", "noun", "שחר, עלות השחר", "Walk at dawn.", "שחר"), g("resent", "verb", "לכעוס על, להתמרמר", "I resented it.", "להתמרמר על"), g("treasure", "verb", "להוקיר, לאהוב מאוד", "I treasure them.", "להוקיר")],
      [
        q("When does the dog wake the writer?", "מתי הכלב מעיר את הכותב?", ["At seven", "At five", "At noon", "At dawn-plus"], ["בשבע", "בחמש", "בצהריים", "קצת אחרי עלות השחר"], 1, "'wakes me at five'."),
        q("How does the writer feel about the walks now?", "מה הכותב מרגיש כלפי הטיולים עכשיו?", ["Annoyed", "Treasures them", "Bored", "Tired"], ["מתעצבן", "מוקיר אותם", "משועמם", "עייף"], 1, "'Now I treasure them'."),
      ]),
    R("Learning an Instrument as an Adult (ללמוד נגינה בגיל מבוגר)",
      "I started learning the piano at forty. My fingers are slow and my progress is humbling. But there is a special freedom in being a beginner again, with nothing to prove and everything to discover. I play badly, and I love it.",
      "התחלתי ללמוד פסנתר בגיל ארבעים. האצבעות שלי איטיות וההתקדמות שלי מלמדת אותי ענווה. אבל יש חופש מיוחד בלהיות שוב מתחיל, בלי שום דבר להוכיח ועם הכול לגלות. אני מנגן רע, ואני אוהב את זה.",
      [g("instrument", "noun", "כלי נגינה", "Learn an instrument.", "כלי נגינה"), g("humbling", "adjective", "מצניע, מלמד ענווה", "A humbling progress.", "מצניע/מלמד ענווה"), g("beginner", "noun", "מתחיל", "A beginner again.", "מתחיל")],
      [
        q("When did the writer start the piano?", "מתי הכותב התחיל לנגן בפסנתר?", ["At twenty", "At forty", "As a child", "At sixty"], ["בגיל עשרים", "בגיל ארבעים", "בילדות", "בגיל שישים"], 1, "'started learning the piano at forty'."),
        q("What is special about being a beginner?", "מה מיוחד בלהיות מתחיל?", ["It is fast", "Freedom, with nothing to prove", "It is easy", "It is cheap"], ["זה מהיר", "חופש, בלי שום דבר להוכיח", "זה קל", "זה זול"], 1, "'nothing to prove and everything to discover'."),
      ]),
    R("Turning Off Notifications (לכבות את ההתראות)",
      "My phone used to buzz every few minutes, pulling my attention in all directions. One day I turned off almost every notification. The silence was strange at first, then wonderful. I check things when I choose to now — not when a screen demands it.",
      "הטלפון שלי היה רוטט כל כמה דקות ומושך את תשומת הלב שלי לכל הכיוונים. יום אחד כיביתי כמעט את כל ההתראות. השקט היה מוזר בהתחלה, ואחר כך נפלא. היום אני בודק דברים כשאני בוחר לעשות זאת — לא כשמסך דורש זאת.",
      [g("notification", "noun", "התראה, הודעה", "Turn off notifications.", "התראה"), g("buzz", "verb", "לזמזם, לרטוט", "The phone buzzed.", "לזמזם/לרטוט"), g("demand", "verb", "לדרוש", "The screen demands it.", "לדרוש")],
      [
        q("What did the phone used to do?", "מה הטלפון היה עושה?", ["Stay silent", "Buzz every few minutes", "Switch off", "Ring loudly"], ["נשאר שקט", "רוטט כל כמה דקות", "נכבה", "מצלצל בקול רם"], 1, "'buzz every few minutes'."),
        q("How does the writer check things now?", "איך הכותב בודק דברים עכשיו?", ["Constantly", "When they choose to", "Never", "Every minute"], ["כל הזמן", "כשהוא בוחר לעשות זאת", "אף פעם", "כל דקה"], 1, "'I check things when I choose to now'."),
      ]),
  ],
  B2: [
    R("The Trap of Comparison (מלכודת ההשוואה)",
      "Social media offers an endless stream of other people's highlights, against which our ordinary days look dull. But we are comparing our backstage to everyone else's polished stage. The contest is rigged from the start, and the only winning move is to stop playing.",
      "הרשתות החברתיות מציעות זרם אינסופי של רגעי השיא של אנשים אחרים, ולעומתם הימים הרגילים שלנו נראים משעממים. אבל אנחנו משווים את מאחורי הקלעים שלנו לבמה המלוטשת של כל השאר. התחרות מכורה מההתחלה, והמהלך המנצח היחיד הוא להפסיק לשחק.",
      [g("highlight", "noun", "רגע שיא, נקודת אור", "Other people's highlights.", "רגע שיא"), g("polished", "adjective", "מלוטש, מהוקצע", "A polished stage.", "מלוטש"), g("rigged", "adjective", "מכור, מסודר מראש", "The contest is rigged.", "מכור/מסודר מראש")],
      [
        q("What do we compare, per the text?", "מה אנחנו משווים, לפי הטקסט?", ["Two stages", "Our backstage to others' polished stage", "Incomes", "Photos only"], ["שתי במות", "את מאחורי הקלעים שלנו לבמה המלוטשת של אחרים", "הכנסות", "רק תמונות"], 1, "'comparing our backstage to everyone else's polished stage'."),
        q("What is the 'only winning move'?", "מהו ״המהלך המנצח היחיד״?", ["Win the contest", "Stop playing", "Post more", "Compare harder"], ["לנצח בתחרות", "להפסיק לשחק", "לפרסם יותר", "להשוות יותר"], 1, "'the only winning move is to stop playing'."),
      ]),
    R("Why Deadlines Help (למה מועדי יעד עוזרים)",
      "We resent deadlines, yet a task without one tends to expand to fill all available time, or never to end at all. A firm date forces the hundred small decisions that 'someday' endlessly postpones. The constraint we resist is often the structure we secretly need.",
      "אנחנו שונאים מועדים אחרונים, ובכל זאת משימה בלי מועד אחרון נוטה להתרחב ולמלא את כל הזמן הפנוי, או לא להסתיים בכלל. תאריך קבוע מכריח אותנו לקבל את מאה ההחלטות הקטנות ש״מתישהו״ דוחה בלי סוף. המגבלה שאנחנו מתנגדים לה היא לעיתים קרובות המבנה שאנחנו זקוקים לו בסתר.",
      [g("deadline", "noun", "מועד אחרון, דדליין", "A firm deadline.", "מועד אחרון/דדליין"), g("expand", "verb", "להתרחב, להתפשט", "Work expands.", "להתרחב"), g("postpone", "verb", "לדחות", "Someday postpones it.", "לדחות")],
      [
        q("What happens to a task without a deadline?", "מה קורה למשימה בלי מועד אחרון?", ["It ends fast", "It expands or never ends", "It improves", "It shrinks"], ["היא מסתיימת מהר", "היא מתרחבת או לא מסתיימת לעולם", "היא משתפרת", "היא מתכווצת"], 1, "'expand to fill all available time, or never to end'."),
        q("How is a deadline reframed?", "איך מוצג המועד האחרון באור חדש?", ["A burden", "The structure we secretly need", "A trick", "A waste"], ["כנטל", "כמבנה שאנחנו זקוקים לו בסתר", "כתרגיל", "כבזבוז"], 1, "'the structure we secretly need'."),
      ]),
    R("The Skill of Listening (אומנות ההקשבה)",
      "Most of us listen only to find the gap where we can insert our own reply. Real listening is rarer and harder: holding your response in suspension long enough to actually understand the other person. Done well, it can feel to the speaker like being seen for the first time.",
      "רובנו מקשיבים רק כדי למצוא את הפער שבו נוכל להכניס את התגובה שלנו. הקשבה אמיתית נדירה וקשה יותר: להשהות את התגובה שלך מספיק זמן כדי באמת להבין את האדם השני. כשעושים זאת היטב, הדובר יכול להרגיש כאילו רואים אותו בפעם הראשונה.",
      [g("insert", "verb", "להכניס, לשבץ", "Insert a reply.", "להכניס/לשבץ"), g("suspension", "noun", "השהיה, דחייה", "Hold in suspension.", "השהיה"), g("rarer", "adjective", "נדיר יותר", "Rarer and harder.", "נדיר יותר")],
      [
        q("What do most people listen for?", "למה רוב האנשים מקשיבים?", ["Understanding", "A gap to insert their reply", "Facts", "Mistakes"], ["להבנה", "לפער שבו יוכלו להכניס את התגובה שלהם", "לעובדות", "לטעויות"], 1, "'find the gap where we can insert our own reply'."),
        q("What can real listening feel like to the speaker?", "איך הקשבה אמיתית יכולה להרגיש לדובר?", ["Boring", "Being seen for the first time", "A test", "An attack"], ["משעממת", "כאילו רואים אותו בפעם הראשונה", "כמו מבחן", "כמו התקפה"], 1, "'like being seen for the first time'."),
      ]),
  ],
  C1: [
    R("Loss Aversion (סלידה מהפסד)",
      "Experiments show that losing ten dollars hurts roughly twice as much as gaining ten dollars pleases. This asymmetry quietly steers our choices, making us cling to what we have and shy away from worthwhile risks. Understanding the bias does not remove it, but it can loosen its grip.",
      "ניסויים מראים שהפסד של עשרה דולרים כואב בערך פי שניים ממה שרווח של עשרה דולרים משמח. חוסר הסימטריה הזה מכוון בשקט את הבחירות שלנו, גורם לנו להיאחז במה שיש לנו ולהירתע מסיכונים שכדאי לקחת. הבנת ההטיה אינה מעלימה אותה, אבל היא יכולה לרופף את אחיזתה.",
      [g("aversion", "noun", "סלידה, רתיעה", "Loss aversion.", "סלידה/רתיעה"), g("asymmetry", "noun", "אי-סימטריה, חוסר איזון", "This asymmetry.", "אי-סימטריה"), g("cling", "verb", "להיאחז, להיצמד", "Cling to what we have.", "להיאחז")],
      [
        q("How much more does a loss hurt than a gain pleases?", "בכמה הפסד כואב יותר ממה שרווח משמח?", ["The same", "Roughly twice as much", "Half as much", "Ten times"], ["באותה מידה", "בערך פי שניים", "חצי", "פי עשרה"], 1, "'twice as much as gaining ten dollars pleases'."),
        q("What does understanding the bias do?", "מה עושה ההבנה של ההטיה?", ["Removes it", "Can loosen its grip", "Makes it worse", "Nothing"], ["מעלימה אותה", "יכולה לרופף את אחיזתה", "מחמירה אותה", "כלום"], 1, "'it can loosen its grip'."),
      ]),
    R("The Pareto Principle (עקרון פארטו)",
      "In many systems, roughly eighty percent of results flow from twenty percent of causes — a fifth of customers, of effort, of code. The insight is not the exact numbers but the shape: contributions are rarely equal. Find the vital few, and you can often let the trivial many wait.",
      "במערכות רבות, בערך שמונים אחוז מהתוצאות נובעים מעשרים אחוז מהגורמים — חמישית מהלקוחות, מהמאמץ, מהקוד. התובנה אינה המספרים המדויקים אלא הצורה: התרומות כמעט אף פעם אינן שוות. מצאו את המעטים החיוניים, ולעיתים קרובות תוכלו לתת לרבים הזניחים לחכות.",
      [g("flow from", "phrase", "לנבוע מ-", "Results flow from causes.", "לנבוע מ-"), g("vital", "adjective", "חיוני, מכריע", "The vital few.", "חיוני/מכריע"), g("trivial", "adjective", "זניח, שולי", "The trivial many.", "זניח/שולי")],
      [
        q("What does the principle claim?", "מה טוען העיקרון?", ["All causes are equal", "~80% of results from ~20% of causes", "Effort wasted", "Nothing matters"], ["כל הגורמים שווים", "כ-80% מהתוצאות נובעים מכ-20% מהגורמים", "מאמץ מתבזבז", "שום דבר לא משנה"], 1, "'eighty percent of results flow from twenty percent of causes'."),
        q("What is the real insight?", "מהי התובנה האמיתית?", ["The exact numbers", "Contributions are rarely equal", "Work harder", "Count everything"], ["המספרים המדויקים", "התרומות כמעט אף פעם אינן שוות", "לעבוד קשה יותר", "לספור הכול"], 1, "'not the exact numbers but the shape'."),
      ]),
    R("Confirmation Bias (הטיית האישור)",
      "Once we hold a belief, we unconsciously hunt for evidence that supports it and explain away whatever does not. The mind behaves less like a scientist testing a theory than a lawyer defending a client. Genuine thinking begins only when we deliberately seek the case against ourselves.",
      "ברגע שאנחנו מחזיקים באמונה מסוימת, אנחנו מחפשים באופן לא מודע ראיות שתומכות בה ומתרצים את כל מה שלא. המוח מתנהג פחות כמו מדען שבודק תיאוריה ויותר כמו עורך דין שמגן על לקוח. חשיבה אמיתית מתחילה רק כשאנחנו מחפשים במכוון את הטיעונים נגדנו.",
      [g("unconsciously", "adverb", "באופן לא מודע", "We unconsciously hunt.", "באופן לא מודע"), g("explain away", "phrase", "לתרץ, להסביר ולבטל", "Explain away the rest.", "לתרץ/להסביר ולבטל"), g("deliberately", "adverb", "במכוון, בכוונה", "Deliberately seek.", "במכוון")],
      [
        q("What does the mind hunt for, per the text?", "מה המוח מחפש, לפי הטקסט?", ["The truth", "Evidence that supports our belief", "New ideas", "Nothing"], ["את האמת", "ראיות שתומכות באמונה שלנו", "רעיונות חדשים", "כלום"], 1, "'hunt for evidence that supports it'."),
        q("When does genuine thinking begin?", "מתי מתחילה חשיבה אמיתית?", ["Right away", "When we seek the case against ourselves", "Never", "With more data"], ["מיד", "כשאנחנו מחפשים את הטיעונים נגדנו", "אף פעם", "עם יותר נתונים"], 1, "'when we deliberately seek the case against ourselves'."),
      ]),
  ],
  C2: [
    R("Epistemic Humility (ענווה אפיסטמית)",
      "The more deeply one studies almost any field, the more vividly its frontier of ignorance comes into view; expertise expands the perimeter of the known and, with it, the awareness of all that borders it. The confident pronouncements tend to come from the foothills, not the summit.",
      "ככל שלומדים לעומק כמעט כל תחום, כך מתגלה ביתר חדות גבול הבורות שלו; המומחיות מרחיבה את היקף הידוע, ויחד איתו את המודעות לכל מה שגובל בו. ההצהרות הבטוחות בעצמן נוטות להגיע מהגבעות שלמרגלות ההר, לא מהפסגה.",
      [g("epistemic", "adjective", "הקשור לידע ולהכרה", "Epistemic humility.", "אפיסטמי/הקשור לידע"), g("frontier", "noun", "גבול, חזית", "Frontier of ignorance.", "גבול/חזית"), g("perimeter", "noun", "היקף, גבול", "The perimeter of the known.", "היקף")],
      [
        q("What comes into view with deeper study?", "מה מתגלה עם לימוד מעמיק יותר?", ["Certainty", "The frontier of ignorance", "Wealth", "Fame"], ["ודאות", "גבול הבורות", "עושר", "תהילה"], 1, "'its frontier of ignorance comes into view'."),
        q("Where do confident pronouncements tend to come from?", "מאין נוטות להגיע הצהרות בטוחות בעצמן?", ["The summit", "The foothills", "Experts", "Nowhere"], ["מהפסגה", "מהגבעות שלמרגלות ההר", "ממומחים", "משום מקום"], 1, "'from the foothills, not the summit'."),
      ]),
    R("The Observer Effect (אפקט הצופה)",
      "In some systems, the very act of measuring alters what is measured: a thermometer warms the liquid, a survey shifts the opinion it records, a watched worker behaves unnaturally. Pure, detached observation is often a comforting fiction; to look is, frequently, already to interfere.",
      "בחלק מהמערכות, עצם פעולת המדידה משנה את מה שנמדד: מדחום מחמם את הנוזל, סקר משנה את הדעה שהוא מתעד, ועובד שמשגיחים עליו מתנהג באופן לא טבעי. תצפית טהורה ומנותקת היא לעיתים קרובות בדיה מנחמת; להסתכל פירושו, פעמים רבות, כבר להתערב.",
      [g("alter", "verb", "לשנות", "Measuring alters it.", "לשנות"), g("detached", "adjective", "מנותק, אובייקטיבי", "Detached observation.", "מנותק"), g("interfere", "verb", "להתערב, להפריע", "To look is to interfere.", "להתערב/להפריע")],
      [
        q("What can the act of measuring do?", "מה פעולת המדידה יכולה לעשות?", ["Nothing", "Alter what is measured", "Improve accuracy", "Stop the system"], ["כלום", "לשנות את מה שנמדד", "לשפר את הדיוק", "לעצור את המערכת"], 1, "'the very act of measuring alters what is measured'."),
        q("How is 'detached observation' described?", "איך מתוארת ״תצפית מנותקת״?", ["A fact", "A comforting fiction", "Easy", "Common"], ["כעובדה", "כבדיה מנחמת", "כקלה", "כנפוצה"], 1, "'a comforting fiction'."),
      ]),
    R("Moral Luck (מזל מוסרי)",
      "Two drivers are equally careless; one happens upon an empty road, the other on a child. We condemn the second far more harshly, though the difference between them was pure chance. Much of what we call desert, on close inspection, turns out to rest uneasily on luck.",
      "שני נהגים רשלניים באותה מידה; לפני האחד הכביש במקרה ריק, ולפני השני במקרה חוצה ילד. אנחנו מגנים את השני בחומרה רבה הרבה יותר, אף שההבדל ביניהם היה מקרה טהור. הרבה ממה שאנחנו מכנים גמול ראוי מתברר, במבט מקרוב, כנשען באי-נוחות על מזל.",
      [g("careless", "adjective", "רשלן, חסר זהירות", "Equally careless.", "רשלן/חסר זהירות"), g("condemn", "verb", "לגנות, להוקיע", "We condemn the second.", "לגנות/להוקיע"), g("desert", "noun", "מה שמגיע לאדם, גמול ראוי", "What we call desert.", "גמול ראוי")],
      [
        q("How do the two careless drivers differ?", "במה נבדלים שני הנהגים הרשלניים?", ["In skill", "By pure chance (the road)", "In intent", "In speed"], ["במיומנות", "במקרה טהור (הכביש)", "בכוונה", "במהירות"], 1, "'the difference between them was pure chance'."),
        q("What does 'desert' often rest on, per the text?", "על מה נשען לעיתים קרובות ״גמול ראוי״, לפי הטקסט?", ["Merit", "Luck", "Effort", "Law"], ["על הצטיינות", "על מזל", "על מאמץ", "על החוק"], 1, "'turns out to rest uneasily on luck'."),
      ]),
  ],
};

export const MORE_LISTENINGS8 = {
  A1: [
    L("Hello! It is time for music. Please take a drum or a bell. We will sing a happy song together. Are you ready?",
      "שלום! הגיע הזמן למוזיקה. בבקשה קחו תוף או פעמון. נשיר יחד שיר שמח. אתם מוכנים?",
      [
        q("What time is it?", "איזה זמן עכשיו?", ["Lunch time", "Music time", "Bed time", "Story time"], ["זמן ארוחת צהריים", "זמן מוזיקה", "זמן שינה", "זמן סיפור"], 1, "'it is time for music'."),
        q("What can the children take?", "מה הילדים יכולים לקחת?", ["A book", "A drum or a bell", "A ball", "A pen"], ["ספר", "תוף או פעמון", "כדור", "עט"], 1, "'take a drum or a bell'."),
      ]),
    L("This is the train to the zoo. The doors are closing now. Please keep your ticket. We arrive in ten minutes.",
      "זו הרכבת לגן החיות. הדלתות נסגרות עכשיו. בבקשה שמרו את הכרטיס שלכם. אנחנו מגיעים בעוד עשר דקות.",
      [
        q("Where is the train going?", "לאן נוסעת הרכבת?", ["The city", "The zoo", "The beach", "School"], ["לעיר", "לגן החיות", "לחוף הים", "לבית הספר"], 1, "'the train to the zoo'."),
        q("When does it arrive?", "מתי היא מגיעה?", ["In five minutes", "In ten minutes", "Now", "In an hour"], ["בעוד חמש דקות", "בעוד עשר דקות", "עכשיו", "בעוד שעה"], 1, "'We arrive in ten minutes'."),
      ]),
    L("Look, it is snowing! Let's put on our coats and gloves. We can make a snowman in the garden. It will be cold but fun.",
      "תראו, יורד שלג! בואו נלבש מעילים וכפפות. אנחנו יכולים לבנות איש שלג בגינה. יהיה קר אבל כיף.",
      [
        q("What is the weather?", "מה מזג האוויר?", ["Sunny", "Snowing", "Rainy", "Windy"], ["שמשי", "יורד שלג", "גשום", "סוער"], 1, "'it is snowing'."),
        q("What will they make?", "מה הם יבנו?", ["A cake", "A snowman", "A fire", "A house"], ["עוגה", "איש שלג", "מדורה", "בית"], 1, "'make a snowman in the garden'."),
      ]),
    L("Good night, Sami. Put your toys in the box, please. Then we read one story. Sweet dreams!",
      "לילה טוב, סמי. בבקשה שים את הצעצועים שלך בקופסה. אחר כך נקרא סיפור אחד. חלומות מתוקים!",
      [
        q("Where should the toys go?", "איפה צריך לשים את הצעצועים?", ["On the bed", "In the box", "On the floor", "Outside"], ["על המיטה", "בקופסה", "על הרצפה", "בחוץ"], 1, "'Put your toys in the box'."),
        q("How many stories?", "כמה סיפורים?", ["One", "Two", "Three", "None"], ["אחד", "שניים", "שלושה", "אף אחד"], 0, "'we read one story'."),
      ]),
    L("Welcome to the café. We have apple juice, milk and water for children. The cakes are very good today. What would you like?",
      "ברוכים הבאים לבית הקפה. יש לנו מיץ תפוחים, חלב ומים לילדים. העוגות טובות מאוד היום. מה תרצו?",
      [
        q("Which drink is for children?", "איזה משקה מיועד לילדים?", ["Coffee", "Apple juice, milk and water", "Tea", "Cola"], ["קפה", "מיץ תפוחים, חלב ומים", "תה", "קולה"], 1, "'apple juice, milk and water for children'."),
        q("What is very good today?", "מה טוב מאוד היום?", ["The bread", "The cakes", "The fruit", "The soup"], ["הלחם", "העוגות", "הפירות", "המרק"], 1, "'The cakes are very good today'."),
      ]),
  ],
  A2: [
    L("Good afternoon. Because of road work, bus number five will not stop at Main Street today. Please use the stop on Park Road instead.",
      "צהריים טובים. בגלל עבודות בכביש, קו אוטובוס מספר 5 לא יעצור היום ברחוב הראשי. בבקשה השתמשו במקום זאת בתחנה ברחוב פארק.",
      [
        q("Why is the stop changed?", "למה התחנה שונתה?", ["An accident", "Road work", "A holiday", "A festival"], ["תאונה", "עבודות בכביש", "חג", "פסטיבל"], 1, "'Because of road work'."),
        q("Which stop should people use?", "באיזו תחנה צריכים האנשים להשתמש?", ["Main Street", "Park Road", "City Hall", "The station"], ["הרחוב הראשי", "רחוב פארק", "בניין העירייה", "התחנה המרכזית"], 1, "'use the stop on Park Road instead'."),
      ]),
    L("Hi, this is the library. The book you reserved has arrived. Please collect it within seven days, or it will go back on the shelf.",
      "שלום, כאן הספרייה. הספר שהזמנת הגיע. בבקשה אסוף אותו תוך שבעה ימים, אחרת הוא יחזור למדף.",
      [
        q("What has arrived?", "מה הגיע?", ["A fine", "The reserved book", "A card", "A letter"], ["קנס", "הספר שהוזמן", "כרטיס", "מכתב"], 1, "'The book you reserved has arrived'."),
        q("How long to collect it?", "כמה זמן יש כדי לאסוף אותו?", ["Three days", "Seven days", "One day", "A month"], ["שלושה ימים", "שבעה ימים", "יום אחד", "חודש"], 1, "'within seven days'."),
      ]),
    L("Attention, please. The museum closes in thirty minutes. The last entry to the dinosaur hall is in ten minutes. Thank you for visiting.",
      "לתשומת לבכם, בבקשה. המוזיאון נסגר בעוד 30 דקות. הכניסה האחרונה לאולם הדינוזאורים היא בעוד 10 דקות. תודה שביקרתם.",
      [
        q("When does the museum close?", "מתי המוזיאון נסגר?", ["In ten minutes", "In thirty minutes", "Now", "In an hour"], ["בעוד עשר דקות", "בעוד שלושים דקות", "עכשיו", "בעוד שעה"], 1, "'closes in thirty minutes'."),
        q("When is the last entry to the dinosaur hall?", "מתי הכניסה האחרונה לאולם הדינוזאורים?", ["In thirty minutes", "In ten minutes", "Closed", "Tomorrow"], ["בעוד שלושים דקות", "בעוד עשר דקות", "סגור", "מחר"], 1, "'last entry... is in ten minutes'."),
      ]),
    L("Hello, it's the garage. Your car is ready. We changed the tyre and checked the brakes. The total is sixty dollars. We're open till five.",
      "שלום, כאן המוסך. הרכב שלך מוכן. החלפנו את הצמיג ובדקנו את הבלמים. הסכום הכולל הוא 60 דולר. אנחנו פתוחים עד חמש.",
      [
        q("What did the garage do?", "מה עשה המוסך?", ["Washed the car", "Changed the tyre and checked the brakes", "Painted it", "Nothing"], ["שטף את הרכב", "החליף את הצמיג ובדק את הבלמים", "צבע אותו", "כלום"], 1, "'changed the tyre and checked the brakes'."),
        q("What is the total?", "מה הסכום הכולל?", ["Fifty dollars", "Sixty dollars", "Sixteen dollars", "Free"], ["חמישים דולר", "שישים דולר", "שישה עשר דולר", "בחינם"], 1, "'The total is sixty dollars'."),
      ]),
    L("Welcome to the cooking class. Tonight we make a simple tomato soup. Aprons are by the sink, and please wash your hands before we begin.",
      "ברוכים הבאים לשיעור הבישול. הערב נכין מרק עגבניות פשוט. הסינרים נמצאים ליד הכיור, ובבקשה שטפו ידיים לפני שנתחיל.",
      [
        q("What will they make?", "מה הם יכינו?", ["Bread", "Tomato soup", "Salad", "Cake"], ["לחם", "מרק עגבניות", "סלט", "עוגה"], 1, "'a simple tomato soup'."),
        q("What should students do before starting?", "מה התלמידים צריכים לעשות לפני שמתחילים?", ["Sit down", "Wash their hands", "Pay", "Read"], ["לשבת", "לשטוף ידיים", "לשלם", "לקרוא"], 1, "'wash your hands before we begin'."),
      ]),
  ],
  B1: [
    L("Good morning, everyone. A reminder that the office will work from home this Friday while the lifts are repaired. Please make sure your laptop is charged and take it home tonight.",
      "בוקר טוב לכולם. תזכורת: ביום שישי הקרוב המשרד יעבוד מהבית בזמן שהמעליות יתוקנו. בבקשה ודאו שהמחשב הנייד שלכם טעון וקחו אותו הביתה הערב.",
      [
        q("Why will people work from home?", "למה האנשים יעבדו מהבית?", ["A holiday", "The lifts are being repaired", "Bad weather", "A meeting"], ["חג", "המעליות בתיקון", "מזג אוויר גרוע", "פגישה"], 1, "'while the lifts are repaired'."),
        q("What should people do tonight?", "מה האנשים צריכים לעשות הערב?", ["Stay late", "Take their charged laptop home", "Email the boss", "Nothing"], ["להישאר עד מאוחר", "לקחת הביתה את המחשב הנייד הטעון", "לשלוח מייל לבוס", "כלום"], 1, "'take it home tonight'."),
      ]),
    L("This is a neighbourhood notice. We're starting a tool-sharing shed in the community garden. Instead of everyone buying a ladder they use once, we'll share one. Sign up at Saturday's meeting.",
      "זוהי הודעה לתושבי השכונה. אנחנו פותחים מחסן לשיתוף כלים בגינה הקהילתית. במקום שכל אחד יקנה סולם שהוא משתמש בו פעם אחת, נחלוק סולם אחד. אפשר להירשם בפגישה של יום שבת.",
      [
        q("What is being started?", "מה פותחים?", ["A shop", "A tool-sharing shed", "A class", "A market"], ["חנות", "מחסן לשיתוף כלים", "חוג", "שוק"], 1, "'a tool-sharing shed'."),
        q("When can people sign up?", "מתי אפשר להירשם?", ["Online", "At Saturday's meeting", "By phone", "Anytime"], ["באינטרנט", "בפגישה של יום שבת", "בטלפון", "בכל זמן"], 1, "'Sign up at Saturday's meeting'."),
      ]),
    L("Hello, this is the dentist's office. We have to move your Tuesday appointment because the dentist is unwell. Could you call us back to choose a new time? Sorry for the trouble.",
      "שלום, כאן מרפאת השיניים. אנחנו צריכים להזיז את התור שלך ביום שלישי כי רופא השיניים לא מרגיש טוב. תוכל לחזור אלינו כדי לבחור מועד חדש? סליחה על אי-הנוחות.",
      [
        q("Why is the appointment moved?", "למה התור הוזז?", ["The patient is late", "The dentist is unwell", "A holiday", "A mistake"], ["המטופל מאחר", "רופא השיניים לא מרגיש טוב", "חג", "טעות"], 1, "'the dentist is unwell'."),
        q("What should the patient do?", "מה המטופל צריך לעשות?", ["Come anyway", "Call back to choose a new time", "Wait", "Cancel"], ["להגיע בכל זאת", "לחזור אליהם כדי לבחור מועד חדש", "לחכות", "לבטל"], 1, "'call us back to choose a new time'."),
      ]),
    L("Welcome to the hiking group. Today's trail is about two hours and has one steep part near the top. Drink water often, and stay behind the leader at the front.",
      "ברוכים הבאים לקבוצת הטיולים. המסלול של היום אורך כשעתיים ויש בו קטע תלול אחד ליד הפסגה. שתו מים לעיתים קרובות, והישארו מאחורי המדריך שבראש הקבוצה.",
      [
        q("How long is today's trail?", "כמה זמן אורך המסלול של היום?", ["One hour", "About two hours", "All day", "Thirty minutes"], ["שעה אחת", "כשעתיים", "כל היום", "שלושים דקות"], 1, "'about two hours'."),
        q("What should hikers do?", "מה המטיילים צריכים לעשות?", ["Run ahead", "Stay behind the leader", "Skip water", "Turn back"], ["לרוץ קדימה", "להישאר מאחורי המדריך", "לוותר על מים", "לחזור אחורה"], 1, "'stay behind the leader at the front'."),
      ]),
    L("This is your captain speaking. We expect a little turbulence as we cross the mountains, so please keep your seatbelt fastened. We should land on time, at about three o'clock.",
      "מדבר הקברניט. אנחנו צופים מעט מערבולות כשנחצה את ההרים, לכן בבקשה השאירו את חגורות הבטיחות רכוסות. אנחנו אמורים לנחות בזמן, בסביבות השעה שלוש.",
      [
        q("Why keep seatbelts fastened?", "למה צריך להשאיר את חגורות הבטיחות רכוסות?", ["Take-off", "Expected turbulence over the mountains", "Landing only", "A rule"], ["המראה", "מערבולות צפויות מעל ההרים", "רק בנחיתה", "זה כלל"], 1, "'a little turbulence as we cross the mountains'."),
        q("When should the plane land?", "מתי המטוס אמור לנחות?", ["At two", "At about three o'clock", "Late", "At four"], ["בשתיים", "בסביבות השעה שלוש", "באיחור", "בארבע"], 1, "'land on time, at about three o'clock'."),
      ]),
  ],
  B2: [
    L("A quick thought on habits: don't rely on motivation, which comes and goes. Design your environment instead. Put the book on your pillow and the snacks out of sight, and the right choice becomes the easy one.",
      "מחשבה קצרה על הרגלים: אל תסמכו על מוטיבציה, שבאה והולכת. במקום זאת, עצבו את הסביבה שלכם. שימו את הספר על הכרית ואת החטיפים מחוץ לטווח הראייה, והבחירה הנכונה תהפוך לבחירה הקלה.",
      [
        q("What does the speaker say about motivation?", "מה אומר הדובר על מוטיבציה?", ["Rely on it", "It comes and goes", "It is constant", "It is enough"], ["לסמוך עליה", "היא באה והולכת", "היא קבועה", "היא מספיקה"], 1, "'motivation, which comes and goes'."),
        q("What should you design instead?", "מה כדאי לעצב במקום זאת?", ["Your goals", "Your environment", "Your friends", "Your schedule"], ["את המטרות שלך", "את הסביבה שלך", "את החברים שלך", "את לוח הזמנים שלך"], 1, "'Design your environment instead'."),
      ]),
    L("Historians warn against judging the past purely by today's standards. People acted within the knowledge and norms of their time. Understanding why something happened is not the same as excusing it — but it is where honest history must begin.",
      "היסטוריונים מזהירים מפני שיפוט העבר אך ורק לפי אמות המידה של היום. אנשים פעלו בתוך הידע והנורמות של זמנם. להבין למה משהו קרה אין פירושו להצדיק אותו — אבל משם חייבת להתחיל היסטוריה כנה.",
      [
        q("What do historians warn against?", "מפני מה מזהירים היסטוריונים?", ["Reading old texts", "Judging the past purely by today's standards", "Asking questions", "Writing books"], ["קריאת טקסטים ישנים", "שיפוט העבר אך ורק לפי אמות המידה של היום", "שאילת שאלות", "כתיבת ספרים"], 1, "'judging the past purely by today's standards'."),
        q("Understanding why something happened is not the same as what?", "להבין למה משהו קרה אינו אותו דבר כמו מה?", ["Studying it", "Excusing it", "Recording it", "Teaching it"], ["ללמוד אותו", "להצדיק אותו", "לתעד אותו", "ללמד אותו"], 1, "'not the same as excusing it'."),
      ]),
    L("On teamwork: a group where everyone agrees quickly isn't harmonious, it's asleep. Healthy disagreement, voiced early and respectfully, is how teams catch the flaws that polite silence would let through.",
      "על עבודת צוות: קבוצה שבה כולם מסכימים מהר היא לא הרמונית, היא ישנה. מחלוקת בריאה, שמושמעת מוקדם ובכבוד, היא הדרך שבה צוותים תופסים את הפגמים ששתיקה מנומסת הייתה מעבירה הלאה.",
      [
        q("What does quick agreement suggest?", "על מה מרמזת הסכמה מהירה?", ["Harmony", "The group is asleep", "Success", "Skill"], ["הרמוניה", "הקבוצה ישנה", "הצלחה", "מיומנות"], 1, "'isn't harmonious, it's asleep'."),
        q("What does healthy disagreement help teams do?", "במה עוזרת מחלוקת בריאה לצוותים?", ["Waste time", "Catch flaws polite silence would miss", "Argue more", "Avoid work"], ["לבזבז זמן", "לתפוס פגמים ששתיקה מנומסת הייתה מפספסת", "להתווכח יותר", "להתחמק מעבודה"], 1, "'catch the flaws that polite silence would let through'."),
      ]),
  ],
  C1: [
    L("Consider 'anchoring'. The first number mentioned in a negotiation quietly drags every later figure toward it, even when it's arbitrary. Knowing this, you can either set the anchor yourself or consciously discount one that's been set for you.",
      "חשבו על ״עיגון״. המספר הראשון שמוזכר במשא ומתן גורר בשקט כל נתון שבא אחריו לכיוונו, גם כשהוא שרירותי. כשאתם יודעים זאת, אתם יכולים לקבוע את העוגן בעצמכם, או להפחית במודע מערכו של עוגן שנקבע עבורכם.",
      [
        q("What does anchoring describe?", "מה מתאר העיגון?", ["The last offer wins", "The first number drags later figures toward it", "Splitting the difference", "Ignoring numbers"], ["ההצעה האחרונה מנצחת", "המספר הראשון גורר אחריו את הנתונים הבאים", "להיפגש באמצע", "התעלמות ממספרים"], 1, "'the first number... quietly drags every later figure toward it'."),
        q("What can you do, knowing this?", "מה אפשר לעשות כשיודעים זאת?", ["Nothing", "Set the anchor or discount one set for you", "Always agree", "Leave"], ["כלום", "לקבוע את העוגן או להפחית מערכו של עוגן שנקבע עבורך", "תמיד להסכים", "לעזוב"], 1, "'set the anchor yourself or consciously discount one'."),
      ]),
    L("There's a notion called 'the tyranny of small decisions'. No single choice to drive instead of walk, or click instead of read, seems to matter — yet their sum quietly shapes a life and a planet. The big outcomes hide inside the tiny, unexamined ones.",
      "יש מושג שנקרא ״עריצות ההחלטות הקטנות״. אף בחירה בודדת לנסוע במקום ללכת ברגל, או להקליק במקום לקרוא, לא נראית חשובה — ובכל זאת הסכום שלהן מעצב בשקט חיים שלמים וכוכב לכת שלם. התוצאות הגדולות מסתתרות בתוך ההחלטות הזעירות שאיש לא בחן.",
      [
        q("What does the 'tyranny of small decisions' describe?", "מה מתארת ״עריצות ההחלטות הקטנות״?", ["One big choice", "How tiny choices sum to large outcomes", "Avoiding decisions", "Voting"], ["בחירה גדולה אחת", "איך בחירות זעירות מצטברות לתוצאות גדולות", "הימנעות מהחלטות", "הצבעה"], 1, "'their sum quietly shapes a life and a planet'."),
        q("Where do the big outcomes hide?", "איפה מסתתרות התוצאות הגדולות?", ["In big choices", "Inside the tiny, unexamined ones", "In luck", "Nowhere"], ["בבחירות הגדולות", "בתוך ההחלטות הזעירות שאיש לא בחן", "במזל", "בשום מקום"], 1, "'hide inside the tiny, unexamined ones'."),
      ]),
    L("Economists distinguish 'stocks' from 'flows'. Your bank balance is a stock; your monthly income a flow. Many arguments go nowhere because two people are debating a flow as though it were a stock — confusing the rate of change with the thing itself.",
      "כלכלנים מבחינים בין ״מלאי״ ל״זרם״. היתרה בחשבון הבנק שלך היא מלאי; ההכנסה החודשית שלך היא זרם. ויכוחים רבים לא מובילים לשום מקום כי שני אנשים דנים בזרם כאילו היה מלאי — ומבלבלים בין קצב השינוי לבין הדבר עצמו.",
      [
        q("What is a 'flow', per the talk?", "מהו ״זרם״, לפי ההרצאה?", ["A balance", "Something like monthly income", "A debt", "A total"], ["יתרה", "משהו כמו הכנסה חודשית", "חוב", "סכום כולל"], 1, "'your monthly income a flow'."),
        q("Why do many arguments go nowhere?", "למה ויכוחים רבים לא מובילים לשום מקום?", ["Too few facts", "Debating a flow as though it were a stock", "No data", "Bad manners"], ["מעט מדי עובדות", "דנים בזרם כאילו היה מלאי", "אין נתונים", "חוסר נימוס"], 1, "'confusing the rate of change with the thing itself'."),
      ]),
  ],
  C2: [
    L("Reflect on the difference between 'risk' and 'uncertainty'. Risk is a game with known odds, like a dice roll; uncertainty is a game whose very rules are hidden. We comfort ourselves by dressing the second up as the first, attaching crisp probabilities to things we simply cannot know.",
      "הרהרו בהבדל בין ״סיכון״ ל״אי-ודאות״. סיכון הוא משחק עם סיכויים ידועים, כמו הטלת קובייה; אי-ודאות היא משחק שעצם חוקיו נסתרים. אנחנו מנחמים את עצמנו בכך שאנחנו מלבישים את השני בתחפושת של הראשון, ומצמידים הסתברויות חדות לדברים שפשוט איננו יכולים לדעת.",
      [
        q("How is 'risk' defined here?", "איך מוגדר כאן ״סיכון״?", ["Hidden rules", "A game with known odds", "Total ignorance", "A guess"], ["חוקים נסתרים", "משחק עם סיכויים ידועים", "בורות מוחלטת", "ניחוש"], 1, "'Risk is a game with known odds'."),
        q("How do we comfort ourselves?", "איך אנחנו מנחמים את עצמנו?", ["By admitting ignorance", "By dressing uncertainty up as risk", "By waiting", "By guessing"], ["בכך שאנחנו מודים בבורות", "בכך שאנחנו מלבישים את אי-הוודאות בתחפושת של סיכון", "בכך שאנחנו מחכים", "בכך שאנחנו מנחשים"], 1, "'dressing the second up as the first'."),
      ]),
    L("There's a subtle trap in hindsight: once we know how a story ended, it feels as though it could never have gone otherwise. This 'creeping determinism' erases the genuine uncertainty that the people involved actually faced, and makes us harsher judges than we have any right to be.",
      "יש מלכודת עדינה בחוכמה שבדיעבד: ברגע שאנחנו יודעים איך סיפור הסתיים, נדמה שהוא לא יכול היה להתגלגל אחרת. ה״דטרמיניזם הזוחל״ הזה מוחק את אי-הוודאות האמיתית שהאנשים המעורבים התמודדו איתה בפועל, והופך אותנו לשופטים קשים יותר ממה שיש לנו כל זכות להיות.",
      [
        q("What does hindsight make events feel like?", "איך גורמת החוכמה שבדיעבד לאירועים להיראות?", ["Surprising", "As though they could never have gone otherwise", "Random", "Unimportant"], ["מפתיעים", "כאילו לא יכלו להתגלגל אחרת", "אקראיים", "לא חשובים"], 1, "'it feels as though it could never have gone otherwise'."),
        q("What does 'creeping determinism' erase?", "מה מוחק ״הדטרמיניזם הזוחל״?", ["The facts", "The genuine uncertainty people faced", "The ending", "The dates"], ["את העובדות", "את אי-הוודאות האמיתית שהאנשים התמודדו איתה", "את הסוף", "את התאריכים"], 1, "'erases the genuine uncertainty that the people involved actually faced'."),
      ]),
    L("Note how often a 'compromise' is mistaken for wisdom. Splitting the difference between a true claim and a false one does not yield a half-truth; it yields a confident error. Balance is a virtue between reasonable positions, not a substitute for judging which positions are reasonable.",
      "שימו לב כמה פעמים ״פשרה״ נתפסת בטעות כחוכמה. מציאת נקודת אמצע בין טענה נכונה לטענה שקרית אינה מניבה חצי אמת; הוא מניב טעות בטוחה בעצמה. איזון הוא מעלה בין עמדות סבירות, לא תחליף לשיפוט אילו עמדות הן סבירות.",
      [
        q("What does splitting the difference between true and false yield?", "מה מניבה נקודת אמצע בין נכון לשקרי?", ["A half-truth", "A confident error", "Wisdom", "Balance"], ["חצי אמת", "טעות בטוחה בעצמה", "חוכמה", "איזון"], 1, "'it yields a confident error'."),
        q("Balance is a virtue between what?", "איזון הוא מעלה בין מה?", ["Any positions", "Reasonable positions", "Numbers", "People"], ["כל עמדה שהיא", "עמדות סבירות", "מספרים", "אנשים"], 1, "'a virtue between reasonable positions'."),
      ]),
  ],
};

export const MORE_SPEAKING8 = {
  A1: [
    { text: "This is my school bag.", translation: "זה התיק שלי." },
    { text: "I want to play outside.", translation: "אני רוצה לשחק בחוץ." },
    { text: "Good night, see you tomorrow.", translation: "לילה טוב, נתראה מחר." },
  ],
  A2: [
    { text: "Excuse me, is this the right bus?", translation: "סליחה, זה האוטובוס הנכון?" },
    { text: "I made this gift myself.", translation: "הכנתי את המתנה הזו בעצמי." },
    { text: "Can you tell me when it's ready?", translation: "תוכל לומר לי מתי זה יהיה מוכן?" },
  ],
  B1: [
    { text: "I've started cooking proper meals for myself.", translation: "התחלתי לבשל לעצמי ארוחות אמיתיות." },
    { text: "I turned off most of my notifications last week.", translation: "כיביתי את רוב ההתראות שלי בשבוע שעבר." },
    { text: "Would you be willing to hear me out first?", translation: "תהיה מוכן לשמוע אותי עד הסוף קודם?" },
  ],
  B2: [
    { text: "I try to design my environment, not rely on willpower.", translation: "אני משתדל לעצב את הסביבה שלי, לא להסתמך על כוח רצון." },
    { text: "Let's not compare our drafts to other people's finished work.", translation: "בוא לא נשווה את הטיוטות שלנו לעבודה הגמורה של אחרים." },
    { text: "A little honest disagreement here would actually help.", translation: "קצת מחלוקת כנה כאן דווקא תעזור." },
  ],
  C1: [
    { text: "Let's be careful not to anchor on that first figure.", translation: "בוא ניזהר לא להיתפס למספר הראשון הזה." },
    { text: "I suspect we're seeing confirmation bias in this data.", translation: "אני חושד שאנחנו רואים כאן הטיית אישור בנתונים." },
    { text: "The small, repeated choices are what worry me most.", translation: "הבחירות הקטנות והחוזרות הן מה שמדאיג אותי יותר מכול." },
  ],
  C2: [
    { text: "We're treating deep uncertainty as if it were measurable risk.", translation: "אנחנו מתייחסים לאי-ודאות עמוקה כאילו הייתה סיכון מדיד." },
    { text: "With hindsight it looks inevitable, but it wasn't to them.", translation: "במבט לאחור זה נראה בלתי נמנע, אבל עבורם זה לא היה כך." },
    { text: "Splitting the difference here would just buy us a confident error.", translation: "פשרה כאן רק תקנה לנו טעות בטוחה בעצמה." },
  ],
};
