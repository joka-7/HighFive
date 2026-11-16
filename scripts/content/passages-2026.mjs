// 2026 curriculum round — reading passages from the HighFive curriculum
// review (2026) that weave the new Band III Core I and academic-core words
// (wordbank-2026.mjs) into connected text. Fully bilingual, so both join the
// curated pool.

export const READINGS_2026 = {
  B1: [
    {
      title: "Turning an Old Harbor into a Green Community Space (מנמל ישן למרחב ירוק לקהילה)",
      text: "For decades, the old city harbor was situated next to an industrial area where cargo ships unloaded heavy goods. However, when shipping companies moved their headquarters to a modern port further south, the place fell into neglect and filled up with rubbish. Last year, the mayor decided to take into account the complaints of local residents and conduct a public survey. On the one hand, business owners wanted to build a giant parking garage; on the other hand, families demanded an accessible park where people could hang out and exercise. Strangely enough, both sides managed to smooth things over and agree on a single proposal. Today, the renovated shore has a running track, shaded benches and an open-air stage with a capacity of two thousand visitors. By choosing to invest in the environment rather than concrete, the city showed that urban renewal can benefit the whole community.",
      textHe: "במשך עשרות שנים, הנמל הישן של העיר היה ממוקם ליד אזור תעשייה שבו ספינות משא פרקו סחורות כבדות. אבל כשחברות הספנות העבירו את המטות שלהן לנמל מודרני דרומה יותר, המקום הוזנח והתמלא באשפה. בשנה שעברה החליט ראש העיר לקחת בחשבון את התלונות של התושבים ולערוך סקר ציבורי. מצד אחד, בעלי עסקים רצו לבנות חניון ענק; מצד שני, משפחות דרשו פארק נגיש שבו אפשר לבלות ולהתעמל. למרבה ההפתעה, שני הצדדים הצליחו ליישר את ההדורים ולהסכים על הצעה אחת. היום יש בחוף המשופץ מסלול ריצה, ספסלים מוצלים ובמה פתוחה עם מקום לאלפיים מבקרים. כשבחרה להשקיע בסביבה ולא בבטון, העיר הראתה שהתחדשות עירונית יכולה להועיל לכל הקהילה.",
      glossary: [
        { word: "neglect", partOfSpeech: "noun", definition: "מצב שבו לא מטפלים במשהו", example: "The garden suffered from neglect.", translation: "הזנחה" },
        { word: "survey", partOfSpeech: "noun", definition: "שאלות שמציגים לאנשים כדי לדעת מה הם חושבים", example: "The school conducted a survey.", translation: "סקר" },
        { word: "renewal", partOfSpeech: "noun", definition: "חידוש, שיפוץ של משהו ישן", example: "The city plans an urban renewal project.", translation: "התחדשות" },
      ],
      questions: [
        {
          question: "Why did the old harbor fall into neglect?",
          questionHe: "למה הנמל הישן הוזנח?",
          options: ["The mayor closed it", "Shipping companies moved to a new port", "A storm destroyed it", "Families stopped visiting it"],
          optionsHe: ["ראש העיר סגר אותו", "חברות הספנות עברו לנמל חדש", "סערה הרסה אותו", "משפחות הפסיקו לבקר בו"],
          correctIndex: 1,
          explanation: "כתוב שחברות הספנות העבירו את המטות שלהן לנמל מודרני, ואז המקום הוזנח.",
        },
        {
          question: "What did business owners want to build?",
          questionHe: "מה רצו בעלי העסקים לבנות?",
          options: ["A running track", "A park", "A parking garage", "An open-air stage"],
          optionsHe: ["מסלול ריצה", "פארק", "חניון", "במה פתוחה"],
          correctIndex: 2,
          explanation: "\"business owners wanted to build a giant parking garage\" — בעלי העסקים רצו חניון ענק.",
        },
        {
          question: "What does \"smooth things over\" mean in the text?",
          questionHe: "מה פירוש \"smooth things over\" בקטע?",
          options: ["To clean the shore", "To end the disagreement", "To build a new road", "To delay the decision"],
          optionsHe: ["לנקות את החוף", "ליישב את המחלוקת", "לבנות כביש חדש", "לדחות את ההחלטה"],
          correctIndex: 1,
          explanation: "smooth things over = ליישר את ההדורים: שני הצדדים הגיעו להסכמה.",
        },
        {
          question: "What is the main message of the text?",
          questionHe: "מהו המסר העיקרי של הקטע?",
          options: ["Parking is more important than parks", "Old harbors should be closed", "Investing in the environment can help a whole community", "Surveys are a waste of time"],
          optionsHe: ["חניה חשובה יותר מפארקים", "צריך לסגור נמלים ישנים", "השקעה בסביבה יכולה להועיל לכל הקהילה", "סקרים הם בזבוז זמן"],
          correctIndex: 2,
          explanation: "המשפט האחרון: השקעה בסביבה במקום בבטון הועילה לכל הקהילה.",
        },
      ],
    },
  ],
  B2: [
    {
      title: "The Hidden Cost of Always Being Available (המחיר הנסתר של זמינות תמידית)",
      text: "In modern society, digital technology has undoubtedly improved our ability to communicate across great distances. Yet recent research indicates that constant connectivity carries a significant psychological cost. Not only do employees feel pressured to respond to messages when they are off duty, but students also struggle to maintain focus when notifications keep interrupting their learning process. Fear of missing out can act as a major barrier to deep rest, gradually eroding both creativity and mental health. Faced with this growing issue, several European organizations have introduced a strict new policy: after working hours, servers automatically postpone non-urgent emails until the following morning. While critics argue that such measures might reduce flexibility, supporters emphasize that protecting personal leisure is essential if we wish to prevent burnout and achieve sustainable long-term productivity.",
      textHe: "בחברה המודרנית, הטכנולוגיה הדיגיטלית ללא ספק שיפרה את היכולת שלנו לתקשר למרחקים גדולים. אבל מחקרים חדשים מראים שחיבור מתמיד גובה מחיר פסיכולוגי משמעותי. לא רק שעובדים מרגישים לחץ להגיב להודעות מחוץ לשעות העבודה, אלא גם תלמידים מתקשים לשמור על ריכוז כשהתראות קוטעות שוב ושוב את תהליך הלמידה שלהם. הפחד להחמיץ יכול להיות מחסום מרכזי בפני מנוחה עמוקה, ולשחוק בהדרגה גם את היצירתיות וגם את בריאות הנפש. מול הבעיה ההולכת וגדלה הזאת, כמה ארגונים באירופה הנהיגו מדיניות חדשה ומחמירה: אחרי שעות העבודה, השרתים דוחים אוטומטית מיילים לא דחופים עד הבוקר שלמחרת. המבקרים טוענים שצעדים כאלה עלולים לפגוע בגמישות, אבל התומכים מדגישים ששמירה על הפנאי האישי חיונית אם רוצים למנוע שחיקה ולהשיג פריון בר-קיימא לאורך זמן.",
      glossary: [
        { word: "connectivity", partOfSpeech: "noun", definition: "מצב של חיבור לרשת או לאחרים", example: "Constant connectivity can be tiring.", translation: "קישוריות, חיבור" },
        { word: "burnout", partOfSpeech: "noun", definition: "עייפות קשה מעבודה או מלחץ ממושך", example: "Long hours can lead to burnout.", translation: "שחיקה" },
        { word: "sustainable", partOfSpeech: "adjective", definition: "שאפשר להמשיך בו לאורך זמן", example: "We need a sustainable plan.", translation: "בר-קיימא" },
      ],
      questions: [
        {
          question: "According to the text, what is the cost of constant connectivity?",
          questionHe: "לפי הקטע, מה המחיר של חיבור מתמיד?",
          options: ["A financial cost", "A psychological cost", "A technical cost", "No cost at all"],
          optionsHe: ["מחיר כספי", "מחיר פסיכולוגי", "מחיר טכני", "אין מחיר בכלל"],
          correctIndex: 1,
          explanation: "\"constant connectivity carries a significant psychological cost\" — מחיר פסיכולוגי.",
        },
        {
          question: "What do some European organizations do after working hours?",
          questionHe: "מה עושים כמה ארגונים באירופה אחרי שעות העבודה?",
          options: ["They delete all emails", "They send emails faster", "Their servers delay non-urgent emails", "They close their offices for a week"],
          optionsHe: ["מוחקים את כל המיילים", "שולחים מיילים מהר יותר", "השרתים שלהם דוחים מיילים לא דחופים", "סוגרים את המשרדים לשבוע"],
          correctIndex: 2,
          explanation: "\"servers automatically postpone non-urgent emails until the following morning\".",
        },
        {
          question: "What do critics say about the new policy?",
          questionHe: "מה אומרים המבקרים על המדיניות החדשה?",
          options: ["It might reduce flexibility", "It will prevent burnout", "It improves creativity", "It is too expensive"],
          optionsHe: ["היא עלולה לפגוע בגמישות", "היא תמנע שחיקה", "היא משפרת יצירתיות", "היא יקרה מדי"],
          correctIndex: 0,
          explanation: "\"critics argue that such measures might reduce flexibility\".",
        },
        {
          question: "Which structure does the sentence \"Not only do employees feel pressured...\" use?",
          questionHe: "באיזה מבנה משתמש המשפט \"Not only do employees feel pressured...\"?",
          options: ["A passive verb", "Inversion after a negative phrase", "A conditional", "Reported speech"],
          optionsHe: ["פועל סביל", "היפוך אחרי ביטוי שלילי", "משפט תנאי", "דיבור עקיף"],
          correctIndex: 1,
          explanation: "אחרי Not only בתחילת משפט בא היפוך: do employees feel (ולא employees feel).",
        },
      ],
    },
  ],
};
