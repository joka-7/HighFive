// Base passage banks for Reading, Listening and Speaking, per CEFR level.
//
// Each level has a pool of hand-written items. The generator rotates through
// them across the year and, for speaking, recombines sentences into fresh sets,
// so a learner gets variety without fabricated filler. Comprehension questions
// are written to be answerable purely from the text/transcript.

// --- READING: title (En + He), text (En), glossary (3), questions (2) ---
export const READINGS = {
  A1: [
    {
      title: "My Morning (הבוקר שלי)",
      text: "I wake up at seven. I drink water and eat bread with cheese. Then I go to work by bus. The bus is often full, but I like to look out the window.",
      glossary: [
        { word: "wake up", partOfSpeech: "verb", definition: "להתעורר משינה", example: "I wake up early.", translation: "להתעורר" },
        { word: "bus", partOfSpeech: "noun", definition: "כלי תחבורה ציבורי גדול", example: "The bus is full.", translation: "אוטובוס" },
        { word: "full", partOfSpeech: "adjective", definition: "מלא, אין מקום פנוי", example: "The cup is full.", translation: "מלא" },
      ],
      questions: [
        { question: "When does the writer wake up?", options: ["At six", "At seven", "At eight", "At nine"], correctIndex: 1, explanation: "כתוב 'I wake up at seven'." },
        { question: "How does the writer go to work?", options: ["By car", "By bike", "By bus", "On foot"], correctIndex: 2, explanation: "כתוב 'I go to work by bus'." },
      ],
    },
    {
      title: "My Friend Lia (החברה שלי ליה)",
      text: "Lia is my friend. She lives near my house. We go to school together every day. After school we play in the park and then we do our homework.",
      glossary: [
        { word: "near", partOfSpeech: "preposition", definition: "קרוב ל-", example: "I live near the sea.", translation: "ליד/קרוב" },
        { word: "together", partOfSpeech: "adverb", definition: "ביחד, עם מישהו", example: "We work together.", translation: "ביחד" },
        { word: "homework", partOfSpeech: "noun", definition: "עבודה שעושים בבית אחרי בית הספר", example: "I do my homework.", translation: "שיעורי בית" },
      ],
      questions: [
        { question: "Where does Lia live?", options: ["Far away", "Near the writer's house", "In another city", "At school"], correctIndex: 1, explanation: "כתוב 'She lives near my house'." },
        { question: "What do they do after school?", options: ["Sleep", "Play in the park", "Go to work", "Watch TV"], correctIndex: 1, explanation: "כתוב 'we play in the park'." },
      ],
    },
  ],
  A2: [
    {
      title: "A Day at the Market (יום בשוק)",
      text: "On Fridays my mother and I go to the market. We buy fresh vegetables, fruit and bread. The market is busy and noisy, but the food is cheaper than in the shop. We always stop for a coffee before we go home.",
      glossary: [
        { word: "fresh", partOfSpeech: "adjective", definition: "טרי, חדש ולא מקולקל", example: "I like fresh bread.", translation: "טרי" },
        { word: "busy", partOfSpeech: "adjective", definition: "עם הרבה אנשים ופעילות", example: "The street is busy.", translation: "עמוס/הומה" },
        { word: "cheaper", partOfSpeech: "adjective", definition: "עולה פחות כסף", example: "This shop is cheaper.", translation: "זול יותר" },
      ],
      questions: [
        { question: "When do they go to the market?", options: ["On Mondays", "On Fridays", "Every day", "On Sundays"], correctIndex: 1, explanation: "כתוב 'On Fridays'." },
        { question: "Why do they like the market?", options: ["It is quiet", "The food is cheaper", "It is far", "It is small"], correctIndex: 1, explanation: "כתוב 'the food is cheaper than in the shop'." },
      ],
    },
    {
      title: "Learning to Swim (ללמוד לשחות)",
      text: "When I was young, I was afraid of water. Last summer I decided to take swimming lessons. At first it was hard and I felt nervous, but my teacher was patient. Now I can swim well and I love going to the pool.",
      glossary: [
        { word: "afraid", partOfSpeech: "adjective", definition: "מפחד ממשהו", example: "She is afraid of dogs.", translation: "מפחד" },
        { word: "nervous", partOfSpeech: "adjective", definition: "מתוח, חושש", example: "I feel nervous before a test.", translation: "לחוץ/עצבני" },
        { word: "patient", partOfSpeech: "adjective", definition: "סבלני, לא ממהר", example: "A good teacher is patient.", translation: "סבלני" },
      ],
      questions: [
        { question: "What was the writer afraid of?", options: ["Dogs", "Water", "The dark", "Heights"], correctIndex: 1, explanation: "כתוב 'I was afraid of water'." },
        { question: "How is the writer's teacher described?", options: ["Strict", "Patient", "Angry", "Lazy"], correctIndex: 1, explanation: "כתוב 'my teacher was patient'." },
      ],
    },
  ],
  B1: [
    {
      title: "A Small Change (שינוי קטן)",
      text: "Last year I decided to read one short article in English every day. At first it was difficult, and I had to look up many words. After a few months, something surprising happened: I started to understand the news without translating it in my head. The secret was not talent — it was doing a little, every single day.",
      glossary: [
        { word: "decided", partOfSpeech: "verb", definition: "החליט, קיבל החלטה", example: "She decided to study.", translation: "החליט" },
        { word: "look up", partOfSpeech: "phrasal verb", definition: "לחפש מידע (למשל מילה במילון)", example: "Look up the word.", translation: "לחפש (במילון)" },
        { word: "surprising", partOfSpeech: "adjective", definition: "מפתיע, לא צפוי", example: "It was a surprising result.", translation: "מפתיע" },
      ],
      questions: [
        { question: "What did the writer do every day?", options: ["Watch a film", "Read a short article", "Write a letter", "Take a class"], correctIndex: 1, explanation: "'read one short article in English every day'." },
        { question: "What was the 'secret' of the progress?", options: ["Natural talent", "Living abroad", "A little practice every day", "An expensive course"], correctIndex: 2, explanation: "'doing a little, every single day'." },
      ],
    },
    {
      title: "The New Neighbor (השכן החדש)",
      text: "A new family moved into the flat next door last month. At first we only said hello in the hall. Then one evening their power went out, so we invited them for dinner. Now we are good friends, and our children play together every weekend. Sometimes the best friendships start by accident.",
      glossary: [
        { word: "moved", partOfSpeech: "verb", definition: "עבר לגור במקום חדש", example: "They moved to a new city.", translation: "עבר דירה" },
        { word: "invited", partOfSpeech: "verb", definition: "הזמין מישהו לבוא", example: "We invited them for dinner.", translation: "הזמין" },
        { word: "by accident", partOfSpeech: "phrase", definition: "במקרה, לא בכוונה", example: "We met by accident.", translation: "במקרה" },
      ],
      questions: [
        { question: "Why did they invite the neighbors for dinner?", options: ["It was a holiday", "Their power went out", "It was a birthday", "They were bored"], correctIndex: 1, explanation: "'their power went out, so we invited them'." },
        { question: "What is the main message of the text?", options: ["Neighbors are annoying", "Good friendships can start by accident", "Dinner is important", "Always lock your door"], correctIndex: 1, explanation: "המשפט האחרון מסכם זאת." },
      ],
    },
  ],
  B2: [
    {
      title: "Working From Home (עבודה מהבית)",
      text: "When remote work became common, many people expected it to be a temporary arrangement. Instead, it reshaped how companies think about offices altogether. Employees gained flexibility and saved hours of commuting, yet some struggled to separate their work from their personal lives. The challenge now is not whether to work remotely, but how to do it well.",
      glossary: [
        { word: "temporary", partOfSpeech: "adjective", definition: "זמני, לא קבוע", example: "It was a temporary job.", translation: "זמני" },
        { word: "flexibility", partOfSpeech: "noun", definition: "גמישות — חופש לבחור מתי ואיך לפעול", example: "Remote work offers flexibility.", translation: "גמישות" },
        { word: "struggled", partOfSpeech: "verb", definition: "התקשה, נאבק בקושי", example: "He struggled to focus.", translation: "התקשה/נאבק" },
      ],
      questions: [
        { question: "What did people first expect about remote work?", options: ["It would be permanent", "It would be temporary", "It would fail", "It would be illegal"], correctIndex: 1, explanation: "'expected it to be a temporary arrangement'." },
        { question: "According to the text, what is the challenge now?", options: ["Whether to work remotely", "How to do it well", "How to ban it", "Where to buy a desk"], correctIndex: 1, explanation: "'not whether... but how to do it well'." },
      ],
    },
    {
      title: "The Price of Convenience (מחיר הנוחות)",
      text: "Same-day delivery feels almost magical: you order something in the morning and it arrives by evening. But that speed comes at a cost. Behind it lies a network of warehouses, drivers under pressure, and packaging that often ends up as waste. Convenience is rarely free — someone, somewhere, pays for it.",
      glossary: [
        { word: "delivery", partOfSpeech: "noun", definition: "הבאת חבילה או מוצר ליעד", example: "The delivery arrived late.", translation: "משלוח" },
        { word: "pressure", partOfSpeech: "noun", definition: "לחץ — דרישה כבדה או מתח", example: "He works under pressure.", translation: "לחץ" },
        { word: "waste", partOfSpeech: "noun", definition: "פסולת — דבר שנזרק ולא בשימוש", example: "We must reduce waste.", translation: "פסולת" },
      ],
      questions: [
        { question: "What is the main idea of the text?", options: ["Delivery is magical", "Convenience has hidden costs", "Shopping is fun", "Warehouses are large"], correctIndex: 1, explanation: "'Convenience is rarely free'." },
        { question: "What is mentioned as a hidden cost?", options: ["Higher prices only", "Packaging waste", "Slower service", "Fewer choices"], correctIndex: 1, explanation: "'packaging that often ends up as waste'." },
      ],
    },
  ],
  C1: [
    {
      title: "The Illusion of Progress (אשליית ההתקדמות)",
      text: "Language apps are remarkably good at making us feel productive. We collect streaks, badges and points, and the little rush of completing a lesson convinces us we are mastering the language. Yet fluency is built elsewhere — in messy conversations, in texts we only half understand, in the discomfort of speaking before we feel ready. The game is a doorway, not the room itself.",
      glossary: [
        { word: "remarkably", partOfSpeech: "adverb", definition: "באופן יוצא דופן, בצורה בולטת", example: "She is remarkably calm.", translation: "באופן יוצא דופן" },
        { word: "fluency", partOfSpeech: "noun", definition: "שטף — היכולת לדבר בקלות וברציפות", example: "He speaks with fluency.", translation: "שטף (בשפה)" },
        { word: "discomfort", partOfSpeech: "noun", definition: "אי-נוחות, תחושה לא נעימה", example: "A little discomfort helps you grow.", translation: "אי-נוחות" },
      ],
      questions: [
        { question: "What does the writer say apps are good at?", options: ["Teaching grammar perfectly", "Making us feel productive", "Replacing teachers", "Translating texts"], correctIndex: 1, explanation: "'good at making us feel productive'." },
        { question: "According to the text, fluency is built mainly through…", options: ["Streaks and badges", "Real, messy use of the language", "Completing more lessons", "Collecting points"], correctIndex: 1, explanation: "השטף נבנה בשימוש אמיתי בשפה." },
      ],
    },
    {
      title: "Attention as Currency (תשומת לב כמטבע)",
      text: "We often say that the best things in life are free, but our attention has quietly become one of the most valuable resources of the age. Platforms compete not for our money but for our minutes, designing every notification to pull us back. To reclaim our focus is, in a sense, to decide what kind of life we want to lead.",
      glossary: [
        { word: "valuable", partOfSpeech: "adjective", definition: "בעל ערך רב", example: "Time is valuable.", translation: "בעל ערך" },
        { word: "compete", partOfSpeech: "verb", definition: "להתחרות — להיאבק כדי לזכות במשהו", example: "Companies compete for customers.", translation: "להתחרות" },
        { word: "reclaim", partOfSpeech: "verb", definition: "להחזיר לעצמך משהו שאבד", example: "He tried to reclaim his time.", translation: "להשיב/לתבוע בחזרה" },
      ],
      questions: [
        { question: "What do platforms mainly compete for, according to the text?", options: ["Our money", "Our minutes/attention", "Our friends", "Our data only"], correctIndex: 1, explanation: "'compete not for our money but for our minutes'." },
        { question: "What does reclaiming focus mean here?", options: ["Earning more money", "Deciding what life to lead", "Buying new apps", "Working longer hours"], correctIndex: 1, explanation: "'to decide what kind of life we want to lead'." },
      ],
    },
  ],
  C2: [
    {
      title: "The Tyranny of Metrics (עריצות המדדים)",
      text: "There is a seductive comfort in numbers. A metric promises objectivity, a clean verdict untouched by human bias. Yet what we choose to measure inevitably shapes what we come to value, and the unmeasurable — kindness, originality, depth — quietly slips from view. The danger is not measurement itself, but our willingness to mistake the measurable for the meaningful.",
      glossary: [
        { word: "seductive", partOfSpeech: "adjective", definition: "מפתה — מושך באופן שקשה לעמוד בפניו", example: "It is a seductive idea.", translation: "מפתה" },
        { word: "objectivity", partOfSpeech: "noun", definition: "אובייקטיביות — חוסר משוא פנים", example: "Science values objectivity.", translation: "אובייקטיביות" },
        { word: "inevitably", partOfSpeech: "adverb", definition: "באופן בלתי-נמנע", example: "Change inevitably brings risk.", translation: "באופן בלתי-נמנע" },
      ],
      questions: [
        { question: "What does the writer warn against?", options: ["Using any numbers", "Mistaking the measurable for the meaningful", "Trusting science", "Avoiding all bias"], correctIndex: 1, explanation: "המשפט האחרון מנסח את האזהרה." },
        { question: "What 'slips from view' according to the text?", options: ["Profits", "The unmeasurable, like kindness", "Deadlines", "Numbers"], correctIndex: 1, explanation: "'the unmeasurable — kindness, originality, depth'." },
      ],
    },
    {
      title: "On Boredom (על השעמום)",
      text: "We have grown so adept at banishing boredom that we have forgotten what it was for. Those empty, restless moments once nudged the mind toward daydream and invention; now they are filled instantly with a glowing screen. Perhaps creativity was never the enemy of idleness but its quiet offspring, and in eliminating one we have unwittingly starved the other.",
      glossary: [
        { word: "adept", partOfSpeech: "adjective", definition: "מיומן מאוד במשהו", example: "She is adept at solving puzzles.", translation: "מיומן" },
        { word: "idleness", partOfSpeech: "noun", definition: "בטלה — מצב של חוסר מעש", example: "He enjoys moments of idleness.", translation: "בטלה/חוסר מעש" },
        { word: "unwittingly", partOfSpeech: "adverb", definition: "מבלי משים, ללא כוונה", example: "He unwittingly caused harm.", translation: "מבלי משים" },
      ],
      questions: [
        { question: "What does the writer suggest boredom once did?", options: ["Wasted time", "Nudged the mind toward invention", "Caused illness", "Made people lazy forever"], correctIndex: 1, explanation: "'nudged the mind toward daydream and invention'." },
        { question: "What is creativity called in relation to idleness?", options: ["Its enemy", "Its quiet offspring", "Its replacement", "Its opposite"], correctIndex: 1, explanation: "'creativity... its quiet offspring'." },
      ],
    },
  ],
};

