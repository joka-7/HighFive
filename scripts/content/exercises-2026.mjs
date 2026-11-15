// 2026 curriculum round — exercises from the HighFive curriculum review (2026).
//
// GRAMMAR_2026: B2–C1 structures (Module G / CEFR C1) as fill-the-gap items,
// in the same { before, after, correct, wrong, he } shape as MODAL_ITEMS.
// Exactly one option fits each gap; `he` explains the rule in Hebrew.
//
// SKILL_QUIZ_2026: per-level questions for three skills Hebrew speakers find
// hard, appended one a day to the daily quiz: a second meaning in context,
// the right form from a word family, and confusing pairs.

export const GRAMMAR_2026 = {
  inversion: [
    { before: "Not only ", after: " the exam, but she also got the highest grade.", correct: "did she pass", wrong: ["she passed", "she did pass", "passed she"] },
    { before: "Rarely ", after: " such a beautiful sunset.", correct: "have I seen", wrong: ["I have seen", "I saw", "seen I have"] },
    { before: "Under no circumstances ", after: " leave the building during the test.", correct: "should you", wrong: ["you should", "you should not", "should not you"] },
    { before: "Hardly ", after: " home when the phone rang.", correct: "had I arrived", wrong: ["I had arrived", "I arrived", "have I arrived"] },
    { before: "Never before ", after: " so many people at the festival.", correct: "had we seen", wrong: ["we had seen", "we saw", "have seen we"] },
    { before: "Little ", after: " that the party was for him.", correct: "did he know", wrong: ["he knew", "he did know", "knew he"] },
    { before: "Seldom ", after: " late for a meeting.", correct: "is she", wrong: ["she is", "she being", "does she is"] },
    { before: "No sooner ", after: " the lights than the music started.", correct: "had they turned off", wrong: ["they had turned off", "they turned off", "did they turned off"] },
    { before: "Only after the storm ", after: " how much damage it had caused.", correct: "did we realise", wrong: ["we realised", "we did realise", "realised we"] },
    { before: "Not until the end of the film ", after: " the truth.", correct: "did I understand", wrong: ["I understood", "I did understand", "understood I"] },
  ],
  participleClauses: [
    { before: "", after: " her homework, she went out to play.", correct: "Having finished", wrong: ["Finished", "Having finish", "To have finish"] },
    { before: "", after: " by the noise, the baby started to cry.", correct: "Woken", wrong: ["Waking", "Having woken", "To wake"] },
    { before: "", after: " with rising costs, the city decided to invest in solar energy.", correct: "Faced", wrong: ["Facing", "Having faced", "To face"] },
    { before: "", after: " by his teacher, Tom applied to university.", correct: "Encouraged", wrong: ["Encouraging", "Having encouraged", "To encourage"] },
    { before: "", after: " the street, I saw an old friend.", correct: "Walking down", wrong: ["Walked down", "Having walk down", "To walking down"] },
    { before: "", after: " in 1890, the bridge is still in use today.", correct: "Built", wrong: ["Building", "Having built", "To build"] },
    { before: "", after: " by curiosity, the children opened the box.", correct: "Driven", wrong: ["Driving", "Having driven", "To drive"] },
    { before: "", after: " alone by her parents, she felt a little scared.", correct: "Left", wrong: ["Leaving", "Having left", "To leave"] },
  ],
  reportingVerbs: [
    { before: "Researchers ", after: " the decline in attention span to screen time.", correct: "attribute", wrong: ["blame", "explain", "suggest"] },
    { before: "The minister ", after: " that mistakes had been made.", correct: "acknowledged", wrong: ["attributed", "urged", "advocated"] },
    { before: "She ", after: " the students to start revising early.", correct: "urged", wrong: ["suggested", "acknowledged", "emphasised"] },
    { before: "The report ", after: " the importance of sleep for learning.", correct: "emphasises", wrong: ["urges", "alleges", "attributes"] },
    { before: "Many experts ", after: " a shorter school day.", correct: "advocate", wrong: ["insist", "allege", "attribute"] },
    { before: "The newspaper ", after: " that the company had hidden the problem.", correct: "alleged", wrong: ["advocated", "urged", "attributed"] },
    { before: "He ", after: " having broken the window.", correct: "denied", wrong: ["refused", "urged", "attributed"] },
    { before: "The teacher ", after: " us of the deadline.", correct: "reminded", wrong: ["remembered", "emphasised", "advocated"] },
  ],
  subjunctive: [
    { before: "It is essential that every student ", after: " the form.", correct: "complete", wrong: ["to complete", "completed", "will complete"] },
    { before: "The doctor recommended that he ", after: " more water.", correct: "drink", wrong: ["to drink", "drinking", "will drink"] },
    { before: "It is vital that the government ", after: " equal resources to every school.", correct: "provide", wrong: ["to provide", "provided", "providing"] },
    { before: "I suggest that she ", after: " an early train.", correct: "take", wrong: ["to take", "took", "taking"] },
    { before: "It is imperative that nobody ", after: " the room.", correct: "leave", wrong: ["to leave", "left", "leaving"] },
    { before: "The rules demand that each player ", after: " a helmet.", correct: "wear", wrong: ["to wear", "wore", "wearing"] },
    { before: "It is important that he ", after: " on time.", correct: "be", wrong: ["being", "was", "to be"] },
    { before: "It is crucial that the patient ", after: " heavy lifting.", correct: "avoid", wrong: ["to avoid", "avoided", "avoiding"] },
  ],
  causative: [
    { before: "We ", after: " the roof repaired last week.", correct: "had", wrong: ["made", "did", "let"] },
    { before: "Before the launch, they had the security system ", after: " by experts.", correct: "tested", wrong: ["test", "testing", "to test"] },
    { before: "I need to get my hair ", after: ".", correct: "cut", wrong: ["cutting", "to cut", "cuts"] },
    { before: "She's having her car ", after: " at the garage.", correct: "serviced", wrong: ["service", "servicing", "to service"] },
    { before: "Where did you ", after: " your photos printed?", correct: "have", wrong: ["make", "do", "let"] },
    { before: "He had his phone ", after: " on the bus.", correct: "stolen", wrong: ["steal", "stealing", "stole"] },
    { before: "They got their house ", after: " before the holidays.", correct: "painted", wrong: ["paint", "painting", "to paint"] },
    { before: "The manager had the documents ", after: " to every employee.", correct: "sent", wrong: ["send", "sending", "to send"] },
  ],
  modalsDeduction: [
    { before: "They ", after: " missed the announcement; otherwise they would have arrived on time.", correct: "must have", wrong: ["must", "should", "can have"] },
    { before: "She ", after: " at home yesterday; I saw her at the cinema.", correct: "can't have been", wrong: ["must have been", "must be", "might be"] },
    { before: "You ", after: " told me earlier! Now it's too late.", correct: "should have", wrong: ["must have", "might", "can"] },
    { before: "The ground is wet. It ", after: " during the night.", correct: "must have rained", wrong: ["must rain", "should rain", "can't rain"] },
    { before: "I'm not sure where my keys are. I ", after: " them at work.", correct: "might have left", wrong: ["must leave", "should leave", "can have left"] },
    { before: "He ", after: " the test; he didn't study at all.", correct: "can't have passed", wrong: ["must have passed", "should pass", "might pass"] },
    { before: "She speaks perfect French. She ", after: " in France.", correct: "must have lived", wrong: ["can't have lived", "should have lived", "may not live"] },
    { before: "The lights are off. They ", after: " gone to bed.", correct: "may have", wrong: ["must", "should", "can"] },
  ],
  collocations: [
    { before: "Climate change ", after: " a threat to many coastal cities.", correct: "poses", wrong: ["makes", "does", "takes"] },
    { before: "Good teachers can ", after: " the gap between theory and practice.", correct: "bridge", wrong: ["close up", "build", "jump"] },
    { before: "Technology ", after: " a pivotal role in modern education.", correct: "plays", wrong: ["makes", "does", "gives"] },
    { before: "Artificial intelligence is often seen as a double-", after: " sword.", correct: "edged", wrong: ["sided", "bladed", "pointed"] },
    { before: "Many people take clean water for ", after: ".", correct: "granted", wrong: ["given", "sure", "certain"] },
    { before: "We need to ", after: " a balance between work and rest.", correct: "strike", wrong: ["hit", "make up", "beat"] },
    { before: "The company ", after: " steps to reduce waste.", correct: "took", wrong: ["made", "did", "put"] },
    { before: "The project ", after: " to a halt when the money ran out.", correct: "came", wrong: ["went", "made", "took"] },
  ],
};

