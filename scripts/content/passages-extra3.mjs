// Round 3 of additional Reading, Listening and Speaking content, merged into
// the pools by the generator.

const R = (title, text, glossary, questions) => ({ title, text, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, options, correctIndex, explanation) => ({ question, options, correctIndex, explanation });
const L = (transcript, questions) => ({ transcript, questions });

export const MORE_READINGS3 = {
  A1: [
    R("At the Doctor (אצל הרופא)",
      "I do not feel well. My head hurts and I am hot. My mother takes me to the doctor. The doctor says I must rest and drink water. Tomorrow I will feel better.",
      [g("hurts", "verb", "כואב", "My leg hurts.", "כואב"), g("doctor", "noun", "מי שמטפל בחולים", "See a doctor.", "רופא"), g("rest", "verb", "לנוח", "You must rest.", "לנוח")],
      [q("What is the problem?", ["A broken leg", "A headache and fever", "A cold foot", "Nothing"], 1, "'My head hurts and I am hot'."), q("What must the child do?", ["Run", "Rest and drink water", "Eat cake", "Go to school"], 1, "'rest and drink water'.")]),
    R("My Room (החדר שלי)",
      "This is my room. There is a bed, a desk and a small window. On the desk I have books and a lamp. I like my room because it is quiet.",
      [g("desk", "noun", "שולחן כתיבה", "Sit at the desk.", "שולחן כתיבה"), g("lamp", "noun", "מנורה", "Turn on the lamp.", "מנורה"), g("quiet", "adjective", "שקט", "A quiet room.", "שקט")],
      [q("What is on the desk?", ["A bed", "Books and a lamp", "A window", "A door"], 1, "'books and a lamp'."), q("Why does the writer like the room?", ["It is big", "It is quiet", "It is new", "It is warm"], 1, "'because it is quiet'.")]),
  ],
  A2: [
    R("A Change of Plans (שינוי בתוכניות)",
      "We wanted to go camping, but the weather forecast said heavy rain. So we changed our plans and visited a museum instead. It turned out to be a great day, and we learned a lot about history.",
      [g("forecast", "noun", "תחזית", "The weather forecast.", "תחזית"), g("instead", "adverb", "במקום", "Tea instead of coffee.", "במקום"), g("history", "noun", "היסטוריה", "Ancient history.", "היסטוריה")],
      [q("Why did they change plans?", ["No money", "Heavy rain forecast", "They were tired", "The car broke"], 1, "'the weather forecast said heavy rain'."), q("Where did they go instead?", ["Home", "A museum", "The beach", "A friend's house"], 1, "'visited a museum instead'.")]),
    R("My First Job (העבודה הראשונה שלי)",
      "My first job was in a small café. I had to wake up early and I was often tired. But I learned how to talk to customers and work in a team. The money was not great, but the experience was worth it.",
      [g("customers", "noun", "לקוחות", "Happy customers.", "לקוחות"), g("team", "noun", "צוות", "Work in a team.", "צוות"), g("worth", "adjective", "שווה את זה", "Worth the effort.", "שווה")],
      [q("Where was the first job?", ["A shop", "A small café", "An office", "A school"], 1, "'in a small café'."), q("What did the writer learn?", ["To cook", "To talk to customers and work in a team", "To drive", "To sing"], 1, "'talk to customers and work in a team'.")]),
  ],
  B1: [
    R("Digital Detox (ניקוי דיגיטלי)",
      "Last weekend I tried a 'digital detox' — no phone, no computer for two days. The first hours were strange; I kept reaching for a phone that wasn't there. But by Sunday I felt calmer and slept better. I won't quit technology, but I'll plan these breaks more often.",
      [g("detox", "noun", "ניקוי, היטהרות", "A digital detox.", "ניקוי/גמילה"), g("reaching", "verb", "מושיט יד אל", "Reaching for the phone.", "מושיט יד"), g("calmer", "adjective", "רגוע יותר", "I feel calmer.", "רגוע יותר")],
      [q("What was the 'digital detox'?", ["A new app", "No phone or computer for two days", "A diet", "A holiday abroad"], 1, "'no phone, no computer for two days'."), q("How did the writer feel by Sunday?", ["Worse", "Calmer and slept better", "Bored", "Angry"], 1, "'I felt calmer and slept better'.")]),
    R("The Kindness of Strangers (חסד של זרים)",
      "When my car broke down on a quiet road at night, I felt completely alone. Within minutes, a passing driver stopped, helped me push the car, and waited until help arrived. We never exchanged names. Small acts like that quietly restore your faith in people.",
      [g("broke down", "phrase", "התקלקל ונעצר", "The car broke down.", "התקלקל"), g("exchanged", "verb", "החליפו זה עם זה", "We exchanged numbers.", "החליפו"), g("restore", "verb", "להחזיר, לשקם", "Restore faith.", "לשקם/להשיב")],
      [q("What happened to the writer's car?", ["It was stolen", "It broke down at night", "It crashed", "It ran out of fuel"], 1, "'my car broke down on a quiet road at night'."), q("What did the stranger do?", ["Called the police", "Helped push and waited", "Drove away", "Sold a part"], 1, "'helped me push the car, and waited'.")]),
  ],
  B2: [
    R("The Skill of Saying No (האומנות של לומר לא)",
      "Many of us say yes too easily — to favours, meetings, and projects — and then resent the lack of time we are left with. Learning to decline politely is not selfish; it is what makes our yes meaningful. A calendar full of reluctant agreements helps no one.",
      [g("resent", "verb", "לחוש טינה או מרירות", "I resent the demand.", "לחוש טינה"), g("decline", "verb", "לסרב בנימוס", "Decline the offer.", "לסרב"), g("reluctant", "adjective", "מהסס, לא מרצון", "A reluctant yes.", "מהסס")],
      [q("What problem does the text describe?", ["Saying no too much", "Saying yes too easily", "Working too little", "Being rude"], 1, "'say yes too easily... resent the lack of time'."), q("Why is saying no valuable?", ["It is selfish", "It makes our yes meaningful", "It saves money", "It impresses others"], 1, "'what makes our yes meaningful'.")]),
    R("Reading the Reviews (לקרוא את הביקורות)",
      "Online reviews feel democratic, but they are easily skewed. The very happy and the very angry are far more likely to post than the quietly satisfied majority. A wise reader looks past the star rating to the patterns: recurring complaints matter more than a single furious paragraph.",
      [g("skewed", "verb", "מוטה, מעוות", "Skewed results.", "מוטה"), g("majority", "noun", "רוב", "The silent majority.", "רוב"), g("recurring", "adjective", "חוזר ונשנה", "A recurring problem.", "חוזר ונשנה")],
      [q("Who is most likely to post reviews?", ["The satisfied majority", "The very happy and very angry", "Experts", "No one"], 1, "'the very happy and the very angry'."), q("What should a wise reader focus on?", ["The star rating", "Recurring patterns", "One angry review", "The newest review"], 1, "'recurring complaints matter more'.")]),
  ],
  C1: [
    R("The Curse of Knowledge (קללת הידע)",
      "Once we know something well, it becomes almost impossible to imagine not knowing it. Experts forget what beginners find confusing, and so explain badly the very things they understand best. Good teaching, then, is partly an act of memory — recalling the difficulty of the path you have long since climbed.",
      [g("imagine", "verb", "לדמיין", "Hard to imagine.", "לדמיין"), g("confusing", "adjective", "מבלבל", "A confusing rule.", "מבלבל"), g("recalling", "verb", "להיזכר ב-", "Recalling the past.", "להיזכר")],
      [q("What becomes hard once we know something well?", ["Teaching fast", "Imagining not knowing it", "Learning more", "Forgetting it"], 1, "'impossible to imagine not knowing it'."), q("Good teaching is partly described as…", ["Speed", "An act of memory", "Strict rules", "Natural talent"], 1, "'partly an act of memory'.")]),
    R("Beautiful Constraints (אילוצים מועילים)",
      "We tend to see limits as the enemy of creativity, yet the opposite is often true. A poet bound by a strict form, a designer working within a tiny budget, a chef with only five ingredients — each is forced into invention precisely because the easy paths are closed. Freedom can paralyse; constraint can liberate.",
      [g("constraints", "noun", "אילוצים, מגבלות", "Tight constraints.", "אילוצים"), g("bound", "verb", "מחויב, כבול", "Bound by rules.", "כבול/מחויב"), g("paralyse", "verb", "לשתק", "Fear can paralyse.", "לשתק")],
      [q("How do we usually see limits?", ["As helpful", "As the enemy of creativity", "As rare", "As freedom"], 1, "'the enemy of creativity'."), q("What is the writer's paradox?", ["Freedom always helps", "Constraint can liberate", "Budgets ruin art", "Rules kill poems"], 1, "'constraint can liberate'.")]),
  ],
  C2: [
    R("The Authenticity Trap (מלכודת האותנטיות)",
      "We are urged endlessly to 'be authentic', as though the self were a fixed treasure to be uncovered rather than an ongoing act of creation. But the demand contains a paradox: the moment authenticity becomes a performance staged for others, it curdles into its opposite. Perhaps the most genuine people are those who never think to ask whether they are.",
      [g("urged", "verb", "נדחקים, מומרצים", "Urged to act.", "נדחקים"), g("staged", "verb", "מבוים, מוצג", "A staged photo.", "מבוים"), g("genuine", "adjective", "אמיתי, כן", "Genuine concern.", "אמיתי/כן")],
      [q("How is 'be authentic' usually framed?", ["As creation", "As uncovering a fixed self", "As impossible", "As selfish"], 1, "'a fixed treasure to be uncovered'."), q("What paradox does the writer note?", ["Authenticity is easy", "As a performance, it becomes its opposite", "Genuine people ask most", "Selves never change"], 1, "'staged for others, it curdles into its opposite'.")]),
    R("The Limits of Empathy (גבולות האמפתיה)",
      "Empathy is widely treated as an unalloyed good, but it has a quiet bias: it flows most easily toward the near, the visible, and the similar. The single named child moves us more than the statistic of thousands. A morality built on feeling alone will therefore be generous and unjust at once — vivid where it should be fair.",
      [g("unalloyed", "adjective", "טהור, ללא סייג", "Unalloyed joy.", "טהור/ללא סייג"), g("bias", "noun", "הטיה", "A hidden bias.", "הטיה"), g("vivid", "adjective", "חי, מוחשי", "A vivid image.", "חי/מוחשי")],
      [q("What 'quiet bias' does empathy have?", ["Toward strangers", "Toward the near, visible and similar", "Toward statistics", "Toward enemies"], 1, "'toward the near, the visible, and the similar'."), q("What is the risk of a morality built on feeling alone?", ["Too fair", "Generous and unjust at once", "Too cold", "Too slow"], 1, "'generous and unjust at once'.")]),
  ],
};

export const MORE_LISTENINGS3 = {
  A1: [
    L("Hello, this is the school. Tomorrow there are no classes. The school is closed for a holiday. See you on Monday.",
      [q("What is happening tomorrow?", ["A test", "No classes", "A trip", "A party"], 1, "'there are no classes'."), q("When will they meet again?", ["Tomorrow", "On Monday", "On Sunday", "Next month"], 1, "'See you on Monday'.")]),
    L("Good morning. It is sunny today. Don't forget your hat. We will go to the park after lunch.",
      [q("What is the weather like?", ["Rainy", "Sunny", "Cold", "Windy"], 1, "'It is sunny today'."), q("When will they go to the park?", ["Before lunch", "After lunch", "At night", "Tomorrow"], 1, "'after lunch'.")]),
  ],
  A2: [
    L("Hi, this is the library. The book you reserved is now available. Please collect it within five days, or we'll return it to the shelf.",
      [q("Why is the library calling?", ["A late fee", "A reserved book is available", "It is closing", "A new book"], 1, "'The book you reserved is now available'."), q("How long to collect it?", ["Two days", "Five days", "Ten days", "A month"], 1, "'within five days'.")]),
    L("Welcome aboard the ferry to the island. The trip takes about forty minutes. Hot drinks are available on the upper deck. Please keep children close to you.",
      [q("How long is the ferry trip?", ["Twenty minutes", "Forty minutes", "An hour", "Two hours"], 1, "'about forty minutes'."), q("Where can you get hot drinks?", ["The lower deck", "The upper deck", "Outside", "Nowhere"], 1, "'on the upper deck'.")]),
  ],
  B1: [
    L("Hi, it's the estate agent. The flat you liked is still available, but there's a lot of interest. If you'd like to see it again, I'd suggest coming this week rather than next.",
      [q("What is the agent calling about?", ["A sold flat", "A flat still available with lots of interest", "A price drop", "A new listing"], 1, "'still available, but there's a lot of interest'."), q("What does the agent suggest?", ["Wait a month", "Come this week rather than next", "Buy now", "Look elsewhere"], 1, "'coming this week rather than next'.")]),
    L("Thanks for joining the cooking class. Today we'll make a simple soup. Everything you need is on your table. If you're missing anything, just raise your hand and I'll bring it over.",
      [q("What will they cook today?", ["A cake", "A simple soup", "Pasta", "Bread"], 1, "'we'll make a simple soup'."), q("What should you do if something is missing?", ["Leave", "Raise your hand", "Share with a neighbour", "Wait"], 1, "'raise your hand and I'll bring it over'.")]),
  ],
  B2: [
    L("A note on the schedule change: the keynote has been moved to the afternoon to accommodate the speaker's flight. The morning workshops will run as planned, so please check the updated programme at the entrance.",
      [q("Why was the keynote moved?", ["Low interest", "To accommodate the speaker's flight", "A room issue", "Bad weather"], 1, "'to accommodate the speaker's flight'."), q("What runs as planned?", ["The keynote", "The morning workshops", "Nothing", "The closing talk"], 1, "'The morning workshops will run as planned'.")]),
    L("I'll be honest about the trade-off. The cheaper supplier would save us money now, but their delivery record is patchy, and a single late shipment could cost us more than we'd save. I lean toward reliability.",
      [q("What is the trade-off?", ["Speed vs colour", "Cost now vs reliability", "Size vs weight", "Old vs new"], 1, "'cheaper... but their delivery record is patchy'."), q("Which does the speaker lean toward?", ["The cheaper supplier", "Reliability", "Neither", "Delaying"], 1, "'I lean toward reliability'.")]),
  ],
  C1: [
    L("Let me temper the optimism slightly. Early adopters love the product, but early adopters always do — they forgive friction that ordinary users won't. The real test comes when we reach people who didn't go looking for us.",
      [q("Who currently loves the product?", ["Everyone", "Early adopters", "Critics", "No one"], 1, "'Early adopters love the product'."), q("When does the 'real test' come?", ["At launch", "When reaching people who weren't looking for it", "Never", "In testing"], 1, "'people who didn't go looking for us'.")]),
    L("I'd push back on framing this as a failure. We set out to test an assumption, and we tested it: the assumption was wrong. Learning that early, cheaply, is precisely what the experiment was for.",
      [q("How does the speaker reframe the result?", ["A clear success", "Not a failure but a useful test", "A disaster", "A waste"], 1, "'push back on framing this as a failure'."), q("What was the experiment for?", ["To launch", "To test an assumption cheaply", "To raise money", "To hire"], 1, "'Learning that early, cheaply... is what the experiment was for'.")]),
  ],
  C2: [
    L("I'd introduce a note of caution amid the celebration. The figure is real, but it's a snapshot, and snapshots flatter or damn depending entirely on when the shutter happens to fall.",
      [q("What does the speaker call the figure?", ["A trend", "A snapshot", "A forecast", "An error"], 1, "'it's a snapshot'."), q("What determines whether a snapshot flatters or damns?", ["Its size", "When it is taken", "Who reads it", "Its colour"], 1, "'when the shutter happens to fall'.")]),
    L("The disagreement here is less about the facts than about which facts we choose to foreground. We're not contradicting each other so much as illuminating different corners of the same dim room.",
      [q("What is the disagreement really about?", ["The facts themselves", "Which facts to foreground", "Nothing", "Definitions"], 1, "'which facts we choose to foreground'."), q("What metaphor does the speaker use?", ["A bright stage", "Different corners of the same dim room", "A locked door", "A clear window"], 1, "'different corners of the same dim room'.")]),
  ],
};

export const MORE_SPEAKING3 = {
  A1: [
    { text: "Excuse me, where is the toilet?", translation: "סליחה, איפה השירותים?" },
    { text: "I am hungry. Let's eat.", translation: "אני רעב. בוא נאכל." },
    { text: "What is this in English?", translation: "איך אומרים את זה באנגלית?" },
    { text: "It is very cold today.", translation: "קר מאוד היום." },
  ],
  A2: [
    { text: "I'd like to return this, please.", translation: "אשמח להחזיר את זה, בבקשה." },
    { text: "Do you have this in a different size?", translation: "יש לכם את זה במידה אחרת?" },
    { text: "We missed the last bus home.", translation: "פספסנו את האוטובוס האחרון הביתה." },
    { text: "Can you take a photo of us, please?", translation: "תוכל לצלם אותנו, בבקשה?" },
  ],
  B1: [
    { text: "I'm not feeling well; I think I'll stay in.", translation: "אני לא מרגיש טוב; אני חושב שאשאר בבית." },
    { text: "Could you explain that one more time?", translation: "תוכל להסביר את זה עוד פעם אחת?" },
    { text: "I'd prefer to pay in cash if possible.", translation: "אני מעדיף לשלם במזומן אם אפשר." },
    { text: "That sounds like a great idea to me.", translation: "זה נשמע לי רעיון מצוין." },
  ],
  B2: [
    { text: "I'd like to get everyone's input before we decide.", translation: "אשמח לשמוע את כולם לפני שנחליט." },
    { text: "Let's table that for now and move on.", translation: "בוא נשאיר את זה בצד לעת עתה ונמשיך." },
    { text: "I'm not entirely sure that's the whole story.", translation: "אני לא לגמרי בטוח שזו כל התמונה." },
    { text: "Could we find a compromise that works for both sides?", translation: "נוכל למצוא פשרה שמתאימה לשני הצדדים?" },
  ],
  C1: [
    { text: "I'd frame it slightly differently, if I may.", translation: "הייתי מנסח את זה קצת אחרת, אם יורשה לי." },
    { text: "There's a tension here we shouldn't gloss over.", translation: "יש כאן מתח שאסור לנו לטשטש." },
    { text: "Let's not let the perfect be the enemy of the good.", translation: "בוא לא ניתן למושלם להיות אויב של הטוב." },
    { text: "I'm cautiously optimistic, but I'd hedge my bets.", translation: "אני אופטימי בזהירות, אבל הייתי מפזר את ההימורים." },
  ],
  C2: [
    { text: "I'd be loath to draw a sweeping conclusion from one case.", translation: "הייתי נרתע מלהסיק מסקנה גורפת ממקרה אחד." },
    { text: "The argument is seductive precisely because it's so simple.", translation: "הטיעון מפתה דווקא משום שהוא כה פשוט." },
    { text: "We'd do well to distinguish correlation from mere coincidence.", translation: "מוטב שנבחין בין מתאם לבין צירוף מקרים גרידא." },
    { text: "I take the point, but it strikes me as somewhat overstated.", translation: "אני מקבל את הנקודה, אך היא נראית לי מוגזמת במקצת." },
  ],
};
