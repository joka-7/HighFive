// Words moved up a level because CEFR-J 1.5 puts them two or more levels above
// where they were taught (docs/CONTENT-AUDIT.md, "Words against the CEFR lists").
// Each now sits one level below or at its list level. cancel, available and
// confirm moved the other way, from B1 to A2 (one level below their list
// level), because A2 listening announcements use them.

export const LEVEL_MOVES = {
  A2: [
    { word: "cancel", partOfSpeech: "verb", definition: "לבטל", example: "They cancelled the trip.", translation: "לבטל", exampleHe: "הם ביטלו את הטיול." },
    { word: "available", partOfSpeech: "adjective", definition: "זמין — קיים ואפשר להשתמש בו", example: "Tickets are available online.", translation: "זמין", exampleHe: "כרטיסים זמינים באינטרנט." },
    { word: "confirm", partOfSpeech: "verb", definition: "לאשר", example: "Please confirm your booking.", translation: "לאשר", exampleHe: "בבקשה אשר את ההזמנה." },
    { word: "boot", partOfSpeech: "noun", definition: "נעל גבוהה", example: "Winter boots.", translation: "מגף", exampleHe: "מגפי חורף." },
    { word: "pillow", partOfSpeech: "noun", definition: "כרית לראש", example: "A soft pillow.", translation: "כרית", exampleHe: "כרית רכה." },
    { word: "pot", partOfSpeech: "noun", definition: "סיר", example: "A big pot.", translation: "סיר", exampleHe: "סיר גדול." },
    { word: "sand", partOfSpeech: "noun", definition: "חול", example: "Sand on the beach.", translation: "חול", exampleHe: "חול על החוף." },
    { word: "candle", partOfSpeech: "noun", definition: "נר", example: "Seven candles.", translation: "נר", exampleHe: "שבעה נרות." },
  ],
  B1: [
    { word: "rub", partOfSpeech: "verb", definition: "לשפשף", example: "Rub your hands.", translation: "לשפשף", exampleHe: "שפשף את הידיים." },
    { word: "squeeze", partOfSpeech: "verb", definition: "לסחוט או ללחוץ", example: "Squeeze the lemon.", translation: "לסחוט/ללחוץ", exampleHe: "סחוט את הלימון." },
    { word: "ceiling", partOfSpeech: "noun", definition: "החלק העליון של החדר", example: "A light on the ceiling.", translation: "תקרה", exampleHe: "אור בתקרה." },
    { word: "salty", partOfSpeech: "adjective", definition: "מלוח", example: "The soup is salty.", translation: "מלוח", exampleHe: "המרק מלוח." },
    { word: "colleague", partOfSpeech: "noun", definition: "מישהו שעובד איתך", example: "My colleague helped me today.", exampleHe: "העמית שלי לעבודה עזר לי היום.", translation: "עמית לעבודה" },
    { word: "employee", partOfSpeech: "noun", definition: "מי שעובד אצל מישהו תמורת שכר", example: "Every employee gets training.", exampleHe: "כל עובד מקבל הכשרה.", translation: "עובד, שכיר", wordFamily: "employ (v) → employee (n) → employer (n)", band: "II", skillType: "productive" },
    { word: "employer", partOfSpeech: "noun", definition: "מי שמעסיק עובדים", example: "My employer gave me a day off.", exampleHe: "המעסיק שלי נתן לי יום חופש.", translation: "מעסיק", wordFamily: "employ (v) → employee (n) → employer (n)", band: "II", skillType: "productive" },
    { word: "postpone", partOfSpeech: "verb", definition: "לדחות למועד מאוחר יותר", example: "We had to postpone the concert because of the storm.", exampleHe: "נאלצנו לדחות את ההופעה בגלל הסערה.", translation: "לדחות", band: "II", skillType: "productive" },
  ],
  C1: [
    { word: "hypothesis", partOfSpeech: "noun", definition: "השערה — רעיון לבדיקה במחקר", example: "The data supports the hypothesis.", translation: "השערה", exampleHe: "הנתונים תומכים בהשערה." },
    { word: "commodity", partOfSpeech: "noun", definition: "מצרך או סחורה למסחר", example: "Oil is a valuable commodity.", translation: "מצרך/סחורה", exampleHe: "נפט הוא סחורה יקרת ערך." },
    { word: "correlate", partOfSpeech: "verb", definition: "להראות קשר או מתאם", example: "The two factors correlate.", translation: "להראות מתאם", exampleHe: "יש מתאם בין שני הגורמים." },
    { word: "adhere", partOfSpeech: "verb", definition: "לדבוק, לציית לכללים", example: "Adhere to the rules.", translation: "לדבוק/לציית", exampleHe: "הקפד על הכללים." },
    { word: "embody", partOfSpeech: "verb", definition: "לגלם, לבטא במוחשי", example: "She embodies kindness.", translation: "לגלם", exampleHe: "היא מגלמת טוב לב." },
    { word: "fluctuate", partOfSpeech: "verb", definition: "להשתנות, לנוע מעלה ומטה", example: "Prices fluctuate daily.", translation: "להשתנות/לנוע", exampleHe: "המחירים משתנים מדי יום." },
    { word: "induce", partOfSpeech: "verb", definition: "לגרום, לשדל", example: "Induce sleep.", translation: "לגרום/לשדל", exampleHe: "להביא לשינה." },
    { word: "denote", partOfSpeech: "verb", definition: "לציין או לסמן משמעות", example: "Red denotes danger.", translation: "לציין/לסמן", exampleHe: "אדום מסמל סכנה." },
    { word: "mediate", partOfSpeech: "verb", definition: "לתווך בין צדדים", example: "Mediate the dispute.", translation: "לתווך", exampleHe: "גשר על המחלוקת." },
    { word: "stipulate", partOfSpeech: "verb", definition: "לקבוע במפורש בתנאי", example: "The contract stipulates a deadline.", translation: "לקבוע במפורש/להתנות", exampleHe: "החוזה קובע מועד אחרון." },
    { word: "substantiate", partOfSpeech: "verb", definition: "לבסס בראיות", example: "Substantiate your argument.", translation: "לבסס/להוכיח", exampleHe: "בסס את הטיעון שלך." },
    { word: "correlation", partOfSpeech: "noun", definition: "מתאם בין שני דברים", example: "A strong correlation.", translation: "מתאם", exampleHe: "מתאם חזק." },
    { word: "embed", partOfSpeech: "verb", definition: "להטמיע בתוך משהו אחר", example: "You can embed the video in the page.", exampleHe: "אפשר להטמיע את הסרטון בעמוד.", translation: "להטמיע" },
  ],
};
