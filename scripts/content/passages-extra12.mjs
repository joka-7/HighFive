// Round 12 of additional Reading and Listening content — A1, batch 3.
//
// Same shape and rules as rounds 10 and 11: fully bilingual, two questions
// per item, written from the A1 word cards so the app's vocabulary gate shows
// every item. Topics are tracked in docs/CONTENT-TOPICS.md.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

// --- READING ---------------------------------------------------------------
export const MORE_READINGS12 = {
  A1: [
    R(
      "Grandma's Chicken Soup (מרק העוף של סבתא)",
      "On cold days my grandmother makes chicken soup. She puts carrots, onions and rice in the pot. The house smells very good. We eat two bowls and we feel warm.",
      "בימים קרים סבתא שלי מכינה מרק עוף. היא שמה בסיר גזר, בצל ואורז. הבית מריח טוב מאוד. אנחנו אוכלים שתי קערות ומרגישים חמים.",
      [
        g("pot", "noun", "כלי גדול לבישול", "She puts rice in the pot.", "סיר"),
        g("smell", "verb", "להריח, להרגיש עם האף", "The house smells good.", "להריח"),
        g("bowl", "noun", "כלי עגול לאוכל", "I eat a bowl of soup.", "קערה"),
      ],
      [
        q("What does Grandma make?", "מה סבתא מכינה?", ["Chicken soup", "A salad", "A cake", "Fish"], ["מרק עוף", "סלט", "עוגה", "דגים"], 0, "כתוב 'makes chicken soup'."),
        q("How many bowls do they eat?", "כמה קערות הם אוכלים?", ["Two", "One", "Four", "Six"], ["שתיים", "אחת", "ארבע", "שש"], 0, "כתוב 'We eat two bowls'."),
      ],
    ),
    R(
      "My Cousin's Wedding (החתונה של בת הדודה)",
      "Today is my cousin's wedding. She wears a long white dress and he wears a black suit. There is a lot of food and music. I sing and I eat cake with my aunt.",
      "היום החתונה של בת הדודה שלי. היא לובשת שמלה לבנה ארוכה והוא לובש חליפה שחורה. יש הרבה אוכל ומוזיקה. אני שרה ואוכלת עוגה עם הדודה שלי.",
      [
        g("wedding", "noun", "מסיבה של חתן וכלה", "I go to a wedding.", "חתונה"),
        g("dress", "noun", "בגד של נשים", "She wears a white dress.", "שמלה"),
        g("suit", "noun", "בגד רשמי של גברים", "He wears a black suit.", "חליפה"),
      ],
      [
        q("What does the cousin wear?", "מה בת הדודה לובשת?", ["A long white dress", "A red coat", "A black suit", "A blue shirt"], ["שמלה לבנה ארוכה", "מעיל אדום", "חליפה שחורה", "חולצה כחולה"], 0, "כתוב 'a long white dress'."),
        q("What does the writer do?", "מה הכותבת עושה?", ["She sings and eats cake", "She sleeps", "She cooks", "She reads"], ["היא שרה ואוכלת עוגה", "היא ישנה", "היא מבשלת", "היא קוראת"], 0, "כתוב 'I sing and I eat cake'."),
      ],
    ),
    R(
      "My New Baby Sister (אחותי התינוקת החדשה)",
      "I have a new baby sister. She is very small and she sleeps a lot. When she cries, my mother gives her milk. I hold her hand and I say, \"I am your big brother.\"",
      "יש לי אחות תינוקת חדשה. היא קטנה מאוד וישנה הרבה. כשהיא בוכה, אמא שלי נותנת לה חלב. אני מחזיק לה את היד ואומר: \"אני האח הגדול שלך.\"",
      [
        g("baby", "noun", "ילד קטן מאוד", "The baby sleeps.", "תינוקת"),
        g("hold", "verb", "לתפוס ביד", "I hold her hand.", "להחזיק"),
        g("milk", "noun", "משקה לבן מפרה", "She drinks milk.", "חלב"),
      ],
      [
        q("What does the baby do a lot?", "מה התינוקת עושה הרבה?", ["She sleeps", "She runs", "She eats rice", "She sings"], ["היא ישנה", "היא רצה", "היא אוכלת אורז", "היא שרה"], 0, "כתוב 'she sleeps a lot'."),
        q("What does the writer say?", "מה הכותב אומר?", ["I am your big brother", "I am hungry", "Go to bed", "Be quiet"], ["אני האח הגדול שלך", "אני רעב", "לכי לישון", "שקט"], 0, "כתוב 'I am your big brother'."),
      ],
    ),
    R(
      "Dad Comes Home Late (אבא חוזר מאוחר)",
      "My father works hard and he comes home late. I wait for him with my book. When he opens the door, I run to him. He is tired, but he smiles and says, \"Hello, my friend.\"",
      "אבא שלי עובד קשה והוא חוזר הביתה מאוחר. אני מחכה לו עם הספר שלי. כשהוא פותח את הדלת, אני רץ אליו. הוא עייף, אבל הוא מחייך ואומר: \"שלום, חבר שלי.\"",
      [
        g("late", "adverb", "אחרי הזמן", "He comes home late.", "מאוחר"),
        g("hard", "adverb", "הרבה, במאמץ", "He works hard.", "קשה"),
        g("door", "noun", "מה שפותחים כדי להיכנס", "He opens the door.", "דלת"),
      ],
      [
        q("When does the father come home?", "מתי האבא חוזר הביתה?", ["Late", "Early", "At night", "In the morning"], ["מאוחר", "מוקדם", "בלילה", "בבוקר"], 0, "כתוב 'comes home late'."),
        q("What does the writer do?", "מה הכותב עושה?", ["He runs to his father", "He sleeps", "He eats", "He goes out"], ["הוא רץ אל אבא", "הוא ישן", "הוא אוכל", "הוא יוצא"], 0, "כתוב 'I run to him'."),
      ],
    ),
    R(
      "A Photo of Our Family (תמונה של המשפחה שלנו)",
      "On the wall of our living room there is a photo of our family. My parents sit in the middle. My brother and I stand behind them. In the photo, everyone smiles.",
      "על הקיר בסלון שלנו יש תמונה של המשפחה. ההורים שלי יושבים באמצע. אחי ואני עומדים מאחוריהם. בתמונה כולם מחייכים.",
      [
        g("photo", "noun", "תמונה מהמצלמה", "I look at the photo.", "תמונה"),
        g("middle", "noun", "המקום באמצע", "They sit in the middle.", "אמצע"),
        g("behind", "preposition", "מאחורי", "I stand behind them.", "מאחורי"),
      ],
      [
        q("Where do the parents sit in the photo?", "איפה ההורים יושבים בתמונה?", ["In the middle", "On the left", "Behind the children", "Outside"], ["באמצע", "משמאל", "מאחורי הילדים", "בחוץ"], 0, "כתוב 'My parents sit in the middle'."),
        q("What does everyone do in the photo?", "מה כולם עושים בתמונה?", ["They smile", "They sleep", "They run", "They eat"], ["הם מחייכים", "הם ישנים", "הם רצים", "הם אוכלים"], 0, "כתוב 'everyone smiles'."),
      ],
    ),
    R(
      "Uncle's Birthday (יום ההולדת של הדוד)",
      "Today is my uncle's birthday. He is forty years old. We go to his house and we bring him a gift. He opens it and says, \"What a nice shirt! Thank you.\"",
      "היום יום ההולדת של הדוד שלי. הוא בן ארבעים. אנחנו הולכים לבית שלו ומביאים לו מתנה. הוא פותח אותה ואומר: \"איזו חולצה יפה! תודה.\"",
      [
        g("gift", "noun", "מה שנותנים ליום הולדת", "We bring a gift.", "מתנה"),
        g("open", "verb", "לפתוח", "He opens the gift.", "לפתוח"),
        g("shirt", "noun", "בגד לחלק העליון", "It is a nice shirt.", "חולצה"),
      ],
      [
        q("What do they bring to the uncle?", "מה הם מביאים לדוד?", ["A gift", "A dog", "A book", "A cake"], ["מתנה", "כלב", "ספר", "עוגה"], 0, "כתוב 'we bring him a gift'."),
        q("What is the gift?", "מהי המתנה?", ["A shirt", "A hat", "A watch", "A phone"], ["חולצה", "כובע", "שעון", "טלפון"], 0, "כתוב 'What a nice shirt'."),
      ],
    ),
    R(
      "The School Bell (פעמון בית הספר)",
      "At eight o'clock the school bell rings. All the children run to their classrooms. The teacher says good morning and we sit down. At ten o'clock the bell rings again and we go out to play.",
      "בשמונה מצלצל פעמון בית הספר. כל הילדים רצים לכיתות שלהם. המורה אומרת בוקר טוב ואנחנו יושבים. בעשר הפעמון מצלצל שוב ואנחנו יוצאים לשחק.",
      [
        g("bell", "noun", "כלי שמצלצל", "The bell rings.", "פעמון"),
        g("ring", "verb", "להשמיע צליל", "The bell rings.", "לצלצל"),
        g("again", "adverb", "פעם נוספת", "It rings again.", "שוב"),
      ],
      [
        q("What time does the first bell ring?", "באיזו שעה הפעמון הראשון מצלצל?", ["At eight", "At ten", "At nine", "At two"], ["בשמונה", "בעשר", "בתשע", "בשתיים"], 0, "כתוב 'At eight o'clock the school bell rings'."),
        q("What do the children do at ten?", "מה הילדים עושים בעשר?", ["They go out to play", "They go home", "They eat lunch", "They sleep"], ["הם יוצאים לשחק", "הם הולכים הביתה", "הם אוכלים ארוחת צהריים", "הם ישנים"], 0, "כתוב 'we go out to play'."),
      ],
    ),
    R(
      "Picture Day (יום הצילום)",
      "Today is picture day at school. I wear my best shirt and I brush my hair. The man says, \"Smile!\" I smile and he takes the photo. My mother puts it on the wall at home.",
      "היום יום צילום בבית הספר. אני לובש את החולצה הכי יפה שלי ומסרק את השיער. האיש אומר: \"חייכו!\" אני מחייך והוא מצלם. אמא שלי שמה את התמונה על הקיר בבית.",
      [
        g("best", "adjective", "הכי טוב", "I wear my best shirt.", "הכי טוב"),
        g("brush", "verb", "לסרק או לצחצח", "I brush my hair.", "לסרק"),
        g("hair", "noun", "מה שגדל על הראש", "I brush my hair.", "שיער"),
      ],
      [
        q("What does the man say?", "מה האיש אומר?", ["Smile!", "Sit down!", "Stop!", "Go home!"], ["חייכו!", "שבו!", "עצרו!", "לכו הביתה!"], 0, "כתוב 'Smile!'."),
        q("Where does the mother put the photo?", "איפה האמא שמה את התמונה?", ["On the wall", "In a book", "In a box", "On the table"], ["על הקיר", "בספר", "בקופסה", "על השולחן"], 0, "כתוב 'puts it on the wall at home'."),
      ],
    ),
    R(
      "Who Sits Next to Me (מי יושב לידי)",
      "In class I sit next to a boy called Amir. He is funny and he draws very well. Every day he shows me a new picture. We laugh together, and the teacher says, \"Be quiet, please.\"",
      "בכיתה אני יושב ליד ילד בשם אמיר. הוא מצחיק והוא מצייר טוב מאוד. בכל יום הוא מראה לי ציור חדש. אנחנו צוחקים ביחד, והמורה אומרת: \"שקט, בבקשה.\"",
      [
        g("next to", "preposition", "ליד", "I sit next to a boy.", "ליד"),
        g("funny", "adjective", "גורם לצחוק", "He is funny.", "מצחיק"),
        g("show", "verb", "לתת לראות", "He shows me a picture.", "להראות"),
      ],
      [
        q("What does Amir do very well?", "מה אמיר עושה טוב מאוד?", ["He draws", "He sings", "He swims", "He cooks"], ["הוא מצייר", "הוא שר", "הוא שוחה", "הוא מבשל"], 0, "כתוב 'he draws very well'."),
        q("What does the teacher say?", "מה המורה אומרת?", ["Be quiet, please", "Thank you", "Go home", "Open your books"], ["שקט, בבקשה", "תודה", "לכו הביתה", "פתחו ספרים"], 0, "כתוב 'Be quiet, please'."),
      ],
    ),
    R(
      "Our Class Fish (הדג של הכיתה)",
      "We have a small fish in our classroom. Its name is Goldy. Every Monday a different child gives it food. Today it is my turn and I am very happy.",
      "יש לנו דג קטן בכיתה. קוראים לו גולדי. בכל יום שני ילד אחר נותן לו אוכל. היום התור שלי ואני שמח מאוד.",
      [
        g("fish", "noun", "חיה שחיה במים", "We have a fish.", "דג"),
        g("different", "adjective", "לא אותו דבר", "A different child gives it food.", "שונה"),
        g("turn", "noun", "הזמן של אדם", "Today it is my turn.", "תור"),
      ],
      [
        q("When does a child give the fish food?", "מתי ילד נותן לדג אוכל?", ["Every Monday", "Every Friday", "Every night", "Every year"], ["כל יום שני", "כל יום שישי", "כל לילה", "כל שנה"], 0, "כתוב 'Every Monday'."),
        q("How does the writer feel today?", "איך הכותב מרגיש היום?", ["Very happy", "Sad", "Angry", "Tired"], ["שמח מאוד", "עצוב", "כועס", "עייף"], 0, "כתוב 'I am very happy'."),
      ],
    ),
    R(
      "Learning to Read (לומדים לקרוא)",
      "My little brother is six and he is learning to read. Every evening he sits with a small book. He reads one word at a time. When he reads a page, we all say, \"Very good!\"",
      "אחי הקטן בן שש והוא לומד לקרוא. בכל ערב הוא יושב עם ספר קטן. הוא קורא מילה אחת בכל פעם. כשהוא קורא עמוד, כולנו אומרים: \"טוב מאוד!\"",
      [
        g("learn", "verb", "לדעת דברים חדשים", "He is learning to read.", "ללמוד"),
        g("word", "noun", "חלק קטן של משפט", "He reads one word.", "מילה"),
        g("page", "noun", "דף בספר", "He reads a page.", "עמוד"),
      ],
      [
        q("How old is the little brother?", "בן כמה האח הקטן?", ["Six", "Four", "Ten", "Eight"], ["שש", "ארבע", "עשר", "שמונה"], 0, "כתוב 'is six'."),
        q("What do they say when he reads a page?", "מה הם אומרים כשהוא קורא עמוד?", ["Very good!", "Stop!", "Go to bed!", "Be quiet!"], ["טוב מאוד!", "עצור!", "לך לישון!", "שקט!"], 0, "כתוב 'Very good!'."),
      ],
    ),
    R(
      "The School Garden (הגינה של בית הספר)",
      "Our school has a small garden. In spring we put seeds in the ground. Every day we give them water. After two months we have red tomatoes and we take them home.",
      "בבית הספר שלנו יש גינה קטנה. באביב אנחנו שמים זרעים באדמה. בכל יום אנחנו נותנים להם מים. אחרי חודשיים יש לנו עגבניות אדומות ואנחנו לוקחים אותן הביתה.",
      [
        g("seed", "noun", "החלק הקטן ממנו גדל צמח", "We put seeds in the ground.", "זרע"),
        g("ground", "noun", "האדמה", "Seeds are in the ground.", "אדמה"),
        g("water", "verb", "לתת מים", "We water the seeds.", "להשקות"),
      ],
      [
        q("When do they put seeds in the ground?", "מתי הם שמים זרעים באדמה?", ["In spring", "In winter", "In summer", "At night"], ["באביב", "בחורף", "בקיץ", "בלילה"], 0, "כתוב 'In spring we put seeds'."),
        q("What do they have after two months?", "מה יש להם אחרי חודשיים?", ["Red tomatoes", "Flowers", "Apples", "Bread"], ["עגבניות אדומות", "פרחים", "תפוחים", "לחם"], 0, "כתוב 'red tomatoes'."),
      ],
    ),
    R(
      "Where Is My Pencil? (איפה העיפרון שלי?)",
      "I can't find my pencil. I look in my bag, under my chair and on the floor. My friend says, \"It is behind your ear!\" I laugh. The pencil is there.",
      "אני לא מוצא את העיפרון שלי. אני מחפש בתיק, מתחת לכיסא ועל הרצפה. החבר שלי אומר: \"הוא מאחורי האוזן שלך!\" אני צוחק. העיפרון שם.",
      [
        g("pencil", "noun", "כלי לכתיבה", "I look for my pencil.", "עיפרון"),
        g("ear", "noun", "איבר ההאזנה", "It is behind my ear.", "אוזן"),
        g("floor", "noun", "הרצפה", "I look on the floor.", "רצפה"),
      ],
      [
        q("Where is the pencil?", "איפה העיפרון?", ["Behind the writer's ear", "In the bag", "On the floor", "Under the chair"], ["מאחורי האוזן של הכותב", "בתיק", "על הרצפה", "מתחת לכיסא"], 0, "כתוב 'It is behind your ear'."),
        q("What does the writer do at the end?", "מה הכותב עושה בסוף?", ["He laughs", "He cries", "He goes home", "He sleeps"], ["הוא צוחק", "הוא בוכה", "הוא הולך הביתה", "הוא ישן"], 0, "כתוב 'I laugh'."),
      ],
    ),
    R(
      "Reading Time (זמן קריאה)",
      "Every day after lunch we have reading time. We take a book from the shelf and sit on the floor. It is very quiet. I read a story about a brave little dog.",
      "בכל יום אחרי ארוחת הצהריים יש לנו זמן קריאה. אנחנו לוקחים ספר מהמדף ויושבים על הרצפה. שקט מאוד. אני קורא סיפור על כלב קטן ואמיץ.",
      [
        g("shelf", "noun", "לוח שמניחים עליו ספרים", "A book is on the shelf.", "מדף"),
        g("brave", "adjective", "לא מפחד", "The dog is brave.", "אמיץ"),
        g("quiet", "adjective", "בלי רעש", "The room is quiet.", "שקט"),
      ],
      [
        q("When is reading time?", "מתי זמן הקריאה?", ["After lunch", "Before school", "At night", "In the morning"], ["אחרי ארוחת הצהריים", "לפני בית הספר", "בלילה", "בבוקר"], 0, "כתוב 'after lunch'."),
        q("What is the story about?", "על מה הסיפור?", ["A brave little dog", "A big cat", "A king", "A fish"], ["כלב קטן ואמיץ", "חתול גדול", "מלך", "דג"], 0, "כתוב 'a brave little dog'."),
      ],
    ),
    R(
      "Pizza at Home (פיצה בבית)",
      "On Friday we make pizza at home. My father makes the bread and I put tomatoes and cheese on top. We put it in the oven for ten minutes. The pizza is hot and we eat all of it.",
      "ביום שישי אנחנו מכינים פיצה בבית. אבא שלי מכין את הלחם ואני שם עגבניות וגבינה מלמעלה. אנחנו מכניסים אותה לתנור לעשר דקות. הפיצה חמה ואנחנו אוכלים אותה כולה.",
      [
        g("oven", "noun", "מכשיר לאפייה", "We put it in the oven.", "תנור"),
        g("cheese", "noun", "אוכל מחלב", "I put cheese on top.", "גבינה"),
        g("top", "noun", "החלק העליון", "I put cheese on top.", "החלק העליון"),
      ],
      [
        q("What does the writer put on top?", "מה הכותב שם מלמעלה?", ["Tomatoes and cheese", "Rice", "Eggs", "Fish"], ["עגבניות וגבינה", "אורז", "ביצים", "דגים"], 0, "כתוב 'tomatoes and cheese on top'."),
        q("How long is the pizza in the oven?", "כמה זמן הפיצה בתנור?", ["Ten minutes", "One hour", "Two minutes", "One day"], ["עשר דקות", "שעה", "שתי דקות", "יום"], 0, "כתוב 'for ten minutes'."),
      ],
    ),
    R(
      "Pancakes on Sunday (לביבות ביום ראשון)",
      "On Sunday morning my mother makes pancakes. I like them with honey and a little butter. My brother likes them with chocolate. We eat them and talk about the week.",
      "בבוקר יום ראשון אמא שלי מכינה לביבות. אני אוהב אותן עם דבש וקצת חמאה. אחי אוהב אותן עם שוקולד. אנחנו אוכלים אותן ומדברים על השבוע.",
      [
        g("pancake", "noun", "עוגה דקה ועגולה", "I eat a pancake.", "לביבה"),
        g("honey", "noun", "נוזל מתוק", "I like honey.", "דבש"),
        g("butter", "noun", "שומן מחלב", "I put butter on it.", "חמאה"),
      ],
      [
        q("When does the mother make pancakes?", "מתי האמא מכינה לביבות?", ["On Sunday morning", "On Friday night", "On Monday", "Every day"], ["בבוקר יום ראשון", "בליל שישי", "ביום שני", "כל יום"], 0, "כתוב 'On Sunday morning'."),
        q("What does the brother like on them?", "מה האח אוהב עליהן?", ["Chocolate", "Honey", "Cheese", "Salt"], ["שוקולד", "דבש", "גבינה", "מלח"], 0, "כתוב 'My brother likes them with chocolate'."),
      ],
    ),
    R(
      "A New Fruit (פרי חדש)",
      "Today my father brings a new fruit from the market. It is big and orange and it is called a mango. I cut it and try a piece. It is very sweet and I want more.",
      "היום אבא שלי מביא פרי חדש מהשוק. הוא גדול וכתום וקוראים לו מנגו. אני חותך אותו וטועם חתיכה. הוא מתוק מאוד ואני רוצה עוד.",
      [
        g("mango", "noun", "פרי כתום ומתוק", "I eat a mango.", "מנגו"),
        g("cut", "verb", "לחתוך", "I cut the fruit.", "לחתוך"),
        g("try", "verb", "לטעום", "I try a piece.", "לטעום"),
      ],
      [
        q("What color is the fruit?", "באיזה צבע הפרי?", ["Orange", "Red", "Green", "Blue"], ["כתום", "אדום", "ירוק", "כחול"], 0, "כתוב 'big and orange'."),
        q("How is the fruit?", "איך הפרי?", ["Very sweet", "Very cold", "Very hot", "Very bad"], ["מתוק מאוד", "קר מאוד", "חם מאוד", "רע מאוד"], 0, "כתוב 'very sweet'."),
      ],
    ),
    R(
      "A Cup of Hot Chocolate (כוס שוקו חם)",
      "It is a cold winter evening. My mother makes hot chocolate with milk. I hold the warm cup in my hands. I sit near the window and watch the rain.",
      "זה ערב חורף קר. אמא שלי מכינה שוקו חם עם חלב. אני מחזיק את הכוס החמה בידיים. אני יושב ליד החלון ומסתכל על הגשם.",
      [
        g("chocolate", "noun", "ממתק חום", "I drink hot chocolate.", "שוקולד"),
        g("cup", "noun", "כלי לשתייה", "I hold the cup.", "כוס"),
        g("winter", "noun", "העונה הקרה", "It is a cold winter day.", "חורף"),
      ],
      [
        q("What does the mother make?", "מה האמא מכינה?", ["Hot chocolate", "Tea", "Soup", "Juice"], ["שוקו חם", "תה", "מרק", "מיץ"], 0, "כתוב 'makes hot chocolate'."),
        q("Where does the writer sit?", "איפה הכותב יושב?", ["Near the window", "On the roof", "In the garden", "At the door"], ["ליד החלון", "על הגג", "בגינה", "ליד הדלת"], 0, "כתוב 'near the window'."),
      ],
    ),
    R(
      "Watermelon on a Hot Day (אבטיח ביום חם)",
      "It is very hot today, so my father buys a big watermelon. We cut it into pieces and sit in the garden. The watermelon is cold and sweet. We eat it all and our hands are wet.",
      "חם מאוד היום, ולכן אבא שלי קונה אבטיח גדול. אנחנו חותכים אותו לחתיכות ויושבים בגינה. האבטיח קר ומתוק. אנחנו אוכלים הכול והידיים שלנו רטובות.",
      [
        g("watermelon", "noun", "פרי גדול וירוק עם אדום בפנים", "The watermelon is big.", "אבטיח"),
        g("piece", "noun", "חלק", "We cut it into pieces.", "חתיכה"),
        g("wet", "adjective", "לא יבש", "My hands are wet.", "רטוב"),
      ],
      [
        q("Why does the father buy a watermelon?", "למה האבא קונה אבטיח?", ["It is very hot", "It is cheap", "It is Friday", "It is cold"], ["חם מאוד", "זה זול", "זה יום שישי", "קר"], 0, "כתוב 'It is very hot today'."),
        q("Where do they sit?", "איפה הם יושבים?", ["In the garden", "At school", "On the beach", "In the car"], ["בגינה", "בבית הספר", "על החוף", "במכונית"], 0, "כתוב 'sit in the garden'."),
      ],
    ),
    R(
      "Grandpa's Fish (הדג של סבא)",
      "On Friday my grandfather cooks fish. He puts it in a pan with onions and a little salt. The fish is hot and good. We eat it with rice and a green salad.",
      "ביום שישי סבא שלי מבשל דג. הוא שם אותו במחבת עם בצל וקצת מלח. הדג חם וטעים. אנחנו אוכלים אותו עם אורז וסלט ירוק.",
      [
        g("fish", "noun", "חיה שחיה במים", "Grandpa cooks fish.", "דג"),
        g("pan", "noun", "כלי בישול עם ידית", "He puts it in a pan.", "מחבת"),
        g("good", "adjective", "לא רע", "The fish is good.", "טוב"),
      ],
      [
        q("When does Grandpa cook fish?", "מתי סבא מבשל דג?", ["On Friday", "On Monday", "On Sunday", "On Tuesday"], ["ביום שישי", "ביום שני", "ביום ראשון", "ביום שלישי"], 0, "כתוב 'On Friday'."),
        q("What do they eat with the fish?", "עם מה הם אוכלים את הדג?", ["Rice and a green salad", "Bread and cheese", "Soup", "Potatoes and eggs"], ["אורז וסלט ירוק", "לחם וגבינה", "מרק", "תפוחי אדמה וביצים"], 0, "כתוב 'with rice and a green salad'."),
      ],
    ),
    R(
      "Running in the Park (רצים בפארק)",
      "Every morning my father and I run in the park. First we walk, and then we run fast. My father is strong, but I am faster. After the run we sit on a bench and drink water.",
      "בכל בוקר אבא שלי ואני רצים בפארק. קודם אנחנו הולכים ואחר כך רצים מהר. אבא שלי חזק, אבל אני מהיר יותר. אחרי הריצה אנחנו יושבים על ספסל ושותים מים.",
      [
        g("run", "verb", "ללכת מהר מאוד", "We run in the park.", "לרוץ"),
        g("fast", "adverb", "במהירות", "We run fast.", "מהר"),
        g("bench", "noun", "ספסל ישיבה בחוץ", "We sit on a bench.", "ספסל"),
      ],
      [
        q("Who runs with the writer?", "מי רץ עם הכותב?", ["His father", "His mother", "His friend", "His teacher"], ["אבא שלו", "אמא שלו", "החבר שלו", "המורה שלו"], 0, "כתוב 'my father and I run'."),
        q("Who is faster?", "מי מהיר יותר?", ["The writer", "The father", "They are the same", "A friend"], ["הכותב", "האבא", "הם שווים", "חבר"], 0, "כתוב 'I am faster'."),
      ],
    ),
    R(
      "Playing Tennis (משחקים טניס)",
      "My sister and I play tennis on Saturday. She is very good and she plays fast. I try to play well, but it is hard. At the end we say thank you and drink some juice.",
      "אחותי ואני משחקות טניס בשבת. היא טובה מאוד והיא משחקת מהר. אני מנסה לשחק טוב, אבל זה קשה. בסוף אנחנו אומרות תודה ושותות קצת מיץ.",
      [
        g("tennis", "noun", "משחק עם מחבט וכדור", "We play tennis.", "טניס"),
        g("fast", "adverb", "במהירות", "She plays fast.", "מהר"),
        g("juice", "noun", "משקה מפירות", "We drink juice.", "מיץ"),
      ],
      [
        q("When do the sisters play tennis?", "מתי האחיות משחקות טניס?", ["On Saturday", "On Monday", "On Friday", "On Sunday"], ["בשבת", "ביום שני", "ביום שישי", "ביום ראשון"], 0, "כתוב 'on Saturday'."),
        q("What do they do at the end?", "מה הן עושות בסוף?", ["They drink juice", "They go home", "They sleep", "They cook"], ["הן שותות מיץ", "הן הולכות הביתה", "הן ישנות", "הן מבשלות"], 0, "כתוב 'drink some juice'."),
      ],
    ),
    R(
      "The Football Shoes (נעלי הכדורגל)",
      "I need new shoes for football. My old shoes are too small and they have holes. My father takes me to the sports shop. I choose black shoes with a red line on the side.",
      "אני צריך נעליים חדשות לכדורגל. הנעליים הישנות שלי קטנות מדי ויש בהן חורים. אבא שלי לוקח אותי לחנות הספורט. אני בוחר נעליים שחורות עם פס אדום בצד.",
      [
        g("hole", "noun", "פתח קטן", "My shoes have holes.", "חור"),
        g("choose", "verb", "לבחור", "I choose black shoes.", "לבחור"),
        g("line", "noun", "פס", "There is a red line.", "פס"),
      ],
      [
        q("Why does the writer need new shoes?", "למה הכותב צריך נעליים חדשות?", ["The old ones are too small", "They are too big", "They are dirty", "They are red"], ["הישנות קטנות מדי", "הן גדולות מדי", "הן מלוכלכות", "הן אדומות"], 0, "כתוב 'too small'."),
        q("Which shoes does he choose?", "אילו נעליים הוא בוחר?", ["Black with a red line", "White", "Blue", "Green"], ["שחורות עם פס אדום", "לבנות", "כחולות", "ירוקות"], 0, "כתוב 'black shoes with a red line'."),
      ],
    ),
    R(
      "Volleyball on the Beach (כדורעף בחוף)",
      "At the beach we play volleyball. There are three kids on my team. The ball goes over the net and it comes back. The sun is hot, so we stop and swim in the sea.",
      "בחוף אנחנו משחקים כדורעף. יש שלושה ילדים בקבוצה שלי. הכדור עובר מעל הרשת וחוזר. השמש חמה, ולכן אנחנו עוצרים ושוחים בים.",
      [
        g("volleyball", "noun", "משחק כדור מעל רשת", "We play volleyball.", "כדורעף"),
        g("net", "noun", "רשת", "The ball goes over the net.", "רשת"),
        g("team", "noun", "קבוצה", "There are three on my team.", "קבוצה"),
      ],
      [
        q("How many children are on the team?", "כמה ילדים יש בקבוצה?", ["Three", "Five", "Two", "Ten"], ["שלושה", "חמישה", "שניים", "עשרה"], 0, "כתוב 'three kids on my team'."),
        q("Why do they stop?", "למה הם עוצרים?", ["The sun is hot", "It is raining", "They are hungry", "It is late"], ["השמש חמה", "יורד גשם", "הם רעבים", "מאוחר"], 0, "כתוב 'The sun is hot, so we stop'."),
      ],
    ),
    R(
      "The Sports Shop (חנות הספורט)",
      "Near my school there is a big sports shop. It sells balls, shoes, shirts and bikes. I go there every Friday and look at the new things. One day I want a blue bike.",
      "ליד בית הספר שלי יש חנות ספורט גדולה. היא מוכרת כדורים, נעליים, חולצות ואופניים. אני הולך לשם בכל יום שישי ומסתכל על הדברים החדשים. יום אחד אני רוצה אופניים כחולים.",
      [
        g("sell", "verb", "לתת תמורת כסף", "The shop sells balls.", "למכור"),
        g("sport", "noun", "פעילות גופנית", "I love sport.", "ספורט"),
        g("thing", "noun", "חפץ", "I look at the new things.", "דבר"),
      ],
      [
        q("What does the shop sell?", "מה החנות מוכרת?", ["Balls, shoes, shirts and bikes", "Food", "Books", "Toys only"], ["כדורים, נעליים, חולצות ואופניים", "אוכל", "ספרים", "רק צעצועים"], 0, "כתוב 'balls, shoes, shirts and bikes'."),
        q("What does the writer want one day?", "מה הכותב רוצה יום אחד?", ["A blue bike", "A red ball", "A new shirt", "A hat"], ["אופניים כחולים", "כדור אדום", "חולצה חדשה", "כובע"], 0, "כתוב 'I want a blue bike'."),
      ],
    ),
    R(
      "Planting Trees (נוטעים עצים)",
      "In winter our class goes to a hill with small trees. Each child gets a tree. We put it in the ground and give it water. I want it to grow very tall.",
      "בחורף הכיתה שלנו הולכת לגבעה עם עצים קטנים. כל ילד מקבל עץ. אנחנו שמים אותו באדמה ונותנים לו מים. אני רוצה שהוא יגדל גבוה מאוד.",
      [
        g("tree", "noun", "צמח גבוה עם גזע", "I have a small tree.", "עץ"),
        g("ground", "noun", "האדמה", "We put it in the ground.", "אדמה"),
        g("grow", "verb", "להיעשות גדול", "The tree grows.", "לגדול"),
      ],
      [
        q("Where does the class go?", "לאן הכיתה הולכת?", ["To a hill", "To the beach", "To the zoo", "To a museum"], ["לגבעה", "לים", "לגן החיות", "למוזיאון"], 0, "כתוב 'goes to a hill'."),
        q("What does the writer give the tree?", "מה הכותב נותן לעץ?", ["Water", "Food", "A name", "A hat"], ["מים", "אוכל", "שם", "כובע"], 0, "כתוב 'give it water'."),
      ],
    ),
    R(
      "Passover at Grandma's (פסח אצל סבתא)",
      "On Passover all the family goes to Grandma's house. There is a long table with white plates. We read a story and we eat special bread. I am the youngest, so I ask the questions.",
      "בפסח כל המשפחה הולכת לבית של סבתא. יש שולחן ארוך עם צלחות לבנות. אנחנו קוראים סיפור ואוכלים לחם מיוחד. אני הצעיר ביותר, ולכן אני שואל את השאלות.",
      [
        g("Passover", "noun", "חג פסח", "We love Passover.", "פסח"),
        g("special", "adjective", "לא רגיל", "We eat special bread.", "מיוחד"),
        g("youngest", "adjective", "הכי צעיר", "I am the youngest.", "הצעיר ביותר"),
      ],
      [
        q("How is the table?", "איך השולחן?", ["Long with white plates", "Small and brown", "Small and red", "Not there"], ["ארוך עם צלחות לבנות", "קטן וחום", "קטן ואדום", "אין שולחן"], 0, "כתוב 'a long table with white plates'."),
        q("Who asks the questions?", "מי שואל את השאלות?", ["The youngest child", "The grandfather", "The mother", "The teacher"], ["הילד הצעיר ביותר", "הסבא", "האמא", "המורה"], 0, "כתוב 'I am the youngest, so I ask the questions'."),
      ],
    ),
    R(
      "A Fire at Night (מדורה בלילה)",
      "On Lag BaOmer we make a big fire at night. We sit around it with our friends. We eat potatoes and sing songs. The sky is dark and the fire is warm and bright.",
      "בל\"ג בעומר אנחנו עושים מדורה גדולה בלילה. אנחנו יושבים סביבה עם החברים. אנחנו אוכלים תפוחי אדמה ושרים שירים. השמיים חשוכים והמדורה חמה ובהירה.",
      [
        g("fire", "noun", "להבות חמות", "We make a fire.", "אש"),
        g("around", "preposition", "מסביב", "We sit around the fire.", "סביב"),
        g("bright", "adjective", "מאיר מאוד", "The fire is bright.", "בהיר"),
      ],
      [
        q("What do they eat?", "מה הם אוכלים?", ["Potatoes", "Cake", "Rice", "Fish"], ["תפוחי אדמה", "עוגה", "אורז", "דגים"], 0, "כתוב 'We eat potatoes'."),
        q("When do they make the fire?", "מתי הם עושים את המדורה?", ["At night", "In the morning", "At six", "After school"], ["בלילה", "בבוקר", "בשש", "אחרי בית הספר"], 0, "כתוב 'a big fire at night'."),
      ],
    ),
    R(
      "Cheese Cake for Shavuot (עוגת גבינה לשבועות)",
      "On Shavuot my mother makes a cheese cake. She puts cheese, eggs and sugar in a big bowl. I help her. The cake is white and very sweet.",
      "בשבועות אמא שלי מכינה עוגת גבינה. היא שמה גבינה, ביצים וסוכר בקערה גדולה. אני עוזר לה. העוגה לבנה ומתוקה מאוד.",
      [
        g("Shavuot", "noun", "חג שבועות", "We eat cheese on Shavuot.", "שבועות"),
        g("bowl", "noun", "כלי עגול", "She uses a big bowl.", "קערה"),
        g("sugar", "noun", "חומר לבן ומתוק", "She adds sugar.", "סוכר"),
      ],
      [
        q("What does the mother make?", "מה האמא מכינה?", ["A cheese cake", "Soup", "A salad", "Pizza"], ["עוגת גבינה", "מרק", "סלט", "פיצה"], 0, "כתוב 'makes a cheese cake'."),
        q("What does the writer do?", "מה הכותב עושה?", ["He helps his mother", "He sleeps", "He plays", "He reads"], ["הוא עוזר לאמא", "הוא ישן", "הוא משחק", "הוא קורא"], 0, "כתוב 'I help her'."),
      ],
    ),
    R(
      "The Quiet Day (היום השקט)",
      "On Yom Kippur there are no cars on the roads. The streets are very quiet. All the children ride their bikes and play in the middle of the street. In the evening everyone goes home to eat.",
      "ביום כיפור אין מכוניות בכבישים. הרחובות שקטים מאוד. כל הילדים רוכבים על אופניים ומשחקים באמצע הרחוב. בערב כולם הולכים הביתה לאכול.",
      [
        g("road", "noun", "דרך למכוניות", "There are no cars on the road.", "כביש"),
        g("ride", "verb", "לרכוב", "We ride our bikes.", "לרכוב"),
        g("middle", "noun", "אמצע", "We play in the middle.", "אמצע"),
      ],
      [
        q("What is on the roads?", "מה יש בכבישים?", ["No cars", "Many cars", "Buses", "Taxis"], ["אין מכוניות", "הרבה מכוניות", "אוטובוסים", "מוניות"], 0, "כתוב 'no cars on the roads'."),
        q("What do the children do?", "מה הילדים עושים?", ["They ride bikes", "They sleep", "They go to school", "They cook"], ["הם רוכבים על אופניים", "הם ישנים", "הם הולכים לבית הספר", "הם מבשלים"], 0, "כתוב 'ride their bikes'."),
      ],
    ),
    R(
      "A Foggy Morning (בוקר ערפילי)",
      "This morning there is fog outside. I can't see the trees or the road. The bus is slow and the driver turns on the lights. At school the fog goes away and the sun comes out.",
      "הבוקר יש ערפל בחוץ. אני לא רואה את העצים או את הכביש. האוטובוס איטי והנהג מדליק את האורות. בבית הספר הערפל נעלם והשמש יוצאת.",
      [
        g("fog", "noun", "ענן נמוך שמסתיר הכול", "There is fog today.", "ערפל"),
        g("light", "noun", "אור", "The driver turns on the lights.", "אור"),
        g("sun", "noun", "הכוכב שנותן אור ביום", "The sun comes out.", "שמש"),
      ],
      [
        q("What can the writer not see?", "מה הכותב לא רואה?", ["The trees and the road", "The sky", "The school", "The bus"], ["את העצים ואת הכביש", "את השמיים", "את בית הספר", "את האוטובוס"], 0, "כתוב 'I can't see the trees or the road'."),
        q("What happens at school?", "מה קורה בבית הספר?", ["The sun comes out", "It rains", "It snows", "It gets dark"], ["השמש יוצאת", "יורד גשם", "יורד שלג", "נהיה חשוך"], 0, "כתוב 'the sun comes out'."),
      ],
    ),
    R(
      "The Rainbow (הקשת)",
      "After the rain there is a rainbow in the sky. It has red, yellow, green and blue. My little brother runs outside and says, \"Look, look!\" We stand in the yard and watch it until it goes away.",
      "אחרי הגשם יש קשת בשמיים. יש בה אדום, צהוב, ירוק וכחול. אחי הקטן רץ החוצה ואומר: \"תראו, תראו!\" אנחנו עומדים בחצר ומסתכלים עליה עד שהיא נעלמת.",
      [
        g("rainbow", "noun", "קשת צבעונית בשמיים", "There is a rainbow.", "קשת"),
        g("yard", "noun", "שטח ליד הבית", "We stand in the yard.", "חצר"),
        g("watch", "verb", "להסתכל", "We watch the sky.", "להסתכל"),
      ],
      [
        q("When is there a rainbow?", "מתי יש קשת?", ["After the rain", "Before the rain", "At night", "In winter only"], ["אחרי הגשם", "לפני הגשם", "בלילה", "רק בחורף"], 0, "כתוב 'After the rain'."),
        q("What does the little brother do?", "מה האח הקטן עושה?", ["He runs outside", "He sleeps", "He eats", "He draws"], ["הוא רץ החוצה", "הוא ישן", "הוא אוכל", "הוא מצייר"], 0, "כתוב 'runs outside'."),
      ],
    ),
    R(
      "A Day in the Desert (יום במדבר)",
      "We go to the desert for one day. There is sand everywhere, and the sun is very hot. We wear hats and drink a lot of water. In the evening we see a beautiful red sky.",
      "אנחנו נוסעים למדבר ליום אחד. יש חול בכל מקום, והשמש חמה מאוד. אנחנו חובשים כובעים ושותים הרבה מים. בערב אנחנו רואים שמיים אדומים ויפים.",
      [
        g("desert", "noun", "מקום יבש עם חול", "We go to the desert.", "מדבר"),
        g("sand", "noun", "גרגרים קטנים בחוף ובמדבר", "There is sand everywhere.", "חול"),
        g("beautiful", "adjective", "יפה מאוד", "The sky is beautiful.", "יפה"),
      ],
      [
        q("What is everywhere in the desert?", "מה יש בכל מקום במדבר?", ["Sand", "Trees", "Water", "Snow"], ["חול", "עצים", "מים", "שלג"], 0, "כתוב 'There is sand everywhere'."),
        q("What do they see in the evening?", "מה הם רואים בערב?", ["A beautiful red sky", "A big lake", "Many birds", "A green field"], ["שמיים אדומים ויפים", "אגם גדול", "הרבה ציפורים", "שדה ירוק"], 0, "כתוב 'a beautiful red sky'."),
      ],
    ),
    R(
      "The Sea at Night (הים בלילה)",
      "One night we walk on the beach. The sea is dark and quiet. The moon is bright and the stars are everywhere. I take off my shoes and put my feet in the cold water.",
      "בלילה אחד אנחנו הולכים בחוף. הים חשוך ושקט. הירח בהיר והכוכבים בכל מקום. אני מוריד את הנעליים ומכניס את הרגליים למים הקרים.",
      [
        g("beach", "noun", "מקום עם חול ליד הים", "We walk on the beach.", "חוף"),
        g("dark", "adjective", "בלי אור", "The sea is dark.", "חשוך"),
        g("feet", "noun", "הרגליים", "I put my feet in the water.", "כפות רגליים"),
      ],
      [
        q("How is the sea at night?", "איך הים בלילה?", ["Dark and quiet", "Hot and big", "Green and warm", "Small"], ["חשוך ושקט", "חם וגדול", "ירוק וחם", "קטן"], 0, "כתוב 'dark and quiet'."),
        q("What does the writer do with the shoes?", "מה הכותב עושה עם הנעליים?", ["He takes them off", "He loses them", "He washes them", "He sells them"], ["הוא מוריד אותן", "הוא מאבד אותן", "הוא שוטף אותן", "הוא מוכר אותן"], 0, "כתוב 'I take off my shoes'."),
      ],
    ),
    R(
      "Flowers for Mom (פרחים לאמא)",
      "On Mother's Day I get up early. In the garden I pick red and yellow flowers. I put them in a vase with water. My mother sees them and says, \"They are beautiful. Thank you!\"",
      "ביום האם אני קם מוקדם. בגינה אני קוטף פרחים אדומים וצהובים. אני שם אותם באגרטל עם מים. אמא שלי רואה אותם ואומרת: \"הם יפים. תודה!\"",
      [
        g("vase", "noun", "כלי לפרחים", "I put the flowers in a vase.", "אגרטל"),
        g("pick", "verb", "לקטוף", "I pick flowers.", "לקטוף"),
        g("early", "adverb", "לפני הזמן הרגיל", "I get up early.", "מוקדם"),
      ],
      [
        q("What does the writer pick?", "מה הכותב קוטף?", ["Red and yellow flowers", "Apples", "Lemons", "Leaves"], ["פרחים אדומים וצהובים", "תפוחים", "לימונים", "עלים"], 0, "כתוב 'red and yellow flowers'."),
        q("Where does he put them?", "איפה הוא שם אותם?", ["In a vase", "In a box", "On the floor", "In a bag"], ["באגרטל", "בקופסה", "על הרצפה", "בתיק"], 0, "כתוב 'in a vase with water'."),
      ],
    ),
    R(
      "The Toy Shop (חנות הצעצועים)",
      "In the town there is a small toy shop. In the window there are dolls, cars and a big white teddy bear. I stop and look every day. One day my father buys me a little red car.",
      "בעיירה יש חנות צעצועים קטנה. בחלון יש בובות, מכוניות ודובי לבן גדול. אני עוצר ומסתכל בכל יום. יום אחד אבא שלי קונה לי מכונית אדומה קטנה.",
      [
        g("toy", "noun", "דבר לשחק בו", "I look at the toys.", "צעצוע"),
        g("window", "noun", "חלון חנות", "The toys are in the window.", "חלון"),
        g("stop", "verb", "לעצור", "I stop and look.", "לעצור"),
      ],
      [
        q("What is in the window?", "מה יש בחלון?", ["Dolls, cars and a teddy bear", "Shoes", "Books", "Food"], ["בובות, מכוניות ודובי", "נעליים", "ספרים", "אוכל"], 0, "כתוב 'dolls, cars and a big white teddy bear'."),
        q("What does the father buy?", "מה האבא קונה?", ["A little red car", "A doll", "A teddy bear", "A ball"], ["מכונית אדומה קטנה", "בובה", "דובי", "כדור"], 0, "כתוב 'a little red car'."),
      ],
    ),
    R(
      "The Bookshop (חנות הספרים)",
      "I love the old bookshop near my house. It is small and it smells of paper. The man at the shop knows me. He always finds a good story for me, and he never says no.",
      "אני אוהב את חנות הספרים הישנה ליד הבית שלי. היא קטנה והיא מריחה כמו נייר. האיש בחנות מכיר אותי. הוא תמיד מוצא לי סיפור טוב, ואף פעם לא אומר לא.",
      [
        g("bookshop", "noun", "חנות שמוכרת ספרים", "I love the bookshop.", "חנות ספרים"),
        g("paper", "noun", "חומר לכתיבה", "It smells of paper.", "נייר"),
        g("story", "noun", "מה שמספרים או קוראים", "He finds a good story.", "סיפור"),
      ],
      [
        q("How is the bookshop?", "איך חנות הספרים?", ["Small and old", "Big and new", "Very cold", "Very big"], ["קטנה וישנה", "גדולה וחדשה", "קרה מאוד", "גדולה מאוד"], 0, "כתוב 'old bookshop' ו-'small'."),
        q("What does the man always find?", "מה האיש תמיד מוצא?", ["A good story", "A toy", "A hat", "A pen"], ["סיפור טוב", "צעצוע", "כובע", "עט"], 0, "כתוב 'He always finds a good story'."),
      ],
    ),
    R(
      "At the Cafe (בבית הקפה)",
      "On Saturday my mother and I go to a small cafe. She drinks coffee and I drink orange juice. We share a piece of chocolate cake. We talk about my school and her work.",
      "בשבת אמא שלי ואני הולכות לבית קפה קטן. היא שותה קפה ואני שותה מיץ תפוזים. אנחנו חולקות חתיכת עוגת שוקולד. אנחנו מדברות על בית הספר שלי ועל העבודה שלה.",
      [
        g("cafe", "noun", "מקום לשתות ולאכול", "We go to a cafe.", "בית קפה"),
        g("coffee", "noun", "משקה חם וחום", "She drinks coffee.", "קפה"),
        g("share", "verb", "לחלוק", "We share a cake.", "לחלוק"),
      ],
      [
        q("What does the writer drink?", "מה הכותבת שותה?", ["Orange juice", "Coffee", "Tea", "Milk"], ["מיץ תפוזים", "קפה", "תה", "חלב"], 0, "כתוב 'I drink orange juice'."),
        q("What do they share?", "מה הן חולקות?", ["A piece of chocolate cake", "A sandwich", "A salad", "A cookie"], ["חתיכת עוגת שוקולד", "כריך", "סלט", "עוגייה"], 0, "כתוב 'a piece of chocolate cake'."),
      ],
    ),
    R(
      "At the Hotel (במלון)",
      "We stay at a hotel by the sea for two nights. Our room is on the second floor and it has a big window. In the morning we eat breakfast in the restaurant. In the afternoon we swim in the pool.",
      "אנחנו נשארים במלון ליד הים לשני לילות. החדר שלנו בקומה השנייה ויש בו חלון גדול. בבוקר אנחנו אוכלים ארוחת בוקר במסעדה. אחר הצהריים אנחנו שוחים בבריכה.",
      [
        g("hotel", "noun", "מקום לישון בו בנסיעה", "We stay at a hotel.", "מלון"),
        g("night", "noun", "הזמן שחשוך", "We stay for two nights.", "לילה"),
        g("restaurant", "noun", "מקום לאכול בו", "We eat in the restaurant.", "מסעדה"),
      ],
      [
        q("How long do they stay?", "כמה זמן הם נשארים?", ["Two nights", "One week", "One night", "A month"], ["שני לילות", "שבוע", "לילה אחד", "חודש"], 0, "כתוב 'for two nights'."),
        q("Where do they eat breakfast?", "איפה הם אוכלים ארוחת בוקר?", ["In the restaurant", "In the room", "On the beach", "At home"], ["במסעדה", "בחדר", "בחוף", "בבית"], 0, "כתוב 'in the restaurant'."),
      ],
    ),
    R(
      "The Bus Station (תחנת האוטובוסים)",
      "The bus station in our city is big and busy. There are many buses and a lot of people with bags. I look for bus number nine and wait near the door. At last it comes and I go home.",
      "תחנת האוטובוסים בעיר שלנו גדולה ועמוסה. יש הרבה אוטובוסים והרבה אנשים עם תיקים. אני מחפש את אוטובוס מספר תשע וממתין ליד הדלת. סוף סוף הוא מגיע ואני חוזר הביתה.",
      [
        g("station", "noun", "מקום שאוטובוסים או רכבות עוצרים בו", "The station is busy.", "תחנה"),
        g("busy", "adjective", "עם הרבה אנשים או עבודה", "The station is busy.", "עמוס"),
        g("wait", "verb", "להישאר עד שמשהו קורה", "I wait near the door.", "לחכות"),
      ],
      [
        q("Which bus does the writer look for?", "איזה אוטובוס הכותב מחפש?", ["Number nine", "Number five", "Number two", "Number ten"], ["מספר תשע", "מספר חמש", "מספר שתיים", "מספר עשר"], 0, "כתוב 'bus number nine'."),
        q("How is the station?", "איך התחנה?", ["Big and busy", "Small and quiet", "Closed", "Dark"], ["גדולה ועמוסה", "קטנה ושקטה", "סגורה", "חשוכה"], 0, "כתוב 'big and busy'."),
      ],
    ),
    R(
      "The Dog in the Park (הכלב בפארק)",
      "Every afternoon I take my dog to the park. He runs after a ball and brings it back to me. Sometimes he meets another dog and they play together. At six o'clock we go home, tired and happy.",
      "בכל אחר צהריים אני לוקח את הכלב שלי לפארק. הוא רץ אחרי כדור ומחזיר לי אותו. לפעמים הוא פוגש כלב אחר והם משחקים ביחד. בשש אנחנו חוזרים הביתה, עייפים ושמחים.",
      [
        g("after", "preposition", "מאחורי, בעקבות", "He runs after a ball.", "אחרי"),
        g("bring", "verb", "להביא", "He brings the ball back.", "להביא"),
        g("meet", "verb", "להיפגש", "He meets another dog.", "לפגוש"),
      ],
      [
        q("What does the dog run after?", "אחרי מה הכלב רץ?", ["A ball", "A cat", "A bird", "A bike"], ["כדור", "חתול", "ציפור", "אופניים"], 0, "כתוב 'runs after a ball'."),
        q("What time do they go home?", "באיזו שעה הם חוזרים הביתה?", ["At six", "At four", "At two", "At nine"], ["בשש", "בארבע", "בשתיים", "בתשע"], 0, "כתוב 'At six o'clock'."),
      ],
    ),
    R(
      "Grandpa's Horse (הסוס של סבא)",
      "My grandfather has a brown horse on his farm. Its name is Star. Every summer he lets me ride it around the field. I hold on tight and Grandpa walks next to me.",
      "לסבא שלי יש סוס חום בחווה. קוראים לו כוכב. בכל קיץ הוא נותן לי לרכוב עליו סביב השדה. אני נאחז חזק וסבא הולך לידי.",
      [
        g("horse", "noun", "חיה גדולה שרוכבים עליה", "He has a horse.", "סוס"),
        g("field", "noun", "שטח פתוח", "We ride around the field.", "שדה"),
        g("tight", "adverb", "חזק", "I hold on tight.", "חזק"),
      ],
      [
        q("What color is the horse?", "באיזה צבע הסוס?", ["Brown", "White", "Black", "Gray"], ["חום", "לבן", "שחור", "אפור"], 0, "כתוב 'a brown horse'."),
        q("When does the writer ride the horse?", "מתי הכותב רוכב על הסוס?", ["Every summer", "Every winter", "Every night", "Every Friday"], ["בכל קיץ", "בכל חורף", "בכל לילה", "בכל יום שישי"], 0, "כתוב 'Every summer'."),
      ],
    ),
    R(
      "The Snake at the Zoo (הנחש בגן החיות)",
      "At the zoo I see a big green snake. It lies on a branch. My sister is afraid and she holds my hand. The man says, \"Do not be afraid, it is sleeping.\"",
      "בגן החיות אני רואה נחש ירוק גדול. הוא שוכב על ענף. אחותי מפחדת והיא מחזיקה לי את היד. האיש אומר: \"אל תפחדו, הוא ישן.\"",
      [
        g("snake", "noun", "חיה ארוכה בלי רגליים", "I see a snake.", "נחש"),
        g("branch", "noun", "חלק של עץ", "It lies on a branch.", "ענף"),
        g("afraid", "adjective", "מפחד", "She is afraid.", "מפחד"),
      ],
      [
        q("What is the snake like?", "איך הנחש?", ["Big and green", "Small and red", "Big and black", "Small and brown"], ["גדול וירוק", "קטן ואדום", "גדול ושחור", "קטן וחום"], 0, "כתוב 'a big green snake'."),
        q("Why does the man say do not be afraid?", "למה האיש אומר אל תפחדו?", ["The snake is sleeping", "The snake is old", "The snake is small", "The snake is a toy"], ["הנחש ישן", "הנחש זקן", "הנחש קטן", "הנחש הוא צעצוע"], 0, "כתוב 'it is sleeping'."),
      ],
    ),
    R(
      "The Cow on the Farm (הפרה בחווה)",
      "At the farm there is a big black and white cow. In the morning the farmer takes milk from her. The milk is warm. We drink a glass of milk and it is very good.",
      "בחווה יש פרה גדולה בשחור ולבן. בבוקר החקלאי לוקח ממנה חלב. החלב חם. אנחנו שותים כוס חלב והוא טוב מאוד.",
      [
        g("cow", "noun", "חיה שנותנת חלב", "The cow gives milk.", "פרה"),
        g("farmer", "noun", "אדם שעובד בחווה", "The farmer is kind.", "חקלאי"),
        g("glass", "noun", "כוס שקופה", "We drink a glass of milk.", "כוס"),
      ],
      [
        q("What does the farmer take from the cow?", "מה החקלאי לוקח מהפרה?", ["Milk", "Eggs", "Water", "Bread"], ["חלב", "ביצים", "מים", "לחם"], 0, "כתוב 'takes milk from her'."),
        q("How is the milk?", "איך החלב?", ["Warm", "Cold", "Bad", "Green"], ["חם", "קר", "רע", "ירוק"], 0, "כתוב 'The milk is warm'."),
      ],
    ),
    R(
      "Cards with Grandpa (קלפים עם סבא)",
      "On Saturday afternoon I play cards with my grandfather. He teaches me a new game. He wins the first game and I win the second. We both laugh and drink tea.",
      "בשבת אחר הצהריים אני משחק קלפים עם סבא שלי. הוא מלמד אותי משחק חדש. הוא מנצח במשחק הראשון ואני מנצח בשני. שנינו צוחקים ושותים תה.",
      [
        g("card", "noun", "קלף למשחק", "We play cards.", "קלף"),
        g("win", "verb", "לנצח", "I win the second game.", "לנצח"),
        g("teach", "verb", "ללמד", "He teaches me a game.", "ללמד"),
      ],
      [
        q("What do they play?", "במה הם משחקים?", ["Cards", "Football", "Tennis", "Basketball"], ["קלפים", "כדורגל", "טניס", "כדורסל"], 0, "כתוב 'play cards'."),
        q("Who wins the second game?", "מי מנצח במשחק השני?", ["The writer", "The grandfather", "The mother", "A friend"], ["הכותב", "הסבא", "האמא", "חבר"], 0, "כתוב 'I win the second'."),
      ],
    ),
    R(
      "My Photo Album (אלבום התמונות שלי)",
      "I have an old photo album. It has pictures of my parents when they were young. My mother has long hair and my father is very thin. I look at the album and I laugh a lot.",
      "יש לי אלבום תמונות ישן. יש בו תמונות של ההורים שלי כשהיו צעירים. לאמא שלי יש שיער ארוך ואבא שלי רזה מאוד. אני מסתכל באלבום וצוחק הרבה.",
      [
        g("album", "noun", "ספר לתמונות", "I look at the album.", "אלבום"),
        g("thin", "adjective", "לא שמן", "My father is thin.", "רזה"),
        g("young", "adjective", "לא זקן", "They are young in the photos.", "צעיר"),
      ],
      [
        q("Whose pictures are in the album?", "של מי התמונות באלבום?", ["The writer's parents", "The writer's friends", "The teacher", "Animals"], ["ההורים של הכותב", "החברים של הכותב", "המורה", "חיות"], 0, "כתוב 'pictures of my parents'."),
        q("What does the writer do?", "מה הכותב עושה?", ["He laughs a lot", "He cries", "He sleeps", "He cooks"], ["הוא צוחק הרבה", "הוא בוכה", "הוא ישן", "הוא מבשל"], 0, "כתוב 'I laugh a lot'."),
      ],
    ),
    R(
      "Singing in the Shower (שרים במקלחת)",
      "Every morning I sing in the shower. The water is warm and my voice sounds very good. My brother comes to the door and says, \"Please stop!\" I only sing more.",
      "בכל בוקר אני שר במקלחת. המים חמימים והקול שלי נשמע טוב מאוד. אחי בא אל הדלת ואומר: \"בבקשה תפסיק!\" אני רק שר עוד.",
      [
        g("shower", "noun", "מקום להתרחץ בו", "I sing in the shower.", "מקלחת"),
        g("voice", "noun", "הקול של אדם", "My voice sounds very good.", "קול"),
        g("sound", "verb", "להישמע", "My voice sounds very good.", "להישמע"),
      ],
      [
        q("Where does the writer sing?", "איפה הכותב שר?", ["In the shower", "In the kitchen", "At school", "In the park"], ["במקלחת", "במטבח", "בבית הספר", "בפארק"], 0, "כתוב 'I sing in the shower'."),
        q("What does the brother say?", "מה האח אומר?", ["Please stop!", "Sing more!", "Hello!", "Good night!"], ["בבקשה תפסיק!", "תשיר עוד!", "שלום!", "לילה טוב!"], 0, "כתוב 'Please stop!'."),
      ],
    ),
    R(
      "Building with Blocks (בונים מקוביות)",
      "My little cousin and I build a tower with blocks. We put red blocks at the bottom and blue blocks on top. The tower is as tall as a chair. Then the tower comes down and we both laugh.",
      "בן הדוד הקטן שלי ואני בונים מגדל מקוביות. אנחנו שמים קוביות אדומות למטה וקוביות כחולות למעלה. המגדל גבוה כמו כיסא. ואז המגדל נופל ושנינו צוחקים.",
      [
        g("block", "noun", "קובייה לבנייה", "We build with blocks.", "קובייה"),
        g("tower", "noun", "בניין גבוה וצר", "We build a tower.", "מגדל"),
        g("bottom", "noun", "החלק התחתון", "Red blocks are at the bottom.", "תחתית"),
      ],
      [
        q("Which blocks are at the bottom?", "אילו קוביות למטה?", ["Red blocks", "Blue blocks", "Green blocks", "White blocks"], ["אדומות", "כחולות", "ירוקות", "לבנות"], 0, "כתוב 'red blocks at the bottom'."),
        q("What happens at the end?", "מה קורה בסוף?", ["The tower comes down", "They go home", "They eat", "They sleep"], ["המגדל נופל", "הם הולכים הביתה", "הם אוכלים", "הם ישנים"], 0, "כתוב 'the tower comes down'."),
      ],
    ),
    R(
      "Waking Up Late (קמים מאוחר)",
      "Today I wake up late. The clock says eight and school starts at eight! I wash my face and put on my clothes very fast. I do not eat breakfast and I run to the bus stop.",
      "היום אני מתעורר מאוחר. השעון אומר שמונה ובית הספר מתחיל בשמונה! אני שוטף פנים ולובש בגדים מהר מאוד. אני לא אוכל ארוחת בוקר ורץ לתחנת האוטובוס.",
      [
        g("clothes", "noun", "בגדים", "I put on my clothes.", "בגדים"),
        g("fast", "adverb", "מהר", "I dress fast.", "מהר"),
        g("wake up", "verb", "להפסיק לישון", "I wake up late.", "להתעורר"),
      ],
      [
        q("What time does school start?", "באיזו שעה בית הספר מתחיל?", ["At eight", "At nine", "At seven", "At ten"], ["בשמונה", "בתשע", "בשבע", "בעשר"], 0, "כתוב 'school starts at eight'."),
        q("Does the writer eat breakfast?", "האם הכותב אוכל ארוחת בוקר?", ["No, he runs to the bus stop", "Yes, a big one", "Yes, a small one", "He eats at school"], ["לא, הוא רץ לתחנה", "כן, גדולה", "כן, קטנה", "הוא אוכל בבית הספר"], 0, "כתוב 'I do not eat breakfast'."),
      ],
    ),
    R(
      "Washing the Dishes (שוטפים כלים)",
      "After dinner it is my turn to wash the dishes. I put soap on the plates and wash them with warm water. My sister dries them with a towel. Then we put everything back on the shelf.",
      "אחרי ארוחת הערב התור שלי לשטוף כלים. אני שם סבון על הצלחות ושוטף אותן במים חמימים. אחותי מייבשת אותן עם מגבת. אחר כך אנחנו מחזירים הכול למדף.",
      [
        g("dish", "noun", "צלחת, כוס או סיר", "I wash the dishes.", "כלי"),
        g("dry", "verb", "להוריד את המים", "She dries the plates.", "לייבש"),
        g("towel", "noun", "בד לייבוש", "She uses a towel.", "מגבת"),
      ],
      [
        q("Who dries the plates?", "מי מייבשת את הצלחות?", ["The sister", "The writer", "The mother", "The father"], ["האחות", "הכותב", "האמא", "האבא"], 0, "כתוב 'My sister dries them'."),
        q("Where do they put the dishes?", "איפה הם שמים את הכלים?", ["On the shelf", "In the bag", "On the floor", "In the garden"], ["על המדף", "בתיק", "על הרצפה", "בגינה"], 0, "כתוב 'back on the shelf'."),
      ],
    ),
  ],
};

