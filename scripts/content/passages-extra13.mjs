// Round 13 of additional Reading and Listening content — A1, batch 4.
//
// Same shape and rules as rounds 10–12: fully bilingual, two questions per
// item, written from the A1 word cards so the app's vocabulary gate shows
// every item. Topics are tracked in docs/CONTENT-TOPICS.md.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

// --- READING ---------------------------------------------------------------
export const MORE_READINGS13 = {
  A1: [
    R(
      "The Birthday Surprise (הפתעת יום ההולדת)",
      "Today is my birthday, but no one says happy birthday. I am sad. At home I open the door and all my friends say, \"Surprise!\" There is a big cake and a lot of gifts. I am the happiest boy in the world.",
      "היום יום ההולדת שלי, אבל אף אחד לא אומר יום הולדת שמח. אני עצוב. בבית אני פותח את הדלת וכל החברים שלי אומרים: \"הפתעה!\" יש עוגה גדולה והרבה מתנות. אני הילד הכי שמח בעולם.",
      [
        g("surprise", "noun", "משהו שלא ציפית לו", "The party is a surprise.", "הפתעה"),
        g("gift", "noun", "מה שנותנים ליום הולדת", "I get a gift.", "מתנה"),
        g("world", "noun", "כדור הארץ", "I am the happiest boy in the world.", "עולם"),
      ],
      [
        q("How does the boy feel at the start?", "איך הילד מרגיש בהתחלה?", ["Sad", "Happy", "Angry", "Tired"], ["עצוב", "שמח", "כועס", "עייף"], 0, "כתוב 'I am sad'."),
        q("What do the friends say at home?", "מה החברים אומרים בבית?", ["Surprise!", "Goodbye!", "Be quiet!", "Stop!"], ["הפתעה!", "להתראות!", "שקט!", "עצור!"], 0, "כתוב 'Surprise!'."),
      ],
    ),
    R(
      "At the Dentist (אצל רופא השיניים)",
      "Today I go to the dentist with my mother. I sit on a big chair and I open my mouth. The dentist looks at my teeth and says, \"They are very good!\" I get a small gift and I smile.",
      "היום אני הולך לרופא השיניים עם אמא שלי. אני יושב על כיסא גדול ופותח את הפה. רופא השיניים מסתכל על השיניים שלי ואומר: \"הן טובות מאוד!\" אני מקבל מתנה קטנה ומחייך.",
      [
        g("dentist", "noun", "רופא שמטפל בשיניים", "I go to the dentist.", "רופא שיניים"),
        g("mouth", "noun", "מה שאוכלים איתו", "I open my mouth.", "פה"),
        g("teeth", "noun", "מה שיש בפה ללעיסה", "I brush my teeth.", "שיניים"),
      ],
      [
        q("Who goes with the writer?", "מי הולך עם הכותב?", ["His mother", "His father", "His sister", "His friend"], ["אמא שלו", "אבא שלו", "אחותו", "החבר שלו"], 0, "כתוב 'with my mother'."),
        q("What does the dentist say?", "מה רופא השיניים אומר?", ["They are very good", "They are bad", "They are small", "They are old"], ["הן טובות מאוד", "הן רעות", "הן קטנות", "הן ישנות"], 0, "כתוב 'They are very good!'."),
      ],
    ),
    R(
      "My Walk to School (ההליכה שלי לבית הספר)",
      "I walk to school every morning. The road goes past a small park and a bread shop. I say hello to the old man at the bread shop. He gives me a warm roll and I eat it on the way.",
      "אני הולך לבית הספר בכל בוקר. הדרך עוברת ליד פארק קטן וחנות לחם. אני אומר שלום לאיש הזקן בחנות הלחם. הוא נותן לי לחמנייה חמה ואני אוכל אותה בדרך.",
      [
        g("road", "noun", "דרך", "The road is long.", "דרך"),
        g("shop", "noun", "מקום שקונים בו", "I see the shop.", "חנות"),
        g("roll", "noun", "לחם קטן ועגול", "He gives me a warm roll.", "לחמנייה"),
      ],
      [
        q("What does the old man give the writer?", "מה האיש הזקן נותן לכותב?", ["A warm roll", "A cake", "An apple", "A drink"], ["לחמנייה חמה", "עוגה", "תפוח", "משקה"], 0, "כתוב 'a warm roll'."),
        q("Where does the writer eat it?", "איפה הכותב אוכל אותה?", ["On the way", "At school", "At home", "At night"], ["בדרך", "בבית הספר", "בבית", "בלילה"], 0, "כתוב 'I eat it on the way'."),
      ],
    ),
    R(
      "Our School Play (ההצגה של בית הספר)",
      "Our class has a play on Thursday. I am a king and my friend is a cat. We learn our words every day. On Thursday all the parents come and clap their hands.",
      "לכיתה שלנו יש הצגה ביום חמישי. אני מלך והחבר שלי חתול. אנחנו לומדים את המילים שלנו בכל יום. ביום חמישי כל ההורים באים ומוחאים כפיים.",
      [
        g("play", "noun", "הצגה", "We have a play.", "הצגה"),
        g("clap", "verb", "להכות כף בכף", "They clap their hands.", "למחוא כפיים"),
        g("parent", "noun", "אמא או אבא", "The parents come.", "הורה"),
      ],
      [
        q("What is the writer in the play?", "מה הכותב בהצגה?", ["A king", "A cat", "A dog", "A doctor"], ["מלך", "חתול", "כלב", "רופא"], 0, "כתוב 'I am a king'."),
        q("When is the play?", "מתי ההצגה?", ["On Thursday", "On Monday", "On Friday", "On Sunday"], ["ביום חמישי", "ביום שני", "ביום שישי", "ביום ראשון"], 0, "כתוב 'a play on Thursday'."),
      ],
    ),
    R(
      "A Trip to the Sea (טיול לים)",
      "Our class goes on a trip to the sea. We take a bus and we sing songs. At the beach we play ball and swim. In the afternoon we eat our sandwiches and go home tired and happy.",
      "הכיתה שלנו יוצאת לטיול לים. אנחנו נוסעים באוטובוס ושרים שירים. בחוף אנחנו משחקים בכדור ושוחים. אחר הצהריים אנחנו אוכלים את הכריכים וחוזרים הביתה עייפים ושמחים.",
      [
        g("trip", "noun", "נסיעה למקום", "We go on a trip.", "טיול"),
        g("sandwich", "noun", "לחם עם גבינה", "I eat a sandwich.", "כריך"),
        g("tired", "adjective", "רוצה לישון", "We are tired.", "עייפים"),
      ],
      [
        q("How does the class go to the sea?", "איך הכיתה נוסעת לים?", ["By bus", "By train", "By car", "By boat"], ["באוטובוס", "ברכבת", "במכונית", "בסירה"], 0, "כתוב 'We take a bus'."),
        q("What do they eat in the afternoon?", "מה הם אוכלים אחר הצהריים?", ["Sandwiches", "Pizza", "Soup", "Fish"], ["כריכים", "פיצה", "מרק", "דגים"], 0, "כתוב 'we eat our sandwiches'."),
      ],
    ),
    R(
      "Packing My Bag (אורזת את התיק)",
      "Every evening I pack my school bag. I put in my books, my notebook and two pencils. My mother puts in my lunch box and a bottle of water. Then I put the bag near the door.",
      "בכל ערב אני אורזת את תיק בית הספר. אני שמה את הספרים, המחברת ושני עפרונות. אמא שלי שמה את קופסת האוכל ובקבוק מים. אחר כך אני שמה את התיק ליד הדלת.",
      [
        g("pack", "verb", "לשים דברים בתיק", "I pack my bag.", "לארוז"),
        g("notebook", "noun", "ספר עם דפים ריקים", "I put in my notebook.", "מחברת"),
        g("bottle", "noun", "כלי למים", "She puts in a bottle.", "בקבוק"),
      ],
      [
        q("When does the writer pack the bag?", "מתי הכותבת אורזת את התיק?", ["Every evening", "Every morning", "Every Friday", "At night"], ["בכל ערב", "בכל בוקר", "בכל יום שישי", "בלילה"], 0, "כתוב 'Every evening'."),
        q("Who puts in the lunch box?", "מי שמה את קופסת האוכל?", ["The mother", "The writer", "The father", "The teacher"], ["האמא", "הכותבת", "האבא", "המורה"], 0, "כתוב 'My mother puts in my lunch box'."),
      ],
    ),
    R(
      "The Stairs at My House (המדרגות בבית שלי)",
      "My house has twenty stairs. I go up and down them all day. My little sister counts them every day. When she is tired, my father carries her up to her bed.",
      "בבית שלי יש עשרים מדרגות. אני עולה ויורד בהן כל היום. אחותי הקטנה סופרת אותן בכל יום. כשהיא עייפה, אבא שלי נושא אותה למיטה שלה.",
      [
        g("stairs", "noun", "מדרגות", "I go up the stairs.", "מדרגות"),
        g("count", "verb", "לומר מספרים", "She counts the stairs.", "לספור"),
        g("carry", "verb", "להחזיק ולהעביר", "He carries her.", "לשאת"),
      ],
      [
        q("What does the little sister do?", "מה האחות הקטנה עושה?", ["She counts the stairs", "She sings", "She sleeps", "She cooks"], ["היא סופרת את המדרגות", "היא שרה", "היא ישנה", "היא מבשלת"], 0, "כתוב 'counts them'."),
        q("Who carries her to bed?", "מי נושא אותה למיטה?", ["The father", "The mother", "The brother", "The teacher"], ["האבא", "האמא", "האח", "המורה"], 0, "כתוב 'my father carries her'."),
      ],
    ),
    R(
      "Dad's Old Car (המכונית הישנה של אבא)",
      "My father has an old blue car. It is small and it makes a funny noise. We go to the beach in it every summer. Dad says, \"This car is old, but it is my best friend.\"",
      "לאבא שלי יש מכונית כחולה ישנה. היא קטנה והיא משמיעה רעש מצחיק. אנחנו נוסעים בה לים בכל קיץ. אבא אומר: \"המכונית הזאת ישנה, אבל היא החבר הכי טוב שלי.\"",
      [
        g("car", "noun", "רכב עם ארבעה גלגלים", "He has an old car.", "מכונית"),
        g("noise", "noun", "קול", "It makes a funny noise.", "רעש"),
        g("funny", "adjective", "מצחיק", "The noise is funny.", "מצחיק"),
      ],
      [
        q("What color is the car?", "באיזה צבע המכונית?", ["Blue", "Red", "White", "Black"], ["כחולה", "אדומה", "לבנה", "שחורה"], 0, "כתוב 'an old blue car'."),
        q("Where do they go in it every summer?", "לאן הם נוסעים בה בכל קיץ?", ["To the beach", "To school", "To the zoo", "To the farm"], ["לים", "לבית הספר", "לגן החיות", "לחווה"], 0, "כתוב 'to the beach in it every summer'."),
      ],
    ),
    R(
      "The Surprise Dinner (ארוחת ההפתעה)",
      "Tonight my parents cook dinner for my grandmother. Grandma does not know. I put flowers on the table and my sister makes a card. When Grandma comes, she is very happy. We eat chicken and rice and talk until late.",
      "הערב ההורים שלי מבשלים ארוחת ערב לסבתא. סבתא לא יודעת. אני שם פרחים על השולחן ואחותי מכינה כרטיס ברכה. כשסבתא מגיעה, היא שמחה מאוד. אנחנו אוכלים עוף ואורז ומדברים עד מאוחר.",
      [
        g("flower", "noun", "חלק יפה של צמח", "I put flowers on the table.", "פרח"),
        g("table", "noun", "רהיט לאכול עליו", "The table is big.", "שולחן"),
        g("card", "noun", "נייר מקופל עם ברכה", "My sister makes a card.", "כרטיס ברכה"),
      ],
      [
        q("Who is the dinner for?", "בשביל מי ארוחת הערב?", ["The grandmother", "The teacher", "A friend", "The uncle"], ["הסבתא", "המורה", "חבר", "הדוד"], 0, "כתוב 'dinner for my grandmother'."),
        q("What do they eat?", "מה הם אוכלים?", ["Chicken and rice", "Fish and salad", "Soup", "Pizza"], ["עוף ואורז", "דגים וסלט", "מרק", "פיצה"], 0, "כתוב 'chicken and rice'."),
      ],
    ),
    R(
      "Visiting Grandpa (מבקרים אצל סבא)",
      "On Saturday we visit my grandfather. His house is small and it smells of tea. He shows me old photos and tells me stories about his school. I listen and I never get bored.",
      "בשבת אנחנו מבקרים אצל סבא שלי. הבית שלו קטן והוא מריח כמו תה. הוא מראה לי תמונות ישנות ומספר לי סיפורים על בית הספר שלו. אני מקשיב ואף פעם לא משתעמם.",
      [
        g("visit", "verb", "ללכת לראות מישהו", "We visit my grandfather.", "לבקר"),
        g("photo", "noun", "תמונה מצולמת", "He shows me old photos.", "תמונה"),
        g("bored", "adjective", "לא מתעניין", "I never get bored.", "משועמם"),
      ],
      [
        q("What does the house smell of?", "ממה הבית מריח?", ["Tea", "Soup", "Bread", "Flowers"], ["תה", "מרק", "לחם", "פרחים"], 0, "כתוב 'it smells of tea'."),
        q("What does Grandpa tell?", "מה סבא מספר?", ["Stories about his school", "Stories about animals", "News", "Songs"], ["סיפורים על בית הספר שלו", "סיפורים על חיות", "חדשות", "שירים"], 0, "כתוב 'stories about his school'."),
      ],
    ),
    R(
      "The Dog Next Door (הכלב של השכנים)",
      "The family next door has a big brown dog. He is very friendly and he likes kids. Every day he waits at the door and says hello with his tail. I give him a little bread and he is happy.",
      "למשפחה השכנה יש כלב חום גדול. הוא ידידותי מאוד והוא אוהב ילדים. בכל יום הוא מחכה ליד הדלת ואומר שלום עם הזנב. אני נותן לו קצת לחם והוא שמח.",
      [
        g("friendly", "adjective", "נחמד לאנשים", "The dog is friendly.", "ידידותי"),
        g("tail", "noun", "החלק מאחורי הכלב", "He has a long tail.", "זנב"),
        g("door", "noun", "מה שפותחים כדי להיכנס", "He waits at the door.", "דלת"),
      ],
      [
        q("What is the dog like?", "איך הכלב?", ["Big and brown", "Small and white", "Big and black", "Small and red"], ["גדול וחום", "קטן ולבן", "גדול ושחור", "קטן ואדום"], 0, "כתוב 'a big brown dog'."),
        q("What does the writer give the dog?", "מה הכותב נותן לכלב?", ["A little bread", "A bone", "A ball", "Water"], ["קצת לחם", "עצם", "כדור", "מים"], 0, "כתוב 'a little bread'."),
      ],
    ),
    R(
      "The Postman (הדוור)",
      "Our postman comes every morning at ten. He comes on a yellow bike and he has a big bag. He gives us letters and cards. My grandmother writes me a card every month, and I wait for it.",
      "הדוור שלנו בא בכל בוקר בעשר. הוא בא על אופניים צהובים ויש לו תיק גדול. הוא נותן לנו מכתבים וכרטיסי ברכה. סבתא שלי כותבת לי כרטיס ברכה בכל חודש, ואני מחכה לו.",
      [
        g("postman", "noun", "אדם שמביא מכתבים", "The postman comes at ten.", "דוור"),
        g("letter", "noun", "הודעה כתובה", "He gives us letters.", "מכתב"),
        g("month", "noun", "שלושים יום", "She writes a card every month.", "חודש"),
      ],
      [
        q("When does the postman come?", "מתי הדוור בא?", ["At ten", "At two", "At six", "At nine"], ["בעשר", "בשתיים", "בשש", "בתשע"], 0, "כתוב 'every morning at ten'."),
        q("How does the postman travel?", "איך הדוור נוסע?", ["On a yellow bike", "In a car", "On a bus", "On foot"], ["על אופניים צהובים", "במכונית", "באוטובוס", "ברגל"], 0, "כתוב 'comes on a yellow bike'."),
      ],
    ),
    R(
      "The Fire Truck (כבאית)",
      "One day a big red truck comes to our school. The firemen show us how it works. We can sit in the truck and ring the bell. I say, \"One day I want to be a fireman!\"",
      "יום אחד משאית אדומה גדולה באה לבית הספר שלנו. הכבאים מראים לנו איך היא עובדת. אנחנו יכולים לשבת במשאית ולצלצל בפעמון. אני אומר: \"יום אחד אני רוצה להיות כבאי!\"",
      [
        g("truck", "noun", "רכב גדול", "A big truck comes.", "משאית"),
        g("fireman", "noun", "אדם שמכבה שריפות", "The fireman is nice.", "כבאי"),
        g("bell", "noun", "כלי שמצלצל", "I ring the bell.", "פעמון"),
      ],
      [
        q("What is red?", "מה אדום?", ["The truck", "The bell", "The school", "The hat"], ["המשאית", "הפעמון", "בית הספר", "הכובע"], 0, "כתוב 'a big red truck'."),
        q("What does the writer want to be?", "מה הכותב רוצה להיות?", ["A fireman", "A doctor", "A teacher", "A driver"], ["כבאי", "רופא", "מורה", "נהג"], 0, "כתוב 'I want to be a fireman'."),
      ],
    ),
    R(
      "My Swimming Hat (כובע השחייה שלי)",
      "I have a new swimming hat. It is yellow with blue stars. I wear it in the pool and my hair stays dry. My friends say, \"We can see you from the other side of the pool!\"",
      "יש לי כובע שחייה חדש. הוא צהוב עם כוכבים כחולים. אני חובשת אותו בבריכה והשיער שלי נשאר יבש. החברים שלי אומרים: \"אנחנו רואים אותך מהצד השני של הבריכה!\"",
      [
        g("hat", "noun", "בגד לראש", "I have a new hat.", "כובע"),
        g("star", "noun", "נקודת אור בשמיים", "The hat has stars.", "כוכב"),
        g("dry", "adjective", "לא רטוב", "My hair stays dry.", "יבש"),
      ],
      [
        q("What color is the hat?", "באיזה צבע הכובע?", ["Yellow with blue stars", "Red", "Green", "White"], ["צהוב עם כוכבים כחולים", "אדום", "ירוק", "לבן"], 0, "כתוב 'yellow with blue stars'."),
        q("What stays dry?", "מה נשאר יבש?", ["Her hair", "Her shoes", "Her bag", "Her book"], ["השיער שלה", "הנעליים שלה", "התיק שלה", "הספר שלה"], 0, "כתוב 'my hair stays dry'."),
      ],
    ),
    R(
      "The Four Seasons (ארבע העונות)",
      "There are four seasons in a year. In winter it is cold and it rains. In spring there are flowers. In summer it is hot and we go to the beach. In autumn the leaves are yellow.",
      "יש ארבע עונות בשנה. בחורף קר וגשום. באביב יש פרחים. בקיץ חם ואנחנו הולכים לים. בסתיו העלים צהובים.",
      [
        g("season", "noun", "חלק מהשנה", "Winter is a season.", "עונה"),
        g("spring", "noun", "העונה אחרי החורף", "In spring there are flowers.", "אביב"),
        g("autumn", "noun", "העונה אחרי הקיץ", "In autumn the leaves are yellow.", "סתיו"),
      ],
      [
        q("How many seasons are there?", "כמה עונות יש?", ["Four", "Two", "Three", "Six"], ["ארבע", "שתיים", "שלוש", "שש"], 0, "כתוב 'four seasons'."),
        q("What do we do in summer?", "מה אנחנו עושים בקיץ?", ["Go to the beach", "Stay in bed", "Play in the snow", "Go to school"], ["הולכים לים", "נשארים במיטה", "משחקים בשלג", "הולכים לבית הספר"], 0, "כתוב 'we go to the beach'."),
      ],
    ),
    R(
      "My Favourite Month (החודש האהוב עליי)",
      "My favourite month is April. The weather is warm and the garden is green. My birthday is in April, and we also have a holiday. I love the flowers and the long days.",
      "החודש האהוב עליי הוא אפריל. מזג האוויר חם והגינה ירוקה. יום ההולדת שלי באפריל, ויש לנו גם חג. אני אוהב את הפרחים ואת הימים הארוכים.",
      [
        g("favourite", "adjective", "האהוב ביותר", "April is my favourite month.", "אהוב"),
        g("weather", "noun", "גשם, שמש ורוח", "The weather is warm.", "מזג אוויר"),
        g("holiday", "noun", "יום בלי לימודים", "We have a holiday.", "חג"),
      ],
      [
        q("What is the favourite month?", "מהו החודש האהוב?", ["April", "June", "March", "July"], ["אפריל", "יוני", "מרץ", "יולי"], 0, "כתוב 'My favourite month is April'."),
        q("What is the garden like?", "איך הגינה?", ["Green", "Dry", "Cold", "White"], ["ירוקה", "יבשה", "קרה", "לבנה"], 0, "כתוב 'the garden is green'."),
      ],
    ),
    R(
      "Counting Days to My Birthday (סופרים ימים ליום ההולדת)",
      "My birthday is in six days. Every morning I make a mark on the calendar. My mother asks, \"What do you want?\" I say, \"A bike!\" She smiles and says nothing.",
      "יום ההולדת שלי בעוד שישה ימים. בכל בוקר אני עושה סימן בלוח השנה. אמא שלי שואלת: \"מה אתה רוצה?\" אני אומר: \"אופניים!\" היא מחייכת ולא אומרת כלום.",
      [
        g("calendar", "noun", "לוח עם ימים וחודשים", "I look at the calendar.", "לוח שנה"),
        g("mark", "noun", "סימן", "I make a mark.", "סימן"),
        g("smile", "verb", "להראות שמחה בפנים", "She smiles.", "לחייך"),
      ],
      [
        q("When is the birthday?", "מתי יום ההולדת?", ["In six days", "In one day", "In ten days", "Tomorrow"], ["בעוד שישה ימים", "בעוד יום", "בעוד עשרה ימים", "מחר"], 0, "כתוב 'in six days'."),
        q("What does the boy want?", "מה הילד רוצה?", ["A bike", "A ball", "A phone", "A book"], ["אופניים", "כדור", "טלפון", "ספר"], 0, "כתוב 'A bike!'."),
      ],
    ),
    R(
      "The Calendar on the Wall (לוח השנה על הקיר)",
      "There is a big calendar on our kitchen wall. My mother writes on it all our plans. Today there is a red circle on Friday. It means we go to Grandma's house for dinner.",
      "יש לוח שנה גדול על קיר המטבח שלנו. אמא שלי כותבת עליו את כל התוכניות שלנו. היום יש עיגול אדום ביום שישי. זה אומר שאנחנו הולכים לארוחת ערב אצל סבתא.",
      [
        g("calendar", "noun", "לוח עם ימים וחודשים", "The calendar is on the wall.", "לוח שנה"),
        g("circle", "noun", "צורה עגולה", "There is a red circle.", "עיגול"),
        g("plan", "noun", "מה שרוצים לעשות", "We write our plans.", "תוכנית"),
      ],
      [
        q("Where is the calendar?", "איפה לוח השנה?", ["On the kitchen wall", "In the bedroom", "At school", "In a bag"], ["על קיר המטבח", "בחדר השינה", "בבית הספר", "בתיק"], 0, "כתוב 'on our kitchen wall'."),
        q("What does the red circle mean?", "מה העיגול האדום אומר?", ["Dinner at Grandma's", "A party", "A test", "A holiday"], ["ארוחת ערב אצל סבתא", "מסיבה", "מבחן", "חג"], 0, "כתוב 'we go to Grandma's house for dinner'."),
      ],
    ),
    R(
      "Monday Morning (בוקר יום שני)",
      "On Monday morning I do not want to get up. My bed is warm and the room is cold. My mother opens the window and says, \"Good morning!\" I wash my face and I feel better.",
      "בבוקר יום שני אני לא רוצה לקום. המיטה חמה והחדר קר. אמא שלי פותחת את החלון ואומרת: \"בוקר טוב!\" אני שוטף את הפנים ומרגיש טוב יותר.",
      [
        g("warm", "adjective", "חם קצת", "My bed is warm.", "חם"),
        g("window", "noun", "פתח בקיר", "She opens the window.", "חלון"),
        g("better", "adjective", "טוב יותר", "I feel better.", "טוב יותר"),
      ],
      [
        q("Why does the writer not want to get up?", "למה הכותב לא רוצה לקום?", ["His bed is warm and the room is cold", "He is sick", "He is angry", "It is Friday"], ["המיטה חמה והחדר קר", "הוא חולה", "הוא כועס", "זה יום שישי"], 0, "כתוב 'My bed is warm and the room is cold'."),
        q("What does the mother open?", "מה האמא פותחת?", ["The window", "The door", "A book", "A box"], ["את החלון", "את הדלת", "ספר", "קופסה"], 0, "כתוב 'opens the window'."),
      ],
    ),
    R(
      "The Long Wednesday (יום רביעי הארוך)",
      "Wednesday is the longest day of my week. I have six lessons and a football practice. When I get home, I do my homework and eat dinner. At nine o'clock I sleep on the sofa.",
      "יום רביעי הוא היום הארוך ביותר בשבוע שלי. יש לי שישה שיעורים ואימון כדורגל. כשאני מגיע הביתה, אני עושה שיעורי בית ואוכל ארוחת ערב. בתשע אני ישן על הספה.",
      [
        g("longest", "adjective", "הכי ארוך", "Wednesday is the longest day.", "הארוך ביותר"),
        g("practice", "noun", "אימון", "I have football practice.", "אימון"),
        g("sofa", "noun", "כיסא רך וגדול", "I sleep on the sofa.", "ספה"),
      ],
      [
        q("How many lessons does the writer have?", "כמה שיעורים יש לכותב?", ["Six", "Four", "Two", "Ten"], ["שישה", "ארבעה", "שניים", "עשרה"], 0, "כתוב 'six lessons'."),
        q("Where does he sleep at nine?", "איפה הוא ישן בתשע?", ["On the sofa", "In his bed", "In the car", "At school"], ["על הספה", "במיטה שלו", "במכונית", "בבית הספר"], 0, "כתוב 'on the sofa'."),
      ],
    ),
    R(
      "Thursday Shopping (קניות ביום חמישי)",
      "On Thursday my mother and I go shopping for Friday dinner. We buy a chicken, rice, onions and fruit. I carry the heavy bags. At home my mother says, \"You are strong, my dear.\"",
      "ביום חמישי אמא שלי ואני הולכות לקנות לארוחת ערב של יום שישי. אנחנו קונות עוף, אורז, בצלים ופירות. אני נושאת את התיקים הכבדים. בבית אמא אומרת: \"את חזקה, יקירתי.\"",
      [
        g("shopping", "noun", "קניית דברים", "We go shopping.", "קניות"),
        g("heavy", "adjective", "שוקל הרבה", "The bags are heavy.", "כבד"),
        g("strong", "adjective", "בעל כוח", "You are strong.", "חזק"),
      ],
      [
        q("What do they buy?", "מה הן קונות?", ["A chicken, rice, onions and fruit", "Shoes", "Books", "Toys"], ["עוף, אורז, בצלים ופירות", "נעליים", "ספרים", "צעצועים"], 0, "כתוב 'a chicken, rice, onions and fruit'."),
        q("What does the writer carry?", "מה הכותבת נושאת?", ["The heavy bags", "A baby", "A box", "Nothing"], ["את התיקים הכבדים", "תינוקת", "קופסה", "כלום"], 0, "כתוב 'I carry the heavy bags'."),
      ],
    ),
    R(
      "A Quiet Friday Morning (בוקר שקט של יום שישי)",
      "On Friday morning there is no school. I sleep late and wake up at nine. The house is quiet and the sun comes in through the window. I eat eggs and bread and read my book in bed.",
      "בבוקר יום שישי אין בית ספר. אני ישן עד מאוחר ומתעורר בתשע. הבית שקט והשמש נכנסת דרך החלון. אני אוכל ביצים ולחם וקורא את הספר שלי במיטה.",
      [
        g("quiet", "adjective", "בלי רעש", "The house is quiet.", "שקט"),
        g("sleep", "verb", "להיות במנוחה בלילה", "I sleep late.", "לישון"),
        g("wake up", "verb", "להפסיק לישון", "I wake up at nine.", "להתעורר"),
      ],
      [
        q("What time does the writer wake up?", "באיזו שעה הכותב מתעורר?", ["At nine", "At six", "At seven", "At eleven"], ["בתשע", "בשש", "בשבע", "באחת עשרה"], 0, "כתוב 'wake up at nine'."),
        q("Where does he read his book?", "איפה הוא קורא את הספר?", ["In bed", "In the garden", "At school", "On the bus"], ["במיטה", "בגינה", "בבית הספר", "באוטובוס"], 0, "כתוב 'read my book in bed'."),
      ],
    ),
    R(
      "Saturday with Grandma (שבת עם סבתא)",
      "On Saturday I go to my grandmother's house. She makes me a cup of hot chocolate and we play cards. She teaches me an old song. I sing it all the way home.",
      "בשבת אני הולכת לבית של סבתא שלי. היא מכינה לי כוס שוקו חם ואנחנו משחקות קלפים. היא מלמדת אותי שיר ישן. אני שרה אותו כל הדרך הביתה.",
      [
        g("chocolate", "noun", "ממתק חום", "She makes hot chocolate.", "שוקולד"),
        g("teach", "verb", "ללמד", "She teaches me a song.", "ללמד"),
        g("song", "noun", "מוזיקה עם מילים", "I sing a song.", "שיר"),
      ],
      [
        q("What does Grandma make?", "מה סבתא מכינה?", ["Hot chocolate", "Tea", "Soup", "Juice"], ["שוקו חם", "תה", "מרק", "מיץ"], 0, "כתוב 'a cup of hot chocolate'."),
        q("What does she teach the writer?", "מה היא מלמדת את הכותבת?", ["A song", "A game", "A story", "A dance"], ["שיר", "משחק", "סיפור", "ריקוד"], 0, "כתוב 'teaches me a song'."),
      ],
    ),
    R(
      "Sunday Lunch with the Family (ארוחת צהריים משפחתית)",
      "On Sunday all the family comes to our house for lunch. My uncles and aunts bring salads and cakes. The kids play in the yard and the mothers and fathers talk at the table. It is a long and happy day.",
      "ביום ראשון כל המשפחה באה אלינו לארוחת צהריים. הדודים והדודות מביאים סלטים ועוגות. הילדים משחקים בחצר והאמהות והאבות מדברים ליד השולחן. זה יום ארוך ושמח.",
      [
        g("lunch", "noun", "ארוחת צהריים", "We have lunch together.", "ארוחת צהריים"),
        g("yard", "noun", "שטח ליד הבית", "The kids play in the yard.", "חצר"),
        g("salad", "noun", "אוכל עם ירקות קרים", "I eat a salad.", "סלט"),
      ],
      [
        q("What do the uncles and aunts bring?", "מה הדודים והדודות מביאים?", ["Salads and cakes", "Fish", "Toys", "Books"], ["סלטים ועוגות", "דגים", "צעצועים", "ספרים"], 0, "כתוב 'bring salads and cakes'."),
        q("Where do the kids play?", "איפה הילדים משחקים?", ["In the yard", "At school", "On the beach", "In the car"], ["בחצר", "בבית הספר", "בחוף", "במכונית"], 0, "כתוב 'play in the yard'."),
      ],
    ),
    R(
      "A Paper Boat (סירת נייר)",
      "My grandfather shows me how to make a paper boat. We take a piece of paper and fold it many times. We put the boat in a big bowl of water. It floats, and we both laugh like kids.",
      "סבא שלי מראה לי איך להכין סירת נייר. אנחנו לוקחים דף נייר ומקפלים אותו הרבה פעמים. אנחנו שמים את הסירה בקערה גדולה עם מים. היא צפה, ושנינו צוחקים כמו ילדים.",
      [
        g("boat", "noun", "כלי שט", "I make a paper boat.", "סירה"),
        g("fold", "verb", "לקפל", "We fold the paper.", "לקפל"),
        g("float", "verb", "להישאר על פני המים", "The boat floats.", "לצוף"),
      ],
      [
        q("Who shows the writer how to make the boat?", "מי מראה לכותב איך להכין את הסירה?", ["His grandfather", "His father", "His teacher", "His brother"], ["סבא שלו", "אבא שלו", "המורה שלו", "אחיו"], 0, "כתוב 'My grandfather shows me'."),
        q("Where do they put the boat?", "איפה הם שמים את הסירה?", ["In a bowl of water", "In the sea", "In a river", "In a box"], ["בקערת מים", "בים", "בנהר", "בקופסה"], 0, "כתוב 'in a big bowl of water'."),
      ],
    ),
    R(
      "A Card Trick (טריק קלפים)",
      "My uncle knows a card trick. He asks me to take one card and not show it to him. I put it back and then he finds it! I ask, \"How do you do that?\" He smiles and says, \"It is a secret.\"",
      "הדוד שלי מכיר טריק קלפים. הוא מבקש ממני לקחת קלף אחד ולא להראות לו. אני מחזיר אותו ואז הוא מוצא אותו! אני שואל: \"איך אתה עושה את זה?\" הוא מחייך ואומר: \"זה סוד.\"",
      [
        g("trick", "noun", "משהו מפתיע שעושים", "He knows a trick.", "טריק"),
        g("card", "noun", "קלף למשחק", "I take one card.", "קלף"),
        g("secret", "noun", "דבר שלא מספרים", "It is a secret.", "סוד"),
      ],
      [
        q("What does the uncle ask the writer to do?", "מה הדוד מבקש מהכותב לעשות?", ["Take one card", "Draw a picture", "Sing a song", "Eat an apple"], ["לקחת קלף אחד", "לצייר תמונה", "לשיר שיר", "לאכול תפוח"], 0, "כתוב 'take one card'."),
        q("What does the uncle say at the end?", "מה הדוד אומר בסוף?", ["It is a secret", "It is easy", "It is a game", "I do not know"], ["זה סוד", "זה קל", "זה משחק", "אני לא יודע"], 0, "כתוב 'It is a secret'."),
      ],
    ),
    R(
      "The Funny Hat (הכובע המצחיק)",
      "At the party my uncle wears a funny hat. It is big and green and it has a red flower on top. Everybody laughs. My little brother takes the hat and puts it on his head. It is too big for him.",
      "במסיבה הדוד שלי חובש כובע מצחיק. הוא גדול וירוק ויש עליו פרח אדום למעלה. כולם צוחקים. אחי הקטן לוקח את הכובע ושם אותו על הראש. הוא גדול מדי בשבילו.",
      [
        g("funny", "adjective", "מצחיק", "The hat is funny.", "מצחיק"),
        g("head", "noun", "החלק העליון של הגוף", "He puts it on his head.", "ראש"),
        g("flower", "noun", "חלק יפה של צמח", "The hat has a flower.", "פרח"),
      ],
      [
        q("What color is the hat?", "באיזה צבע הכובע?", ["Green", "Blue", "Black", "Yellow"], ["ירוק", "כחול", "שחור", "צהוב"], 0, "כתוב 'big and green'."),
        q("Why is the hat a problem for the little brother?", "למה הכובע בעייתי לאח הקטן?", ["It is too big", "It is too small", "It is old", "It is dirty"], ["הוא גדול מדי", "הוא קטן מדי", "הוא ישן", "הוא מלוכלך"], 0, "כתוב 'It is too big for him'."),
      ],
    ),
    R(
      "The Big Box (הקופסה הגדולה)",
      "A big box comes to our house. It is brown and very heavy. My father opens it and we look inside. There is a new television! We are all excited, and we put it in the living room.",
      "קופסה גדולה מגיעה לבית שלנו. היא חומה וכבדה מאוד. אבא שלי פותח אותה ואנחנו מסתכלים פנימה. יש בה טלוויזיה חדשה! כולנו מתרגשים, ואנחנו שמים אותה בסלון.",
      [
        g("box", "noun", "קופסה", "A big box comes.", "קופסה"),
        g("television", "noun", "מכשיר לצפייה בסרטים", "We have a new television.", "טלוויזיה"),
        g("inside", "adverb", "בפנים", "We look inside.", "בפנים"),
      ],
      [
        q("What is in the box?", "מה יש בקופסה?", ["A new television", "A dog", "Books", "Food"], ["טלוויזיה חדשה", "כלב", "ספרים", "אוכל"], 0, "כתוב 'There is a new television'."),
        q("How is the box?", "איך הקופסה?", ["Brown and heavy", "Small and light", "Red and big", "White and small"], ["חומה וכבדה", "קטנה וקלה", "אדומה וגדולה", "לבנה וקטנה"], 0, "כתוב 'brown and very heavy'."),
      ],
    ),
    R(
      "The Rain on the Window (הגשם על החלון)",
      "It rains all afternoon and I sit by the window. I watch the drops run down the glass. I make a game and choose one drop. I say, \"This one is the winner!\" and I laugh.",
      "יורד גשם כל אחר הצהריים ואני יושב ליד החלון. אני מסתכל על הטיפות שיורדות על הזכוכית. אני ממציא משחק ובוחר טיפה אחת. אני אומר: \"זו המנצחת!\" וצוחק.",
      [
        g("drop", "noun", "טיפה קטנה של מים", "I watch the drops.", "טיפה"),
        g("glass", "noun", "חומר שקוף כמו בחלון", "The drops run down the glass.", "זכוכית"),
        g("winner", "noun", "מי שמנצח", "This one is the winner.", "מנצח"),
      ],
      [
        q("Where does the writer sit?", "איפה הכותב יושב?", ["By the window", "At the door", "In the garden", "On the stairs"], ["ליד החלון", "ליד הדלת", "בגינה", "על המדרגות"], 0, "כתוב 'I sit by the window'."),
        q("What does the writer watch?", "מה הכותב צופה בו?", ["The drops of rain", "The birds", "A film", "The street"], ["בטיפות הגשם", "בציפורים", "בסרט", "ברחוב"], 0, "כתוב 'I watch the drops'."),
      ],
    ),
    R(
      "Selling Juice (מוכרים מיץ)",
      "My sister and I sell orange juice outside our house. We put a table by the road and a sign on the wall. A cup is one dollar. By four o'clock we have ten dollars, and we buy ice cream with it.",
      "אחותי ואני מוכרים מיץ תפוזים מחוץ לבית שלנו. אנחנו שמים שולחן ליד הכביש ושלט על הקיר. כוס עולה דולר אחד. עד ארבע יש לנו עשרה דולרים, ואנחנו קונים בהם גלידה.",
      [
        g("sell", "verb", "לתת תמורת כסף", "We sell juice.", "למכור"),
        g("sign", "noun", "שלט", "We put a sign on the wall.", "שלט"),
        g("dollar", "noun", "כסף של ארצות הברית", "A cup is one dollar.", "דולר"),
      ],
      [
        q("How much is a cup of juice?", "כמה עולה כוס מיץ?", ["One dollar", "Two dollars", "Five dollars", "Ten dollars"], ["דולר אחד", "שני דולרים", "חמישה דולרים", "עשרה דולרים"], 0, "כתוב 'A cup is one dollar'."),
        q("What do they buy with the money?", "מה הם קונים בכסף?", ["Ice cream", "A toy", "A book", "Bread"], ["גלידה", "צעצוע", "ספר", "לחם"], 0, "כתוב 'buy ice cream with it'."),
      ],
    ),
    R(
      "A Bag at the Station (תיק בתחנה)",
      "At the bus station I see a small black bag on a seat. No one is near it. I take it to the man at the desk. He says, \"Thank you. You are a good girl.\" The next day the owner comes and says thank you too.",
      "בתחנת האוטובוסים אני רואה תיק שחור קטן על מושב. אף אחד לא לידו. אני לוקחת אותו לאיש שליד הדלפק. הוא אומר: \"תודה. את ילדה טובה.\" למחרת הבעלים בא ואומר תודה גם הוא.",
      [
        g("seat", "noun", "מקום לשבת", "The bag is on a seat.", "מושב"),
        g("desk", "noun", "שולחן עבודה", "The man is at the desk.", "דלפק"),
        g("owner", "noun", "מי שהדבר שלו", "The owner comes.", "בעלים"),
      ],
      [
        q("Where does the writer see the bag?", "איפה הכותבת רואה את התיק?", ["On a seat", "On the floor", "In a car", "Near a tree"], ["על מושב", "על הרצפה", "במכונית", "ליד עץ"], 0, "כתוב 'on a seat'."),
        q("Who comes the next day?", "מי בא למחרת?", ["The owner", "The teacher", "A friend", "The driver"], ["הבעלים", "המורה", "חבר", "הנהג"], 0, "כתוב 'the owner comes'."),
      ],
    ),
    R(
      "The Boy Across the Street (הילד מהצד השני של הרחוב)",
      "A new boy lives in the house across the street. He is eight years old, like me. We meet at the park and play football. Now he is my new best friend, and we walk to school together.",
      "ילד חדש גר בבית מעבר לרחוב. הוא בן שמונה, כמוני. אנחנו נפגשים בפארק ומשחקים כדורגל. עכשיו הוא החבר הכי טוב החדש שלי, ואנחנו הולכים לבית הספר ביחד.",
      [
        g("across", "preposition", "בצד השני", "He lives across the street.", "מעבר ל"),
        g("street", "noun", "דרך בעיר", "We live on the street.", "רחוב"),
        g("together", "adverb", "ביחד", "We walk together.", "ביחד"),
      ],
      [
        q("How old is the new boy?", "בן כמה הילד החדש?", ["Eight", "Six", "Ten", "Twelve"], ["שמונה", "שש", "עשר", "שתים עשרה"], 0, "כתוב 'eight years old'."),
        q("What do they do together?", "מה הם עושים ביחד?", ["Play football and walk to school", "Cook", "Read", "Swim"], ["משחקים כדורגל והולכים לבית הספר", "מבשלים", "קוראים", "שוחים"], 0, "כתוב 'play football' ו-'walk to school together'."),
      ],
    ),
    R(
      "The Shopping List (רשימת הקניות)",
      "My mother writes a shopping list. It says: milk, bread, eggs, two lemons and a big onion. She gives it to me and some money. At the shop I read the list again, and I buy everything.",
      "אמא שלי כותבת רשימת קניות. כתוב בה: חלב, לחם, ביצים, שני לימונים ובצל גדול. היא נותנת לי אותה וקצת כסף. בחנות אני קורא את הרשימה שוב, וקונה הכול.",
      [
        g("list", "noun", "דפים עם שמות דברים", "She writes a list.", "רשימה"),
        g("onion", "noun", "ירק עם שכבות", "I buy a big onion.", "בצל"),
        g("money", "noun", "מה שמשלמים בו", "She gives me money.", "כסף"),
      ],
      [
        q("What is on the list?", "מה כתוב ברשימה?", ["Milk, bread, eggs, lemons and an onion", "Shoes and hats", "Fish and rice", "Books and pencils"], ["חלב, לחם, ביצים, לימונים ובצל", "נעליים וכובעים", "דגים ואורז", "ספרים ועפרונות"], 0, "כתוב 'milk, bread, eggs, two lemons and a big onion'."),
        q("What does the writer do at the shop?", "מה הכותב עושה בחנות?", ["He reads the list and buys everything", "He plays", "He sleeps", "He sings"], ["הוא קורא את הרשימה וקונה הכול", "הוא משחק", "הוא ישן", "הוא שר"], 0, "כתוב 'I read the list again, and I buy everything'."),
      ],
    ),
    R(
      "Buying Bread (קונים לחם)",
      "Every Friday morning I buy rolls for the family. I go to the small bread shop near my house. I say, \"Two big rolls, please.\" The woman puts them in a paper bag, and the bag is still warm.",
      "בכל בוקר יום שישי אני קונה לחמניות בשביל המשפחה. אני הולך לחנות הלחם הקטנה ליד הבית שלי. אני אומר: \"שתי לחמניות גדולות, בבקשה.\" האישה שמה אותם בשקית נייר, והשקית עדיין חמה.",
      [
        g("bread", "noun", "אוכל שאופים מקמח", "I buy bread.", "לחם"),
        g("paper", "noun", "חומר לכתיבה", "She puts it in a paper bag.", "נייר"),
        g("roll", "noun", "לחם קטן ועגול", "I buy two rolls.", "לחמנייה"),
      ],
      [
        q("How many rolls does the writer buy?", "כמה לחמניות הכותב קונה?", ["Two", "One", "Four", "Six"], ["שניים", "אחד", "ארבעה", "שישה"], 0, "כתוב 'Two big rolls'."),
        q("What is the bag like?", "איך השקית?", ["Warm", "Cold", "Wet", "Broken"], ["חמה", "קרה", "רטובה", "שבורה"], 0, "כתוב 'the bag is still warm'."),
      ],
    ),
    R(
      "The Fruit Seller (מוכר הפירות)",
      "At the market there is a man who sells fruit. He has red apples, yellow bananas and orange oranges. He says, \"Try one!\" and gives me a small piece of apple. It is so sweet that my mother buys a big bag.",
      "בשוק יש איש שמוכר פירות. יש לו תפוחים אדומים, בננות צהובות ותפוזים כתומים. הוא אומר: \"תטעם!\" ונותן לי חתיכה קטנה של תפוח. היא כל כך מתוקה שאמא שלי קונה שקית גדולה.",
      [
        g("fruit", "noun", "אוכל מתוק מעץ", "He sells fruit.", "פירות"),
        g("try", "verb", "לטעום", "He says, try one.", "לטעום"),
        g("sweet", "adjective", "בטעם של סוכר", "The apple is sweet.", "מתוק"),
      ],
      [
        q("What does the man give the writer?", "מה האיש נותן לכותב?", ["A piece of apple", "A banana", "An orange", "A cake"], ["חתיכה של תפוח", "בננה", "תפוז", "עוגה"], 0, "כתוב 'a small piece of apple'."),
        q("What does the mother do?", "מה האמא עושה?", ["She buys a big bag", "She leaves", "She says no", "She cooks"], ["היא קונה שקית גדולה", "היא עוזבת", "היא אומרת לא", "היא מבשלת"], 0, "כתוב 'my mother buys a big bag'."),
      ],
    ),
    R(
      "My Uncle the Cook (הדוד הטבח)",
      "My uncle is a cook in a big restaurant. He gets up early and goes to work before the sun comes up. At home he makes the best soup in the family. I help him cut the carrots and the onions.",
      "הדוד שלי טבח במסעדה גדולה. הוא קם מוקדם והולך לעבודה לפני שהשמש עולה. בבית הוא מכין את המרק הכי טוב במשפחה. אני עוזר לו לחתוך את הגזר ואת הבצל.",
      [
        g("cook", "noun", "אדם שמבשל", "My uncle is a cook.", "טבח"),
        g("restaurant", "noun", "מקום לאכול בו", "He works in a restaurant.", "מסעדה"),
        g("early", "adverb", "לפני הזמן הרגיל", "He gets up early.", "מוקדם"),
      ],
      [
        q("Where does the uncle work?", "איפה הדוד עובד?", ["In a restaurant", "In a school", "In a shop", "In a hospital"], ["במסעדה", "בבית ספר", "בחנות", "בבית חולים"], 0, "כתוב 'a cook in a big restaurant'."),
        q("What does the writer help to cut?", "מה הכותב עוזר לחתוך?", ["The carrots and the onions", "The bread", "The fish", "The cheese"], ["את הגזר ואת הבצל", "את הלחם", "את הדג", "את הגבינה"], 0, "כתוב 'cut the carrots and the onions'."),
      ],
    ),
    R(
      "The Night Bus (אוטובוס הלילה)",
      "Every summer we take the night bus to the sea. It is dark outside and the bus is quiet. My little brother sleeps on my arm. When we arrive, the sun is coming up over the water.",
      "בכל קיץ אנחנו נוסעים באוטובוס הלילה לים. בחוץ חשוך והאוטובוס שקט. אחי הקטן ישן על הזרוע שלי. כשאנחנו מגיעים, השמש עולה מעל המים.",
      [
        g("night", "noun", "הזמן שחשוך", "We take the night bus.", "לילה"),
        g("arm", "noun", "חלק הגוף ליד היד", "He sleeps on my arm.", "זרוע"),
        g("arrive", "verb", "להגיע", "We arrive at the sea.", "להגיע"),
      ],
      [
        q("Where does the little brother sleep?", "איפה האח הקטן ישן?", ["On the writer's arm", "On a seat alone", "On the floor", "In a bed"], ["על הזרוע של הכותב", "על מושב לבד", "על הרצפה", "במיטה"], 0, "כתוב 'sleeps on my arm'."),
        q("What does the writer see when they arrive?", "מה הכותב רואה כשהם מגיעים?", ["The sun coming up", "The moon", "Rain", "A storm"], ["את השמש עולה", "את הירח", "גשם", "סערה"], 0, "כתוב 'the sun is coming up'."),
      ],
    ),
    R(
      "A Walk with Grandpa (טיול עם סבא)",
      "Every evening I walk with my grandfather in the park. He walks and he stops to look at the birds. He knows the name of every tree. I like our walks because he tells me old stories.",
      "בכל ערב אני מטייל עם סבא שלי בפארק. הוא הולך ועוצר להסתכל על הציפורים. הוא מכיר את השם של כל עץ. אני אוהב את הטיולים שלנו כי הוא מספר לי סיפורים ישנים.",
      [
        g("walk", "noun", "הליכה נעימה", "We go for a walk.", "טיול"),
        g("bird", "noun", "חיה עם כנפיים", "He looks at the birds.", "ציפור"),
        g("tree", "noun", "צמח גבוה", "He knows every tree.", "עץ"),
      ],
      [
        q("When does the writer walk with Grandpa?", "מתי הכותב מטייל עם סבא?", ["Every evening", "Every morning", "Every Friday", "At night"], ["בכל ערב", "בכל בוקר", "בכל יום שישי", "בלילה"], 0, "כתוב 'Every evening'."),
        q("Why does the writer like the walks?", "למה הכותב אוהב את הטיולים?", ["Grandpa tells old stories", "They are short", "They are fast", "There is food"], ["סבא מספר סיפורים ישנים", "הם קצרים", "הם מהירים", "יש אוכל"], 0, "כתוב 'he tells me old stories'."),
      ],
    ),
    R(
      "Time for Tea (זמן לתה)",
      "At four o'clock my grandmother says, \"Time for tea!\" She puts the kettle on the fire. We sit at the table with small cups. She gives me a piece of cake and I give her a big hug.",
      "בארבע סבתא שלי אומרת: \"זמן לתה!\" היא שמה את הקומקום על האש. אנחנו יושבים ליד השולחן עם כוסות קטנות. היא נותנת לי חתיכת עוגה ואני נותן לה חיבוק גדול.",
      [
        g("tea", "noun", "משקה חם מעלים", "We drink tea.", "תה"),
        g("kettle", "noun", "כלי לחימום מים", "She puts the kettle on the fire.", "קומקום"),
        g("hug", "noun", "חיבוק", "I give her a hug.", "חיבוק"),
      ],
      [
        q("What time is tea?", "באיזו שעה התה?", ["At four o'clock", "At six o'clock", "At two o'clock", "At nine o'clock"], ["בארבע", "בשש", "בשתיים", "בתשע"], 0, "כתוב 'At four o'clock'."),
        q("What does the writer give Grandma?", "מה הכותב נותן לסבתא?", ["A big hug", "A gift", "A flower", "A card"], ["חיבוק גדול", "מתנה", "פרח", "כרטיס ברכה"], 0, "כתוב 'a big hug'."),
      ],
    ),
    R(
      "The Hot Day at School (יום חם בבית הספר)",
      "It is a very hot day. The sun is on our classroom windows. The teacher opens all the windows. We drink a lot of water and have a lesson outside under the big tree. It is cool in the shade.",
      "זה יום חם מאוד. השמש על חלונות הכיתה שלנו. המורה פותחת את כל החלונות. אנחנו שותים הרבה מים ולומדים בחוץ מתחת לעץ הגדול. קריר בצל.",
      [
        g("hot", "adjective", "בטמפרטורה גבוהה", "It is a hot day.", "חם"),
        g("shade", "noun", "מקום בלי שמש", "It is cool in the shade.", "צל"),
        g("outside", "adverb", "בחוץ", "We have a lesson outside.", "בחוץ"),
      ],
      [
        q("Where do they have the lesson?", "איפה הם לומדים?", ["Outside under a tree", "In the library", "In the yard near the door", "At home"], ["בחוץ מתחת לעץ", "בספרייה", "בחצר ליד הדלת", "בבית"], 0, "כתוב 'outside under the big tree'."),
        q("What do they do a lot?", "מה הם עושים הרבה?", ["Drink water", "Play football", "Sing", "Sleep"], ["שותים מים", "משחקים כדורגל", "שרים", "ישנים"], 0, "כתוב 'drink a lot of water'."),
      ],
    ),
    R(
      "Five Minutes of Quiet (חמש דקות של שקט)",
      "In our house there is a lot of noise. My brother plays music and my sister talks on the phone. When I want quiet, I go to the roof. I sit there for five minutes and look at the sky.",
      "בבית שלנו יש הרבה רעש. אחי משמיע מוזיקה ואחותי מדברת בטלפון. כשאני רוצה שקט, אני עולה לגג. אני יושב שם חמש דקות ומסתכל על השמיים.",
      [
        g("noise", "noun", "קול חזק", "There is a lot of noise.", "רעש"),
        g("roof", "noun", "החלק העליון של הבית", "I go to the roof.", "גג"),
        g("quiet", "noun", "שקט", "I want quiet.", "שקט"),
      ],
      [
        q("Where does the writer go for quiet?", "לאן הכותב הולך כדי למצוא שקט?", ["To the roof", "To the garden", "To the kitchen", "To school"], ["לגג", "לגינה", "למטבח", "לבית הספר"], 0, "כתוב 'I go to the roof'."),
        q("How long does he sit there?", "כמה זמן הוא יושב שם?", ["Five minutes", "One hour", "Ten minutes", "All day"], ["חמש דקות", "שעה", "עשר דקות", "כל היום"], 0, "כתוב 'for five minutes'."),
      ],
    ),
    R(
      "A Window Seat (מושב ליד החלון)",
      "I love to sit near the window on the bus. I watch the houses, the trees and the people. Sometimes I see a dog or a cat. The trip to school is short, but it is my favourite part of the day.",
      "אני אוהבת לשבת ליד החלון באוטובוס. אני מסתכלת על הבתים, העצים והאנשים. לפעמים אני רואה כלב או חתול. הנסיעה לבית הספר קצרה, אבל זה החלק האהוב עליי ביום.",
      [
        g("window", "noun", "פתח בקיר", "I sit near the window.", "חלון"),
        g("watch", "verb", "להסתכל", "I watch the houses.", "להסתכל"),
        g("part", "noun", "חלק", "It is my favourite part.", "חלק"),
      ],
      [
        q("Where does the writer love to sit?", "איפה הכותבת אוהבת לשבת?", ["Near the window", "Near the door", "At the back", "At the front"], ["ליד החלון", "ליד הדלת", "מאחור", "מלפנים"], 0, "כתוב 'near the window on the bus'."),
        q("What does she sometimes see?", "מה היא רואה לפעמים?", ["A dog or a cat", "A horse", "A bird", "A fish"], ["כלב או חתול", "סוס", "ציפור", "דג"], 0, "כתוב 'a dog or a cat'."),
      ],
    ),
    R(
      "The Long Road (הדרך הארוכה)",
      "We drive on a long road to my aunt's house. There are fields on both sides and no houses. I sing songs, play games and look at the cars. After three hours we are there, and my aunt waits at the door.",
      "אנחנו נוסעים בדרך ארוכה לבית של דודה שלי. יש שדות משני הצדדים ואין בתים. אני שרה שירים, משחקת משחקים ומסתכלת על מכוניות. אחרי שלוש שעות אנחנו שם, והדודה שלי מחכה ליד הדלת.",
      [
        g("road", "noun", "דרך", "We drive on a long road.", "דרך"),
        g("field", "noun", "שטח פתוח", "There are fields on both sides.", "שדה"),
        g("hour", "noun", "שישים דקות", "It takes three hours.", "שעה"),
      ],
      [
        q("How long is the trip?", "כמה זמן הנסיעה?", ["Three hours", "One hour", "Ten minutes", "Six hours"], ["שלוש שעות", "שעה", "עשר דקות", "שש שעות"], 0, "כתוב 'After three hours'."),
        q("What does the writer look at?", "על מה הכותבת מסתכלת?", ["The cars", "The houses", "The birds", "The trees"], ["את המכוניות", "את הבתים", "את הציפורים", "את העצים"], 0, "כתוב 'look at the cars'."),
      ],
    ),
    R(
      "Fishing at the Lake (דיג באגם)",
      "On Sunday my father takes me fishing at the lake. We sit on a small boat. I catch a little fish and put it back in the water. My father says, \"Good, you are kind to animals.\"",
      "ביום ראשון אבא שלי לוקח אותי לדוג באגם. אנחנו יושבים על סירה קטנה. אני תופס דג קטן ומחזיר אותו למים. אבא שלי אומר: \"יפה, אתה טוב לב לחיות.\"",
      [
        g("lake", "noun", "מים גדולים באמצע האדמה", "We go to the lake.", "אגם"),
        g("catch", "verb", "לתפוס", "I catch a fish.", "לתפוס"),
        g("kind", "adjective", "נחמד", "You are kind to animals.", "טוב לב"),
      ],
      [
        q("Where do they sit?", "איפה הם יושבים?", ["On a small boat", "On the grass", "On a chair", "In a car"], ["על סירה קטנה", "על הדשא", "על כיסא", "במכונית"], 0, "כתוב 'on a small boat'."),
        q("What does the writer do with the fish?", "מה הכותב עושה עם הדג?", ["Puts it back in the water", "Eats it", "Takes it home", "Gives it to a friend"], ["מחזיר אותו למים", "אוכל אותו", "לוקח אותו הביתה", "נותן אותו לחבר"], 0, "כתוב 'put it back in the water'."),
      ],
    ),
    R(
      "A Glass of Water (כוס מים)",
      "At night I wake up very thirsty. I walk to the kitchen and pour a glass of cold water. I drink it all and then I stand at the window for a minute. The street is dark and the moon is bright.",
      "בלילה אני מתעורר צמא מאוד. אני הולך למטבח ומוזג כוס מים קרים. אני שותה הכול ואז עומד ליד החלון דקה. הרחוב חשוך והירח בהיר.",
      [
        g("thirsty", "adjective", "רוצה לשתות", "I am thirsty.", "צמא"),
        g("pour", "verb", "לשפוך נוזל", "I pour a glass of water.", "למזוג"),
        g("glass", "noun", "כוס", "I drink a glass of water.", "כוס"),
      ],
      [
        q("Why does the writer go to the kitchen?", "למה הכותב הולך למטבח?", ["He is thirsty", "He is hungry", "He is cold", "He is sick"], ["הוא צמא", "הוא רעב", "הוא קר לו", "הוא חולה"], 0, "כתוב 'very thirsty'."),
        q("How is the street?", "איך הרחוב?", ["Dark", "Bright", "Wet", "Full"], ["חשוך", "מואר", "רטוב", "מלא"], 0, "כתוב 'The street is dark'."),
      ],
    ),
    R(
      "My Cat Sleeps All Day (החתולה שלי ישנה כל היום)",
      "My cat sleeps all day on the sofa. She wakes up only to eat and to drink. At night she runs around the house and plays with a small ball. In the morning she sleeps again on my bed.",
      "החתולה שלי ישנה כל היום על הספה. היא מתעוררת רק כדי לאכול ולשתות. בלילה היא רצה בבית ומשחקת בכדור קטן. בבוקר היא ישנה שוב על המיטה שלי.",
      [
        g("cat", "noun", "חיה קטנה ופרוותית", "My cat sleeps.", "חתולה"),
        g("sofa", "noun", "כיסא רך וגדול", "She sleeps on the sofa.", "ספה"),
        g("ball", "noun", "חפץ עגול", "She plays with a ball.", "כדור"),
      ],
      [
        q("Where does the cat sleep all day?", "איפה החתולה ישנה כל היום?", ["On the sofa", "On the bed", "In a box", "In the garden"], ["על הספה", "על המיטה", "בקופסה", "בגינה"], 0, "כתוב 'on the sofa'."),
        q("What does the cat do at night?", "מה החתולה עושה בלילה?", ["Runs around and plays", "Sleeps", "Eats only", "Goes out"], ["רץ בבית ומשחק", "ישן", "רק אוכל", "יוצא"], 0, "כתוב 'runs around the house and plays'."),
      ],
    ),
    R(
      "Goodbye, Summer (להתראות, קיץ)",
      "The summer holiday ends and school starts again. I pack my bag with new books and pencils. I am a little sad, but I want to see my friends. On the first morning I wear my new shoes and run to the bus.",
      "חופשת הקיץ נגמרת ובית הספר מתחיל שוב. אני אורזת את התיק עם ספרים ועפרונות חדשים. אני קצת עצובה, אבל אני רוצה לראות את החברים שלי. בבוקר הראשון אני נועלת את הנעליים החדשות שלי ורצה לאוטובוס.",
      [
        g("holiday", "noun", "זמן בלי לימודים", "The summer holiday ends.", "חופשה"),
        g("pack", "verb", "לארוז", "I pack my bag.", "לארוז"),
        g("shoe", "noun", "מה שנועלים על הרגליים", "I wear my new shoes.", "נעל"),
      ],
      [
        q("How does the writer feel?", "איך הכותבת מרגישה?", ["A little sad but she wants to see her friends", "Very angry", "Bored", "Sick"], ["קצת עצובה אבל רוצה לראות את החברים", "כועסת מאוד", "משועממת", "חולה"], 0, "כתוב 'I am a little sad, but I want to see my friends'."),
        q("What does she wear on the first morning?", "מה היא לובשת בבוקר הראשון?", ["New shoes", "A new coat", "A new hat", "A new dress"], ["נעליים חדשות", "מעיל חדש", "כובע חדש", "שמלה חדשה"], 0, "כתוב 'my new shoes'."),
      ],
    ),
    R(
      "The Class Photo (תמונת הכיתה)",
      "Today we have a class photo. The tall kids stand at the back and the small kids sit at the front. The teacher says, \"One, two, three, smile!\" I close my eyes, so my face looks funny.",
      "היום יש לנו תמונת כיתה. הילדים הגבוהים עומדים מאחור והילדים הנמוכים יושבים מלפנים. המורה אומרת: \"אחת, שתיים, שלוש, חייכו!\" אני עוצם עיניים, ולכן הפנים שלי נראות מצחיקות.",
      [
        g("tall", "adjective", "גבוה", "The tall kids stand at the back.", "גבוה"),
        g("close", "verb", "לסגור", "I close my eyes.", "לסגור"),
        g("face", "noun", "הפנים", "My face looks funny.", "פנים"),
      ],
      [
        q("Where do the tall kids stand?", "איפה הילדים הגבוהים עומדים?", ["At the back", "At the front", "Outside", "Near the door"], ["מאחור", "מלפנים", "בחוץ", "ליד הדלת"], 0, "כתוב 'tall kids stand at the back'."),
        q("Why does the writer's face look funny?", "למה הפנים של הכותב נראות מצחיקות?", ["He closes his eyes", "He is angry", "He sleeps", "He cries"], ["הוא עוצם עיניים", "הוא כועס", "הוא ישן", "הוא בוכה"], 0, "כתוב 'I close my eyes'."),
      ],
    ),
    R(
      "My Favourite Cartoon (הסרט המצויר האהוב עליי)",
      "My favourite cartoon is about a little bear and his friends. I watch it every day after school. The bear is funny and he always helps his friends. I laugh a lot and I sing the song at the end.",
      "הסרט המצויר האהוב עליי הוא על דוב קטן והחברים שלו. אני רואה אותו בכל יום אחרי בית הספר. הדוב מצחיק והוא תמיד עוזר לחברים שלו. אני צוחק הרבה ושר את השיר בסוף.",
      [
        g("cartoon", "noun", "סרט מצויר", "I watch a cartoon.", "סרט מצויר"),
        g("bear", "noun", "חיה גדולה עם פרווה", "The bear is funny.", "דוב"),
        g("help", "verb", "לעזור", "He helps his friends.", "לעזור"),
      ],
      [
        q("What is the cartoon about?", "על מה הסרט המצויר?", ["A little bear and his friends", "A big dog", "A king", "A fish"], ["דוב קטן והחברים שלו", "כלב גדול", "מלך", "דג"], 0, "כתוב 'about a little bear and his friends'."),
        q("When does the writer watch it?", "מתי הכותב רואה אותו?", ["Every day after school", "Every morning", "Only on Friday", "At night"], ["בכל יום אחרי בית הספר", "בכל בוקר", "רק ביום שישי", "בלילה"], 0, "כתוב 'every day after school'."),
      ],
    ),
    R(
      "The Pencil Case (קלמר)",
      "My mother gives me a new pencil case. It is blue. Inside I put three pencils and a ruler. I write my name on it, so everybody knows it is mine.",
      "אמא שלי נותנת לי קלמר חדש. הוא כחול. בפנים אני שם שלושה עפרונות וסרגל. אני כותב עליו את השם שלי, כדי שכולם ידעו שהוא שלי.",
      [
        g("pencil case", "noun", "קופסה לעפרונות", "I have a new pencil case.", "קלמר"),
        g("ruler", "noun", "כלי למדידה", "I put in a ruler.", "סרגל"),
        g("name", "noun", "איך קוראים לך", "I write my name.", "שם"),
      ],
      [
        q("What is blue?", "מה כחול?", ["The pencil case", "The ruler", "The bag", "The pencil"], ["הקלמר", "הסרגל", "התיק", "העיפרון"], 0, "כתוב 'It is blue'."),
        q("How many pencils does the writer put in?", "כמה עפרונות הכותב שם?", ["Three", "One", "Five", "Ten"], ["שלושה", "אחד", "חמישה", "עשרה"], 0, "כתוב 'three pencils'."),
      ],
    ),
  ],
};

