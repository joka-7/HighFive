// Round 15 of additional Reading and Listening content — A2, batch 1.
//
// Written one item per learning day to fill the year of curated A2 passages
// (A1 was completed in rounds 10–14). Same shape as the earlier rounds: fully
// bilingual (`textHe` / `transcriptHe`, `questionHe` + `optionsHe`), two
// questions per item, every explanation quoting the text. Written mostly from
// the A1 and A2 word cards so the app's vocabulary gate (CURATED_TOLERANCE in
// src/services/content.ts: 6 unknown words in a reading, 4 in a listening at
// A2) lets each item through; `node scripts/check-curated.mjs A2 --from 36`
// verifies that. Topics are tracked in docs/CONTENT-TOPICS.md.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

// --- READING ---------------------------------------------------------------
export const MORE_READINGS15 = {
  A2: [
    R(
      "The Science Fair (יריד המדע)",
      "Every year our school has a science fair. This year my partner and I made a model of the planets from paper and balls. We explained it to the teachers, and they were surprised. We won second prize.",
      "בכל שנה יש בבית הספר שלנו יריד מדע. השנה השותף שלי ואני הכנו דגם של כוכבי הלכת מנייר וכדורים. הסברנו אותו למורים, והם הופתעו. זכינו במקום השני.",
      [
        g("fair", "noun", "אירוע שבו מציגים דברים", "The school has a science fair.", "יריד"),
        g("partner", "noun", "מי שעובד איתך", "My partner and I made a model.", "שותף"),
        g("prize", "noun", "מה שמקבלים כשמנצחים", "We won second prize.", "פרס"),
      ],
      [
        q("What did the two students make?", "מה שני התלמידים הכינו?", ["A model of the planets", "A game", "A big boat", "A clock"], ["דגם של כוכבי הלכת", "משחק", "סירה גדולה", "שעון"], 0, "כתוב 'a model of the planets'."),
        q("What prize did they win?", "באיזה פרס הם זכו?", ["Second prize", "First prize", "No prize", "Third prize"], ["מקום שני", "מקום ראשון", "בלי פרס", "מקום שלישי"], 0, "כתוב 'we won second prize'."),
      ],
    ),
    R(
      "A Group Project (פרויקט קבוצתי)",
      "Our teacher gave us a group project about water. There are four of us, and each person has a different job. I look for pictures, Dana writes the text, and the boys make the poster. We meet at my house every Wednesday afternoon.",
      "המורה נתנה לנו פרויקט קבוצתי על מים. אנחנו ארבעה, ולכל אחד יש תפקיד אחר. אני מחפשת תמונות, דנה כותבת את הטקסט, והבנים מכינים את הכרזה. אנחנו נפגשים בבית שלי בכל יום רביעי אחר הצהריים.",
      [
        g("group", "noun", "כמה אנשים ביחד", "We work in a group.", "קבוצה"),
        g("project", "noun", "עבודה גדולה בבית הספר", "We have a project about water.", "פרויקט"),
        g("poster", "noun", "תמונה גדולה על קיר", "The boys make the poster.", "כרזה"),
      ],
      [
        q("How many people are in the group?", "כמה אנשים יש בקבוצה?", ["Four", "Two", "Six", "Three"], ["ארבעה", "שניים", "שישה", "שלושה"], 0, "כתוב 'There are four of us'."),
        q("When do they meet?", "מתי הם נפגשים?", ["Every Wednesday afternoon", "Every Monday morning", "Every Friday", "Every Sunday"], ["בכל יום רביעי אחר הצהריים", "בכל יום שני בבוקר", "בכל יום שישי", "בכל יום ראשון"], 0, "כתוב 'every Wednesday afternoon'."),
      ],
    ),
    R(
      "Choosing a Subject (בוחרים מקצוע)",
      "Next year I have to choose a new subject. I like art, but my parents want me to study computers. We talked about it for a long time at dinner. In the end I decided to take both and see which one I like more.",
      "בשנה הבאה אני צריך לבחור מקצוע חדש. אני אוהב אמנות, אבל ההורים שלי רוצים שאלמד מחשבים. דיברנו על זה הרבה זמן בארוחת הערב. בסוף החלטתי לקחת את שניהם ולראות איזה מהם אני אוהב יותר.",
      [
        g("subject", "noun", "מקצוע לימוד", "My favourite subject is art.", "מקצוע"),
        g("decide", "verb", "לבחור מה לעשות", "I decided to take both.", "להחליט"),
        g("computer", "noun", "מכונה לעבודה ולמשחקים", "My parents want me to study computers.", "מחשב"),
      ],
      [
        q("What do the parents want him to study?", "מה ההורים רוצים שהוא ילמד?", ["Computers", "Art", "Music", "History"], ["מחשבים", "אמנות", "מוזיקה", "היסטוריה"], 0, "כתוב 'my parents want me to study computers'."),
        q("What did he decide in the end?", "מה הוא החליט בסוף?", ["To take both subjects", "To take only art", "To take only computers", "To take nothing"], ["לקחת את שני המקצועות", "לקחת רק אמנות", "לקחת רק מחשבים", "לא לקחת כלום"], 0, "כתוב 'to take both'."),
      ],
    ),
    R(
      "Exam Week (שבוע המבחנים)",
      "This week we have three exams, and I am very nervous. I study every evening until ten o'clock and I drink a lot of water. My mother makes me soup so that I do not forget to eat. After the last exam I plan to sleep for twelve hours.",
      "השבוע יש לנו שלושה מבחנים, ואני מתוח מאוד. אני לומד בכל ערב עד עשר ושותה הרבה מים. אמא שלי מכינה לי מרק כדי שלא אשכח לאכול. אחרי המבחן האחרון אני מתכנן לישון שתים עשרה שעות.",
      [
        g("exam", "noun", "מבחן גדול", "We have three exams.", "מבחן"),
        g("nervous", "adjective", "חושש לפני משהו", "I am very nervous.", "מתוח"),
        g("plan", "verb", "לחשוב מה לעשות", "I plan to sleep.", "לתכנן"),
      ],
      [
        q("How many exams does the writer have?", "כמה מבחנים יש לכותב?", ["Three", "Two", "Five", "One"], ["שלושה", "שניים", "חמישה", "אחד"], 0, "כתוב 'three exams'."),
        q("What does the writer plan to do after the last exam?", "מה הכותב מתכנן לעשות אחרי המבחן האחרון?", ["Sleep for twelve hours", "Go to the beach", "Play football", "Study more"], ["לישון שתים עשרה שעות", "ללכת לים", "לשחק כדורגל", "ללמוד עוד"], 0, "כתוב 'to sleep for twelve hours'."),
      ],
    ),
    R(
      "A New Classmate (תלמידה חדשה בכיתה)",
      "A new girl joined our class last week. She is from another country and she does not speak much Hebrew yet. At first she sat alone at lunch, so I asked her to join us. Now she teaches us a few words in her language, and we are good friends.",
      "תלמידה חדשה הצטרפה לכיתה שלנו בשבוע שעבר. היא מארץ אחרת והיא עדיין לא מדברת הרבה עברית. בהתחלה היא ישבה לבד בארוחת הצהריים, אז ביקשתי ממנה להצטרף אלינו. עכשיו היא מלמדת אותנו כמה מילים בשפה שלה, ואנחנו חברים טובים.",
      [
        g("join", "verb", "להיות חלק מקבוצה", "She joined our class.", "להצטרף"),
        g("country", "noun", "מדינה", "She is from another country.", "מדינה"),
        g("language", "noun", "מה שמדברים", "She teaches us words in her language.", "שפה"),
      ],
      [
        q("Where did the new girl sit at first?", "איפה התלמידה החדשה ישבה בהתחלה?", ["Alone at lunch", "With friends", "At the front", "In the library"], ["לבד בארוחת הצהריים", "עם חברים", "מלפנים", "בספרייה"], 0, "כתוב 'she sat alone at lunch'."),
        q("What does she teach the class now?", "מה היא מלמדת את הכיתה עכשיו?", ["A few words in her language", "Songs", "Games", "Math"], ["כמה מילים בשפה שלה", "שירים", "משחקים", "חשבון"], 0, "כתוב 'a few words in her language'."),
      ],
    ),
    R(
      "The School Choir (מקהלת בית הספר)",
      "I joined the school choir in September. We practise twice a week in the music room. At first I was shy, but our teacher is very kind and she helps everyone. Next month we are going to sing at the holiday concert, and my family is coming to listen.",
      "הצטרפתי למקהלת בית הספר בספטמבר. אנחנו מתאמנים פעמיים בשבוע בחדר המוזיקה. בהתחלה הייתי ביישנית, אבל המורה שלנו נחמדה מאוד והיא עוזרת לכולם. בחודש הבא אנחנו הולכים לשיר בקונצרט החג, והמשפחה שלי באה להקשיב.",
      [
        g("choir", "noun", "קבוצה של זמרים", "I joined the school choir.", "מקהלה"),
        g("practise", "verb", "לעשות שוב ושוב כדי להשתפר", "We practise twice a week.", "להתאמן"),
        g("concert", "noun", "מופע מוזיקה", "We will sing at the concert.", "קונצרט"),
      ],
      [
        q("How often does the choir practise?", "באיזו תדירות המקהלה מתאמנת?", ["Twice a week", "Every day", "Once a month", "Once a week"], ["פעמיים בשבוע", "כל יום", "פעם בחודש", "פעם בשבוע"], 0, "כתוב 'twice a week'."),
        q("Who is coming to the concert?", "מי בא לקונצרט?", ["The writer's family", "The writer's friends", "A teacher", "Nobody"], ["המשפחה של הכותבת", "החברים של הכותבת", "מורה", "אף אחד"], 0, "כתוב 'my family is coming to listen'."),
      ],
    ),
    R(
      "The Football Final (גמר הכדורגל)",
      "Last Saturday our school team played in the final. We were losing one-nil until the last five minutes. Then my friend scored a beautiful goal, and a minute later I scored another. We won two-one, and everyone ran to the field.",
      "בשבת שעברה קבוצת בית הספר שלנו שיחקה בגמר. היינו בפיגור אחד-אפס עד חמש הדקות האחרונות. אז החבר שלי הבקיע שער יפה, ודקה אחר כך אני הבקעתי עוד אחד. ניצחנו שתיים-אחד, וכולם רצו אל המגרש.",
      [
        g("final", "noun", "המשחק האחרון בתחרות", "Our team played in the final.", "גמר"),
        g("score", "verb", "להכניס כדור לשער", "My friend scored a goal.", "להבקיע"),
        g("goal", "noun", "שער בכדורגל", "He scored a beautiful goal.", "שער"),
      ],
      [
        q("What was the score before the last five minutes?", "מה הייתה התוצאה לפני חמש הדקות האחרונות?", ["They were losing 1-0", "They were winning 1-0", "It was 0-0", "They were losing 3-0"], ["הם היו בפיגור 1-0", "הם ניצחו 1-0", "זה היה 0-0", "הם הפסידו 3-0"], 0, "כתוב 'losing one-nil'."),
        q("What was the final score?", "מה התוצאה הסופית?", ["Two-one to the writer's team", "One-two", "Two-two", "Three-one"], ["שתיים-אחד לקבוצה של הכותב", "אחד-שתיים", "שתיים-שתיים", "שלוש-אחד"], 0, "כתוב 'We won two-one'."),
      ],
    ),
    R(
      "A Late Bus (אוטובוס מאחר)",
      "On Monday morning my bus did not come. I waited for twenty minutes and then I called my father. He was already at work, so I decided to walk. I arrived at school late, but my teacher understood and did not say anything.",
      "בבוקר יום שני האוטובוס שלי לא הגיע. חיכיתי עשרים דקות ואז התקשרתי לאבא שלי. הוא כבר היה בעבודה, אז החלטתי ללכת ברגל. הגעתי לבית הספר מאוחר, אבל המורה שלי הבינה ולא אמרה כלום.",
      [
        g("wait", "verb", "להישאר עד שמשהו קורה", "I waited for twenty minutes.", "לחכות"),
        g("arrive", "verb", "להגיע", "I arrived at school late.", "להגיע"),
        g("understand", "verb", "להבין", "My teacher understood.", "להבין"),
      ],
      [
        q("How long did the writer wait?", "כמה זמן הכותב חיכה?", ["Twenty minutes", "Ten minutes", "One hour", "Five minutes"], ["עשרים דקות", "עשר דקות", "שעה", "חמש דקות"], 0, "כתוב 'twenty minutes'."),
        q("What did the writer decide to do?", "מה הכותב החליט לעשות?", ["Walk to school", "Take a taxi", "Go home", "Wait more"], ["ללכת ברגל לבית הספר", "לקחת מונית", "לחזור הביתה", "לחכות עוד"], 0, "כתוב 'I decided to walk'."),
      ],
    ),
    R(
      "Homework Club (מועדון שיעורי בית)",
      "After school I go to the homework club in the library. A student from the university helps us with math and English. It is quiet there, and I can finish my work before dinner. I think my marks are getting better because of it.",
      "אחרי בית הספר אני הולך למועדון שיעורי הבית בספרייה. סטודנט מהאוניברסיטה עוזר לנו בחשבון ובאנגלית. שקט שם, ואני יכול לסיים את העבודה לפני ארוחת הערב. אני חושב שהציונים שלי משתפרים בזכות זה.",
      [
        g("club", "noun", "קבוצה שנפגשת לפעילות", "I go to the homework club.", "מועדון"),
        g("university", "noun", "מקום ללימודים אחרי בית הספר", "A student from the university helps us.", "אוניברסיטה"),
        g("mark", "noun", "ציון", "My marks are getting better.", "ציון"),
      ],
      [
        q("Who helps the children at the club?", "מי עוזר לילדים במועדון?", ["A university student", "A teacher", "A parent", "A doctor"], ["סטודנט מהאוניברסיטה", "מורה", "הורה", "רופא"], 0, "כתוב 'A student from the university'."),
        q("What does the writer think about his marks?", "מה הכותב חושב על הציונים שלו?", ["They are getting better", "They are getting worse", "They are the same", "He has no marks"], ["הם משתפרים", "הם מתדרדרים", "הם אותו דבר", "אין לו ציונים"], 0, "כתוב 'my marks are getting better'."),
      ],
    ),
    R(
      "My Grandfather's Stories (הסיפורים של סבא)",
      "My grandfather grew up in a small village by the sea. He told me that he walked to school every day and caught fish before breakfast. I love his stories, even when I have heard them many times. Last week I wrote some of them down in a notebook.",
      "סבא שלי גדל בכפר קטן ליד הים. הוא סיפר לי שהוא הלך לבית הספר בכל יום ותפס דגים לפני ארוחת הבוקר. אני אוהב את הסיפורים שלו, גם כשאני שומע אותם הרבה פעמים. בשבוע שעבר כתבתי כמה מהם במחברת.",
      [
        g("village", "noun", "מקום קטן מאוד עם מעט בתים", "He grew up in a village.", "כפר"),
        g("catch", "verb", "לתפוס", "He caught fish before breakfast.", "לתפוס"),
        g("notebook", "noun", "ספר לכתיבה", "I wrote them in a notebook.", "מחברת"),
      ],
      [
        q("Where did the grandfather grow up?", "איפה הסבא גדל?", ["In a small village by the sea", "In a big city", "On a farm", "In the desert"], ["בכפר קטן ליד הים", "בעיר גדולה", "בחווה", "במדבר"], 0, "כתוב 'a small village by the sea'."),
        q("What did the writer do last week?", "מה הכותב עשה בשבוע שעבר?", ["Wrote some stories in a notebook", "Visited the village", "Went fishing", "Made a film"], ["כתב כמה סיפורים במחברת", "ביקר בכפר", "הלך לדוג", "עשה סרט"], 0, "כתוב 'I wrote some of them down in a notebook'."),
      ],
    ),
    R(
      "Moving Rooms (מחליפים חדרים)",
      "Last month my little sister and I changed rooms. Mine is bigger, but hers has a balcony, so I wanted it. We moved all our furniture on Saturday, and my father helped us carry the heavy bed. Now I read on the balcony every evening.",
      "בחודש שעבר אחותי הקטנה ואני החלפנו חדרים. שלי גדול יותר, אבל לשלה יש מרפסת, אז רציתי אותו. העברנו את כל הרהיטים ביום שבת, ואבא שלי עזר לנו לשאת את המיטה הכבדה. עכשיו אני קורא במרפסת בכל ערב.",
      [
        g("balcony", "noun", "מקום פתוח מחוץ לחדר", "Her room has a balcony.", "מרפסת"),
        g("furniture", "noun", "שולחנות, כיסאות ומיטות", "We moved all the furniture.", "רהיטים"),
        g("heavy", "adjective", "שוקל הרבה", "My father carried the heavy bed.", "כבד"),
      ],
      [
        q("Why did the writer want the sister's room?", "למה הכותב רצה את החדר של אחותו?", ["It has a balcony", "It is bigger", "It is newer", "It is warmer"], ["יש בו מרפסת", "הוא גדול יותר", "הוא חדש יותר", "הוא חם יותר"], 0, "כתוב 'hers has a balcony'."),
        q("Who helped carry the bed?", "מי עזר לשאת את המיטה?", ["The father", "The mother", "A neighbour", "A friend"], ["האבא", "האמא", "שכן", "חבר"], 0, "כתוב 'my father helped us'."),
      ],
    ),
    R(
      "Family Photo Day (יום תמונת המשפחה)",
      "Every summer we take a family photo in front of the old tree. This year my cousins came from abroad, so there were fifteen of us. The photographer asked us to stand close together and smile. My grandmother laughed so much that the first photo was blurry.",
      "בכל קיץ אנחנו מצטלמים תמונה משפחתית מול העץ הישן. השנה בני הדודים שלי הגיעו מחו\"ל, ולכן היינו חמישה עשר. הצלם ביקש מאיתנו לעמוד קרוב ולחייך. סבתא שלי צחקה כל כך שהתמונה הראשונה יצאה מטושטשת.",
      [
        g("photographer", "noun", "אדם שמצלם תמונות", "The photographer asked us to smile.", "צלם"),
        g("abroad", "adverb", "בארץ אחרת", "My cousins came from abroad.", "מחוץ לארץ"),
        g("close", "adverb", "קרוב", "Stand close together.", "קרוב"),
      ],
      [
        q("How many people were in the photo?", "כמה אנשים היו בתמונה?", ["Fifteen", "Ten", "Twenty", "Twelve"], ["חמישה עשר", "עשרה", "עשרים", "שנים עשר"], 0, "כתוב 'fifteen of us'."),
        q("Why was the first photo blurry?", "למה התמונה הראשונה הייתה מטושטשת?", ["The grandmother laughed", "It was dark", "The camera was broken", "The photographer moved"], ["סבתא צחקה", "היה חשוך", "המצלמה הייתה שבורה", "הצלם זז"], 0, "כתוב 'My grandmother laughed so much'."),
      ],
    ),
    R(
      "Sunday Cleaning Day (יום ניקיון בימי ראשון)",
      "In our house everybody has a job on Sunday morning. I wash the floors, my brother takes out the rubbish, and my sister cleans the bathroom. My parents cook while we work. When we finish, we all sit down and eat lunch together.",
      "בבית שלנו לכל אחד יש משימה בבוקר יום ראשון. אני שוטף את הרצפות, אחי מוציא את הזבל, ואחותי מנקה את חדר האמבטיה. ההורים שלי מבשלים בזמן שאנחנו עובדים. כשאנחנו מסיימים, כולנו יושבים ואוכלים ארוחת צהריים ביחד.",
      [
        g("floor", "noun", "מה שהולכים עליו בחדר", "I wash the floors.", "רצפה"),
        g("rubbish", "noun", "דברים שזורקים", "My brother takes out the rubbish.", "זבל"),
        g("bathroom", "noun", "חדר רחצה", "My sister cleans the bathroom.", "חדר אמבטיה"),
      ],
      [
        q("What does the writer do?", "מה הכותב עושה?", ["He washes the floors", "He takes out the rubbish", "He cleans the bathroom", "He cooks"], ["שוטף את הרצפות", "מוציא את הזבל", "מנקה את חדר האמבטיה", "מבשל"], 0, "כתוב 'I wash the floors'."),
        q("What do they do when they finish?", "מה הם עושים כשהם מסיימים?", ["Eat lunch together", "Go out", "Watch TV", "Sleep"], ["אוכלים ארוחת צהריים ביחד", "יוצאים", "רואים טלוויזיה", "ישנים"], 0, "כתוב 'eat lunch together'."),
      ],
    ),
    R(
      "A Quiet Evening at Home (ערב שקט בבית)",
      "Last night there was a power cut, so we had no electricity for two hours. My mother lit some candles, and we sat in the living room and played cards. I did not miss the television at all. We laughed more than usual, and nobody wanted the lights to come back.",
      "אתמול בלילה הייתה הפסקת חשמל, ולכן לא היה לנו חשמל שעתיים. אמא שלי הדליקה כמה נרות, ואנחנו ישבנו בסלון ושיחקנו קלפים. לא התגעגעתי לטלוויזיה בכלל. צחקנו יותר מהרגיל, ואף אחד לא רצה שהאור יחזור.",
      [
        g("candle", "noun", "נר", "My mother lit some candles.", "נר"),
        g("electricity", "noun", "חשמל", "We had no electricity.", "חשמל"),
        g("usual", "adjective", "רגיל", "We laughed more than usual.", "רגיל"),
      ],
      [
        q("How long was there no electricity?", "כמה זמן לא היה חשמל?", ["Two hours", "One hour", "All night", "Ten minutes"], ["שעתיים", "שעה", "כל הלילה", "עשר דקות"], 0, "כתוב 'for two hours'."),
        q("What did the family do?", "מה המשפחה עשתה?", ["Played cards", "Watched a film", "Went out", "Slept"], ["שיחקו קלפים", "ראו סרט", "יצאו", "ישנו"], 0, "כתוב 'played cards'."),
      ],
    ),
    R(
      "My Aunt's Wedding (החתונה של הדודה שלי)",
      "Last Friday I went to my aunt's wedding. It was in a garden near the sea, and the sun was going down while she walked to the front. After the ceremony there was dinner, music and dancing until midnight. I danced with my grandfather, and he was better than me.",
      "ביום שישי שעבר הלכתי לחתונה של דודה שלי. היא הייתה בגן ליד הים, והשמש שקעה כשהיא הלכה קדימה. אחרי הטקס הייתה ארוחת ערב, מוזיקה וריקודים עד חצות. רקדתי עם סבא שלי, והוא היה טוב ממני.",
      [
        g("wedding", "noun", "טקס נישואין", "I went to a wedding.", "חתונה"),
        g("ceremony", "noun", "טקס", "After the ceremony there was dinner.", "טקס"),
        g("midnight", "noun", "שתים עשרה בלילה", "We danced until midnight.", "חצות"),
      ],
      [
        q("Where was the wedding?", "איפה הייתה החתונה?", ["In a garden near the sea", "In a hotel", "At a school", "At home"], ["בגן ליד הים", "במלון", "בבית ספר", "בבית"], 0, "כתוב 'in a garden near the sea'."),
        q("Who did the writer dance with?", "עם מי הכותב רקד?", ["His grandfather", "His aunt", "His cousin", "His teacher"], ["סבא שלו", "הדודה שלו", "בן דוד שלו", "המורה שלו"], 0, "כתוב 'I danced with my grandfather'."),
      ],
    ),
    R(
      "A Family Trip to the North (טיול משפחתי לצפון)",
      "During the spring holiday we drove to the north of the country. We stayed in a small guesthouse near a river and walked in the forest every morning. My little brother found a frog by the water, and we took a photo before we let it go. It was the best holiday we have ever had.",
      "בחופשת האביב נסענו לצפון הארץ. התארחנו בבית הארחה קטן ליד נהר והלכנו ביער בכל בוקר. אחי הקטן מצא צפרדע ליד המים, וצילמנו תמונה לפני ששחררנו אותו. זו הייתה החופשה הכי טובה שהייתה לנו אי פעם.",
      [
        g("forest", "noun", "מקום עם הרבה עצים", "We walked in the forest.", "יער"),
        g("river", "noun", "מים שזורמים", "The guesthouse is near a river.", "נהר"),
        g("holiday", "noun", "חופשה", "It was the best holiday.", "חופשה"),
      ],
      [
        q("Where did the family stay?", "איפה המשפחה התארחה?", ["In a small guesthouse", "In a big hotel", "In a car", "At a friend's house"], ["בבית הארחה קטן", "במלון גדול", "במכונית", "אצל חבר"], 0, "כתוב 'a small guesthouse'."),
        q("What did the little brother find?", "מה האח הקטן מצא?", ["A frog", "A fish", "A bird", "A snake"], ["צפרדע", "דג", "ציפור", "נחש"], 0, "כתוב 'found a frog'."),
      ],
    ),
    R(
      "A Bad Day in the Kitchen (יום גרוע במטבח)",
      "I tried to make a cake for my mother's birthday, but everything went wrong. I forgot the sugar, and then I left the cake in the oven for too long. It was black on the outside and raw inside. My mother laughed and said the best part was that I tried.",
      "ניסיתי להכין עוגה ליום ההולדת של אמא שלי, אבל הכול השתבש. שכחתי את הסוכר, ואז השארתי את העוגה בתנור יותר מדי זמן. היא הייתה שחורה מבחוץ ולא אפויה מבפנים. אמא שלי צחקה ואמרה שהחלק הכי טוב הוא שניסיתי.",
      [
        g("oven", "noun", "מכשיר לאפייה", "I left the cake in the oven.", "תנור"),
        g("forget", "verb", "לא לזכור", "I forgot the sugar.", "לשכוח"),
        g("raw", "adjective", "לא מבושל", "It was raw inside.", "נא"),
      ],
      [
        q("What did the writer forget?", "מה הכותב שכח?", ["The sugar", "The eggs", "The flour", "The milk"], ["את הסוכר", "את הביצים", "את הקמח", "את החלב"], 0, "כתוב 'I forgot the sugar'."),
        q("What did the mother say?", "מה האמא אמרה?", ["The best part was that I tried", "The cake was perfect", "It was too sweet", "She was angry"], ["שהחלק הכי טוב הוא שניסיתי", "שהעוגה מושלמת", "שהיא מתוקה מדי", "שהיא כועסת"], 0, "כתוב 'the best part was that I tried'."),
      ],
    ),
    R(
      "Trying Sushi (טועמים סושי)",
      "Yesterday my friend took me to a sushi restaurant for the first time. I was afraid of raw fish, so I ordered a roll with vegetables. The waiter showed me how to eat with two sticks. By the end I had tried fish too, and I liked it.",
      "אתמול החבר שלי לקח אותי למסעדת סושי בפעם הראשונה. פחדתי מדג נא, ולכן הזמנתי רול עם ירקות. המלצר הראה לי איך לאכול עם שני מקלות. בסוף טעמתי גם דג, ואהבתי.",
      [
        g("restaurant", "noun", "מקום לאכול בו", "We went to a sushi restaurant.", "מסעדה"),
        g("order", "verb", "לבקש אוכל במסעדה", "I ordered a roll.", "להזמין"),
        g("waiter", "noun", "אדם שמגיש אוכל", "The waiter showed me.", "מלצר"),
      ],
      [
        q("Why did the writer order a roll with vegetables?", "למה הכותב הזמין רול עם ירקות?", ["He was afraid of raw fish", "He was not hungry", "It was cheap", "It was the only choice"], ["הוא פחד מדג נא", "הוא לא היה רעב", "זה היה זול", "זו הייתה הברירה היחידה"], 0, "כתוב 'I was afraid of raw fish'."),
        q("What did the waiter show him?", "מה המלצר הראה לו?", ["How to eat with two sticks", "How to cook rice", "How to cut fish", "How to pay"], ["איך לאכול עם שני מקלות", "איך לבשל אורז", "איך לחתוך דג", "איך לשלם"], 0, "כתוב 'how to eat with two sticks'."),
      ],
    ),
    R(
      "The Best Hummus (החומוס הכי טוב)",
      "My uncle says that he makes the best hummus in the city. He cooks the beans for hours. Then he adds lemon, garlic and a lot of tahini. Every Saturday we sit at his table and finish three plates.",
      "הדוד שלי אומר שהוא מכין את החומוס הכי טוב בעיר. הוא מבשל את השעועית שעות. אחר כך הוא מוסיף לימון, שום והרבה טחינה. בכל שבת אנחנו יושבים ליד השולחן שלו וגומרים שלוש צלחות.",
      [
        g("garlic", "noun", "ירק עם ריח חזק", "He adds garlic.", "שום"),
        g("bean", "noun", "זרע קטן לבישול", "He cooks the beans.", "שעועית"),
        g("plate", "noun", "כלי שאוכלים ממנו", "We finish three plates.", "צלחת"),
      ],
      [
        q("What does the uncle say about his hummus?", "מה הדוד אומר על החומוס שלו?", ["It is the best in the city", "It is easy", "It is cheap", "It is old"], ["זה הטוב ביותר בעיר", "זה קל", "זה זול", "זה ישן"], 0, "כתוב 'the best hummus in the city'."),
        q("How many plates do they finish?", "כמה צלחות הם גומרים?", ["Three", "Two", "Five", "One"], ["שלוש", "שתיים", "חמש", "אחת"], 0, "כתוב 'three plates'."),
      ],
    ),
    R(
      "A Picnic in the Rain (פיקניק בגשם)",
      "We planned a picnic in the park, but it started to rain just as we arrived. We did not want to go home, so we sat under a big tree. We ate our sandwiches there, and the rain made a funny noise on the leaves. It was the most fun picnic of the year.",
      "תכננו פיקניק בפארק, אבל התחיל לרדת גשם בדיוק כשהגענו. לא רצינו לחזור הביתה, אז ישבנו מתחת לעץ גדול. אכלנו שם את הכריכים, והגשם עשה רעש מצחיק על העלים. זה היה הפיקניק הכי כיפי של השנה.",
      [
        g("plan", "verb", "לחשוב מראש", "We planned a picnic.", "לתכנן"),
        g("leaf", "noun", "החלק הירוק של העץ", "The rain falls on the leaves.", "עלה"),
        g("tree", "noun", "צמח גבוה", "We sat under a big tree.", "עץ"),
      ],
      [
        q("What happened when they arrived?", "מה קרה כשהם הגיעו?", ["It started to rain", "It was too hot", "The park was closed", "They lost the food"], ["התחיל לרדת גשם", "היה חם מדי", "הפארק היה סגור", "הם איבדו את האוכל"], 0, "כתוב 'it started to rain'."),
        q("Where did they sit?", "איפה הם ישבו?", ["Under a big tree", "On a bench", "In a car", "At home"], ["מתחת לעץ גדול", "על ספסל", "במכונית", "בבית"], 0, "כתוב 'we sat under a big tree'."),
      ],
    ),
    R(
      "Shabbat Dinner Preparations (הכנות לארוחת שבת)",
      "On Friday afternoon the whole family helps to prepare dinner. My grandmother bakes bread, my father cooks fish, and I set the table with the good plates. By six o'clock the house smells wonderful. When the candles are lit, everything becomes quiet and calm.",
      "בשישי אחר הצהריים כל המשפחה עוזרת להכין את ארוחת הערב. סבתא שלי אופה לחם, אבא שלי מבשל דג, ואני מערכת את השולחן עם הצלחות היפות. עד שש הבית מריח נהדר. כשהנרות מודלקים, הכול נהיה שקט ורגוע.",
      [
        g("prepare", "verb", "להכין מראש", "We prepare dinner.", "להכין"),
        g("bake", "verb", "לבשל בתנור", "My grandmother bakes bread.", "לאפות"),
        g("calm", "adjective", "רגוע", "Everything becomes quiet and calm.", "רגוע"),
      ],
      [
        q("What does the grandmother do?", "מה סבתא עושה?", ["She bakes bread", "She cooks fish", "She sets the table", "She buys flowers"], ["היא אופה לחם", "היא מבשלת דג", "היא מערכת שולחן", "היא קונה פרחים"], 0, "כתוב 'My grandmother bakes bread'."),
        q("What happens when the candles are lit?", "מה קורה כשהנרות מודלקים?", ["Everything becomes quiet and calm", "Everyone eats quickly", "The children play", "The music starts"], ["הכול נהיה שקט ורגוע", "כולם אוכלים מהר", "הילדים משחקים", "המוזיקה מתחילה"], 0, "כתוב 'everything becomes quiet and calm'."),
      ],
    ),
    R(
      "The Fruit Stall (דוכן הפירות)",
      "Near my school there is a small fruit stall. The man who works there always gives me a free piece of whatever is in season. In summer it is watermelon, and in winter it is orange. I do not have much money, but I go there every day just to talk to him.",
      "ליד בית הספר שלי יש דוכן פירות קטן. האיש שעובד שם תמיד נותן לי חתיכה חינם של מה שבעונה. בקיץ זה אבטיח, ובחורף זה תפוז. אין לי הרבה כסף, אבל אני הולך לשם כל יום רק כדי לדבר איתו.",
      [
        g("stall", "noun", "דוכן קטן שמוכרים בו", "There is a fruit stall.", "דוכן"),
        g("season", "noun", "אחת מארבע העונות", "He gives me fruit in season.", "עונה"),
        g("free", "adjective", "בלי לשלם", "He gives me a free piece.", "חינם"),
      ],
      [
        q("What does the man give the writer in summer?", "מה האיש נותן לכותב בקיץ?", ["Watermelon", "Orange", "Apple", "Banana"], ["אבטיח", "תפוז", "תפוח", "בננה"], 0, "כתוב 'In summer it is watermelon'."),
        q("Why does the writer go there every day?", "למה הכותב הולך לשם כל יום?", ["To talk to the man", "To buy a lot", "To work", "To eat lunch"], ["כדי לדבר עם האיש", "כדי לקנות הרבה", "כדי לעבוד", "כדי לאכול ארוחת צהריים"], 0, "כתוב 'just to talk to him'."),
      ],
    ),
    R(
      "Pizza Night (ערב פיצה)",
      "Every two weeks, on Friday, we have pizza night at our house. We make the dough ourselves and everyone chooses their own toppings. My brother always puts banana on his, and the rest of us think it is strange. Last time we made six pizzas and finished all of them.",
      "אחת לשבועיים, ביום שישי, יש לנו ערב פיצה בבית. אנחנו מכינים את הבצק בעצמנו וכל אחד בוחר את התוספות שלו. אחי תמיד שם בננה על שלו, והשאר חושבים שזה מוזר. בפעם האחרונה הכנו שש פיצות וגמרנו את כולן.",
      [
        g("dough", "noun", "בצק", "We make the dough ourselves.", "בצק"),
        g("topping", "noun", "מה שמוסיפים על הפיצה", "Everyone chooses their own toppings.", "תוספת"),
        g("strange", "adjective", "מוזר", "We think it is strange.", "מוזר"),
      ],
      [
        q("How often is pizza night?", "באיזו תדירות ערב הפיצה?", ["Every two weeks, on Friday", "Every day", "Every Sunday", "Once a year"], ["אחת לשבועיים, ביום שישי", "כל יום", "כל יום ראשון", "פעם בשנה"], 0, "כתוב 'Every two weeks, on Friday'."),
        q("What does the brother put on his pizza?", "מה האח שם על הפיצה שלו?", ["Banana", "Mushrooms", "Onions", "Corn"], ["בננה", "פטריות", "בצל", "תירס"], 0, "כתוב 'banana'."),
      ],
    ),
    R(
      "Learning to Surf (לומדים לגלוש)",
      "This summer my cousin taught me how to surf. The first day I fell off the board about twenty times and drank a lot of salty water. By the end of the week I could stand up for a few seconds. Now I am saving money to buy my own board.",
      "בקיץ הזה בן הדוד שלי לימד אותי לגלוש. ביום הראשון נפלתי מהגלשן בערך עשרים פעמים ושתיתי הרבה מים מלוחים. בסוף השבוע יכולתי לעמוד כמה שניות. עכשיו אני חוסך כסף כדי לקנות גלשן משלי.",
      [
        g("surf", "verb", "לרכוב על גלים", "My cousin taught me to surf.", "לגלוש"),
        g("board", "noun", "קרש לגלישה", "I fell off the board.", "גלשן"),
        g("salty", "adjective", "עם הרבה מלח", "I drank salty water.", "מלוח"),
      ],
      [
        q("Who taught the writer to surf?", "מי לימד את הכותב לגלוש?", ["His cousin", "His father", "His teacher", "His friend"], ["בן דודו", "אביו", "המורה שלו", "חברו"], 0, "כתוב 'my cousin taught me'."),
        q("What is the writer doing now?", "מה הכותב עושה עכשיו?", ["Saving money for his own board", "Giving lessons", "Taking a break", "Selling his board"], ["חוסך כסף לגלשן משלו", "נותן שיעורים", "לוקח הפסקה", "מוכר את הגלשן"], 0, "כתוב 'saving money to buy my own board'."),
      ],
    ),
    R(
      "The Marathon (המרתון)",
      "My father ran his first marathon last month. He trained for a year, and I often ran with him in the park. On the day of the race, the whole family stood at the finish line and shouted his name. He was very tired, but he crossed the line and he was smiling.",
      "אבא שלי רץ את המרתון הראשון שלו בחודש שעבר. הוא התאמן שנה, ואני רצתי איתו הרבה פעמים בפארק. ביום המירוץ כל המשפחה עמדה בקו הסיום וצעקה את שמו. הוא היה עייף מאוד, אבל חצה את הקו והוא חייך.",
      [
        g("marathon", "noun", "ריצה ארוכה מאוד", "My father ran a marathon.", "מרתון"),
        g("train", "verb", "להתאמן", "He trained for a year.", "להתאמן"),
        g("finish", "noun", "סוף של מירוץ", "We stood at the finish line.", "סיום"),
      ],
      [
        q("How long did the father train?", "כמה זמן האבא התאמן?", ["A year", "A month", "A week", "Two years"], ["שנה", "חודש", "שבוע", "שנתיים"], 0, "כתוב 'trained for a year'."),
        q("Where did the family stand?", "איפה המשפחה עמדה?", ["At the finish line", "At the start", "In the park", "At home"], ["בקו הסיום", "בקו הזינוק", "בפארק", "בבית"], 0, "כתוב 'at the finish line'."),
      ],
    ),
    R(
      "Beach Cleaning Day (יום ניקיון בחוף)",
      "Last Saturday our class went to the beach to pick up rubbish. We found bottles, plastic bags and even an old shoe. Together we filled twelve big bags in two hours. The beach looked beautiful after that, and we felt proud of ourselves.",
      "בשבת שעברה הכיתה שלנו הלכה לחוף לאסוף זבל. מצאנו בקבוקים, שקיות פלסטיק ואפילו נעל ישנה. ביחד מילאנו שנים עשר שקים גדולים בשעתיים. החוף נראה יפה אחר כך, והרגשנו גאים בעצמנו.",
      [
        g("rubbish", "noun", "דברים שזורקים", "We picked up rubbish.", "זבל"),
        g("fill", "verb", "לשים עד שמלא", "We filled twelve bags.", "למלא"),
        g("proud", "adjective", "שמח במה שעשית", "We felt proud.", "גאה"),
      ],
      [
        q("How many bags did they fill?", "כמה שקים הם מילאו?", ["Twelve", "Ten", "Twenty", "Five"], ["שנים עשר", "עשרה", "עשרים", "חמישה"], 0, "כתוב 'twelve big bags'."),
        q("How did the students feel after that?", "איך התלמידים הרגישו אחר כך?", ["Proud", "Bored", "Angry", "Sad"], ["גאים", "משועממים", "כועסים", "עצובים"], 0, "כתוב 'proud of ourselves'."),
      ],
    ),
    R(
      "A Day at the Water Park (יום בפארק המים)",
      "For my birthday we spent the whole day at the water park. I went down the biggest slide four times, but my little sister was too afraid. We ate ice cream by the pool and jumped into the wave pool. When we got home, we were all red from the sun and fell asleep at once.",
      "ליום ההולדת שלי בילינו יום שלם בפארק המים. ירדתי במגלשה הגדולה ביותר ארבע פעמים, אבל אחותי הקטנה פחדה מכדי לנסות. אכלנו גלידה ליד הבריכה וקפצנו לבריכת הגלים. כשהגענו הביתה, כולנו היינו אדומים מהשמש ונרדמנו מיד.",
      [
        g("slide", "noun", "משטח להחלקה", "I went down the slide.", "מגלשה"),
        g("wave", "noun", "תנועה של מים", "We jumped into the wave pool.", "גל"),
        g("afraid", "adjective", "מפחד", "My sister was afraid.", "מפחדת"),
      ],
      [
        q("How many times did the writer go down the biggest slide?", "כמה פעמים הכותב ירד במגלשה הגדולה ביותר?", ["Four", "Two", "Ten", "One"], ["ארבע", "שתיים", "עשר", "אחת"], 0, "כתוב 'four times'."),
        q("Why did the sister not go?", "למה האחות לא ירדה?", ["She was too afraid", "She was sick", "She was tired", "She was hungry"], ["היא פחדה מדי", "היא הייתה חולה", "היא הייתה עייפה", "היא הייתה רעבה"], 0, "כתוב 'too afraid'."),
      ],
    ),
    R(
      "Basketball Practice (אימון כדורסל)",
      "I play basketball for a local team. We practise on Monday and Thursday evenings, and our coach is very strict. She makes us run ten times around the hall before we touch the ball. It is hard work, but we won the league last year.",
      "אני משחק כדורסל בקבוצה מקומית. אנחנו מתאמנים בערבי יום שני וחמישי, והמאמנת שלנו קפדנית מאוד. היא גורמת לנו לרוץ עשרה סיבובים באולם לפני שאנחנו נוגעים בכדור. זו עבודה קשה, אבל זכינו בליגה בשנה שעברה.",
      [
        g("coach", "noun", "מי שמאמן קבוצה", "Our coach is strict.", "מאמנת"),
        g("strict", "adjective", "מקפיד על כללים", "She is very strict.", "קפדנית"),
        g("league", "noun", "תחרות של קבוצות", "We won the league.", "ליגה"),
      ],
      [
        q("When does the team practise?", "מתי הקבוצה מתאמנת?", ["Monday and Thursday evenings", "Every morning", "Friday afternoons", "Weekends only"], ["בערבי יום שני וחמישי", "כל בוקר", "בשישי אחר הצהריים", "רק בסופי שבוע"], 0, "כתוב 'Monday and Thursday evenings'."),
        q("What does the coach make them do first?", "מה המאמנת גורמת להם לעשות קודם?", ["Run ten times around the hall", "Play a game", "Sleep", "Sing"], ["לרוץ עשרה סיבובים באולם", "לשחק משחק", "לישון", "לשיר"], 0, "כתוב 'run ten times around the hall'."),
      ],
    ),
    R(
      "Table Tennis with Dad (טניס שולחן עם אבא)",
      "My father and I have a small table tennis table in the garage. Every evening after dinner we play five games. He used to beat me easily, but now I win about half of them. He says I am getting too good, and he pretends to be angry.",
      "לאבא שלי ולי יש שולחן טניס קטן במוסך. בכל ערב אחרי ארוחת הערב אנחנו משחקים חמישה משחקים. פעם הוא ניצח אותי בקלות, אבל עכשיו אני מנצח בערך חצי מהם. הוא אומר שאני נהיה טוב מדי, ומעמיד פנים שהוא כועס.",
      [
        g("garage", "noun", "מקום לחנות בו מכונית", "We have a table in the garage.", "מוסך"),
        g("beat", "verb", "לנצח", "He used to beat me.", "לנצח"),
        g("pretend", "verb", "להעמיד פנים", "He pretends to be angry.", "להעמיד פנים"),
      ],
      [
        q("Where do they play?", "איפה הם משחקים?", ["In the garage", "In the garden", "In the kitchen", "At school"], ["במוסך", "בגינה", "במטבח", "בבית הספר"], 0, "כתוב 'in the garage'."),
        q("How many games does the writer win now?", "כמה משחקים הכותב מנצח עכשיו?", ["About half", "Nothing", "All of them", "One"], ["בערך חצי", "אף אחד", "את כולם", "אחד"], 0, "כתוב 'about half of them'."),
      ],
    ),
    R(
      "Hanukkah Candles (נרות חנוכה)",
      "On the first night of Hanukkah we gather at my grandparents' house. My grandfather lights one candle, and we all sing together. Each night we add another candle, and by the eighth night the window is full of light. We eat doughnuts and play games until late.",
      "בליל חנוכה הראשון אנחנו מתאספים בבית של הסבים שלי. סבא שלי מדליק נר אחד, וכולנו שרים ביחד. בכל לילה אנחנו מוסיפים עוד נר, ובלילה השמיני החלון מלא באור. אנחנו אוכלים סופגניות ומשחקים עד מאוחר.",
      [
        g("gather", "verb", "להתאסף", "We gather at my grandparents' house.", "להתאסף"),
        g("light", "verb", "להדליק", "My grandfather lights a candle.", "להדליק"),
        g("doughnut", "noun", "עוגה עגולה מטוגנת", "We eat doughnuts.", "סופגנייה"),
      ],
      [
        q("Who lights the first candle?", "מי מדליק את הנר הראשון?", ["The grandfather", "The father", "The writer", "The grandmother"], ["הסבא", "האבא", "הכותב", "הסבתא"], 0, "כתוב 'My grandfather lights one candle'."),
        q("What happens each night?", "מה קורה בכל לילה?", ["They add another candle", "They go to school", "They go out", "They sleep early"], ["הם מוסיפים עוד נר", "הם הולכים לבית הספר", "הם יוצאים", "הם הולכים לישון מוקדם"], 0, "כתוב 'we add another candle'."),
      ],
    ),
    R(
      "Purim Costumes (תחפושות פורים)",
      "For Purim I decided to dress up as a pirate. My mother made me a red scarf, and my father made me a black hat. At school there was a party, and a boy dressed as a banana made everyone laugh. He was funnier than me, but I did not mind, because I had a great time anyway.",
      "בפורים החלטתי להתחפש לפיראט. אמא שלי הכינה לי צעיף אדום, ואבא שלי הכין לי כובע שחור. בבית הספר הייתה מסיבה, וילד שהתחפש לבננה הצחיק את כולם. הוא היה מצחיק ממני, אבל לא הפריע לי, כי נהניתי בכל מקרה.",
      [
        g("costume", "noun", "בגדים מיוחדים של דמות", "My costume is red and black.", "תחפושת"),
        g("pirate", "noun", "שודד ים", "I dressed up as a pirate.", "פיראט"),
        g("scarf", "noun", "בד על הצוואר", "My mother made me a scarf.", "צעיף"),
      ],
      [
        q("What did the writer dress up as?", "במה הכותב התחפש?", ["A pirate", "A banana", "A king", "A doctor"], ["פיראט", "בננה", "מלך", "רופא"], 0, "כתוב 'dress up as a pirate'."),
        q("Who made everyone laugh?", "מי הצחיק את כולם?", ["A boy dressed as a banana", "The writer", "A girl dressed as a cat", "The teacher"], ["ילד שהתחפש לבננה", "הכותב", "ילדה שהתחפשה לחתול", "המורה"], 0, "כתוב 'a boy dressed as a banana made everyone laugh'."),
      ],
    ),
    R(
      "Sukkot Week (שבוע סוכות)",
      "Every year before Sukkot my father and I build a sukkah in the yard. We put up wooden walls and cover the top with green leaves. My sister makes colourful decorations from paper. During the holiday we eat all our meals outside, even when it is windy.",
      "בכל שנה לפני סוכות אבא שלי ואני בונים סוכה בחצר. אנחנו מציבים קירות מעץ ומכסים את הגג בעלים ירוקים. אחותי מכינה קישוטים צבעוניים מנייר. במהלך החג אנחנו אוכלים את כל הארוחות בחוץ, גם כשיש רוח.",
      [
        g("build", "verb", "לבנות", "We build a sukkah.", "לבנות"),
        g("decoration", "noun", "דבר יפה לקישוט", "My sister makes decorations.", "קישוט"),
        g("wooden", "adjective", "עשוי עץ", "We put up wooden walls.", "מעץ"),
      ],
      [
        q("What do they cover the top with?", "במה הם מכסים את הגג?", ["Green leaves", "Plastic", "Cloth", "Paper"], ["עלים ירוקים", "פלסטיק", "בד", "נייר"], 0, "כתוב 'green leaves'."),
        q("Where do they eat during the holiday?", "איפה הם אוכלים במהלך החג?", ["Outside", "In the kitchen", "At a restaurant", "In the living room"], ["בחוץ", "במטבח", "במסעדה", "בסלון"], 0, "כתוב 'all our meals outside'."),
      ],
    ),
    R(
      "Independence Day Barbecue (על האש ביום העצמאות)",
      "On Independence Day we always have a barbecue in the park. My uncle brings the meat, my aunt brings salads, and the children bring the football. We sit on blankets, eat until we are full, and watch the planes fly over. In the evening everyone goes home sunburnt and happy.",
      "ביום העצמאות אנחנו תמיד עושים על האש בפארק. הדוד שלי מביא את הבשר, הדודה שלי מביאה סלטים, והילדים מביאים את הכדורגל. אנחנו יושבים על שמיכות, אוכלים עד שאנחנו שבעים, וצופים במטוסים שעוברים מעלינו. בערב כולם חוזרים הביתה שרופים מהשמש ושמחים.",
      [
        g("barbecue", "noun", "בישול בשר על אש בחוץ", "We have a barbecue in the park.", "על האש"),
        g("meat", "noun", "בשר", "My uncle brings the meat.", "בשר"),
        g("plane", "noun", "כלי טיס", "We watch the planes fly over.", "מטוס"),
      ],
      [
        q("What does the uncle bring?", "מה הדוד מביא?", ["The meat", "Salads", "The football", "Drinks"], ["את הבשר", "סלטים", "את הכדורגל", "משקאות"], 0, "כתוב 'My uncle brings the meat'."),
        q("What do they watch?", "במה הם צופים?", ["Planes flying over", "A football game", "A film", "A concert"], ["במטוסים שעוברים", "במשחק כדורגל", "בסרט", "בקונצרט"], 0, "כתוב 'watch the planes fly over'."),
      ],
    ),
    R(
      "Cleaning for Passover (מנקים לפסח)",
      "Before Passover my family cleans the whole house from top to bottom. I have to sort out my old books and clothes, and I always find things I forgot about. My mother says it is a chance to start fresh. When we finish, everything smells clean and the house feels bigger.",
      "לפני פסח המשפחה שלי מנקה את כל הבית מלמעלה למטה. אני צריך למיין את הספרים והבגדים הישנים שלי, ותמיד אני מוצא דברים ששכחתי מהם. אמא שלי אומרת שזו הזדמנות להתחיל מחדש. כשאנחנו מסיימים, הכול מריח נקי והבית מרגיש גדול יותר.",
      [
        g("sort", "verb", "לסדר לפי סוגים", "I sort out my old books.", "למיין"),
        g("chance", "noun", "הזדמנות", "It is a chance to start fresh.", "הזדמנות"),
        g("clean", "adjective", "לא מלוכלך", "Everything smells clean.", "נקי"),
      ],
      [
        q("What does the writer have to sort out?", "מה הכותב צריך למיין?", ["Old books and clothes", "Old toys", "Photos", "Shoes"], ["ספרים ובגדים ישנים", "צעצועים ישנים", "תמונות", "נעליים"], 0, "כתוב 'old books and clothes'."),
        q("What does the mother say it is?", "מה האמא אומרת שזה?", ["A chance to start fresh", "A waste of time", "A big problem", "A game"], ["הזדמנות להתחיל מחדש", "בזבוז זמן", "בעיה גדולה", "משחק"], 0, "כתוב 'a chance to start fresh'."),
      ],
    ),
    R(
      "A Day in Jerusalem (יום בירושלים)",
      "Last weekend we visited Jerusalem for the first time as a class. We walked through the narrow streets of the old city and tasted warm bread from a small shop. The guide told us stories about every corner. I took more than a hundred photos with my phone.",
      "בסוף השבוע האחרון ביקרנו בירושלים בפעם הראשונה עם הכיתה. הלכנו ברחובות הצרים של העיר העתיקה וטעמנו לחם חם מחנות קטנה. המדריך סיפר לנו סיפורים על כל פינה. צילמתי יותר ממאה תמונות בטלפון.",
      [
        g("narrow", "adjective", "לא רחב", "We walked through narrow streets.", "צר"),
        g("guide", "noun", "אדם שמראה מקומות", "The guide told us stories.", "מדריך"),
        g("corner", "noun", "פינה", "He told stories about every corner.", "פינה"),
      ],
      [
        q("What did the class taste?", "מה הכיתה טעמה?", ["Warm bread from a small shop", "Cold juice", "Ice cream", "Fish"], ["לחם חם מחנות קטנה", "מיץ קר", "גלידה", "דגים"], 0, "כתוב 'warm bread from a small shop'."),
        q("What did the writer take?", "מה הכותב צילם?", ["More than a hundred photos", "Ten photos", "A film", "No photos"], ["יותר ממאה תמונות", "עשר תמונות", "סרט", "אף תמונה"], 0, "כתוב 'more than a hundred photos'."),
      ],
    ),
    R(
      "The Night Market (השוק בלילה)",
      "On Thursday evenings there is a night market near our house. The shops sell spices, fruit, clothes and hot food, and musicians play on the corners. My mother likes to buy fresh vegetables, and I like the smell of hot bread. We usually come home with more bags than we planned.",
      "בערבי יום חמישי יש שוק לילה ליד הבית שלנו. הדוכנים מוכרים תבלינים, פירות, בגדים ואוכל חם, ונגנים מנגנים בפינות. אמא שלי אוהבת לקנות ירקות טריים, ואני אוהב את הריח של לחם חם. בדרך כלל אנחנו חוזרים הביתה עם יותר שקיות ממה שתכננו.",
      [
        g("spice", "noun", "תבלין", "The shops sell spices.", "תבלין"),
        g("musician", "noun", "אדם שמנגן", "Musicians play on the corners.", "נגן"),
        g("market", "noun", "מקום מכירה", "There is a night market.", "שוק"),
      ],
      [
        q("When is the night market?", "מתי שוק הלילה?", ["On Thursday evenings", "On Friday mornings", "Every day", "On Sunday"], ["בערבי יום חמישי", "בבוקר יום שישי", "כל יום", "ביום ראשון"], 0, "כתוב 'Thursday evenings'."),
        q("What does the writer like?", "מה הכותב אוהב?", ["The smell of hot bread", "The clothes", "The music", "The fruit"], ["את הריח של לחם חם", "את הבגדים", "את המוזיקה", "את הפירות"], 0, "כתוב 'the smell of hot bread'."),
      ],
    ),
    R(
      "The Airport Delay (עיכוב בשדה התעופה)",
      "Our flight to London was delayed for four hours, so we waited at the airport. My little brother ran around the shops, and I read a magazine. At last they called our flight, and we got on the plane tired but excited. The delay felt long, but the holiday was worth it.",
      "הטיסה שלנו ללונדון התעכבה בארבע שעות, ולכן חיכינו בשדה התעופה. אחי הקטן רץ בין החנויות, ואני קראתי מגזין. סוף סוף קראו לטיסה שלנו, ועלינו למטוס עייפים אבל מתרגשים. העיכוב הרגיש ארוך, אבל החופשה הייתה שווה את זה.",
      [
        g("flight", "noun", "נסיעה במטוס", "Our flight was delayed.", "טיסה"),
        g("delay", "verb", "לגרום לאיחור", "The flight was delayed.", "לעכב"),
        g("magazine", "noun", "עיתון עם תמונות", "I read a magazine.", "מגזין"),
      ],
      [
        q("How long was the flight delayed?", "בכמה זמן הטיסה התעכבה?", ["Four hours", "One hour", "Two hours", "All day"], ["ארבע שעות", "שעה", "שעתיים", "כל היום"], 0, "כתוב 'four hours'."),
        q("What did the writer do while waiting?", "מה הכותב עשה בזמן ההמתנה?", ["Read a magazine", "Slept", "Went shopping", "Played games"], ["קרא מגזין", "ישן", "עשה קניות", "שיחק משחקים"], 0, "כתוב 'I read a magazine'."),
      ],
    ),
    R(
      "A Town in the North (עיירה בצפון)",
      "My aunt lives in a small town in the north, near the mountains. In winter it is much colder than in our city, and sometimes there is snow. We visit her every year at the end of December. We drink hot chocolate by the fire and look at the white hills.",
      "דודה שלי גרה בעיירה קטנה בצפון, ליד ההרים. בחורף קר שם הרבה יותר מאשר בעיר שלנו, ולפעמים יש שלג. אנחנו מבקרים אותה בכל שנה בסוף דצמבר. אנחנו שותים שוקו חם ליד האש ומסתכלים על הגבעות הלבנות.",
      [
        g("mountain", "noun", "גבעה גדולה מאוד", "She lives near the mountains.", "הר"),
        g("colder", "adjective", "קר יותר", "It is much colder there.", "קר יותר"),
        g("fire", "noun", "אש", "We sit by the fire.", "אש"),
      ],
      [
        q("Where does the aunt live?", "איפה הדודה גרה?", ["In a small town in the north", "In the south", "In the desert", "By the sea"], ["בעיירה קטנה בצפון", "בדרום", "במדבר", "ליד הים"], 0, "כתוב 'a small town in the north'."),
        q("When do they visit her?", "מתי הם מבקרים אותה?", ["At the end of December", "In summer", "In spring", "In September"], ["בסוף דצמבר", "בקיץ", "באביב", "בספטמבר"], 0, "כתוב 'at the end of December'."),
      ],
    ),
    R(
      "The Alarm Clock (השעון המעורר)",
      "My alarm clock rings at six thirty every morning, but I press the button and go back to sleep. Last week I did this three times and missed my bus. Now I put the clock on the other side of the room, so I have to get out of bed to stop it. It works, but I still do not like it.",
      "השעון המעורר שלי מצלצל בשש וחצי בכל בוקר, אבל אני לוחץ על הכפתור וחוזר לישון. בשבוע שעבר עשיתי את זה שלוש פעמים ופספסתי את האוטובוס. עכשיו אני שם את השעון בצד השני של החדר, ולכן אני חייב לצאת מהמיטה כדי להפסיק אותו. זה עובד, אבל אני עדיין לא אוהב את זה.",
      [
        g("alarm", "noun", "צליל שמעיר אותך", "My alarm rings at six thirty.", "מעורר"),
        g("press", "verb", "ללחוץ", "I press the button.", "ללחוץ"),
        g("miss", "verb", "לא להספיק", "I missed my bus.", "לפספס"),
      ],
      [
        q("What time does the alarm ring?", "באיזו שעה השעון המעורר מצלצל?", ["Six thirty", "Seven", "Five", "Eight"], ["שש וחצי", "שבע", "חמש", "שמונה"], 0, "כתוב 'six thirty'."),
        q("What does the writer do now?", "מה הכותב עושה עכשיו?", ["Puts the clock on the other side of the room", "Buys a new clock", "Goes to bed early", "Asks his mother"], ["שם את השעון בצד השני של החדר", "קונה שעון חדש", "הולך לישון מוקדם", "מבקש מאמא"], 0, "כתוב 'on the other side of the room'."),
      ],
    ),
    R(
      "Losing My Wallet (איבדתי את הארנק)",
      "On the bus yesterday I realised that my wallet was missing. It had my student card, forty shekels and a photo of my family. I walked back the same way and asked at the bus station. Luckily, a kind woman had handed it in, and nothing was missing.",
      "באוטובוס אתמול הבנתי שהארנק שלי חסר. היו בו כרטיס הסטודנט שלי, ארבעים שקלים ותמונה של המשפחה שלי. חזרתי באותה דרך ושאלתי בתחנת האוטובוסים. למזלי, אישה נחמדה מסרה אותו, ושום דבר לא חסר.",
      [
        g("wallet", "noun", "ארנק", "My wallet was missing.", "ארנק"),
        g("realise", "verb", "להבין פתאום", "I realised my wallet was missing.", "להבין"),
        g("luckily", "adverb", "למזלי", "Luckily, a woman found it.", "למזלי"),
      ],
      [
        q("What was in the wallet?", "מה היה בארנק?", ["A student card, forty shekels and a photo", "A phone", "A key", "A ticket"], ["כרטיס סטודנט, ארבעים שקלים ותמונה", "טלפון", "מפתח", "כרטיס נסיעה"], 0, "כתוב 'student card, forty shekels and a photo'."),
        q("Who handed in the wallet?", "מי מסרה את הארנק?", ["A kind woman", "The driver", "A boy", "A police officer"], ["אישה נחמדה", "הנהג", "ילד", "שוטר"], 0, "כתוב 'a kind woman had handed it in'."),
      ],
    ),
    R(
      "A Broken Window (חלון שבור)",
      "While we were playing football in the yard, the ball hit our neighbour's window. The glass broke and we all froze. I went to his door, said I was sorry, and offered to pay for the repair. He smiled and said, \"Thank you for telling the truth.\"",
      "בזמן ששיחקנו כדורגל בחצר, הכדור פגע בחלון של השכן שלנו. הזכוכית נשברה וכולנו קפאנו. הלכתי לדלת שלו, אמרתי שאני מצטער והצעתי לשלם על התיקון. הוא חייך ואמר: \"תודה שאמרת את האמת.\"",
      [
        g("window", "noun", "פתח בקיר עם זכוכית", "The ball hit the window.", "חלון"),
        g("repair", "noun", "תיקון", "I offered to pay for the repair.", "תיקון"),
        g("truth", "noun", "מה שנכון", "Thank you for telling the truth.", "אמת"),
      ],
      [
        q("What did the writer offer to do?", "מה הכותב הציע לעשות?", ["Pay for the repair", "Run away", "Buy a new ball", "Clean the glass"], ["לשלם על התיקון", "לברוח", "לקנות כדור חדש", "לנקות את הזכוכית"], 0, "כתוב 'offered to pay for the repair'."),
        q("What did the neighbour say?", "מה השכן אמר?", ["Thank you for telling the truth", "Go away", "I am angry", "Do not play here"], ["תודה שאמרת את האמת", "לך מכאן", "אני כועס", "אל תשחקו כאן"], 0, "כתוב 'Thank you for telling the truth'."),
      ],
    ),
    R(
      "A Rainy Saturday (שבת גשומה)",
      "It rained all day on Saturday, so we could not go to the beach. My brother and I built a fort from blankets and chairs in the living room. We read comics inside it and ate biscuits. By evening we had forgotten all about the weather.",
      "ירד גשם כל יום שבת, ולכן לא יכולנו ללכת לים. אחי ואני בנינו מבצר משמיכות וכיסאות בסלון. קראנו בו קומיקס ואכלנו עוגיות. עד הערב כבר שכחנו לגמרי מהמזג האוויר.",
      [
        g("fort", "noun", "בית קטן שבונים מדברים", "We built a fort.", "מבצר"),
        g("comic", "noun", "ספר עם ציורים וסיפור", "We read comics.", "קומיקס"),
        g("weather", "noun", "גשם, שמש, רוח", "We forgot about the weather.", "מזג אוויר"),
      ],
      [
        q("Why could they not go to the beach?", "למה הם לא יכלו ללכת לים?", ["It rained all day", "It was too hot", "It was closed", "They were sick"], ["ירד גשם כל היום", "היה חם מדי", "זה היה סגור", "הם היו חולים"], 0, "כתוב 'It rained all day'."),
        q("What did they build?", "מה הם בנו?", ["A fort from blankets and chairs", "A boat", "A house", "A tower"], ["מבצר משמיכות וכיסאות", "סירה", "בית", "מגדל"], 0, "כתוב 'a fort from blankets and chairs'."),
      ],
    ),
    R(
      "A Visit to the Doctor (ביקור אצל הרופא)",
      "I had a fever and a bad cough, so my mother took me to the doctor. The doctor looked in my ears and listened to my chest. She said it was a normal cold and told me to rest and drink a lot. After three days I felt much better and went back to school.",
      "היה לי חום ושיעול, ולכן אמא שלי לקחה אותי לרופאה. היא הסתכלה לי באוזניים והקשיבה לחזה שלי. היא אמרה שזו הצטננות רגילה והורתה לי לנוח ולשתות הרבה. אחרי שלושה ימים הרגשתי הרבה יותר טוב וחזרתי לבית הספר.",
      [
        g("fever", "noun", "חום גבוה בגוף", "I had a fever.", "חום"),
        g("rest", "verb", "לנוח", "She told me to rest.", "לנוח"),
        g("chest", "noun", "החלק הקדמי של הגוף", "She listened to my chest.", "חזה"),
      ],
      [
        q("What did the doctor say?", "מה הרופאה אמרה?", ["It was a normal cold", "It was serious", "I needed to go to hospital", "I was fine"], ["זו הצטננות רגילה", "זה רציני", "הייתי צריך ללכת לבית חולים", "הייתי בסדר"], 0, "כתוב 'a normal cold'."),
        q("How long did it take to feel better?", "כמה זמן לקח להרגיש טוב יותר?", ["Three days", "One day", "A week", "A month"], ["שלושה ימים", "יום", "שבוע", "חודש"], 0, "כתוב 'After three days'."),
      ],
    ),
    R(
      "Shopping Online (קונים באינטרנט)",
      "I wanted a new pair of shoes, so I looked at several websites. The prices were different everywhere, and I spent two hours comparing them. In the end I ordered a pair that was on sale. They arrived three days later, and they fit perfectly.",
      "רציתי זוג נעליים חדש, ולכן הסתכלתי בכמה אתרים. המחירים היו שונים בכל מקום, וביליתי שעתיים בהשוואת המחירים. בסוף הזמנתי זוג שהיה במבצע. הנעליים הגיעו שלושה ימים אחר כך והתאימו בצורה מושלמת.",
      [
        g("website", "noun", "דף באינטרנט", "I looked at several websites.", "אתר"),
        g("compare", "verb", "לבדוק מה שונה", "I spent two hours comparing prices.", "להשוות"),
        g("sale", "noun", "מחיר נמוך זמני", "They were on sale.", "מבצע"),
      ],
      [
        q("How long did the writer spend comparing prices?", "כמה זמן הכותב בילה בהשוואת מחירים?", ["Two hours", "Ten minutes", "A whole day", "One hour"], ["שעתיים", "עשר דקות", "יום שלם", "שעה"], 0, "כתוב 'two hours'."),
        q("When did the shoes arrive?", "מתי הנעליים הגיעו?", ["Three days later", "The next day", "A week later", "Two days later"], ["שלושה ימים אחר כך", "למחרת", "שבוע אחר כך", "יומיים אחר כך"], 0, "כתוב 'three days later'."),
      ],
    ),
    R(
      "The Piano Lesson (שיעור פסנתר)",
      "I started piano lessons when I was eight. My teacher is an old lady who lives in a house full of flowers. At first I only played simple songs with one hand, but now I can play with both. Every lesson ends with a cup of tea and a biscuit.",
      "התחלתי שיעורי פסנתר כשהייתי בן שמונה. המורה שלי היא גברת מבוגרת שגרה בבית מלא פרחים. בהתחלה ניגנתי רק שירים פשוטים ביד אחת, אבל עכשיו אני יכול לנגן בשתיים. כל שיעור מסתיים בכוס תה ובעוגייה.",
      [
        g("lesson", "noun", "זמן לימוד", "I have a piano lesson.", "שיעור"),
        g("simple", "adjective", "קל", "I played simple songs.", "פשוט"),
        g("biscuit", "noun", "עוגייה", "Every lesson ends with a biscuit.", "עוגייה"),
      ],
      [
        q("When did the writer start piano lessons?", "מתי הכותב התחיל שיעורי פסנתר?", ["When he was eight", "Last year", "Two months ago", "When he was ten"], ["כשהיה בן שמונה", "בשנה שעברה", "לפני חודשיים", "כשהיה בן עשר"], 0, "כתוב 'when I was eight'."),
        q("How does every lesson end?", "איך כל שיעור מסתיים?", ["With a cup of tea and a biscuit", "With a test", "With a song", "With homework"], ["בכוס תה ועוגייה", "במבחן", "בשיר", "בשיעורי בית"], 0, "כתוב 'a cup of tea and a biscuit'."),
      ],
    ),
    R(
      "The Neighbour's Garden (הגינה של השכנה)",
      "While my neighbour is away, I look after her garden. Every evening I water the plants and pick the ripe tomatoes. She says I can keep half of them. Last week I made a salad with our own vegetables, and it tasted better than anything from the shop.",
      "בזמן ששכנתי נמצאת מחוץ לבית, אני מטפל בגינה שלה. בכל ערב אני משקה את הצמחים וקוטף את העגבניות הבשלות. היא אומרת שאני יכול לשמור חצי מהן. בשבוע שעבר הכנתי סלט מהירקות שלנו, והוא היה טעים יותר מכל דבר מהחנות.",
      [
        g("garden", "noun", "מקום עם צמחים", "I look after her garden.", "גינה"),
        g("ripe", "adjective", "בשל ומוכן לאכילה", "I pick the ripe tomatoes.", "בשל"),
        g("water", "verb", "לתת מים", "I water the plants.", "להשקות"),
      ],
      [
        q("What does the writer do every evening?", "מה הכותב עושה בכל ערב?", ["Waters the plants and picks tomatoes", "Cooks dinner", "Cleans the house", "Goes shopping"], ["משקה את הצמחים וקוטף עגבניות", "מבשל ארוחת ערב", "מנקה את הבית", "עושה קניות"], 0, "כתוב 'water the plants and pick the ripe tomatoes'."),
        q("How much can he keep?", "כמה הוא יכול לשמור?", ["Half of the tomatoes", "All of them", "Nothing", "One"], ["חצי מהעגבניות", "את כולן", "כלום", "אחת"], 0, "כתוב 'keep half of them'."),
      ],
    ),
    R(
      "The Photo Contest (תחרות הצילום)",
      "Our school had a photo contest called \"My City\". I took pictures of the old market early in the morning, when the streets were empty and golden. The teachers said my photo was the most original one. I got a small camera and a certificate.",
      "בית הספר שלנו ערך תחרות צילום בשם \"העיר שלי\". צילמתי את השוק הישן מוקדם בבוקר, כשהרחובות היו ריקים וזהובים. המורים אמרו שהתמונה שלי היא המקורית ביותר. קיבלתי מצלמה קטנה ותעודה.",
      [
        g("contest", "noun", "תחרות", "Our school ran a photo contest.", "תחרות"),
        g("original", "adjective", "שונה ולא מועתק", "My photo was the most original.", "מקורי"),
        g("certificate", "noun", "תעודה", "I won a certificate.", "תעודה"),
      ],
      [
        q("What did the writer photograph?", "מה הכותב צילם?", ["The old market early in the morning", "A beach", "A garden", "A school"], ["את השוק הישן מוקדם בבוקר", "חוף", "גינה", "בית ספר"], 0, "כתוב 'the old market early in the morning'."),
        q("What did the writer get?", "מה הכותב קיבל?", ["A small camera and a certificate", "Money", "A phone", "A trip"], ["מצלמה קטנה ותעודה", "כסף", "טלפון", "טיול"], 0, "כתוב 'a small camera and a certificate'."),
      ],
    ),
    R(
      "Saving Money (חוסכים כסף)",
      "I want to buy a new bicycle, so I started saving money three months ago. I keep half of my pocket money every week and I do small jobs for the neighbours. My piggy bank is almost full. In two more weeks I will have enough to go to the shop.",
      "אני רוצה לקנות אופניים חדשים, ולכן התחלתי לחסוך כסף לפני שלושה חודשים. אני שומר חצי מדמי הכיס שלי בכל שבוע ועושה עבודות קטנות לשכנים. קופת החיסכון שלי כמעט מלאה. בעוד שבועיים יהיה לי מספיק כדי ללכת לחנות.",
      [
        g("save", "verb", "לשמור כסף", "I started saving money.", "לחסוך"),
        g("pocket money", "noun", "כסף שמקבלים מההורים", "I keep half of my pocket money.", "דמי כיס"),
        g("enough", "adjective", "מספיק", "I will have enough money.", "מספיק"),
      ],
      [
        q("How long has the writer been saving?", "כמה זמן הכותב חוסך?", ["Three months", "One month", "A year", "Two weeks"], ["שלושה חודשים", "חודש", "שנה", "שבועיים"], 0, "כתוב 'three months ago'."),
        q("When will he have enough money?", "מתי יהיה לו מספיק כסף?", ["In two more weeks", "Tomorrow", "In a year", "Next month"], ["בעוד שבועיים", "מחר", "בעוד שנה", "בחודש הבא"], 0, "כתוב 'In two more weeks'."),
      ],
    ),
    R(
      "The Fire Drill (תרגיל כיבוי אש)",
      "Last Tuesday we had a fire drill at school. The bell rang loudly, and we walked in a line to the yard without talking. The teacher counted us to make sure nobody was missing. It took only four minutes, and the principal said we did very well.",
      "ביום שלישי שעבר היה לנו תרגיל כיבוי אש בבית הספר. הפעמון צלצל בקול רם, והלכנו בשורה אל החצר בלי לדבר. המורה ספרה אותנו כדי לוודא שאף אחד לא חסר. זה לקח רק ארבע דקות, והמנהלת אמרה שהצלחנו מאוד.",
      [
        g("drill", "noun", "תרגול למקרה חירום", "We had a fire drill.", "תרגיל"),
        g("principal", "noun", "מנהל בית הספר", "The principal said we did well.", "מנהלת"),
        g("count", "verb", "לומר מספרים", "The teacher counted us.", "לספור"),
      ],
      [
        q("How long did the drill take?", "כמה זמן התרגיל לקח?", ["Four minutes", "Ten minutes", "One hour", "One minute"], ["ארבע דקות", "עשר דקות", "שעה", "דקה"], 0, "כתוב 'only four minutes'."),
        q("Why did the teacher count the students?", "למה המורה ספרה את התלמידים?", ["To make sure nobody was missing", "To give a mark", "To start a game", "To take a photo"], ["כדי לוודא שאף אחד לא חסר", "כדי לתת ציון", "כדי להתחיל משחק", "כדי לצלם"], 0, "כתוב 'to make sure nobody was missing'."),
      ],
    ),
    R(
      "Alone on the Bus (לבד באוטובוס)",
      "Last month I took the bus to my grandmother's house alone for the first time. My mother wrote the stop on a piece of paper and made me call her twice. I sat near the driver and watched every street carefully. When I got off, my grandmother was waiting with a big hug.",
      "בחודש שעבר נסעתי באוטובוס לבית של סבתא שלי לבד בפעם הראשונה. אמא שלי כתבה את התחנה על פיסת נייר וגרמה לי להתקשר אליה פעמיים. ישבתי ליד הנהג והסתכלתי על כל רחוב בזהירות. כשירדתי, סבתא שלי חיכתה עם חיבוק גדול.",
      [
        g("alone", "adverb", "בלי אף אחד", "I took the bus alone.", "לבד"),
        g("carefully", "adverb", "בזהירות", "I watched every street carefully.", "בזהירות"),
        g("stop", "noun", "מקום שהאוטובוס עוצר בו", "My mother wrote the stop.", "תחנה"),
      ],
      [
        q("Where did the writer sit?", "איפה הכותב ישב?", ["Near the driver", "At the back", "Near the door", "Standing"], ["ליד הנהג", "מאחור", "ליד הדלת", "עמד"], 0, "כתוב 'near the driver'."),
        q("Who was waiting when he got off?", "מי חיכתה כשהוא ירד?", ["His grandmother", "His mother", "His aunt", "His friend"], ["סבתו", "אמו", "דודתו", "חברו"], 0, "כתוב 'my grandmother was waiting'."),
      ],
    ),
  ],
};