// --- LISTENING: transcript (En) + questions (2) ---
export const LISTENINGS = {
  A1: [
    {
      transcript: "Hi, I'm Dan. I have a sister and a dog. We live in a small house near the park.",
      questions: [
        { question: "What is the speaker's name?", options: ["Sam", "Dan", "Tom", "Ben"], correctIndex: 1, explanation: "'I'm Dan'." },
        { question: "Where do they live?", options: ["Near the sea", "Near the park", "In the city center", "On a farm"], correctIndex: 1, explanation: "'a small house near the park'." },
      ],
    },
    {
      transcript: "Good morning. The shop opens at nine and closes at six. We are closed on Sunday.",
      questions: [
        { question: "What time does the shop open?", options: ["At eight", "At nine", "At six", "At ten"], correctIndex: 1, explanation: "'opens at nine'." },
        { question: "When is the shop closed?", options: ["On Sunday", "On Monday", "On Friday", "Never"], correctIndex: 0, explanation: "'closed on Sunday'." },
      ],
    },
  ],
  A2: [
    {
      transcript: "Hello, this is the dentist's office. Your appointment is on Tuesday at half past three. Please call us if you cannot come.",
      questions: [
        { question: "What day is the appointment?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correctIndex: 1, explanation: "'on Tuesday'." },
        { question: "What time is the appointment?", options: ["3:00", "3:15", "3:30", "3:45"], correctIndex: 2, explanation: "'half past three' = 3:30." },
      ],
    },
    {
      transcript: "Attention passengers. The train to Haifa will leave from platform two, not platform four. We are sorry for the change.",
      questions: [
        { question: "Where is the train to Haifa now leaving from?", options: ["Platform two", "Platform four", "Platform one", "Platform three"], correctIndex: 0, explanation: "'from platform two'." },
        { question: "Why is there an announcement?", options: ["The train is late", "The platform changed", "The train is cancelled", "Tickets are sold out"], correctIndex: 1, explanation: "'not platform four' — שינוי רציף." },
      ],
    },
  ],
  B1: [
    {
      transcript: "Thanks for calling the clinic. We're open from nine to five, Monday to Friday. If you'd like to book an appointment, please press one and leave your name.",
      questions: [
        { question: "What kind of place is this?", options: ["A shop", "A clinic", "A school", "A bank"], correctIndex: 1, explanation: "'calling the clinic'." },
        { question: "What should you press to book an appointment?", options: ["One", "Two", "Three", "The star key"], correctIndex: 0, explanation: "'press one'." },
      ],
    },
    {
      transcript: "Hi, it's Maya. I'm running about ten minutes late because of traffic. Could you order me a coffee? I'll be there soon.",
      questions: [
        { question: "Why is Maya late?", options: ["She is sick", "Because of traffic", "She forgot", "She is at work"], correctIndex: 1, explanation: "'because of traffic'." },
        { question: "What does Maya ask for?", options: ["A coffee", "A taxi", "A menu", "Help with work"], correctIndex: 0, explanation: "'order me a coffee'." },
      ],
    },
  ],
  B2: [
    {
      transcript: "Welcome aboard. Before takeoff, please make sure your seatbelt is fastened and your tray table is closed. Wifi will be available once we reach cruising altitude.",
      questions: [
        { question: "When will wifi be available?", options: ["Before takeoff", "At cruising altitude", "Never", "During landing"], correctIndex: 1, explanation: "'once we reach cruising altitude'." },
        { question: "What are passengers asked to do?", options: ["Stand up", "Fasten seatbelts", "Open windows", "Leave the plane"], correctIndex: 1, explanation: "'seatbelt is fastened'." },
      ],
    },
    {
      transcript: "In today's meeting we'll review last quarter's results, discuss the marketing budget, and finally decide on the launch date. Let's try to keep each item under fifteen minutes.",
      questions: [
        { question: "What will be decided in the meeting?", options: ["The launch date", "New hires", "Office location", "Holiday dates"], correctIndex: 0, explanation: "'decide on the launch date'." },
        { question: "How long should each item take?", options: ["Five minutes", "Ten minutes", "Under fifteen minutes", "An hour"], correctIndex: 2, explanation: "'under fifteen minutes'." },
      ],
    },
  ],
  C1: [
    {
      transcript: "While the committee broadly welcomed the proposal, several members raised concerns about the timeline, arguing that a phased rollout would be far less disruptive than the sweeping changes originally suggested.",
      questions: [
        { question: "What was the committee's overall reaction?", options: ["They rejected it", "They broadly welcomed it", "They ignored it", "They postponed it"], correctIndex: 1, explanation: "'broadly welcomed the proposal'." },
        { question: "What did some members prefer?", options: ["Sweeping changes", "Cancelling the project", "A phased rollout", "A larger budget"], correctIndex: 2, explanation: "'a phased rollout would be far less disruptive'." },
      ],
    },
    {
      transcript: "The findings, though preliminary, suggest a correlation between sleep quality and memory. The researchers stress, however, that correlation should not be mistaken for causation, and that further studies are needed.",
      questions: [
        { question: "What do the findings suggest?", options: ["A cure for insomnia", "A link between sleep and memory", "That sleep is unimportant", "Nothing at all"], correctIndex: 1, explanation: "'a correlation between sleep quality and memory'." },
        { question: "What do the researchers warn?", options: ["Sleep more", "Correlation is not causation", "The study is final", "Memory cannot improve"], correctIndex: 1, explanation: "'correlation should not be mistaken for causation'." },
      ],
    },
  ],
  C2: [
    {
      transcript: "Notwithstanding the optimism in the press release, the underlying figures paint a more sober picture: growth has stalled, margins are thinning, and the much-touted expansion has yet to materialize.",
      questions: [
        { question: "How do the underlying figures compare to the press release?", options: ["More optimistic", "More sober/negative", "Identical", "Irrelevant"], correctIndex: 1, explanation: "'a more sober picture'." },
        { question: "What is said about the expansion?", options: ["It succeeded", "It has yet to materialize", "It was cancelled", "It doubled profits"], correctIndex: 1, explanation: "'has yet to materialize'." },
      ],
    },
    {
      transcript: "The lecturer argued, somewhat provocatively, that our obsession with productivity has hollowed out leisure itself, transforming even rest into another task to be optimized and measured.",
      questions: [
        { question: "What is the lecturer's main claim?", options: ["Productivity is always good", "Obsession with productivity has spoiled leisure", "Rest is impossible", "Measurement is useless"], correctIndex: 1, explanation: "'hollowed out leisure itself'." },
        { question: "What has rest been transformed into?", options: ["A holiday", "Another task to be optimized", "A reward", "A memory"], correctIndex: 1, explanation: "'another task to be optimized and measured'." },
      ],
    },
  ],
};

// --- SPEAKING: pools of sentences per level; generator groups them into sets. ---
export const SPEAKING_SENTENCES = {
  A1: [
    { text: "Good morning! How are you?", translation: "בוקר טוב! מה שלומך?" },
    { text: "My name is Maya and I live in Tel Aviv.", translation: "שמי מאיה ואני גרה בתל אביב." },
    { text: "I would like a cup of coffee, please.", translation: "אני רוצה כוס קפה, בבקשה." },
    { text: "Where is the train station?", translation: "איפה תחנת הרכבת?" },
    { text: "This is my family. I have two brothers.", translation: "זאת המשפחה שלי. יש לי שני אחים." },
    { text: "I am happy to meet you.", translation: "אני שמח להכיר אותך." },
    { text: "What time is it now?", translation: "מה השעה עכשיו?" },
    { text: "I go to school every day.", translation: "אני הולך לבית הספר כל יום." },
    { text: "The weather is nice today.", translation: "מזג האוויר נעים היום." },
  ],
  A2: [
    { text: "Could you help me find this address?", translation: "תוכל לעזור לי למצוא את הכתובת הזו?" },
    { text: "I usually wake up at seven o'clock.", translation: "אני בדרך כלל מתעורר בשבע." },
    { text: "How much does this ticket cost?", translation: "כמה עולה הכרטיס הזה?" },
    { text: "I went to the beach last weekend.", translation: "הלכתי לים בסוף השבוע שעבר." },
    { text: "Can I pay by credit card?", translation: "אפשר לשלם בכרטיס אשראי?" },
    { text: "I think the blue one is nicer.", translation: "אני חושב שהכחול יפה יותר." },
    { text: "We are planning a trip to Greece.", translation: "אנחנו מתכננים טיול ליוון." },
    { text: "Excuse me, is this seat free?", translation: "סליחה, המקום הזה פנוי?" },
    { text: "I'd like to book a table for two.", translation: "אשמח להזמין שולחן לשניים." },
  ],
  B1: [
    { text: "I've been learning English for about two years.", translation: "אני לומד אנגלית כבר בערך שנתיים." },
    { text: "Could you tell me how to get to the station?", translation: "תוכל לומר לי איך להגיע לתחנה?" },
    { text: "I think this restaurant is better than the other one.", translation: "אני חושב שהמסעדה הזו טובה יותר מהשנייה." },
    { text: "If I have time tomorrow, I'll call you.", translation: "אם יהיה לי זמן מחר, אתקשר אליך." },
    { text: "I'm not sure I agree with that.", translation: "אני לא בטוח שאני מסכים עם זה." },
    { text: "Would you mind opening the window?", translation: "אכפת לך לפתוח את החלון?" },
    { text: "I've already finished the report.", translation: "כבר סיימתי את הדוח." },
    { text: "Let me know if you need anything.", translation: "תעדכן אותי אם אתה צריך משהו." },
    { text: "I was going to leave, but it started to rain.", translation: "התכוונתי לצאת, אבל התחיל לרדת גשם." },
  ],
  B2: [
    { text: "I'd appreciate it if you could send me the details.", translation: "אודה לך אם תוכל לשלוח לי את הפרטים." },
    { text: "As far as I'm concerned, the plan makes sense.", translation: "מבחינתי, התוכנית הגיונית." },
    { text: "We should have booked the tickets earlier.", translation: "היינו צריכים להזמין את הכרטיסים מוקדם יותר." },
    { text: "I'm looking forward to hearing your feedback.", translation: "אני מצפה לשמוע את המשוב שלך." },
    { text: "There's no point in arguing about it now.", translation: "אין טעם להתווכח על זה עכשיו." },
    { text: "It depends on how much time we have.", translation: "זה תלוי בכמה זמן יש לנו." },
    { text: "I'd rather discuss this in person.", translation: "אני מעדיף לדון בזה פנים אל פנים." },
    { text: "Could you clarify what you mean by that?", translation: "תוכל להבהיר למה אתה מתכוון?" },
    { text: "On the whole, the project went well.", translation: "באופן כללי, הפרויקט הלך טוב." },
  ],
  C1: [
    { text: "Despite the challenges, I'm confident we can meet the deadline.", translation: "למרות האתגרים, אני בטוח שנוכל לעמוד בלוח הזמנים." },
    { text: "I'd argue that the benefits clearly outweigh the risks.", translation: "אני טוען שהיתרונות עולים בבירור על הסיכונים." },
    { text: "Let's not jump to conclusions before we've seen the data.", translation: "בוא לא נקפוץ למסקנות לפני שראינו את הנתונים." },
    { text: "That's a fair point, but I see it slightly differently.", translation: "זו נקודה הוגנת, אבל אני רואה את זה קצת אחרת." },
    { text: "We need to weigh up the long-term implications.", translation: "עלינו לשקול את ההשלכות ארוכות הטווח." },
    { text: "I'm inclined to think we should wait.", translation: "אני נוטה לחשוב שכדאי לנו לחכות." },
    { text: "To put it bluntly, the strategy isn't working.", translation: "אם לומר זאת בכנות, האסטרטגיה לא עובדת." },
    { text: "Bear in mind that circumstances may change.", translation: "קח בחשבון שהנסיבות עשויות להשתנות." },
    { text: "I'd be hesitant to commit without more information.", translation: "הייתי מהסס להתחייב ללא מידע נוסף." },
  ],
  C2: [
    { text: "I'm not entirely convinced that the premise holds up.", translation: "אני לא משוכנע לחלוטין שההנחה מחזיקה מים." },
    { text: "We should be wary of conflating correlation with causation.", translation: "כדאי שניזהר מלערבב בין מתאם לסיבתיות." },
    { text: "It strikes me as a somewhat reductive interpretation.", translation: "זה נראה לי פירוש מצמצם משהו." },
    { text: "Let's tease apart the various strands of the argument.", translation: "בוא נפריד בין הקווים השונים של הטיעון." },
    { text: "In hindsight, the decision was rather short-sighted.", translation: "בדיעבד, ההחלטה הייתה קצרת-ראות למדי." },
    { text: "I'd venture that the consensus is beginning to shift.", translation: "אני מעז לשער שהקונצנזוס מתחיל להשתנות." },
    { text: "That nuance tends to get lost in the headlines.", translation: "הניואנס הזה נוטה ללכת לאיבוד בכותרות." },
    { text: "We mustn't lose sight of the broader context.", translation: "אסור לנו לאבד את ההקשר הרחב יותר." },
    { text: "It's a compelling case, albeit not a watertight one.", translation: "זה טיעון משכנע, גם אם לא חסין לחלוטין." },
  ],
};