// --- LISTENING -------------------------------------------------------------
export const MORE_LISTENINGS13 = {
  A1: [
    L(
      "Hi, it is me. Do you want to see a movie on Saturday? It starts at five o'clock. I ask my mother to take us in the car. We can eat ice cream after. Call me back, please!",
      "היי, זה אני. אתה רוצה לראות סרט ביום שבת? הוא מתחיל בחמש. אני מבקשת מאמא שתיקח אותנו במכונית. אנחנו יכולים לאכול גלידה אחר כך. תתקשר אליי בחזרה, בבקשה!",
      [
        q("When does the movie start?", "מתי הסרט מתחיל?", ["At five o'clock", "At two o'clock", "At nine o'clock", "At eight o'clock"], ["בחמש", "בשתיים", "בתשע", "בשמונה"], 0, "נאמר 'It starts at five o'clock'."),
        q("What can they eat after?", "מה הם יכולים לאכול אחר כך?", ["Ice cream", "Pizza", "Soup", "Cake"], ["גלידה", "פיצה", "מרק", "עוגה"], 0, "נאמר 'eat ice cream after'."),
      ],
    ),
    L(
      "Good afternoon, class. Tomorrow is Sports Day. Please wear a white shirt and sports shoes. Bring a bottle of water and a hat. We start at nine o'clock in the yard. Be on time, please.",
      "אחר צהריים טובים, כיתה. מחר יום הספורט. בבקשה לבשו חולצה לבנה ונעלי ספורט. הביאו בקבוק מים וכובע. אנחנו מתחילים בתשע בחצר. בבקשה הגיעו בזמן.",
      [
        q("What must the kids wear?", "מה הילדים צריכים ללבוש?", ["A white shirt and sports shoes", "A red coat", "A blue hat only", "A black shirt"], ["חולצה לבנה ונעלי ספורט", "מעיל אדום", "רק כובע כחול", "חולצה שחורה"], 0, "נאמר 'a white shirt and sports shoes'."),
        q("When does Sports Day start?", "מתי יום הספורט מתחיל?", ["At nine o'clock", "At two o'clock", "At six o'clock", "At eight o'clock"], ["בתשע", "בשתיים", "בשש", "בשמונה"], 0, "נאמר 'We start at nine o'clock'."),
      ],
    ),
    L(
      "Come on, kids, put on your shoes. We go to the park now. Take your coats, because it is a little cold. Don't forget the ball. Dad is waiting for us in the car.",
      "קדימה, ילדים, נעלו נעליים. אנחנו הולכים עכשיו לפארק. קחו מעילים, כי קצת קר. אל תשכחו את הכדור. אבא מחכה לנו במכונית.",
      [
        q("Where do they go?", "לאן הם הולכים?", ["To the park", "To school", "To the shop", "To the beach"], ["לפארק", "לבית הספר", "לחנות", "לים"], 0, "נאמר 'We go to the park now'."),
        q("Who is waiting in the car?", "מי מחכה במכונית?", ["Dad", "Mom", "Grandma", "The teacher"], ["אבא", "אמא", "סבתא", "המורה"], 0, "נאמר 'Dad is waiting for us in the car'."),
      ],
    ),
    L(
      "Good morning, this is your radio. The next song is about the sea and a little boat. It is a song for all the families. Sing with us, and have a nice day!",
      "בוקר טוב, זה הרדיו שלכם. השיר הבא הוא על הים וסירה קטנה. זה שיר לכל המשפחות. שירו איתנו, ושיהיה לכם יום נעים!",
      [
        q("What is the song about?", "על מה השיר?", ["The sea and a little boat", "A dog", "A school", "A tree"], ["הים וסירה קטנה", "כלב", "בית ספר", "עץ"], 0, "נאמר 'about the sea and a little boat'."),
        q("Who is the song for?", "בשביל מי השיר?", ["All the families", "Only kids", "Teachers", "Doctors"], ["כל המשפחות", "רק ילדים", "מורים", "רופאים"], 0, "נאמר 'for all the families'."),
      ],
    ),
    L(
      "Please move to the back of the bus. There is room for five more people. Hold on to the seat and do not stand near the door. The next stop is the market. Thank you.",
      "בבקשה התקדמו לחלק האחורי של האוטובוס. יש מקום לעוד חמישה אנשים. החזיקו במושב ואל תעמדו ליד הדלת. התחנה הבאה היא השוק. תודה.",
      [
        q("How many more people can go on the bus?", "כמה אנשים נוספים יכולים לעלות?", ["Five", "Two", "Ten", "One"], ["חמישה", "שניים", "עשרה", "אחד"], 0, "נאמר 'five more people'."),
        q("What is the next stop?", "מהי התחנה הבאה?", ["The market", "The school", "The park", "The station"], ["השוק", "בית הספר", "הפארק", "התחנה"], 0, "נאמר 'The next stop is the market'."),
      ],
    ),
    L(
      "Hello, everyone. The shop closes in ten minutes. Please bring your things to the desk. Today the milk is cheap, and the bread is half price. Thank you for coming. See you tomorrow.",
      "שלום לכולם. החנות נסגרת בעוד עשר דקות. בבקשה הביאו את הדברים לדלפק. היום החלב זול, והלחם בחצי מחיר. תודה שבאתם. נתראה מחר.",
      [
        q("When does the shop close?", "מתי החנות נסגרת?", ["In ten minutes", "In one hour", "Tomorrow", "In two minutes"], ["בעוד עשר דקות", "בעוד שעה", "מחר", "בעוד שתי דקות"], 0, "נאמר 'closes in ten minutes'."),
        q("What is half price?", "מה בחצי מחיר?", ["The bread", "The milk", "The eggs", "The fruit"], ["הלחם", "החלב", "הביצים", "הפירות"], 0, "נאמר 'the bread is half price'."),
      ],
    ),
    L(
      "Hello. Please open your mouth and look at me. Good. You are fine. Drink warm tea with honey and stay at home today. Come back if it still hurts.",
      "שלום. בבקשה פתח את הפה והסתכל עליי. טוב. אתה בסדר. שתה תה חם עם דבש והישאר היום בבית. חזור אם עדיין כואב.",
      [
        q("What must the child drink?", "מה הילד צריך לשתות?", ["Warm tea with honey", "Cold water", "Milk", "Juice"], ["תה חם עם דבש", "מים קרים", "חלב", "מיץ"], 0, "נאמר 'warm tea with honey'."),
        q("What must he do today?", "מה הוא צריך לעשות היום?", ["Stay at home", "Go to school", "Play football", "Go out"], ["להישאר בבית", "ללכת לבית הספר", "לשחק כדורגל", "לצאת"], 0, "נאמר 'stay at home today'."),
      ],
    ),
    L(
      "Welcome to the zoo. A family ticket is twelve dollars. That is for two parents and two kids. Kids under three are free. The zoo is open until five o'clock. Have a nice day.",
      "ברוכים הבאים לגן החיות. כרטיס משפחתי עולה שנים עשר דולר. זה לשני הורים ושני ילדים. ילדים מתחת לגיל שלוש בחינם. גן החיות פתוח עד חמש. יום נעים.",
      [
        q("How much is a family ticket?", "כמה עולה כרטיס משפחתי?", ["Twelve dollars", "Five dollars", "Two dollars", "Ten dollars"], ["שנים עשר דולר", "חמישה דולרים", "שני דולרים", "עשרה דולרים"], 0, "נאמר 'twelve dollars'."),
        q("Who is free?", "מי בחינם?", ["Kids under three", "Parents", "Teachers", "Everyone"], ["ילדים מתחת לגיל שלוש", "הורים", "מורים", "כולם"], 0, "נאמר 'Kids under three are free'."),
      ],
    ),
    L(
      "This is my room. It is small, but I like it. There is a bed, a desk and a big window. On the wall there are pictures of animals. I keep my books on a shelf near the bed.",
      "זה החדר שלי. הוא קטן, אבל אני אוהב אותו. יש מיטה, שולחן כתיבה וחלון גדול. על הקיר יש תמונות של חיות. אני שומר את הספרים שלי על מדף ליד המיטה.",
      [
        q("What is on the wall?", "מה על הקיר?", ["Pictures of animals", "A clock", "A mirror", "A map"], ["תמונות של חיות", "שעון", "מראה", "מפה"], 0, "נאמר 'pictures of animals'."),
        q("Where are the books?", "איפה הספרים?", ["On a shelf near the bed", "On the floor", "In a box", "On the desk"], ["על מדף ליד המיטה", "על הרצפה", "בקופסה", "על השולחן"], 0, "נאמר 'on a shelf near the bed'."),
      ],
    ),
    L(
      "My best day is Saturday. In the morning I play football with my friends. In the afternoon I visit my grandmother and eat her cake. In the evening we all watch a film together.",
      "היום הכי טוב שלי הוא שבת. בבוקר אני משחק כדורגל עם החברים. אחר הצהריים אני מבקר את סבתא ואוכל את העוגה שלה. בערב כולנו רואים סרט ביחד.",
      [
        q("What does he do in the morning?", "מה הוא עושה בבוקר?", ["Plays football", "Visits Grandma", "Watches a film", "Sleeps"], ["משחק כדורגל", "מבקר את סבתא", "רואה סרט", "ישן"], 0, "נאמר 'I play football with my friends'."),
        q("What does he do in the evening?", "מה הוא עושה בערב?", ["Watches a film", "Plays football", "Eats cake", "Goes to school"], ["רואה סרט", "משחק כדורגל", "אוכל עוגה", "הולך לבית הספר"], 0, "נאמר 'we all watch a film together'."),
      ],
    ),
    L(
      "My family has an old car. It is blue and it is very small. We go to the beach in it every summer. Dad drives, Mom reads the map and my brother and I sing songs.",
      "למשפחה שלי יש מכונית ישנה. היא כחולה וקטנה מאוד. אנחנו נוסעים בה לים בכל קיץ. אבא נוהג, אמא קוראת את המפה ואחי ואני שרים שירים.",
      [
        q("What color is the car?", "באיזה צבע המכונית?", ["Blue", "Red", "White", "Black"], ["כחולה", "אדומה", "לבנה", "שחורה"], 0, "נאמר 'It is blue'."),
        q("What does Mom do in the car?", "מה אמא עושה במכונית?", ["Reads the map", "Drives", "Sings", "Sleeps"], ["קוראת את המפה", "נוהגת", "שרה", "ישנה"], 0, "נאמר 'Mom reads the map'."),
      ],
    ),
    L(
      "Hi, it is Mom. I am on my way home from work. Please buy some bread at the shop. Two bags of bread, please. Take money from the box on the table. Thank you, dear. See you soon.",
      "היי, זאת אמא. אני בדרך הביתה מהעבודה. בבקשה תקנה לחם בחנות. שתי שקיות לחם, בבקשה. קח כסף מהקופסה שעל השולחן. תודה, יקירי. נתראה בקרוב.",
      [
        q("What must the child buy?", "מה הילד צריך לקנות?", ["Two bags of bread", "Milk", "Eggs", "Cakes"], ["שתי שקיות לחם", "חלב", "ביצים", "עוגות"], 0, "נאמר 'Two bags of bread, please'."),
        q("Where is the money?", "איפה הכסף?", ["In the box on the table", "In a bag", "In the car", "In the kitchen"], ["בקופסה שעל השולחן", "בתיק", "במכונית", "במטבח"], 0, "נאמר 'the box on the table'."),
      ],
    ),
    L(
      "Hello, it is me. Can I take your book about animals? I need it for school. I give it back on Monday. I come to your house at four o'clock. Is that good?",
      "שלום, זה אני. אפשר לקחת את הספר שלך על חיות? אני צריך אותו לבית הספר. אני מחזיר אותו ביום שני. אני בא אליך הביתה בארבע. זה טוב?",
      [
        q("What does the speaker want?", "מה הדובר רוצה?", ["A book about animals", "A pen", "A ball", "A bag"], ["ספר על חיות", "עט", "כדור", "תיק"], 0, "נאמר 'your book about animals'."),
        q("When does he give it back?", "מתי הוא מחזיר אותו?", ["On Monday", "On Friday", "Tomorrow", "On Sunday"], ["ביום שני", "ביום שישי", "מחר", "ביום ראשון"], 0, "נאמר 'give it back on Monday'."),
      ],
    ),
    L(
      "Please help me with my homework. I do not understand this question. It is about numbers. You are good at math. Sit next to me and show me. Then I help you with your English.",
      "בבקשה עזור לי בשיעורי הבית. אני לא מבין את השאלה הזאת. היא על מספרים. אתה טוב בחשבון. שב לידי והראה לי. אחר כך אני אעזור לך באנגלית.",
      [
        q("What is the homework about?", "על מה שיעורי הבית?", ["Numbers", "Animals", "Colors", "Food"], ["מספרים", "חיות", "צבעים", "אוכל"], 0, "נאמר 'It is about numbers'."),
        q("What will the speaker do?", "מה הדובר יעשה?", ["Help with English", "Give a gift", "Cook", "Play"], ["לעזור באנגלית", "לתת מתנה", "לבשל", "לשחק"], 0, "נאמר 'I help you with your English'."),
      ],
    ),
    L(
      "Good morning, class. Open your books at page twelve. I read the story first, and then you read it. Listen carefully. After that, you answer two questions in your notebook.",
      "בוקר טוב, כיתה. פתחו את הספרים בעמוד שתים עשרה. אני אקרא את הסיפור קודם, ואז אתם תקראו אותו. הקשיבו היטב. אחרי זה, תענו על שתי שאלות במחברת.",
      [
        q("Which page must they open?", "איזה עמוד הם צריכים לפתוח?", ["Page twelve", "Page two", "Page ten", "Page five"], ["עמוד שתים עשרה", "עמוד שתיים", "עמוד עשר", "עמוד חמש"], 0, "נאמר 'page twelve'."),
        q("How many questions must they answer?", "על כמה שאלות הם צריכים לענות?", ["Two", "One", "Five", "Ten"], ["שתיים", "אחת", "חמש", "עשר"], 0, "נאמר 'two questions'."),
      ],
    ),
    L(
      "Hello, welcome to our cafe. I am sorry, we have no more chocolate cake today. We have apple cake and cheese cake. Both are very good. And what do you want to drink?",
      "שלום, ברוכים הבאים לבית הקפה שלנו. אני מצטערת, אין לנו עוד עוגת שוקולד היום. יש לנו עוגת תפוחים ועוגת גבינה. שתיהן טובות מאוד. ומה אתם רוצים לשתות?",
      [
        q("What cake is finished today?", "איזו עוגה נגמרה היום?", ["Chocolate cake", "Apple cake", "Cheese cake", "Banana cake"], ["עוגת שוקולד", "עוגת תפוחים", "עוגת גבינה", "עוגת בננה"], 0, "נאמר 'no more chocolate cake'."),
        q("Which cakes do they have?", "אילו עוגות יש להם?", ["Apple cake and cheese cake", "Only apple cake", "Only cheese cake", "No cakes"], ["עוגת תפוחים ועוגת גבינה", "רק עוגת תפוחים", "רק עוגת גבינה", "אין עוגות"], 0, "נאמר 'apple cake and cheese cake'."),
      ],
    ),
    L(
      "Welcome to our hotel. The pool is on the roof and it is open until eight o'clock tonight. Please take a towel from the shelf. Do not run near the water. Have a nice day.",
      "ברוכים הבאים למלון שלנו. הבריכה על הגג והיא פתוחה עד שמונה הערב. בבקשה קחו מגבת מהמדף. אל תרוצו ליד המים. שיהיה לכם יום נעים.",
      [
        q("Where is the pool?", "איפה הבריכה?", ["On the roof", "In the garden", "In the kitchen", "Near the sea"], ["על הגג", "בגינה", "במטבח", "ליד הים"], 0, "נאמר 'The pool is on the roof'."),
        q("Until when is the pool open?", "עד מתי הבריכה פתוחה?", ["Until eight o'clock", "Until five o'clock", "Until ten o'clock", "Until nine o'clock"], ["עד שמונה", "עד חמש", "עד עשר", "עד תשע"], 0, "נאמר 'until eight o'clock tonight'."),
      ],
    ),
    L(
      "Good morning. Please put your bags on the table. Small bags can go with you on the plane. Big bags must go under the plane. Thank you. Have a good trip.",
      "בוקר טוב. בבקשה שימו את התיקים על השולחן. תיקים קטנים יכולים לעלות איתכם למטוס. תיקים גדולים צריכים ללכת מתחת למטוס. תודה. טיסה טובה.",
      [
        q("Which bags can go on the plane with you?", "אילו תיקים יכולים לעלות איתכם למטוס?", ["Small bags", "Big bags", "All bags", "No bags"], ["תיקים קטנים", "תיקים גדולים", "כל התיקים", "אף תיק"], 0, "נאמר 'Small bags can go with you'."),
        q("Where must the big bags go?", "לאן התיקים הגדולים צריכים ללכת?", ["Under the plane", "On the table", "On a seat", "Home"], ["מתחת למטוס", "על השולחן", "על מושב", "הביתה"], 0, "נאמר 'under the plane'."),
      ],
    ),
    L(
      "Hello, everyone. This train goes to the city. The next stop is the station near the park. The trip takes twenty minutes. Please keep your bags near you. Thank you for taking the train.",
      "שלום לכולם. הרכבת הזאת נוסעת לעיר. התחנה הבאה היא התחנה ליד הפארק. הנסיעה לוקחת עשרים דקות. בבקשה שמרו את התיקים לידכם. תודה שנסעתם ברכבת.",
      [
        q("Where does the train go?", "לאן הרכבת נוסעת?", ["To the city", "To the sea", "To the farm", "To the school"], ["לעיר", "לים", "לחווה", "לבית הספר"], 0, "נאמר 'goes to the city'."),
        q("What is the next stop near?", "ליד מה התחנה הבאה?", ["The park", "The school", "The sea", "The hotel"], ["הפארק", "בית הספר", "הים", "המלון"], 0, "נאמר 'near the park'."),
      ],
    ),
    L(
      "I am sorry, this bus is full. Please wait for the next one. It comes in ten minutes. You can sit near the tree. The driver says thank you for waiting.",
      "אני מצטער, האוטובוס הזה מלא. בבקשה חכו לאוטובוס הבא. הוא מגיע בעוד עשר דקות. אפשר לשבת ליד העץ. הנהג אומר תודה על ההמתנה.",
      [
        q("Why must people wait?", "למה אנשים צריכים לחכות?", ["The bus is full", "The bus is broken", "The bus is late", "The driver is sick"], ["האוטובוס מלא", "האוטובוס שבור", "האוטובוס מאחר", "הנהג חולה"], 0, "נאמר 'this bus is full'."),
        q("When does the next bus come?", "מתי האוטובוס הבא מגיע?", ["In ten minutes", "In one hour", "Tomorrow", "In two minutes"], ["בעוד עשר דקות", "בעוד שעה", "מחר", "בעוד שתי דקות"], 0, "נאמר 'It comes in ten minutes'."),
      ],
    ),
    L(
      "Apples, apples! Sweet red apples, three dollars for a big bag. Bananas, two dollars. Come and try one! Everything is very good today. Come, come, come!",
      "תפוחים, תפוחים! תפוחים אדומים ומתוקים, שלושה דולרים לשקית גדולה. בננות, שני דולרים. בואו וטעמו אחד! הכול טוב מאוד היום. בואו, בואו, בואו!",
      [
        q("How much is a big bag of apples?", "כמה עולה שקית גדולה של תפוחים?", ["Three dollars", "Two dollars", "Five dollars", "Ten dollars"], ["שלושה דולרים", "שני דולרים", "חמישה דולרים", "עשרה דולרים"], 0, "נאמר 'three dollars for a big bag'."),
        q("What can you do before buying?", "מה אפשר לעשות לפני הקנייה?", ["Try one", "Take two", "Pay later", "Go home"], ["לטעום אחד", "לקחת שניים", "לשלם אחר כך", "ללכת הביתה"], 0, "נאמר 'Come and try one'."),
      ],
    ),
    L(
      "I am afraid of the dark. When I go to bed, I want the light on. My father says, \"Do not be afraid. I am next to you.\" Then he sits near my bed until I sleep.",
      "אני מפחד מהחושך. כשאני הולך לישון, אני רוצה שהאור יהיה דולק. אבא שלי אומר: \"אל תפחד. אני לידך.\" אחר כך הוא יושב ליד המיטה שלי עד שאני נרדם.",
      [
        q("What is the child afraid of?", "ממה הילד מפחד?", ["The dark", "Dogs", "School", "The rain"], ["מהחושך", "מכלבים", "מבית הספר", "מהגשם"], 0, "נאמר 'I am afraid of the dark'."),
        q("What does the father do?", "מה האבא עושה?", ["Sits near the bed", "Goes out", "Sings", "Reads a book"], ["יושב ליד המיטה", "יוצא", "שר", "קורא ספר"], 0, "נאמר 'sits near my bed'."),
      ],
    ),
    L(
      "When my father was a boy, he lived in a small village. He walked to school every day and it took one hour. He had one pair of shoes and a small bag. He says, \"Now you have everything, so be happy.\"",
      "כשאבא שלי היה ילד, הוא גר בכפר קטן. הוא הלך לבית הספר בכל יום וזה לקח שעה. היה לו זוג נעליים אחד ותיק קטן. הוא אומר: \"עכשיו יש לכם הכול, אז תהיו שמחים.\"",
      [
        q("How long did the walk to school take?", "כמה זמן לקחה ההליכה לבית הספר?", ["One hour", "Ten minutes", "Two hours", "Five minutes"], ["שעה", "עשר דקות", "שעתיים", "חמש דקות"], 0, "נאמר 'it took one hour'."),
        q("What does the father say now?", "מה האבא אומר עכשיו?", ["Be happy", "Go home", "Be quiet", "Eat more"], ["תהיו שמחים", "לכו הביתה", "שקט", "תאכלו עוד"], 0, "נאמר 'be happy'."),
      ],
    ),
    L(
      "Here is my grandmother's fruit salad. Take two apples, two bananas and one orange. Cut them in pieces and put them in a bowl. Put in a little sugar and some juice. Wait ten minutes, then eat.",
      "הנה סלט הפירות של סבתא שלי. קחו שני תפוחים, שתי בננות ותפוז אחד. חתכו אותם לחתיכות ושימו אותם בקערה. שימו קצת סוכר וקצת מיץ. חכו עשר דקות ואז אכלו.",
      [
        q("How many apples do you take?", "כמה תפוחים לוקחים?", ["Two", "Three", "Five", "One"], ["שניים", "שלושה", "חמישה", "אחד"], 0, "נאמר 'two apples'."),
        q("How long must you wait?", "כמה זמן צריך לחכות?", ["Ten minutes", "Forty minutes", "One hour", "Two minutes"], ["עשר דקות", "ארבעים דקות", "שעה", "שתי דקות"], 0, "נאמר 'Wait ten minutes'."),
      ],
    ),
    L(
      "Good morning, kids. Today we draw our families. Take a big piece of paper and a pencil. Draw your mother, your father and your brothers and sisters. Do not forget your pets.",
      "בוקר טוב, ילדים. היום אנחנו מציירים את המשפחות שלנו. קחו דף נייר גדול ועיפרון. ציירו את אמא, את אבא ואת האחים והאחיות. אל תשכחו את חיות המחמד.",
      [
        q("What do the kids draw?", "מה הילדים מציירים?", ["Their families", "Their houses", "Animals only", "Their school"], ["את המשפחות שלהם", "את הבתים שלהם", "רק חיות", "את בית הספר"], 0, "נאמר 'we draw our families'."),
        q("What must they not forget?", "מה הם לא צריכים לשכוח?", ["Their pets", "Their shoes", "Their books", "Their hats"], ["את חיות המחמד שלהם", "את הנעליים", "את הספרים", "את הכובעים"], 0, "נאמר 'Do not forget your pets'."),
      ],
    ),
    L(
      "Hello, kids. Before lunch please wash your hands. Use soap and warm water. Wash for one minute. Then dry your hands with a clean towel. Clean hands keep us healthy.",
      "שלום, ילדים. לפני ארוחת הצהריים בבקשה שטפו ידיים. השתמשו בסבון ובמים חמימים. שטפו דקה אחת. אחר כך יבשו את הידיים במגבת נקייה. ידיים נקיות שומרות עלינו בריאים.",
      [
        q("When must the children wash their hands?", "מתי הילדים צריכים לשטוף ידיים?", ["Before lunch", "After school", "At night", "Before bed"], ["לפני ארוחת הצהריים", "אחרי בית הספר", "בלילה", "לפני השינה"], 0, "נאמר 'Before lunch please wash your hands'."),
        q("How long must they wash?", "כמה זמן הם צריכים לשטוף?", ["One minute", "Ten minutes", "One hour", "Five minutes"], ["דקה אחת", "עשר דקות", "שעה", "חמש דקות"], 0, "נאמר 'Wash for one minute'."),
      ],
    ),
    L(
      "Dear parents, please read this paper. On Thursday our class goes to the farm. We leave at eight and come back at one. Please write your name and give the paper to your child. Thank you very much.",
      "הורים יקרים, בבקשה קראו את הנייר הזה. ביום חמישי הכיתה שלנו נוסעת לחווה. אנחנו יוצאים בשמונה וחוזרים באחת. בבקשה כתבו את שמכם ותנו את הנייר לילד. תודה רבה.",
      [
        q("Where does the class go on Thursday?", "לאן הכיתה נוסעת ביום חמישי?", ["To the farm", "To the zoo", "To the beach", "To the museum"], ["לחווה", "לגן החיות", "לים", "למוזיאון"], 0, "נאמר 'goes to the farm'."),
        q("What time do they come back?", "באיזו שעה הם חוזרים?", ["At one", "At eight", "At four", "At six"], ["באחת", "בשמונה", "בארבע", "בשש"], 0, "נאמר 'come back at one'."),
      ],
    ),
    L(
      "Hello, team. Here is the list for tomorrow's game. In the front there are three boys. In the middle there are four, and two are at the back. Please bring your shoes and water. The game starts at four.",
      "שלום, קבוצה. הנה הרשימה למשחק של מחר. מלפנים יש שלושה בנים. באמצע יש ארבעה, ושניים מאחור. בבקשה הביאו נעליים ומים. המשחק מתחיל בארבע.",
      [
        q("How many boys are in the front?", "כמה בנים יש מלפנים?", ["Three", "Four", "Two", "Five"], ["שלושה", "ארבעה", "שניים", "חמישה"], 0, "נאמר 'three boys' בחזית."),
        q("When does the game start?", "מתי המשחק מתחיל?", ["At four", "At two", "At six", "At nine"], ["בארבע", "בשתיים", "בשש", "בתשע"], 0, "נאמר 'The game starts at four'."),
      ],
    ),
    L(
      "Welcome to the farm. Here you can see cows, horses, sheep and chickens. The cows give us milk and the chickens give us eggs. You can give the sheep some bread.",
      "ברוכים הבאים לחווה. כאן אפשר לראות פרות, סוסים, כבשים ותרנגולות. הפרות נותנות לנו חלב והתרנגולות נותנות לנו ביצים. אפשר לתת לכבשים קצת לחם.",
      [
        q("What do the cows give us?", "מה הפרות נותנות לנו?", ["Milk", "Eggs", "Bread", "Cheese"], ["חלב", "ביצים", "לחם", "גבינה"], 0, "נאמר 'The cows give us milk'."),
        q("What do the chickens give us?", "מה התרנגולות נותנות לנו?", ["Eggs", "Milk", "Honey", "Meat"], ["ביצים", "חלב", "דבש", "בשר"], 0, "נאמר 'the chickens give us eggs'."),
      ],
    ),
    L(
      "Dad makes eggs for breakfast. He uses three eggs and a little butter. He cooks them for five minutes. We eat them with bread and a green salad.",
      "אבא מכין ביצים לארוחת בוקר. הוא משתמש בשלוש ביצים ובקצת חמאה. הוא מבשל אותן חמש דקות. אנחנו אוכלים אותן עם לחם וסלט ירוק.",
      [
        q("How many eggs does Dad use?", "בכמה ביצים אבא משתמש?", ["Three", "Two", "Five", "One"], ["שלוש", "שתיים", "חמש", "אחת"], 0, "נאמר 'three eggs'."),
        q("What do they eat with the eggs?", "מה הם אוכלים עם הביצים?", ["Bread and a green salad", "Rice", "Soup", "Cake"], ["לחם וסלט ירוק", "אורז", "מרק", "עוגה"], 0, "נאמר 'with bread and a green salad'."),
      ],
    ),
    L(
      "Guess what! I have a new bike. It is red and it has a bell. My father gives it to me for my birthday. Tomorrow I ride it to school. Come and see it after the lesson.",
      "נחשו מה! יש לי אופניים חדשים. הם אדומים ויש להם פעמון. אבא שלי נתן לי אותם ליום ההולדת. מחר אני רוכב עליהם לבית הספר. בואו לראות אותם אחרי השיעור.",
      [
        q("What color is the bike?", "באיזה צבע האופניים?", ["Red", "Blue", "Green", "Black"], ["אדומים", "כחולים", "ירוקים", "שחורים"], 0, "נאמר 'It is red'."),
        q("Who gives him the bike?", "מי נותן לו את האופניים?", ["His father", "His mother", "His uncle", "His teacher"], ["אבא שלו", "אמא שלו", "הדוד שלו", "המורה שלו"], 0, "נאמר 'My father gives it to me'."),
      ],
    ),
    L(
      "Today I am nine years old. It is my birthday! In the morning my parents sing to me and give me a gift. In the afternoon my friends come to the house. In the evening we eat a big chocolate cake.",
      "היום אני בן תשע. זה יום ההולדת שלי! בבוקר ההורים שלי שרים לי ונותנים לי מתנה. אחר הצהריים החברים שלי באים לבית. בערב אנחנו אוכלים עוגת שוקולד גדולה.",
      [
        q("How old is the speaker today?", "בן כמה הדובר היום?", ["Nine", "Eight", "Ten", "Seven"], ["תשע", "שמונה", "עשר", "שבע"], 0, "נאמר 'nine years old'."),
        q("What do they eat in the evening?", "מה הם אוכלים בערב?", ["A big chocolate cake", "Pizza", "Ice cream", "Soup"], ["עוגת שוקולד גדולה", "פיצה", "גלידה", "מרק"], 0, "נאמר 'a big chocolate cake'."),
      ],
    ),
    L(
      "Good morning, class. On Monday we have a short test. It is about the words from this week. Please read your notebooks at home. The test is not difficult. You only need a pencil.",
      "בוקר טוב, כיתה. ביום שני יש לנו מבחן קצר. הוא על המילים מהשבוע הזה. בבקשה קראו את המחברות בבית. המבחן לא קשה. אתם צריכים רק עיפרון.",
      [
        q("When is the test?", "מתי המבחן?", ["On Monday", "On Friday", "On Sunday", "Tomorrow"], ["ביום שני", "ביום שישי", "ביום ראשון", "מחר"], 0, "נאמר 'On Monday we have a short test'."),
        q("What do the kids need?", "מה הילדים צריכים?", ["A pencil", "A book", "A bag", "A ruler"], ["עיפרון", "ספר", "תיק", "סרגל"], 0, "נאמר 'You only need a pencil'."),
      ],
    ),
    L(
      "Hello, everyone. The film starts in five minutes. Please take your seats. Put your phones away and be quiet. If you have food, please eat it before the film. Have a good time.",
      "שלום לכולם. הסרט מתחיל בעוד חמש דקות. בבקשה שבו במקומות. הניחו את הטלפונים ושמרו על שקט. אם יש לכם אוכל, בבקשה אכלו אותו לפני הסרט. שיהיה לכם זמן טוב.",
      [
        q("When does the film start?", "מתי הסרט מתחיל?", ["In five minutes", "In one hour", "Tomorrow", "In ten minutes"], ["בעוד חמש דקות", "בעוד שעה", "מחר", "בעוד עשר דקות"], 0, "נאמר 'starts in five minutes'."),
        q("What must people do with their phones?", "מה אנשים צריכים לעשות עם הטלפונים?", ["Put them away", "Use them", "Give them to the teacher", "Take photos"], ["להניח אותם", "להשתמש בהם", "לתת למורה", "לצלם"], 0, "נאמר 'Put your phones away'."),
      ],
    ),
    L(
      "Hello, everyone. Please do not run near the pool. The floor is wet and you can get hurt. Please walk. Little kids must have a parent with them. The pool closes at six.",
      "שלום לכולם. בבקשה אל תרוצו ליד הבריכה. הרצפה רטובה ואפשר להיפצע. בבקשה לכו. ילדים קטנים חייבים להיות עם הורה. הבריכה נסגרת בשש.",
      [
        q("Why must you not run near the pool?", "למה אסור לרוץ ליד הבריכה?", ["The floor is wet", "It is hot", "It is dark", "It is late"], ["הרצפה רטובה", "חם", "חשוך", "מאוחר"], 0, "נאמר 'The floor is wet'."),
        q("When does the pool close?", "מתי הבריכה נסגרת?", ["At six", "At five", "At eight", "At ten"], ["בשש", "בחמש", "בשמונה", "בעשר"], 0, "נאמר 'The pool closes at six'."),
      ],
    ),
    L(
      "Come to the table, everyone. The soup is ready. It is hot, so be careful. We have chicken soup with carrots and rice. Take a piece of bread. Who wants a second bowl?",
      "בואו לשולחן, כולם. המרק מוכן. הוא חם, אז היזהרו. יש לנו מרק עוף עם גזר ואורז. קחו חתיכת לחם. מי רוצה קערה שנייה?",
      [
        q("What soup do they have?", "איזה מרק יש להם?", ["Chicken soup", "Fish soup", "Carrot soup", "Rice soup"], ["מרק עוף", "מרק דגים", "מרק גזר", "מרק אורז"], 0, "נאמר 'chicken soup'."),
        q("Why must they be careful?", "למה הם צריכים להיזהר?", ["The soup is hot", "The floor is wet", "The bread is old", "The bowl is broken"], ["המרק חם", "הרצפה רטובה", "הלחם ישן", "הקערה שבורה"], 0, "נאמר 'It is hot, so be careful'."),
      ],
    ),
    L(
      "Hello, my name is Ella. I live in a small town near the sea. I am ten years old and I have a little brother. I like drawing and swimming. I want a pen friend. Please write to me soon.",
      "שלום, שמי אלה. אני גרה בעיירה קטנה ליד הים. אני בת עשר ויש לי אח קטן. אני אוהבת לצייר ולשחות. אני רוצה חבר לעט. בבקשה כתבו לי בקרוב.",
      [
        q("Where does Ella live?", "איפה אלה גרה?", ["In a small town near the sea", "In a big city", "On a farm", "In the garden"], ["בעיירה קטנה ליד הים", "בעיר גדולה", "בחווה", "בגינה"], 0, "נאמר 'a small town near the sea'."),
        q("What does she want?", "מה היא רוצה?", ["A pen friend", "A pet", "A bike", "A phone"], ["חבר לעט", "חיית מחמד", "אופניים", "טלפון"], 0, "נאמר 'I want a pen friend'."),
      ],
    ),
    L(
      "Time for cake, everyone! Come and stand around the table. Turn off the lights. Now we sing happy birthday. Make a wish. Then I cut the cake for you all.",
      "הגיע הזמן לעוגה, כולם! בואו ועמדו מסביב לשולחן. כבו את האורות. עכשיו אנחנו שרים יום הולדת שמח. בקשו משאלה. אחר כך אני חותך לכולכם את העוגה.",
      [
        q("What do they sing?", "מה הם שרים?", ["Happy birthday", "A school song", "A holiday song", "A cartoon song"], ["יום הולדת שמח", "שיר בית ספר", "שיר חג", "שיר מסרט מצויר"], 0, "נאמר 'we sing happy birthday'."),
        q("Who cuts the cake?", "מי חותך את העוגה?", ["The speaker", "The mother", "A friend", "The teacher"], ["הדובר", "האמא", "חבר", "המורה"], 0, "נאמר 'I cut the cake'."),
      ],
    ),
    L(
      "Hello? Oh, I am sorry. Is it too early? It is only six o'clock in the morning. I forgot that you sleep late on Friday. Please go back to sleep. I call you again at ten. Sleep well!",
      "הלו? אוי, אני מצטער. זה מוקדם מדי? השעה רק שש בבוקר. שכחתי שאתם ישנים עד מאוחר ביום שישי. בבקשה חזרו לישון. אני מתקשר שוב בעשר. תישנו טוב!",
      [
        q("What time is it?", "מה השעה?", ["Six o'clock", "Ten o'clock", "Two o'clock", "Nine o'clock"], ["שש", "עשר", "שתיים", "תשע"], 0, "נאמר 'It is only six o'clock'."),
        q("When does the speaker call again?", "מתי הדובר מתקשר שוב?", ["At ten", "At six", "At eleven", "Tomorrow"], ["בעשר", "בשש", "באחת עשרה", "מחר"], 0, "נאמר 'I call you again at ten'."),
      ],
    ),
    L(
      "Good morning. Please put on your seat belts. The trip is short, but we go fast on the big road. Do not open the windows, please. If you feel sick, tell me. We are there in half an hour.",
      "בוקר טוב. בבקשה חגרו חגורות בטיחות. הנסיעה קצרה, אבל אנחנו נוסעים מהר בכביש הגדול. בבקשה אל תפתחו חלונות. אם אתם מרגישים לא טוב, תגידו לי. אנחנו שם בעוד חצי שעה.",
      [
        q("What must the kids put on?", "מה הילדים צריכים לחגור?", ["Seat belts", "Hats", "Coats", "Shoes"], ["חגורות בטיחות", "כובעים", "מעילים", "נעליים"], 0, "נאמר 'put on your seat belts'."),
        q("How long is the trip?", "כמה זמן הנסיעה?", ["Half an hour", "One hour", "Ten minutes", "Two hours"], ["חצי שעה", "שעה", "עשר דקות", "שעתיים"], 0, "נאמר 'in half an hour'."),
      ],
    ),
    L(
      "Excuse me, where is the library? Go straight on this road. At the end turn left. The library is next to the big school. It is a tall white building. It takes five minutes to walk.",
      "סליחה, איפה הספרייה? לכו ישר בכביש הזה. בסוף פנו שמאלה. הספרייה ליד בית הספר הגדול. זה בניין לבן גבוה. זה לוקח חמש דקות הליכה.",
      [
        q("Where is the library?", "איפה הספרייה?", ["Next to the big school", "Near the sea", "Next to the hotel", "Behind the park"], ["ליד בית הספר הגדול", "ליד הים", "ליד המלון", "מאחורי הפארק"], 0, "נאמר 'next to the big school'."),
        q("How long does it take to walk?", "כמה זמן לוקחת ההליכה?", ["Five minutes", "One hour", "Ten minutes", "One minute"], ["חמש דקות", "שעה", "עשר דקות", "דקה"], 0, "נאמר 'five minutes to walk'."),
      ],
    ),
    L(
      "Good morning, class. We start with a run. Run three times around the field. Then walk for two minutes and drink some water. After that we play a game with the ball. Ready? Go!",
      "בוקר טוב, כיתה. אנחנו מתחילים בריצה. רוצו שלוש פעמים סביב המגרש. אחר כך לכו שתי דקות ושתו קצת מים. אחרי זה נשחק משחק עם הכדור. מוכנים? קדימה!",
      [
        q("How many times must they run around the field?", "כמה פעמים הם צריכים לרוץ סביב המגרש?", ["Three", "Two", "Five", "Ten"], ["שלוש", "שתיים", "חמש", "עשר"], 0, "נאמר 'three times around the field'."),
        q("What do they do after the run?", "מה הם עושים אחרי הריצה?", ["Walk and drink water", "Go home", "Sleep", "Eat lunch"], ["הולכים ושותים מים", "הולכים הביתה", "ישנים", "אוכלים ארוחת צהריים"], 0, "נאמר 'walk for two minutes and drink some water'."),
      ],
    ),
    L(
      "My favourite animal is the horse. It is big and strong, and it is very kind. My uncle has a brown horse on his farm. Every summer I ride it. One day I want to have my own horse.",
      "החיה האהובה עליי היא הסוס. הוא גדול וחזק, והוא נחמד מאוד. לדוד שלי יש סוס חום בחווה שלו. בכל קיץ אני רוכב עליו. יום אחד אני רוצה סוס משלי.",
      [
        q("What is the speaker's favourite animal?", "מהי החיה האהובה על הדובר?", ["The horse", "The dog", "The cat", "The cow"], ["הסוס", "הכלב", "החתול", "הפרה"], 0, "נאמר 'My favourite animal is the horse'."),
        q("Whose horse does he ride?", "על הסוס של מי הוא רוכב?", ["His uncle's", "His father's", "His friend's", "His own"], ["של הדוד שלו", "של אבא שלו", "של חבר", "שלו"], 0, "נאמר 'My uncle has a brown horse'."),
      ],
    ),
    L(
      "Come and buy hot bread! A big bag is one dollar and a small bag is half a dollar. The bread is warm and good. We open at six in the morning and close at two.",
      "בואו וקנו לחם חם! שקית גדולה עולה דולר ושקית קטנה חצי דולר. הלחם חם וטוב. אנחנו פותחים בשש בבוקר וסוגרים בשתיים.",
      [
        q("How much is a big bag?", "כמה עולה שקית גדולה?", ["One dollar", "Half a dollar", "Two dollars", "Five dollars"], ["דולר אחד", "חצי דולר", "שני דולרים", "חמישה דולרים"], 0, "נאמר 'A big bag is one dollar'."),
        q("When does the shop close?", "מתי החנות נסגרת?", ["At two", "At six", "At four", "At nine"], ["בשתיים", "בשש", "בארבע", "בתשע"], 0, "נאמר 'close at two'."),
      ],
    ),
    L(
      "Wait, do not forget your lunch box! It is on the table next to the door. I put in a sandwich, an apple and a small bottle of water. Have a good day at school. I love you!",
      "חכה, אל תשכח את קופסת האוכל! היא על השולחן ליד הדלת. שמתי בפנים כריך, תפוח ובקבוק מים קטן. שיהיה לך יום טוב בבית הספר. אני אוהבת אותך!",
      [
        q("Where is the lunch box?", "איפה קופסת האוכל?", ["On the table next to the door", "In the bag", "In the car", "In the kitchen"], ["על השולחן ליד הדלת", "בתיק", "במכונית", "במטבח"], 0, "נאמר 'on the table next to the door'."),
        q("What is in the lunch box?", "מה בקופסת האוכל?", ["A sandwich, an apple and water", "Soup", "A cake", "Rice"], ["כריך, תפוח ומים", "מרק", "עוגה", "אורז"], 0, "נאמר 'a sandwich, an apple and a small bottle of water'."),
      ],
    ),
    L(
      "Good news, everyone! On Friday we go to the beach. We leave at nine in the morning. Take your towels, hats and swimming clothes. Mom makes sandwiches and Dad brings the ball. It is going to be a great day.",
      "חדשות טובות, כולם! ביום שישי אנחנו נוסעים לים. אנחנו יוצאים בתשע בבוקר. קחו מגבות, כובעים ובגדי ים. אמא מכינה כריכים ואבא מביא את הכדור. זה הולך להיות יום מצוין.",
      [
        q("When do they leave?", "מתי הם יוצאים?", ["At nine in the morning", "At six in the evening", "At two", "At night"], ["בתשע בבוקר", "בשש בערב", "בשתיים", "בלילה"], 0, "נאמר 'at nine in the morning'."),
        q("Who brings the ball?", "מי מביא את הכדור?", ["Dad", "Mom", "The teacher", "A friend"], ["אבא", "אמא", "המורה", "חבר"], 0, "נאמר 'Dad brings the ball'."),
      ],
    ),
    L(
      "Class, who knows the answer? Put your hand up, please. Do not talk. I choose one child to come to the board. Good, you are right! Everybody, say thank you to your friend.",
      "כיתה, מי יודע את התשובה? הרימו יד, בבקשה. אל תדברו. אני בוחרת ילד אחד שיבוא ללוח. יפה, צדקת! כולם, תגידו תודה לחבר שלכם.",
      [
        q("What must the children do to answer?", "מה הילדים צריכים לעשות כדי לענות?", ["Put their hand up", "Talk", "Stand up", "Come to the door"], ["להרים יד", "לדבר", "לקום", "לבוא לדלת"], 0, "נאמר 'Put your hand up'."),
        q("What does the teacher say to the child?", "מה המורה אומרת לילד?", ["You are right", "You are late", "Go home", "Be quiet"], ["צדקת", "אתה מאחר", "לך הביתה", "שקט"], 0, "נאמר 'you are right'."),
      ],
    ),
    L(
      "Happy holidays, my dear friends! I want you to have a lot of fun with your families. Eat good food, play games and go to the beach. I see you in September. Love, your teacher.",
      "חופשה נעימה, חברים יקרים שלי! אני רוצה שיהיה לכם הרבה כיף עם המשפחות. אכלו אוכל טוב, שחקו משחקים ולכו לים. נתראה בספטמבר. באהבה, המורה שלכם.",
      [
        q("When does the teacher see the kids again?", "מתי המורה רואה את הילדים שוב?", ["In September", "Tomorrow", "In June", "Next week"], ["בספטמבר", "מחר", "ביוני", "בשבוע הבא"], 0, "נאמר 'I see you in September'."),
        q("Who is the message from?", "ממי ההודעה?", ["The teacher", "A friend", "The mother", "The driver"], ["המורה", "חבר", "האמא", "הנהג"], 0, "נאמר 'your teacher'."),
      ],
    ),
    L(
      "When I grow up I want to be a teacher. I like kids and I like to read. My teacher is kind and she helps everyone. I want to be like her. I study a lot and I try to be a good student.",
      "כשאהיה גדול אני רוצה להיות מורה. אני אוהב ילדים ואני אוהב לקרוא. המורה שלי נחמדה והיא עוזרת לכולם. אני רוצה להיות כמוה. אני לומד הרבה ומנסה להיות תלמיד טוב.",
      [
        q("What does the speaker want to be?", "מה הדובר רוצה להיות?", ["A teacher", "A doctor", "A driver", "A cook"], ["מורה", "רופא", "נהג", "טבח"], 0, "נאמר 'I want to be a teacher'."),
        q("Why?", "למה?", ["His teacher is kind and helps everyone", "It is easy", "It is cheap", "His father is a teacher"], ["המורה שלו נחמדה ועוזרת לכולם", "זה קל", "זה זול", "אבא שלו מורה"], 0, "נאמר 'My teacher is kind and she helps everyone'."),
      ],
    ),
    L(
      "Time to go home, kids. Please put your books in your bags and push your chairs under the desks. Say goodbye to your friends. Have a good evening and do your homework. See you tomorrow morning!",
      "הגיע הזמן ללכת הביתה, ילדים. בבקשה שימו את הספרים בתיקים ודחפו את הכיסאות מתחת לשולחנות. תגידו להתראות לחברים. שיהיה לכם ערב טוב ועשו שיעורי בית. נתראה מחר בבוקר!",
      [
        q("What must the children put in their bags?", "מה הילדים צריכים לשים בתיקים?", ["Their books", "Their shoes", "Their lunch", "Their coats"], ["את הספרים", "את הנעליים", "את האוכל", "את המעילים"], 0, "נאמר 'put your books in your bags'."),
        q("What must they do in the evening?", "מה הם צריכים לעשות בערב?", ["Their homework", "Play football", "Go shopping", "Watch a film"], ["שיעורי בית", "לשחק כדורגל", "לקנות", "לראות סרט"], 0, "נאמר 'do your homework'."),
      ],
    ),
  ],
};
