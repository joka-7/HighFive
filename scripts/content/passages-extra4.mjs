// Round 4 of additional Reading, Listening and Speaking content.

const R = (title, text, glossary, questions) => ({ title, text, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, options, correctIndex, explanation) => ({ question, options, correctIndex, explanation });
const L = (transcript, questions) => ({ transcript, questions });

export const MORE_READINGS4 = {
  A1: [
    R("In the Kitchen (במטבח)",
      "My father cooks dinner. He uses a big pot. I help him. I wash the tomatoes and put them on a plate. The kitchen smells very good.",
      [g("pot", "noun", "כלי בישול עמוק", "A big pot.", "סיר"), g("wash", "verb", "לנקות במים", "Wash the fruit.", "לשטוף/לרחוץ"), g("smell", "verb", "להריח", "It smells good.", "להריח")],
      [q("Who cooks dinner?", ["The mother", "The father", "The child", "A friend"], 1, "'My father cooks dinner'."), q("What does the child wash?", ["The plates", "The tomatoes", "The pot", "The floor"], 1, "'I wash the tomatoes'.")]),
    R("A Walk in Winter (טיול בחורף)",
      "It is winter. There is snow on the street. I wear a warm coat and a hat. My friend and I make a snowman. Then we drink hot tea at home.",
      [g("winter", "noun", "העונה הקרה", "Cold winter.", "חורף"), g("warm", "adjective", "חמים", "A warm coat.", "חמים"), g("snowman", "noun", "בובת שלג", "Build a snowman.", "איש שלג")],
      [q("What is the weather?", ["Hot", "Snowy", "Rainy", "Windy"], 1, "'There is snow on the street'."), q("What do they do?", ["Swim", "Make a snowman", "Run", "Sleep"], 1, "'make a snowman'.")]),
  ],
  A2: [
    R("Learning to Cook (ללמוד לבשל)",
      "When I moved out, I could only make toast. I felt embarrassed, so I started watching cooking videos. I made many mistakes — burnt rice, salty soup — but slowly I improved. Now I can cook for my friends, and I really enjoy it.",
      [g("embarrassed", "adjective", "נבוך", "I felt embarrassed.", "נבוך"), g("mistakes", "noun", "טעויות", "I made mistakes.", "טעויות"), g("improve", "verb", "להשתפר", "I want to improve.", "להשתפר")],
      [q("What could the writer make at first?", ["Soup", "Only toast", "Cakes", "Rice"], 1, "'I could only make toast'."), q("How did the writer learn?", ["A class", "Watching cooking videos", "A book", "A friend"], 1, "'watching cooking videos'.")]),
    R("The Neighbour's Cat (החתול של השכן)",
      "Every evening my neighbour's cat visits our garden. At first my mother was not happy, but now she leaves out a little food. The cat is not ours, yet it feels like part of the family.",
      [g("visits", "verb", "מבקר", "The cat visits us.", "מבקר"), g("leaves out", "phrase", "משאיר בחוץ", "She leaves out food.", "משאירה בחוץ"), g("part", "noun", "חלק", "Part of the team.", "חלק")],
      [q("Where does the cat visit?", ["The kitchen", "Our garden", "The street", "The roof"], 1, "'visits our garden'."), q("How does the mother feel now?", ["Angry", "She leaves out food for it", "Afraid", "Sad"], 1, "'now she leaves out a little food'.")]),
  ],
  B1: [
    R("The Library Card (כרטיס הספרייה)",
      "I hadn't been to a library in years, assuming everything was online. On a rainy afternoon I went in for shelter and left with three books and a card. There's a calm there you can't download — rows of quiet, and the freedom to wander without a screen telling you what to want.",
      [g("assuming", "verb", "מתוך הנחה", "Assuming it's true.", "בהנחה ש-"), g("shelter", "noun", "מחסה", "Seek shelter.", "מחסה"), g("wander", "verb", "לשוטט", "Wander the streets.", "לשוטט")],
      [q("Why had the writer stayed away from libraries?", ["No time", "Assuming everything was online", "Too far", "Too expensive"], 1, "'assuming everything was online'."), q("What did the writer value there?", ["Free wifi", "A calm you can't download", "New films", "A café"], 1, "'a calm there you can't download'.")]),
    R("Two Minutes Early (שתי דקות מוקדם)",
      "A mentor once told me to arrive two minutes early to everything. It sounded trivial, but it changed how people saw me. Being early signals respect for others' time, and it quietly removes the low hum of stress that comes from always rushing.",
      [g("mentor", "noun", "חונך, מדריך", "A wise mentor.", "חונך/מנטור"), g("trivial", "adjective", "פעוט, חסר חשיבות", "A trivial detail.", "פעוט"), g("signals", "verb", "מאותת, מעביר מסר", "It signals trust.", "מאותת")],
      [q("What was the mentor's advice?", ["Work late", "Arrive two minutes early", "Speak less", "Dress well"], 1, "'arrive two minutes early'."), q("What does being early signal?", ["Wealth", "Respect for others' time", "Fear", "Boredom"], 1, "'signals respect for others' time'.")]),
  ],
  B2: [
    R("The Tyranny of the New (עריצות החדש)",
      "We treat 'new' as a synonym for 'better', upgrading devices and habits at the first opportunity. Yet much of what endures does so because it has quietly passed thousands of tests we never see. Before discarding the old, it's worth asking what problem the new version actually solves — and whether we had that problem at all.",
      [g("synonym", "noun", "מילה נרדפת", "A synonym for happy.", "מילה נרדפת"), g("endures", "verb", "שורד לאורך זמן", "The classic endures.", "שורד/מתקיים"), g("discarding", "verb", "השלכה, זריקה", "Before discarding it.", "השלכה")],
      [q("What do we treat 'new' as a synonym for?", ["Cheap", "Better", "Rare", "Hard"], 1, "'a synonym for better'."), q("What does the writer suggest asking?", ["What it costs", "What problem the new version solves", "Who made it", "When it ships"], 1, "'what problem the new version actually solves'.")]),
    R("Disagreeing Well (להתווכח כמו שצריך)",
      "The goal of an argument should be to get closer to the truth, not to win. That sounds obvious, yet most disagreements quickly become contests of ego. The most useful question you can ask isn't 'How is he wrong?' but 'What would he have to be right about for his view to make sense?'",
      [g("argument", "noun", "ויכוח/טיעון", "A heated argument.", "ויכוח/טיעון"), g("contests", "noun", "תחרויות", "Contests of ego.", "תחרויות"), g("sense", "noun", "היגיון, מובן", "It makes sense.", "היגיון/מובן")],
      [q("What should the goal of an argument be?", ["To win", "To get closer to the truth", "To impress", "To end fast"], 1, "'to get closer to the truth, not to win'."), q("What is the 'most useful question'?", ["How is he wrong?", "What would he have to be right about?", "Who agrees?", "When did it start?"], 1, "'What would he have to be right about...'.")]),
  ],
  C1: [
    R("The Wisdom of Forgetting (חוכמת השכחה)",
      "We tend to mourn forgetting as pure loss, yet a memory that recorded everything would be a kind of prison. Forgetting is not merely decay; it is the mind's editor, discarding the trivial so the meaningful can surface. To remember well, paradoxically, is to forget skilfully.",
      [g("mourn", "verb", "להתאבל, לקונן על", "Mourn a loss.", "להתאבל/לקונן"), g("decay", "noun", "ריקבון, התפוררות", "Slow decay.", "ריקבון/דעיכה"), g("surface", "verb", "לעלות אל פני השטח", "Memories surface.", "לעלות/לצוף")],
      [q("How do we usually view forgetting?", ["As helpful", "As pure loss", "As rare", "As a skill"], 1, "'mourn forgetting as pure loss'."), q("What role does forgetting play, per the text?", ["Decay only", "The mind's editor", "A prison", "A flaw"], 1, "'it is the mind's editor'.")]),
    R("The Specialist's Dilemma (דילמת המומחה)",
      "Modern knowledge rewards the narrow: to advance, one must dig an ever-deeper hole in an ever-smaller plot. The danger is a society of brilliant specialists who cannot speak to one another, each fluent in a private language. Real understanding may depend less on knowing more and more about less and less, and more on the rarer art of connection.",
      [g("narrow", "adjective", "צר, מצומצם", "A narrow focus.", "צר/מצומצם"), g("plot", "noun", "חלקת אדמה", "A small plot.", "חלקה"), g("fluent", "adjective", "שולט בשטף", "Fluent in French.", "שולט/רהוט")],
      [q("What does modern knowledge reward?", ["Breadth", "The narrow specialist", "Speed", "Memory"], 1, "'rewards the narrow'."), q("What may real understanding depend on?", ["Knowing more about less", "The art of connection", "Faster work", "More degrees"], 1, "'the rarer art of connection'.")]),
  ],
  C2: [
    R("The Vanity of Originality (יהירות המקוריות)",
      "The modern artist is told, above all, to be original — yet originality pursued directly tends to curdle into mere novelty, a frantic search for the unsaid that mistakes strangeness for depth. The paradox is that the most enduring work often arises not from straining to differ, but from engaging so honestly with tradition that something genuinely new escapes, almost by accident.",
      [g("curdle", "verb", "להתקלקל, להידרדר (מטאפורי)", "Joy curdled into fear.", "להידרדר/להחמיץ"), g("frantic", "adjective", "קדחתני, נואש", "A frantic search.", "קדחתני/נואש"), g("straining", "verb", "מתאמץ במאמץ רב", "Straining to hear.", "מתאמץ")],
      [q("What does originality pursued directly tend to become?", ["Depth", "Mere novelty", "Tradition", "Silence"], 1, "'curdle into mere novelty'."), q("Where does enduring work often arise from?", ["Straining to differ", "Honest engagement with tradition", "Pure accident", "Copying"], 1, "'engaging so honestly with tradition'.")]),
    R("On Certainty (על הוודאות)",
      "Certainty is psychologically comfortable and intellectually dangerous in almost equal measure. The mind craves a settled answer and will often manufacture one rather than endure the discomfort of suspension. But the willingness to hold a question open — to say 'I don't yet know' without flinching — may be the truest mark of a disciplined intelligence.",
      [g("craves", "verb", "משתוקק, כמֵה", "Craves attention.", "משתוקק/כמה"), g("manufacture", "verb", "לייצר, להמציא", "Manufacture an excuse.", "לייצר/להמציא"), g("flinching", "verb", "נרתע, נמלט", "Without flinching.", "נרתע/מהסס")],
      [q("How is certainty described?", ["Always useful", "Comfortable but dangerous", "Rare", "Impossible"], 1, "'comfortable and intellectually dangerous'."), q("What is called the mark of disciplined intelligence?", ["Quick answers", "Holding a question open", "Confidence", "Memory"], 1, "'the willingness to hold a question open'.")]),
  ],
};

export const MORE_LISTENINGS4 = {
  A1: [
    L("Good afternoon. It is time for lunch. Today we have soup and bread. Please wash your hands first.",
      [q("What is for lunch?", ["Rice", "Soup and bread", "Cake", "Fish"], 1, "'soup and bread'."), q("What should you do first?", ["Sit down", "Wash your hands", "Drink water", "Sing"], 1, "'wash your hands first'.")]),
    L("Hello, I'm Tom. I like football and music. My favourite colour is green. I have a brother named Sam.",
      [q("What does Tom like?", ["Art and dance", "Football and music", "Books only", "Cooking"], 1, "'I like football and music'."), q("What is his brother's name?", ["Tom", "Sam", "Dan", "Ben"], 1, "'a brother named Sam'.")]),
  ],
  A2: [
    L("Hi, this is the pharmacy. Your medicine is ready. Take one tablet twice a day, after meals. We close at seven.",
      [q("How often should the medicine be taken?", ["Once a day", "Twice a day", "Three times", "Every hour"], 1, "'twice a day'."), q("When should it be taken?", ["Before meals", "After meals", "At night only", "Anytime"], 1, "'after meals'.")]),
    L("Welcome to the gym. New members get a free class on Monday. Please bring clean shoes and a water bottle.",
      [q("When is the free class?", ["Sunday", "Monday", "Friday", "Saturday"], 1, "'a free class on Monday'."), q("What should members bring?", ["A towel only", "Clean shoes and a water bottle", "Money", "A friend"], 1, "'clean shoes and a water bottle'.")]),
  ],
  B1: [
    L("Hello, this is the bank. We noticed unusual activity on your card, so we've paused it for safety. Please call us back to confirm it was you.",
      [q("Why did the bank pause the card?", ["It expired", "Unusual activity, for safety", "No money", "A request"], 1, "'unusual activity... paused it for safety'."), q("What should the customer do?", ["Visit a branch", "Call back to confirm", "Ignore it", "Get a new card"], 1, "'call us back to confirm'.")]),
    L("Quick reminder: the group project is due Friday, not Thursday — I got that wrong in the last email. Sorry for the confusion. Same submission link as before.",
      [q("When is the project actually due?", ["Wednesday", "Thursday", "Friday", "Monday"], 2, "'due Friday, not Thursday'."), q("Why the reminder?", ["A new project", "The speaker gave the wrong date before", "A new link", "It's cancelled"], 1, "'I got that wrong in the last email'.")]),
  ],
  B2: [
    L("Before questions, let me preempt a common one. Yes, the app collects usage data, but it's anonymised and never sold. We use it only to decide which features to keep and which to drop.",
      [q("What does the app collect?", ["Nothing", "Anonymised usage data", "Bank details", "Photos"], 1, "'collects usage data, but it's anonymised'."), q("What is the data used for?", ["Selling", "Deciding which features to keep", "Advertising", "Nothing"], 1, "'which features to keep and which to drop'.")]),
    L("I'll give you the honest version. We can hit the deadline or we can hit the quality bar, but with the current team we probably can't do both. I'd rather slip a week than ship something we'll be apologising for.",
      [q("What is the trade-off described?", ["Cost vs speed", "Deadline vs quality", "Size vs weight", "Old vs new"], 1, "'hit the deadline or... the quality bar'."), q("What does the speaker prefer?", ["Ship on time", "Slip a week for quality", "Cancel", "Add no team"], 1, "'rather slip a week than ship something we'll be apologising for'.")]),
  ],
  C1: [
    L("Let me add a caveat to the success story. The programme worked, but it worked in one city, with a motivated team and generous funding. Whether it scales to places with none of those advantages is the question we still can't answer.",
      [q("Where did the programme work?", ["Everywhere", "In one city with favourable conditions", "Nowhere", "Online"], 1, "'in one city, with a motivated team and generous funding'."), q("What question remains?", ["The cost", "Whether it scales without those advantages", "Who led it", "When it started"], 1, "'Whether it scales to places with none of those advantages'.")]),
    L("I'd gently challenge the premise of the question. You're asking how to motivate people who don't care, but maybe the real issue is that we've designed work so it's hard to care about. Fix the work, and the motivation often takes care of itself.",
      [q("What does the speaker challenge?", ["The data", "The premise of the question", "The team", "The budget"], 1, "'challenge the premise of the question'."), q("What is the speaker's suggestion?", ["Pay more", "Fix the work itself", "Replace people", "Add rules"], 1, "'Fix the work, and the motivation often takes care of itself'.")]),
  ],
  C2: [
    L("I'd resist the tidy moral everyone wants to draw from this. The story is being retold as a triumph of persistence, but persistence was also what kept three failing projects alive for years. The same trait, different outcome — and luck deciding which name we give it.",
      [q("What 'tidy moral' is being drawn?", ["A triumph of persistence", "A failure of planning", "A lucky break", "A team effort"], 0, "'retold as a triumph of persistence'."), q("What complicates that moral?", ["Persistence also kept failing projects alive", "It was all luck", "No one persisted", "It was fast"], 0, "'persistence was also what kept three failing projects alive'.")]),
    L("There's a subtle sleight of hand in the report. It reports relative improvement, not absolute — a fifty percent rise sounds dramatic until you learn the baseline was two cases. Percentages, divorced from their denominators, are a storyteller's best friend.",
      [q("What does the report emphasise?", ["Absolute numbers", "Relative improvement", "Costs", "Dates"], 1, "'relative improvement, not absolute'."), q("Why is the 'fifty percent rise' misleading?", ["The baseline was tiny (two cases)", "It was made up", "It was negative", "It was old"], 0, "'the baseline was two cases'.")]),
  ],
};

export const MORE_SPEAKING4 = {
  A1: [
    { text: "I would like some bread, please.", translation: "אני רוצה קצת לחם, בבקשה." },
    { text: "My favourite animal is a dog.", translation: "החיה האהובה עליי היא כלב." },
    { text: "It is snowing outside.", translation: "יורד שלג בחוץ." },
    { text: "Can I sit here?", translation: "אפשר לשבת כאן?" },
  ],
  A2: [
    { text: "I think we should leave now.", translation: "אני חושב שכדאי לנו לצאת עכשיו." },
    { text: "Could you tell me the time, please?", translation: "תוכל לומר לי מה השעה, בבקשה?" },
    { text: "I'm not feeling very well today.", translation: "אני לא מרגיש כל כך טוב היום." },
    { text: "This is the best coffee in town.", translation: "זה הקפה הכי טוב בעיר." },
  ],
  B1: [
    { text: "I'd really appreciate your help with this.", translation: "אשמח מאוד לעזרתך בעניין הזה." },
    { text: "Let's meet outside the station at noon.", translation: "בוא ניפגש מחוץ לתחנה בצהריים." },
    { text: "I'm afraid there's been a small misunderstanding.", translation: "אני חושש שהייתה אי-הבנה קטנה." },
    { text: "Could we reschedule for another day?", translation: "נוכל לקבוע מחדש ליום אחר?" },
  ],
  B2: [
    { text: "I'd like to make sure we're on the same page.", translation: "אני רוצה לוודא שאנחנו מתואמים." },
    { text: "That's a reasonable request, and I'll look into it.", translation: "זו בקשה סבירה, ואבדוק אותה." },
    { text: "Let's weigh the pros and cons before deciding.", translation: "בוא נשקול את היתרונות והחסרונות לפני שנחליט." },
    { text: "I appreciate the feedback, even the critical parts.", translation: "אני מעריך את המשוב, גם את החלקים הביקורתיים." },
  ],
  C1: [
    { text: "I'd rather under-promise and over-deliver.", translation: "אני מעדיף להבטיח פחות ולספק יותר." },
    { text: "Let's separate what we know from what we assume.", translation: "בוא נפריד בין מה שאנחנו יודעים למה שאנחנו מניחים." },
    { text: "I see the merit in both approaches, honestly.", translation: "אני רואה את הערך בשתי הגישות, בכנות." },
    { text: "We should stress-test this before committing.", translation: "כדאי שנבחן את זה במצבי קיצון לפני שנתחייב." },
  ],
  C2: [
    { text: "I'd caution against reading too much into a single data point.", translation: "הייתי מזהיר מפני הסקת יתר מנקודת נתונים בודדת." },
    { text: "The proposal is compelling, but its assumptions are doing a lot of work.", translation: "ההצעה משכנעת, אך ההנחות שבבסיסה נושאות בנטל כבד." },
    { text: "Let's not mistake the absence of objections for genuine agreement.", translation: "בוא לא נטעה בין היעדר התנגדויות להסכמה אמיתית." },
    { text: "I'd frame that as a tension to manage, not a problem to solve.", translation: "הייתי מציג זאת כמתח לניהול, לא כבעיה לפתרון." },
  ],
};