// --- LISTENING -------------------------------------------------------------
export const MORE_LISTENINGS12 = {
  A1: [
    L(
      "Hello, it is Grandma. Come to my house on Friday for dinner. Please bring some bread. I make chicken soup and rice. Tell your mother and father. See you soon, my dear!",
      "שלום, זאת סבתא. בואו אליי הביתה ביום שישי לארוחת ערב. בבקשה תביאו קצת לחם. אני מכינה מרק עוף ואורז. תגידו לאמא ולאבא. נתראה בקרוב, יקירים!",
      [
        q("When must they come?", "מתי הם צריכים לבוא?", ["On Friday", "On Monday", "On Sunday", "Tomorrow"], ["ביום שישי", "ביום שני", "ביום ראשון", "מחר"], 0, "נאמר 'on Friday for dinner'."),
        q("What must they bring?", "מה הם צריכים להביא?", ["Some bread", "Some milk", "A cake", "A gift"], ["קצת לחם", "קצת חלב", "עוגה", "מתנה"], 0, "נאמר 'Please bring some bread'."),
      ],
    ),
    L(
      "Welcome to the zoo. On your right you can see the monkeys. They like bananas and they play all day. On your left there are two big elephants. Please do not run.",
      "ברוכים הבאים לגן החיות. מימין אפשר לראות את הקופים. הם אוהבים בננות והם משחקים כל היום. משמאל יש שני פילים גדולים. בבקשה אל תרוצו.",
      [
        q("What can you see on the right?", "מה אפשר לראות מימין?", ["The monkeys", "The elephants", "The lions", "The birds"], ["את הקופים", "את הפילים", "את האריות", "את הציפורים"], 0, "נאמר 'On your right you can see the monkeys'."),
        q("What do the monkeys like?", "מה הקופים אוהבים?", ["Bananas", "Apples", "Bread", "Fish"], ["בננות", "תפוחים", "לחם", "דגים"], 0, "נאמר 'They like bananas'."),
      ],
    ),
    L(
      "Hello, everyone. A little girl in a red coat is at the information desk. She is five years old. Her mother, please come and take her. Thank you.",
      "שלום לכולם. ילדה קטנה במעיל אדום נמצאת בדלפק המידע. היא בת חמש. אמה מתבקשת לבוא ולקחת אותה. תודה.",
      [
        q("What does the girl wear?", "מה הילדה לובשת?", ["A red coat", "A blue hat", "A green dress", "Black shoes"], ["מעיל אדום", "כובע כחול", "שמלה ירוקה", "נעליים שחורות"], 0, "נאמר 'a red coat'."),
        q("How old is she?", "בת כמה היא?", ["Five", "Three", "Eight", "Ten"], ["חמש", "שלוש", "שמונה", "עשר"], 0, "נאמר 'five years old'."),
      ],
    ),
    L(
      "Hello, is this the pizza shop? I want one big pizza with cheese and tomatoes. No onions, please. It is for the house on Green Street. How long? Twenty minutes? Okay. Thank you.",
      "שלום, זאת חנות הפיצה? אני רוצה פיצה גדולה אחת עם גבינה ועגבניות. בלי בצל, בבקשה. זה לבית ברחוב הירוק. כמה זמן? עשרים דקות? בסדר. תודה.",
      [
        q("What does the person want?", "מה האדם רוצה?", ["A big pizza with cheese and tomatoes", "A small pizza", "A salad", "Soup"], ["פיצה גדולה עם גבינה ועגבניות", "פיצה קטנה", "סלט", "מרק"], 0, "נאמר 'one big pizza with cheese and tomatoes'."),
        q("What does the person not want on the pizza?", "מה האדם לא רוצה על הפיצה?", ["Onions", "Cheese", "Tomatoes", "Salt"], ["בצל", "גבינה", "עגבניות", "מלח"], 0, "נאמר 'No onions, please'."),
      ],
    ),
    L(
      "Good morning, class. Tomorrow is a holiday, so we have no school. Have a good day at home. Read a book, play with your family and come back on Sunday. Happy holiday!",
      "בוקר טוב, כיתה. מחר חג, ולכן אין לימודים. שיהיה לכם יום טוב בבית. קראו ספר, שחקו עם המשפחה וחזרו ביום ראשון. חג שמח!",
      [
        q("Why is there no school tomorrow?", "למה אין לימודים מחר?", ["It is a holiday", "It is raining", "The teacher is sick", "It is Friday"], ["זה חג", "יורד גשם", "המורה חולה", "זה יום שישי"], 0, "נאמר 'Tomorrow is a holiday'."),
        q("When do they come back?", "מתי הם חוזרים?", ["On Sunday", "On Monday", "On Friday", "Tomorrow"], ["ביום ראשון", "ביום שני", "ביום שישי", "מחר"], 0, "נאמר 'come back on Sunday'."),
      ],
    ),
    L(
      "Come to the new toy shop! We have dolls, cars, balls and teddy bears. Every toy is cheap this week. We are open every day from nine to six. Bring your mother and father!",
      "בואו לחנות הצעצועים החדשה! יש לנו בובות, מכוניות, כדורים ודובונים. כל צעצוע זול השבוע. אנחנו פתוחים כל יום מתשע עד שש. הביאו את אמא ואבא!",
      [
        q("What is cheap this week?", "מה זול השבוע?", ["Every toy", "Only balls", "Only dolls", "Nothing"], ["כל צעצוע", "רק כדורים", "רק בובות", "שום דבר"], 0, "נאמר 'Every toy is cheap this week'."),
        q("When is the shop open?", "מתי החנות פתוחה?", ["From nine to six", "From two to four", "From six to nine", "Only on Friday"], ["מתשע עד שש", "משתיים עד ארבע", "משש עד תשע", "רק ביום שישי"], 0, "נאמר 'from nine to six'."),
      ],
    ),
    L(
      "Let's make orange juice. Take three big oranges and cut them in half. Put the juice from each half in a glass. Add some ice and a little sugar. It is cold and sweet!",
      "בואו נכין מיץ תפוזים. קחו שלושה תפוזים גדולים וחתכו אותם לחצאים. שימו את המיץ מכל חצי בכוס. הוסיפו קרח וקצת סוכר. הוא קר ומתוק!",
      [
        q("How many oranges do you take?", "כמה תפוזים לוקחים?", ["Three", "Two", "Five", "One"], ["שלושה", "שניים", "חמישה", "אחד"], 0, "נאמר 'three big oranges'."),
        q("What do you add?", "מה מוסיפים?", ["Ice and a little sugar", "Milk", "Salt", "Water only"], ["קרח וקצת סוכר", "חלב", "מלח", "רק מים"], 0, "נאמר 'some ice and a little sugar'."),
      ],
    ),
    L(
      "To get to the hotel, go straight for two minutes. Turn left at the school. The hotel is a tall white building on the right. It has a red door.",
      "כדי להגיע למלון, לכו ישר שתי דקות. פנו שמאלה ליד בית הספר. המלון הוא בניין לבן גבוה מימין. יש לו דלת אדומה.",
      [
        q("Where must you turn left?", "איפה צריך לפנות שמאלה?", ["At the school", "At the shop", "At the park", "At the station"], ["ליד בית הספר", "ליד החנות", "ליד הפארק", "ליד התחנה"], 0, "נאמר 'Turn left at the school'."),
        q("What is red?", "מה אדום?", ["The door", "The roof", "The window", "The wall"], ["הדלת", "הגג", "החלון", "הקיר"], 0, "נאמר 'It has a red door'."),
      ],
    ),
    L(
      "Dear Aunt, thank you very much for the gift. The blue shirt is beautiful and it is my size. I wear it every day. I love you. Please come and visit us soon. Goodbye!",
      "דודה יקרה, תודה רבה על המתנה. החולצה הכחולה יפה והיא במידה שלי. אני לובש אותה כל יום. אני אוהב אותך. בבקשה בואי לבקר אותנו בקרוב. להתראות!",
      [
        q("What is the gift?", "מהי המתנה?", ["A blue shirt", "A red hat", "A new bag", "A watch"], ["חולצה כחולה", "כובע אדום", "תיק חדש", "שעון"], 0, "נאמר 'The blue shirt is beautiful'."),
        q("When does the speaker wear it?", "מתי הדובר לובש אותה?", ["Every day", "On Friday", "Never", "At night"], ["כל יום", "ביום שישי", "אף פעם", "בלילה"], 0, "נאמר 'I wear it every day'."),
      ],
    ),
    L(
      "I am very sorry I am late. The bus did not come. I waited at the stop for half an hour. Now I run to your house. Please wait for me. I come in five minutes. Sorry again!",
      "אני מצטער מאוד שאני מאחר. האוטובוס לא הגיע. חיכיתי בתחנה חצי שעה. עכשיו אני רץ אליכם הביתה. בבקשה חכו לי. אני מגיע בעוד חמש דקות. סליחה שוב!",
      [
        q("Why is the speaker late?", "למה הדובר מאחר?", ["The bus did not come", "He is sick", "He forgot his key", "He is tired"], ["האוטובוס לא הגיע", "הוא חולה", "הוא שכח מפתח", "הוא עייף"], 0, "נאמר 'The bus did not come'."),
        q("When does he come?", "מתי הוא מגיע?", ["In five minutes", "In one hour", "Tomorrow", "In half an hour"], ["בעוד חמש דקות", "בעוד שעה", "מחר", "בעוד חצי שעה"], 0, "נאמר 'I come in five minutes'."),
      ],
    ),
    L(
      "Hello, everyone. The school bus leaves at two o'clock from the big door. Please stand in a line. Do not run. The driver waits for everyone. Have a good trip home.",
      "שלום לכולם. אוטובוס בית הספר יוצא בשתיים מהדלת הגדולה. בבקשה עמדו בשורה. אל תרוצו. הנהג ממתין לכולם. נסיעה טובה הביתה.",
      [
        q("When does the bus leave?", "מתי האוטובוס יוצא?", ["At two o'clock", "At four o'clock", "At six o'clock", "At nine o'clock"], ["בשתיים", "בארבע", "בשש", "בתשע"], 0, "נאמר 'leaves at two o'clock'."),
        q("How must they stand?", "איך הם צריכים לעמוד?", ["In a line", "In a circle", "Near the door", "In the street"], ["בשורה", "במעגל", "ליד הדלת", "ברחוב"], 0, "נאמר 'stand in a line'."),
      ],
    ),
    L(
      "Hello, this is room six. Can you bring two towels, please? We also need some water. Thank you very much. No, we do not need anything else. Goodbye.",
      "שלום, זה חדר שש. אפשר להביא שתי מגבות, בבקשה? אנחנו צריכים גם קצת מים. תודה רבה. לא, אנחנו לא צריכים שום דבר אחר. להתראות.",
      [
        q("What is the room number?", "מה מספר החדר?", ["Six", "Two", "Ten", "Nine"], ["שש", "שניים", "עשר", "תשע"], 0, "נאמר 'this is room six'."),
        q("What do they ask for?", "מה הם מבקשים?", ["Two towels and some water", "Food", "A key", "A phone"], ["שתי מגבות וקצת מים", "אוכל", "מפתח", "טלפון"], 0, "נאמר 'two towels' ו-'some water'."),
      ],
    ),
    L(
      "This is my grandmother. She is seventy years old, but she is very strong. She has white hair and a warm smile. Every day she walks in the park. She makes the best cakes.",
      "זאת סבתא שלי. היא בת שבעים, אבל היא חזקה מאוד. יש לה שיער לבן וחיוך חם. בכל יום היא הולכת בפארק. היא מכינה את העוגות הכי טובות.",
      [
        q("What does the grandmother do every day?", "מה הסבתא עושה בכל יום?", ["She walks in the park", "She swims", "She works", "She sleeps"], ["היא הולכת בפארק", "היא שוחה", "היא עובדת", "היא ישנה"], 0, "נאמר 'she walks in the park'."),
        q("What does she make well?", "מה היא מכינה טוב?", ["Cakes", "Soup", "Salad", "Bread"], ["עוגות", "מרק", "סלט", "לחם"], 0, "נאמר 'the best cakes'."),
      ],
    ),
    L(
      "My school is big and old. It has two floors and a large yard. There is a library and a small garden. I have twenty classmates. I like my school very much.",
      "בית הספר שלי גדול וישן. יש בו שתי קומות וחצר רחבה. יש ספרייה וגינה קטנה. יש לי עשרים חברים לכיתה. אני אוהב מאוד את בית הספר שלי.",
      [
        q("How many floors does the school have?", "כמה קומות יש לבית הספר?", ["Two", "One", "Three", "Five"], ["שתיים", "אחת", "שלוש", "חמש"], 0, "נאמר 'two floors'."),
        q("What is in the school?", "מה יש בבית הספר?", ["A library and a garden", "A pool", "A cinema", "A shop"], ["ספרייה וגינה", "בריכה", "קולנוע", "חנות"], 0, "נאמר 'a library and a small garden'."),
      ],
    ),
    L(
      "This is my Wednesday. I get up at seven. School starts at eight and ends at one. After school I do my homework. At four I play football. At eight I go to bed.",
      "זה יום רביעי שלי. אני קם בשבע. בית הספר מתחיל בשמונה ונגמר באחת. אחרי בית הספר אני עושה שיעורי בית. בארבע אני משחק כדורגל. בשמונה אני הולך לישון.",
      [
        q("When does school end?", "מתי בית הספר נגמר?", ["At one", "At eight", "At four", "At seven"], ["באחת", "בשמונה", "בארבע", "בשבע"], 0, "נאמר 'ends at one'."),
        q("What does he do at four?", "מה הוא עושה בארבע?", ["He plays football", "He does homework", "He goes to bed", "He eats"], ["הוא משחק כדורגל", "הוא עושה שיעורי בית", "הוא הולך לישון", "הוא אוכל"], 0, "נאמר 'At four I play football'."),
      ],
    ),
    L(
      "Good work, team! That was a good game. We did not win, but we played well. Go home and drink a lot of water. Practice is on Tuesday at five. Do not be late. Goodbye!",
      "עבודה טובה, קבוצה! זה היה משחק טוב. לא ניצחנו, אבל שיחקנו יפה. לכו הביתה ושתו הרבה מים. האימון ביום שלישי בחמש. אל תאחרו. להתראות!",
      [
        q("What happens in the game?", "מה קרה במשחק?", ["The team does not win", "The team wins", "It is hot", "It is cold"], ["הקבוצה לא מנצחת", "הקבוצה מנצחת", "חם", "קר"], 0, "נאמר 'We did not win, but we played well'."),
        q("When is the next practice?", "מתי האימון הבא?", ["On Tuesday at five", "On Monday at four", "On Friday at six", "Tomorrow"], ["ביום שלישי בחמש", "ביום שני בארבע", "ביום שישי בשש", "מחר"], 0, "נאמר 'on Tuesday at five'."),
      ],
    ),
    L(
      "The museum is open from nine to five, Sunday to Friday. On Saturday it is closed. Tickets are four dollars for kids. You can take photos. Have a good visit.",
      "המוזיאון פתוח מתשע עד חמש, מיום ראשון עד יום שישי. בשבת הוא סגור. כרטיס לילדים עולה ארבעה דולרים. אפשר לצלם. ביקור נעים.",
      [
        q("When is the museum closed?", "מתי המוזיאון סגור?", ["On Saturday", "On Sunday", "On Friday", "On Monday"], ["בשבת", "ביום ראשון", "ביום שישי", "ביום שני"], 0, "נאמר 'On Saturday it is closed'."),
        q("How much is a ticket for kids?", "כמה עולה כרטיס לילדים?", ["Four dollars", "Ten dollars", "Two dollars", "Free"], ["ארבעה דולרים", "עשרה דולרים", "שני דולרים", "בחינם"], 0, "נאמר 'four dollars for kids'."),
      ],
    ),
    L(
      "Welcome to the snack bar. We have ice cream, juice and cookies. A cookie is one dollar. A small ice cream is two dollars. Please wait in line. Thank you.",
      "ברוכים הבאים לדוכן החטיפים. יש לנו גלידה, מיץ ועוגיות. עוגייה עולה דולר אחד. גלידה קטנה עולה שני דולרים. בבקשה המתינו בתור. תודה.",
      [
        q("How much is a cookie?", "כמה עולה עוגייה?", ["One dollar", "Two dollars", "Three dollars", "Five dollars"], ["דולר אחד", "שני דולרים", "שלושה דולרים", "חמישה דולרים"], 0, "נאמר 'A cookie is one dollar'."),
        q("How much is a small ice cream?", "כמה עולה גלידה קטנה?", ["Two dollars", "One dollar", "Four dollars", "Ten dollars"], ["שני דולרים", "דולר אחד", "ארבעה דולרים", "עשרה דולרים"], 0, "נאמר 'A small ice cream is two dollars'."),
      ],
    ),
    L(
      "Hi! On Sunday we have a picnic in the park. We meet at the big tree at eleven. I bring bread and cheese. You can bring fruit and a ball. It is going to be fun!",
      "היי! ביום ראשון יש לנו פיקניק בפארק. אנחנו נפגשים ליד העץ הגדול באחת עשרה. אני מביאה לחם וגבינה. אתה יכול להביא פירות וכדור. זה הולך להיות כיף!",
      [
        q("Where do they meet?", "איפה הם נפגשים?", ["At the big tree", "At the school", "At the shop", "At the pool"], ["ליד העץ הגדול", "בבית הספר", "בחנות", "בבריכה"], 0, "נאמר 'at the big tree'."),
        q("What can the friend bring?", "מה החבר יכול להביא?", ["Fruit and a ball", "Bread and cheese", "A cake", "A bike"], ["פירות וכדור", "לחם וגבינה", "עוגה", "אופניים"], 0, "נאמר 'bring fruit and a ball'."),
      ],
    ),
    L(
      "Hello, dear. I am at work. There is soup in the fridge. Please eat it with some bread. Do your homework first. I come home at six. Be good. Bye-bye!",
      "שלום, יקירי. אני בעבודה. יש מרק במקרר. בבקשה תאכל אותו עם קצת לחם. תעשה קודם שיעורי בית. אני חוזרת הביתה בשש. תהיה טוב. ביי ביי!",
      [
        q("Where is the soup?", "איפה המרק?", ["In the fridge", "On the table", "In the bag", "In the car"], ["במקרר", "על השולחן", "בתיק", "במכונית"], 0, "נאמר 'There is soup in the fridge'."),
        q("What must the child do first?", "מה הילד צריך לעשות קודם?", ["His homework", "Play", "Sleep", "Go out"], ["שיעורי בית", "לשחק", "לישון", "לצאת"], 0, "נאמר 'Do your homework first'."),
      ],
    ),
    L(
      "Good morning, children. Today we learn the colors. Look at the board. This is red. This is blue. This is green. Now take your pencils and draw a flower.",
      "בוקר טוב, ילדים. היום אנחנו לומדים את הצבעים. הסתכלו על הלוח. זה אדום. זה כחול. זה ירוק. עכשיו קחו עפרונות וציירו פרח.",
      [
        q("What do they learn today?", "מה הם לומדים היום?", ["The colors", "Numbers", "Animals", "Days"], ["את הצבעים", "מספרים", "חיות", "ימים"], 0, "נאמר 'we learn the colors'."),
        q("What must they draw?", "מה הם צריכים לצייר?", ["A flower", "A house", "A dog", "A tree"], ["פרח", "בית", "כלב", "עץ"], 0, "נאמר 'draw a flower'."),
      ],
    ),
    L(
      "Listen, children. Brush your teeth two times a day. Brush for two minutes in the morning and two minutes at night. Do not eat too much sugar. Then your teeth stay strong and white.",
      "הקשיבו, ילדים. צחצחו שיניים פעמיים ביום. צחצחו שתי דקות בבוקר ושתי דקות בלילה. אל תאכלו יותר מדי סוכר. אז השיניים נשארות חזקות ולבנות.",
      [
        q("How many times a day must you brush?", "כמה פעמים ביום צריך לצחצח?", ["Two times", "One time", "Five times", "Ten times"], ["פעמיים", "פעם אחת", "חמש פעמים", "עשר פעמים"], 0, "נאמר 'two times a day'."),
        q("What must you not eat too much?", "מה לא צריך לאכול יותר מדי?", ["Sugar", "Bread", "Fruit", "Rice"], ["סוכר", "לחם", "פירות", "אורז"], 0, "נאמר 'Do not eat too much sugar'."),
      ],
    ),
    L(
      "Hello. Please take us to the airport. Yes, we have three big bags. Our plane leaves at eight. How long is the trip? Forty minutes? Good. Please go fast.",
      "שלום. בבקשה קח אותנו לשדה התעופה. כן, יש לנו שלושה תיקים גדולים. המטוס שלנו ממריא בשמונה. כמה זמן הנסיעה? ארבעים דקות? טוב. בבקשה סע מהר.",
      [
        q("Where do the people want to go?", "לאן האנשים רוצים להגיע?", ["To the airport", "To the station", "To the hotel", "To school"], ["לשדה התעופה", "לתחנה", "למלון", "לבית הספר"], 0, "נאמר 'take us to the airport'."),
        q("How many bags do they have?", "כמה תיקים יש להם?", ["Three", "Two", "Five", "One"], ["שלושה", "שניים", "חמישה", "אחד"], 0, "נאמר 'three big bags'."),
      ],
    ),
    L(
      "Good morning, welcome to the airport. Please give me your tickets and your bags. Your seat is number ten. The plane leaves from door four at half past eight. Have a good trip.",
      "בוקר טוב, ברוכים הבאים לשדה התעופה. בבקשה תנו לי את הכרטיסים ואת התיקים. המושב שלכם הוא מספר עשר. המטוס יוצא מדלת ארבע בשמונה וחצי. נסיעה טובה.",
      [
        q("What is the seat number?", "מהו מספר המושב?", ["Ten", "Four", "Eight", "Two"], ["עשר", "ארבע", "שמונה", "שתיים"], 0, "נאמר 'seat is number ten'."),
        q("When does the plane leave?", "מתי המטוס יוצא?", ["At half past eight", "At eight", "At nine", "At ten"], ["בשמונה וחצי", "בשמונה", "בתשע", "בעשר"], 0, "נאמר 'at half past eight'."),
      ],
    ),
    L(
      "Fish, fish! Big fish today, only five dollars. Come and look. The fish come from the sea this morning. Buy two and one more is free. Come, come, come!",
      "דגים, דגים! דגים גדולים היום, רק בחמישה דולרים. בואו והסתכלו. הדגים באים מהים הבוקר. קנו שניים ועוד אחד בחינם. בואו, בואו, בואו!",
      [
        q("How much is a big fish?", "כמה עולה דג גדול?", ["Five dollars", "Two dollars", "Ten dollars", "One dollar"], ["חמישה דולרים", "שני דולרים", "עשרה דולרים", "דולר אחד"], 0, "נאמר 'only five dollars'."),
        q("What is free?", "מה בחינם?", ["One more fish", "The first fish", "The bag", "Nothing"], ["עוד דג אחד", "הדג הראשון", "התיק", "שום דבר"], 0, "נאמר 'one more is free'."),
      ],
    ),
    L(
      "Welcome to the bike shop. This blue bike is ten dollars a day. This red bike is twelve dollars a day. You must wear a hat. Bring the bike back at six o'clock. Thank you.",
      "ברוכים הבאים לחנות האופניים. האופניים הכחולים האלה עולים עשרה דולרים ליום. האופניים האדומים האלה עולים שנים עשר דולר ליום. חייבים לחבוש כובע. החזירו את האופניים בשש. תודה.",
      [
        q("How much is the blue bike for a day?", "כמה עולים האופניים הכחולים ליום?", ["Ten dollars", "Twelve dollars", "Two dollars", "Five dollars"], ["עשרה דולרים", "שנים עשר דולר", "שני דולרים", "חמישה דולרים"], 0, "נאמר 'blue bike is ten dollars a day'."),
        q("When must you bring the bike back?", "מתי צריך להחזיר את האופניים?", ["At six o'clock", "At nine o'clock", "At two o'clock", "Tomorrow"], ["בשש", "בתשע", "בשתיים", "מחר"], 0, "נאמר 'at six o'clock'."),
      ],
    ),
    L(
      "Welcome to the park. Please read the rules. Do not walk on the grass. Dogs must stay with their owners. Do not leave garbage here. The park closes at seven. Thank you.",
      "ברוכים הבאים לפארק. בבקשה קראו את הכללים. אל תלכו על הדשא. כלבים חייבים להישאר עם הבעלים שלהם. אל תשאירו אשפה כאן. הפארק נסגר בשבע. תודה.",
      [
        q("What must you not walk on?", "על מה אסור ללכת?", ["The grass", "The road", "The floor", "The tree"], ["הדשא", "הכביש", "הרצפה", "העץ"], 0, "נאמר 'Do not walk on the grass'."),
        q("When does the park close?", "מתי הפארק נסגר?", ["At seven", "At five", "At nine", "At ten"], ["בשבע", "בחמש", "בתשע", "בעשר"], 0, "נאמר 'closes at seven'."),
      ],
    ),
    L(
      "Big sale at the sports shop! All shoes are half price. Shirts are three dollars. Balls are two dollars. Come this Friday only. We open at nine. Do not miss it!",
      "מבצע גדול בחנות הספורט! כל הנעליים בחצי מחיר. חולצות עולות שלושה דולרים. כדורים עולים שני דולרים. בואו רק ביום שישי הזה. אנחנו נפתחים בתשע. אל תפספסו!",
      [
        q("How much are the shoes?", "כמה עולות הנעליים?", ["Half price", "Free", "Ten dollars", "Big price"], ["חצי מחיר", "בחינם", "עשרה דולרים", "מחיר גדול"], 0, "נאמר 'All shoes are half price'."),
        q("When is the sale?", "מתי המבצע?", ["This Friday only", "All week", "Every day", "Next month"], ["רק ביום שישי הזה", "כל השבוע", "כל יום", "בחודש הבא"], 0, "נאמר 'this Friday only'."),
      ],
    ),
    L(
      "Children, come to the library on Wednesday. At four o'clock there is story time. A woman reads a story about a little rabbit. Bring a friend. It is free. See you there!",
      "ילדים, בואו לספרייה ביום רביעי. בארבע יש שעת סיפור. אישה קוראת סיפור על ארנב קטן. הביאו חבר. זה בחינם. נתראה שם!",
      [
        q("When is story time?", "מתי שעת הסיפור?", ["On Wednesday at four", "On Monday at two", "On Friday at six", "Every night"], ["ביום רביעי בארבע", "ביום שני בשתיים", "ביום שישי בשש", "כל לילה"], 0, "נאמר 'on Wednesday. At four o'clock'."),
        q("What is the story about?", "על מה הסיפור?", ["A little rabbit", "A big dog", "A king", "A bird"], ["ארנב קטן", "כלב גדול", "מלך", "ציפור"], 0, "נאמר 'a little rabbit'."),
      ],
    ),
    L(
      "Hello, can you help me? I go away for two days. Please give my cat some food in the morning and in the evening. The food is in the kitchen. Thank you very much. You are a good friend.",
      "שלום, אפשר לבקש עזרה? אני נוסע לשני ימים. בבקשה תן לחתול שלי קצת אוכל בבוקר ובערב. האוכל במטבח. תודה רבה. אתה חבר טוב.",
      [
        q("How long does the person go away?", "לכמה זמן האדם נוסע?", ["Two days", "One week", "One day", "A month"], ["יומיים", "שבוע", "יום אחד", "חודש"], 0, "נאמר 'for two days'."),
        q("Where is the cat food?", "איפה האוכל של החתול?", ["In the kitchen", "In the garden", "In the bag", "In the car"], ["במטבח", "בגינה", "בתיק", "במכונית"], 0, "נאמר 'The food is in the kitchen'."),
      ],
    ),
    L(
      "This is my week. On Monday I go to school. On Tuesday I swim in the pool. On Wednesday I play the guitar. On Thursday I visit my grandmother. On Friday we eat together.",
      "זה השבוע שלי. ביום שני אני הולך לבית הספר. ביום שלישי אני שוחה בבריכה. ביום רביעי אני מנגן בגיטרה. ביום חמישי אני מבקר את סבתא שלי. ביום שישי אנחנו אוכלים ביחד.",
      [
        q("What does the speaker do on Tuesday?", "מה הדובר עושה ביום שלישי?", ["He swims in the pool", "He plays the guitar", "He goes to school", "He visits Grandma"], ["הוא שוחה בבריכה", "הוא מנגן בגיטרה", "הוא הולך לבית הספר", "הוא מבקר את סבתא"], 0, "נאמר 'On Tuesday I swim in the pool'."),
        q("When does he visit his grandmother?", "מתי הוא מבקר את סבתו?", ["On Thursday", "On Monday", "On Friday", "On Wednesday"], ["ביום חמישי", "ביום שני", "ביום שישי", "ביום רביעי"], 0, "נאמר 'On Thursday I visit my grandmother'."),
      ],
    ),
    L(
      "Good evening, everyone. Tonight we sleep outside. Put on a warm coat and take a blanket. Wash your face. At nine o'clock everyone goes to bed. Good night.",
      "ערב טוב, כולם. הלילה אנחנו ישנים בחוץ. לבשו מעיל חם וקחו שמיכה. שטפו פנים. בתשע כולם הולכים לישון. לילה טוב.",
      [
        q("Where do they sleep tonight?", "איפה הם ישנים הלילה?", ["Outside", "In a hotel", "At home", "In a car"], ["בחוץ", "במלון", "בבית", "במכונית"], 0, "נאמר 'we sleep outside'."),
        q("When does everyone go to bed?", "מתי כולם הולכים לישון?", ["At nine o'clock", "At six o'clock", "At ten o'clock", "At eleven"], ["בתשע", "בשש", "בעשר", "באחת עשרה"], 0, "נאמר 'At nine o'clock'."),
      ],
    ),
    L(
      "Children, after dinner please wash the dishes. Put soap on the plates and wash them with warm water. Then dry them with a towel. Put them on the shelf. Thank you very much!",
      "ילדים, אחרי ארוחת הערב בבקשה שטפו את הכלים. שימו סבון על הצלחות ושטפו אותן במים חמימים. אחר כך ייבשו אותן במגבת. שימו אותן על המדף. תודה רבה!",
      [
        q("What do you put on the plates?", "מה שמים על הצלחות?", ["Soap", "Sugar", "Salt", "Butter"], ["סבון", "סוכר", "מלח", "חמאה"], 0, "נאמר 'Put soap on the plates'."),
        q("Where do the plates go at the end?", "לאן הצלחות הולכות בסוף?", ["On the shelf", "On the floor", "In the garden", "In a bag"], ["על המדף", "על הרצפה", "לגינה", "לתיק"], 0, "נאמר 'Put them on the shelf'."),
      ],
    ),
    L(
      "Hello. One ticket to the city, please. Is the train fast? Okay. How much is it? Six dollars. Here you are. Which train? Number three. Thank you very much.",
      "שלום. כרטיס אחד לעיר, בבקשה. הרכבת מהירה? בסדר. כמה זה עולה? שישה דולרים. הנה. איזו רכבת? מספר שלוש. תודה רבה.",
      [
        q("How many tickets does the person buy?", "כמה כרטיסים האדם קונה?", ["One", "Two", "Three", "Six"], ["אחד", "שניים", "שלושה", "שישה"], 0, "נאמר 'One ticket to the city'."),
        q("How much is the ticket?", "כמה עולה הכרטיס?", ["Six dollars", "Three dollars", "Ten dollars", "One dollar"], ["שישה דולרים", "שלושה דולרים", "עשרה דולרים", "דולר אחד"], 0, "נאמר 'Six dollars'."),
      ],
    ),
    L(
      "Good morning. Your name, please? Thank you. Please sit here and wait. The doctor is with another child. Please wait ten minutes. Do you want some water? The water is near the window.",
      "בוקר טוב. שמך, בבקשה? תודה. בבקשה שב כאן וחכה. הרופא עם ילד אחר. חכה עשר דקות. אתה רוצה קצת מים? המים ליד החלון.",
      [
        q("How long must the child wait?", "כמה זמן הילד צריך לחכות?", ["Ten minutes", "One hour", "Two minutes", "One day"], ["עשר דקות", "שעה", "שתי דקות", "יום"], 0, "נאמר 'It is ten minutes'."),
        q("Where is the water?", "איפה המים?", ["Near the window", "Near the door", "In the car", "On the floor"], ["ליד החלון", "ליד הדלת", "במכונית", "על הרצפה"], 0, "נאמר 'near the window'."),
      ],
    ),
    L(
      "Hello, can I help you? Yes, I want a shirt for my brother. How old is he? He is ten. Here is a blue one and a green one. I take the blue one. How much is it? Seven dollars.",
      "שלום, אפשר לעזור? כן, אני רוצה חולצה לאחי. בן כמה הוא? הוא בן עשר. הנה אחת כחולה ואחת ירוקה. אני לוקח את הכחולה. כמה היא עולה? שבעה דולרים.",
      [
        q("Who is the shirt for?", "בשביל מי החולצה?", ["For his brother", "For his father", "For his friend", "For his mother"], ["בשביל אחיו", "בשביל אביו", "בשביל חברו", "בשביל אמו"], 0, "נאמר 'a shirt for my brother'."),
        q("Which shirt does the person take?", "איזו חולצה האדם לוקח?", ["The blue one", "The green one", "The red one", "The white one"], ["הכחולה", "הירוקה", "האדומה", "הלבנה"], 0, "נאמר 'I take the blue one'."),
      ],
    ),
    L(
      "Listen, class. We have a test. I say a word and you write it. First word: house. Second word: tree. Last word: friend. You have five minutes.",
      "הקשיבו, כיתה. יש לנו מבחן. אני אומרת מילה ואתם כותבים אותה. מילה ראשונה: בית. מילה שנייה: עץ. מילה אחרונה: חבר. יש לכם חמש דקות.",
      [
        q("What is the first word?", "מהי המילה הראשונה?", ["House", "Tree", "Friend", "Book"], ["בית", "עץ", "חבר", "ספר"], 0, "נאמר 'First word: house'."),
        q("How much time do they have?", "כמה זמן יש להם?", ["Five minutes", "One hour", "Ten minutes", "Two minutes"], ["חמש דקות", "שעה", "עשר דקות", "שתי דקות"], 0, "נאמר 'five minutes'."),
      ],
    ),
    L(
      "I have a pet cat. She is white and her eyes are green. She sleeps on my bed every night. In the morning she wakes me up. She wants her milk. I love my cat very much.",
      "יש לי חתולה. היא לבנה והעיניים שלה ירוקות. היא ישנה על המיטה שלי בכל לילה. בבוקר היא מעירה אותי. היא רוצה את החלב שלה. אני אוהב את החתולה שלי מאוד.",
      [
        q("What color are the cat's eyes?", "באיזה צבע העיניים של החתולה?", ["Green", "Blue", "Brown", "Black"], ["ירוקות", "כחולות", "חומות", "שחורות"], 0, "נאמר 'her eyes are green'."),
        q("What does the cat want in the morning?", "מה החתולה רוצה בבוקר?", ["Her milk", "A fish", "A bone", "A ball"], ["את החלב שלה", "דג", "עצם", "כדור"], 0, "נאמר 'She wants her milk'."),
      ],
    ),
    L(
      "Happy New Year, everyone! I hope you have a sweet and happy year. I want you to have good health, a lot of friends and many beautiful days. Eat apples and honey with your family!",
      "שנה טובה, כולם! אני מקווה שתהיה לכם שנה מתוקה ושמחה. אני רוצה שיהיו לכם בריאות טובה, הרבה חברים והרבה ימים יפים. אכלו תפוחים ודבש עם המשפחה!",
      [
        q("What does the speaker hope?", "מה הדובר מקווה?", ["A sweet and happy year", "A cold winter", "A long trip", "A new school"], ["שנה מתוקה ושמחה", "חורף קר", "טיול ארוך", "בית ספר חדש"], 0, "נאמר 'a sweet and happy year'."),
        q("What must people eat?", "מה אנשים צריכים לאכול?", ["Apples and honey", "Cake and juice", "Bread and cheese", "Fish and rice"], ["תפוחים ודבש", "עוגה ומיץ", "לחם וגבינה", "דגים ואורז"], 0, "נאמר 'Eat apples and honey'."),
      ],
    ),
    L(
      "Today we make a salad. Wash the tomatoes and cut them into pieces. Cut the carrots and the onion too. Put everything in a big bowl. Add a little salt and some lemon juice.",
      "היום אנחנו מכינים סלט. שטפו את העגבניות וחתכו אותן לחתיכות. חתכו גם את הגזר ואת הבצל. שימו הכול בקערה גדולה. הוסיפו מעט מלח וקצת מיץ לימון.",
      [
        q("What must you wash?", "מה צריך לשטוף?", ["The tomatoes", "The plates", "The bread", "The eggs"], ["את העגבניות", "את הצלחות", "את הלחם", "את הביצים"], 0, "נאמר 'Wash the tomatoes'."),
        q("What do you add at the end?", "מה מוסיפים בסוף?", ["A little salt and lemon juice", "Sugar", "Milk", "Honey"], ["מעט מלח וקצת מיץ לימון", "סוכר", "חלב", "דבש"], 0, "נאמר 'a little salt and some lemon juice'."),
      ],
    ),
    L(
      "Hello, what time is it? It is half past three. Thank you. Oh no, I must go! My lesson starts at four. Is the bus stop near? Yes, it is near the school.",
      "שלום, מה השעה? שלוש וחצי. תודה. אוי לא, אני חייב ללכת! השיעור שלי מתחיל בארבע. תחנת האוטובוס קרובה? כן, היא ליד בית הספר.",
      [
        q("What time is it?", "מה השעה?", ["Half past three", "Four o'clock", "Two o'clock", "Half past four"], ["שלוש וחצי", "ארבע", "שתיים", "ארבע וחצי"], 0, "נאמר 'half past three'."),
        q("When does the lesson start?", "מתי השיעור מתחיל?", ["At four", "At three", "At five", "At two"], ["בארבע", "בשלוש", "בחמש", "בשתיים"], 0, "נאמר 'starts at four'."),
      ],
    ),
    L(
      "Hello! Two ice creams, please. One with chocolate and one with lemon. That is four dollars? Here you are. Thank you. Can we sit outside?",
      "שלום! שתי גלידות, בבקשה. אחת בטעם שוקולד ואחת בטעם לימון. זה ארבעה דולרים? הנה. תודה. אפשר לשבת בחוץ?",
      [
        q("How many ice creams do they order?", "כמה גלידות הם מזמינים?", ["Two", "One", "Four", "Six"], ["שתיים", "אחת", "ארבע", "שש"], 0, "נאמר 'Two ice creams, please'."),
        q("What do they choose?", "מה הם בוחרים?", ["Chocolate and lemon", "Orange and banana", "Cheese and bread", "Apple and honey"], ["שוקולד ולימון", "תפוז ובננה", "גבינה ולחם", "תפוח ודבש"], 0, "נאמר 'chocolate and one with lemon'."),
      ],
    ),
    L(
      "Good morning! It is time to get up. The sun is out and the birds are singing. Wash your face and come to breakfast. I make eggs and bread. Come fast, or you will be late.",
      "בוקר טוב! הגיע הזמן לקום. השמש בחוץ והציפורים שרות. שטוף פנים ובוא לארוחת בוקר. אני מכינה ביצים ולחם. בוא מהר, או שתאחר.",
      [
        q("What does the mother make for breakfast?", "מה האמא מכינה לארוחת בוקר?", ["Eggs and bread", "Soup", "Rice", "Pizza"], ["ביצים ולחם", "מרק", "אורז", "פיצה"], 0, "נאמר 'I make eggs and bread'."),
        q("What are the birds doing?", "מה הציפורים עושות?", ["They are singing", "They are sleeping", "They are eating", "They are in a box"], ["הן שרות", "הן ישנות", "הן אוכלות", "הן בקופסה"], 0, "נאמר 'the birds are singing'."),
      ],
    ),
    L(
      "Hello, can I speak to Dan, please? He is not here? Okay. Please tell him that his friend called. We play football on Sunday at four. He knows the place. Thank you. Goodbye.",
      "שלום, אפשר לדבר עם דן, בבקשה? הוא לא כאן? בסדר. בבקשה תגיד לו שהחבר שלו התקשר. אנחנו משחקים כדורגל ביום ראשון בארבע. הוא מכיר את המקום. תודה. להתראות.",
      [
        q("Who does the speaker want to talk to?", "עם מי הדובר רוצה לדבר?", ["Dan", "The teacher", "The mother", "A doctor"], ["דן", "המורה", "האמא", "רופא"], 0, "נאמר 'speak to Dan'."),
        q("When do they play football?", "מתי הם משחקים כדורגל?", ["On Sunday at four", "On Monday at five", "On Friday", "Tomorrow at six"], ["ביום ראשון בארבע", "ביום שני בחמש", "ביום שישי", "מחר בשש"], 0, "נאמר 'on Sunday at four'."),
      ],
    ),
    L(
      "Hi, it is Dad. I am at the shop now. Do we need milk? And what about bread and eggs? I buy fruit too. Call me back in five minutes. I stay near the door. See you at home.",
      "היי, זה אבא. אני בחנות עכשיו. אנחנו צריכים חלב? ומה עם לחם וביצים? אני קונה גם פירות. תתקשר אליי בחזרה בעוד חמש דקות. אני נשאר ליד הדלת. נתראה בבית.",
      [
        q("Where is Dad?", "איפה אבא?", ["At the shop", "At work", "At home", "At school"], ["בחנות", "בעבודה", "בבית", "בבית הספר"], 0, "נאמר 'I am at the shop now'."),
        q("When must the child call him back?", "מתי הילד צריך להתקשר אליו בחזרה?", ["In five minutes", "Tomorrow", "In one hour", "At night"], ["בעוד חמש דקות", "מחר", "בעוד שעה", "בלילה"], 0, "נאמר 'in five minutes'."),
      ],
    ),
    L(
      "Welcome on our boat. Please sit down and hold on. The sea is quiet today. We go for one hour. You can see fish in the water. Do not stand up when the boat moves. Have a good trip!",
      "ברוכים הבאים לסירה שלנו. בבקשה שבו והחזיקו חזק. הים שקט היום. אנחנו יוצאים לשעה. אפשר לראות דגים במים. אל תעמדו כשהסירה זזה. שיהיה לכם טיול טוב!",
      [
        q("How long is the boat trip?", "כמה זמן הסיור בסירה?", ["One hour", "Ten minutes", "Two hours", "One day"], ["שעה", "עשר דקות", "שעתיים", "יום"], 0, "נאמר 'We go for one hour'."),
        q("What can you see in the water?", "מה אפשר לראות במים?", ["Fish", "Birds", "Boats", "Trees"], ["דגים", "ציפורים", "סירות", "עצים"], 0, "נאמר 'You can see fish in the water'."),
      ],
    ),
    L(
      "Class, please close your books. Put your pencils in your bags. Stand up and push your chairs under the desks. Now say goodbye to the teacher. See you tomorrow, children!",
      "כיתה, בבקשה סגרו את הספרים. שימו את העפרונות בתיקים. קומו ודחפו את הכיסאות מתחת לשולחנות. עכשיו אמרו להתראות למורה. נתראה מחר, ילדים!",
      [
        q("Where must the pencils go?", "לאן העפרונות צריכים ללכת?", ["In the bags", "On the desks", "On the floor", "In a box"], ["בתיקים", "על השולחנות", "על הרצפה", "בקופסה"], 0, "נאמר 'Put your pencils in your bags'."),
        q("What do the children say to the teacher?", "מה הילדים אומרים למורה?", ["Goodbye", "Good morning", "Thank you", "Sorry"], ["להתראות", "בוקר טוב", "תודה", "סליחה"], 0, "נאמר 'say goodbye to the teacher'."),
      ],
    ),
    L(
      "I have some news. We move to a new house next month. It is in another city. I am a little sad, but also excited. Please come and visit me. You can sleep in my new room.",
      "יש לי חדשות. בחודש הבא אנחנו עוברים לבית חדש. הוא בעיר אחרת. אני קצת עצוב, אבל גם מתרגש. בבקשה בוא לבקר אותי. אתה יכול לישון בחדר החדש שלי.",
      [
        q("When do they move?", "מתי הם עוברים?", ["Next month", "Tomorrow", "Next year", "Next week"], ["בחודש הבא", "מחר", "בשנה הבאה", "בשבוע הבא"], 0, "נאמר 'next month'."),
        q("How does the speaker feel?", "איך הדובר מרגיש?", ["A little sad but excited", "Very angry", "Bored", "Sick"], ["קצת עצוב אבל מתרגש", "כועס מאוד", "משועמם", "חולה"], 0, "נאמר 'a little sad, but also excited'."),
      ],
    ),
    L(
      "Good night, my dear. It is time to sleep. Close your eyes and think about nice things. Tomorrow is a new day. I love you very much. Sleep well and have beautiful dreams.",
      "לילה טוב, יקירי. הגיע הזמן לישון. עצום את העיניים וחשוב על דברים נעימים. מחר יום חדש. אני אוהבת אותך מאוד. תישן טוב ושיהיו לך חלומות יפים.",
      [
        q("What must the child do?", "מה הילד צריך לעשות?", ["Close his eyes and sleep", "Read a book", "Eat dinner", "Go out"], ["לעצום עיניים ולישון", "לקרוא ספר", "לאכול ארוחת ערב", "לצאת"], 0, "נאמר 'Close your eyes'."),
        q("What does the mother say about tomorrow?", "מה האמא אומרת על מחר?", ["It is a new day", "It is a holiday", "It is Friday", "There is school"], ["זה יום חדש", "זה חג", "זה יום שישי", "יש לימודים"], 0, "נאמר 'Tomorrow is a new day'."),
      ],
    ),
    L(
      "When I grow up I want to be a doctor. I like to help sick people. My mother is a nurse and she tells me about her work. I study every day and I read many books. It is hard, but I try.",
      "כשאהיה גדול אני רוצה להיות רופא. אני אוהב לעזור לאנשים חולים. אמא שלי אחות והיא מספרת לי על העבודה שלה. אני לומד בכל יום וקורא הרבה ספרים. זה קשה, אבל אני מנסה.",
      [
        q("What does the speaker want to be?", "מה הדובר רוצה להיות?", ["A doctor", "A teacher", "A driver", "A farmer"], ["רופא", "מורה", "נהג", "חקלאי"], 0, "נאמר 'I want to be a doctor'."),
        q("What is the mother's job?", "מה המקצוע של האמא?", ["A nurse", "A doctor", "A teacher", "A cook"], ["אחות", "רופאה", "מורה", "טבחית"], 0, "נאמר 'My mother is a nurse'."),
      ],
    ),
  ],
};
