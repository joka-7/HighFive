// The A1 speaking scripts: one round of four sentences per learning day,
// matching the grammar lesson of the same course day in a1-grammar.mjs, so the
// learner says aloud the structure they just practised. The app shows
// `speaking[courseDay]` from the curated pool (index = course day), so round N is
// what a learner meets on their Nth finished day. Every sentence uses only A1
// words, with at most one unknown word allowed by the app's gate
// (`node scripts/check-curated.mjs A1` verifies that).

const day = (...pairs) => ({ prompts: pairs.map(([text, translation]) => ({ text, translation })) });

export const A1_SPEAKING = [
  // --- Week 1: to be ---
  day(["I am a student.", "אני תלמיד."], ["You are my friend.", "אתה החבר שלי."], ["I am happy.", "אני שמח."], ["You are happy.", "אתה שמח."]),
  day(["He is a teacher.", "הוא מורה."], ["She is my sister.", "היא אחותי."], ["It is a cat.", "זה חתול."], ["He is happy.", "הוא שמח."]),
  day(["We are friends.", "אנחנו חברים."], ["They are at school.", "הם בבית הספר."], ["We are happy.", "אנחנו שמחים."], ["They are my friends.", "הם החברים שלי."]),
  day(["I am not tired.", "אני לא עייף."], ["He is not happy.", "הוא לא שמח."], ["They are not at home.", "הם לא בבית."], ["She is not at school.", "היא לא בבית הספר."]),
  day(["Are you a student?", "האם אתה תלמיד?"], ["Is she your sister?", "האם היא אחותך?"], ["Is he happy?", "האם הוא שמח?"], ["Yes, I am.", "כן, אני."]),
  // --- Week 2: to be in use ---
  day(["The book is on the table.", "הספר על השולחן."], ["My brothers are in the kitchen.", "האחים שלי במטבח."], ["Where is my bag?", "איפה התיק שלי?"], ["My bag is here.", "התיק שלי כאן."]),
  day(["The water is cold.", "המים קרים."], ["The apples are red.", "התפוחים אדומים."], ["I am hungry.", "אני רעב."], ["The cat is small.", "החתול קטן."]),
  day(["How old are you?", "בן כמה אתה?"], ["I am ten years old.", "אני בן עשר."], ["She is nine.", "היא בת תשע."], ["He is eleven.", "הוא בן אחד עשר."]),
  day(["What is your name?", "מה שמך?"], ["Where is the teacher?", "איפה המורה?"], ["Who is that boy?", "מי הילד הזה?"], ["He is my brother.", "הוא אחי."]),
  day(["I'm happy.", "אני שמח."], ["He's my father.", "הוא אבא שלי."], ["They're at home.", "הם בבית."], ["She's my mother.", "היא אמא שלי."]),
  // --- Week 3: articles and plurals ---
  day(["I have an apple.", "יש לי תפוח."], ["She has a book.", "יש לה ספר."], ["He has an egg.", "יש לו ביצה."], ["I see a cat.", "אני רואה חתול."]),
  day(["I have a dog. The dog is brown.", "יש לי כלב. הכלב חום."], ["I see a cat. The cat is big.", "אני רואה חתול. החתול גדול."], ["Open the door, please.", "פתחו את הדלת, בבקשה."], ["The sun is hot.", "השמש חמה."]),
  day(["One book, two books.", "ספר אחד, שני ספרים."], ["One cat, three cats.", "חתול אחד, שלושה חתולים."], ["I have five apples.", "יש לי חמישה תפוחים."], ["I see two dogs.", "אני רואה שני כלבים."]),
  day(["One box, two boxes.", "קופסה אחת, שתי קופסאות."], ["One baby, two babies.", "תינוק אחד, שני תינוקות."], ["One bus, two buses.", "אוטובוס אחד, שני אוטובוסים."], ["I see three boxes.", "אני רואה שלוש קופסאות."]),
  day(["One fish, two fish.", "דג אחד, שני דגים."], ["The people are happy.", "האנשים שמחים."], ["I see two fish.", "אני רואה שני דגים."], ["People like music.", "אנשים אוהבים מוזיקה."]),
  // --- Week 4: this / that and possessives ---
  day(["This is my book.", "זה הספר שלי."], ["That is a house.", "זה בית שם."], ["What is this?", "מה זה?"], ["What is that?", "מה זה שם?"]),
  day(["These are my shoes.", "אלה הנעליים שלי."], ["Those are birds.", "אלה ציפורים שם."], ["These books are big.", "הספרים האלה גדולים."], ["Those cats are small.", "החתולים ההם קטנים."]),
  day(["Her name is on the book.", "השם שלה על הספר."], ["My dog is big.", "הכלב שלי גדול."], ["His mother is here.", "אמא שלו כאן."], ["Your bag is red.", "התיק שלך אדום."]),
  day(["Our house is big.", "הבית שלנו גדול."], ["Their bags are red.", "התיקים שלהם אדומים."], ["Our teacher is here.", "המורה שלנו כאן."], ["Their dog is small.", "הכלב שלהם קטן."]),
  day(["This is the girl's book.", "זה הספר של הילדה."], ["That is my brother's room.", "זה החדר של אחי."], ["It is my mother's bag.", "זה התיק של אמא שלי."], ["The boy's bag is blue.", "התיק של הילד כחול."]),
  // --- Week 5: have / has and there is / there are ---
  day(["I have a dog.", "יש לי כלב."], ["She has a cat.", "יש לה חתול."], ["They have two bags.", "יש להם שני תיקים."], ["We have a big house.", "יש לנו בית גדול."]),
  day(["I don't have a bike.", "אין לי אופניים."], ["She doesn't have a dog.", "אין לה כלב."], ["We don't have a car.", "אין לנו מכונית."], ["He doesn't have a bag.", "אין לו תיק."]),
  day(["There is a book on the table.", "יש ספר על השולחן."], ["There are three chairs.", "יש שלושה כיסאות."], ["There is a cat in the house.", "יש חתול בבית."], ["There are two beds.", "יש שתי מיטות."]),
  day(["There isn't a school here.", "אין כאן בית ספר."], ["Is there a cat in the house?", "האם יש חתול בבית?"], ["Are there two beds?", "האם יש שתי מיטות?"], ["Yes, there are.", "כן, יש."]),
  day(["I have a book and a bag.", "יש לי ספר ותיק."], ["She has an apple.", "יש לה תפוח."], ["There are five boys in the room.", "יש חמישה ילדים בחדר."], ["This is my house.", "זה הבית שלי."]),
  // --- Week 6: present simple, I / you / we / they ---
  day(["I play football on Sunday.", "אני משחק כדורגל ביום ראשון."], ["You drink milk in the morning.", "אתה שותה חלב בבוקר."], ["I read a book at night.", "אני קורא ספר בלילה."], ["I eat bread for breakfast.", "אני אוכל לחם בארוחת בוקר."]),
  day(["We eat bread.", "אנחנו אוכלים לחם."], ["They live in a big house.", "הם גרים בבית גדול."], ["We play games.", "אנחנו משחקים משחקים."], ["They watch TV.", "הם צופים בטלוויזיה."]),
  day(["I wake up at seven.", "אני מתעורר בשבע."], ["We eat lunch at school.", "אנחנו אוכלים ארוחת צהריים בבית הספר."], ["They watch TV in the evening.", "הם צופים בטלוויזיה בערב."], ["You go to school.", "אתה הולך לבית הספר."]),
  day(["Dogs drink water.", "כלבים שותים מים."], ["People live in houses.", "אנשים גרים בבתים."], ["Fish swim in water.", "דגים שוחים במים."], ["Cats drink milk.", "חתולים שותים חלב."]),
  day(["I play football.", "אני משחק כדורגל."], ["You go to school.", "אתה הולך לבית הספר."], ["They read a book.", "הם קוראים ספר."], ["We live here.", "אנחנו גרים כאן."]),
  // --- Week 7: present simple, he / she / it ---
  day(["She plays football.", "היא משחקת כדורגל."], ["He speaks to me.", "הוא מדבר אליי."], ["The cat drinks milk.", "החתול שותה חלב."], ["She likes music.", "היא אוהבת מוזיקה."]),
  day(["He watches TV at night.", "הוא צופה בטלוויזיה בלילה."], ["She goes to school.", "היא הולכת לבית הספר."], ["My brother plays football on Sunday.", "אחי משחק כדורגל ביום ראשון."], ["He eats rice.", "הוא אוכל אורז."]),
  day(["She studies at school.", "היא לומדת בבית הספר."], ["She plays in the garden.", "היא משחקת בגינה."], ["He studies at home.", "הוא לומד בבית."], ["My sister studies in the morning.", "אחותי לומדת בבוקר."]),
  day(["She has a dog.", "יש לה כלב."], ["He does his work at home.", "הוא עושה את העבודה שלו בבית."], ["My sister has a cat.", "לאחותי יש חתול."], ["My father does his work.", "אבא שלי עושה את העבודה שלו."]),
  day(["My sister lives in a big house.", "אחותי גרה בבית גדול."], ["My brothers play football.", "אחיי משחקים כדורגל."], ["The dog sleeps in the garden.", "הכלב ישן בגינה."], ["My mother cooks rice.", "אמא שלי מבשלת אורז."]),
  // --- Week 8: present simple, don't / doesn't ---
  day(["I don't like milk.", "אני לא אוהב חלב."], ["You don't eat bread.", "אתה לא אוכל לחם."], ["I don't watch TV.", "אני לא צופה בטלוויזיה."], ["I don't have a bike.", "אין לי אופניים."]),
  day(["She doesn't like fish.", "היא לא אוהבת דג."], ["He doesn't speak to me.", "הוא לא מדבר אליי."], ["She doesn't like tea.", "היא לא אוהבת תה."], ["He doesn't eat rice.", "הוא לא אוכל אורז."]),
  day(["We don't live in a big house.", "אנחנו לא גרים בבית גדול."], ["They don't play football.", "הם לא משחקים כדורגל."], ["My friends don't like milk.", "החברים שלי לא אוהבים חלב."], ["We don't have a car.", "אין לנו מכונית."]),
  day(["My mother doesn't work on Sunday.", "אמא שלי לא עובדת ביום ראשון."], ["My brother and I don't eat fish.", "אחי ואני לא אוכלים דג."], ["The cat doesn't drink water.", "החתול לא שותה מים."], ["They don't go to school.", "הם לא הולכים לבית הספר."]),
  day(["I do not like cold water.", "אני לא אוהב מים קרים."], ["She does not like tea.", "היא לא אוהבת תה."], ["We do not play here.", "אנחנו לא משחקים כאן."], ["He does not eat bread.", "הוא לא אוכל לחם."]),
  // --- Week 9: present simple questions ---
  day(["Do you like milk?", "האם אתה אוהב חלב?"], ["Do they play football?", "האם הם משחקים כדורגל?"], ["Do you speak to him?", "האם אתה מדבר אליו?"], ["Do you like rice?", "האם אתה אוהב אורז?"]),
  day(["Does she live here?", "האם היא גרה כאן?"], ["Does he have a dog?", "האם יש לו כלב?"], ["Does your mother work at home?", "האם אמא שלך עובדת בבית?"], ["Does she like school?", "האם היא אוהבת את בית הספר?"]),
  day(["Do you play football? Yes, I do.", "האם אתה משחק כדורגל? כן."], ["Does he like rice? No, he doesn't.", "האם הוא אוהב אורז? לא."], ["Do they live here? No, they don't.", "האם הם גרים כאן? לא."], ["Does she have a cat? Yes, she does.", "האם יש לה חתול? כן."]),
  day(["Do you like milk? Yes, I do.", "האם אתה אוהב חלב? כן."], ["Does she play football? No, she doesn't.", "האם היא משחקת כדורגל? לא."], ["Do they live here? Yes, they do.", "האם הם גרים כאן? כן."], ["Does he have a bike? No, he doesn't.", "האם יש לו אופניים? לא."]),
  day(["Is she a teacher?", "האם היא מורה?"], ["Does she like school?", "האם היא אוהבת את בית הספר?"], ["Are they at home?", "האם הם בבית?"], ["Do you like school?", "האם אתה אוהב את בית הספר?"]),
  // --- Week 10: question words ---
  day(["What do you eat?", "מה אתה אוכל?"], ["What does she drink?", "מה היא שותה?"], ["What do you do on Sunday?", "מה אתה עושה ביום ראשון?"], ["What is this?", "מה זה?"]),
  day(["Where do you live?", "איפה אתה גר?"], ["Where does your father work?", "איפה אבא שלך עובד?"], ["Where do they play?", "איפה הם משחקים?"], ["Where is the cat?", "איפה החתול?"]),
  day(["When do you wake up?", "מתי אתה מתעורר?"], ["What time is it?", "מה השעה?"], ["When does she play?", "מתי היא משחקת?"], ["It is ten.", "השעה עשר."]),
  day(["Who lives here?", "מי גר כאן?"], ["Why do you like it?", "למה אתה אוהב את זה?"], ["Because it is big.", "כי זה גדול."], ["Who is the girl?", "מי הילדה?"]),
  day(["How do you go to school?", "איך אתה הולך לבית הספר?"], ["How old are you?", "בן כמה אתה?"], ["By bus.", "באוטובוס."], ["What do you do on Friday?", "מה אתה עושה ביום שישי?"]),
  // --- Week 11: how often ---
  day(["I always eat bread for breakfast.", "אני תמיד אוכל לחם בארוחת בוקר."], ["She never drinks coffee.", "היא אף פעם לא שותה קפה."], ["We sometimes play football.", "לפעמים אנחנו משחקים כדורגל."], ["They usually go by bus.", "הם בדרך כלל נוסעים באוטובוס."]),
  day(["I always play football.", "אני תמיד משחק כדורגל."], ["He never watches TV.", "הוא אף פעם לא צופה בטלוויזיה."], ["They sometimes go to school by bus.", "לפעמים הם נוסעים לבית הספר באוטובוס."], ["She often reads books.", "היא קוראת ספרים לעיתים קרובות."]),
  day(["She is always happy.", "היא תמיד שמחה."], ["We are often at school.", "אנחנו בבית הספר לעיתים קרובות."], ["I am never late.", "אני אף פעם לא מאחר."], ["He is usually at home.", "הוא בדרך כלל בבית."]),
  day(["How often do you play football?", "באיזו תדירות אתה משחק כדורגל?"], ["Sometimes.", "לפעמים."], ["How often does she go to school?", "באיזו תדירות היא הולכת לבית הספר?"], ["Always.", "תמיד."]),
  day(["I usually wake up at seven.", "אני בדרך כלל מתעורר בשבע."], ["My father is often at home.", "אבא שלי בבית לעיתים קרובות."], ["She always drinks milk.", "היא תמיד שותה חלב."], ["We never watch TV at night.", "אנחנו אף פעם לא צופים בטלוויזיה בלילה."]),
  // --- Week 12: prepositions of place ---
  day(["The book is on the table.", "הספר על השולחן."], ["The milk is in the box.", "החלב בקופסה."], ["The cat is on the chair.", "החתול על הכיסא."], ["The bag is in the room.", "התיק בחדר."]),
  day(["My brother is at school.", "אחי בבית הספר."], ["I am at home.", "אני בבית."], ["She is at the door.", "היא ליד הדלת."], ["We are at the park.", "אנחנו בפארק."]),
  day(["The dog is under the table.", "הכלב מתחת לשולחן."], ["The garden is behind the house.", "הגינה מאחורי הבית."], ["The bus is in front of the school.", "האוטובוס מול בית הספר."], ["The cat is under the bed.", "החתול מתחת למיטה."]),
  day(["The shop is next to the school.", "החנות ליד בית הספר."], ["The park is between the shop and the school.", "הפארק בין החנות לבית הספר."], ["The girl is next to her mother.", "הילדה ליד אמא שלה."], ["The bag is next to the chair.", "התיק ליד הכיסא."]),
  day(["Where is the cat?", "איפה החתול?"], ["It is under the bed.", "הוא מתחת למיטה."], ["Where are my books?", "איפה הספרים שלי?"], ["They are in the bag.", "הם בתיק."]),
  // --- Week 13: prepositions of time ---
  day(["I wake up at seven.", "אני מתעורר בשבע."], ["The lesson is at ten.", "השיעור בעשר."], ["We eat lunch at twelve.", "אנחנו אוכלים ארוחת צהריים בשתים עשרה."], ["She goes to school at eight.", "היא הולכת לבית הספר בשמונה."]),
  day(["I play football on Sunday.", "אני משחק כדורגל ביום ראשון."], ["She works on Monday.", "היא עובדת ביום שני."], ["The shop is open on Friday.", "החנות פתוחה ביום שישי."], ["We go to school on Sunday.", "אנחנו הולכים לבית הספר ביום ראשון."]),
  day(["It is cold in winter.", "קר בחורף."], ["My birthday is in January.", "יום ההולדת שלי בינואר."], ["It is hot in summer.", "חם בקיץ."], ["We go to the park in spring.", "אנחנו הולכים לפארק באביב."]),
  day(["I eat breakfast in the morning.", "אני אוכל ארוחת בוקר בבוקר."], ["I sleep at night.", "אני ישן בלילה."], ["We watch TV in the evening.", "אנחנו צופים בטלוויזיה בערב."], ["She plays in the afternoon.", "היא משחקת אחר הצהריים."]),
  day(["I get up at seven on Monday.", "אני קם בשבע ביום שני."], ["We play in the park in summer.", "אנחנו משחקים בפארק בקיץ."], ["She reads a book at night.", "היא קוראת ספר בלילה."], ["They go to school in the morning.", "הם הולכים לבית הספר בבוקר."]),
  // --- Week 14: can / can't ---
  day(["I can swim.", "אני יודע לשחות."], ["She can sing.", "היא יודעת לשיר."], ["Fish can swim.", "דגים יודעים לשחות."], ["He can run.", "הוא יודע לרוץ."]),
  day(["I can't swim.", "אני לא יודע לשחות."], ["He can't run fast.", "הוא לא יכול לרוץ מהר."], ["She can't sing.", "היא לא יודעת לשיר."], ["We can't go.", "אנחנו לא יכולים ללכת."]),
  day(["Can you swim?", "האם אתה יודע לשחות?"], ["Can she sing?", "האם היא יודעת לשיר?"], ["Yes, I can.", "כן, אני יודע."], ["No, I can't.", "לא, אני לא יודע."]),
  day(["Can I open the door, please?", "אפשר לפתוח את הדלת, בבקשה?"], ["Can you open the window, please?", "אתה יכול לפתוח את החלון, בבקשה?"], ["Can I have some water?", "אפשר לקבל קצת מים?"], ["Can you give me a pen, please?", "אתה יכול לתת לי עט, בבקשה?"]),
  day(["I can swim, but I can't run fast.", "אני יודע לשחות, אבל אני לא יכול לרוץ מהר."], ["My brother can sing.", "אחי יודע לשיר."], ["Can your sister swim?", "האם אחותך יודעת לשחות?"], ["We can play in the park.", "אנחנו יכולים לשחק בפארק."]),
  // --- Week 15: commands and let's ---
  day(["Open the door, please.", "פתחו את הדלת, בבקשה."], ["Read your book.", "קראו בספר שלכם."], ["Sit here.", "שבו כאן."], ["Come here.", "בואו לכאן."]),
  day(["Don't run in the school.", "אל תרוצו בבית הספר."], ["Don't sit here.", "אל תשבו כאן."], ["Don't open the door.", "אל תפתחו את הדלת."], ["Don't go.", "אל תלכו."]),
  day(["Please open the window.", "בבקשה פתחו את החלון."], ["Read your book, please.", "קראו בספר שלכם, בבקשה."], ["Stand here, please.", "עמדו כאן, בבקשה."], ["Please come here.", "בבקשה בואו לכאן."]),
  day(["Let's play football.", "בואו נשחק כדורגל."], ["Let's go to the park.", "בואו נלך לפארק."], ["Let's go home.", "בואו נלך הביתה."], ["Let's read a book.", "בואו נקרא ספר."]),
  day(["Open your book.", "פתחו את הספר שלכם."], ["Don't run here.", "אל תרוצו כאן."], ["Let's eat lunch.", "בואו נאכל ארוחת צהריים."], ["Come to school at eight.", "בואו לבית הספר בשמונה."]),
  // --- Week 16: some / any ---
  day(["I have some apples.", "יש לי כמה תפוחים."], ["There is some milk.", "יש קצת חלב."], ["We eat some bread.", "אנחנו אוכלים קצת לחם."], ["She has some books.", "יש לה כמה ספרים."]),
  day(["I don't have any milk.", "אין לי חלב."], ["Do you have any apples?", "האם יש לך תפוחים?"], ["There aren't any chairs.", "אין כיסאות."], ["She doesn't have any friends here.", "אין לה חברים כאן."]),
  day(["I have some books.", "יש לי כמה ספרים."], ["I don't have any books.", "אין לי ספרים."], ["Do you have any books?", "האם יש לך ספרים?"], ["She has some friends at school.", "יש לה כמה חברים בבית הספר."]),
  day(["I want an apple.", "אני רוצה תפוח."], ["I want some milk.", "אני רוצה קצת חלב."], ["Do you have a brother?", "האם יש לך אח?"], ["We have some rice.", "יש לנו קצת אורז."]),
  day(["We have some tea.", "יש לנו קצת תה."], ["They don't have any bread.", "אין להם לחם."], ["Is there any milk in the cup?", "האם יש חלב בכוס?"], ["I have some water.", "יש לי קצת מים."]),
  // --- Week 17: how much / how many ---
  day(["Milk is good.", "חלב זה טוב."], ["I eat bread.", "אני אוכל לחם."], ["One apple, two apples.", "תפוח אחד, שני תפוחים."], ["I drink milk every day.", "אני שותה חלב כל יום."]),
  day(["How many apples do you have?", "כמה תפוחים יש לך?"], ["How many books do you have?", "כמה ספרים יש לך?"], ["How many brothers do you have?", "כמה אחים יש לך?"], ["I have two brothers.", "יש לי שני אחים."]),
  day(["How much milk do you drink?", "כמה חלב אתה שותה?"], ["How much bread do you eat?", "כמה לחם אתה אוכל?"], ["How much is the book?", "כמה עולה הספר?"], ["I drink a lot of water.", "אני שותה הרבה מים."]),
  day(["I have a lot of books.", "יש לי הרבה ספרים."], ["There is a lot of milk.", "יש הרבה חלב."], ["We eat a lot of bread.", "אנחנו אוכלים הרבה לחם."], ["She has a lot of friends.", "יש לה הרבה חברים."]),
  day(["How many apples do you want?", "כמה תפוחים אתה רוצה?"], ["How much rice do you want?", "כמה אורז אתה רוצה?"], ["How many chairs are there?", "כמה כיסאות יש?"], ["I want a lot of milk.", "אני רוצה הרבה חלב."]),
  // --- Week 18: like and love ---
  day(["I like milk.", "אני אוהב חלב."], ["She likes rice.", "היא אוהבת אורז."], ["They like music.", "הם אוהבים מוזיקה."], ["We like school.", "אנחנו אוהבים את בית הספר."]),
  day(["I love football.", "אני אוהב מאוד כדורגל."], ["She loves her dog.", "היא אוהבת מאוד את הכלב שלה."], ["We love our teacher.", "אנחנו אוהבים מאוד את המורה שלנו."], ["He loves music.", "הוא אוהב מאוד מוזיקה."]),
  day(["I like playing football.", "אני אוהב לשחק כדורגל."], ["She likes reading books.", "היא אוהבת לקרוא ספרים."], ["They love running in the park.", "הם אוהבים לרוץ בפארק."], ["He likes swimming.", "הוא אוהב לשחות."]),
  day(["Do you like rice?", "האם אתה אוהב אורז?"], ["She doesn't like fish.", "היא לא אוהבת דג."], ["Does he like football?", "האם הוא אוהב כדורגל?"], ["Yes, he does.", "כן, הוא אוהב."]),
  day(["My brother likes swimming.", "אחי אוהב לשחות."], ["I don't like cold milk.", "אני לא אוהב חלב קר."], ["I like swimming.", "אני אוהב לשחות."], ["We love music.", "אנחנו אוהבים מאוד מוזיקה."]),
  // --- Week 19: present continuous ---
  day(["I am playing football now.", "אני משחק כדורגל עכשיו."], ["She is reading a book.", "היא קוראת ספר."], ["They are watching TV.", "הם צופים בטלוויזיה."], ["He is eating bread.", "הוא אוכל לחם."]),
  day(["I am eating.", "אני אוכל."], ["He is sleeping.", "הוא ישן."], ["We are playing.", "אנחנו משחקים."], ["They are running.", "הם רצים."]),
  day(["She is running.", "היא רצה."], ["We are making lunch.", "אנחנו מכינים ארוחת צהריים."], ["He is swimming.", "הוא שוחה."], ["I am walking.", "אני הולך."]),
  day(["I am not playing.", "אני לא משחק."], ["He is not sleeping.", "הוא לא ישן."], ["They aren't watching TV.", "הם לא צופים בטלוויזיה."], ["She isn't eating.", "היא לא אוכלת."]),
  day(["Is she reading?", "האם היא קוראת?"], ["Are they playing?", "האם הם משחקים?"], ["What are you doing?", "מה אתה עושה?"], ["I am reading a book.", "אני קורא ספר."]),
  // --- Week 20: simple or continuous ---
  day(["I play football every Sunday.", "אני משחק כדורגל כל יום ראשון."], ["Now I am watching TV.", "עכשיו אני צופה בטלוויזיה."], ["She drinks milk every morning.", "היא שותה חלב כל בוקר."], ["Now the dog is running.", "עכשיו הכלב רץ."]),
  day(["Now I am at home.", "עכשיו אני בבית."], ["They play football on Sundays.", "הם משחקים כדורגל בימי ראשון."], ["I am at school every day.", "אני בבית הספר כל יום."], ["Now he is sleeping.", "עכשיו הוא ישן."]),
  day(["I like rice.", "אני אוהב אורז."], ["She has a dog.", "יש לה כלב."], ["We want a new bag.", "אנחנו רוצים תיק חדש."], ["He has a bike.", "יש לו אופניים."]),
  day(["What do you do every day?", "מה אתה עושה כל יום?"], ["What are you doing?", "מה אתה עושה עכשיו?"], ["What does your father do?", "מה אבא שלך עושה?"], ["What is he doing now?", "מה הוא עושה עכשיו?"]),
  day(["My father works at home every Sunday.", "אבא שלי עובד בבית כל יום ראשון."], ["The baby is sleeping.", "התינוק ישן עכשיו."], ["I like milk.", "אני אוהב חלב."], ["We have a dog.", "יש לנו כלב."]),
  // --- Week 21: adjectives ---
  day(["It is a big house.", "זה בית גדול."], ["I have a small cat.", "יש לי חתול קטן."], ["She has a red bag.", "יש לה תיק אדום."], ["He has a new bike.", "יש לו אופניים חדשים."]),
  day(["Two small cats.", "שני חתולים קטנים."], ["Three big houses.", "שלושה בתים גדולים."], ["Four red apples.", "ארבעה תפוחים אדומים."], ["Five new books.", "חמישה ספרים חדשים."]),
  day(["The house is big.", "הבית גדול."], ["The cats are small.", "החתולים קטנים."], ["My bags are red.", "התיקים שלי אדומים."], ["The water is cold.", "המים קרים."]),
  day(["It is very cold.", "קר מאוד."], ["She is very happy.", "היא שמחה מאוד."], ["I am very tired.", "אני עייף מאוד."], ["The bag is very big.", "התיק גדול מאוד."]),
  day(["It is an old house.", "זה בית ישן."], ["She is a happy girl.", "היא ילדה שמחה."], ["It is a big apple.", "זה תפוח גדול."], ["He has an old bag.", "יש לו תיק ישן."]),
  // --- Week 22: comparing two things ---
  day(["The dog is bigger than the cat.", "הכלב גדול מהחתול."], ["My bag is smaller than your bag.", "התיק שלי קטן מהתיק שלך."], ["He is taller than me.", "הוא גבוה ממני."], ["My brother is older than me.", "אחי מבוגר ממני."]),
  day(["Today is hotter than yesterday.", "היום חם יותר מאתמול."], ["My house is bigger than your house.", "הבית שלי גדול מהבית שלך."], ["It is colder today.", "היום קר יותר."], ["This bag is bigger.", "התיק הזה גדול יותר."]),
  day(["The garden is more beautiful than the house.", "הגינה יפה יותר מהבית."], ["This book is more difficult than that book.", "הספר הזה קשה יותר מהספר ההוא."], ["This book is more interesting.", "הספר הזה מעניין יותר."], ["The game is more interesting.", "המשחק מעניין יותר."]),
  day(["She is taller than me.", "היא גבוהה ממני."], ["The red bag is bigger than the blue bag.", "התיק האדום גדול מהתיק הכחול."], ["My father is older than my mother.", "אבא שלי מבוגר מאמא שלי."], ["This bag is smaller than that bag.", "התיק הזה קטן מהתיק ההוא."]),
  day(["The bus is bigger than the car.", "האוטובוס גדול מהמכונית."], ["The soup is hotter than the milk.", "המרק חם יותר מהחלב."], ["This book is more interesting than that book.", "הספר הזה מעניין יותר מהספר ההוא."], ["My sister is taller than my brother.", "אחותי גבוהה מאחי."]),
  // --- Week 23: the best, the biggest ---
  day(["This is the biggest house.", "זה הבית הכי גדול."], ["The mouse is the smallest animal in the house.", "העכבר הוא החיה הכי קטנה בבית."], ["He is the tallest boy.", "הוא הילד הכי גבוה."], ["She is the oldest girl in the class.", "היא הילדה הכי מבוגרת בכיתה."]),
  day(["Today is the hottest day.", "היום הוא היום הכי חם."], ["This is the biggest bag.", "זה התיק הכי גדול."], ["He is the tallest boy in the class.", "הוא הילד הכי גבוה בכיתה."], ["It is the coldest day.", "זה היום הכי קר."]),
  day(["This is the most beautiful garden.", "זו הגינה הכי יפה."], ["She has the most difficult book.", "יש לה את הספר הכי קשה."], ["This is the most interesting game.", "זה המשחק הכי מעניין."], ["This is the most interesting book.", "זה הספר הכי מעניין."]),
  day(["She is the tallest girl in the class.", "היא הילדה הכי גבוהה בכיתה."], ["This is the biggest house in the street.", "זה הבית הכי גדול ברחוב."], ["He is the oldest boy in the school.", "הוא הילד הכי מבוגר בבית הספר."], ["My brother is the tallest in my family.", "אחי הוא הכי גבוה במשפחה שלי."]),
  day(["My bag is bigger than your bag.", "התיק שלי גדול מהתיק שלך."], ["This is the best bag in the shop.", "זה התיק הכי טוב בחנות."], ["She is taller than her sister.", "היא גבוהה מאחותה."], ["This is the best book.", "זה הספר הכי טוב."]),
  // --- Week 24: object pronouns ---
  day(["I love my sister. I love her.", "אני אוהב את אחותי. אני אוהב אותה."], ["My brother is here. I see him.", "אחי כאן. אני רואה אותו."], ["You are my friend. I like you.", "אתה החבר שלי. אני מחבב אותך."], ["I have a dog. I love it.", "יש לי כלב. אני אוהב אותו."]),
  day(["We are friends. She likes us.", "אנחנו חברים. היא מחבבת אותנו."], ["My friends are here. I see them.", "החברים שלי כאן. אני רואה אותם."], ["My mother loves us.", "אמא שלי אוהבת אותנו."], ["I play with them.", "אני משחק איתם."]),
  day(["I have a cat. I like it.", "יש לי חתול. אני מחבב אותו."], ["She has a book. She reads it.", "יש לה ספר. היא קוראת בו."], ["We have a house. We like it.", "יש לנו בית. אנחנו אוהבים אותו."], ["He has a bike. He likes it.", "יש לו אופניים. הוא אוהב אותם."]),
  day(["She loves me.", "היא אוהבת אותי."], ["I see him.", "אני רואה אותו."], ["They like us.", "הם מחבבים אותנו."], ["I like her.", "אני מחבב אותה."]),
  day(["My sister is here. I play with her.", "אחותי כאן. אני משחק איתה."], ["My friends are here. We play with them.", "החברים שלי כאן. אנחנו משחקים איתם."], ["You are here. I see you.", "אתה כאן. אני רואה אותך."], ["My father is here. I see him.", "אבא שלי כאן. אני רואה אותו."]),
  // --- Week 25: want and would like ---
  day(["I want an apple.", "אני רוצה תפוח."], ["She wants some milk.", "היא רוצה קצת חלב."], ["They want a new house.", "הם רוצים בית חדש."], ["We want some rice.", "אנחנו רוצים קצת אורז."]),
  day(["I want to play.", "אני רוצה לשחק."], ["She wants to read a book.", "היא רוצה לקרוא ספר."], ["We want to go home.", "אנחנו רוצים ללכת הביתה."], ["He wants to swim.", "הוא רוצה לשחות."]),
  day(["I don't want milk.", "אני לא רוצה חלב."], ["She doesn't want to play.", "היא לא רוצה לשחק."], ["He doesn't want to go.", "הוא לא רוצה ללכת."], ["We don't want to read.", "אנחנו לא רוצים לקרוא."]),
  day(["I would like some milk, please.", "הייתי רוצה קצת חלב, בבקשה."], ["She would like an apple.", "היא הייתה רוצה תפוח."], ["We would like some bread, please.", "היינו רוצים קצת לחם, בבקשה."], ["I would like some rice.", "הייתי רוצה קצת אורז."]),
  day(["Would you like some milk?", "האם תרצה קצת חלב?"], ["Yes, please.", "כן, בבקשה."], ["No, thank you.", "לא, תודה."], ["Would you like some rice?", "האם תרצה קצת אורז?"]),
  // --- Week 26: was / were ---
  day(["Yesterday I was at home.", "אתמול הייתי בבית."], ["Yesterday she was happy.", "אתמול היא הייתה שמחה."], ["The cat was in the garden.", "החתול היה בגינה."], ["He was at school.", "הוא היה בבית הספר."]),
  day(["Yesterday we were at school.", "אתמול היינו בבית הספר."], ["They were at the park.", "הם היו בפארק."], ["You were in the kitchen.", "היית במטבח."], ["We were at home.", "היינו בבית."]),
  day(["I was not tired.", "לא הייתי עייף."], ["He wasn't at school yesterday.", "הוא לא היה אתמול בבית הספר."], ["They weren't at home.", "הם לא היו בבית."], ["She wasn't happy.", "היא לא הייתה שמחה."]),
  day(["Were you at home yesterday?", "האם היית אתמול בבית?"], ["Was she happy?", "האם היא הייתה שמחה?"], ["Yes, I was.", "כן, הייתי."], ["No, he wasn't.", "לא, הוא לא היה."]),
  day(["Now I am at home.", "עכשיו אני בבית."], ["Yesterday I was at school.", "אתמול הייתי בבית הספר."], ["Yesterday we were at the park.", "אתמול היינו בפארק."], ["Now we are at home.", "עכשיו אנחנו בבית."]),
  // --- Week 27: past simple, regular verbs ---
  day(["Yesterday I played football.", "אתמול שיחקתי כדורגל."], ["She watched TV.", "היא צפתה בטלוויזיה."], ["We walked in the park.", "הלכנו בפארק."], ["He cooked rice.", "הוא בישל אורז."]),
  day(["Yesterday he cooked rice.", "אתמול הוא בישל אורז."], ["They opened the door.", "הם פתחו את הדלת."], ["My brother opened his bag.", "אחי פתח את התיק שלו."], ["I played in the garden.", "שיחקתי בגינה."]),
  day(["I lived in a small house.", "גרתי בבית קטן."], ["She liked the game.", "היא אהבה את המשחק."], ["We loved the park.", "אהבנו מאוד את הפארק."], ["He liked music.", "הוא אהב מוזיקה."]),
  day(["I played football yesterday.", "שיחקתי כדורגל אתמול."], ["We watched TV last night.", "צפינו בטלוויזיה אתמול בלילה."], ["She cooked rice last week.", "היא בישלה אורז בשבוע שעבר."], ["They walked to school.", "הם הלכו לבית הספר."]),
  day(["Every day I play football.", "כל יום אני משחק כדורגל."], ["Yesterday I played football.", "אתמול שיחקתי כדורגל."], ["Last night she cooked rice.", "אתמול בלילה היא בישלה אורז."], ["Yesterday we walked in the park.", "אתמול הלכנו בפארק."]),
  // --- Week 28: past simple, questions and no ---
  day(["I didn't play football yesterday.", "לא שיחקתי כדורגל אתמול."], ["She didn't watch TV.", "היא לא צפתה בטלוויזיה."], ["They didn't cook rice.", "הם לא בישלו אורז."], ["We didn't walk.", "לא הלכנו."]),
  day(["He didn't open the door.", "הוא לא פתח את הדלת."], ["We didn't walk in the park.", "לא הלכנו בפארק."], ["I didn't play.", "לא שיחקתי."], ["She didn't cook.", "היא לא בישלה."]),
  day(["Did you play football yesterday?", "האם שיחקת כדורגל אתמול?"], ["Did she watch TV?", "האם היא צפתה בטלוויזיה?"], ["Did you open the door?", "האם פתחת את הדלת?"], ["Did they walk?", "האם הם הלכו?"]),
  day(["Did you cook? Yes, I did.", "האם בישלת? כן."], ["Did he play? No, he didn't.", "האם הוא שיחק? לא."], ["Did they walk? Yes, they did.", "האם הם הלכו? כן."], ["Did she watch TV? No, she didn't.", "האם היא צפתה בטלוויזיה? לא."]),
  day(["What did you eat yesterday?", "מה אכלת אתמול?"], ["Where did she play?", "איפה היא שיחקה?"], ["Why did you open the door?", "למה פתחת את הדלת?"], ["When did you play?", "מתי שיחקת?"]),
  // --- Week 29: time words for the past ---
  day(["I watched TV yesterday evening.", "צפיתי בטלוויזיה אתמול בערב."], ["We played football yesterday morning.", "שיחקנו כדורגל אתמול בבוקר."], ["She cooked rice yesterday afternoon.", "היא בישלה אורז אתמול אחר הצהריים."], ["I walked in the park yesterday.", "הלכתי בפארק אתמול."]),
  day(["We played football last Sunday.", "שיחקנו כדורגל ביום ראשון שעבר."], ["I was at school last week.", "הייתי בבית הספר בשבוע שעבר."], ["They lived here last year.", "הם גרו כאן בשנה שעברה."], ["She cooked rice last night.", "היא בישלה אורז אתמול בלילה."]),
  day(["I was at school on Monday.", "הייתי בבית הספר ביום שני."], ["It was cold in winter.", "היה קר בחורף."], ["We played football at ten.", "שיחקנו כדורגל בעשר."], ["I was at home in the morning.", "הייתי בבית בבוקר."]),
  day(["When did you play?", "מתי שיחקת?"], ["Yesterday.", "אתמול."], ["When did she cook rice?", "מתי היא בישלה אורז?"], ["Last night.", "אתמול בלילה."]),
  day(["I play football every day.", "אני משחק כדורגל כל יום."], ["Yesterday I played football.", "אתמול שיחקתי כדורגל."], ["Last week she was at home.", "בשבוע שעבר היא הייתה בבית."], ["Now I am at school.", "עכשיו אני בבית הספר."]),
  // --- Week 30: going to ---
  day(["Tomorrow I am going to play football.", "מחר אני הולך לשחק כדורגל."], ["She is going to watch TV.", "היא הולכת לצפות בטלוויזיה."], ["We are going to walk in the park.", "אנחנו הולכים לטייל בפארק."], ["He is going to cook rice.", "הוא הולך לבשל אורז."]),
  day(["I am going to cook.", "אני הולך לבשל."], ["He is going to play.", "הוא הולך לשחק."], ["They are going to swim.", "הם הולכים לשחות."], ["We are going to read.", "אנחנו הולכים לקרוא."]),
  day(["I am not going to play.", "אני לא הולך לשחק."], ["She isn't going to cook.", "היא לא הולכת לבשל."], ["They aren't going to watch TV.", "הם לא הולכים לצפות בטלוויזיה."], ["He isn't going to run.", "הוא לא הולך לרוץ."]),
  day(["Are you going to play?", "האם אתה הולך לשחק?"], ["Is she going to cook rice?", "האם היא הולכת לבשל אורז?"], ["What are you going to do?", "מה אתה הולך לעשות?"], ["Are they going to swim?", "האם הם הולכים לשחות?"]),
  day(["I am going to play football tomorrow.", "אני הולך לשחק כדורגל מחר."], ["We are going to walk next week.", "אנחנו הולכים לטייל בשבוע הבא."], ["She is going to cook tomorrow night.", "היא הולכת לבשל מחר בערב."], ["They are going to read tomorrow.", "הם הולכים לקרוא מחר."]),
  // --- Week 31: and, but, or ---
  day(["I have a cat and a dog.", "יש לי חתול וכלב."], ["She likes milk and rice.", "היא אוהבת חלב ואורז."], ["We play football and we read books.", "אנחנו משחקים כדורגל וקוראים ספרים."], ["He has a bag and a book.", "יש לו תיק וספר."]),
  day(["I like milk, but I don't like cold milk.", "אני אוהב חלב, אבל לא אוהב חלב קר."], ["It is sunny, but it is cold.", "יש שמש, אבל קר."], ["I want to play, but I am tired.", "אני רוצה לשחק, אבל אני עייף."], ["She is small, but she is strong.", "היא קטנה, אבל היא חזקה."]),
  day(["Do you want milk or water?", "האם אתה רוצה חלב או מים?"], ["Is it a cat or a dog?", "האם זה חתול או כלב?"], ["Do you play football or read a book?", "האם אתה משחק כדורגל או קורא ספר?"], ["Is it big or small?", "האם זה גדול או קטן?"]),
  day(["I have a bag and a book.", "יש לי תיק וספר."], ["She is happy, but she is tired.", "היא שמחה, אבל היא עייפה."], ["Is it hot or cold?", "האם זה חם או קר?"], ["I play football, and she reads.", "אני משחק כדורגל, והיא קוראת."]),
  day(["I read a book, and he plays.", "אני קורא ספר, והוא משחק."], ["I am small, but I am strong.", "אני קטן, אבל אני חזק."], ["Do you want to play or read?", "האם אתה רוצה לשחק או לקרוא?"], ["We eat bread and rice.", "אנחנו אוכלים לחם ואורז."]),
  // --- Week 32: because and so ---
  day(["I eat bread because I am hungry.", "אני אוכל לחם כי אני רעב."], ["She is happy because it is Friday.", "היא שמחה כי יום שישי."], ["We stay at home because it is cold.", "אנחנו נשארים בבית כי קר."], ["I sleep because I am tired.", "אני ישן כי אני עייף."]),
  day(["I am hungry, so I eat bread.", "אני רעב, ולכן אני אוכל לחם."], ["It is cold, so we stay at home.", "קר, ולכן אנחנו נשארים בבית."], ["She is tired, so she sleeps.", "היא עייפה, ולכן היא ישנה."], ["It is hot, so I drink water.", "חם, ולכן אני שותה מים."]),
  day(["Why are you happy? Because it is Sunday.", "למה אתה שמח? כי יום שישי."], ["Why do you eat? Because I am hungry.", "למה אתה אוכל? כי אני רעב."], ["Why is she at home? Because she is tired.", "למה היא בבית? כי היא עייפה."], ["Why do you like it?", "למה אתה אוהב את זה?"]),
  day(["I go home because I am cold.", "אני הולך הביתה כי קר לי."], ["I am cold, so I go home.", "קר לי, ולכן אני הולך הביתה."], ["I drink water because it is hot.", "אני שותה מים כי חם."], ["I like milk because it is good.", "אני אוהב חלב כי הוא טוב."]),
  day(["I like tea, but I don't like cold tea.", "אני אוהב תה, אבל לא אוהב תה קר."], ["It is night, so I sleep.", "עכשיו לילה, ולכן אני ישן."], ["He is sad because it is raining.", "הוא עצוב כי יורד גשם."], ["I am hungry, so I eat.", "אני רעב, ולכן אני אוכל."]),
  // --- Week 33: asking politely ---
  day(["Can I have some water, please?", "אפשר לקבל קצת מים, בבקשה?"], ["Can I have some bread, please?", "אפשר לקבל קצת לחם, בבקשה?"], ["Can I have some rice?", "אפשר לקבל קצת אורז?"], ["Can I have some milk, please?", "אפשר לקבל קצת חלב, בבקשה?"]),
  day(["Can you give me a pencil, please?", "אתה יכול לתת לי עיפרון, בבקשה?"], ["Can you open the door, please?", "אתה יכול לפתוח את הדלת, בבקשה?"], ["Can you give me a book, please?", "אתה יכול לתת לי ספר, בבקשה?"], ["Can you open the window?", "אתה יכול לפתוח את החלון?"]),
  day(["Here is your milk. Thank you.", "הנה החלב שלך. תודה."], ["Thank you! You're welcome.", "תודה! על לא דבר."], ["Can I have some tea, please?", "אפשר לקבל קצת תה, בבקשה?"], ["Thank you very much.", "תודה רבה."]),
  day(["Excuse me, where is the shop?", "סליחה, איפה החנות?"], ["Sorry, I am late.", "סליחה, אני מאחר."], ["Sorry! That's OK.", "סליחה! זה בסדר."], ["Excuse me, can I come in?", "סליחה, אפשר להיכנס?"]),
  day(["Can I have some cheese, please?", "אפשר לקבל קצת גבינה, בבקשה?"], ["Can you give me a bag, please?", "אתה יכול לתת לי תיק, בבקשה?"], ["Here is your rice. Thank you.", "הנה האורז שלך. תודה."], ["Excuse me, where is the bus?", "סליחה, איפה האוטובוס?"]),
  // --- Week 34: questions review ---
  day(["Is your brother at home?", "האם אחיך בבית?"], ["Am I late?", "האם אני מאחר?"], ["Are the books on the table?", "האם הספרים על השולחן?"], ["Is she at school?", "האם היא בבית הספר?"]),
  day(["Do you like milk every day?", "האם אתה אוהב חלב כל יום?"], ["Did she play football yesterday?", "האם היא שיחקה כדורגל אתמול?"], ["Does he live here now?", "האם הוא גר כאן עכשיו?"], ["Do they play football?", "האם הם משחקים כדורגל?"]),
  day(["Where were you yesterday?", "איפה היית אתמול?"], ["What does she eat every day?", "מה היא אוכלת כל יום?"], ["Who is your teacher?", "מי המורה שלך?"], ["Where do you live?", "איפה אתה גר?"]),
  day(["Where do you live? In a house.", "איפה אתה גר? בבית."], ["When did you play? Yesterday.", "מתי שיחקת? אתמול."], ["Why are you happy? Because it is Sunday.", "למה אתה שמח? כי יום שישי."], ["Who is that girl?", "מי הילדה הזאת?"]),
  day(["Did you play football yesterday?", "האם שיחקת כדורגל אתמול?"], ["Can she swim?", "האם היא יודעת לשחות?"], ["Are you going to play?", "האם אתה הולך לשחק?"], ["What are you doing?", "מה אתה עושה?"]),
  // --- Week 35: everything together ---
  day(["My sister has a dog.", "לאחותי יש כלב."], ["Yesterday we were at the park.", "אתמול היינו בפארק."], ["They have a big house.", "יש להם בית גדול."], ["She is my friend.", "היא החברה שלי."]),
  day(["I play football every Sunday.", "אני משחק כדורגל כל יום ראשון."], ["Now she is reading a book.", "עכשיו היא קוראת ספר."], ["My brother cooks rice every day.", "אחי מבשל אורז כל יום."], ["We like music.", "אנחנו אוהבים מוזיקה."]),
  day(["Yesterday I watched TV.", "אתמול צפיתי בטלוויזיה."], ["Tomorrow I am going to play football.", "מחר אני הולך לשחק כדורגל."], ["Last night we didn't cook.", "אתמול בלילה לא בישלנו."], ["She can swim.", "היא יודעת לשחות."]),
  day(["The dog is bigger than the cat.", "הכלב גדול מהחתול."], ["I don't have any milk.", "אין לי חלב."], ["How many apples do you want?", "כמה תפוחים אתה רוצה?"], ["My house is the biggest in the street.", "הבית שלי הוא הכי גדול ברחוב."]),
  day(["I like to play football and read books.", "אני אוהב לשחק כדורגל ולקרוא ספרים."], ["I go to school every day.", "אני הולך לבית הספר כל יום."], ["Yesterday I was at the park.", "אתמול הייתי בפארק."], ["Tomorrow I am going to swim.", "מחר אני הולך לשחות."]),
];
