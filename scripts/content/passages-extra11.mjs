// Round 11 of additional Reading and Listening content — A1, batch 2.
//
// Same shape and rules as round 10 (passages-extra10.mjs): fully bilingual,
// two questions per item, written from the A1 word cards so the app's
// vocabulary gate shows every item. Topics are tracked in
// docs/CONTENT-TOPICS.md; check them before adding a round.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

// --- READING ---------------------------------------------------------------
export const MORE_READINGS11 = {
  A1: [
    R(
      "The Ice Cream Man (איש הגלידה)",
      "Every afternoon a man comes to our street with an ice cream truck. We hear his music and we run outside. I buy a cold chocolate ice cream. My sister likes the yellow one.",
      "בכל אחר צהריים בא איש לרחוב שלנו עם משאית גלידה. אנחנו שומעים את המוזיקה שלו ורצים החוצה. אני קונה גלידת שוקולד קרה. אחותי אוהבת את הצהובה.",
      [
        g("truck", "noun", "רכב גדול", "The truck is yellow.", "משאית"),
        g("street", "noun", "דרך בעיר", "We live on this street.", "רחוב"),
        g("chocolate", "noun", "ממתק חום ומתוק", "I like chocolate.", "שוקולד"),
      ],
      [
        q("When does the man come?", "מתי האיש בא?", ["Every afternoon", "Every morning", "Every night", "Every Friday"], ["כל אחר צהריים", "כל בוקר", "כל לילה", "כל יום שישי"], 0, "כתוב 'Every afternoon a man comes'."),
        q("What does the writer buy?", "מה הכותב קונה?", ["Chocolate ice cream", "A yellow ice cream", "A cake", "Juice"], ["גלידת שוקולד", "גלידה צהובה", "עוגה", "מיץ"], 0, "כתוב 'I buy a cold chocolate ice cream'."),
      ],
    ),
    R(
      "A New Haircut (תספורת חדשה)",
      "My hair is very long, so my mother takes me for a haircut. A woman cuts my hair. I sit on a big chair and I look in the mirror. Now my hair is short and I feel light.",
      "השיער שלי ארוך מאוד, ולכן אמא לוקחת אותי לתספורת. אישה גוזרת לי את השיער. אני יושב על כיסא גדול ומסתכל במראה. עכשיו השיער שלי קצר ואני מרגיש קל.",
      [
        g("haircut", "noun", "גזירת שיער", "I have a new haircut.", "תספורת"),
        g("mirror", "noun", "זכוכית שרואים בה את הפנים", "I look in the mirror.", "מראה"),
        g("short", "adjective", "לא ארוך", "My hair is short.", "קצר"),
      ],
      [
        q("Why does the mother take him for a haircut?", "למה האמא לוקחת אותו לתספורת?", ["His hair is very long", "He is sick", "It is his birthday", "He is hungry"], ["השיער שלו ארוך מאוד", "הוא חולה", "זה יום ההולדת שלו", "הוא רעב"], 0, "כתוב 'My hair is very long'."),
        q("What does the writer look in?", "במה הכותב מסתכל?", ["The mirror", "A book", "A bag", "A box"], ["במראה", "בספר", "בתיק", "בקופסה"], 0, "כתוב 'I look in the mirror'."),
      ],
    ),
    R(
      "Science Class (שיעור מדעים)",
      "Today in science class we learn about the sun. The teacher shows us a big picture. The sun is a star and it is very hot. We draw it in our notebooks.",
      "היום בשיעור מדעים אנחנו לומדים על השמש. המורה מראה לנו תמונה גדולה. השמש היא כוכב והיא חמה מאוד. אנחנו מציירים אותה במחברות.",
      [
        g("science", "noun", "לימוד על העולם והטבע", "I like science.", "מדעים"),
        g("sun", "noun", "הכוכב שנותן אור ביום", "The sun is hot.", "שמש"),
        g("notebook", "noun", "ספר עם דפים ריקים", "I draw in my notebook.", "מחברת"),
      ],
      [
        q("What do they learn about?", "על מה הם לומדים?", ["The sun", "The sea", "Animals", "Cars"], ["על השמש", "על הים", "על חיות", "על מכוניות"], 0, "כתוב 'we learn about the sun'."),
        q("What do they do in the notebooks?", "מה הם עושים במחברות?", ["They draw the sun", "They write a letter", "They eat", "They sleep"], ["הם מציירים את השמש", "הם כותבים מכתב", "הם אוכלים", "הם ישנים"], 0, "כתוב 'We draw it in our notebooks'."),
      ],
    ),
    R(
      "The Bus Driver (נהג האוטובוס)",
      "Our bus driver is a nice old man. He says good morning to every child. He drives carefully and he never gets angry. On the last day of school we give him a card.",
      "נהג האוטובוס שלנו הוא איש זקן ונחמד. הוא אומר בוקר טוב לכל ילד. הוא נוהג בזהירות ואף פעם לא כועס. ביום האחרון של הלימודים אנחנו נותנים לו כרטיס ברכה.",
      [
        g("driver", "noun", "אדם שנוהג", "The driver is nice.", "נהג"),
        g("angry", "adjective", "כועס", "He is not angry.", "כועס"),
        g("card", "noun", "נייר מקופל עם ברכה", "We give him a card.", "כרטיס ברכה"),
      ],
      [
        q("What does the driver say to every child?", "מה הנהג אומר לכל ילד?", ["Good morning", "Good night", "Sit down", "Be quiet"], ["בוקר טוב", "לילה טוב", "שב", "שקט"], 0, "כתוב 'He says good morning to every child'."),
        q("What do the children give him?", "מה הילדים נותנים לו?", ["A card", "A cake", "A hat", "A book"], ["כרטיס ברכה", "עוגה", "כובע", "ספר"], 0, "כתוב 'we give him a card'."),
      ],
    ),
    R(
      "A Big Storm (סערה גדולה)",
      "Tonight there is a big storm. The wind is strong and we hear the rain on the roof. I am a little afraid, so I sit with my mother. She holds my hand and we drink hot tea.",
      "הלילה יש סערה גדולה. הרוח חזקה ואנחנו שומעים את הגשם על הגג. אני קצת מפחדת, ולכן אני יושבת עם אמא. היא מחזיקה לי את היד ואנחנו שותות תה חם.",
      [
        g("storm", "noun", "מזג אוויר עם רוח וגשם חזקים", "The storm is big.", "סערה"),
        g("roof", "noun", "החלק העליון של הבית", "The rain is on the roof.", "גג"),
        g("afraid", "adjective", "מפחד", "I am a little afraid.", "מפחדת"),
      ],
      [
        q("How does the writer feel?", "איך הכותבת מרגישה?", ["A little afraid", "Very happy", "Bored", "Hungry"], ["קצת מפחדת", "שמחה מאוד", "משועממת", "רעבה"], 0, "כתוב 'I am a little afraid'."),
        q("What do they drink?", "מה הן שותות?", ["Hot tea", "Cold juice", "Milk", "Water"], ["תה חם", "מיץ קר", "חלב", "מים"], 0, "כתוב 'we drink hot tea'."),
      ],
    ),
    R(
      "A Letter from My Cousin (מכתב מבת הדודה)",
      "I get a letter from my cousin. She lives in a big city. She writes about her school and her new dog. I read the letter two times and then I write to her.",
      "אני מקבלת מכתב מבת הדודה שלי. היא גרה בעיר גדולה. היא כותבת על בית הספר שלה ועל הכלב החדש שלה. אני קוראת את המכתב פעמיים ואחר כך כותבת לה.",
      [
        g("letter", "noun", "הודעה כתובה בנייר", "I get a letter.", "מכתב"),
        g("write", "verb", "ליצור מילים בעט", "I write to her.", "לכתוב"),
        g("city", "noun", "מקום גדול עם הרבה אנשים", "She lives in a big city.", "עיר"),
      ],
      [
        q("Who writes the letter?", "מי כותבת את המכתב?", ["The cousin", "The teacher", "The aunt", "A friend"], ["בת הדודה", "המורה", "הדודה", "חברה"], 0, "כתוב 'I get a letter from my cousin'."),
        q("What does she write about?", "על מה היא כותבת?", ["Her school and her new dog", "Her room", "Her food", "Her car"], ["על בית הספר ועל הכלב החדש שלה", "על החדר שלה", "על האוכל שלה", "על המכונית שלה"], 0, "כתוב 'her school and her new dog'."),
      ],
    ),
    R(
      "Feeding the Ducks (מאכילים את הברווזים)",
      "On Sunday we go to the lake with some bread. There are many ducks on the water. They come near and they eat the bread. My little brother laughs and says, \"Quack, quack!\"",
      "ביום ראשון אנחנו הולכים לאגם עם קצת לחם. יש הרבה ברווזים על המים. הם מתקרבים ואוכלים את הלחם. אחי הקטן צוחק ואומר: \"קווא, קווא!\"",
      [
        g("duck", "noun", "ציפור שחיה על המים", "The duck is on the lake.", "ברווז"),
        g("lake", "noun", "מים גדולים באמצע האדמה", "We go to the lake.", "אגם"),
        g("bread", "noun", "אוכל שאופים מקמח", "I bring some bread.", "לחם"),
      ],
      [
        q("What do they bring to the lake?", "מה הם מביאים לאגם?", ["Bread", "Fish", "A ball", "A kite"], ["לחם", "דגים", "כדור", "עפיפון"], 0, "כתוב 'with some bread'."),
        q("What does the little brother say?", "מה אומר האח הקטן?", ["Quack, quack!", "Hello!", "Stop!", "Thank you!"], ["קווא, קווא!", "שלום!", "עצור!", "תודה!"], 0, "כתוב 'Quack, quack!'."),
      ],
    ),
    R(
      "Tea for Grandpa (תה לסבא)",
      "My grandfather is tired in the afternoon. I make him a cup of tea with sugar. I carry it to his chair. He says, \"Thank you, my dear. You are a good boy.\"",
      "סבא שלי עייף אחר הצהריים. אני מכין לו כוס תה עם סוכר. אני נושא אותה אל הכיסא שלו. הוא אומר: \"תודה, יקירי. אתה ילד טוב.\"",
      [
        g("cup", "noun", "כלי לשתייה", "I drink a cup of tea.", "כוס"),
        g("carry", "verb", "להחזיק ולהעביר", "I carry the tea.", "לשאת"),
        g("dear", "adjective", "אהוב", "Thank you, my dear.", "יקר"),
      ],
      [
        q("Why does the writer make tea?", "למה הכותב מכין תה?", ["Grandpa is tired", "Grandpa is sick", "It is cold", "It is Friday"], ["סבא עייף", "סבא חולה", "קר", "זה יום שישי"], 0, "כתוב 'My grandfather is tired'."),
        q("What does Grandpa say?", "מה סבא אומר?", ["You are a good boy", "Go to bed", "Be quiet", "I am hungry"], ["אתה ילד טוב", "לך לישון", "שקט", "אני רעב"], 0, "כתוב 'You are a good boy'."),
      ],
    ),
    R(
      "Our Class Party (המסיבה של הכיתה)",
      "Tomorrow we have a party in our classroom. I bring a big bottle of juice. My friends bring cake and cookies. The teacher puts music on and we all sing.",
      "מחר יש לנו מסיבה בכיתה. אני מביא בקבוק מיץ גדול. החברים שלי מביאים עוגה ועוגיות. המורה מדליקה מוזיקה וכולנו שרים.",
      [
        g("classroom", "noun", "החדר שלומדים בו", "We have a party in the classroom.", "כיתה"),
        g("bottle", "noun", "כלי לנוזלים", "I bring a bottle of juice.", "בקבוק"),
        g("sing", "verb", "להשמיע מוזיקה בקול", "We sing together.", "לשיר"),
      ],
      [
        q("What does the writer bring?", "מה הכותב מביא?", ["A bottle of juice", "A cake", "Cookies", "A ball"], ["בקבוק מיץ", "עוגה", "עוגיות", "כדור"], 0, "כתוב 'I bring a big bottle of juice'."),
        q("What do they do with the music?", "מה הם עושים עם המוזיקה?", ["They sing", "They sleep", "They run", "They read"], ["הם שרים", "הם ישנים", "הם רצים", "הם קוראים"], 0, "כתוב 'we all sing'."),
      ],
    ),
    R(
      "A Gift for Mom (מתנה לאמא)",
      "Tomorrow is my mother's birthday. I have no money, so I make a gift. I draw a picture of our house and put it in a frame. I hope she likes it.",
      "מחר יום ההולדת של אמא שלי. אין לי כסף, ולכן אני מכין מתנה. אני מצייר תמונה של הבית שלנו ושם אותה במסגרת. אני מקווה שהיא תאהב אותה.",
      [
        g("gift", "noun", "מה שנותנים ליום הולדת", "I make a gift.", "מתנה"),
        g("money", "noun", "מה שמשלמים בו", "I have no money.", "כסף"),
        g("frame", "noun", "מסגרת לתמונה", "I put it in a frame.", "מסגרת"),
      ],
      [
        q("Why does the writer make a gift?", "למה הכותב מכין מתנה?", ["He has no money", "It is cheap", "He is bored", "It is a game"], ["אין לו כסף", "זה זול", "הוא משועמם", "זה משחק"], 0, "כתוב 'I have no money, so I make a gift'."),
        q("What is in the picture?", "מה בתמונה?", ["Their house", "A dog", "A garden", "The school"], ["הבית שלהם", "כלב", "גינה", "בית הספר"], 0, "כתוב 'a picture of our house'."),
      ],
    ),
    R(
      "My Mother the Nurse (אמא שלי האחות)",
      "My mother is a nurse. She works at the hospital and she helps sick people. Sometimes she goes to work at night. In the morning she comes home, eats breakfast and sleeps.",
      "אמא שלי אחות. היא עובדת בבית החולים ועוזרת לאנשים חולים. לפעמים היא הולכת לעבודה בלילה. בבוקר היא חוזרת הביתה, אוכלת ארוחת בוקר וישנה.",
      [
        g("nurse", "noun", "אדם שעוזר לחולים", "My mother is a nurse.", "אחות"),
        g("hospital", "noun", "מקום שמטפלים בו בחולים", "She works at the hospital.", "בית חולים"),
        g("sometimes", "adverb", "לא תמיד", "Sometimes she works at night.", "לפעמים"),
      ],
      [
        q("Where does the mother work?", "איפה האמא עובדת?", ["At the hospital", "At a school", "At a shop", "At home"], ["בבית החולים", "בבית ספר", "בחנות", "בבית"], 0, "כתוב 'She works at the hospital'."),
        q("What does she do in the morning?", "מה היא עושה בבוקר?", ["She eats breakfast and sleeps", "She goes to work", "She plays", "She cooks dinner"], ["היא אוכלת ארוחת בוקר וישנה", "היא הולכת לעבודה", "היא משחקת", "היא מבשלת ארוחת ערב"], 0, "כתוב 'eats breakfast and sleeps'."),
      ],
    ),
    R(
      "A Saturday Walk (טיול של שבת)",
      "On Saturday morning my family goes for a walk. We walk to the river and back. My father carries my little sister. We see birds and trees and we are very happy.",
      "בשבת בבוקר המשפחה שלי יוצאת לטיול. אנחנו הולכים עד הנהר וחזרה. אבא שלי נושא את אחותי הקטנה. אנחנו רואים ציפורים ועצים ואנחנו מאוד שמחים.",
      [
        g("river", "noun", "מים שזורמים", "We walk to the river.", "נהר"),
        g("bird", "noun", "חיה עם כנפיים", "I see a bird.", "ציפור"),
        g("walk", "noun", "הליכה נעימה", "We go for a walk.", "טיול"),
      ],
      [
        q("Where does the family walk?", "לאן המשפחה הולכת?", ["To the river and back", "To school", "To the shop", "To the beach"], ["עד הנהר וחזרה", "לבית הספר", "לחנות", "לים"], 0, "כתוב 'We walk to the river and back'."),
        q("Who carries the little sister?", "מי נושא את האחות הקטנה?", ["The father", "The mother", "The writer", "The teacher"], ["האבא", "האמא", "הכותב", "המורה"], 0, "כתוב 'My father carries my little sister'."),
      ],
    ),
    R(
      "The Old Clock (השעון הישן)",
      "There is an old clock on the wall in our kitchen. It is big and it is brown. It makes a funny noise all day. My grandmother says it is one hundred years old.",
      "יש שעון ישן על הקיר במטבח שלנו. הוא גדול והוא חום. הוא משמיע רעש מצחיק כל היום. סבתא שלי אומרת שהוא בן מאה שנים.",
      [
        g("clock", "noun", "מכשיר שמראה מה השעה", "The clock is on the wall.", "שעון קיר"),
        g("wall", "noun", "צד של חדר", "The clock is on the wall.", "קיר"),
        g("hundred", "number", "100", "It is one hundred years old.", "מאה"),
      ],
      [
        q("Where is the clock?", "איפה השעון?", ["In the kitchen", "In the bedroom", "At school", "In the garden"], ["במטבח", "בחדר השינה", "בבית הספר", "בגינה"], 0, "כתוב 'in our kitchen'."),
        q("How old is the clock?", "בן כמה השעון?", ["One hundred years", "Ten years", "One year", "Five years"], ["מאה שנים", "עשר שנים", "שנה", "חמש שנים"], 0, "כתוב 'one hundred years old'."),
      ],
    ),
    R(
      "My Favourite Song (השיר האהוב עליי)",
      "I have a favourite song. It is about a little bird and a big blue sky. I listen to it every morning on my phone. My mother sings it with me in the kitchen.",
      "יש לי שיר אהוב. הוא על ציפור קטנה ושמיים כחולים גדולים. אני מקשיב לו כל בוקר בטלפון. אמא שלי שרה אותו איתי במטבח.",
      [
        g("song", "noun", "מוזיקה עם מילים", "I like this song.", "שיר"),
        g("listen", "verb", "להקשיב", "I listen to music.", "להקשיב"),
        g("sky", "noun", "מה שמעלינו", "The sky is blue.", "שמיים"),
      ],
      [
        q("What is the song about?", "על מה השיר?", ["A little bird and a blue sky", "A big dog", "A red car", "A school"], ["ציפור קטנה ושמיים כחולים", "כלב גדול", "מכונית אדומה", "בית ספר"], 0, "כתוב 'about a little bird and a big blue sky'."),
        q("Who sings it with the writer?", "מי שרה אותו עם הכותב?", ["The mother", "The father", "The teacher", "A friend"], ["האמא", "האבא", "המורה", "חבר"], 0, "כתוב 'My mother sings it with me'."),
      ],
    ),
    R(
      "The Broken Cup (הכוס השבורה)",
      "I drop a cup in the kitchen and it is broken. I am very sad. My father says, \"It is only a cup. Are you okay?\" Then we pick up the pieces together.",
      "אני מפילה כוס במטבח והיא נשברת. אני עצובה מאוד. אבא שלי אומר: \"זו רק כוס. את בסדר?\" אחר כך אנחנו אוספים את החתיכות ביחד.",
      [
        g("drop", "verb", "להפיל בלי כוונה", "I drop a cup.", "להפיל"),
        g("broken", "adjective", "לא שלם", "The cup is broken.", "שבור"),
        g("piece", "noun", "חלק קטן", "We pick up the pieces.", "חתיכה"),
      ],
      [
        q("What does the writer drop?", "מה הכותבת מפילה?", ["A cup", "A plate", "A bottle", "A phone"], ["כוס", "צלחת", "בקבוק", "טלפון"], 0, "כתוב 'I drop a cup'."),
        q("What does the father do?", "מה האבא עושה?", ["He helps pick up the pieces", "He is angry", "He leaves", "He laughs"], ["הוא עוזר לאסוף את החתיכות", "הוא כועס", "הוא הולך", "הוא צוחק"], 0, "כתוב 'we pick up the pieces together'."),
      ],
    ),
    R(
      "A Call to My Friend (שיחה לחבר)",
      "I call my friend after school. I say, \"Hello! Do you want to play?\" He says yes. We meet at the park at four o'clock. I take my ball and he takes his bike.",
      "אני מתקשר לחבר שלי אחרי בית הספר. אני אומר: \"שלום! אתה רוצה לשחק?\" הוא אומר כן. אנחנו נפגשים בפארק בארבע. אני לוקח את הכדור שלי והוא לוקח את האופניים שלו.",
      [
        g("call", "verb", "לדבר בטלפון", "I call my friend.", "להתקשר"),
        g("meet", "verb", "להיפגש", "We meet at the park.", "להיפגש"),
        g("ball", "noun", "חפץ עגול", "I take my ball.", "כדור"),
      ],
      [
        q("Where do the friends meet?", "איפה החברים נפגשים?", ["At the park", "At school", "At home", "At the shop"], ["בפארק", "בבית הספר", "בבית", "בחנות"], 0, "כתוב 'We meet at the park'."),
        q("What does the friend take?", "מה החבר לוקח?", ["His bike", "His ball", "His dog", "His book"], ["את האופניים שלו", "את הכדור שלו", "את הכלב שלו", "את הספר שלו"], 0, "כתוב 'he takes his bike'."),
      ],
    ),
    R(
      "The Tall Tree (העץ הגבוה)",
      "In our yard there is a very tall tree. It is older than my father. In summer we sit under it and it gives us shade. In autumn it has yellow leaves.",
      "בחצר שלנו יש עץ גבוה מאוד. הוא מבוגר יותר מאבא שלי. בקיץ אנחנו יושבים תחתיו והוא נותן לנו צל. בסתיו יש לו עלים צהובים.",
      [
        g("tall", "adjective", "גבוה", "The tree is tall.", "גבוה"),
        g("yard", "noun", "שטח ליד הבית", "The tree is in the yard.", "חצר"),
        g("shade", "noun", "מקום בלי שמש", "The tree gives us shade.", "צל"),
      ],
      [
        q("Where is the tree?", "איפה העץ?", ["In the yard", "In the park", "At school", "On the hill"], ["בחצר", "בפארק", "בבית הספר", "על הגבעה"], 0, "כתוב 'In our yard there is a very tall tree'."),
        q("What does the tree give in summer?", "מה העץ נותן בקיץ?", ["Shade", "Water", "Food", "Light"], ["צל", "מים", "אוכל", "אור"], 0, "כתוב 'it gives us shade'."),
      ],
    ),
    R(
      "My Little Sister's Doll (הבובה של אחותי הקטנה)",
      "My little sister has a doll with long black hair. She takes it to bed every night. She gives it a name and she talks to it. Yesterday the doll was lost, and my sister cried.",
      "לאחותי הקטנה יש בובה עם שיער שחור ארוך. היא לוקחת אותה למיטה בכל לילה. היא נותנת לה שם והיא מדברת איתה. אתמול הבובה אבדה, ואחותי בכתה.",
      [
        g("doll", "noun", "צעצוע בצורת אדם", "She has a doll.", "בובה"),
        g("cry", "verb", "לבכות", "She cries.", "לבכות"),
        g("lost", "adjective", "שלא נמצא", "The doll is lost.", "אבוד"),
      ],
      [
        q("What does the doll have?", "מה יש לבובה?", ["Long black hair", "A red hat", "A blue dress", "Big shoes"], ["שיער שחור ארוך", "כובע אדום", "שמלה כחולה", "נעליים גדולות"], 0, "כתוב 'long black hair'."),
        q("Why did the sister cry?", "למה האחות בכתה?", ["The doll is lost", "She is hungry", "She is sick", "It is late"], ["הבובה אבדה", "היא רעבה", "היא חולה", "מאוחר"], 0, "כתוב 'the doll was lost, and my sister cried'."),
      ],
    ),
    R(
      "Sending a Card (שולחים כרטיס ברכה)",
      "My aunt has a birthday on Sunday. I buy a card at the shop. I write, \"Happy birthday, I love you!\" Then my father takes the card to the mail box.",
      "לדודה שלי יש יום הולדת ביום ראשון. אני קונה כרטיס ברכה בחנות. אני כותב: \"יום הולדת שמח, אני אוהב אותך!\" אחר כך אבא לוקח את הכרטיס לתיבת הדואר.",
      [
        g("card", "noun", "נייר מקופל עם ברכה", "I buy a card.", "כרטיס ברכה"),
        g("mail", "noun", "מכתבים ודברים שנשלחים", "He takes it to the mail box.", "דואר"),
        g("happy", "adjective", "שמח", "Happy birthday!", "שמח"),
      ],
      [
        q("Who has a birthday?", "למי יש יום הולדת?", ["The aunt", "The mother", "The teacher", "A friend"], ["לדודה", "לאמא", "למורה", "לחבר"], 0, "כתוב 'My aunt has a birthday'."),
        q("Who takes the card to the mail box?", "מי לוקח את הכרטיס לתיבת הדואר?", ["The father", "The writer", "The aunt", "The sister"], ["האבא", "הכותב", "הדודה", "האחות"], 0, "כתוב 'my father takes the card'."),
      ],
    ),
    R(
      "The Lemon Tree (עץ הלימון)",
      "We have a lemon tree in our garden. In winter it has many yellow lemons. My mother makes lemon juice and puts a little sugar in it. It is cold and sweet.",
      "יש לנו עץ לימון בגינה. בחורף יש עליו הרבה לימונים צהובים. אמא שלי מכינה מיץ לימון ושמה בו קצת סוכר. הוא קר ומתוק.",
      [
        g("lemon", "noun", "פרי צהוב וחמוץ", "The lemon is yellow.", "לימון"),
        g("garden", "noun", "מקום עם צמחים ליד הבית", "The tree is in the garden.", "גינה"),
        g("juice", "noun", "משקה מפירות", "I drink lemon juice.", "מיץ"),
      ],
      [
        q("When does the tree have many lemons?", "מתי יש על העץ הרבה לימונים?", ["In winter", "In summer", "In spring", "At night"], ["בחורף", "בקיץ", "באביב", "בלילה"], 0, "כתוב 'In winter it has many yellow lemons'."),
        q("What does the mother put in the juice?", "מה האמא שמה במיץ?", ["A little sugar", "Salt", "Milk", "Ice cream"], ["קצת סוכר", "מלח", "חלב", "גלידה"], 0, "כתוב 'puts a little sugar in it'."),
      ],
    ),
    R(
      "Visiting My Aunt (מבקרים אצל דודה)",
      "On Friday we visit my aunt. She lives in a small flat near the market. She has a big white cat. I play with the cat and my aunt makes us lunch.",
      "ביום שישי אנחנו מבקרים אצל דודה שלי. היא גרה בדירה קטנה ליד השוק. יש לה חתול לבן גדול. אני משחק עם החתול ודודה מכינה לנו ארוחת צהריים.",
      [
        g("visit", "verb", "ללכת לראות מישהו", "We visit my aunt.", "לבקר"),
        g("flat", "noun", "דירה בבניין", "She lives in a small flat.", "דירה"),
        g("market", "noun", "מקום מכירה של אוכל", "The flat is near the market.", "שוק"),
      ],
      [
        q("Where does the aunt live?", "איפה הדודה גרה?", ["In a small flat near the market", "In a big house", "On a farm", "Near the sea"], ["בדירה קטנה ליד השוק", "בבית גדול", "בחווה", "ליד הים"], 0, "כתוב 'a small flat near the market'."),
        q("What does the aunt have?", "מה יש לדודה?", ["A big white cat", "A black dog", "A bird", "A fish"], ["חתול לבן גדול", "כלב שחור", "ציפור", "דג"], 0, "כתוב 'a big white cat'."),
      ],
    ),
    R(
      "The Street Where I Live (הרחוב שבו אני גר)",
      "I live on a quiet street. There are small houses and green trees on both sides. At the end of the street there is a shop. I know all the people and they all say hello to me.",
      "אני גר ברחוב שקט. יש בתים קטנים ועצים ירוקים משני הצדדים. בסוף הרחוב יש חנות. אני מכיר את כל האנשים והם כולם אומרים לי שלום.",
      [
        g("quiet", "adjective", "בלי רעש", "My street is quiet.", "שקט"),
        g("house", "noun", "מקום שגרים בו", "There are small houses.", "בית"),
        g("both", "determiner", "שניהם", "Trees are on both sides.", "שניהם"),
      ],
      [
        q("What is at the end of the street?", "מה יש בסוף הרחוב?", ["A shop", "A school", "A park", "A farm"], ["חנות", "בית ספר", "פארק", "חווה"], 0, "כתוב 'At the end of the street there is a shop'."),
        q("What do the people say?", "מה האנשים אומרים?", ["Hello", "Goodbye", "Stop", "Thank you"], ["שלום", "להתראות", "עצור", "תודה"], 0, "כתוב 'they all say hello to me'."),
      ],
    ),
    R(
      "Counting Stars (סופרים כוכבים)",
      "Tonight the sky is clear. My father and I sit on the roof and look up. We count the stars. I count to twelve and then I am tired. My father laughs and says there are more.",
      "הלילה השמיים בהירים. אבא שלי ואני יושבים על הגג ומסתכלים למעלה. אנחנו סופרים כוכבים. אני סופר עד שתים עשרה ואז אני עייף. אבא שלי צוחק ואומר שיש עוד.",
      [
        g("count", "verb", "לומר מספרים", "I count the stars.", "לספור"),
        g("star", "noun", "נקודת אור בשמיים", "I see a star.", "כוכב"),
        g("clear", "adjective", "בלי עננים", "The sky is clear.", "בהיר"),
      ],
      [
        q("Where do they sit?", "איפה הם יושבים?", ["On the roof", "In the garden", "At school", "In the car"], ["על הגג", "בגינה", "בבית הספר", "במכונית"], 0, "כתוב 'sit on the roof'."),
        q("Until what number does the writer count?", "עד איזה מספר הכותב סופר?", ["To twelve", "To ten", "To nine", "To five"], ["עד שתים עשרה", "עד עשר", "עד תשע", "עד חמש"], 0, "כתוב 'I count to twelve'."),
      ],
    ),
    R(
      "A Picnic by the Lake (פיקניק ליד האגם)",
      "On Saturday we have a picnic by the lake. We sit on a big blanket under a tree. We eat bread, cheese and fruit. After lunch I look at the water and I feel calm.",
      "בשבת יש לנו פיקניק ליד האגם. אנחנו יושבים על שמיכה גדולה מתחת לעץ. אנחנו אוכלים לחם, גבינה ופירות. אחרי ארוחת הצהריים אני מסתכל על המים ומרגיש רגוע.",
      [
        g("blanket", "noun", "בד גדול ורך", "We sit on a blanket.", "שמיכה"),
        g("fruit", "noun", "אוכל מתוק מעץ", "We eat fruit.", "פירות"),
        g("calm", "adjective", "רגוע", "I feel calm.", "רגוע"),
      ],
      [
        q("Where do they sit?", "איפה הם יושבים?", ["On a blanket under a tree", "On a chair", "In a car", "On the floor"], ["על שמיכה מתחת לעץ", "על כיסא", "במכונית", "על הרצפה"], 0, "כתוב 'on a big blanket under a tree'."),
        q("What do they eat?", "מה הם אוכלים?", ["Bread, cheese and fruit", "Pizza and cake", "Soup and rice", "Eggs and fish"], ["לחם, גבינה ופירות", "פיצה ועוגה", "מרק ואורז", "ביצים ודגים"], 0, "כתוב 'bread, cheese and fruit'."),
      ],
    ),
    R(
      "My First Day at School (היום הראשון שלי בבית הספר)",
      "Today is my first day at a new school. I am a little afraid, but my teacher is very kind. She shows me my desk and my chair. At lunch two girls say, \"Come and sit with us.\"",
      "היום הוא היום הראשון שלי בבית ספר חדש. אני קצת מפחדת, אבל המורה שלי נחמדה מאוד. היא מראה לי את השולחן ואת הכיסא שלי. בארוחת הצהריים שתי בנות אומרות: \"בואי שבי איתנו.\"",
      [
        g("first", "adjective", "ראשון", "It is my first day.", "ראשון"),
        g("desk", "noun", "שולחן לכתיבה", "This is my desk.", "שולחן כתיבה"),
        g("kind", "adjective", "נחמד ועוזר", "My teacher is kind.", "נחמד"),
      ],
      [
        q("How does the writer feel on the first day?", "איך הכותבת מרגישה ביום הראשון?", ["A little afraid", "Very angry", "Sick", "Tired"], ["קצת מפחדת", "כועסת מאוד", "חולה", "עייפה"], 0, "כתוב 'I am a little afraid'."),
        q("What do the two girls say?", "מה שתי הבנות אומרות?", ["Come and sit with us", "Go home", "Be quiet", "Good night"], ["בואי שבי איתנו", "לכי הביתה", "שקט", "לילה טוב"], 0, "כתוב 'Come and sit with us'."),
      ],
    ),
    R(
      "The Last Day of School (היום האחרון של הלימודים)",
      "It is the last day of school. We do not have lessons. We play games and eat cake in the classroom. I say goodbye to my teacher and I take my bag home. Now it is summer!",
      "זה היום האחרון של הלימודים. אין לנו שיעורים. אנחנו משחקים ואוכלים עוגה בכיתה. אני נפרד מהמורה ולוקח את התיק הביתה. עכשיו זה קיץ!",
      [
        g("last", "adjective", "אחרון", "It is the last day.", "אחרון"),
        g("lesson", "noun", "זמן של לימוד", "We do not have lessons.", "שיעור"),
        g("goodbye", "noun", "מילה שאומרים כשהולכים", "I say goodbye.", "להתראות"),
      ],
      [
        q("What do the children do?", "מה הילדים עושים?", ["They play games and eat cake", "They write a test", "They read", "They sleep"], ["הם משחקים ואוכלים עוגה", "הם כותבים מבחן", "הם קוראים", "הם ישנים"], 0, "כתוב 'We play games and eat cake'."),
        q("What time of year is it now?", "איזו עונה עכשיו?", ["Summer", "Winter", "Autumn", "Spring"], ["קיץ", "חורף", "סתיו", "אביב"], 0, "כתוב 'Now it is summer'."),
      ],
    ),
    R(
      "Snow on the Mountain (שלג על ההר)",
      "In winter we go to a high mountain. There is white snow everywhere. I wear a warm coat, a hat and gloves. My brother and I make a big snowman with a red scarf.",
      "בחורף אנחנו נוסעים להר גבוה. יש שלג לבן בכל מקום. אני לובש מעיל חם, כובע וכפפות. אחי ואני בונים איש שלג גדול עם צעיף אדום.",
      [
        g("mountain", "noun", "גבעה גדולה מאוד", "We go to a high mountain.", "הר"),
        g("glove", "noun", "בגד ליד", "I wear gloves.", "כפפה"),
        g("scarf", "noun", "בד שלובשים על הצוואר", "The snowman has a red scarf.", "צעיף"),
      ],
      [
        q("What do they make?", "מה הם בונים?", ["A snowman", "A house", "A boat", "A kite"], ["איש שלג", "בית", "סירה", "עפיפון"], 0, "כתוב 'make a big snowman'."),
        q("What colour is the scarf?", "באיזה צבע הצעיף?", ["Red", "Blue", "Green", "Yellow"], ["אדום", "כחול", "ירוק", "צהוב"], 0, "כתוב 'a red scarf'."),
      ],
    ),
    R(
      "A Bath for the Dog (אמבטיה לכלב)",
      "Our dog is very dirty after the park. I put him in the bath with warm water and soap. He does not like it, and he shakes the water everywhere. My mother laughs and gives him a towel.",
      "הכלב שלנו מלוכלך מאוד אחרי הפארק. אני מכניס אותו לאמבטיה עם מים חמימים וסבון. הוא לא אוהב את זה, והוא מנער מים לכל מקום. אמא שלי צוחקת ונותנת לו מגבת.",
      [
        g("bath", "noun", "מקום לרחוץ בו", "I give the dog a bath.", "אמבטיה"),
        g("towel", "noun", "בד לייבוש", "She gives him a towel.", "מגבת"),
        g("soap", "noun", "דבר לשטיפה", "I use soap.", "סבון"),
      ],
      [
        q("Why does the dog need a bath?", "למה הכלב צריך אמבטיה?", ["He is very dirty", "He is sick", "He is hungry", "He is tired"], ["הוא מלוכלך מאוד", "הוא חולה", "הוא רעב", "הוא עייף"], 0, "כתוב 'very dirty after the park'."),
        q("What does the mother give the dog?", "מה האמא נותנת לכלב?", ["A towel", "A bone", "A ball", "Food"], ["מגבת", "עצם", "כדור", "אוכל"], 0, "כתוב 'gives him a towel'."),
      ],
    ),
    R(
      "The Little Boat (הסירה הקטנה)",
      "My uncle has a little boat. On Sunday he takes us out on the sea. The water is blue and quiet. We catch two fish and we eat them for dinner.",
      "לדוד שלי יש סירה קטנה. ביום ראשון הוא לוקח אותנו לים. המים כחולים ושקטים. אנחנו תופסים שני דגים ואוכלים אותם לארוחת ערב.",
      [
        g("boat", "noun", "כלי שט קטן", "My uncle has a boat.", "סירה"),
        g("catch", "verb", "לתפוס", "We catch two fish.", "לתפוס"),
        g("fish", "noun", "חיה שחיה במים", "We eat fish.", "דג"),
      ],
      [
        q("Whose boat is it?", "של מי הסירה?", ["The uncle's", "The father's", "The teacher's", "A friend's"], ["של הדוד", "של האבא", "של המורה", "של חבר"], 0, "כתוב 'My uncle has a little boat'."),
        q("How many fish do they catch?", "כמה דגים הם תופסים?", ["Two", "One", "Ten", "Five"], ["שניים", "אחד", "עשרה", "חמישה"], 0, "כתוב 'We catch two fish'."),
      ],
    ),
    R(
      "Learning to Cook Eggs (לומדים לבשל ביצים)",
      "My father teaches me to cook eggs. First I put a little butter in the pan. Then I break two eggs and add some salt. In five minutes we eat them with bread.",
      "אבא שלי מלמד אותי לבשל ביצים. קודם אני שם קצת חמאה במחבת. אחר כך אני שובר שתי ביצים ומוסיף מלח. בעוד חמש דקות אנחנו אוכלים אותן עם לחם.",
      [
        g("butter", "noun", "שומן מחלב", "I put butter in the pan.", "חמאה"),
        g("egg", "noun", "מה שמוציאה תרנגולת", "I break two eggs.", "ביצה"),
        g("pan", "noun", "כלי בישול עם ידית", "I put butter in the pan.", "מחבת"),
      ],
      [
        q("What does the writer put in the pan first?", "מה הכותב שם קודם במחבת?", ["A little butter", "Salt", "Bread", "Water"], ["קצת חמאה", "מלח", "לחם", "מים"], 0, "כתוב 'First I put a little butter'."),
        q("How many eggs does the writer use?", "כמה ביצים הכותב משתמש?", ["Two", "One", "Six", "Ten"], ["שתיים", "אחת", "שש", "עשר"], 0, "כתוב 'I break two eggs'."),
      ],
    ),
    R(
      "Watching the Game on TV (רואים את המשחק בטלוויזיה)",
      "Tonight there is a big football game on TV. My father, my brother and I sit on the sofa. We eat pizza and we shout. At the end our team wins, and we are very happy.",
      "הערב יש משחק כדורגל גדול בטלוויזיה. אבא שלי, אחי ואני יושבים על הספה. אנחנו אוכלים פיצה וצועקים. בסוף הקבוצה שלנו מנצחת, ואנחנו שמחים מאוד.",
      [
        g("game", "noun", "משחק", "There is a game on TV.", "משחק"),
        g("shout", "verb", "לדבר חזק מאוד", "We shout.", "לצעוק"),
        g("team", "noun", "קבוצה", "Our team wins.", "קבוצה"),
      ],
      [
        q("Where do they sit?", "איפה הם יושבים?", ["On the sofa", "On the floor", "At a table", "On the stairs"], ["על הספה", "על הרצפה", "ליד שולחן", "על המדרגות"], 0, "כתוב 'sit on the sofa'."),
        q("What happens at the end?", "מה קורה בסוף?", ["Their team wins", "Their team loses", "They go to bed", "They go out"], ["הקבוצה שלהם מנצחת", "הקבוצה שלהם מפסידה", "הם הולכים לישון", "הם יוצאים"], 0, "כתוב 'our team wins'."),
      ],
    ),
    R(
      "The Boy and the Bird (הילד והציפור)",
      "A small bird sits near my window every morning. I put a little bread near the window. The bird eats it and sings a song. I call the bird my friend.",
      "ציפור קטנה יושבת ליד החלון שלי בכל בוקר. אני שם קצת לחם ליד החלון. הציפור אוכלת אותו ושרה שיר. אני קורא לציפור החבר שלי.",
      [
        g("window", "noun", "פתח בקיר", "A bird sits on my window.", "חלון"),
        g("bird", "noun", "חיה עם כנפיים", "The bird sings.", "ציפור"),
        g("call", "verb", "לתת שם", "I call the bird my friend.", "לקרוא"),
      ],
      [
        q("Where does the bird sit?", "איפה הציפור יושבת?", ["Near the window", "On the roof", "On a tree", "On the door"], ["ליד החלון", "על הגג", "על עץ", "על הדלת"], 0, "כתוב 'sits near my window'."),
        q("What does the writer give the bird?", "מה הכותב נותן לציפור?", ["A little bread", "Water", "A fish", "An apple"], ["קצת לחם", "מים", "דג", "תפוח"], 0, "כתוב 'I put a little bread on the window'."),
      ],
    ),
    R(
      "At the Supermarket (בסופרמרקט)",
      "My mother and I go to the supermarket. It is a very big shop. We take a basket and buy milk, eggs and rice. I carry the basket and she pays at the end.",
      "אמא שלי ואני הולכות לסופרמרקט. זו חנות גדולה מאוד. אנחנו לוקחות סל וקונות חלב, ביצים ואורז. אני נושאת את הסל והיא משלמת בסוף.",
      [
        g("supermarket", "noun", "חנות גדולה לאוכל", "We go to the supermarket.", "סופרמרקט"),
        g("basket", "noun", "סל לקניות", "I carry the basket.", "סל"),
        g("pay", "verb", "לתת כסף", "She pays at the end.", "לשלם"),
      ],
      [
        q("What do they buy?", "מה הן קונות?", ["Milk, eggs and rice", "Bread and cake", "Fish and salad", "Shoes and coats"], ["חלב, ביצים ואורז", "לחם ועוגה", "דגים וסלט", "נעליים ומעילים"], 0, "כתוב 'milk, eggs and rice'."),
        q("Who pays?", "מי משלמת?", ["The mother", "The writer", "The teacher", "A friend"], ["האמא", "הכותבת", "המורה", "חברה"], 0, "כתוב 'she pays at the end'."),
      ],
    ),
    R(
      "Buying a Ticket (קונים כרטיס)",
      "We want to go to the cinema. At the door I say, \"Two tickets, please.\" The woman says, \"That is ten dollars.\" I give her the money and she gives me the tickets.",
      "אנחנו רוצים ללכת לקולנוע. ליד הדלת אני אומר: \"שני כרטיסים, בבקשה.\" האישה אומרת: \"זה עשרה דולרים.\" אני נותן לה את הכסף והיא נותנת לי את הכרטיסים.",
      [
        g("ticket", "noun", "נייר שנותן כניסה", "I buy two tickets.", "כרטיס"),
        g("cinema", "noun", "מקום לראות סרטים", "We go to the cinema.", "קולנוע"),
        g("dollar", "noun", "כסף של ארצות הברית", "It is ten dollars.", "דולר"),
      ],
      [
        q("How many tickets does the writer ask for?", "כמה כרטיסים הכותב מבקש?", ["Two", "One", "Four", "Ten"], ["שניים", "אחד", "ארבעה", "עשרה"], 0, "כתוב 'Two tickets, please'."),
        q("How much is it?", "כמה זה עולה?", ["Ten dollars", "Two dollars", "One dollar", "Five dollars"], ["עשרה דולרים", "שני דולרים", "דולר אחד", "חמישה דולרים"], 0, "כתוב 'That is ten dollars'."),
      ],
    ),
    R(
      "A Blue Bird at My Window (ציפור כחולה על החלון)",
      "This morning I see a blue bird on the tree near my window. It is small and very pretty. I take my camera and take a photo. I show it to my class at school.",
      "הבוקר אני רואה ציפור כחולה על העץ ליד החלון שלי. היא קטנה ויפה מאוד. אני לוקח את המצלמה ומצלם תמונה. אני מראה אותה לכיתה שלי בבית הספר.",
      [
        g("pretty", "adjective", "יפה", "The bird is pretty.", "יפה"),
        g("camera", "noun", "מכשיר לצילום", "I take my camera.", "מצלמה"),
        g("photo", "noun", "תמונה מצולמת", "I take a photo.", "תמונה"),
      ],
      [
        q("What colour is the bird?", "באיזה צבע הציפור?", ["Blue", "Red", "Yellow", "Green"], ["כחולה", "אדומה", "צהובה", "ירוקה"], 0, "כתוב 'a blue bird'."),
        q("What does the writer do with the photo?", "מה הכותב עושה עם התמונה?", ["He shows it to his class", "He gives it to his mother", "He loses it", "He draws it"], ["הוא מראה אותה לכיתה", "הוא נותן אותה לאמא", "הוא מאבד אותה", "הוא מצייר אותה"], 0, "כתוב 'I show it to my class'."),
      ],
    ),
    R(
      "A Cold Morning at the Bus Stop (בוקר קר בתחנה)",
      "It is a very cold morning. I wait at the bus stop with my sister. We have hats, coats and gloves. The bus is late, and we jump up and down to stay warm.",
      "זה בוקר קר מאוד. אני מחכה בתחנת האוטובוס עם אחותי. יש לנו כובעים, מעילים וכפפות. האוטובוס מאחר, ואנחנו מקפצות כדי להישאר חמות.",
      [
        g("wait", "verb", "להישאר עד שמשהו קורה", "I wait at the bus stop.", "לחכות"),
        g("late", "adjective", "אחרי הזמן", "The bus is late.", "מאחר"),
        g("warm", "adjective", "חם קצת", "We stay warm.", "חם"),
      ],
      [
        q("Where do they wait?", "איפה הן מחכות?", ["At the bus stop", "At school", "At home", "At the shop"], ["בתחנת האוטובוס", "בבית הספר", "בבית", "בחנות"], 0, "כתוב 'I wait at the bus stop'."),
        q("What is the problem?", "מה הבעיה?", ["The bus is late", "The bus is full", "They have no money", "They are hungry"], ["האוטובוס מאחר", "האוטובוס מלא", "אין להן כסף", "הן רעבות"], 0, "כתוב 'The bus is late'."),
      ],
    ),
    R(
      "Art Class: A Poster (שיעור אמנות: כרזה)",
      "In art class we make a poster about animals. I draw a big green frog. My friend draws a brown horse. The teacher puts our poster on the wall of the classroom.",
      "בשיעור אמנות אנחנו מכינים כרזה על חיות. אני מצייר צפרדע ירוקה גדולה. החבר שלי מצייר סוס חום. המורה תולה את הכרזה שלנו על קיר הכיתה.",
      [
        g("poster", "noun", "תמונה גדולה על הקיר", "We make a poster.", "כרזה"),
        g("frog", "noun", "חיה ירוקה וקופצת", "I draw a frog.", "צפרדע"),
        g("horse", "noun", "חיה גדולה שרוכבים עליה", "He draws a horse.", "סוס"),
      ],
      [
        q("What does the writer draw?", "מה הכותב מצייר?", ["A green frog", "A brown horse", "A red bird", "A white cat"], ["צפרדע ירוקה", "סוס חום", "ציפור אדומה", "חתול לבן"], 0, "כתוב 'I draw a big green frog'."),
        q("Where does the teacher put the poster?", "איפה המורה שמה את הכרזה?", ["On the wall", "In a box", "On the floor", "On a chair"], ["על הקיר", "בקופסה", "על הרצפה", "על כיסא"], 0, "כתוב 'on the wall of the classroom'."),
      ],
    ),
    R(
      "My Uncle's Taxi (המונית של הדוד)",
      "My uncle is a taxi driver. His taxi is yellow and very clean. He drives people to the station and to the airport. Sometimes he takes me for a ride and I sit in the front.",
      "הדוד שלי נהג מונית. המונית שלו צהובה ונקייה מאוד. הוא מסיע אנשים לתחנה ולשדה התעופה. לפעמים הוא לוקח אותי לנסיעה ואני יושב מלפנים.",
      [
        g("taxi", "noun", "רכב שנוסעים בו תמורת כסף", "My uncle has a taxi.", "מונית"),
        g("station", "noun", "מקום שרכבות או אוטובוסים עוצרים בו", "He drives to the station.", "תחנה"),
        g("front", "noun", "הצד הקדמי", "I sit in the front.", "מלפנים"),
      ],
      [
        q("What colour is the taxi?", "באיזה צבע המונית?", ["Yellow", "Red", "White", "Black"], ["צהובה", "אדומה", "לבנה", "שחורה"], 0, "כתוב 'His taxi is yellow'."),
        q("Where does the writer sit?", "איפה הכותב יושב?", ["In the front", "In the back", "On the roof", "Outside"], ["מלפנים", "מאחור", "על הגג", "בחוץ"], 0, "כתוב 'I sit in the front'."),
      ],
    ),
    R(
      "The Moon Tonight (הירח הלילה)",
      "Tonight the moon is big and round. It is very bright in the sky. I look at it from my bed. My grandfather says the moon is like a big white plate.",
      "הלילה הירח גדול ועגול. הוא בהיר מאוד בשמיים. אני מסתכל עליו מהמיטה. סבא שלי אומר שהירח הוא כמו צלחת לבנה גדולה.",
      [
        g("moon", "noun", "מה שמאיר בלילה", "The moon is bright.", "ירח"),
        g("round", "adjective", "בצורת עיגול", "The moon is round.", "עגול"),
        g("bright", "adjective", "מאיר מאוד", "It is bright.", "בהיר"),
      ],
      [
        q("How is the moon tonight?", "איך הירח הלילה?", ["Big and round", "Small and red", "Not in the sky", "Yellow and small"], ["גדול ועגול", "קטן ואדום", "לא בשמיים", "צהוב וקטן"], 0, "כתוב 'the moon is big and round'."),
        q("What does the grandfather say the moon is like?", "למה הסבא אומר שהירח דומה?", ["A big white plate", "A ball", "A cake", "A clock"], ["צלחת לבנה גדולה", "כדור", "עוגה", "שעון"], 0, "כתוב 'like a big white plate'."),
      ],
    ),
    R(
      "The Old Watch (שעון היד הישן)",
      "My grandfather has an old gold watch. He wears it every day. It was his father's watch. One day he gives it to me and says, \"Take good care of it.\"",
      "לסבא שלי יש שעון זהב ישן. הוא עונד אותו כל יום. זה היה השעון של אבא שלו. יום אחד הוא נותן לי אותו ואומר: \"תשמור עליו היטב.\"",
      [
        g("watch", "noun", "שעון קטן על היד", "He wears an old watch.", "שעון יד"),
        g("gold", "noun", "מתכת צהובה ויקרה", "It is a gold watch.", "זהב"),
        g("care", "noun", "שמירה", "Take good care of it.", "טיפול"),
      ],
      [
        q("What does the grandfather have?", "מה יש לסבא?", ["An old gold watch", "A new phone", "A big clock", "A red hat"], ["שעון זהב ישן", "טלפון חדש", "שעון גדול", "כובע אדום"], 0, "כתוב 'an old gold watch'."),
        q("What does he say when he gives it?", "מה הוא אומר כשהוא נותן אותו?", ["Take good care of it", "Be quiet", "Do not run", "Go to school"], ["תשמור עליו היטב", "שקט", "אל תרוץ", "לך לבית הספר"], 0, "כתוב 'Take good care of it'."),
      ],
    ),
    R(
      "The Soup Is Too Hot (המרק חם מדי)",
      "My grandmother makes soup. It is very hot and I want to eat it now. She says, \"Wait, please.\" I blow on the soup and wait. After five minutes it is good.",
      "סבתא שלי מכינה מרק. הוא חם מאוד ואני רוצה לאכול אותו עכשיו. היא אומרת: \"חכה, בבקשה.\" אני נושף על המרק וממתין. אחרי חמש דקות הוא טוב.",
      [
        g("soup", "noun", "מאכל נוזלי חם", "The soup is hot.", "מרק"),
        g("blow", "verb", "להוציא אוויר מהפה", "I blow on the soup.", "לנשוף"),
        g("wait", "verb", "לחכות", "I wait five minutes.", "לחכות"),
      ],
      [
        q("What is the problem?", "מה הבעיה?", ["The soup is too hot", "The soup is cold", "There is no soup", "The soup is bad"], ["המרק חם מדי", "המרק קר", "אין מרק", "המרק לא טוב"], 0, "כתוב 'It is very hot'."),
        q("What does the writer do?", "מה הכותב עושה?", ["He blows on the soup and waits", "He eats it now", "He goes out", "He sleeps"], ["הוא נושף על המרק וממתין", "הוא אוכל אותו עכשיו", "הוא יוצא", "הוא ישן"], 0, "כתוב 'I blow on the soup and wait'."),
      ],
    ),
    R(
      "The Lost Dog (הכלב האבוד)",
      "Today I see a little brown dog in the street. He is alone and he looks hungry. I give him some water and a piece of bread. Then I call my father and we look for the owner.",
      "היום אני רואה כלב חום קטן ברחוב. הוא לבד ונראה רעב. אני נותן לו מים וחתיכת לחם. אחר כך אני מתקשר לאבא ואנחנו מחפשים את הבעלים.",
      [
        g("alone", "adjective", "בלי אף אחד", "He is alone.", "לבד"),
        g("owner", "noun", "מי שיש לו חיה", "We look for the owner.", "בעלים"),
        g("look for", "verb", "לנסות למצוא", "We look for the owner.", "לחפש"),
      ],
      [
        q("What colour is the dog?", "באיזה צבע הכלב?", ["Brown", "Black", "White", "Grey"], ["חום", "שחור", "לבן", "אפור"], 0, "כתוב 'a little brown dog'."),
        q("What does the writer give the dog?", "מה הכותב נותן לכלב?", ["Water and bread", "A toy", "A bone", "A bath"], ["מים ולחם", "צעצוע", "עצם", "אמבטיה"], 0, "כתוב 'some water and a piece of bread'."),
      ],
    ),
    R(
      "Our Classroom (הכיתה שלנו)",
      "Our classroom is on the second floor. It has big windows and twenty small desks. On the wall there are posters and pictures. I like it because it is always bright.",
      "הכיתה שלנו בקומה השנייה. יש בה חלונות גדולים ועשרים שולחנות קטנים. על הקיר יש כרזות ותמונות. אני אוהב אותה כי תמיד בהיר בה.",
      [
        g("floor", "noun", "קומה בבניין", "Our room is on the second floor.", "קומה"),
        g("desk", "noun", "שולחן כתיבה", "There are small desks.", "שולחן כתיבה"),
        g("bright", "adjective", "מואר", "The room is bright.", "מואר"),
      ],
      [
        q("Where is the classroom?", "איפה הכיתה?", ["On the second floor", "On the first floor", "In the garden", "On the roof"], ["בקומה השנייה", "בקומה הראשונה", "בגינה", "על הגג"], 0, "כתוב 'on the second floor'."),
        q("Why does the writer like it?", "למה הכותב אוהב אותה?", ["It is always bright", "It is very small", "It is quiet", "It is cold"], ["תמיד בהיר בה", "היא קטנה מאוד", "היא שקטה", "היא קרה"], 0, "כתוב 'it is always bright'."),
      ],
    ),
    R(
      "A Sunday at Home (יום ראשון בבית)",
      "On Sunday we stay at home. In the morning my father reads the newspaper. My mother cooks lunch and my brother plays the piano. In the afternoon we all watch a film.",
      "ביום ראשון אנחנו נשארים בבית. בבוקר אבא שלי קורא עיתון. אמא שלי מבשלת ארוחת צהריים ואחי מנגן בפסנתר. אחר הצהריים כולנו צופים בסרט.",
      [
        g("newspaper", "noun", "דפים עם חדשות", "My father reads the newspaper.", "עיתון"),
        g("piano", "noun", "כלי נגינה עם קלידים", "My brother plays the piano.", "פסנתר"),
        g("film", "noun", "סרט", "We watch a film.", "סרט"),
      ],
      [
        q("What does the father do in the morning?", "מה האבא עושה בבוקר?", ["He reads the newspaper", "He cooks", "He plays", "He sleeps"], ["הוא קורא עיתון", "הוא מבשל", "הוא משחק", "הוא ישן"], 0, "כתוב 'my father reads the newspaper'."),
        q("What does the brother play?", "במה האח מנגן?", ["The piano", "The guitar", "The drum", "A game"], ["בפסנתר", "בגיטרה", "בתוף", "במשחק"], 0, "כתוב 'my brother plays the piano'."),
      ],
    ),
    R(
      "Helping Dad in the Garden (עוזר לאבא בגינה)",
      "On Saturday I help my father in the garden. We put small plants in the ground. I give them water every day. After a month we have red tomatoes and green onions.",
      "בשבת אני עוזר לאבא שלי בגינה. אנחנו שמים שתילים קטנים באדמה. אני נותן להם מים בכל יום. אחרי חודש יש לנו עגבניות אדומות ובצלים ירוקים.",
      [
        g("plant", "noun", "צמח קטן", "We put small plants in the ground.", "שתיל"),
        g("ground", "noun", "האדמה", "We put plants in the ground.", "אדמה"),
        g("month", "noun", "שלושים יום", "After a month we have tomatoes.", "חודש"),
      ],
      [
        q("What does the writer do every day?", "מה הכותב עושה בכל יום?", ["He gives the plants water", "He plays football", "He cooks", "He reads"], ["הוא משקה את השתילים", "הוא משחק כדורגל", "הוא מבשל", "הוא קורא"], 0, "כתוב 'I give them water every day'."),
        q("What do they have after a month?", "מה יש להם אחרי חודש?", ["Red tomatoes and green onions", "Apples", "Flowers", "Oranges"], ["עגבניות אדומות ובצלים ירוקים", "תפוחים", "פרחים", "תפוזים"], 0, "כתוב 'red tomatoes and green onions'."),
      ],
    ),
    R(
      "Tomorrow Is a Holiday (מחר חג)",
      "Tomorrow is a holiday and there is no school. I am very excited. My family goes to the beach. I put my towel, my hat and a book in my bag tonight.",
      "מחר חג ואין בית ספר. אני מתרגש מאוד. המשפחה שלי נוסעת לים. הערב אני שם בתיק את המגבת, הכובע וספר.",
      [
        g("holiday", "noun", "יום בלי לימודים או עבודה", "Tomorrow is a holiday.", "חג"),
        g("excited", "adjective", "שמח ומחכה", "I am very excited.", "מתרגש"),
        g("towel", "noun", "בד לייבוש", "I put my towel in my bag.", "מגבת"),
      ],
      [
        q("Where does the family go?", "לאן המשפחה נוסעת?", ["To the beach", "To school", "To the zoo", "To the farm"], ["לים", "לבית הספר", "לגן החיות", "לחווה"], 0, "כתוב 'My family goes to the beach'."),
        q("How does the writer feel?", "איך הכותב מרגיש?", ["Very excited", "Tired", "Sad", "Angry"], ["מתרגש מאוד", "עייף", "עצוב", "כועס"], 0, "כתוב 'I am very excited'."),
      ],
    ),
    R(
      "The Swimming Race (תחרות השחייה)",
      "Today there is a swimming race at school. I stand next to the pool and I am a little afraid. The teacher says, \"Go!\" I swim fast and I am second. I get a small gold star.",
      "היום יש תחרות שחייה בבית הספר. אני עומד ליד הבריכה ואני קצת מפחד. המורה אומרת: \"קדימה!\" אני שוחה מהר ומגיע שני. אני מקבל כוכב זהב קטן.",
      [
        g("race", "noun", "תחרות מהירות", "There is a swimming race.", "תחרות"),
        g("second", "adjective", "אחרי הראשון", "I am second.", "שני"),
        g("star", "noun", "סימן בצורת כוכב", "I get a gold star.", "כוכב"),
      ],
      [
        q("Where is the race?", "איפה התחרות?", ["At school", "At the sea", "At the lake", "At home"], ["בבית הספר", "בים", "באגם", "בבית"], 0, "כתוב 'a swimming race at school'."),
        q("What place does the writer get?", "איזה מקום הכותב מקבל?", ["Second", "First", "The same", "Last"], ["שני", "ראשון", "אותו מקום", "אחרון"], 0, "כתוב 'I am second'."),
      ],
    ),
    R(
      "My Favourite Day (היום האהוב עליי)",
      "My favourite day is Friday. In the morning I go to the market with my father. In the afternoon my mother cooks a big dinner. In the evening we all sit at one table.",
      "היום האהוב עליי הוא יום שישי. בבוקר אני הולך לשוק עם אבא. אחר הצהריים אמא שלי מבשלת ארוחת ערב גדולה. בערב כולנו יושבים ליד שולחן אחד.",
      [
        g("favourite", "adjective", "האהוב ביותר", "Friday is my favourite day.", "אהוב"),
        g("table", "noun", "רהיט לאכול עליו", "We sit at one table.", "שולחן"),
        g("family", "noun", "אמא, אבא וילדים", "All our family sits together.", "משפחה"),
      ],
      [
        q("What is the favourite day?", "מהו היום האהוב?", ["Friday", "Monday", "Sunday", "Tuesday"], ["שישי", "שני", "ראשון", "שלישי"], 0, "כתוב 'My favourite day is Friday'."),
        q("What does the writer do in the morning?", "מה הכותב עושה בבוקר?", ["He goes to the market", "He goes to school", "He sleeps", "He plays"], ["הוא הולך לשוק", "הוא הולך לבית הספר", "הוא ישן", "הוא משחק"], 0, "כתוב 'I go to the market with my father'."),
      ],
    ),
    R(
      "A Card for My Teacher (כרטיס למורה)",
      "My teacher is very kind and I like her a lot. I make a card for her with a red flower on it. I write, \"Thank you for everything.\" She reads it and smiles at me.",
      "המורה שלי נחמדה מאוד ואני אוהב אותה מאוד. אני מכין לה כרטיס עם פרח אדום. אני כותב: \"תודה על הכול.\" היא קוראת אותו ומחייכת אליי.",
      [
        g("flower", "noun", "חלק יפה של צמח", "I draw a red flower.", "פרח"),
        g("thank", "verb", "להגיד תודה", "I thank my teacher.", "להודות"),
        g("smile", "verb", "להראות שמחה בפנים", "She smiles at me.", "לחייך"),
      ],
      [
        q("What does the card have on it?", "מה יש על הכרטיס?", ["A red flower", "A blue star", "A dog", "A house"], ["פרח אדום", "כוכב כחול", "כלב", "בית"], 0, "כתוב 'a red flower on it'."),
        q("What does the teacher do?", "מה המורה עושה?", ["She reads the card and smiles", "She cries", "She goes home", "She is angry"], ["היא קוראת את הכרטיס ומחייכת", "היא בוכה", "היא הולכת הביתה", "היא כועסת"], 0, "כתוב 'She reads it and smiles at me'."),
      ],
    ),
    R(
      "Going to Bed Early (הולכים לישון מוקדם)",
      "Tomorrow I have a big test, so I go to bed early. I brush my teeth and wash my face. My mother says good night and puts out the light. I close my eyes and sleep.",
      "מחר יש לי מבחן גדול, ולכן אני הולך לישון מוקדם. אני מצחצח שיניים ושוטף את הפנים. אמא שלי אומרת לילה טוב וכובה את האור. אני עוצם עיניים וישן.",
      [
        g("early", "adverb", "לפני הזמן הרגיל", "I go to bed early.", "מוקדם"),
        g("test", "noun", "מבחן", "I have a test tomorrow.", "מבחן"),
        g("light", "noun", "אור", "She puts out the light.", "אור"),
      ],
      [
        q("Why does the writer go to bed early?", "למה הכותב הולך לישון מוקדם?", ["He has a test tomorrow", "He is sick", "He is bored", "It is cold"], ["יש לו מבחן מחר", "הוא חולה", "הוא משועמם", "קר"], 0, "כתוב 'Tomorrow I have a big test'."),
        q("What does the mother do?", "מה האמא עושה?", ["She says good night and puts out the light", "She reads a story", "She sings", "She cooks"], ["היא אומרת לילה טוב וכובה את האור", "היא קוראת סיפור", "היא שרה", "היא מבשלת"], 0, "כתוב 'says good night and puts out the light'."),
      ],
    ),
  ],
};