/** Hebrew rule shown after each item of a grammar topic. */
export const GRAMMAR_2026_RULES = {
  inversion: "אחרי ביטוי שלילי או מגביל בתחילת משפט (Not only, Rarely, Never, Little) הופכים את סדר הנושא ופועל העזר: did she pass, have I seen.",
  participleClauses: "פסוקית בינונית מקצרת משפט: Having + V3 לפעולה שקדמה, V3 לסביל, V-ing לפעולה בו-זמנית. הנושא שלה זהה לנושא המשפט הראשי.",
  reportingVerbs: "לכל פועל דיווח מבנה קבוע: attribute X to Y, urge sb to, deny + ing, remind sb of, acknowledge that.",
  subjunctive: "אחרי It is essential/vital/important that ואחרי suggest/recommend/demand that, הפועל בא בצורת הבסיס, גם בגוף שלישי: that he be, that she take. (באנגלית בריטית מקובל גם that he is / that she takes, אבל צורת הבסיס היא הצורה הפורמלית.)",
  causative: "have/get + מושא + V3 מתאר פעולה שמישהו אחר עושה עבורנו: I had my car repaired = תיקנו לי את הרכב.",
  modalsDeduction: "must have + V3 = בטוח שקרה; can't have + V3 = בטוח שלא קרה; might/may have + V3 = ייתכן שקרה; should have + V3 = היה צריך.",
  collocations: "צירופים קבועים (collocations) הם מילים שבאות יחד באופן טבעי: pose a threat, play a role, take sth for granted. לומדים אותם כיחידה אחת.",
};

