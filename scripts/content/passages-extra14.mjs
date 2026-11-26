// Round 14 of additional Reading and Listening content — A1, batch 5 (the
// last A1 items: with these A1 has a curated reading and listening for every
// learning day).
//
// Same shape and rules as rounds 10–13: fully bilingual, two questions per
// item, written from the A1 word cards so the app's vocabulary gate shows
// every item. Topics are tracked in docs/CONTENT-TOPICS.md.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

// --- READING ---------------------------------------------------------------
export const MORE_READINGS14 = {
  A1: [
    R(
      "The Red Umbrella (המטרייה האדומה)",
      "I have a big red umbrella. When it rains, I open it and walk to school. My little brother runs under it too, and we both stay dry. At school I put it near the door.",
      "יש לי מטרייה אדומה גדולה. כשיורד גשם, אני פותח אותה והולך לבית הספר. אחי הקטן רץ מתחתיה גם כן, ושנינו נשארים יבשים. בבית הספר אני שם אותה ליד הדלת.",
      [
        g("umbrella", "noun", "מה שמגן מפני הגשם", "I open my umbrella.", "מטרייה"),
        g("dry", "adjective", "לא רטוב", "We stay dry.", "יבש"),
        g("door", "noun", "מה שפותחים כדי להיכנס", "I put it near the door.", "דלת"),
      ],
      [
        q("What color is the umbrella?", "באיזה צבע המטרייה?", ["Red", "Blue", "Green", "Black"], ["אדומה", "כחולה", "ירוקה", "שחורה"], 0, "כתוב 'a big red umbrella'."),
        q("Who runs under it too?", "מי רץ מתחתיה גם כן?", ["His little brother", "His sister", "His friend", "His teacher"], ["אחיו הקטן", "אחותו", "חברו", "המורה שלו"], 0, "כתוב 'My little brother runs under it too'."),
      ],
    ),
    R(
      "Drawing a House (מציירים בית)",
      "Today I draw a house. It has a red roof, two windows and a green door. I draw a tree next to the house and a bird in the sky. My teacher puts my picture on the wall.",
      "היום אני מצייר בית. יש לו גג אדום, שני חלונות ודלת ירוקה. אני מצייר עץ ליד הבית וציפור בשמיים. המורה שלי תולה את התמונה שלי על הקיר.",
      [
        g("roof", "noun", "החלק העליון של הבית", "The house has a red roof.", "גג"),
        g("draw", "verb", "ליצור תמונה", "I draw a house.", "לצייר"),
        g("picture", "noun", "ציור או תמונה", "The picture is on the wall.", "תמונה"),
      ],
      [
        q("What color is the roof?", "באיזה צבע הגג?", ["Red", "Green", "Blue", "Yellow"], ["אדום", "ירוק", "כחול", "צהוב"], 0, "כתוב 'a red roof'."),
        q("Where does the teacher put the picture?", "איפה המורה שמה את התמונה?", ["On the wall", "In a book", "In a box", "On the door"], ["על הקיר", "בספר", "בקופסה", "על הדלת"], 0, "כתוב 'on the wall'."),
      ],
    ),
    R(
      "The Pet Shop (חנות חיות המחמד)",
      "Near my school there is a pet shop. It has little dogs, white rabbits and yellow birds. I stop there every day and look at the animals. I want a small dog of my own.",
      "ליד בית הספר שלי יש חנות חיות מחמד. יש בה כלבים קטנים, ארנבים לבנים וציפורים צהובות. אני עוצר שם כל יום ומסתכל על החיות. אני רוצה כלב קטן משלי.",
      [
        g("pet", "noun", "חיה שחיה בבית", "I want a pet.", "חיית מחמד"),
        g("rabbit", "noun", "חיה קטנה עם אוזניים ארוכות", "The rabbit is white.", "ארנב"),
        g("own", "adjective", "שלי", "I want my own dog.", "משלי"),
      ],
      [
        q("What does the shop have?", "מה יש בחנות?", ["Dogs, rabbits and birds", "Fish only", "Cats only", "Horses"], ["כלבים, ארנבים וציפורים", "רק דגים", "רק חתולים", "סוסים"], 0, "כתוב 'little dogs, white rabbits and yellow birds'."),
        q("What does the writer want?", "מה הכותב רוצה?", ["A small dog", "A rabbit", "A bird", "A cat"], ["כלב קטן", "ארנב", "ציפור", "חתול"], 0, "כתוב 'a small dog of my own'."),
      ],
    ),
    R(
      "Feeding the Birds (מאכילים ציפורים)",
      "Every morning my grandmother puts bread on the roof. The birds come and eat it. She sits by the window with her tea and watches them. She says, \"They are my small friends.\"",
      "בכל בוקר סבתא שלי שמה לחם על הגג. הציפורים באות ואוכלות אותו. היא יושבת ליד החלון עם התה שלה ומסתכלת עליהן. היא אומרת: \"הן החברות הקטנות שלי.\"",
      [
        g("bread", "noun", "אוכל שאופים מקמח", "She puts bread on the roof.", "לחם"),
        g("watch", "verb", "להסתכל", "She watches the birds.", "להסתכל"),
        g("friend", "noun", "מי שאוהבים", "They are my small friends.", "חבר"),
      ],
      [
        q("What does Grandma put on the roof?", "מה סבתא שמה על הגג?", ["Bread", "Water", "Fruit", "Rice"], ["לחם", "מים", "פירות", "אורז"], 0, "כתוב 'puts bread on the roof'."),
        q("What does she drink?", "מה היא שותה?", ["Tea", "Milk", "Juice", "Coffee"], ["תה", "חלב", "מיץ", "קפה"], 0, "כתוב 'with her tea'."),
      ],
    ),
    R(
      "The Roof Garden (הגינה שעל הגג)",
      "My uncle has a small garden on the roof of his house. He grows tomatoes and flowers in boxes. On warm evenings we sit there and eat dinner. We can see the city from the roof.",
      "לדוד שלי יש גינה קטנה על הגג של הבית שלו. הוא מגדל עגבניות ופרחים בקופסאות. בערבים חמים אנחנו יושבים שם ואוכלים ארוחת ערב. מהגג אנחנו רואים את העיר.",
      [
        g("grow", "verb", "לגרום לצמח לגדול", "He grows tomatoes.", "לגדל"),
        g("box", "noun", "קופסה", "The tomatoes are in boxes.", "קופסה"),
        g("city", "noun", "מקום גדול עם הרבה אנשים", "We see the city.", "עיר"),
      ],
      [
        q("Where is the uncle's garden?", "איפה הגינה של הדוד?", ["On the roof", "Behind the house", "Near the sea", "At school"], ["על הגג", "מאחורי הבית", "ליד הים", "בבית הספר"], 0, "כתוב 'on the roof of his house'."),
        q("What do they do on warm evenings?", "מה הם עושים בערבים חמים?", ["Eat dinner there", "Sleep", "Play football", "Go shopping"], ["אוכלים שם ארוחת ערב", "ישנים", "משחקים כדורגל", "הולכים לקניות"], 0, "כתוב 'sit there and eat dinner'."),
      ],
    ),
    R(
      "The Mirror (המראה)",
      "In the hall of our house there is a big mirror. Every morning I look in the mirror and brush my hair. My little sister stands on a chair to see her face. She makes funny faces and we both laugh.",
      "במסדרון של הבית שלנו יש מראה גדולה. בכל בוקר אני מסתכל במראה ומסרק את השיער. אחותי הקטנה עומדת על כיסא כדי לראות את הפנים שלה. היא עושה פרצופים מצחיקים ושנינו צוחקים.",
      [
        g("mirror", "noun", "זכוכית שרואים בה את הפנים", "I look in the mirror.", "מראה"),
        g("hall", "noun", "מסדרון", "The mirror is in the hall.", "מסדרון"),
        g("hair", "noun", "מה שגדל על הראש", "I brush my hair.", "שיער"),
      ],
      [
        q("Where is the mirror?", "איפה המראה?", ["In the hall", "In the kitchen", "In the garden", "At school"], ["במסדרון", "במטבח", "בגינה", "בבית הספר"], 0, "כתוב 'In the hall of our house'."),
        q("What does the little sister stand on?", "על מה האחות הקטנה עומדת?", ["A chair", "A table", "A box", "The floor"], ["כיסא", "שולחן", "קופסה", "הרצפה"], 0, "כתוב 'stands on a chair'."),
      ],
    ),
    R(
      "The Picnic Basket (סל הפיקניק)",
      "My mother makes a big basket for our picnic. She puts in bread, cheese, tomatoes, fruit and a bottle of juice. We carry it to the park and sit under a tree. Everything is better outside.",
      "אמא שלי מכינה סל גדול לפיקניק שלנו. היא שמה בו לחם, גבינה, עגבניות, פירות ובקבוק מיץ. אנחנו נושאים אותו לפארק ויושבים מתחת לעץ. הכול יותר טוב בחוץ.",
      [
        g("basket", "noun", "כלי לנשיאת דברים", "She makes a basket.", "סל"),
        g("picnic", "noun", "ארוחה בחוץ", "We have a picnic.", "פיקניק"),
        g("juice", "noun", "משקה מפירות", "She puts in a bottle of juice.", "מיץ"),
      ],
      [
        q("What does the mother put in the basket?", "מה האמא שמה בסל?", ["Bread, cheese, tomatoes, fruit and juice", "Only cake", "Soup", "Pizza"], ["לחם, גבינה, עגבניות, פירות ומיץ", "רק עוגה", "מרק", "פיצה"], 0, "כתוב 'bread, cheese, tomatoes, fruit and a bottle of juice'."),
        q("Where do they sit?", "איפה הם יושבים?", ["Under a tree", "On a chair", "In a car", "At home"], ["מתחת לעץ", "על כיסא", "במכונית", "בבית"], 0, "כתוב 'sit under a tree'."),
      ],
    ),
    R(
      "A Bowl of Fruit (קערת פירות)",
      "On our kitchen table there is a bowl of fruit. It has red apples, yellow bananas and green grapes. Every afternoon I take a piece of fruit and eat it. My father says, \"Fruit is good for you.\"",
      "על שולחן המטבח שלנו יש קערת פירות. יש בה תפוחים אדומים, בננות צהובות וענבים ירוקים. בכל אחר צהריים אני לוקח פרי ואוכל אותו. אבא שלי אומר: \"פירות טובים בשבילך.\"",
      [
        g("bowl", "noun", "כלי עגול לאוכל", "There is a bowl of fruit.", "קערה"),
        g("grape", "noun", "פרי קטן ועגול", "The grapes are green.", "ענב"),
        g("fruit", "noun", "אוכל מתוק מעץ", "Fruit is good for you.", "פירות"),
      ],
      [
        q("Where is the bowl of fruit?", "איפה קערת הפירות?", ["On the kitchen table", "In the fridge", "In the bag", "On the sofa"], ["על שולחן המטבח", "במקרר", "בתיק", "על הספה"], 0, "כתוב 'On our kitchen table'."),
        q("What color are the grapes?", "באיזה צבע הענבים?", ["Green", "Red", "Yellow", "Blue"], ["ירוקים", "אדומים", "צהובים", "כחולים"], 0, "כתוב 'green grapes'."),
      ],
    ),
    R(
      "The Lift in Our Building (המעלית בבניין שלנו)",
      "We live on floor six, so we take the lift. It is small and old and it makes a funny noise. My little brother loves the button for our floor. When the door opens, he says, \"We are home!\"",
      "אנחנו גרים בקומה שש, ולכן אנחנו לוקחים את המעלית. היא קטנה וישנה והיא משמיעה רעש מצחיק. אחי הקטן אוהב את הכפתור של הקומה שלנו. כשהדלת נפתחת, הוא אומר: \"הגענו הביתה!\"",
      [
        g("lift", "noun", "מכונה שמעלה לקומות", "We take the lift.", "מעלית"),
        g("button", "noun", "דבר שלוחצים עליו", "He loves the button.", "כפתור"),
        g("floor", "noun", "קומה בבניין", "We live on floor six.", "קומה"),
      ],
      [
        q("Which floor do they live on?", "באיזו קומה הם גרים?", ["Floor six", "Floor one", "Floor two", "Floor ten"], ["קומה שש", "קומה אחת", "קומה שתיים", "קומה עשר"], 0, "כתוב 'floor six'."),
        q("Who loves the button?", "מי אוהב את הכפתור?", ["The little brother", "The mother", "The writer", "The father"], ["האח הקטן", "האמא", "הכותב", "האבא"], 0, "כתוב 'My little brother loves the button'."),
      ],
    ),
    R(
      "Swimming with Dad (שוחים עם אבא)",
      "On Friday morning my father takes me to the pool. We swim ten times from one side to the other. He is strong and fast, but I try to be fast too. After the swim we eat a banana and drink water.",
      "בבוקר יום שישי אבא שלי לוקח אותי לבריכה. אנחנו שוחים עשר פעמים מצד לצד. הוא חזק ומהיר, אבל אני מנסה להיות מהיר גם כן. אחרי השחייה אנחנו אוכלים בננה ושותים מים.",
      [
        g("pool", "noun", "מקום גדול עם מים לשחייה", "We go to the pool.", "בריכה"),
        g("side", "noun", "צד", "We swim from one side to the other.", "צד"),
        g("fast", "adjective", "לא איטי", "He is fast.", "מהיר"),
      ],
      [
        q("How many times do they swim?", "כמה פעמים הם שוחים?", ["Ten", "Two", "Five", "Twenty"], ["עשר", "שתיים", "חמש", "עשרים"], 0, "כתוב 'ten times'."),
        q("What do they eat after the swim?", "מה הם אוכלים אחרי השחייה?", ["A banana", "An apple", "A cake", "A sandwich"], ["בננה", "תפוח", "עוגה", "כריך"], 0, "כתוב 'eat a banana'."),
      ],
    ),
    R(
      "The Kite Festival (פסטיבל העפיפונים)",
      "Every spring there is a kite festival on the hill near our town. There are many kites in the sky. They are red, blue, yellow and green. My kite is small and white, but it goes very high.",
      "בכל אביב יש פסטיבל עפיפונים על הגבעה ליד העיירה שלנו. יש הרבה עפיפונים בשמיים. הם אדומים, כחולים, צהובים וירוקים. העפיפון שלי קטן ולבן, אבל הוא עולה גבוה מאוד.",
      [
        g("kite", "noun", "צעצוע שעף באוויר", "My kite is white.", "עפיפון"),
        g("festival", "noun", "אירוע גדול ושמח", "We go to a festival.", "פסטיבל"),
        g("hill", "noun", "הר קטן", "The festival is on the hill.", "גבעה"),
      ],
      [
        q("When is the kite festival?", "מתי פסטיבל העפיפונים?", ["Every spring", "Every winter", "Every summer", "Every night"], ["בכל אביב", "בכל חורף", "בכל קיץ", "בכל לילה"], 0, "כתוב 'Every spring'."),
        q("How is the writer's kite?", "איך העפיפון של הכותב?", ["Small and white", "Big and red", "Small and blue", "Big and green"], ["קטן ולבן", "גדול ואדום", "קטן וכחול", "גדול וירוק"], 0, "כתוב 'small and white'."),
      ],
    ),
    R(
      "Grandma's Apron (הסינר של סבתא)",
      "My grandmother has an old blue apron with white flowers. She wears it every time she cooks. When I was small, I hid in it. Now she gives me a small apron, and we cook together.",
      "לסבתא שלי יש סינר כחול ישן עם פרחים לבנים. היא לובשת אותו בכל פעם שהיא מבשלת. כשהייתי קטן, התחבאתי בו. עכשיו היא נותנת לי סינר קטן, ואנחנו מבשלים ביחד.",
      [
        g("apron", "noun", "בגד שמגן על הבגדים בבישול", "She wears an apron.", "סינר"),
        g("cook", "verb", "להכין אוכל", "We cook together.", "לבשל"),
        g("together", "adverb", "ביחד", "We cook together.", "ביחד"),
      ],
      [
        q("What color is Grandma's apron?", "באיזה צבע הסינר של סבתא?", ["Blue with white flowers", "Red", "Green", "Yellow"], ["כחול עם פרחים לבנים", "אדום", "ירוק", "צהוב"], 0, "כתוב 'an old blue apron with white flowers'."),
        q("What does Grandma give the writer now?", "מה סבתא נותנת לכותב עכשיו?", ["A small apron", "A big apron", "A book", "A hat"], ["סינר קטן", "סינר גדול", "ספר", "כובע"], 0, "כתוב 'a small apron'."),
      ],
    ),
    R(
      "A Walk in the Rain (טיול בגשם)",
      "I love to walk in the rain. I put on my yellow coat and my shoes. The rain is cold on my face and the street is empty. At home my mother gives me a towel and a cup of tea.",
      "אני אוהב ללכת בגשם. אני לובש את המעיל הצהוב ואת הנעליים. הגשם קר על הפנים שלי והרחוב ריק. בבית אמא שלי נותנת לי מגבת וכוס תה.",
      [
        g("rain", "noun", "מים שיורדים מהשמיים", "I walk in the rain.", "גשם"),
        g("empty", "adjective", "בלי כלום", "The street is empty.", "ריק"),
        g("towel", "noun", "בד לייבוש", "She gives me a towel.", "מגבת"),
      ],
      [
        q("What does the writer put on?", "מה הכותב לובש?", ["A yellow coat and shoes", "A hat", "A blue coat", "Shorts"], ["מעיל צהוב ונעליים", "כובע", "מעיל כחול", "מכנסיים קצרים"], 0, "כתוב 'my yellow coat and my shoes'."),
        q("What does the mother give him?", "מה האמא נותנת לו?", ["A towel and a cup of tea", "A book", "A cake", "A hat"], ["מגבת וכוס תה", "ספר", "עוגה", "כובע"], 0, "כתוב 'a towel and a cup of tea'."),
      ],
    ),
    R(
      "The Library Card (כרטיס הספרייה)",
      "Today I get my first library card. The woman at the desk writes my name on it. I can take three books for two weeks. I choose a book about animals, a book about stars and a funny story.",
      "היום אני מקבלת את כרטיס הספרייה הראשון שלי. האישה בדלפק כותבת עליו את השם שלי. אני יכולה לקחת שלושה ספרים לשבועיים. אני בוחרת ספר על חיות, ספר על כוכבים וסיפור מצחיק.",
      [
        g("library", "noun", "מקום עם הרבה ספרים", "I go to the library.", "ספרייה"),
        g("card", "noun", "כרטיס", "I get a library card.", "כרטיס"),
        g("choose", "verb", "לבחור", "I choose a book.", "לבחור"),
      ],
      [
        q("How many books can the writer take?", "כמה ספרים הכותבת יכולה לקחת?", ["Three", "One", "Five", "Ten"], ["שלושה", "אחד", "חמישה", "עשרה"], 0, "כתוב 'three books'."),
        q("For how long?", "לכמה זמן?", ["Two weeks", "One day", "One month", "One hour"], ["שבועיים", "יום אחד", "חודש", "שעה"], 0, "כתוב 'for two weeks'."),
      ],
    ),
    R(
      "Lemon Tea (תה לימון)",
      "When I have a cold, my mother makes me lemon tea. She puts honey and a piece of lemon in a hot cup. I hold the cup in my hands and drink it. After that I sleep and feel better.",
      "כשאני מצונן, אמא שלי מכינה לי תה לימון. היא שמה דבש וחתיכת לימון בכוס חמה. אני מחזיק את הכוס בידיים ושותה. אחר כך אני ישן ומרגיש טוב יותר.",
      [
        g("lemon", "noun", "פרי צהוב וחמוץ", "She puts lemon in the tea.", "לימון"),
        g("honey", "noun", "נוזל מתוק", "She adds honey.", "דבש"),
        g("hold", "verb", "לתפוס ביד", "I hold the cup.", "להחזיק"),
      ],
      [
        q("What does the mother put in the cup?", "מה האמא שמה בכוס?", ["Honey and a piece of lemon", "Sugar and milk", "Salt", "Ice"], ["דבש וחתיכת לימון", "סוכר וחלב", "מלח", "קרח"], 0, "כתוב 'honey and a piece of lemon'."),
        q("How does the writer feel after?", "איך הכותב מרגיש אחר כך?", ["Better", "Sad", "Hungry", "Angry"], ["טוב יותר", "עצוב", "רעב", "כועס"], 0, "כתוב 'feel better'."),
      ],
    ),
    R(
      "A Birthday Card (כרטיס יום הולדת)",
      "My friend has a birthday on Saturday. I make a card for him with a big blue ball on it. Inside I write, \"Happy birthday to my best friend!\" I put the card in an envelope and give it to him.",
      "לחבר שלי יש יום הולדת בשבת. אני מכין לו כרטיס עם כדור כחול גדול. בפנים אני כותב: \"יום הולדת שמח לחבר הכי טוב שלי!\" אני שם את הכרטיס במעטפה ונותן לו.",
      [
        g("card", "noun", "כרטיס ברכה", "I make a card.", "כרטיס ברכה"),
        g("envelope", "noun", "מה שמכניסים אליו מכתב", "I put the card in an envelope.", "מעטפה"),
        g("write", "verb", "לכתוב", "I write a message.", "לכתוב"),
      ],
      [
        q("What is on the card?", "מה על הכרטיס?", ["A big blue ball", "A red car", "A flower", "A house"], ["כדור כחול גדול", "מכונית אדומה", "פרח", "בית"], 0, "כתוב 'a big blue ball'."),
        q("Where does the writer put the card?", "איפה הכותב שם את הכרטיס?", ["In an envelope", "In a box", "In a bag", "In a book"], ["במעטפה", "בקופסה", "בתיק", "בספר"], 0, "כתוב 'in an envelope'."),
      ],
    ),
    R(
      "The Candy Shop (חנות הממתקים)",
      "Next to the bus stop there is a small candy shop. The window is full of sweets in many colors. I have two dollars, so I buy one chocolate and some sweets. I share them with my friends on the bus.",
      "ליד תחנת האוטובוס יש חנות ממתקים קטנה. החלון מלא בממתקים בצבעים רבים. יש לי שני דולרים, ולכן אני קונה שוקולד אחד וכמה ממתקים. אני חולק אותם עם החברים באוטובוס.",
      [
        g("candy", "noun", "ממתק", "I buy candy.", "ממתק"),
        g("share", "verb", "לחלוק", "I share them with my friends.", "לחלוק"),
        g("dollar", "noun", "כסף של ארצות הברית", "I have two dollars.", "דולר"),
      ],
      [
        q("How much money does the writer have?", "כמה כסף יש לכותב?", ["Two dollars", "Five dollars", "One dollar", "Ten dollars"], ["שני דולרים", "חמישה דולרים", "דולר אחד", "עשרה דולרים"], 0, "כתוב 'two dollars'."),
        q("What does the writer do with the sweets?", "מה הכותב עושה עם הממתקים?", ["He shares them with friends", "He eats them alone", "He loses them", "He gives them to his mother"], ["הוא חולק אותם עם החברים", "הוא אוכל אותם לבד", "הוא מאבד אותם", "הוא נותן אותם לאמא"], 0, "כתוב 'share them with my friends'."),
      ],
    ),
    R(
      "My Pillow (הכרית שלי)",
      "I have a white pillow. I put my head on it every night and I sleep well. When we go on a trip, I put it in my bag. I do not like to sleep with no pillow.",
      "יש לי כרית לבנה. אני שם עליה את הראש בכל לילה וישן טוב. כשאנחנו נוסעים לטיול, אני שם אותה בתיק. אני לא אוהב לישון בלי כרית.",
      [
        g("pillow", "noun", "מה ששמים עליו את הראש בלילה", "I have a white pillow.", "כרית"),
        g("trip", "noun", "נסיעה", "We go on a trip.", "טיול"),
        g("sleep", "verb", "לישון", "I sleep well.", "לישון"),
      ],
      [
        q("What is white?", "מה לבן?", ["The pillow", "The bag", "The bed", "The blanket"], ["הכרית", "התיק", "המיטה", "השמיכה"], 0, "כתוב 'a white pillow'."),
        q("Where does he put the pillow when they go on a trip?", "איפה הוא שם את הכרית כשהם נוסעים לטיול?", ["In his bag", "In the car", "On the bed", "In a box"], ["בתיק", "במכונית", "על המיטה", "בקופסה"], 0, "כתוב 'in my bag'."),
      ],
    ),
    R(
      "A Warm Blanket (שמיכה חמה)",
      "In winter the nights are cold. My grandmother gives me a big warm blanket. It is green and it smells of soap. I put it on my bed, and in the morning I do not want to get up.",
      "בחורף הלילות קרים. סבתא שלי נותנת לי שמיכה חמה גדולה. היא ירוקה והיא מריחה כמו סבון. אני שם אותה על המיטה שלי, ובבוקר אני לא רוצה לקום.",
      [
        g("blanket", "noun", "בד גדול ורך לשינה", "I have a warm blanket.", "שמיכה"),
        g("soap", "noun", "דבר לשטיפה", "The blanket smells of soap.", "סבון"),
        g("winter", "noun", "העונה הקרה", "In winter the nights are cold.", "חורף"),
      ],
      [
        q("What color is the blanket?", "באיזה צבע השמיכה?", ["Green", "Blue", "Red", "White"], ["ירוקה", "כחולה", "אדומה", "לבנה"], 0, "כתוב 'It is green'."),
        q("Why does the writer not want to get up?", "למה הכותב לא רוצה לקום?", ["The blanket is warm", "He is sick", "He is sad", "It is late"], ["השמיכה חמה", "הוא חולה", "הוא עצוב", "מאוחר"], 0, "כתוב 'a big warm blanket'."),
      ],
    ),
    R(
      "Ice on the Window (קרח על החלון)",
      "On a very cold morning there is ice on my window. I draw a smiley face on it with my finger. I see small clouds in the sky. I put on my hat and gloves and go out to play.",
      "בבוקר קר מאוד יש קרח על החלון שלי. אני מצייר עליו פרצוף מחייך עם האצבע. אני רואה עננים קטנים בשמיים. אני חובש כובע ולובש כפפות ויוצא לשחק.",
      [
        g("ice", "noun", "מים קפואים", "There is ice on the window.", "קרח"),
        g("finger", "noun", "חלק של היד", "I draw with my finger.", "אצבע"),
        g("cloud", "noun", "משהו לבן בשמיים", "I see small clouds.", "ענן"),
      ],
      [
        q("What does the writer draw on the ice?", "מה הכותב מצייר על הקרח?", ["A smiley face", "A house", "A tree", "A star"], ["פרצוף מחייך", "בית", "עץ", "כוכב"], 0, "כתוב 'a smiley face'."),
        q("What does the writer put on?", "מה הכותב לובש?", ["A hat and gloves", "Shorts", "A towel", "A scarf only"], ["כובע וכפפות", "מכנסיים קצרים", "מגבת", "רק צעיף"], 0, "כתוב 'my hat and gloves'."),
      ],
    ),
    R(
      "The Last Piece of Cake (חתיכת העוגה האחרונה)",
      "There is one piece of chocolate cake on the plate. My brother and I both want it. We look at each other and no one moves. Then our mother cuts it in two, and we each get a half.",
      "יש חתיכה אחת של עוגת שוקולד על הצלחת. אחי ואני רוצים אותה. אנחנו מסתכלים זה על זה ואף אחד לא זז. אז אמא שלנו חותכת אותה לשניים, וכל אחד מקבל חצי.",
      [
        g("piece", "noun", "חלק", "There is one piece of cake.", "חתיכה"),
        g("half", "noun", "אחד משני חלקים שווים", "We each get a half.", "חצי"),
        g("cut", "verb", "לחתוך", "Our mother cuts the cake.", "לחתוך"),
      ],
      [
        q("Who cuts the cake?", "מי חותך את העוגה?", ["The mother", "The brother", "The writer", "The father"], ["האמא", "האח", "הכותב", "האבא"], 0, "כתוב 'our mother cuts it in two'."),
        q("What does each child get?", "מה כל ילד מקבל?", ["A half", "A big cake", "Nothing", "A small piece of bread"], ["חצי", "עוגה גדולה", "כלום", "חתיכה קטנה של לחם"], 0, "כתוב 'we each get a half'."),
      ],
    ),
    R(
      "The Moon Over the Sea (הירח מעל הים)",
      "One summer night my family sits on the beach. The moon is round and yellow over the sea. A cool wind comes from the water. My father tells us a story, and we listen until the story ends.",
      "בלילה אחד של קיץ המשפחה שלי יושבת בחוף. הירח עגול וצהוב מעל הים. רוח קרירה באה מהמים. אבא שלי מספר לנו סיפור, ואנחנו מקשיבים עד שהסיפור נגמר.",
      [
        g("moon", "noun", "מה שמאיר בלילה", "The moon is round.", "ירח"),
        g("round", "adjective", "בצורת עיגול", "The moon is round.", "עגול"),
        g("listen", "verb", "להקשיב", "We listen to the story.", "להקשיב"),
      ],
      [
        q("What is the moon like?", "איך הירח?", ["Round and yellow", "Small and white", "Big and green", "Red"], ["עגול וצהוב", "קטן ולבן", "גדול וירוק", "אדום"], 0, "כתוב 'round and yellow'."),
        q("What does the father do?", "מה האבא עושה?", ["He tells a story", "He sings", "He sleeps", "He cooks"], ["הוא מספר סיפור", "הוא שר", "הוא ישן", "הוא מבשל"], 0, "כתוב 'tells us a story'."),
      ],
    ),
    R(
      "The Old Chair (הכיסא הישן)",
      "In our garden there is an old brown chair. My grandfather sits on it every afternoon. He reads his newspaper and drinks tea. When he goes home, the cat takes the chair and sleeps.",
      "בגינה שלנו יש כיסא חום ישן. סבא שלי יושב עליו בכל אחר צהריים. הוא קורא את העיתון שלו ושותה תה. כשהוא הולך הביתה, החתול תופס את הכיסא וישן.",
      [
        g("chair", "noun", "מה שיושבים עליו", "He sits on the old chair.", "כיסא"),
        g("garden", "noun", "מקום עם צמחים", "The chair is in the garden.", "גינה"),
        g("newspaper", "noun", "דפים עם חדשות", "He reads a newspaper.", "עיתון"),
      ],
      [
        q("What color is the chair?", "באיזה צבע הכיסא?", ["Brown", "Black", "White", "Green"], ["חום", "שחור", "לבן", "ירוק"], 0, "כתוב 'an old brown chair'."),
        q("Who takes the chair when Grandpa goes home?", "מי תופס את הכיסא כשסבא הולך הביתה?", ["The cat", "The dog", "A bird", "The writer"], ["החתול", "הכלב", "ציפור", "הכותב"], 0, "כתוב 'the cat takes the chair'."),
      ],
    ),
    R(
      "Counting Sheep (סופרים כבשים)",
      "I do not sleep well tonight. My mother tells me to close my eyes and think about sheep. I see one sheep, two sheep, three sheep near a small fence. At ten sheep I sleep.",
      "אני לא ישנה טוב הלילה. אמא שלי אומרת לי לעצום עיניים ולחשוב על כבשים. אני רואה כבשה אחת, שתי כבשים, שלוש כבשים ליד גדר קטנה. בכבשה העשירית אני ישנה.",
      [
        g("sheep", "noun", "חיה עם צמר", "I see a sheep.", "כבשה"),
        g("fence", "noun", "גדר", "The sheep go over a fence.", "גדר"),
        g("sleep", "verb", "לנוח בלילה", "I sleep well.", "לישון"),
      ],
      [
        q("What does the mother tell the writer to think about?", "על מה האמא אומרת לכותבת לחשוב?", ["Sheep", "Cows", "Birds", "Fish"], ["כבשים", "פרות", "ציפורים", "דגים"], 0, "כתוב 'think about sheep'."),
        q("When does the writer sleep?", "מתי הכותבת ישנה?", ["At ten sheep", "At three sheep", "At five sheep", "At one sheep"], ["בכבשה העשירית", "בשלוש כבשים", "בחמש כבשים", "בכבשה אחת"], 0, "כתוב 'At ten sheep'."),
      ],
    ),
  ],
};