// --- LISTENING -------------------------------------------------------------
export const MORE_LISTENINGS11 = {
  A1: [
    L(
      "Good morning, class. Please stand up. Take your bags and put them under your desks. Now sit down and open your notebooks. Today we write about our families.",
      "בוקר טוב, כיתה. בבקשה קומו. קחו את התיקים ושימו אותם מתחת לשולחנות. עכשיו שבו ופתחו את המחברות. היום אנחנו כותבים על המשפחות שלנו.",
      [
        q("Where must the children put their bags?", "איפה הילדים צריכים לשים את התיקים?", ["Under their desks", "On the floor near the door", "On the chairs", "In the car"], ["מתחת לשולחנות", "על הרצפה ליד הדלת", "על הכיסאות", "במכונית"], 0, "נאמר 'put them under your desks'."),
        q("What do they write about today?", "על מה הם כותבים היום?", ["Their families", "Their pets", "Their food", "Their houses"], ["על המשפחות שלהם", "על חיות המחמד שלהם", "על האוכל שלהם", "על הבתים שלהם"], 0, "נאמר 'we write about our families'."),
      ],
    ),
    L(
      "Hello, parents. Tomorrow the children need three pencils and a red pen. Please put them in the bag tonight. The school trip is on Friday. Thank you very much.",
      "שלום, הורים. מחר הילדים צריכים שלושה עפרונות ועט אדום. בבקשה שימו אותם בתיק הערב. הטיול של בית הספר ביום שישי. תודה רבה.",
      [
        q("What do the children need tomorrow?", "מה הילדים צריכים מחר?", ["Three pencils and a red pen", "A book and a ball", "A hat and a coat", "Food and water"], ["שלושה עפרונות ועט אדום", "ספר וכדור", "כובע ומעיל", "אוכל ומים"], 0, "נאמר 'three pencils and a red pen'."),
        q("When is the school trip?", "מתי הטיול של בית הספר?", ["On Friday", "On Monday", "On Sunday", "Tomorrow"], ["ביום שישי", "ביום שני", "ביום ראשון", "מחר"], 0, "נאמר 'The school trip is on Friday'."),
      ],
    ),
    L(
      "This is my best friend. He is tall and he has short black hair. He likes football and he is very funny. We sit together in class and we eat lunch together.",
      "זה החבר הכי טוב שלי. הוא גבוה ויש לו שיער שחור קצר. הוא אוהב כדורגל והוא מצחיק מאוד. אנחנו יושבים יחד בכיתה ואוכלים ארוחת צהריים יחד.",
      [
        q("What does the friend look like?", "איך החבר נראה?", ["Tall with short black hair", "Short with long hair", "Fat with brown hair", "Old with white hair"], ["גבוה עם שיער שחור קצר", "נמוך עם שיער ארוך", "שמן עם שיער חום", "זקן עם שיער לבן"], 0, "נאמר 'tall and he has short black hair'."),
        q("What does he like?", "מה הוא אוהב?", ["Football", "Swimming", "Music", "Reading"], ["כדורגל", "שחייה", "מוזיקה", "קריאה"], 0, "נאמר 'He likes football'."),
      ],
    ),
    L(
      "Here is the weather for Wednesday. It is sunny and very hot all day. Do not forget your hat and a bottle of water. At night it is cool. Have a nice day!",
      "הנה מזג האוויר ליום רביעי. שמשי וחם מאוד כל היום. אל תשכחו כובע ובקבוק מים. בלילה מזג האוויר קריר. שיהיה לכם יום נעים!",
      [
        q("How is the weather on Wednesday?", "איך מזג האוויר ביום רביעי?", ["Sunny and very hot", "Cold and rainy", "Cloudy", "Snowy"], ["שמשי וחם מאוד", "קר וגשום", "מעונן", "מושלג"], 0, "נאמר 'sunny and very hot all day'."),
        q("What must people take?", "מה אנשים צריכים לקחת?", ["A hat and water", "A coat", "An umbrella", "A blanket"], ["כובע ומים", "מעיל", "מטרייה", "שמיכה"], 0, "נאמר 'your hat and a bottle of water'."),
      ],
    ),
    L(
      "This is the bus to the hospital. The next stop is the school. Please give your seat to old people. Do not talk on the phone. Thank you, and have a good day.",
      "זה האוטובוס לבית החולים. התחנה הבאה היא בית הספר. בבקשה תנו את המושב לאנשים מבוגרים. אל תדברו בטלפון. תודה, ויום טוב.",
      [
        q("Where does the bus go?", "לאן האוטובוס נוסע?", ["To the hospital", "To the beach", "To the zoo", "To the market"], ["לבית החולים", "לים", "לגן החיות", "לשוק"], 0, "נאמר 'the bus to the hospital'."),
        q("Who must get a seat?", "מי צריך לקבל מושב?", ["Old people", "Little children", "Drivers", "Teachers"], ["אנשים מבוגרים", "ילדים קטנים", "נהגים", "מורים"], 0, "נאמר 'give your seat to old people'."),
      ],
    ),
    L(
      "Good afternoon. A cup of tea and a piece of cake, please. Yes, with sugar. And a glass of water for my son. Thank you. How much is it? Eight dollars? Here you are.",
      "אחר צהריים טובים. כוס תה וחתיכת עוגה, בבקשה. כן, עם סוכר. וכוס מים לבן שלי. תודה. כמה זה עולה? שמונה דולרים? הנה.",
      [
        q("What does the person order first?", "מה האדם מזמין קודם?", ["Tea and cake", "Coffee and bread", "Juice and a cookie", "Milk and cheese"], ["תה ועוגה", "קפה ולחם", "מיץ ועוגייה", "חלב וגבינה"], 0, "נאמר 'A cup of tea and a piece of cake'."),
        q("How much is it?", "כמה זה עולה?", ["Eight dollars", "Two dollars", "Five dollars", "Ten dollars"], ["שמונה דולרים", "שני דולרים", "חמישה דולרים", "עשרה דולרים"], 0, "נאמר 'Eight dollars?'."),
      ],
    ),
    L(
      "Help! I can't find my dog. He is small and brown. He has a red ribbon on his neck. He likes to eat bread. Please call me if you see him. Thank you!",
      "עזרה! אני לא מוצא את הכלב שלי. הוא קטן וחום. יש לו סרט אדום על הצוואר. הוא אוהב לאכול לחם. בבקשה התקשרו אליי אם אתם רואים אותו. תודה!",
      [
        q("What does the dog look like?", "איך הכלב נראה?", ["Small and brown", "Big and black", "Small and white", "Big and brown"], ["קטן וחום", "גדול ושחור", "קטן ולבן", "גדול וחום"], 0, "נאמר 'He is small and brown'."),
        q("What does the dog like to eat?", "מה הכלב אוהב לאכול?", ["Bread", "Fish", "Cheese", "Rice"], ["לחם", "דגים", "גבינה", "אורז"], 0, "נאמר 'He likes to eat bread'."),
      ],
    ),
    L(
      "The library is open from nine to five, from Sunday to Thursday. On Friday it is open from nine to one. On Saturday the library is closed. Please bring your books back on time.",
      "הספרייה פתוחה מתשע עד חמש, מיום ראשון עד יום חמישי. ביום שישי היא פתוחה מתשע עד אחת. בשבת הספרייה סגורה. בבקשה החזירו את הספרים בזמן.",
      [
        q("When is the library closed?", "מתי הספרייה סגורה?", ["On Saturday", "On Sunday", "On Monday", "On Friday"], ["בשבת", "ביום ראשון", "ביום שני", "ביום שישי"], 0, "נאמר 'On Saturday the library is closed'."),
        q("Until what time is it open on Friday?", "עד איזו שעה היא פתוחה ביום שישי?", ["Until one", "Until five", "Until nine", "Until six"], ["עד אחת", "עד חמש", "עד תשע", "עד שש"], 0, "נאמר 'On Friday it is open from nine to one'."),
      ],
    ),
    L(
      "Hi, it is me. I am sorry, but I am late. The bus is slow today. I will be at school in ten minutes. Please tell the teacher. Thank you. Bye!",
      "היי, זה אני. אני מצטערת, אבל אני מאחרת. האוטובוס איטי היום. אני אהיה בבית הספר בעוד עשר דקות. בבקשה תגידו למורה. תודה. ביי!",
      [
        q("Why is the speaker late?", "למה הדוברת מאחרת?", ["The bus is slow", "She is sick", "She forgot her bag", "It is raining"], ["האוטובוס איטי", "היא חולה", "היא שכחה את התיק", "יורד גשם"], 0, "נאמר 'The bus is slow today'."),
        q("When will she be at school?", "מתי היא תגיע לבית הספר?", ["In ten minutes", "In one hour", "Tomorrow", "In two minutes"], ["בעוד עשר דקות", "בעוד שעה", "מחר", "בעוד שתי דקות"], 0, "נאמר 'in ten minutes'."),
      ],
    ),
    L(
      "Hello! Do you want to play football with us? We play at four o'clock on the big field. Bring your shoes and a bottle of water. We need one more player.",
      "שלום! אתה רוצה לשחק איתנו כדורגל? אנחנו משחקים בארבע במגרש הגדול. תביא נעליים ובקבוק מים. אנחנו צריכים שחקן אחד נוסף.",
      [
        q("What time do they play?", "באיזו שעה הם משחקים?", ["At four o'clock", "At two o'clock", "At six o'clock", "At nine o'clock"], ["בארבע", "בשתיים", "בשש", "בתשע"], 0, "נאמר 'at four o'clock'."),
        q("How many more players do they need?", "כמה שחקנים נוספים הם צריכים?", ["One", "Two", "Five", "Ten"], ["אחד", "שניים", "חמישה", "עשרה"], 0, "נאמר 'one more player'."),
      ],
    ),
    L(
      "Class, open your books at page eight. Look at the picture of the farm. Find three animals and write their names. You have ten minutes. Start now, please.",
      "כיתה, פתחו את הספרים בעמוד שמונה. הסתכלו על התמונה של החווה. מצאו שלוש חיות וכתבו את השמות שלהן. יש לכם עשר דקות. התחילו עכשיו, בבקשה.",
      [
        q("Which page must they open?", "איזה עמוד הם צריכים לפתוח?", ["Page eight", "Page ten", "Page three", "Page two"], ["עמוד שמונה", "עמוד עשר", "עמוד שלוש", "עמוד שתיים"], 0, "נאמר 'page eight'."),
        q("How many animals must they find?", "כמה חיות הם צריכים למצוא?", ["Three", "Two", "Five", "Eight"], ["שלוש", "שתיים", "חמש", "שמונה"], 0, "נאמר 'Find three animals'."),
      ],
    ),
    L(
      "Welcome to our shoe shop. Today all shoes are cheap. Black shoes are ten dollars and white shoes are twelve dollars. We are open until eight o'clock tonight.",
      "ברוכים הבאים לחנות הנעליים שלנו. היום כל הנעליים זולות. נעליים שחורות עולות עשרה דולרים ונעליים לבנות שנים עשר דולרים. אנחנו פתוחים עד שמונה הערב.",
      [
        q("How much are black shoes?", "כמה עולות נעליים שחורות?", ["Ten dollars", "Twelve dollars", "Two dollars", "Five dollars"], ["עשרה דולרים", "שנים עשר דולרים", "שני דולרים", "חמישה דולרים"], 0, "נאמר 'Black shoes are ten dollars'."),
        q("Until what time is the shop open?", "עד איזו שעה החנות פתוחה?", ["Until eight o'clock", "Until six o'clock", "Until ten o'clock", "Until nine o'clock"], ["עד שמונה", "עד שש", "עד עשר", "עד תשע"], 0, "נאמר 'until eight o'clock tonight'."),
      ],
    ),
    L(
      "Bananas, bananas! Three bananas for two dollars. Sweet red apples, five dollars. Come and see! Everything is very good today. Come, come, come!",
      "בננות, בננות! שלוש בננות בשני דולרים. תפוחים אדומים ומתוקים, חמישה דולרים. בואו וראו! הכול טוב מאוד היום. בואו, בואו, בואו!",
      [
        q("How many bananas are two dollars?", "כמה בננות עולות שני דולרים?", ["Three", "Two", "Five", "Ten"], ["שלוש", "שתיים", "חמש", "עשר"], 0, "נאמר 'Three bananas for two dollars'."),
        q("What colour are the apples?", "באיזה צבע התפוחים?", ["Red", "Green", "Yellow", "Brown"], ["אדומים", "ירוקים", "צהובים", "חומים"], 0, "נאמר 'Sweet red apples'."),
      ],
    ),
    L(
      "Hello. Please sit down. Do you have a headache? Drink a lot of water and sleep. Do not go to school tomorrow. Stay in bed and come back on Thursday.",
      "שלום. בבקשה שב. כואב לך הראש? שתה הרבה מים ולך לישון. אל תלך מחר לבית הספר. הישאר במיטה וחזור ביום חמישי.",
      [
        q("What must the sick person drink?", "מה החולה צריך לשתות?", ["A lot of water", "Milk", "Tea", "Juice"], ["הרבה מים", "חלב", "תה", "מיץ"], 0, "נאמר 'Drink a lot of water'."),
        q("When must he come back?", "מתי הוא צריך לחזור?", ["On Thursday", "Tomorrow", "On Friday", "On Monday"], ["ביום חמישי", "מחר", "ביום שישי", "ביום שני"], 0, "נאמר 'come back on Thursday'."),
      ],
    ),
    L(
      "Welcome to the zoo. The lions eat at four o'clock. The elephants eat at five o'clock. Please do not feed the animals. Stay with your group and have a nice day.",
      "ברוכים הבאים לגן החיות. האריות אוכלים בארבע. הפילים אוכלים בחמש. בבקשה אל תאכילו את החיות. הישארו עם הקבוצה ויום נעים.",
      [
        q("When do the lions eat?", "מתי האריות אוכלים?", ["At four o'clock", "At five o'clock", "At two o'clock", "At six o'clock"], ["בארבע", "בחמש", "בשתיים", "בשש"], 0, "נאמר 'The lions eat at four o'clock'."),
        q("What must people not do?", "מה אנשים לא צריכים לעשות?", ["Feed the animals", "Take photos", "Walk", "Talk"], ["להאכיל את החיות", "לצלם", "ללכת", "לדבר"], 0, "נאמר 'do not feed the animals'."),
      ],
    ),
    L(
      "It is cold outside. Put on your coat and your hat. Take your gloves too. Do not forget your scarf. The bus comes in five minutes. Hurry up, please!",
      "קר בחוץ. לבשו מעיל וכובע. קחו גם כפפות. אל תשכחו את הצעיף. האוטובוס מגיע בעוד חמש דקות. מהרו, בבקשה!",
      [
        q("Why must they put on a coat?", "למה הם צריכים ללבוש מעיל?", ["It is cold outside", "It is hot", "It is raining", "It is night"], ["קר בחוץ", "חם", "יורד גשם", "לילה"], 0, "נאמר 'It is cold outside'."),
        q("When does the bus come?", "מתי האוטובוס מגיע?", ["In five minutes", "In one hour", "In ten minutes", "Tomorrow"], ["בעוד חמש דקות", "בעוד שעה", "בעוד עשר דקות", "מחר"], 0, "נאמר 'The bus comes in five minutes'."),
      ],
    ),
    L(
      "I am a student. My school is near the park. I walk to school with my friend every morning. We have six lessons every day. My favourite lesson is music.",
      "אני תלמיד. בית הספר שלי ליד הפארק. אני הולך לבית הספר עם החבר שלי בכל בוקר. יש לנו שישה שיעורים בכל יום. השיעור האהוב עליי הוא מוזיקה.",
      [
        q("How does the speaker go to school?", "איך הדובר מגיע לבית הספר?", ["He walks", "He takes a bus", "He runs", "He takes a taxi"], ["הוא הולך ברגל", "הוא נוסע באוטובוס", "הוא רץ", "הוא נוסע במונית"], 0, "נאמר 'I walk to school'."),
        q("What is his favourite lesson?", "מהו השיעור האהוב עליו?", ["Music", "Science", "Math", "Sport"], ["מוזיקה", "מדעים", "חשבון", "ספורט"], 0, "נאמר 'My favourite lesson is music'."),
      ],
    ),
    L(
      "Let's make a sandwich. First take two pieces of bread. Put some cheese and a tomato on the bread. Add a little salt. Now close the sandwich and eat it. It is easy!",
      "בואו נכין כריך. קודם קחו שתי פרוסות לחם. שימו קצת גבינה ועגבנייה על הלחם. הוסיפו מעט מלח. עכשיו סגרו את הכריך ואכלו אותו. זה קל!",
      [
        q("What do you put on the bread?", "מה שמים על הלחם?", ["Cheese and a tomato", "Butter and honey", "Eggs and fish", "Rice and salad"], ["גבינה ועגבנייה", "חמאה ודבש", "ביצים ודגים", "אורז וסלט"], 0, "נאמר 'Put some cheese and a tomato'."),
        q("How many pieces of bread do you take?", "כמה פרוסות לחם לוקחים?", ["Two", "One", "Three", "Four"], ["שתיים", "אחת", "שלוש", "ארבע"], 0, "נאמר 'two pieces of bread'."),
      ],
    ),
    L(
      "Good evening. This is the weather for tonight. It is cold and there are no clouds. You can see a lot of stars. Tomorrow morning there is a little rain. Good night!",
      "ערב טוב. זה מזג האוויר להלילה. קר ואין עננים. אפשר לראות הרבה כוכבים. מחר בבוקר יהיה קצת גשם. לילה טוב!",
      [
        q("How is the sky tonight?", "איך השמיים הלילה?", ["No clouds", "Cloudy", "Rainy", "Dark with rain"], ["אין עננים", "מעוננים", "גשומים", "חשוכים עם גשם"], 0, "נאמר 'there are no clouds'."),
        q("What happens tomorrow morning?", "מה יקרה מחר בבוקר?", ["A little rain", "Snow", "A storm", "Sun"], ["קצת גשם", "שלג", "סערה", "שמש"], 0, "נאמר 'a little rain'."),
      ],
    ),
    L(
      "Hello, everyone. The train to the city is late today. It comes at half past four. Please wait near the door. Do not go near the train. We are sorry.",
      "שלום לכולם. הרכבת לעיר מאחרת היום. היא מגיעה בארבע וחצי. בבקשה חכו ליד הדלת. אל תתקרבו לרכבת. אנחנו מצטערים.",
      [
        q("When does the train come?", "מתי הרכבת מגיעה?", ["At half past four", "At four o'clock", "At six o'clock", "At nine o'clock"], ["בארבע וחצי", "בארבע", "בשש", "בתשע"], 0, "נאמר 'at half past four'."),
        q("What is the problem?", "מה הבעיה?", ["The train is late", "The train is full", "The train is broken", "There is no train"], ["הרכבת מאחרת", "הרכבת מלאה", "הרכבת שבורה", "אין רכבת"], 0, "נאמר 'The train to the city is late today'."),
      ],
    ),
    L(
      "The swimming pool is open every day from eight to six. On Friday it closes at two. Children under ten need a parent with them. Tickets are five dollars for children.",
      "הבריכה פתוחה כל יום משמונה עד שש. ביום שישי היא נסגרת בשתיים. ילדים מתחת לגיל עשר צריכים הורה איתם. כרטיס לילדים עולה חמישה דולרים.",
      [
        q("When does the pool close on Friday?", "מתי הבריכה נסגרת ביום שישי?", ["At two", "At six", "At eight", "At four"], ["בשתיים", "בשש", "בשמונה", "בארבע"], 0, "נאמר 'On Friday it closes at two'."),
        q("How much is a ticket for children?", "כמה עולה כרטיס לילדים?", ["Five dollars", "Ten dollars", "Two dollars", "One dollar"], ["חמישה דולרים", "עשרה דולרים", "שני דולרים", "דולר אחד"], 0, "נאמר 'five dollars for children'."),
      ],
    ),
    L(
      "Class, listen. Tomorrow we have a math test. Please study tonight. The test is on pages three, four and five. It is not very difficult. Good luck, everyone!",
      "כיתה, הקשיבו. מחר יש לנו מבחן בחשבון. בבקשה למדו הערב. המבחן על עמודים שלוש, ארבע וחמש. הוא לא קשה מאוד. בהצלחה לכולם!",
      [
        q("When is the test?", "מתי המבחן?", ["Tomorrow", "Today", "On Friday", "Next week"], ["מחר", "היום", "ביום שישי", "בשבוע הבא"], 0, "נאמר 'Tomorrow we have a math test'."),
        q("How is the test?", "איך המבחן?", ["Not very difficult", "Very difficult", "Very long", "Very easy"], ["לא קשה מאוד", "קשה מאוד", "ארוך מאוד", "קל מאוד"], 0, "נאמר 'It is not very difficult'."),
      ],
    ),
    L(
      "Happy birthday to you! Happy birthday to you! Happy birthday, dear friend! Happy birthday to you! Now make a wish. Then we eat the cake!",
      "יום הולדת שמח לך! יום הולדת שמח לך! יום הולדת שמח, חבר יקר! יום הולדת שמח לך! עכשיו תבקש משאלה. אחר כך נאכל את העוגה!",
      [
        q("What must the friend do after the song?", "מה החבר צריך לעשות אחרי השיר?", ["Make a wish", "Open a gift", "Sing again", "Go home"], ["לבקש משאלה", "לפתוח מתנה", "לשיר שוב", "ללכת הביתה"], 0, "נאמר 'make a wish'."),
        q("What do they eat?", "מה הם אוכלים?", ["The cake", "Pizza", "Ice cream", "Soup"], ["את העוגה", "פיצה", "גלידה", "מרק"], 0, "נאמר 'Then we eat the cake'."),
      ],
    ),
    L(
      "Hello. Can I speak to your mother, please? She is not at home? Okay. Please tell her Aunt Dina called. My number is on the paper near the phone. Thank you. Bye!",
      "שלום. אפשר לדבר עם אמא שלך, בבקשה? היא לא בבית? בסדר. בבקשה תגידו לה שדודה דינה התקשרה. המספר שלי על הנייר ליד הטלפון. תודה. ביי!",
      [
        q("Who does the speaker want to talk to?", "עם מי הדוברת רוצה לדבר?", ["The child's mother", "The child's teacher", "The child's friend", "The child's father"], ["עם אמא של הילד", "עם המורה של הילד", "עם החבר של הילד", "עם אבא של הילד"], 0, "נאמר 'Can I speak to your mother'."),
        q("Where is the number?", "איפה המספר?", ["On the paper near the phone", "In a book", "On the door", "On the wall"], ["על הנייר ליד הטלפון", "בספר", "על הדלת", "על הקיר"], 0, "נאמר 'on the paper near the phone'."),
      ],
    ),
    L(
      "Hello, do you have these shoes in a bigger size? These are too small for me. Size nine? Yes, please. They are good. I take them. How much are they?",
      "שלום, יש לכם את הנעליים האלה במידה גדולה יותר? אלה קטנות מדי בשבילי. מידה תשע? כן, בבקשה. הן טובות. אני לוקח אותן. כמה הן עולות?",
      [
        q("What is the problem with the shoes?", "מה הבעיה עם הנעליים?", ["They are too small", "They are too big", "They are old", "They are broken"], ["הן קטנות מדי", "הן גדולות מדי", "הן ישנות", "הן שבורות"], 0, "נאמר 'These are too small for me'."),
        q("What does the person do at the end?", "מה האדם עושה בסוף?", ["He takes the shoes", "He leaves the shop", "He tries a hat", "He calls his mother"], ["הוא לוקח את הנעליים", "הוא עוזב את החנות", "הוא מנסה כובע", "הוא מתקשר לאמא"], 0, "נאמר 'I take them'."),
      ],
    ),
    L(
      "Good evening. A table for two, please. Near the window, if you can. Thank you. We want soup and fish. And two glasses of water. The food looks very good.",
      "ערב טוב. שולחן לשניים, בבקשה. ליד החלון, אם אפשר. תודה. אנחנו רוצים מרק ודג. ושתי כוסות מים. האוכל נראה טוב מאוד.",
      [
        q("How many people want a table?", "כמה אנשים רוצים שולחן?", ["Two", "One", "Four", "Six"], ["שניים", "אחד", "ארבעה", "שישה"], 0, "נאמר 'A table for two'."),
        q("Where do they want to sit?", "איפה הם רוצים לשבת?", ["Near the window", "Near the door", "Outside", "Near the kitchen"], ["ליד החלון", "ליד הדלת", "בחוץ", "ליד המטבח"], 0, "נאמר 'Near the window'."),
      ],
    ),
    L(
      "Welcome to Sports Day! Running is at ten o'clock. The football game is at eleven. There is free water and fruit for everyone. Please sit near the field and have fun.",
      "ברוכים הבאים ליום הספורט! הריצה בעשר. משחק הכדורגל באחת עשרה. יש מים ופירות בחינם לכולם. בבקשה שבו ליד המגרש ותיהנו.",
      [
        q("When is the running?", "מתי הריצה?", ["At ten o'clock", "At eleven o'clock", "At nine o'clock", "At eight o'clock"], ["בעשר", "באחת עשרה", "בתשע", "בשמונה"], 0, "נאמר 'Running is at ten o'clock'."),
        q("What is free?", "מה בחינם?", ["Water and fruit", "Ice cream", "Pizza", "Cake"], ["מים ופירות", "גלידה", "פיצה", "עוגה"], 0, "נאמר 'free water and fruit'."),
      ],
    ),
    L(
      "Hello, class. Today in our lesson we make posters. Take a big piece of paper and a pencil. Draw your favourite animal. Then use a red pen. Have fun!",
      "שלום, כיתה. היום בשיעור אנחנו מכינים כרזות. קחו דף נייר גדול ועיפרון. ציירו את החיה האהובה עליכם. אחר כך השתמשו בעט אדום. תהנו!",
      [
        q("What do they make?", "מה הם מכינים?", ["Posters", "Cakes", "Cards", "Hats"], ["כרזות", "עוגות", "כרטיסי ברכה", "כובעים"], 0, "נאמר 'we make posters'."),
        q("What do they use after the pencil?", "במה הם משתמשים אחרי העיפרון?", ["A red pen", "A ruler", "A brush", "A book"], ["עט אדום", "סרגל", "מכחול", "ספר"], 0, "נאמר 'Then use a red pen'."),
      ],
    ),
    L(
      "These are our class rules. Come to school on time. Listen to the teacher. Do not run in the classroom. Share your things with your friends. Be kind to everyone.",
      "אלה כללי הכיתה שלנו. בואו לבית הספר בזמן. הקשיבו למורה. אל תרצו בכיתה. חלקו את הדברים שלכם עם החברים. היו נחמדים לכולם.",
      [
        q("What must the children do?", "מה הילדים צריכים לעשות?", ["Listen to the teacher", "Eat", "Run", "Sleep"], ["להקשיב למורה", "לאכול", "לרוץ", "לישון"], 0, "נאמר 'Listen to the teacher'."),
        q("What must they share?", "מה הם צריכים לחלוק?", ["Their things", "Their homework", "Their phones", "Their food only"], ["את הדברים שלהם", "את שיעורי הבית", "את הטלפונים", "רק את האוכל"], 0, "נאמר 'Share your things with your friends'."),
      ],
    ),
    L(
      "Every day I go to school with my father. He is a driver and his bus stops near my school. I sit in the front and I see the street. I like it very much.",
      "בכל יום אני הולך לבית הספר עם אבא שלי. הוא נהג והאוטובוס שלו עוצר ליד בית הספר שלי. אני יושב מלפנים ורואה את הרחוב. אני אוהב את זה מאוד.",
      [
        q("What is the father's job?", "מה המקצוע של האבא?", ["He is a driver", "He is a doctor", "He is a teacher", "He is a farmer"], ["הוא נהג", "הוא רופא", "הוא מורה", "הוא חקלאי"], 0, "נאמר 'He is a driver'."),
        q("Where does the speaker sit?", "איפה הדובר יושב?", ["In the front", "In the back", "On the roof", "Outside"], ["מלפנים", "מאחור", "על הגג", "בחוץ"], 0, "נאמר 'I sit in the front'."),
      ],
    ),
    L(
      "Time to go home, everyone! The park closes in ten minutes. Please take your things and your toys. Do not forget your hats and your bags. See you tomorrow!",
      "הגיע הזמן ללכת הביתה, כולם! הפארק נסגר בעוד עשר דקות. בבקשה קחו את הדברים והצעצועים שלכם. אל תשכחו כובעים ותיקים. נתראה מחר!",
      [
        q("When does the park close?", "מתי הפארק נסגר?", ["In ten minutes", "In one hour", "Tomorrow", "In two minutes"], ["בעוד עשר דקות", "בעוד שעה", "מחר", "בעוד שתי דקות"], 0, "נאמר 'The park closes in ten minutes'."),
        q("What must the children not forget?", "מה הילדים לא צריכים לשכוח?", ["Their hats and bags", "Their shoes", "Their books", "Their coats"], ["כובעים ותיקים", "נעליים", "ספרים", "מעילים"], 0, "נאמר 'Do not forget your hats and your bags'."),
      ],
    ),
    L(
      "Now at the cinema: a funny film about a little dog and a big cat. It starts every day at five and at seven. Tickets are eight dollars. Come with your family!",
      "עכשיו בקולנוע: סרט מצחיק על כלב קטן וחתול גדול. הוא מתחיל כל יום בחמש ובשבע. כרטיסים עולים שמונה דולרים. בואו עם המשפחה!",
      [
        q("What is the film about?", "על מה הסרט?", ["A little dog and a big cat", "A bird", "A boy and a girl", "A school"], ["כלב קטן וחתול גדול", "ציפור", "ילד וילדה", "בית ספר"], 0, "נאמר 'a little dog and a big cat'."),
        q("When does it start?", "מתי הוא מתחיל?", ["At five and at seven", "At two and at four", "At nine", "At ten"], ["בחמש ובשבע", "בשתיים ובארבע", "בתשע", "בעשר"], 0, "נאמר 'at five and at seven'."),
      ],
    ),
    L(
      "Hello. You can visit your grandfather at the hospital every day from four to six. Please do not bring flowers. Please be quiet. Sit near the bed and talk to him.",
      "שלום. אפשר לבקר את סבא שלכם בבית החולים כל יום מארבע עד שש. בבקשה אל תביאו פרחים. בבקשה שמרו על שקט. שבו ליד המיטה ודברו איתו.",
      [
        q("When can you visit?", "מתי אפשר לבקר?", ["From four to six", "From nine to ten", "From two to three", "At night"], ["מארבע עד שש", "מתשע עד עשר", "משתיים עד שלוש", "בלילה"], 0, "נאמר 'from four to six'."),
        q("What must people not bring?", "מה אנשים לא צריכים להביא?", ["Flowers", "Books", "Photos", "Water"], ["פרחים", "ספרים", "תמונות", "מים"], 0, "נאמר 'do not bring flowers'."),
      ],
    ),
    L(
      "Welcome to the beach cafe. We have cold water, orange juice and ice cream. A big ice cream is three dollars. You can sit near the sea. We are open until seven.",
      "ברוכים הבאים לקפה שעל החוף. יש לנו מים קרים, מיץ תפוזים וגלידה. גלידה גדולה עולה שלושה דולרים. אפשר לשבת ליד הים. אנחנו פתוחים עד שבע.",
      [
        q("How much is a big ice cream?", "כמה עולה גלידה גדולה?", ["Three dollars", "Five dollars", "Ten dollars", "One dollar"], ["שלושה דולרים", "חמישה דולרים", "עשרה דולרים", "דולר אחד"], 0, "נאמר 'A big ice cream is three dollars'."),
        q("Where can you sit?", "איפה אפשר לשבת?", ["Near the sea", "Near the road", "Near the hill", "Near the school"], ["ליד הים", "ליד הכביש", "ליד הגבעה", "ליד בית הספר"], 0, "נאמר 'sit near the sea'."),
      ],
    ),
    L(
      "To go to the zoo, take bus number nine. It stops in front of the school. The zoo is at the end of the street. The trip takes twenty minutes. Do not be late!",
      "כדי להגיע לגן החיות, קחו אוטובוס מספר תשע. הוא עוצר מול בית הספר. גן החיות בסוף הרחוב. הנסיעה לוקחת עשרים דקות. אל תאחרו!",
      [
        q("Which bus goes to the zoo?", "איזה אוטובוס נוסע לגן החיות?", ["Number nine", "Number five", "Number two", "Number ten"], ["מספר תשע", "מספר חמש", "מספר שתיים", "מספר עשר"], 0, "נאמר 'take bus number nine'."),
        q("Where is the zoo?", "איפה גן החיות?", ["At the end of the street", "Near the sea", "On a hill", "Near the station"], ["בסוף הרחוב", "ליד הים", "על גבעה", "ליד התחנה"], 0, "נאמר 'at the end of the street'."),
      ],
    ),
    L(
      "Look at this picture. There is a house with a big garden. A girl sits under a tree and reads a book. Her dog sleeps next to her. The sky is blue and the sun is bright.",
      "הסתכלו על התמונה הזאת. יש בית עם גינה גדולה. ילדה יושבת מתחת לעץ וקוראת ספר. הכלב שלה ישן לידה. השמיים כחולים והשמש בהירה.",
      [
        q("What does the girl do?", "מה הילדה עושה?", ["She reads a book", "She plays", "She sleeps", "She draws"], ["היא קוראת ספר", "היא משחקת", "היא ישנה", "היא מציירת"], 0, "נאמר 'reads a book'."),
        q("Where does the girl sit?", "איפה הילדה יושבת?", ["Under a tree", "On a chair", "On the roof", "In the house"], ["מתחת לעץ", "על כיסא", "על הגג", "בבית"], 0, "נאמר 'sits under a tree'."),
      ],
    ),
    L(
      "At the weekend I like to sleep late. Then I eat breakfast with my family. In the afternoon I play football with my friends. In the evening I watch a film.",
      "בסוף השבוע אני אוהב לישון עד מאוחר. אחר כך אני אוכל ארוחת בוקר עם המשפחה. אחר הצהריים אני משחק כדורגל עם החברים. בערב אני רואה סרט.",
      [
        q("What does the speaker do in the afternoon?", "מה הדובר עושה אחר הצהריים?", ["He plays football", "He sleeps", "He watches a film", "He cooks"], ["הוא משחק כדורגל", "הוא ישן", "הוא רואה סרט", "הוא מבשל"], 0, "נאמר 'I play football with my friends'."),
        q("What does he do in the evening?", "מה הוא עושה בערב?", ["He watches a film", "He reads", "He goes out", "He plays music"], ["הוא רואה סרט", "הוא קורא", "הוא יוצא", "הוא מנגן"], 0, "נאמר 'I watch a film'."),
      ],
    ),
    L(
      "I like to draw. I draw animals, houses and people. I have a notebook and a box of pencils. Every day after school I draw for one hour. My mother puts my pictures on the wall.",
      "אני אוהבת לצייר. אני מציירת חיות, בתים ואנשים. יש לי מחברת וקופסת עפרונות. בכל יום אחרי בית הספר אני מציירת שעה. אמא שלי תולה את התמונות שלי על הקיר.",
      [
        q("What does the speaker draw?", "מה הדוברת מציירת?", ["Animals, houses and people", "Only animals", "Only flowers", "Cars"], ["חיות, בתים ואנשים", "רק חיות", "רק פרחים", "מכוניות"], 0, "נאמר 'animals, houses and people'."),
        q("What does the mother do with the pictures?", "מה האמא עושה עם התמונות?", ["She puts them on the wall", "She gives them away", "She loses them", "She sells them"], ["היא תולה אותן על הקיר", "היא נותנת אותן", "היא מאבדת אותן", "היא מוכרת אותן"], 0, "נאמר 'puts my pictures on the wall'."),
      ],
    ),
    L(
      "This is my dog. His name is Rex. He is big and he is brown. He likes to run in the park and he sleeps on my bed. Every morning he waits for me at the door.",
      "זה הכלב שלי. קוראים לו רקס. הוא גדול והוא חום. הוא אוהב לרוץ בפארק והוא ישן על המיטה שלי. בכל בוקר הוא מחכה לי ליד הדלת.",
      [
        q("Where does the dog sleep?", "איפה הכלב ישן?", ["On the speaker's bed", "In the garden", "On the sofa", "In a box"], ["על המיטה של הדובר", "בגינה", "על הספה", "בקופסה"], 0, "נאמר 'he sleeps on my bed'."),
        q("What does the dog do every morning?", "מה הכלב עושה בכל בוקר?", ["He waits at the door", "He eats", "He swims", "He sleeps"], ["הוא מחכה ליד הדלת", "הוא אוכל", "הוא שוחה", "הוא ישן"], 0, "נאמר 'he waits for me at the door'."),
      ],
    ),
    L(
      "Dear parents, the class trip is on Monday. We go to the museum by bus. Please write your name on this paper and give it to the teacher. The trip is five dollars.",
      "הורים יקרים, טיול הכיתה ביום שני. אנחנו נוסעים למוזיאון באוטובוס. בבקשה כתבו את שמכם על הנייר הזה ותנו אותו למורה. הטיול עולה חמישה דולרים.",
      [
        q("Where does the class go?", "לאן הכיתה נוסעת?", ["To the museum", "To the zoo", "To the beach", "To the farm"], ["למוזיאון", "לגן החיות", "לים", "לחווה"], 0, "נאמר 'We go to the museum by bus'."),
        q("What must the parents do?", "מה ההורים צריכים לעשות?", ["Write their name on the paper", "Call the teacher", "Bring food", "Come to school"], ["לכתוב את שמם על הנייר", "להתקשר למורה", "להביא אוכל", "לבוא לבית הספר"], 0, "נאמר 'write your name on this paper'."),
      ],
    ),
    L(
      "Big sale today at the supermarket! Milk is one dollar. Bread is two dollars. Eggs are three dollars. Rice is two dollars. Come early, because it is only for today.",
      "מבצע גדול היום בסופרמרקט! חלב עולה דולר אחד. לחם שני דולרים. ביצים שלושה דולרים. אורז שני דולרים. בואו מוקדם, כי זה רק להיום.",
      [
        q("How much is the milk?", "כמה עולה החלב?", ["One dollar", "Two dollars", "Three dollars", "Five dollars"], ["דולר אחד", "שני דולרים", "שלושה דולרים", "חמישה דולרים"], 0, "נאמר 'Milk is one dollar'."),
        q("How long is the sale?", "כמה זמן המבצע?", ["Only today", "All week", "Two days", "All month"], ["רק היום", "כל השבוע", "יומיים", "כל החודש"], 0, "נאמר 'only for today'."),
      ],
    ),
    L(
      "Please stop here. This is my house. Thank you. How much is it? Twelve dollars? Here is twenty dollars. Have a good evening. Goodbye!",
      "בבקשה עצור כאן. זה הבית שלי. תודה. כמה זה עולה? שנים עשר דולרים? הנה עשרים דולרים. ערב טוב. להתראות!",
      [
        q("Where does the person stop?", "איפה האדם עוצר?", ["At his house", "At the station", "At the airport", "At school"], ["ליד הבית שלו", "בתחנה", "בשדה התעופה", "בבית הספר"], 0, "נאמר 'This is my house'."),
        q("How much is the ride?", "כמה עולה הנסיעה?", ["Twelve dollars", "Twenty dollars", "Two dollars", "Ten dollars"], ["שנים עשר דולרים", "עשרים דולרים", "שני דולרים", "עשרה דולרים"], 0, "נאמר 'Twelve dollars?'."),
      ],
    ),
    L(
      "Good morning. Breakfast is from seven to ten in the restaurant. We have eggs, bread, cheese, fruit and tea. Please take your key with you when you go out. Enjoy your day!",
      "בוקר טוב. ארוחת הבוקר משבע עד עשר במסעדה. יש לנו ביצים, לחם, גבינה, פירות ותה. בבקשה קחו את המפתח איתכם כשאתם יוצאים. שיהיה לכם יום נעים!",
      [
        q("When is breakfast?", "מתי ארוחת הבוקר?", ["From seven to ten", "From six to eight", "From nine to eleven", "At night"], ["משבע עד עשר", "משש עד שמונה", "מתשע עד אחת עשרה", "בלילה"], 0, "נאמר 'from seven to ten'."),
        q("What must guests take with them?", "מה האורחים צריכים לקחת איתם?", ["Their key", "Their bag", "Their coat", "Their phone"], ["את המפתח", "את התיק", "את המעיל", "את הטלפון"], 0, "נאמר 'take your key with you'."),
      ],
    ),
    L(
      "My friend sleeps at my house tonight. We eat pizza and watch a film. Then we play cards on the floor. My mother says we must go to bed at ten o'clock. We are very excited!",
      "החבר שלי ישן אצלי הלילה. אנחנו אוכלים פיצה ורואים סרט. אחר כך אנחנו משחקים קלפים על הרצפה. אמא שלי אומרת שאנחנו צריכים ללכת לישון בעשר. אנחנו מתרגשים מאוד!",
      [
        q("What do they eat?", "מה הם אוכלים?", ["Pizza", "Soup", "Cake", "Rice"], ["פיצה", "מרק", "עוגה", "אורז"], 0, "נאמר 'We eat pizza'."),
        q("When must they go to bed?", "מתי הם צריכים ללכת לישון?", ["At ten o'clock", "At nine o'clock", "At eleven o'clock", "At eight o'clock"], ["בעשר", "בתשע", "באחת עשרה", "בשמונה"], 0, "נאמר 'at ten o'clock'."),
      ],
    ),
    L(
      "On Saturday I have a birthday. I am ten years old. We have a party in the garden. My mother makes a big chocolate cake. My friends bring gifts. I am so happy!",
      "ביום שבת יש לי יום הולדת. אני בן עשר. אנחנו עושים מסיבה בגינה. אמא שלי מכינה עוגת שוקולד גדולה. החברים שלי מביאים מתנות. אני כל כך שמח!",
      [
        q("How old is the speaker?", "בן כמה הדובר?", ["Ten", "Nine", "Eleven", "Twelve"], ["עשר", "תשע", "אחת עשרה", "שתים עשרה"], 0, "נאמר 'I am ten years old'."),
        q("Where is the party?", "איפה המסיבה?", ["In the garden", "At school", "At the beach", "At a hotel"], ["בגינה", "בבית הספר", "בים", "במלון"], 0, "נאמר 'in the garden'."),
      ],
    ),
    L(
      "Hello, dear. Dinner is at seven o'clock tonight. We have soup, chicken and rice. Please come home at six. Wash your hands and help me with the table. I love you!",
      "שלום, יקירי. ארוחת הערב היום בשבע. יש מרק, עוף ואורז. בבקשה בוא הביתה בשש. שטוף ידיים ועזור לי עם השולחן. אני אוהבת אותך!",
      [
        q("When is dinner?", "מתי ארוחת הערב?", ["At seven o'clock", "At six o'clock", "At eight o'clock", "At nine o'clock"], ["בשבע", "בשש", "בשמונה", "בתשע"], 0, "נאמר 'Dinner is at seven o'clock'."),
        q("What must the child do?", "מה הילד צריך לעשות?", ["Come home at six and help", "Stay out", "Cook", "Sleep"], ["לבוא הביתה בשש ולעזור", "להישאר בחוץ", "לבשל", "לישון"], 0, "נאמר 'Please come home at six'."),
      ],
    ),
    L(
      "Hi. The homework for tomorrow is on page eleven. Read the story and answer the three questions. Write the answers in your notebook. See you at school. Bye!",
      "היי. שיעורי הבית למחר בעמוד אחת עשרה. קראו את הסיפור וענו על שלוש השאלות. כתבו את התשובות במחברת. נתראה בבית הספר. ביי!",
      [
        q("Which page is the homework on?", "באיזה עמוד שיעורי הבית?", ["Page eleven", "Page ten", "Page three", "Page twelve"], ["עמוד אחת עשרה", "עמוד עשר", "עמוד שלוש", "עמוד שתים עשרה"], 0, "נאמר 'on page eleven'."),
        q("How many questions must they answer?", "על כמה שאלות הם צריכים לענות?", ["Three", "Two", "Five", "Ten"], ["שלוש", "שתיים", "חמש", "עשר"], 0, "נאמר 'the three questions'."),
      ],
    ),
    L(
      "Today the weather is hot and the sky is blue. Many children are at the beach. They swim in the sea and play with balls. Some people sit under big umbrellas and read books.",
      "היום מזג האוויר חם והשמיים כחולים. הרבה ילדים בים. הם שוחים בים ומשחקים עם כדורים. כמה אנשים יושבים מתחת למטריות גדולות וקוראים ספרים.",
      [
        q("What do the children do?", "מה הילדים עושים?", ["They swim and play with balls", "They sleep", "They eat", "They read"], ["הם שוחים ומשחקים עם כדורים", "הם ישנים", "הם אוכלים", "הם קוראים"], 0, "נאמר 'swim in the sea and play with balls'."),
        q("What do some people do under the umbrellas?", "מה כמה אנשים עושים מתחת למטריות?", ["They read books", "They cook", "They run", "They sing"], ["הם קוראים ספרים", "הם מבשלים", "הם רצים", "הם שרים"], 0, "נאמר 'read books'."),
      ],
    ),
    L(
      "Goodbye party! Tomorrow is the last day of school. We have cake, juice and music in the classroom. Please bring a small gift for the teacher. It is a very happy day. See you in September!",
      "מסיבת פרידה! מחר הוא היום האחרון של הלימודים. יש לנו עוגה, מיץ ומוזיקה בכיתה. בבקשה הביאו מתנה קטנה למורה. זה יום שמח מאוד. נתראה בספטמבר!",
      [
        q("What must the children bring?", "מה הילדים צריכים להביא?", ["A small gift for the teacher", "A cake", "A book", "A bag"], ["מתנה קטנה למורה", "עוגה", "ספר", "תיק"], 0, "נאמר 'bring a small gift for the teacher'."),
        q("When do they see each other again?", "מתי הם יתראו שוב?", ["In September", "Tomorrow", "In June", "Next week"], ["בספטמבר", "מחר", "ביוני", "בשבוע הבא"], 0, "נאמר 'See you in September'."),
      ],
    ),
    L(
      "Mom, can I have a party on Friday? I want to ask ten friends to come. We can eat pizza in the garden and play games. Please say yes! I will help you with everything.",
      "אמא, אפשר לעשות מסיבה ביום שישי? אני רוצה להזמין עשרה חברים. אנחנו יכולים לאכול פיצה בגינה ולשחק משחקים. בבקשה תגידי כן! אני אעזור לך בהכול.",
      [
        q("How many friends does the child want to ask?", "כמה חברים הילד רוצה להזמין?", ["Ten", "Five", "Two", "Twelve"], ["עשרה", "חמישה", "שניים", "שנים עשר"], 0, "נאמר 'ask ten friends to come'."),
        q("Where can they eat pizza?", "איפה הם יכולים לאכול פיצה?", ["In the garden", "At school", "At the beach", "In the car"], ["בגינה", "בבית הספר", "בים", "במכונית"], 0, "נאמר 'eat pizza in the garden'."),
      ],
    ),
  ],
};