// --- LISTENING -------------------------------------------------------------
export const MORE_LISTENINGS15 = {
  A2: [
    L(
      "Hello, this is the swimming pool. Your son left his towel and goggles in the changing room yesterday. We are keeping them at the front desk until Friday. Please come and collect them when you can. The pool is open every day from seven in the morning until nine at night.",
      "שלום, זו הבריכה. הבן שלך השאיר אתמול את המגבת ואת המשקפיים שלו בחדר ההלבשה. אנחנו שומרים אותם בדלפק הקבלה עד יום שישי. בבקשה בואו לקחת אותם כשתוכלו. הבריכה פתוחה כל יום משבע בבוקר עד תשע בערב.",
      [
        q("What did the boy leave?", "מה הילד השאיר?", ["A towel and goggles", "A bag and a hat", "A phone", "A book"], ["מגבת ומשקפיים", "תיק וכובע", "טלפון", "ספר"], 0, "נאמר 'his towel and goggles'."),
        q("Until when will the pool keep them?", "עד מתי הבריכה תשמור אותם?", ["Until Friday", "Until Monday", "Until tomorrow", "For a month"], ["עד יום שישי", "עד יום שני", "עד מחר", "לחודש"], 0, "נאמר 'until Friday'."),
      ],
    ),
    L(
      "Good morning, everyone. This is your captain speaking. We are flying at ten thousand metres, and the weather is clear all the way to Paris. The flight will take about four hours. If you need anything, please press the button above your seat. Thank you for flying with us.",
      "בוקר טוב לכולם. כאן הקברניט. אנחנו טסים בגובה עשרת אלפים מטר, ומזג האוויר בהיר כל הדרך לפריז. הטיסה תימשך כארבע שעות. אם אתם צריכים משהו, בבקשה לחצו על הכפתור שמעל המושב. תודה שטסתם איתנו.",
      [
        q("How long will the flight take?", "כמה זמן הטיסה תימשך?", ["About four hours", "About two hours", "About ten hours", "About one hour"], ["כארבע שעות", "כשעתיים", "כעשר שעות", "כשעה"], 0, "נאמר 'about four hours'."),
        q("What must passengers do if they need something?", "מה הנוסעים צריכים לעשות אם הם צריכים משהו?", ["Press the button above their seat", "Call the captain", "Stand up", "Go to the back"], ["ללחוץ על הכפתור שמעל המושב", "להתקשר לקברניט", "לקום", "ללכת לאחור"], 0, "נאמר 'press the button above your seat'."),
      ],
    ),
    L(
      "Hi, it is Maya. I am calling about Saturday. The weather is going to be bad, so we cannot have the barbecue in the park. My parents said we can have it at our house instead. Please tell the others. It still starts at twelve, and you can bring a salad if you want.",
      "היי, זאת מאיה. אני מתקשרת בקשר ליום שבת. מזג האוויר הולך להיות גרוע, ולכן אנחנו לא יכולים לעשות את המנגל בפארק. ההורים שלי אמרו שאפשר לעשות אותו אצלנו בבית במקום. בבקשה תגידו לאחרים. זה עדיין מתחיל בשתים עשרה, ואפשר להביא סלט אם רוצים.",
      [
        q("Why is the barbecue not in the park?", "למה המנגל לא בפארק?", ["The weather is going to be bad", "The park is closed", "It is too far", "Nobody can come"], ["מזג האוויר הולך להיות גרוע", "הפארק סגור", "זה רחוק מדי", "אף אחד לא יכול לבוא"], 0, "נאמר 'The weather is going to be bad'."),
        q("Where will it be?", "איפה זה יהיה?", ["At Maya's house", "At the beach", "At school", "At a restaurant"], ["בבית של מאיה", "בים", "בבית הספר", "במסעדה"], 0, "נאמר 'at our house instead'."),
      ],
    ),
    L(
      "Welcome to the water park. Please read the rules before you go in. Children under ten must have an adult with them. Do not run near the pools. Wear your wristband at all times, and keep your things in a locker. The big slide closes at five o'clock today.",
      "ברוכים הבאים לפארק המים. בבקשה קראו את הכללים לפני שאתם נכנסים. ילדים מתחת לגיל עשר חייבים להיות עם מבוגר. אל תרוצו ליד הבריכות. ענדו את צמיד היד כל הזמן, ושמרו את הדברים שלכם בלוקר. המגלשה הגדולה נסגרת היום בחמש.",
      [
        q("Who must have an adult with them?", "מי חייב להיות עם מבוגר?", ["Children under ten", "Everyone", "Children over twelve", "Teachers"], ["ילדים מתחת לגיל עשר", "כולם", "ילדים מעל גיל שתים עשרה", "מורים"], 0, "נאמר 'Children under ten'."),
        q("When does the big slide close today?", "מתי המגלשה הגדולה נסגרת היום?", ["At five o'clock", "At noon", "At nine", "At two"], ["בחמש", "בצהריים", "בתשע", "בשתיים"], 0, "נאמר 'closes at five o'clock today'."),
      ],
    ),
    L(
      "Hello, team. Tomorrow's basketball practice is moved from the school hall to the sports center because of the exams. We start at six, not five. Please bring your own water and a clean shirt. If you cannot come, call me by tonight. See you there!",
      "שלום, קבוצה. האימון של מחר בכדורסל עובר מאולם בית הספר למרכז הספורט בגלל המבחנים. אנחנו מתחילים בשש, לא בחמש. בבקשה הביאו מים משלכם וחולצה נקייה. אם אתם לא יכולים לבוא, התקשרו אליי עד הערב. נתראה שם!",
      [
        q("Where is the practice tomorrow?", "איפה האימון מחר?", ["At the sports center", "At the school hall", "At the park", "At the pool"], ["במרכז הספורט", "באולם בית הספר", "בפארק", "בבריכה"], 0, "נאמר 'to the sports center'."),
        q("What time does it start?", "באיזו שעה זה מתחיל?", ["At six", "At five", "At seven", "At four"], ["בשש", "בחמש", "בשבע", "בארבע"], 0, "נאמר 'We start at six'."),
      ],
    ),
    L(
      "Good evening. Tonight is the first night of Hanukkah. In our school hall we will light the candle together at half past five. After that there will be hot doughnuts and some music. Everyone is welcome, and it is free.",
      "ערב טוב. הלילה הוא ליל חנוכה הראשון. באולם בית הספר שלנו נדליק את הנר ביחד בחמש וחצי. אחרי זה יהיו סופגניות חמות וקצת מוזיקה. כולם מוזמנים, וזה בחינם.",
      [
        q("What time will they light the candle?", "באיזו שעה ידליקו את הנר?", ["At half past five", "At six", "At seven", "At four"], ["בחמש וחצי", "בשש", "בשבע", "בארבע"], 0, "נאמר 'at half past five'."),
        q("What will there be after that?", "מה יהיה אחרי זה?", ["Doughnuts and music", "A film", "A big dinner", "A party with games"], ["סופגניות ומוזיקה", "סרט", "ארוחה גדולה", "מסיבה עם משחקים"], 0, "נאמר 'hot doughnuts and some music'."),
      ],
    ),
    L(
      "Hi, it is Dad. I am on the highway, and the cars are not moving because of an accident. I will be at least an hour late. Please start dinner without me. There is rice in the fridge, and you can make a salad. Mom is working until eight, so you have to look after your sister.",
      "היי, זה אבא. אני בכביש המהיר, והמכוניות לא זזות בגלל תאונה. אאחר לפחות בשעה. בבקשה התחילו ארוחת ערב בלעדיי. יש אורז במקרר, ואפשר להכין סלט. אמא עובדת עד שמונה, אז אתה צריך לשמור על אחותך.",
      [
        q("Why is Dad late?", "למה אבא מאחר?", ["There is an accident", "His car broke", "He is working late", "He forgot"], ["יש תאונה", "המכונית שלו התקלקלה", "הוא עובד עד מאוחר", "הוא שכח"], 0, "נאמר 'an accident on the highway'."),
        q("What must the son do?", "מה הבן צריך לעשות?", ["Look after his sister", "Go to bed", "Call Mom", "Go shopping"], ["לשמור על אחותו", "ללכת לישון", "להתקשר לאמא", "לעשות קניות"], 0, "נאמר 'look after your sister'."),
      ],
    ),
    L(
      "Welcome to the tour of the old city. First we will walk down this street to the market. Please stay together and do not stop to take photos in the middle of the road. After the market we will visit two small museums. The tour finishes at one o'clock.",
      "ברוכים הבאים לסיור בעיר העתיקה. קודם נלך ברחוב הזה אל השוק. בבקשה הישארו ביחד ואל תעצרו לצלם באמצע הדרך. אחרי השוק נבקר בשני מוזיאונים קטנים. הסיור מסתיים באחת.",
      [
        q("Where will they go first?", "לאן הם ילכו קודם?", ["To the market", "To a museum", "To a park", "To a restaurant"], ["לשוק", "למוזיאון", "לפארק", "למסעדה"], 0, "נאמר 'to the market'."),
        q("How many museums will they visit?", "כמה מוזיאונים הם יבקרו?", ["Two", "One", "Three", "Five"], ["שניים", "אחד", "שלושה", "חמישה"], 0, "נאמר 'two small museums'."),
      ],
    ),
    L(
      "This is a message for passengers on bus number twelve. Because of road works, the bus will not stop at the hospital today. You can get off at the park and walk for five minutes. The bus will also be about ten minutes late. We are sorry for the problem.",
      "זו הודעה לנוסעי אוטובוס מספר שתים עשרה. בגלל עבודות בכביש, האוטובוס לא יעצור היום ליד בית החולים. אפשר לרדת ליד הפארק וללכת חמש דקות. האוטובוס גם יאחר בערך בעשר דקות. אנחנו מצטערים על הבעיה.",
      [
        q("Why will the bus not stop at the hospital?", "למה האוטובוס לא יעצור ליד בית החולים?", ["There are road works", "It is broken", "It is full", "The driver is sick"], ["יש עבודות בכביש", "הוא שבור", "הוא מלא", "הנהג חולה"], 0, "נאמר 'Because of road works'."),
        q("How long is the bus going to be late?", "בכמה זמן האוטובוס יאחר?", ["About ten minutes", "About one hour", "About five minutes", "All day"], ["בערך עשר דקות", "בערך שעה", "בערך חמש דקות", "כל היום"], 0, "נאמר 'about ten minutes late'."),
      ],
    ),
    L(
      "Hello, welcome to the cooking class. Today we are going to make vegetable soup. First, wash and cut the carrots, the onions and the potatoes. Then put them in a pot with water and a little salt. Let the soup cook for thirty minutes. At the end you can add some pepper.",
      "שלום, ברוכים הבאים לשיעור הבישול. היום אנחנו הולכים להכין מרק ירקות. קודם שטפו וחתכו את הגזר, הבצל ותפוחי האדמה. אחר כך שימו אותם בסיר עם מים וקצת מלח. תנו למרק להתבשל שלושים דקות. בסוף אפשר להוסיף קצת פלפל.",
      [
        q("What are they making?", "מה הם מכינים?", ["Vegetable soup", "A salad", "A cake", "Pizza"], ["מרק ירקות", "סלט", "עוגה", "פיצה"], 0, "נאמר 'vegetable soup'."),
        q("How long must the soup cook?", "כמה זמן המרק צריך להתבשל?", ["Thirty minutes", "Ten minutes", "One hour", "Five minutes"], ["שלושים דקות", "עשר דקות", "שעה", "חמש דקות"], 0, "נאמר 'thirty minutes'."),
      ],
    ),
    L(
      "Hi, this is the doctor's office. I am calling to remind you about your appointment tomorrow at ten fifteen. Please bring your health card and arrive five minutes early. If you cannot come, call us today so that we can give your time to someone else. Thank you.",
      "היי, זה משרד הרופא. אני מתקשרת להזכיר לכם את התור שלכם מחר בעשר ורבע. בבקשה הביאו את כרטיס הבריאות והגיעו חמש דקות מוקדם. אם אתם לא יכולים לבוא, התקשרו אלינו היום כדי שנוכל לתת את הזמן שלכם למישהו אחר. תודה.",
      [
        q("When is the appointment?", "מתי התור?", ["Tomorrow at ten fifteen", "Today at ten", "Tomorrow at nine", "Friday at ten"], ["מחר בעשר ורבע", "היום בעשר", "מחר בתשע", "ביום שישי בעשר"], 0, "נאמר 'tomorrow at ten fifteen'."),
        q("What must the patient bring?", "מה המטופל צריך להביא?", ["His health card", "His phone", "A friend", "Money"], ["את כרטיס הבריאות שלו", "את הטלפון שלו", "חבר", "כסף"], 0, "נאמר 'your health card'."),
      ],
    ),
    L(
      "I am calling about the lost wallet. It is brown, and it has a student card and some money inside. I think I lost it on the number nine bus yesterday afternoon. Could you please check if someone handed it in? Please call me if you find it. Thank you very much.",
      "אני מתקשר בקשר לארנק שאבד. הוא חום, ובתוכו כרטיס סטודנט וקצת כסף. אני חושב שאיבדתי אותו באוטובוס מספר תשע אתמול אחר הצהריים. אפשר בבקשה לבדוק אם מישהו מסר אותו? אם תמצאו אותו, בבקשה התקשרו אליי. תודה רבה.",
      [
        q("What color is the wallet?", "באיזה צבע הארנק?", ["Brown", "Black", "Red", "Blue"], ["חום", "שחור", "אדום", "כחול"], 0, "נאמר 'It is brown'."),
        q("Where did he lose it?", "איפה הוא איבד אותו?", ["On bus number nine", "In a shop", "At school", "In the park"], ["באוטובוס מספר תשע", "בחנות", "בבית הספר", "בפארק"], 0, "נאמר 'on the number nine bus'."),
      ],
    ),
    L(
      "This is your radio weather report. Today will be hot and sunny in the south and the center, with temperatures up to thirty-five degrees. In the north it will be cooler, and there may be a few clouds in the afternoon. Remember to drink plenty of water and wear a hat. Tomorrow will be the same.",
      "זה דוח מזג האוויר שלכם ברדיו. היום יהיה חם ושמשי בדרום ובמרכז, עם טמפרטורות של עד שלושים וחמש מעלות. בצפון יהיה קריר יותר, ואולי יהיו כמה עננים אחר הצהריים. זכרו לשתות הרבה מים ולחבוש כובע. מחר יהיה אותו דבר.",
      [
        q("How is the weather in the north?", "איך מזג האוויר בצפון?", ["Cooler, with a few clouds", "Rainy", "Very hot", "Snowy"], ["קריר יותר, עם כמה עננים", "גשום", "חם מאוד", "מושלג"], 0, "נאמר 'cooler' ו-'a few clouds'."),
        q("What must people remember?", "מה אנשים צריכים לזכור?", ["To drink water and wear a hat", "To take an umbrella", "To wear a coat", "To stay at home"], ["לשתות מים ולחבוש כובע", "לקחת מטרייה", "ללבוש מעיל", "להישאר בבית"], 0, "נאמר 'drink plenty of water and wear a hat'."),
      ],
    ),
    L(
      "Hi, it is Noam. I am sorry I could not come to the party last night. I had a bad headache and I went to bed at eight. My mother says it was because I did not drink enough water. I feel much better today. Can we meet at the cafe on Sunday and have a chat?",
      "היי, זה נועם. אני מצטער שלא יכולתי לבוא למסיבה אתמול בלילה. היה לי כאב ראש חזק והלכתי לישון בשמונה. אמא שלי אומרת שזה היה בגלל שלא שתיתי מספיק מים. אני מרגיש הרבה יותר טוב היום. אפשר להיפגש בבית הקפה ביום ראשון ולשוחח?",
      [
        q("Why did Noam not go to the party?", "למה נועם לא הלך למסיבה?", ["He had a headache", "He was busy", "He forgot", "He was angry"], ["היה לו כאב ראש", "הוא היה עסוק", "הוא שכח", "הוא כעס"], 0, "נאמר 'a bad headache'."),
        q("What does he suggest?", "מה הוא מציע?", ["To meet at the cafe on Sunday", "To go to the cinema", "To play football", "To call tomorrow"], ["להיפגש בבית הקפה ביום ראשון", "ללכת לקולנוע", "לשחק כדורגל", "להתקשר מחר"], 0, "נאמר 'meet at the cafe on Sunday'."),
      ],
    ),
    L(
      "Welcome to the national park. The path to the river is about two kilometres long and takes forty minutes. Please stay on the path and do not pick the flowers. There is a picnic area near the entrance, and the toilets are next to the car park. Have a lovely day.",
      "ברוכים הבאים לפארק הלאומי. השביל לנהר באורך של כשני קילומטרים והוא לוקח ארבעים דקות. בבקשה הישארו על השביל ואל תקטפו פרחים. יש אזור פיקניק ליד הכניסה, והשירותים ליד החניה. שיהיה לכם יום נעים.",
      [
        q("How long does the walk to the river take?", "כמה זמן ההליכה לנהר לוקחת?", ["Forty minutes", "Ten minutes", "Two hours", "Five minutes"], ["ארבעים דקות", "עשר דקות", "שעתיים", "חמש דקות"], 0, "נאמר 'takes forty minutes'."),
        q("Where is the picnic area?", "איפה אזור הפיקניק?", ["Near the entrance", "Near the river", "Next to the toilets", "In the forest"], ["ליד הכניסה", "ליד הנהר", "ליד השירותים", "ביער"], 0, "נאמר 'near the entrance'."),
      ],
    ),
    L(
      "Good afternoon, students. I have some news about next week's trip. We are going to leave at seven o'clock from the school gate, so please do not be late. Bring a packed lunch, a bottle of water and a hat. Wear comfortable shoes because we will walk a lot. The bus will bring us back at four.",
      "אחר צהריים טובים, תלמידים. יש לי חדשות על הטיול של השבוע הבא. אנחנו יוצאים בשבע משער בית הספר, אז בבקשה אל תאחרו. הביאו ארוחת צהריים מהבית, בקבוק מים וכובע. נעלו נעליים נוחות כי נלך הרבה. האוטובוס יחזיר אותנו בארבע.",
      [
        q("What time does the bus leave?", "באיזו שעה האוטובוס יוצא?", ["At seven o'clock", "At eight", "At nine", "At six"], ["בשבע", "בשמונה", "בתשע", "בשש"], 0, "נאמר 'at seven o'clock'."),
        q("Why must students wear comfortable shoes?", "למה התלמידים צריכים לנעול נעליים נוחות?", ["They will walk a lot", "It is raining", "It is cold", "It is a rule"], ["הם ילכו הרבה", "יורד גשם", "קר", "זה כלל"], 0, "נאמר 'we will walk a lot'."),
      ],
    ),
    L(
      "Hello, welcome to the new library. You can borrow up to five books for three weeks. If you want to keep a book longer, you can ask for more time online. The children's section is on the first floor, and the quiet study room is on the second floor. Please remember to turn off your phone.",
      "שלום, ברוכים הבאים לספרייה החדשה. אפשר לשאול עד חמישה ספרים לשלושה שבועות. אם רוצים לשמור ספר יותר זמן, אפשר לבקש עוד זמן באינטרנט. מדור הילדים בקומה הראשונה, וחדר הלימוד השקט בקומה השנייה. בבקשה זכרו לכבות את הטלפון.",
      [
        q("How many books can you borrow?", "כמה ספרים אפשר לשאול?", ["Up to five", "Up to ten", "Up to two", "Only one"], ["עד חמישה", "עד עשרה", "עד שניים", "רק אחד"], 0, "נאמר 'up to five books'."),
        q("Where is the study room?", "איפה חדר הלימוד?", ["On the second floor", "On the first floor", "In the basement", "Outside"], ["בקומה השנייה", "בקומה הראשונה", "במרתף", "בחוץ"], 0, "נאמר 'on the second floor'."),
      ],
    ),
    L(
      "I want to tell you about my grandmother's house. It is old, but it is warm and comfortable. There is a big kitchen with a wooden table, and a small garden with lemon trees. In summer we sleep on the balcony because it is too hot inside. I think it is the best place in the world.",
      "אני רוצה לספר לכם על הבית של סבתא שלי. הוא ישן, אבל חם ונוח. יש מטבח גדול עם שולחן מעץ, וגינה קטנה עם עצי לימון. בקיץ אנחנו ישנים במרפסת כי חם מדי בפנים. אני חושבת שזה המקום הכי טוב בעולם.",
      [
        q("What is in the garden?", "מה יש בגינה?", ["Lemon trees", "Apple trees", "Flowers only", "A pool"], ["עצי לימון", "עצי תפוח", "רק פרחים", "בריכה"], 0, "נאמר 'lemon trees'."),
        q("Where do they sleep in summer?", "איפה הם ישנים בקיץ?", ["On the balcony", "In the garden", "In the kitchen", "On the roof"], ["במרפסת", "בגינה", "במטבח", "על הגג"], 0, "נאמר 'on the balcony'."),
      ],
    ),
    L(
      "Hello, this is a message from the school office. Tomorrow is the photo day, and every student should wear the school uniform. If your child does not have a clean shirt, please call us today. The photographer will arrive at eight and will take the class photos before the first lesson.",
      "שלום, זו הודעה ממשרד בית הספר. מחר הוא יום הצילום, וכל תלמיד צריך ללבוש את מדי בית הספר. אם לילד שלכם אין חולצה נקייה, בבקשה התקשרו אלינו היום. הצלם יגיע בשמונה ויצלם את תמונות הכיתות לפני השיעור הראשון.",
      [
        q("What must students wear tomorrow?", "מה התלמידים צריכים ללבוש מחר?", ["The school uniform", "Sports clothes", "A white shirt", "Anything they like"], ["את מדי בית הספר", "בגדי ספורט", "חולצה לבנה", "מה שהם רוצים"], 0, "נאמר 'the school uniform'."),
        q("When will the photographer arrive?", "מתי הצלם יגיע?", ["At eight", "At nine", "At seven", "At ten"], ["בשמונה", "בתשע", "בשבע", "בעשר"], 0, "נאמר 'arrive at eight'."),
      ],
    ),
    L(
      "Hi, it is me. I am at the mall and I saw a jacket that you would love. It is blue, it is on sale and it is only ten dollars. They have it in your size. I can buy it for you if you want. Call me back in the next ten minutes, because I have to leave soon.",
      "היי, זאת אני. אני בקניון וראיתי מעיל שהיית אוהבת. הוא כחול, הוא במבצע והוא עולה רק עשרה דולרים. יש להם אותו במידה שלך. אני יכולה לקנות אותו בשבילך אם את רוצה. התקשרי אליי בחזרה בעשר הדקות הקרובות, כי אני צריכה לצאת בקרוב.",
      [
        q("What did the speaker see?", "מה הדוברת ראתה?", ["A blue jacket on sale", "A pair of shoes", "A red dress", "A bag"], ["מעיל כחול במבצע", "זוג נעליים", "שמלה אדומה", "תיק"], 0, "נאמר 'a jacket' 'It is blue, it is on sale'."),
        q("How much is it?", "כמה זה עולה?", ["Ten dollars", "Five dollars", "Twelve dollars", "Two dollars"], ["עשרה דולרים", "חמישה דולרים", "שנים עשר דולר", "שני דולרים"], 0, "נאמר 'only ten dollars'."),
      ],
    ),
    L(
      "Attention, all passengers. The train to the airport is now arriving at platform three. Please let people get off first. Keep your bags with you and do not leave anything on the seats. The next train to the airport leaves in twenty minutes. Thank you for travelling with us.",
      "תשומת לב, כל הנוסעים. הרכבת לשדה התעופה מגיעה כעת לרציף שלוש. בבקשה תנו לאנשים לרדת קודם. שמרו את התיקים אצלכם ואל תשאירו דבר על המושבים. הרכבת הבאה לשדה התעופה יוצאת בעוד עשרים דקות. תודה שנסעתם איתנו.",
      [
        q("Which platform is the train arriving at?", "לאיזה רציף הרכבת מגיעה?", ["Platform three", "Platform one", "Platform two", "Platform five"], ["רציף שלוש", "רציף אחד", "רציף שניים", "רציף חמש"], 0, "נאמר 'platform three'."),
        q("When does the next train leave?", "מתי הרכבת הבאה יוצאת?", ["In twenty minutes", "In ten minutes", "In an hour", "Tomorrow"], ["בעוד עשרים דקות", "בעוד עשר דקות", "בעוד שעה", "מחר"], 0, "נאמר 'in twenty minutes'."),
      ],
    ),
    L(
      "Good evening, ladies and gentlemen. Welcome to the school concert. Our students will sing four songs, and then the older students will play the piano and the guitar. Please turn off your phones and enjoy the music. After the concert there will be tea, coffee and cake in the hall.",
      "ערב טוב, גבירותיי ורבותיי. ברוכים הבאים לקונצרט בית הספר. התלמידים שלנו ישירו ארבעה שירים, ואחר כך התלמידים הגדולים ינגנו בפסנתר ובגיטרה. בבקשה כבו את הטלפונים ותיהנו מהמוזיקה. אחרי הקונצרט יהיו תה, קפה ועוגה באולם.",
      [
        q("How many songs will the students sing?", "כמה שירים התלמידים ישירו?", ["Four", "Two", "Six", "Three"], ["ארבעה", "שניים", "שישה", "שלושה"], 0, "נאמר 'four songs'."),
        q("What will there be after the concert?", "מה יהיה אחרי הקונצרט?", ["Tea, coffee and cake", "A film", "A speech", "Nothing"], ["תה, קפה ועוגה", "סרט", "נאום", "כלום"], 0, "נאמר 'tea, coffee and cake'."),
      ],
    ),
    L(
      "Hello, this is the garage. Your car is ready. We changed the oil and fixed the brakes. You can take it any time before six o'clock tonight. Please remember to bring the receipt from last time, because then it will be cheaper.",
      "שלום, זה המוסך. המכונית שלך מוכנה. החלפנו שמן ותיקנו את הבלמים. אפשר לקחת אותה בכל שעה לפני שש הערב. בבקשה זכרו להביא את הקבלה מהפעם הקודמת, כי אז זה יהיה זול יותר.",
      [
        q("What did the garage fix?", "מה המוסך תיקן?", ["The brakes", "The lights", "The engine", "The windows"], ["את הבלמים", "את האורות", "את המנוע", "את החלונות"], 0, "נאמר 'fixed the brakes'."),
        q("How can it be cheaper?", "איך זה יכול להיות זול יותר?", ["By bringing the old receipt", "By paying cash", "By coming early", "By calling first"], ["על ידי הבאת הקבלה הישנה", "על ידי תשלום במזומן", "על ידי הגעה מוקדמת", "על ידי התקשרות קודם"], 0, "נאמר 'bring the receipt from last time'."),
      ],
    ),
    L(
      "Hi, it is the dentist's office. I am calling to change your appointment. The dentist is ill, so we can't see you tomorrow. We can see you on Thursday at four instead. If that is not good for you, we also have time next Monday at nine. Please call us back before the end of the day.",
      "היי, זה משרד רופא השיניים. אני מתקשרת כדי לשנות את התור שלכם. רופא השיניים חולה, ולכן אי אפשר לראות אתכם מחר. אפשר לראות אתכם ביום חמישי בארבע במקום. אם זה לא מתאים לכם, יש לנו גם זמן ביום שני הבא בתשע. בבקשה התקשרו אלינו חזרה עד סוף היום.",
      [
        q("Why is the appointment changed?", "למה התור שונה?", ["The dentist is ill", "The office is closed", "The patient called", "There is a holiday"], ["רופא השיניים חולה", "המשרד סגור", "המטופל התקשר", "יש חג"], 0, "נאמר 'The dentist is ill'."),
        q("What is the first time they offer?", "מהו הזמן הראשון שמציעים?", ["Thursday at four", "Monday at nine", "Friday at ten", "Tomorrow at four"], ["יום חמישי בארבע", "יום שני בתשע", "יום שישי בעשר", "מחר בארבע"], 0, "נאמר 'Thursday at four'."),
      ],
    ),
    L(
      "Welcome to the museum of science. The exhibition about space is on the second floor, and the dinosaurs are on the ground floor. You can touch everything in the children's room. Please do not touch anything in the other rooms. The museum closes at five, but the shop stays open until six.",
      "ברוכים הבאים למוזיאון המדע. התערוכה על החלל בקומה השנייה, והדינוזאורים בקומת הקרקע. אפשר לגעת בהכול בחדר הילדים. בבקשה אל תיגעו בשום דבר בחדרים האחרים. המוזיאון נסגר בחמש, אבל החנות נשארת פתוחה עד שש.",
      [
        q("Where is the space exhibition?", "איפה התערוכה על החלל?", ["On the second floor", "On the ground floor", "In the shop", "Outside"], ["בקומה השנייה", "בקומת הקרקע", "בחנות", "בחוץ"], 0, "נאמר 'on the second floor'."),
        q("Where can you touch everything?", "איפה אפשר לגעת בהכול?", ["In the children's room", "In all the rooms", "In the shop", "In the dinosaur room"], ["בחדר הילדים", "בכל החדרים", "בחנות", "בחדר הדינוזאורים"], 0, "נאמר 'in the children's room'."),
      ],
    ),
    L(
      "This is a message for everyone in class nine. The history work is for next Wednesday, not Friday. Please give it to me on paper and send a copy by email as well. Late work will lose points for each day. If you have a problem, speak to me before that day.",
      "זו הודעה לכולם בכיתה ט'. עבודת ההיסטוריה היא ליום רביעי הבא, לא ליום שישי. בבקשה תנו אותה לי על נייר ושלחו גם עותק במייל. עבודות מאוחרות יאבדו נקודות על כל יום. אם יש לכם בעיה, דברו איתי לפני אותו יום.",
      [
        q("When is the work for?", "ליום מתי העבודה?", ["Next Wednesday", "Next Friday", "Tomorrow", "Next Monday"], ["ביום רביעי הבא", "ביום שישי הבא", "מחר", "ביום שני הבא"], 0, "נאמר 'for next Wednesday'."),
        q("What happens to late work?", "מה קורה לעבודות מאוחרות?", ["It loses points each day", "It is not read", "Nothing", "It gets an extra day"], ["היא מאבדת נקודות על כל יום", "היא לא נקראת", "כלום", "היא מקבלת יום נוסף"], 0, "נאמר 'lose points for each day'."),
      ],
    ),
    L(
      "Hi, this is the sports shop. The shoes you ordered have arrived. They are the white ones in size ten. You can come to take them from Sunday to Thursday between nine and six. You have two weeks to change them if they do not fit.",
      "היי, זו חנות הספורט. הנעליים שהזמנת הגיעו. אלה הלבנות במידה עשר. אפשר לבוא לקחת אותן מיום ראשון עד חמישי בין תשע לשש. יש לך שבועיים להחליף אותן אם הן לא מתאימות.",
      [
        q("What size are the shoes?", "באיזו מידה הנעליים?", ["Ten", "Nine", "Eleven", "Twelve"], ["עשר", "תשע", "אחת עשרה", "שתים עשרה"], 0, "נאמר 'size ten'."),
        q("How long does the customer have to change them?", "כמה זמן יש ללקוח להחליף אותן?", ["Two weeks", "One week", "One month", "Three days"], ["שבועיים", "שבוע", "חודש", "שלושה ימים"], 0, "נאמר 'two weeks'."),
      ],
    ),
    L(
      "Good morning, and welcome to the airport. The check-in desks for the flight to Paris are numbers one to five. Please have your passport and your ticket ready. Each person can take one small bag on the plane and one big suitcase. The gate closes one hour before the plane leaves.",
      "בוקר טוב, וברוכים הבאים לשדה התעופה. דלפקי הצ'ק-אין לטיסה לפריז הם מספר אחד עד חמש. בבקשה הכינו את הדרכון והכרטיס. כל אדם יכול לקחת תיק קטן אחד למטוס ומזוודה גדולה אחת. השער נסגר שעה לפני שהמטוס ממריא.",
      [
        q("Which desks are for the flight to Paris?", "אילו דלפקים הם לטיסה לפריז?", ["One to five", "Six to ten", "Eight to twelve", "Five to ten"], ["אחד עד חמש", "שש עד עשר", "שמונה עד שתים עשרה", "חמש עד עשר"], 0, "נאמר 'numbers one to five'."),
        q("When does the gate close?", "מתי השער נסגר?", ["One hour before the plane leaves", "When the plane leaves", "Two hours before", "Ten minutes before"], ["שעה לפני שהמטוס ממריא", "כשהמטוס ממריא", "שעתיים לפני", "עשר דקות לפני"], 0, "נאמר 'one hour before the plane leaves'."),
      ],
    ),
    L(
      "Hi, it is Mom. I forgot to tell you this morning that I will be late. There is a meeting at work, and I will be home at about seven. Please put the potatoes in the oven at six, and turn the oven off when the potatoes are ready. The chicken is already cooked. Do not forget to do your homework before you eat.",
      "היי, זאת אמא. שכחתי להגיד לך הבוקר שאאחר. יש ישיבה בעבודה, ואהיה בבית בערך בשבע. בבקשה שים את תפוחי האדמה בתנור בשש, וכבה את התנור כשתפוחי האדמה מוכנים. העוף כבר מבושל. אל תשכח לעשות שיעורי בית לפני שאתה אוכל.",
      [
        q("When will Mom be home?", "מתי אמא תהיה בבית?", ["At about seven", "At six", "At eight", "At five"], ["בערך בשבע", "בשש", "בשמונה", "בחמש"], 0, "נאמר 'at about seven'."),
        q("What must the child put in the oven?", "מה הילד צריך לשים בתנור?", ["The potatoes", "The chicken", "The bread", "The cake"], ["את תפוחי האדמה", "את העוף", "את הלחם", "את העוגה"], 0, "נאמר 'put the potatoes in the oven'."),
      ],
    ),
    L(
      "Hello, passengers on the ferry to the island. Please make sure that your bags are not blocking the doors. Life jackets are under every seat, and one of our team will show you how to use them. The trip takes about forty-five minutes. The weather is calm, so you can go outside and enjoy the view.",
      "שלום, נוסעי המעבורת לאי. בבקשה ודאו שהתיקים שלכם לא חוסמים את הדלתות. אפודי הצלה נמצאים מתחת לכל מושב, ואחד מאנשי הצוות יראה לכם איך להשתמש בהם. הנסיעה לוקחת כארבעים וחמש דקות. מזג האוויר רגוע, ולכן אפשר לצאת החוצה וליהנות מהנוף.",
      [
        q("Where are the life jackets?", "איפה אפודי ההצלה?", ["Under every seat", "In the kitchen", "At the door", "On the roof"], ["מתחת לכל מושב", "במטבח", "ליד הדלת", "על הגג"], 0, "נאמר 'under every seat'."),
        q("How long does the trip take?", "כמה זמן הנסיעה לוקחת?", ["About forty-five minutes", "About two hours", "About ten minutes", "About one hour"], ["כארבעים וחמש דקות", "כשעתיים", "כעשר דקות", "כשעה"], 0, "נאמר 'forty-five minutes'."),
      ],
    ),
    L(
      "Hi, this is the pharmacy. Your medicine is ready. Please take one pill in the morning and one pill in the evening, after you eat. Do not take more than two in one day. If you still feel ill after three days, you should see a doctor again. We are open until eight tonight.",
      "היי, זה בית המרקחת. התרופה שלכם מוכנה. בבקשה קחו כדור אחד בבוקר ואחד בערב, אחרי שאתם אוכלים. אל תקחו יותר משני כדורים ביום אחד. אם אתם עדיין מרגישים רע אחרי שלושה ימים, כדאי לראות רופא שוב. אנחנו פתוחים עד שמונה הערב.",
      [
        q("How many pills can you take in one day?", "כמה כדורים אפשר לקחת ביום אחד?", ["Two", "Four", "One", "Three"], ["שניים", "ארבעה", "אחד", "שלושה"], 0, "נאמר 'Do not take more than two in one day'."),
        q("What should you do after three days if you feel ill?", "מה כדאי לעשות אחרי שלושה ימים אם אתם מרגישים רע?", ["See a doctor again", "Take more medicine", "Wait a week", "Go to school"], ["לראות רופא שוב", "לקחת עוד תרופה", "לחכות שבוע", "ללכת לבית הספר"], 0, "נאמר 'see a doctor again'."),
      ],
    ),
    L(
      "Welcome to the gym. Before you use the machines, please fill in this form and sign it. The lockers cost one shekel, and you get the coin back when you finish. Please clean the machines after you use them, and put the weights back. The swimming pool is open for members only.",
      "ברוכים הבאים לחדר הכושר. לפני שאתם משתמשים במכשירים, בבקשה מלאו את הטופס הזה וחתמו עליו. הלוקרים עולים שקל אחד, ומקבלים את המטבע בחזרה כשמסיימים. בבקשה נגבו את המכשירים אחרי השימוש, והחזירו את המשקולות. הבריכה פתוחה לחברים בלבד.",
      [
        q("What must new members do first?", "מה חברים חדשים צריכים לעשות קודם?", ["Fill in and sign a form", "Pay money", "Take a test", "Meet a teacher"], ["למלא ולחתום על טופס", "לשלם כסף", "לעשות מבחן", "לפגוש מורה"], 0, "נאמר 'fill in this form and sign it'."),
        q("Who can use the pool?", "מי יכול להשתמש בבריכה?", ["Members only", "Everyone", "Children only", "Nobody"], ["חברים בלבד", "כולם", "ילדים בלבד", "אף אחד"], 0, "נאמר 'members only'."),
      ],
    ),
    L(
      "Hi, it is me. Do you remember the old bicycle I wanted to sell? A boy from my school wants to buy it for ten dollars. I think that is a good price, but I wanted to ask you first because you gave it to me. What do you think? Please call me back tonight.",
      "היי, זה אני. אתה זוכר את האופניים הישנים שרציתי למכור? ילד מבית הספר שלי רוצה לקנות אותם בעשרה דולרים. אני חושב שזה מחיר טוב, אבל רציתי לשאול אותך קודם כי אתה נתת לי אותם. מה אתה חושב? בבקשה התקשר אליי הערב.",
      [
        q("How much does the boy want to pay?", "כמה הילד רוצה לשלם?", ["Ten dollars", "Five dollars", "Twelve dollars", "Two dollars"], ["עשרה דולרים", "חמישה דולרים", "שנים עשר דולר", "שני דולרים"], 0, "נאמר 'ten dollars'."),
        q("Why does the speaker ask first?", "למה הדובר שואל קודם?", ["Because the other person gave him the bike", "Because it is expensive", "Because it is broken", "Because he needs money"], ["כי האדם שאליו מדברים נתן לו את האופניים", "כי זה יקר", "כי זה שבור", "כי הוא צריך כסף"], 0, "נאמר 'because you gave it to me'."),
      ],
    ),
    L(
      "Good afternoon. This is the supermarket. We will close in fifteen minutes, so please bring your things to the cashier. Today, bread is half price, and tomatoes are two shekels a kilo. We also have a new fish shop by the door. Thank you for shopping with us.",
      "אחר צהריים טובים. זה הסופרמרקט. אנחנו נסגרים בעוד חמש עשרה דקות, ולכן בבקשה הביאו את הדברים לקופאית. היום לחם בחצי מחיר, ועגבניות בשני שקלים לקילו. יש לנו גם חנות דגים חדשה ליד הדלת. תודה שקניתם אצלנו.",
      [
        q("When does the supermarket close?", "מתי הסופרמרקט נסגר?", ["In fifteen minutes", "In an hour", "At noon", "Tomorrow"], ["בעוד חמש עשרה דקות", "בעוד שעה", "בצהריים", "מחר"], 0, "נאמר 'in fifteen minutes'."),
        q("What is half price today?", "מה בחצי מחיר היום?", ["Bread", "Tomatoes", "Fish", "Milk"], ["לחם", "עגבניות", "דגים", "חלב"], 0, "נאמר 'bread is half price'."),
      ],
    ),
    L(
      "I have a busy week. On Monday I have a math test, and on Tuesday I play in a football match. On Wednesday I go to the dentist, and on Thursday we have a school trip to the zoo. By Friday I will be very tired, so I plan to sleep until noon on Saturday.",
      "יש לי שבוע עמוס. ביום שני יש לי מבחן חשבון, וביום שלישי אני משחק במשחק כדורגל. ביום רביעי אני הולך לרופא השיניים, וביום חמישי יש לנו טיול בית ספר לגן החיות. עד יום שישי אהיה עייף מאוד, ולכן אני מתכנן לישון עד הצהריים בשבת.",
      [
        q("What does he have on Wednesday?", "מה יש לו ביום רביעי?", ["A visit to the dentist", "A football match", "A math test", "A school trip"], ["ביקור אצל רופא השיניים", "משחק כדורגל", "מבחן חשבון", "טיול בית ספר"], 0, "נאמר 'On Wednesday I go to the dentist'."),
        q("What does he plan for Saturday?", "מה הוא מתכנן לשבת?", ["To sleep until noon", "To play football", "To study", "To go to the zoo"], ["לישון עד הצהריים", "לשחק כדורגל", "ללמוד", "ללכת לגן החיות"], 0, "נאמר 'sleep until noon on Saturday'."),
      ],
    ),
    L(
      "Hello, this is a short message for the neighbours in the building. On Sunday the water will be turned off between nine and one, because the workers need to repair the water system. Please fill some bottles in the morning. We are sorry for the problem.",
      "שלום, זו הודעה קצרה לשכנים בבניין. ביום ראשון יסגרו את המים בין תשע לאחת, כי העובדים צריכים לתקן את מערכת המים. בבקשה מלאו כמה בקבוקים בבוקר. אנחנו מצטערים על הבעיה.",
      [
        q("When will the water be turned off?", "מתי יסגרו את המים?", ["On Sunday between nine and one", "On Monday morning", "On Saturday night", "All week"], ["ביום ראשון בין תשע לאחת", "בבוקר יום שני", "בליל שבת", "כל השבוע"], 0, "נאמר 'On Sunday ... between nine and one'."),
        q("Why will it be turned off?", "למה יסגרו אותם?", ["Workers must repair the water system", "There is no water", "It is a holiday", "The building is closed"], ["עובדים צריכים לתקן את מערכת המים", "אין מים", "זה חג", "הבניין סגור"], 0, "נאמר 'repair the water system'."),
      ],
    ),
    L(
      "Hi, it is me. I am so excited about our trip to the mountains next week. I have already packed my warm clothes and my walking shoes. Can you bring the map and a camera? My dad will drive, and we will pick you up at six in the morning. Do not be late!",
      "היי, זאת אני. אני כל כך מתרגשת מהטיול שלנו להרים בשבוע הבא. כבר ארזתי את הבגדים החמים ואת נעלי ההליכה. את יכולה להביא את המפה ומצלמה? אבא שלי ינהג, ואנחנו נאסוף אותך בשש בבוקר. אל תאחרי!",
      [
        q("What must the friend bring?", "מה החברה צריכה להביא?", ["The map and a camera", "Warm clothes", "Food", "A bag"], ["את המפה ומצלמה", "בגדים חמים", "אוכל", "תיק"], 0, "נאמר 'the map and a camera'."),
        q("Who will drive?", "מי ינהג?", ["The speaker's dad", "The friend's dad", "The speaker's mom", "A taxi driver"], ["אבא של הדוברת", "אבא של החברה", "אמא של הדוברת", "נהג מונית"], 0, "נאמר 'My dad will drive'."),
      ],
    ),
    L(
      "Welcome to the town cinema. Tonight's film starts at eight and lasts two hours. Tickets are ten dollars for adults and six for kids. You can buy drinks and snacks inside. Please sit down quickly when the lights go down, and turn off your phones.",
      "ברוכים הבאים לקולנוע העירוני. הסרט של הערב מתחיל בשמונה ונמשך שעתיים. כרטיסים עולים עשרה דולרים למבוגרים ושישה לילדים. אפשר לקנות משקאות וחטיפים בפנים. בבקשה שבו מהר כשהאורות כבים, וכבו את הטלפונים.",
      [
        q("How long does the film last?", "כמה זמן הסרט נמשך?", ["Two hours", "One hour", "Three hours", "Ninety minutes"], ["שעתיים", "שעה", "שלוש שעות", "תשעים דקות"], 0, "נאמר 'lasts two hours'."),
        q("How much is a ticket for kids?", "כמה עולה כרטיס לילדים?", ["Six dollars", "Ten dollars", "Four dollars", "Eight dollars"], ["שישה דולרים", "עשרה דולרים", "ארבעה דולרים", "שמונה דולרים"], 0, "נאמר 'six for kids'."),
      ],
    ),
    L(
      "Hello! I am twelve years old. I live with my parents and two sisters in a flat near the sea. My favourite subject is science, and in my free time I play the guitar and ride my bike. Next summer I hope to travel to another country with my class.",
      "שלום! אני בן שתים עשרה. אני גר עם ההורים שלי ושתי אחיות בדירה ליד הים. המקצוע האהוב עליי הוא מדעים, ובזמן הפנוי אני מנגן בגיטרה ורוכב על אופניים. בקיץ הבא אני מקווה לנסוע למדינה אחרת עם הכיתה שלי.",
      [
        q("How old is the speaker?", "בן כמה הדובר?", ["Twelve", "Ten", "Eleven", "Nine"], ["שתים עשרה", "עשר", "אחת עשרה", "תשע"], 0, "נאמר 'twelve years old'."),
        q("What does the speaker want to do next summer?", "מה הדובר רוצה לעשות בקיץ הבא?", ["Travel to another country", "Learn to swim", "Get a job", "Stay at home"], ["לנסוע למדינה אחרת", "ללמוד לשחות", "למצוא עבודה", "להישאר בבית"], 0, "נאמר 'travel to another country'."),
      ],
    ),
    L(
      "Hello, farmers' market visitors. The fruit and vegetable shops are on the left and the cheese and bread shops are on the right. Today the apples are very sweet and the price is low. A band will play at noon near the school. Please take your things with you when you leave.",
      "שלום, מבקרי שוק החקלאים. חנויות הפירות והירקות משמאל וחנויות הגבינה והלחם מימין. היום התפוחים מתוקים מאוד והמחיר נמוך. להקה תנגן בצהריים ליד בית הספר. בבקשה קחו את הדברים שלכם איתכם כשאתם עוזבים.",
      [
        q("Where are the cheese and bread shops?", "איפה חנויות הגבינה והלחם?", ["On the right", "On the left", "Near the school", "At the entrance"], ["מימין", "משמאל", "ליד בית הספר", "בכניסה"], 0, "נאמר 'cheese and bread shops are on the right'."),
        q("What will happen at noon?", "מה יקרה בצהריים?", ["A band will play", "The market will close", "There will be a sale", "A film will start"], ["להקה תנגן", "השוק ייסגר", "יהיה מבצע", "סרט יתחיל"], 0, "נאמר 'A band will play at noon'."),
      ],
    ),
    L(
      "Dear students, this is your headteacher. Tomorrow there will be no school because of the strong storm. The roads may be dangerous, and some trees may fall. Please stay at home and do your homework online. We will tell you by message if school is open on Friday. Stay safe.",
      "תלמידים יקרים, זו המנהלת שלכם. מחר לא יהיו לימודים בגלל הסערה החזקה. הכבישים עלולים להיות מסוכנים, וייתכן שעצים יפלו. בבקשה הישארו בבית ועשו שיעורי בית באינטרנט. נודיע לכם בהודעה אם בית הספר פתוח ביום שישי. הישארו בטוחים.",
      [
        q("Why is there no school tomorrow?", "למה אין לימודים מחר?", ["There is a strong storm", "It is a holiday", "The teachers are sick", "The school is being repaired"], ["יש סערה חזקה", "זה חג", "המורים חולים", "בית הספר בתיקון"], 0, "נאמר 'because of the strong storm'."),
        q("How will students know about Friday?", "איך התלמידים ידעו לגבי יום שישי?", ["By message", "By radio", "By phone call", "By letter"], ["בהודעה", "ברדיו", "בשיחת טלפון", "במכתב"], 0, "נאמר 'by message'."),
      ],
    ),
    L(
      "Hi, it is me. I am at the airport and my flight is two hours late. I am using a friend's phone, because my phone has no battery. Could you tell my parents, please? I will call you when I arrive. The airport is full of people who are going on holiday, and it is very noisy.",
      "היי, זה אני. אני בשדה התעופה והטיסה שלי מאחרת בשעתיים. אני משתמש בטלפון של חבר, כי אין סוללה בטלפון שלי. אתה יכול להגיד להורים שלי, בבקשה? אתקשר כשאגיע. שדה התעופה מלא באנשים שנוסעים לחופשה, והוא רועש מאוד.",
      [
        q("How late is the flight?", "בכמה זמן הטיסה מאחרת?", ["Two hours", "One hour", "Four hours", "All night"], ["שעתיים", "שעה", "ארבע שעות", "כל הלילה"], 0, "נאמר 'two hours late'."),
        q("Why can the speaker not call his parents with his own phone?", "למה הדובר לא יכול להתקשר להוריו מהטלפון שלו?", ["His phone has no battery", "He has no money", "He is busy", "He has no time"], ["אין סוללה בטלפון שלו", "אין לו כסף", "הוא עסוק", "אין לו זמן"], 0, "נאמר 'my phone has no battery'."),
      ],
    ),
    L(
      "I really love my school, but there are a few things I would like to change. First, the lessons start too early, at seven thirty. Second, we do not have enough time for lunch. Third, the playground is small, and we have only one football. If I were the headteacher, I would start at nine.",
      "אני ממש אוהב את בית הספר שלי, אבל יש כמה דברים שהייתי רוצה לשנות. קודם, השיעורים מתחילים מוקדם מדי, בשבע וחצי. שנית, אין לנו מספיק זמן לארוחת צהריים. שלישית, המגרש קטן, ויש לנו רק כדורגל אחד. אילו הייתי המנהל, הייתי מתחיל בתשע.",
      [
        q("What time do lessons start?", "באיזו שעה השיעורים מתחילים?", ["Seven thirty", "Eight", "Nine", "Seven"], ["שבע וחצי", "שמונה", "תשע", "שבע"], 0, "נאמר 'seven thirty'."),
        q("What would he do as headteacher?", "מה הוא היה עושה כמנהל?", ["Start at nine", "Close the school", "Buy more footballs", "Add more lessons"], ["היה מתחיל בתשע", "היה סוגר את בית הספר", "היה קונה עוד כדורגלים", "היה מוסיף שיעורים"], 0, "נאמר 'I would start at nine'."),
      ],
    ),
    L(
      "Hello. I would like to make a reservation for dinner on Friday evening, please. There will be six of us, and one of us does not eat meat. Can we have a table by the window? We would like to come at seven thirty. My name is Cohen. Thank you.",
      "שלום. אני רוצה להזמין מקום לארוחת ערב ביום שישי בערב, בבקשה. נהיה שישה, ואחד מאיתנו לא אוכל בשר. אפשר שולחן ליד החלון? נרצה להגיע בשבע וחצי. שמי כהן. תודה.",
      [
        q("How many people will come?", "כמה אנשים יבואו?", ["Six", "Four", "Eight", "Two"], ["שישה", "ארבעה", "שמונה", "שניים"], 0, "נאמר 'six of us'."),
        q("Where do they want to sit?", "איפה הם רוצים לשבת?", ["By the window", "Outside", "At the bar", "In the corner"], ["ליד החלון", "בחוץ", "ליד הבר", "בפינה"], 0, "נאמר 'a table by the window'."),
      ],
    ),
    L(
      "Hello, and welcome back to the radio show for teenagers. Our topic today is sleep. Doctors say that teenagers need about nine hours every night, but many get only six. Try not to use your phone before bed, and keep your room dark and cool. Call us now and tell us how you sleep.",
      "שלום, וברוכים שבים לתוכנית הרדיו לבני נוער. הנושא שלנו היום הוא שינה. רופאים אומרים שבני נוער צריכים כתשע שעות בכל לילה, אבל רבים ישנים רק שש. נסו לא להשתמש בטלפון לפני השינה, ושמרו על חדר חשוך וקריר. התקשרו אלינו עכשיו וספרו לנו איך אתם ישנים.",
      [
        q("How many hours do teenagers need to sleep?", "כמה שעות בני נוער צריכים לישון?", ["About nine", "About six", "About twelve", "About five"], ["כתשע", "כשש", "כשתים עשרה", "כחמש"], 0, "נאמר 'about nine hours'."),
        q("What should you not do before bed?", "מה לא כדאי לעשות לפני השינה?", ["Use your phone", "Read a book", "Drink water", "Wash your face"], ["להשתמש בטלפון", "לקרוא ספר", "לשתות מים", "לשטוף פנים"], 0, "נאמר 'not to use your phone before bed'."),
      ],
    ),
    L(
      "Hi, it is Grandma. I made your favourite cake, and I want to bring it to you tomorrow. Will you be at home at four? If not, I can leave it with the neighbour. By the way, I am learning to use the internet, and my first email will be to you. Please write back soon!",
      "היי, זאת סבתא. הכנתי את העוגה האהובה עליך, ואני רוצה להביא אותה אליך מחר. אתה תהיה בבית בארבע? אם לא, אפשר להשאיר אותה אצל השכנה. אגב, אני לומדת להשתמש באינטרנט, והמייל הראשון שלי יהיה אליך. בבקשה כתוב לי בחזרה בקרוב!",
      [
        q("What did Grandma make?", "מה סבתא הכינה?", ["His favourite cake", "Soup", "Bread", "A salad"], ["את העוגה האהובה עליו", "מרק", "לחם", "סלט"], 0, "נאמר 'your favourite cake'."),
        q("What is Grandma learning?", "מה סבתא לומדת?", ["To use the internet", "To drive", "To swim", "To cook"], ["להשתמש באינטרנט", "לנהוג", "לשחות", "לבשל"], 0, "נאמר 'learning to use the internet'."),
      ],
    ),
    L(
      "Hello, this is the school bus company. Because of the holiday, bus number five will not run on Thursday and Friday. Students from your area can take bus number eight instead. It leaves from the same stop, ten minutes earlier than usual. Please tell your friends. Thank you.",
      "שלום, זו חברת האוטובוסים של בית הספר. בגלל החג, אוטובוס מספר חמש לא ייסע ביום חמישי ובשישי. תלמידים מהאזור שלכם יכולים לקחת את אוטובוס מספר שמונה במקום. הוא יוצא מאותה תחנה, עשר דקות מוקדם מהרגיל. בבקשה ספרו לחברים. תודה.",
      [
        q("Which bus will not run?", "איזה אוטובוס לא ייסע?", ["Bus number five", "Bus number eight", "Bus number ten", "All the buses"], ["אוטובוס מספר חמש", "אוטובוס מספר שמונה", "אוטובוס מספר עשר", "כל האוטובוסים"], 0, "נאמר 'bus number five will not run'."),
        q("What time does bus number eight leave?", "מתי אוטובוס מספר שמונה יוצא?", ["Ten minutes earlier than usual", "Ten minutes later", "At the same time", "One hour earlier"], ["עשר דקות מוקדם מהרגיל", "עשר דקות מאוחר יותר", "באותו זמן", "שעה מוקדם יותר"], 0, "נאמר 'ten minutes earlier than usual'."),
      ],
    ),
    L(
      "Last summer I worked in my uncle's ice cream shop. I got up at six every morning and washed the floors before we opened. At first it was hard, but I learned to be polite to every customer. I saved enough money to buy a new phone, and my uncle said I was his best worker.",
      "בקיץ שעבר עבדתי בחנות הגלידה של הדוד שלי. קמתי בשש בכל בוקר ושטפתי את הרצפות לפני שפתחנו. בהתחלה זה היה קשה, אבל למדתי להיות מנומס לכל לקוח. חסכתי מספיק כסף לקנות טלפון חדש, והדוד שלי אמר שאני העובד הכי טוב שלו.",
      [
        q("What time did the writer get up?", "באיזו שעה הכותב קם?", ["At six", "At seven", "At five", "At eight"], ["בשש", "בשבע", "בחמש", "בשמונה"], 0, "נאמר 'at six every morning'."),
        q("What did he buy with his money?", "מה הוא קנה בכסף?", ["A new phone", "A bike", "A computer", "Clothes"], ["טלפון חדש", "אופניים", "מחשב", "בגדים"], 0, "נאמר 'a new phone'."),
      ],
    ),
    L(
      "Good evening, this is the local news. A young boy from our town saw a wallet with a lot of money on the street yesterday. He took it to the police, and they gave it back to the owner, an old woman. She gave him a box of chocolates to say thank you. The school will thank him next week.",
      "ערב טוב, אלו החדשות המקומיות. ילד צעיר מהעיירה שלנו ראה אתמול ברחוב ארנק עם הרבה כסף. הוא לקח אותו למשטרה, והם החזירו אותו לבעלים, אישה זקנה. היא נתנה לו קופסת שוקולדים כדי להגיד תודה. בית הספר יודה לו בשבוע הבא.",
      [
        q("What did the boy see?", "מה הילד ראה?", ["A wallet with money", "A phone", "A bag", "A watch"], ["ארנק עם כסף", "טלפון", "תיק", "שעון"], 0, "נאמר 'a wallet with a lot of money'."),
        q("Who will thank him next week?", "מי יודה לו בשבוע הבא?", ["The school", "The police", "The old woman", "His teacher"], ["בית הספר", "המשטרה", "האישה הזקנה", "המורה שלו"], 0, "נאמר 'The school will thank him next week'."),
      ],
    ),
    L(
      "Hello, I am calling about the lesson tomorrow. I am sorry, but I can't come because I am ill. The doctor said I must stay at home for three days. Could you send me the homework by email? I promise I will study and catch up next week. Thank you for understanding.",
      "שלום, אני מתקשרת בקשר לשיעור מחר. אני מצטערת, אבל אני לא יכולה לבוא כי אני חולה. הרופא אמר שאני חייבת להישאר בבית שלושה ימים. אפשר לשלוח לי את שיעורי הבית במייל? אני מבטיחה שאלמד ואתעדכן בשבוע הבא. תודה על ההבנה.",
      [
        q("Why can the speaker not come?", "למה הדוברת לא יכולה לבוא?", ["She is ill", "She is on holiday", "She is busy", "She forgot"], ["היא חולה", "היא בחופשה", "היא עסוקה", "היא שכחה"], 0, "נאמר 'I am ill'."),
        q("What does she ask for?", "מה היא מבקשת?", ["The homework by email", "A new teacher", "Extra time", "A phone call"], ["את שיעורי הבית במייל", "מורה חדש", "זמן נוסף", "שיחת טלפון"], 0, "נאמר 'send me the homework by email'."),
      ],
    ),
  ],
};