// --- LISTENING -------------------------------------------------------------
export const MORE_LISTENINGS14 = {
  A1: [
    L(
      "Hi, it is Dad. I am at the station. My train is late, so I am home at seven, not six. Please start your homework. Mom is home, so ask her for help. See you soon, my dear!",
      "היי, זה אבא. אני בתחנה. הרכבת שלי מאחרת, ולכן אני בבית בשבע, לא בשש. בבקשה התחל את שיעורי הבית. אמא בבית, אז תבקש ממנה עזרה. נתראה בקרוב, יקירי!",
      [
        q("When is Dad home?", "מתי אבא בבית?", ["At seven", "At six", "At eight", "At nine"], ["בשבע", "בשש", "בשמונה", "בתשע"], 0, "נאמר 'home at seven, not six'."),
        q("What must the child start?", "מה הילד צריך להתחיל?", ["His homework", "His dinner", "A game", "A film"], ["שיעורי בית", "ארוחת ערב", "משחק", "סרט"], 0, "נאמר 'start your homework'."),
      ],
    ),
    L(
      "Good evening. This is the hotel. Your friend is waiting for you at the door. She has a red bag and a blue hat. Please come down in five minutes. Thank you.",
      "ערב טוב. זה המלון. החברה שלכם מחכה לכם ליד הדלת. יש לה תיק אדום וכובע כחול. בבקשה רדו בעוד חמש דקות. תודה.",
      [
        q("Where is the friend waiting?", "איפה החברה מחכה?", ["At the door", "In the room", "In the car", "At the pool"], ["ליד הדלת", "בחדר", "במכונית", "ליד הבריכה"], 0, "נאמר 'waiting for you at the door'."),
        q("What color is her hat?", "באיזה צבע הכובע שלה?", ["Blue", "Red", "Green", "Black"], ["כחול", "אדום", "ירוק", "שחור"], 0, "נאמר 'a blue hat'."),
      ],
    ),
    L(
      "Welcome to the pet shop. We have dogs, rabbits and birds. The rabbits are white and brown. A rabbit is ten dollars. Please do not put your fingers in the boxes. We are open until six.",
      "ברוכים הבאים לחנות חיות המחמד. יש לנו כלבים, ארנבים וציפורים. הארנבים לבנים וחומים. ארנב עולה עשרה דולרים. בבקשה אל תכניסו אצבעות לקופסאות. אנחנו פתוחים עד שש.",
      [
        q("How much is a rabbit?", "כמה עולה ארנב?", ["Ten dollars", "Five dollars", "Two dollars", "Twelve dollars"], ["עשרה דולרים", "חמישה דולרים", "שני דולרים", "שנים עשר דולר"], 0, "נאמר 'A rabbit is ten dollars'."),
        q("Until when is the shop open?", "עד מתי החנות פתוחה?", ["Until six", "Until five", "Until nine", "Until ten"], ["עד שש", "עד חמש", "עד תשע", "עד עשר"], 0, "נאמר 'open until six'."),
      ],
    ),
    L(
      "Every morning I feed the birds. I put bread on the roof and some water in a cup. The birds come at eight o'clock. There are five birds, and one is yellow. They are my friends.",
      "בכל בוקר אני מאכיל את הציפורים. אני שם לחם על הגג וקצת מים בכוס. הציפורים באות בשמונה. יש חמש ציפורים, ואחת מהן צהובה. הן החברות שלי.",
      [
        q("When do the birds come?", "מתי הציפורים באות?", ["At eight o'clock", "At six o'clock", "At two o'clock", "At night"], ["בשמונה", "בשש", "בשתיים", "בלילה"], 0, "נאמר 'at eight o'clock'."),
        q("How many birds are there?", "כמה ציפורים יש?", ["Five", "Two", "Ten", "Three"], ["חמש", "שתיים", "עשר", "שלוש"], 0, "נאמר 'There are five birds'."),
      ],
    ),
    L(
      "Good morning, class. Today we draw our houses. Take a pencil and a piece of paper. Draw a roof, a door and two windows. You can draw a tree, a dog or a car. You have ten minutes.",
      "בוקר טוב, כיתה. היום אנחנו מציירים את הבתים שלנו. קחו עיפרון ודף נייר. ציירו גג, דלת ושני חלונות. אפשר לצייר עץ, כלב או מכונית. יש לכם עשר דקות.",
      [
        q("What do the kids draw?", "מה הילדים מציירים?", ["Their houses", "Their families", "Animals", "Cars"], ["את הבתים שלהם", "את המשפחות שלהם", "חיות", "מכוניות"], 0, "נאמר 'we draw our houses'."),
        q("What can they draw?", "מה הם יכולים לצייר?", ["A tree, a dog or a car", "A boat", "A fish", "A king"], ["עץ, כלב או מכונית", "סירה", "דג", "מלך"], 0, "נאמר 'a tree, a dog or a car'."),
      ],
    ),
    L(
      "This is our building. It is tall and old. We live on floor four. There are two doors on every floor. Our door is green. Come and visit us!",
      "זה הבניין שלנו. הוא גבוה וישן. אנחנו גרים בקומה ארבע. יש שתי דלתות בכל קומה. הדלת שלנו ירוקה. בואו לבקר אותנו!",
      [
        q("Which floor do they live on?", "באיזו קומה הם גרים?", ["Floor four", "Floor six", "Floor one", "Floor two"], ["קומה ארבע", "קומה שש", "קומה אחת", "קומה שתיים"], 0, "נאמר 'on floor four'."),
        q("What is green?", "מה ירוק?", ["Their door", "Their roof", "Their window", "Their wall"], ["הדלת שלהם", "הגג שלהם", "החלון שלהם", "הקיר שלהם"], 0, "נאמר 'Our door is green'."),
      ],
    ),
    L(
      "We have a big mirror in our hall. Every day I look in the mirror before I go to school. I check my hair and my shirt. My mother says, \"You look very nice.\" Then I smile and go out.",
      "יש לנו מראה גדולה במסדרון. בכל יום אני מסתכל במראה לפני שאני הולך לבית הספר. אני בודק את השיער ואת החולצה. אמא שלי אומרת: \"אתה נראה נהדר.\" אז אני מחייך ויוצא.",
      [
        q("Where is the mirror?", "איפה המראה?", ["In the hall", "In the kitchen", "In the garden", "At school"], ["במסדרון", "במטבח", "בגינה", "בבית הספר"], 0, "נאמר 'in our hall'."),
        q("What does the mother say?", "מה האמא אומרת?", ["You look very nice", "Hurry up", "Go to bed", "Be quiet"], ["אתה נראה נהדר", "מהר", "לך לישון", "שקט"], 0, "נאמר 'You look very nice'."),
      ],
    ),
    L(
      "Come on, it is time for our picnic. Take the basket and the blanket. We go to the park near the lake. There is bread, cheese and fruit in the basket. Do not forget the juice!",
      "קדימה, הגיע הזמן לפיקניק שלנו. קחו את הסל ואת השמיכה. אנחנו הולכים לפארק ליד האגם. בסל יש לחם, גבינה ופירות. אל תשכחו את המיץ!",
      [
        q("Where do they go?", "לאן הם הולכים?", ["To the park near the lake", "To the beach", "To school", "To the farm"], ["לפארק ליד האגם", "לים", "לבית הספר", "לחווה"], 0, "נאמר 'the park near the lake'."),
        q("What is in the basket?", "מה בסל?", ["Bread, cheese and fruit", "Fish", "Cake", "Soup"], ["לחם, גבינה ופירות", "דגים", "עוגה", "מרק"], 0, "נאמר 'bread, cheese and fruit'."),
      ],
    ),
    L(
      "Welcome to the library. You can get your first library card today. Please write your name and your address on this paper. You can take three books for two weeks. Bring them back on time.",
      "ברוכים הבאים לספרייה. אפשר לקבל היום את כרטיס הספרייה הראשון שלכם. בבקשה כתבו את השם והכתובת שלכם על הנייר הזה. אפשר לקחת שלושה ספרים לשבועיים. החזירו אותם בזמן.",
      [
        q("What must you write on the paper?", "מה צריך לכתוב על הנייר?", ["Your name and address", "Your age", "Your phone", "Your school"], ["את השם והכתובת", "את הגיל", "את הטלפון", "את בית הספר"], 0, "נאמר 'your name and your address'."),
        q("How many books can you take?", "כמה ספרים אפשר לקחת?", ["Three", "One", "Five", "Ten"], ["שלושה", "אחד", "חמישה", "עשרה"], 0, "נאמר 'three books'."),
      ],
    ),
    L(
      "Hello. I want to buy sweets for my friends. Do you have chocolate? Yes? Good. Three chocolates and ten sweets, please. How much is it? Four dollars. Here you are. Thank you!",
      "שלום. אני רוצה לקנות ממתקים לחברים שלי. יש לכם שוקולד? כן? טוב. שלושה שוקולדים ועשרה ממתקים, בבקשה. כמה זה עולה? ארבעה דולרים. הנה. תודה!",
      [
        q("What does the person buy?", "מה האדם קונה?", ["Chocolates and sweets", "Cakes", "Fruit", "Ice cream"], ["שוקולדים וממתקים", "עוגות", "פירות", "גלידה"], 0, "נאמר 'Three chocolates and ten sweets'."),
        q("How much is it?", "כמה זה עולה?", ["Four dollars", "Two dollars", "Ten dollars", "One dollar"], ["ארבעה דולרים", "שני דולרים", "עשרה דולרים", "דולר אחד"], 0, "נאמר 'Four dollars'."),
      ],
    ),
    L(
      "My friend has a birthday on Saturday. I make him a card with a ball on it. I write, happy birthday to my best friend. Then I put the card in a bag. I give it to him at school.",
      "לחבר שלי יש יום הולדת בשבת. אני מכין לו כרטיס עם כדור. אני כותב: יום הולדת שמח לחבר הכי טוב שלי. אחר כך אני שם את הכרטיס בתיק. אני נותן לו אותו בבית הספר.",
      [
        q("What is on the card?", "מה על הכרטיס?", ["A ball", "A car", "A flower", "A star"], ["כדור", "מכונית", "פרח", "כוכב"], 0, "נאמר 'a card with a ball on it'."),
        q("Where does the speaker give the card?", "איפה הדובר נותן את הכרטיס?", ["At school", "At home", "At the park", "At the shop"], ["בבית הספר", "בבית", "בפארק", "בחנות"], 0, "נאמר 'at school'."),
      ],
    ),
    L(
      "It is raining, so take your umbrella. Put on your shoes and your coat. The bus is late today, but please go to the bus stop now. Be careful in the street. Have a good day at school!",
      "יורד גשם, אז קחו מטרייה. לבשו נעליים ומעיל. האוטובוס מאחר היום, אבל בבקשה לכו עכשיו לתחנה. היזהרו ברחוב. שיהיה לכם יום טוב בבית הספר!",
      [
        q("Why must they take an umbrella?", "למה הם צריכים לקחת מטרייה?", ["It is raining", "It is hot", "It is cold", "It is dark"], ["יורד גשם", "חם", "קר", "חשוך"], 0, "נאמר 'It is raining'."),
        q("What is the problem with the bus?", "מה הבעיה עם האוטובוס?", ["It is late", "It is full", "It is broken", "It is old"], ["הוא מאחר", "הוא מלא", "הוא שבור", "הוא ישן"], 0, "נאמר 'The bus is late today'."),
      ],
    ),
    L(
      "Look at this picture. Four kids play with a kite on a hill. The sky is blue and the kite is red. A dog runs next to them. A woman sits under a tree and reads a book.",
      "הסתכלו על התמונה הזאת. ארבעה ילדים משחקים עם עפיפון על גבעה. השמיים כחולים והעפיפון אדום. כלב רץ לידם. אישה יושבת מתחת לעץ וקוראת ספר.",
      [
        q("How many kids are in the picture?", "כמה ילדים יש בתמונה?", ["Four", "Two", "Six", "Three"], ["ארבעה", "שניים", "שישה", "שלושה"], 0, "נאמר 'Four children'."),
        q("What color is the kite?", "באיזה צבע העפיפון?", ["Red", "Blue", "Green", "Yellow"], ["אדום", "כחול", "ירוק", "צהוב"], 0, "נאמר 'the kite is red'."),
      ],
    ),
    L(
      "Good evening, everyone. The pool closes in ten minutes. Please take your towels and your bags. Do not run on the wet floor. We open tomorrow at nine o'clock in the morning.",
      "ערב טוב לכולם. הבריכה נסגרת בעוד עשר דקות. בבקשה קחו את המגבות ואת התיקים. אל תרוצו על הרצפה הרטובה. אנחנו פתוחים מחר בתשע בבוקר.",
      [
        q("When does the pool close?", "מתי הבריכה נסגרת?", ["In ten minutes", "In one hour", "Tomorrow", "In two minutes"], ["בעוד עשר דקות", "בעוד שעה", "מחר", "בעוד שתי דקות"], 0, "נאמר 'closes in ten minutes'."),
        q("When does the pool open tomorrow?", "מתי הבריכה נפתחת מחר?", ["At nine", "At six", "At ten", "At eight"], ["בתשע", "בשש", "בעשר", "בשמונה"], 0, "נאמר 'at nine o'clock in the morning'."),
      ],
    ),
    L(
      "Today is the kite festival. We go to the big hill at ten o'clock. Take your kite and a hat. There are many kites in the sky. They are red, blue and yellow. It is a happy day.",
      "היום פסטיבל העפיפונים. אנחנו הולכים לגבעה הגדולה בעשר. קחו את העפיפון וכובע. יש הרבה עפיפונים בשמיים. הם אדומים, כחולים וצהובים. זה יום שמח.",
      [
        q("When do they go to the hill?", "מתי הם הולכים לגבעה?", ["At ten o'clock", "At six o'clock", "At two o'clock", "At nine o'clock"], ["בעשר", "בשש", "בשתיים", "בתשע"], 0, "נאמר 'at ten o'clock'."),
        q("What must they take?", "מה הם צריכים לקחת?", ["A kite and a hat", "A ball", "A book", "A bag only"], ["עפיפון וכובע", "כדור", "ספר", "רק תיק"], 0, "נאמר 'Take your kite and a hat'."),
      ],
    ),
    L(
      "My grandmother has a blue apron. She wears it when she cooks. I help her in the kitchen. We make soup and bread together. She says, \"You are my best friend.\" I am very happy.",
      "לסבתא שלי יש סינר כחול. היא לובשת אותו כשהיא מבשלת. אני עוזר לה במטבח. אנחנו מכינים מרק ולחם ביחד. היא אומרת: \"אתה החבר הכי טוב שלי.\" אני שמח מאוד.",
      [
        q("What color is the apron?", "באיזה צבע הסינר?", ["Blue", "Red", "Green", "White"], ["כחול", "אדום", "ירוק", "לבן"], 0, "נאמר 'a blue apron'."),
        q("What do they make together?", "מה הם מכינים ביחד?", ["Soup and bread", "Cake", "Salad", "Pizza"], ["מרק ולחם", "עוגה", "סלט", "פיצה"], 0, "נאמר 'soup and bread together'."),
      ],
    ),
    L(
      "I love the rain. When it rains, I put on my coat and walk in the street. It is cold. At home my mother gives me a towel and hot tea. I feel warm and happy.",
      "אני אוהב את הגשם. כשיורד גשם, אני לובש מעיל והולך ברחוב. קר. בבית אמא שלי נותנת לי מגבת ותה חם. אני מרגיש חם ושמח.",
      [
        q("What does the speaker do when it rains?", "מה הדובר עושה כשיורד גשם?", ["He walks in the street", "He sleeps", "He plays football", "He cooks"], ["הוא הולך ברחוב", "הוא ישן", "הוא משחק כדורגל", "הוא מבשל"], 0, "נאמר 'walk in the street'."),
        q("What does his mother give him?", "מה אמא שלו נותנת לו?", ["A towel and hot tea", "A book", "A cake", "A hat"], ["מגבת ותה חם", "ספר", "עוגה", "כובע"], 0, "נאמר 'a towel and hot tea'."),
      ],
    ),
    L(
      "I do not feel well. I have a cold. My mother makes me hot tea with honey and lemon. I drink it in my bed. Then I sleep for two hours. In the evening I feel much better.",
      "אני לא מרגיש טוב. אני מצונן. אמא שלי מכינה לי תה חם עם דבש ולימון. אני שותה אותו במיטה. אחר כך אני ישן שעתיים. בערב אני מרגיש הרבה יותר טוב.",
      [
        q("What does the mother put in the tea?", "מה האמא שמה בתה?", ["Honey and lemon", "Sugar and milk", "Salt", "Ice"], ["דבש ולימון", "סוכר וחלב", "מלח", "קרח"], 0, "נאמר 'honey and lemon'."),
        q("How long does the speaker sleep?", "כמה זמן הדובר ישן?", ["Two hours", "One hour", "Ten minutes", "All day"], ["שעתיים", "שעה", "עשר דקות", "כל היום"], 0, "נאמר 'two hours'."),
      ],
    ),
    L(
      "I sleep well with my blanket. It is white. When we go on a trip, I put it in my bag. My brother laughs at me. He says I am too old for a blanket in the bag.",
      "אני ישן טוב עם השמיכה שלי. היא לבנה. כשאנחנו נוסעים לטיול, אני שם אותה בתיק. אחי צוחק עליי. הוא אומר שאני גדול מדי בשביל שמיכה בתיק.",
      [
        q("What is white?", "מה לבן?", ["The blanket", "The bag", "The bed", "The shirt"], ["השמיכה", "התיק", "המיטה", "החולצה"], 0, "נאמר 'It is white'."),
        q("Who laughs at the speaker?", "מי צוחק על הדובר?", ["His brother", "His sister", "His father", "His friend"], ["אחיו", "אחותו", "אביו", "חברו"], 0, "נאמר 'My brother laughs at me'."),
      ],
    ),
    L(
      "It is a cold night, so take a warm blanket. Put it on your bed and cover your feet. Close the window, please. Turn off the light. Good night, my dear. Sleep well.",
      "זה לילה קר, אז קחו שמיכה חמה. שימו אותה על המיטה וכסו את הרגליים. סגרו את החלון, בבקשה. כבו את האור. לילה טוב, יקיריי. תישנו טוב.",
      [
        q("Why must you take a warm blanket?", "למה צריך לקחת שמיכה חמה?", ["It is a cold night", "It is hot", "It is Friday", "It is raining"], ["זה לילה קר", "חם", "זה יום שישי", "יורד גשם"], 0, "נאמר 'It is a cold night'."),
        q("What must you close?", "מה צריך לסגור?", ["The window", "The door", "A book", "The bag"], ["את החלון", "את הדלת", "ספר", "את התיק"], 0, "נאמר 'Close the window'."),
      ],
    ),
    L(
      "Look, there is one piece of cake left. Who wants it? My brother and I both want it. So Mom cuts it in two. Now we each have a half. We eat it with a glass of milk.",
      "תראו, נשארה חתיכת עוגה אחת. מי רוצה אותה? אחי ואני רוצים אותה. אז אמא חותכת אותה לשניים. עכשיו לכל אחד יש חצי. אנחנו אוכלים אותה עם כוס חלב.",
      [
        q("Who cuts the cake?", "מי חותך את העוגה?", ["Mom", "Dad", "The brother", "The speaker"], ["אמא", "אבא", "האח", "הדובר"], 0, "נאמר 'Mom cuts it in two'."),
        q("What do they drink with the cake?", "מה הם שותים עם העוגה?", ["Milk", "Tea", "Juice", "Water"], ["חלב", "תה", "מיץ", "מים"], 0, "נאמר 'a glass of milk'."),
      ],
    ),
    L(
      "On summer nights we sit on the beach. The moon is big and the stars are bright. My father tells a story about a little boat. We listen and watch the sea. Then we go home and sleep.",
      "בלילות קיץ אנחנו יושבים בחוף. הירח גדול והכוכבים בהירים. אבא שלי מספר סיפור על סירה קטנה. אנחנו מקשיבים ומסתכלים על הים. אחר כך אנחנו חוזרים הביתה וישנים.",
      [
        q("What is the story about?", "על מה הסיפור?", ["A little boat", "A big dog", "A king", "A school"], ["סירה קטנה", "כלב גדול", "מלך", "בית ספר"], 0, "נאמר 'a story about a little boat'."),
        q("What do they do after the story?", "מה הם עושים אחרי הסיפור?", ["They go home and sleep", "They swim", "They eat", "They play"], ["הם חוזרים הביתה וישנים", "הם שוחים", "הם אוכלים", "הם משחקים"], 0, "נאמר 'go home and sleep'."),
      ],
    ),
    L(
      "In our garden there is an old brown chair. My grandfather sits on it in the afternoon. He drinks tea and reads the newspaper. Sometimes the cat sleeps on his knees. He says the chair is his best friend.",
      "בגינה שלנו יש כיסא חום ישן. סבא שלי יושב עליו אחר הצהריים. הוא שותה תה וקורא עיתון. לפעמים החתול ישן לו על הברכיים. הוא אומר שהכיסא הוא החבר הכי טוב שלו.",
      [
        q("Where does Grandpa sit?", "איפה סבא יושב?", ["On an old brown chair", "On the sofa", "On a bed", "On the floor"], ["על כיסא חום ישן", "על הספה", "על מיטה", "על הרצפה"], 0, "נאמר 'an old brown chair'."),
        q("What does the cat do?", "מה החתול עושה?", ["It sleeps on his knees", "It runs", "It eats", "It plays"], ["הוא ישן לו על הברכיים", "הוא רץ", "הוא אוכל", "הוא משחק"], 0, "נאמר 'the cat sleeps on his knees'."),
      ],
    ),
    L(
      "I do not sleep well tonight. My mother says, think about sheep. I close my eyes and see one sheep, two sheep, three sheep. At ten sheep I sleep.",
      "אני לא ישן טוב הלילה. אמא שלי אומרת: תחשוב על כבשים. אני עוצם עיניים ורואה כבשה אחת, שתי כבשים, שלוש כבשים. בכבשה העשירית אני ישן.",
      [
        q("What does the mother say?", "מה האמא אומרת?", ["Think about sheep", "Read a book", "Drink milk", "Go outside"], ["תחשוב על כבשים", "תקרא ספר", "תשתה חלב", "צא החוצה"], 0, "נאמר 'think about sheep'."),
        q("When does the speaker sleep?", "מתי הדובר ישן?", ["At ten sheep", "At three sheep", "At five sheep", "At one sheep"], ["בכבשה העשירית", "בשלוש כבשים", "בחמש כבשים", "בכבשה אחת"], 0, "נאמר 'At ten sheep I sleep'."),
      ],
    ),
  ],
};