const q = (question, questionHe, options, correctIndex, explanation) => ({ question, questionHe, options, correctIndex, explanation });

export const SKILL_QUIZ_2026 = {
  A1: [
    q('In which sentence does "right" mean "ימין"?', 'באיזה משפט "right" פירושו "ימין"?', ["That is the right answer.", "Turn right at the corner.", "Are you all right?", "You are right about the test."], 1, "turn right = פנה ימינה. בשאר המשפטים right = נכון או בסדר."),
    q('In which sentence does "free" mean "בחינם"?', 'באיזה משפט "free" פירושו "בחינם"?', ["Are you free this afternoon?", "Is this seat free?", "The museum is free on Mondays.", "The bird is free now."], 2, "free = בחינם, בלי לשלם. Are you free = אתה פנוי; seat free = מושב פנוי."),
    q('In which sentence does "well" mean "בקו הבריאות"?', 'באיזה משפט "well" פירושו "בקו הבריאות"?', ["She sings well.", "He did the job well.", "Well, let's start.", "I don't feel well today."], 3, "I don't feel well = אני לא מרגיש טוב. בשאר: well = היטב, או מילת פתיחה."),
    q('In which sentence does "letter" mean "מכתב"?', 'באיזה משפט "letter" פירושו "מכתב"?', ["I wrote a letter to my cousin.", "A is the first letter.", "Write each letter clearly.", "This word has five letters."], 0, "write a letter to sb = לכתוב מכתב. בשאר letter = אות."),
    q('In which sentence does "grade" mean "ציון"?', 'באיזה משפט "grade" פירושו "ציון"?', ["She is in fifth grade.", "I got a good grade on the test.", "The sixth grade went on a trip.", "Which grade is your brother in?"], 1, "a good grade = ציון טוב. בשאר grade = כיתה."),
    q("Choose the correct sentence.", "בחרו את המשפט הנכון.", ["I am waiting to the bus.", "I am waiting the bus to.", "I am waiting for the bus.", "I am wait for the bus."], 2, "wait for = לחכות ל-, תמיד עם for."),
    q("Choose the correct sentence.", "בחרו את המשפט הנכון.", ["She is interested at music.", "She is interesting in music.", "She interested in music.", "She is interested in music."], 3, "interested in = מתעניין ב-, תמיד עם in."),
    q('In which sentence does "smart" mean "אלגנטי"?', 'באיזה משפט "smart" פירושו "אלגנטי"?', ["He is a smart student.", "You look smart in that suit.", "That was a smart idea.", "Dogs are smart animals."], 1, "look smart = להיראות אלגנטי. בשאר smart = חכם."),
  ],
  A2: [
    q("Choose the correct sentence.", "בחרו את המשפט הנכון.", ["I am used to waking up early.", "I am used to wake up early.", "I use to waking up early.", "I used to waking up early."], 0, "be used to + ing = רגיל ל-. (used to + פועל בסיס = נהג בעבר.)"),
    q('What is the opposite of "on purpose"?', 'מה ההפך של "on purpose"?', ["on time", "by accident", "in charge", "at least"], 1, "on purpose = בכוונה; by accident = בטעות."),
    q('Which phrase completes the sentence: "The doctors will ___ the test today."', 'איזה צירוף משלים את המשפט: "The doctors will ___ the test today."?', ["carry away", "look after", "carry out", "break down"], 2, "carry out = לבצע; carry on = להמשיך."),
    q('Which word completes the sentence: "I\'m looking forward ___ the holiday."', 'איזו מילה משלימה את המשפט: "I\'m looking forward ___ the holiday."?', ["for", "after", "at", "to"], 3, "look forward to = לצפות ל-, תמיד עם to."),
    q('In which sentence does "case" mean "מזוודה"?', 'באיזה משפט "case" פירושו "מזוודה"?', ["In that case, let's go.", "He carried a heavy case to the train.", "It was a strange case.", "In any case, call me."], 1, "carry a heavy case = לסחוב מזוודה כבדה. בשאר case = מקרה."),
    q('In which sentence does "coach" mean "אוטובוס"?', 'באיזה משפט "coach" פירושו "אוטובוס"?', ["We went to Eilat by coach.", "Our coach shouted at the team.", "The coach trains us every day.", "She is a good tennis coach."], 0, "by coach = באוטובוס בין-עירוני. בשאר coach = מאמן."),
    q('Which word completes the sentence: "My ___ pays me at the end of every month."', 'איזו מילה משלימה את המשפט: "My ___ pays me at the end of every month."?', ["employee", "employment", "employ", "employer"], 3, "employer = מעסיק (משלם את השכר); employee = עובד."),
    q('Which sentence means "זה לא משנה"?', 'איזה משפט פירושו "זה לא משנה"?', ["It doesn't mind.", "It doesn't matter.", "It isn't matter.", "It doesn't care."], 1, "It doesn't matter = זה לא משנה."),
    q("Which word is spelled correctly?", "איזו מילה כתובה נכון?", ["pronounciation", "pronuncation", "pronunciation", "prononciation"], 2, "pronounce נכתב עם ou (pro-NOUNCE), אבל pronunciation בלי o (pro-NUN-ciation)."),
  ],
  B1: [
    q('Which words complete the sentence: "Noise can seriously ___ your studies, and the negative ___ is felt immediately."', 'אילו מילים משלימות את המשפט: "Noise can seriously ___ your studies, and the negative ___ is felt immediately."?', ["affect / effect", "effect / affect", "affect / affect", "effect / effect"], 0, "affect הוא הפועל (להשפיע על); effect הוא שם העצם (השפעה)."),
    q('In which sentence does "make" mean "להספיק להגיע"?', 'באיזה משפט "make" פירושו "להספיק להגיע"?', ["She wants to make a chocolate cake.", "Does this factory make cars?", "If we leave now, we can still make the ten o'clock train.", "Please make sure the door is locked."], 2, "make the train = להספיק להגיע לרכבת. בשאר make = להכין, לייצר, לוודא."),
    q('Which word completes the sentence: "Loud ___ were heard near the old quarry."', 'איזו מילה משלימה את המשפט: "Loud ___ were heard near the old quarry."?', ["explodes", "explosions", "explosive", "exploding"], 1, "אחרי Loud צריך שם עצם ברבים: explosions (פיצוצים). explode (v) → explosion (n)."),
    q('In which sentence does "bank" mean "גדה"?', 'באיזה משפט "bank" פירושו "גדה"?', ["I keep my money in the bank.", "The bank opens at nine.", "She works at a bank.", "We sat on the bank of the river."], 3, "the bank of the river = גדת הנהר. בשאר bank = בנק."),
    q('In which sentence does "branch" mean "סניף"?', 'באיזה משפט "branch" פירושו "סניף"?', ["A bird sat on the branch.", "The bank opened a new branch in our town.", "The wind broke a branch.", "He climbed onto a high branch."], 1, "a new branch in our town = סניף חדש. בשאר branch = ענף של עץ."),
    q("Choose the correct sentence.", "בחרו את המשפט הנכון.", ["My bag is similar as yours.", "My bag is similar than yours.", "My bag is similar to yours.", "My bag is similar with yours."], 2, "similar to = דומה ל-, תמיד עם to."),
    q('Which word completes the sentence: "The police caught the ___ near the bank."', 'איזו מילה משלימה את המשפט: "The police caught the ___ near the bank."?', ["robber", "rob", "robbery", "robbed"], 0, "robber = שודד (אדם). rob (v) → robber (n); robbery = שוד (המעשה)."),
    q("Choose the correct sentence.", "בחרו את המשפט הנכון.", ["All students participated on the project.", "All students participated at the project.", "All students participated the project.", "All students participated in the project."], 3, "participate in = להשתתף ב-, תמיד עם in."),
    q('Which word completes the sentence: "The storm caused a lot of ___."', 'איזו מילה משלימה את המשפט: "The storm caused a lot of ___."?', ["destroy", "destruction", "destroyed", "destructive"], 1, "אחרי a lot of צריך שם עצם: destruction (הרס). destroy (v) → destruction (n)."),
    q('Which word completes the sentence: "Her ___ to build a park was accepted."', 'איזו מילה משלימה את המשפט: "Her ___ to build a park was accepted."?', ["propose", "proposed", "proposal", "proposing"], 2, "אחרי Her צריך שם עצם: proposal (הצעה). propose (v) → proposal (n)."),
  ],
  B2: [
    q('Which word completes the sentence: "My sister got ___ last week, and the wedding is in June."', 'איזו מילה משלימה את המשפט: "My sister got ___ last week, and the wedding is in June."?', ["engagement", "engaged", "engage", "engaging"], 1, "get engaged = להתארס. engage (v) → engagement (n) / engaged (adj)."),
    q('Which word completes the sentence: "After the ___, they sold the house."', 'איזו מילה משלימה את המשפט: "After the ___, they sold the house."?', ["divorced", "divorcing", "divorces", "divorce"], 3, "אחרי the צריך שם עצם ביחיד: divorce (גירושין). divorce (n) → divorced (adj)."),
    q('Which word completes the sentence: "Be careful, the soup is ___ hot."', 'איזו מילה משלימה את המשפט: "Be careful, the soup is ___ hot."?', ["boiling", "boiled", "boil", "boils"], 0, "boiling hot = רותח. boiled = מבושל במים."),
    q('In which sentence does "deck" mean "סיפון"?', 'באיזה משפט "deck" פירושו "סיפון"?', ["She shuffled the deck of cards.", "He bought a new deck of cards.", "We stood on the deck of the ship.", "Deal the cards from the deck."], 2, "the deck of the ship = סיפון. בשאר deck = חפיסת קלפים."),
    q('Which word completes the sentence: "It is ___ that the match will be cancelled."', 'איזו מילה משלימה את המשפט: "It is ___ that the match will be cancelled."?', ["probably", "probable", "probability", "probabilities"], 1, "It is probable that = סביר ש- (שם תואר אחרי is). probably הוא תואר הפועל."),
    q('Which word completes the sentence: "The new law will ___ thousands of families."', 'איזו מילה משלימה את המשפט: "The new law will ___ thousands of families."?', ["effect", "affection", "effective", "affect"], 3, "אחרי will צריך פועל: affect (להשפיע על). effect כפועל פירושו לחולל (effect change), ובדרך כלל הוא שם עצם (השפעה)."),
    q('In which sentence does "range" mean "רכס"?', 'באיזה משפט "range" פירושו "רכס"?', ["The shop has a wide range of shoes.", "We hiked across the mountain range.", "Prices range from 10 to 50 shekels.", "The age range is 12 to 15."], 1, "a mountain range = רכס הרים. בשאר range = טווח או מגוון."),
    q('Which phrase completes the sentence: "Use an eraser to ___ the mistake."', 'איזה צירוף משלים את המשפט: "Use an eraser to ___ the mistake."?', ["rub out", "rub in", "run out", "put out"], 0, "rub out = למחוק בעזרת מחק."),
  ],
  C1: [],
  C2: [],
};
