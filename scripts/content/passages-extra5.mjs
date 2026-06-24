// Round 5 of additional Reading, Listening and Speaking content.

const R = (title, text, glossary, questions) => ({ title, text, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, options, correctIndex, explanation) => ({ question, options, correctIndex, explanation });
const L = (transcript, questions) => ({ transcript, questions });

export const MORE_READINGS5 = {
  A1: [
    R("The Bus to School (האוטובוס לבית הספר)",
      "Every morning I take the bus to school. The bus comes at eight. My friend Noa sits next to me. We talk and look out the window. School starts at half past eight.",
      [g("morning", "noun", "תחילת היום", "Every morning.", "בוקר"), g("next to", "phrase", "ליד", "Sit next to me.", "ליד/לצד"), g("start", "verb", "להתחיל", "School starts.", "מתחיל")],
      [q("When does the bus come?", ["At seven", "At eight", "At nine", "At ten"], 1, "'The bus comes at eight'."), q("Who sits next to the writer?", ["The teacher", "Noa", "The driver", "No one"], 1, "'My friend Noa sits next to me'.")]),
    R("A Rainy Afternoon (אחר צהריים גשום)",
      "It is raining today. I cannot go to the park. So I stay home with my brother. We play a game and then we draw. Later, Mum makes hot soup. It is a nice day after all.",
      [g("raining", "verb", "יורד גשם", "It is raining.", "יורד גשם"), g("stay", "verb", "להישאר", "Stay home.", "להישאר"), g("soup", "noun", "מרק", "Hot soup.", "מרק")],
      [q("Why does the child stay home?", ["It is hot", "It is raining", "It is late", "It is a holiday"], 1, "'It is raining today'."), q("What does Mum make?", ["Cake", "Hot soup", "Bread", "Tea"], 1, "'Mum makes hot soup'.")]),
  ],
  A2: [
    R("A Surprise Party (מסיבת הפתעה)",
      "We planned a surprise party for my father's fiftieth birthday. It was hard to keep the secret! When he came home and everyone shouted 'Surprise!', his face was priceless. He said it was the best birthday of his life.",
      [g("surprise", "noun", "הפתעה", "A nice surprise.", "הפתעה"), g("secret", "noun", "סוד", "Keep the secret.", "סוד"), g("priceless", "adjective", "שאין לו מחיר, יקר מאוד", "A priceless look.", "שאין לו מחיר")],
      [q("What was the party for?", ["A wedding", "A 50th birthday", "A new job", "A holiday"], 1, "'my father's fiftieth birthday'."), q("What was hard to do?", ["Cook", "Keep the secret", "Invite people", "Find a place"], 1, "'hard to keep the secret'.")]),
    R("Learning to Drive (ללמוד לנהוג)",
      "I am learning to drive. At first I was scared of the busy roads. My instructor is calm and explains everything twice. Last week I drove on the highway for the first time. I was nervous, but I did it!",
      [g("scared", "adjective", "מפוחד", "I was scared.", "מפוחד"), g("instructor", "noun", "מדריך", "A driving instructor.", "מדריך"), g("highway", "noun", "כביש מהיר", "On the highway.", "כביש מהיר")],
      [q("What was the writer scared of?", ["The instructor", "Busy roads", "The car", "The test"], 1, "'scared of the busy roads'."), q("What happened last week?", ["Failed a test", "Drove on the highway", "Bought a car", "Quit"], 1, "'I drove on the highway for the first time'.")]),
  ],
  B1: [
    R("Borrowing, Not Buying (לשאול, לא לקנות)",
      "Last year I needed a drill for one small job. Instead of buying one, I borrowed it from a neighbour. That led to a 'tool library' in our street, where people share things they rarely use. We save money and meet each other — two problems solved at once.",
      [g("drill", "noun", "מקדחה", "An electric drill.", "מקדחה"), g("borrow", "verb", "לשאול לזמן מה", "Borrow a book.", "לשאול"), g("share", "verb", "לחלוק", "Share the cost.", "לחלוק")],
      [q("What did the writer do instead of buying a drill?", ["Rented one", "Borrowed from a neighbour", "Did without", "Made one"], 1, "'I borrowed it from a neighbour'."), q("What did this lead to?", ["A shop", "A tool library", "An argument", "A class"], 1, "'a tool library in our street'.")]),
    R("The Long Way Home (הדרך הארוכה הביתה)",
      "Most days I take the quick route home, head down, thinking about work. One evening I chose the longer path through the park. I noticed a small bookshop I'd passed a hundred times without seeing. Slowing down, it turns out, is its own kind of arriving.",
      [g("route", "noun", "מסלול, דרך", "The quick route.", "מסלול"), g("path", "noun", "שביל", "A garden path.", "שביל"), g("noticed", "verb", "הבחין", "I noticed it.", "הבחין")],
      [q("What did the writer usually do on the way home?", ["Walk slowly", "Take the quick route, thinking of work", "Take the bus", "Visit shops"], 1, "'the quick route home, head down, thinking about work'."), q("What did slowing down let the writer do?", ["Save time", "Notice a bookshop", "Meet a friend", "Avoid rain"], 1, "'noticed a small bookshop'.")]),
  ],
  B2: [
    R("The Illusion of Busyness (אשליית העומס)",
      "Being busy has become a badge of honour, a way of signalling importance. Yet busyness and productivity are not the same; one can be frantically occupied and achieve very little. The harder, less glamorous skill is to protect unhurried time for the few things that genuinely move the needle.",
      [g("badge", "noun", "תג, סמל", "A badge of honour.", "תג/סמל"), g("frantically", "adverb", "בטירוף, בקדחתנות", "Frantically busy.", "בקדחתנות"), g("unhurried", "adjective", "ללא חיפזון, נינוח", "Unhurried time.", "ללא חיפזון")],
      [q("What has being busy become?", ["A problem", "A badge of honour", "Rare", "Illegal"], 1, "'a badge of honour'."), q("What is the 'harder skill'?", ["Doing more", "Protecting unhurried time for what matters", "Looking busy", "Working faster"], 1, "'protect unhurried time for the few things'.")]),
    R("Strong Opinions, Loosely Held (דעות נחרצות, אחיזה רופפת)",
      "A useful principle for thinking is to hold strong opinions but loosely. Commit firmly enough to act and to test your ideas, yet stay willing to drop them the moment better evidence appears. The trap at both extremes is real: endless doubt paralyses, while rigid certainty blinds.",
      [g("principle", "noun", "עיקרון", "A guiding principle.", "עיקרון"), g("commit", "verb", "להתחייב", "Commit to it.", "להתחייב"), g("rigid", "adjective", "נוקשה", "Rigid rules.", "נוקשה")],
      [q("What does the principle recommend?", ["No opinions", "Strong opinions, loosely held", "Permanent doubt", "Fixed beliefs"], 1, "'hold strong opinions but loosely'."), q("What does rigid certainty do?", ["Helps act", "Blinds", "Paralyses", "Nothing"], 1, "'rigid certainty blinds'.")]),
  ],
  C1: [
    R("The Paradox of Documentation (פרדוקס התיעוד)",
      "We photograph experiences to remember them, yet a growing body of evidence suggests the camera can become a substitute for attention rather than an aid to it. Filming the concert, we half-miss the concert. The record we create of a moment is sometimes purchased with the very presence that made the moment worth recording.",
      [g("substitute", "noun", "תחליף", "A poor substitute.", "תחליף"), g("aid", "noun", "עזר, סיוע", "A memory aid.", "עזר/סיוע"), g("presence", "noun", "נוכחות", "Full presence.", "נוכחות")],
      [q("What can the camera become, per the text?", ["An aid to memory", "A substitute for attention", "A toy", "A burden"], 1, "'a substitute for attention'."), q("What is the record sometimes 'purchased with'?", ["Money", "The presence that made the moment worth recording", "Time", "Skill"], 1, "'the very presence that made the moment worth recording'.")]),
    R("Chesterton's Fence (הגדר של צ'סטרטון)",
      "Encountering a fence across a road, the impatient reformer says, 'It's useless — remove it.' The wiser reply is: 'If you don't see its use, I won't let you remove it; go and find out why it's there.' Many traditions look absurd until you understand the problem they were quietly solving.",
      [g("encountering", "verb", "נתקל ב-", "Encountering a problem.", "נתקל ב-"), g("reformer", "noun", "מתקן, רפורמטור", "An eager reformer.", "מתקן/רפורמטור"), g("absurd", "adjective", "אבסורדי, חסר היגיון", "It seems absurd.", "אבסורדי")],
      [q("What does the impatient reformer want to do?", ["Study the fence", "Remove the useless fence", "Build a fence", "Paint it"], 1, "'It's useless — remove it'."), q("What is the wiser approach?", ["Remove it fast", "Find out why it's there first", "Ignore it", "Copy it"], 1, "'go and find out why it's there'.")]),
  ],
  C2: [
    R("The Eloquence of Restraint (רהיטות שבריסון)",
      "There is a kind of power available only to those willing not to use all of it. The writer who resists the dazzling word, the speaker who leaves the cutting retort unsaid, the negotiator who declines the small victory — each trades momentary effect for a quieter, more durable authority. Restraint, paradoxically, can be the loudest statement of all.",
      [g("dazzling", "adjective", "מסנוור, מרהיב", "A dazzling display.", "מסנוור/מרהיב"), g("retort", "noun", "תשובה עוקצנית", "A sharp retort.", "תשובה עוקצנית"), g("durable", "adjective", "בר-קיימא, עמיד", "Durable authority.", "בר-קיימא")],
      [q("Who has this 'kind of power'?", ["Those who use all of it", "Those willing not to use all of it", "The loudest", "The richest"], 1, "'available only to those willing not to use all of it'."), q("What does restraint trade momentary effect for?", ["Nothing", "Quieter, more durable authority", "Money", "Fame"], 1, "'a quieter, more durable authority'.")]),
    R("Maps of the Self (מפות העצמי)",
      "The labels we accept for ourselves — shy, ambitious, a 'numbers person' — begin as rough descriptions and quietly harden into walls. We then live down to them, declining opportunities on the grounds that they aren't 'us'. The self is far more provisional than the noun we use to name it; identity is a verb wearing the costume of a fact.",
      [g("harden", "verb", "להתקשות, להפוך לקשיח", "Attitudes harden.", "להתקשות"), g("provisional", "adjective", "זמני, בלתי סופי", "A provisional self.", "זמני"), g("costume", "noun", "תחפושת", "Wearing a costume.", "תחפושת")],
      [q("What do self-labels harden into?", ["Maps", "Walls", "Verbs", "Costumes"], 1, "'quietly harden into walls'."), q("How does the writer reframe identity?", ["A fixed fact", "A verb wearing the costume of a fact", "A label", "A noun"], 1, "'identity is a verb wearing the costume of a fact'.")]),
  ],
};

export const MORE_LISTENINGS5 = {
  A1: [
    L("Hello! My name is Lily. I am six years old. I have a red bike and I like to ride it in the park.",
      [q("How old is Lily?", ["Five", "Six", "Seven", "Eight"], 1, "'I am six years old'."), q("What does Lily like to ride?", ["A bus", "A red bike", "A horse", "A train"], 1, "'a red bike and I like to ride it'.")]),
    L("Good night, everyone. It is late now. Please turn off the lights. We will see the stars tomorrow.",
      [q("What time of day is it?", ["Morning", "Night", "Noon", "Afternoon"], 1, "'Good night... It is late now'."), q("What should people turn off?", ["The TV", "The lights", "The radio", "The oven"], 1, "'turn off the lights'.")]),
  ],
  A2: [
    L("Hi, this is the school office. Tomorrow's trip is cancelled because of the rain. Normal classes will take place instead.",
      [q("Why is the trip cancelled?", ["No bus", "Because of the rain", "A holiday", "No teachers"], 1, "'cancelled because of the rain'."), q("What will happen instead?", ["A day off", "Normal classes", "A different trip", "An exam"], 1, "'Normal classes will take place'.")]),
    L("Welcome to the museum. Please note that photography without flash is allowed, but food and drink are not permitted in the galleries.",
      [q("What is allowed?", ["Flash photos", "Photography without flash", "Eating", "Drinking"], 1, "'photography without flash is allowed'."), q("What is NOT permitted in the galleries?", ["Photos", "Food and drink", "Talking", "Walking"], 1, "'food and drink are not permitted'.")]),
  ],
  B1: [
    L("Hi, it's the vet's office. Bella's test results are back and everything looks normal. You can pick up her medication any time before six.",
      [q("Whose results are these?", ["The caller's", "Bella's (a pet)", "A child's", "No one's"], 1, "'Bella's test results are back'."), q("What are the results?", ["Worrying", "Everything looks normal", "Unclear", "Delayed"], 1, "'everything looks normal'.")]),
    L("Quick announcement: the lift is being serviced this morning, so please use the stairs. It should be working again by lunchtime. Thanks for your patience.",
      [q("Why use the stairs?", ["A fire drill", "The lift is being serviced", "It's faster", "The lift is full"], 1, "'the lift is being serviced this morning'."), q("When should the lift work again?", ["Tomorrow", "By lunchtime", "Next week", "Never"], 1, "'working again by lunchtime'.")]),
  ],
  B2: [
    L("Let me set expectations honestly. This first version won't have every feature you asked for. We chose to ship something solid and small rather than something big and shaky, and we'll add the rest based on what you actually use.",
      [q("What won't the first version have?", ["Any features", "Every requested feature", "A design", "Users"], 1, "'won't have every feature you asked for'."), q("What was the team's choice?", ["Big and shaky", "Solid and small", "Fast and cheap", "Late and full"], 1, "'solid and small rather than... big and shaky'.")]),
    L("One clarification on the policy: remote work is fully supported, but we do ask that everyone is reachable during core hours, roughly ten to three, so meetings don't become impossible to schedule.",
      [q("What is the policy on remote work?", ["Banned", "Fully supported with core hours", "Mandatory", "Discouraged"], 1, "'remote work is fully supported, but... core hours'."), q("What are the core hours?", ["9 to 5", "Roughly 10 to 3", "8 to 4", "All day"], 1, "'core hours, roughly ten to three'.")]),
  ],
  C1: [
    L("I'd offer one reframing. We keep asking why engagement dropped, as if the old numbers were the natural baseline. But those numbers were inflated by a novelty that was always going to fade. The question isn't why it fell, but what a healthy, sustainable level actually looks like.",
      [q("What assumption does the speaker question?", ["That engagement matters", "That the old numbers were the natural baseline", "That novelty lasts", "That data is real"], 1, "'as if the old numbers were the natural baseline'."), q("What is the better question?", ["Why it fell", "What a healthy sustainable level looks like", "Who is to blame", "When it started"], 1, "'what a healthy, sustainable level actually looks like'.")]),
    L("I want to be fair to the critics. Their objection isn't unreasonable; it's just aimed at a version of the proposal we abandoned weeks ago. We should update them rather than dismiss them.",
      [q("How does the speaker treat the critics?", ["Dismisses them", "Wants to be fair and update them", "Mocks them", "Ignores them"], 1, "'I want to be fair to the critics'."), q("What is the problem with their objection?", ["It's unreasonable", "It targets an abandoned version", "It's too late", "It's rude"], 1, "'aimed at a version of the proposal we abandoned'.")]),
  ],
  C2: [
    L("Permit me a note of skepticism. The case studies are compelling, but they're also self-selected: we hear from the ventures that survived to tell the tale, never from the identical strategies that quietly sank. Survivorship is doing more persuading here than the argument is.",
      [q("What is the speaker skeptical about?", ["The data quality", "Self-selected, survivor case studies", "The speakers", "The cost"], 1, "'self-selected: we hear from the ventures that survived'."), q("What is 'doing more persuading'?", ["The argument", "Survivorship", "The visuals", "The numbers"], 1, "'Survivorship is doing more persuading here than the argument'.")]),
    L("I'd gently dismantle the dichotomy we've been assuming. It needn't be tradition versus progress; the most enduring institutions tend to be precisely those that conserve a core while continuously reforming at the edges.",
      [q("What 'dichotomy' does the speaker dismantle?", ["Cost vs speed", "Tradition versus progress", "Old vs young", "Local vs global"], 1, "'tradition versus progress'."), q("What do the most enduring institutions do?", ["Reject change", "Conserve a core while reforming at the edges", "Change everything", "Freeze"], 1, "'conserve a core while continuously reforming at the edges'.")]),
  ],
};

export const MORE_SPEAKING5 = {
  A1: [
    { text: "I live near the park.", translation: "אני גר ליד הפארק." },
    { text: "Can you say that again, please?", translation: "תוכל לומר את זה שוב, בבקשה?" },
    { text: "See you tomorrow morning.", translation: "נתראה מחר בבוקר." },
  ],
  A2: [
    { text: "I'm sorry, I didn't understand.", translation: "אני מצטער, לא הבנתי." },
    { text: "Could I have a glass of water?", translation: "אפשר כוס מים?" },
    { text: "We arrived a little early.", translation: "הגענו קצת מוקדם." },
  ],
  B1: [
    { text: "I'd be happy to help if you need anything.", translation: "אשמח לעזור אם תצטרך משהו." },
    { text: "Let's agree on a time that suits everyone.", translation: "בוא נסכים על זמן שמתאים לכולם." },
    { text: "I'm not sure that's the best approach.", translation: "אני לא בטוח שזו הגישה הטובה ביותר." },
  ],
  B2: [
    { text: "Let me play that back to make sure I understood.", translation: "תן לי לחזור על זה כדי לוודא שהבנתי." },
    { text: "I'd rather we addressed this sooner than later.", translation: "אני מעדיף שנטפל בזה מוקדם ולא מאוחר." },
    { text: "That's a valid concern; let's factor it in.", translation: "זו נקודה מוצדקת; בוא ניקח אותה בחשבון." },
  ],
  C1: [
    { text: "I'd be cautious about generalising from one example.", translation: "הייתי נזהר מהכללה על סמך דוגמה אחת." },
    { text: "On reflection, I think we moved too quickly.", translation: "במחשבה שנייה, אני חושב שמיהרנו מדי." },
    { text: "Let's keep our options open for now.", translation: "בוא נשאיר את האפשרויות פתוחות לעת עתה." },
  ],
  C2: [
    { text: "I'd resist drawing a firm conclusion from such thin evidence.", translation: "הייתי נמנע ממסקנה נחרצת על סמך ראיות כה דלות." },
    { text: "The point is well taken, though I'd qualify it slightly.", translation: "הנקודה מתקבלת, אם כי הייתי מסייג אותה מעט." },
    { text: "We risk solving the wrong problem rather elegantly.", translation: "אנחנו מסתכנים בכך שנפתור את הבעיה הלא נכונה בצורה אלגנטית." },
  ],
};
