// Round 10 of additional Reading and Listening content — A1, batch 1 of 2.
//
// Written one item per learning day to fill the year of curated A1 passages.
// Same shape as round 9: fully bilingual (`textHe` / `transcriptHe`,
// `questionHe` + `optionsHe`), two questions per item, every explanation
// quoting the text. Written mostly from the A1 word cards so that the app's
// vocabulary gate (CURATED_TOLERANCE in src/services/content.ts) lets each
// item through; `node scripts/check-curated.mjs A1 --from 36` verifies that.
// Topics are tracked in docs/CONTENT-TOPICS.md.

const R = (title, text, textHe, glossary, questions) => ({ title, text, textHe, glossary, questions });
const g = (word, partOfSpeech, definition, example, translation) => ({ word, partOfSpeech, definition, example, translation });
const q = (question, questionHe, options, optionsHe, correctIndex, explanation) => ({ question, questionHe, options, optionsHe, correctIndex, explanation });
const L = (transcript, transcriptHe, questions) => ({ transcript, transcriptHe, questions });

// --- READING ---------------------------------------------------------------
export const MORE_READINGS10 = {
  A1: [
    R(
      "Friday Dinner at Grandma's (ארוחת יום שישי אצל סבתא)",
      "Every Friday we eat dinner at my grandmother's house. She makes chicken, rice and a big salad. All my cousins come too. We eat, we talk and we laugh together.",
      "בכל יום שישי אנחנו אוכלים ארוחת ערב בבית של סבתא שלי. היא מכינה עוף, אורז וסלט גדול. כל בני הדודים שלי באים גם. אנחנו אוכלים, מדברים וצוחקים ביחד.",
      [
        g("cousin", "noun", "הבן או הבת של הדוד או הדודה", "My cousin is ten.", "בן דוד"),
        g("salad", "noun", "ירקות חתוכים בצלחת", "I like salad.", "סלט"),
        g("laugh", "verb", "להשמיע קול כשמשהו מצחיק", "We laugh together.", "לצחוק"),
      ],
      [
        q("When do they eat at Grandma's house?", "מתי הם אוכלים בבית של סבתא?", ["Every Monday", "Every Friday", "Every Sunday", "Every morning"], ["כל יום שני", "כל יום שישי", "כל יום ראשון", "כל בוקר"], 1, "כתוב 'Every Friday we eat dinner'."),
        q("Who comes too?", "מי בא גם?", ["The neighbours", "The cousins", "The teacher", "The doctor"], ["השכנים", "בני הדודים", "המורה", "הרופא"], 1, "כתוב 'All my cousins come too'."),
      ],
    ),
    R(
      "The Football Game (משחק הכדורגל)",
      "Today we play football at school. There are two teams. I am in the red team. My friend is in the blue team. We play for one hour and we are very hot after the game.",
      "היום אנחנו משחקים כדורגל בבית הספר. יש שתי קבוצות. אני בקבוצה האדומה. החבר שלי בקבוצה הכחולה. אנחנו משחקים שעה אחת ואחרי המשחק חם לנו מאוד.",
      [
        g("team", "noun", "קבוצה של שחקנים", "My team is good.", "קבוצה"),
        g("game", "noun", "פעילות שמשחקים בה", "The game is fun.", "משחק"),
        g("hour", "noun", "שישים דקות", "We play for one hour.", "שעה"),
      ],
      [
        q("Which team is the writer in?", "באיזו קבוצה הכותב?", ["The blue team", "The red team", "The green team", "The yellow team"], ["הקבוצה הכחולה", "הקבוצה האדומה", "הקבוצה הירוקה", "הקבוצה הצהובה"], 1, "כתוב 'I am in the red team'."),
        q("How long do they play?", "כמה זמן הם משחקים?", ["One hour", "Ten minutes", "Two hours", "One day"], ["שעה אחת", "עשר דקות", "שעתיים", "יום אחד"], 0, "כתוב 'We play for one hour'."),
      ],
    ),
    R(
      "My Swimming Lesson (שיעור השחייה שלי)",
      "On Tuesday I have a swimming lesson. The pool is big and the water is warm. My teacher is a young woman. She says, \"Be strong! You can swim!\" I like the lesson very much.",
      "ביום שלישי יש לי שיעור שחייה. הבריכה גדולה והמים חמימים. המורה שלי היא אישה צעירה. היא אומרת: \"היה חזק! אתה יכול לשחות!\" אני אוהב את השיעור מאוד.",
      [
        g("pool", "noun", "מקום גדול עם מים לשחייה", "The pool is big.", "בריכה"),
        g("lesson", "noun", "זמן של לימוד", "I have a lesson today.", "שיעור"),
        g("strong", "adjective", "בעל כוח", "He is strong.", "חזק"),
      ],
      [
        q("When is the swimming lesson?", "מתי שיעור השחייה?", ["On Monday", "On Tuesday", "On Friday", "On Sunday"], ["ביום שני", "ביום שלישי", "ביום שישי", "ביום ראשון"], 1, "כתוב 'On Tuesday I have a swimming lesson'."),
        q("How is the water?", "איך המים?", ["Cold", "Warm", "Dirty", "Hot"], ["קרים", "חמימים", "מלוכלכים", "חמים מאוד"], 1, "כתוב 'the water is warm'."),
      ],
    ),
    R(
      "Floating in the Dead Sea (צפים בים המלח)",
      "Today my family goes to the Dead Sea. The water has a lot of salt. I sit in the water and I float! I read a book and I do not go down. My father laughs and takes a photo.",
      "היום המשפחה שלי נוסעת לים המלח. במים יש הרבה מלח. אני יושב במים וצף! אני קורא ספר ואני לא שוקע. אבא שלי צוחק ומצלם תמונה.",
      [
        g("float", "verb", "להישאר על פני המים", "I float on the water.", "לצוף"),
        g("salt", "noun", "אבקה לבנה שנותנת טעם לאוכל", "The sea has salt.", "מלח"),
        g("photo", "noun", "תמונה מהמצלמה", "He takes a photo.", "תמונה"),
      ],
      [
        q("What is in the water?", "מה יש במים?", ["A lot of salt", "A lot of fish", "A lot of ice", "A lot of leaves"], ["הרבה מלח", "הרבה דגים", "הרבה קרח", "הרבה עלים"], 0, "כתוב 'The water has a lot of salt'."),
        q("What does the writer do in the water?", "מה הכותב עושה במים?", ["Eats lunch", "Reads a book", "Sleeps", "Plays football"], ["אוכל ארוחת צהריים", "קורא ספר", "ישן", "משחק כדורגל"], 1, "כתוב 'I read a book'."),
      ],
    ),
    R(
      "The School Trip (הטיול של בית הספר)",
      "Tomorrow our class goes on a trip to the museum. We take the bus at eight. I bring water and a sandwich in my bag. The teacher says, \"Stay with your group, please.\"",
      "מחר הכיתה שלנו יוצאת לטיול למוזיאון. אנחנו לוקחים את האוטובוס בשמונה. אני מביא מים וכריך בתיק. המורה אומרת: \"הישארו עם הקבוצה שלכם, בבקשה.\"",
      [
        g("museum", "noun", "מקום שמראים בו דברים ישנים או יפים", "We visit the museum.", "מוזיאון"),
        g("sandwich", "noun", "לחם עם גבינה או ירקות", "I eat a sandwich.", "כריך"),
        g("group", "noun", "כמה אנשים ביחד", "Stay with the group.", "קבוצה"),
      ],
      [
        q("Where does the class go?", "לאן הכיתה הולכת?", ["To the zoo", "To the museum", "To the beach", "To the park"], ["לגן החיות", "למוזיאון", "לים", "לפארק"], 1, "כתוב 'a trip to the museum'."),
        q("What does the writer bring?", "מה הכותב מביא?", ["Water and a sandwich", "A ball and a hat", "A phone and a camera", "Milk and cake"], ["מים וכריך", "כדור וכובע", "טלפון ומצלמה", "חלב ועוגה"], 0, "כתוב 'water and a sandwich in my bag'."),
      ],
    ),
    R(
      "My Little Brother (האח הקטן שלי)",
      "I have a little brother. His name is Noam. He is four years old. He likes cars and he does not like soup. Every evening he says, \"Read me a story, please!\"",
      "יש לי אח קטן. קוראים לו נועם. הוא בן ארבע. הוא אוהב מכוניות והוא לא אוהב מרק. בכל ערב הוא אומר: \"תקרא לי סיפור, בבקשה!\"",
      [
        g("brother", "noun", "בן באותה משפחה", "My brother is little.", "אח"),
        g("car", "noun", "כלי רכב עם ארבעה גלגלים", "He likes cars.", "מכונית"),
        g("story", "noun", "מה שמספרים או קוראים", "I read a story.", "סיפור"),
      ],
      [
        q("How old is Noam?", "בן כמה נועם?", ["Two", "Four", "Six", "Eight"], ["שתיים", "ארבע", "שש", "שמונה"], 1, "כתוב 'He is four years old'."),
        q("What does Noam want every evening?", "מה נועם רוצה בכל ערב?", ["A story", "A song", "A game", "A cake"], ["סיפור", "שיר", "משחק", "עוגה"], 0, "כתוב 'Read me a story, please'."),
      ],
    ),
    R(
      "The Lunch Box (קופסת האוכל)",
      "I open my lunch box at school. I have bread, cheese and a red apple. My friend has a banana and a cookie. We share our food and we are happy.",
      "אני פותח את קופסת האוכל בבית הספר. יש לי לחם, גבינה ותפוח אדום. לחבר שלי יש בננה ועוגייה. אנחנו חולקים את האוכל ואנחנו שמחים.",
      [
        g("lunch box", "noun", "קופסה עם אוכל לבית הספר", "My lunch box is blue.", "קופסת אוכל"),
        g("share", "verb", "לתת חלק לאחר", "We share our food.", "לחלוק"),
        g("cookie", "noun", "עוגייה קטנה", "I eat a cookie.", "עוגייה"),
      ],
      [
        q("What fruit does the writer have?", "איזה פרי יש לכותב?", ["A banana", "An orange", "A red apple", "A lemon"], ["בננה", "תפוז", "תפוח אדום", "לימון"], 2, "כתוב 'a red apple'."),
        q("What do the friends do with their food?", "מה החברים עושים עם האוכל?", ["They share it", "They throw it", "They sell it", "They hide it"], ["הם חולקים אותו", "הם זורקים אותו", "הם מוכרים אותו", "הם מסתירים אותו"], 0, "כתוב 'We share our food'."),
      ],
    ),
    R(
      "The New Teacher (המורה החדשה)",
      "Today we have a new teacher. Her name is Dana. She is tall and she has a big smile. She says, \"Good morning, class! Let's learn new words.\" I like her.",
      "היום יש לנו מורה חדשה. קוראים לה דנה. היא גבוהה ויש לה חיוך גדול. היא אומרת: \"בוקר טוב, כיתה! בואו נלמד מילים חדשות.\" אני אוהב אותה.",
      [
        g("tall", "adjective", "גבוה", "My father is tall.", "גבוה"),
        g("smile", "noun", "הבעה שמחה בפנים", "She has a big smile.", "חיוך"),
        g("learn", "verb", "לדעת דברים חדשים", "I learn new words.", "ללמוד"),
      ],
      [
        q("What is the new teacher like?", "איך המורה החדשה?", ["Short and sad", "Tall with a big smile", "Old and tired", "Young and angry"], ["נמוכה ועצובה", "גבוהה עם חיוך גדול", "זקנה ועייפה", "צעירה וכועסת"], 1, "כתוב 'She is tall and she has a big smile'."),
        q("What will the class learn?", "מה הכיתה תלמד?", ["Math", "New words", "Music", "Games"], ["חשבון", "מילים חדשות", "מוזיקה", "משחקים"], 1, "כתוב 'Let's learn new words'."),
      ],
    ),
    R(
      "The Math Test (מבחן החשבון)",
      "Today we have a math test. I am a little worried. The questions are not easy, but I think and I try. At the end the teacher says, \"Good work!\" Now I am very happy.",
      "היום יש לנו מבחן בחשבון. אני קצת מודאג. השאלות לא קלות, אבל אני חושב ומנסה. בסוף המורה אומרת: \"עבודה טובה!\" עכשיו אני מאוד שמח.",
      [
        g("test", "noun", "בדיקה של מה שלמדת", "We have a test today.", "מבחן"),
        g("worried", "adjective", "חושש שיקרה משהו רע", "I am a little worried.", "מודאג"),
        g("try", "verb", "לעשות מאמץ", "I try again.", "לנסות"),
      ],
      [
        q("How does the writer feel before the test?", "איך הכותב מרגיש לפני המבחן?", ["Happy", "A little worried", "Bored", "Angry"], ["שמח", "קצת מודאג", "משועמם", "כועס"], 1, "כתוב 'I am a little worried'."),
        q("What does the teacher say at the end?", "מה המורה אומרת בסוף?", ["Stop!", "Good work!", "Go home!", "Be quiet!"], ["עצרו!", "עבודה טובה!", "לכו הביתה!", "שקט!"], 1, "כתוב 'Good work!'."),
      ],
    ),
    R(
      "A Visit to the Library (ביקור בספרייה)",
      "On Wednesday I go to the library with my sister. It is a very quiet place. I take two books about animals. My sister takes a book with a lot of pictures.",
      "ביום רביעי אני הולך לספרייה עם אחותי. זה מקום שקט מאוד. אני לוקח שני ספרים על חיות. אחותי לוקחת ספר עם הרבה תמונות.",
      [
        g("library", "noun", "מקום שיש בו הרבה ספרים", "I go to the library.", "ספרייה"),
        g("quiet", "adjective", "בלי רעש", "The library is quiet.", "שקט"),
        g("picture", "noun", "ציור או תמונה", "The book has a picture.", "תמונה"),
      ],
      [
        q("Who goes to the library with the writer?", "מי הולך עם הכותב לספרייה?", ["A friend", "His sister", "His father", "His teacher"], ["חבר", "אחותו", "אביו", "המורה שלו"], 1, "כתוב 'with my sister'."),
        q("What are the writer's books about?", "על מה הספרים של הכותב?", ["Cars", "Animals", "Food", "Football"], ["מכוניות", "חיות", "אוכל", "כדורגל"], 1, "כתוב 'two books about animals'."),
      ],
    ),
    R(
      "Hanukkah Doughnuts (סופגניות של חנוכה)",
      "It is Hanukkah and my father makes doughnuts. They are hot and sweet. I put a little sugar on top. We eat five doughnuts and we are very full.",
      "זה חנוכה ואבא שלי מכין סופגניות. הן חמות ומתוקות. אני שם קצת סוכר מלמעלה. אנחנו אוכלים חמש סופגניות ואנחנו מאוד שבעים.",
      [
        g("Hanukkah", "noun", "חג האורים", "We love Hanukkah.", "חנוכה"),
        g("doughnut", "noun", "עוגה עגולה מטוגנת", "The doughnut is sweet.", "סופגנייה"),
        g("sugar", "noun", "אבקה מתוקה", "I put sugar on it.", "סוכר"),
      ],
      [
        q("Who makes the doughnuts?", "מי מכין את הסופגניות?", ["The mother", "The father", "The grandmother", "The teacher"], ["האמא", "האבא", "הסבתא", "המורה"], 1, "כתוב 'my father makes doughnuts'."),
        q("What does the writer put on top?", "מה הכותב שם מלמעלה?", ["Cheese", "A little sugar", "Salt", "Butter"], ["גבינה", "קצת סוכר", "מלח", "חמאה"], 1, "כתוב 'I put a little sugar on top'."),
      ],
    ),
    R(
      "My Costume (התחפושת שלי)",
      "Today is Purim. I wear a king costume. It has a gold hat and a long red coat. My little sister is a cat. We go to a party and we play all afternoon.",
      "היום פורים. אני לובש תחפושת של מלך. יש לה כובע זהב ומעיל אדום ארוך. אחותי הקטנה היא חתולה. אנחנו הולכים למסיבה ומשחקים כל אחר הצהריים.",
      [
        g("costume", "noun", "בגדים מיוחדים של דמות", "I wear a costume.", "תחפושת"),
        g("king", "noun", "גבר שמושל במדינה", "The king has a hat.", "מלך"),
        g("party", "noun", "מפגש עם אוכל ומוזיקה", "We go to a party.", "מסיבה"),
      ],
      [
        q("What is the writer's costume?", "מהי התחפושת של הכותב?", ["A cat", "A king", "A doctor", "A farmer"], ["חתול", "מלך", "רופא", "חקלאי"], 1, "כתוב 'I wear a king costume'."),
        q("What is the little sister?", "מה אחותו הקטנה?", ["A cat", "A bird", "A dog", "A fish"], ["חתולה", "ציפור", "כלבה", "דג"], 0, "כתוב 'My little sister is a cat'."),
      ],
    ),
    R(
      "Apples and Honey (תפוחים ודבש)",
      "It is the new year. On the table there is a plate with apples and honey. My grandfather says, \"Have a sweet year!\" I take a piece of apple and put it in the honey.",
      "זו השנה החדשה. על השולחן יש צלחת עם תפוחים ודבש. סבא שלי אומר: \"שתהיה שנה מתוקה!\" אני לוקח חתיכת תפוח ושם אותה בדבש.",
      [
        g("honey", "noun", "נוזל מתוק שדבורים מכינות", "I like honey.", "דבש"),
        g("piece", "noun", "חלק קטן מדבר גדול", "I take a piece of cake.", "חתיכה"),
        g("sweet", "adjective", "בטעם של סוכר", "The honey is sweet.", "מתוק"),
      ],
      [
        q("What is on the plate?", "מה יש על הצלחת?", ["Apples and honey", "Bread and butter", "Rice and fish", "Cake and milk"], ["תפוחים ודבש", "לחם וחמאה", "אורז ודגים", "עוגה וחלב"], 0, "כתוב 'a plate with apples and honey'."),
        q("What does the grandfather say?", "מה הסבא אומר?", ["Have a sweet year!", "Go to bed!", "Eat quickly!", "Be quiet!"], ["שתהיה שנה מתוקה!", "לכו לישון!", "תאכלו מהר!", "שקט!"], 0, "כתוב 'Have a sweet year!'."),
      ],
    ),
    R(
      "Our Sukkah (הסוכה שלנו)",
      "We build a sukkah in our yard. My father and I put up the walls. My sister makes pretty paper stars. In the evening we eat dinner in the sukkah and look at the sky.",
      "אנחנו בונים סוכה בחצר שלנו. אבא שלי ואני מציבים את הקירות. אחותי מכינה כוכבי נייר יפים. בערב אנחנו אוכלים ארוחת ערב בסוכה ומסתכלים על השמיים.",
      [
        g("sukkah", "noun", "בקתה זמנית של חג סוכות", "We eat in the sukkah.", "סוכה"),
        g("yard", "noun", "שטח פתוח ליד הבית", "We play in the yard.", "חצר"),
        g("wall", "noun", "צד של חדר או בית", "The wall is white.", "קיר"),
      ],
      [
        q("Where do they build the sukkah?", "איפה הם בונים את הסוכה?", ["At school", "In the yard", "On the roof", "At the beach"], ["בבית הספר", "בחצר", "על הגג", "בים"], 1, "כתוב 'in our yard'."),
        q("What does the sister make?", "מה האחות מכינה?", ["Paper stars", "Cakes", "Soup", "Hats"], ["כוכבי נייר", "עוגות", "מרק", "כובעים"], 0, "כתוב 'pretty paper stars'."),
      ],
    ),
    R(
      "Flags and a Picnic (דגלים ופיקניק)",
      "It is Independence Day. We have a picnic in the park with our flags. My mother brings salad and juice. My uncle brings a big cake. Everyone sings a song.",
      "זה יום העצמאות. יש לנו פיקניק בפארק עם הדגלים שלנו. אמא שלי מביאה סלט ומיץ. הדוד שלי מביא עוגה גדולה. כולם שרים שיר.",
      [
        g("picnic", "noun", "ארוחה בחוץ", "We have a picnic.", "פיקניק"),
        g("flag", "noun", "בד של מדינה", "I have a small flag.", "דגל"),
        g("uncle", "noun", "האח של אבא או אמא", "My uncle brings a cake.", "דוד"),
      ],
      [
        q("Where is the picnic?", "איפה הפיקניק?", ["At home", "In the park", "At school", "At the beach"], ["בבית", "בפארק", "בבית הספר", "בים"], 1, "כתוב 'a picnic in the park'."),
        q("Who brings the cake?", "מי מביא את העוגה?", ["The mother", "The uncle", "The sister", "The friend"], ["האמא", "הדוד", "האחות", "החבר"], 1, "כתוב 'My uncle brings a big cake'."),
      ],
    ),
    R(
      "Riding My Bike (רוכב על האופניים)",
      "I have a new bike. It is green and it is fast. After school I ride it in the park with my friend. I wear a hat and I stop at the red light.",
      "יש לי אופניים חדשים. הם ירוקים והם מהירים. אחרי בית הספר אני רוכב עליהם בפארק עם החבר שלי. אני חובש כובע ועוצר באור האדום.",
      [
        g("bike", "noun", "כלי רכב עם שני גלגלים", "My bike is new.", "אופניים"),
        g("fast", "adjective", "לא איטי", "The bike is fast.", "מהיר"),
        g("light", "noun", "אור, כמו הרמזור באדום", "Stop at the red light.", "אור"),
      ],
      [
        q("What color is the bike?", "באיזה צבע האופניים?", ["Red", "Green", "Blue", "Black"], ["אדום", "ירוק", "כחול", "שחור"], 1, "כתוב 'It is green'."),
        q("When does the writer stop?", "מתי הכותב עוצר?", ["At the red light", "At the shop", "At the school", "At the tree"], ["ברמזור האדום", "בחנות", "בבית הספר", "ליד העץ"], 0, "כתוב 'I stop at the red light'."),
      ],
    ),
    R(
      "The Playground (גן המשחקים)",
      "There is a playground near my house. It has a slide, two swings and a big tree. I go there every afternoon. The little kids play and their mothers sit on the chairs.",
      "יש גן משחקים ליד הבית שלי. יש בו מגלשה, שתי נדנדות ועץ גדול. אני הולך לשם כל אחר צהריים. הילדים הקטנים משחקים והאמהות שלהם יושבות על הכיסאות.",
      [
        g("playground", "noun", "מקום עם משחקים לילדים", "The playground is near.", "גן משחקים"),
        g("slide", "noun", "משטח משופע שמחליקים עליו", "I like the slide.", "מגלשה"),
        g("swings", "noun", "מושב שמתנדנד באוויר", "I like the swings.", "נדנדה"),
      ],
      [
        q("What is in the playground?", "מה יש בגן המשחקים?", ["A pool", "A slide and two swings", "A shop", "A bus"], ["בריכה", "מגלשה ושתי נדנדות", "חנות", "אוטובוס"], 1, "כתוב 'a slide, two swings and a big tree'."),
        q("What do the mothers do?", "מה האמהות עושות?", ["They play", "They sit on chairs", "They swim", "They cook"], ["הן משחקות", "הן יושבות על כיסאות", "הן שוחות", "הן מבשלות"], 1, "כתוב 'their mothers sit on the chairs'."),
      ],
    ),
    R(
      "A Hot Summer Day (יום קיץ חם)",
      "In summer it is very hot in my city. I stay at home in the morning and drink cold water. In the afternoon we go to the pool. At night I sleep with the fan on.",
      "בקיץ חם מאוד בעיר שלי. אני נשאר בבית בבוקר ושותה מים קרים. אחר הצהריים אנחנו הולכים לבריכה. בלילה אני ישן עם המאוורר דלוק.",
      [
        g("summer", "noun", "העונה החמה בשנה", "I love summer.", "קיץ"),
        g("fan", "noun", "מכונה שמזיזה אוויר", "The fan is on.", "מאוורר"),
        g("hot", "adjective", "בטמפרטורה גבוהה", "It is hot today.", "חם"),
      ],
      [
        q("What does the writer drink in the morning?", "מה הכותב שותה בבוקר?", ["Hot tea", "Cold water", "Milk", "Juice"], ["תה חם", "מים קרים", "חלב", "מיץ"], 1, "כתוב 'drink cold water'."),
        q("Where do they go in the afternoon?", "לאן הם הולכים אחר הצהריים?", ["To school", "To the pool", "To the library", "To work"], ["לבית הספר", "לבריכה", "לספרייה", "לעבודה"], 1, "כתוב 'we go to the pool'."),
      ],
    ),
    R(
      "Shopping at the Market (קניות בשוק)",
      "On Friday morning my mother and I go to the market. We buy tomatoes, onions and a big yellow lemon. The man at the shop is very nice. He gives me a small orange for free.",
      "בבוקר יום שישי אמא שלי ואני הולכות לשוק. אנחנו קונות עגבניות, בצלים ולימון צהוב גדול. האיש בחנות נחמד מאוד. הוא נותן לי תפוז קטן בחינם.",
      [
        g("market", "noun", "מקום עם הרבה דוכנים של אוכל", "We go to the market.", "שוק"),
        g("tomato", "noun", "ירק אדום ועגול", "I like tomatoes.", "עגבנייה"),
        g("free", "adjective", "בלי לשלם", "The orange is free.", "בחינם"),
      ],
      [
        q("When do they go to the market?", "מתי הם הולכים לשוק?", ["Friday morning", "Monday night", "Sunday afternoon", "Tuesday evening"], ["בבוקר יום שישי", "בלילה של יום שני", "אחר צהריים של יום ראשון", "בערב של יום שלישי"], 0, "כתוב 'On Friday morning'."),
        q("What does the man give for free?", "מה האיש נותן בחינם?", ["A lemon", "A small orange", "An onion", "A tomato"], ["לימון", "תפוז קטן", "בצל", "עגבנייה"], 1, "כתוב 'He gives me a small orange for free'."),
      ],
    ),
    R(
      "Falafel for Lunch (פלאפל לארוחת צהריים)",
      "After school I am very hungry. I go to a small shop and I buy falafel in a pita. The pita is warm and I put salad inside. It is my favourite lunch.",
      "אחרי בית הספר אני מאוד רעב. אני הולך לחנות קטנה וקונה פלאפל בפיתה. הפיתה חמה ואני שם בפנים סלט. זו ארוחת הצהריים האהובה עליי.",
      [
        g("falafel", "noun", "כדורי חומוס מטוגנים", "I eat falafel.", "פלאפל"),
        g("pita", "noun", "לחם עגול ושטוח", "The pita is warm.", "פיתה"),
        g("hungry", "adjective", "רוצה לאכול", "I am hungry.", "רעב"),
      ],
      [
        q("What does the writer buy?", "מה הכותב קונה?", ["Pizza", "Falafel in a pita", "A sandwich", "Soup"], ["פיצה", "פלאפל בפיתה", "כריך", "מרק"], 1, "כתוב 'I buy falafel in a pita'."),
        q("What does the writer put inside?", "מה הכותב שם בפנים?", ["Salad", "Cheese", "Rice", "Eggs"], ["סלט", "גבינה", "אורז", "ביצים"], 0, "כתוב 'I put salad inside'."),
      ],
    ),
    R(
      "My Grandpa's Phone (הטלפון של סבא)",
      "My grandfather has a new phone. It is big and the numbers are big too. He calls me every Sunday. He says, \"Hello! Can you see me?\" Then we talk for ten minutes.",
      "לסבא שלי יש טלפון חדש. הוא גדול והמספרים גדולים גם כן. הוא מתקשר אליי כל יום ראשון. הוא אומר: \"שלום! אתה רואה אותי?\" ואז אנחנו מדברים עשר דקות.",
      [
        g("phone", "noun", "מכשיר לדבר עם אנשים רחוקים", "I have a new phone.", "טלפון"),
        g("number", "noun", "סימן כמו 1 או 2", "The numbers are big.", "מספר"),
        g("minute", "noun", "שישים שניות", "We talk for ten minutes.", "דקה"),
      ],
      [
        q("When does Grandpa call?", "מתי סבא מתקשר?", ["Every Sunday", "Every Friday", "Every night", "Every Monday"], ["כל יום ראשון", "כל יום שישי", "כל לילה", "כל יום שני"], 0, "כתוב 'He calls me every Sunday'."),
        q("How long do they talk?", "כמה זמן הם מדברים?", ["One hour", "Ten minutes", "Two minutes", "All day"], ["שעה", "עשר דקות", "שתי דקות", "כל היום"], 1, "כתוב 'we talk for ten minutes'."),
      ],
    ),
    R(
      "Learning the Guitar (לומד לנגן בגיטרה)",
      "I want to play the guitar. My uncle has an old guitar and he gives it to me. Every day I practice for twenty minutes. My fingers hurt, but I like the music.",
      "אני רוצה לנגן בגיטרה. לדוד שלי יש גיטרה ישנה והוא נותן אותה לי. בכל יום אני מתאמן עשרים דקות. האצבעות שלי כואבות, אבל אני אוהב את המוזיקה.",
      [
        g("guitar", "noun", "כלי נגינה עם מיתרים", "He plays the guitar.", "גיטרה"),
        g("practice", "verb", "לעשות שוב ושוב כדי להשתפר", "I practice every day.", "להתאמן"),
        g("finger", "noun", "אחד מחמשת חלקי היד", "My finger hurts.", "אצבע"),
      ],
      [
        q("Who gives the writer a guitar?", "מי נותן לכותב גיטרה?", ["His uncle", "His friend", "His teacher", "His brother"], ["הדוד שלו", "החבר שלו", "המורה שלו", "אחיו"], 0, "כתוב 'My uncle has an old guitar and he gives it to me'."),
        q("How long does the writer practice every day?", "כמה זמן הכותב מתאמן בכל יום?", ["Ten minutes", "Twenty minutes", "One hour", "Two hours"], ["עשר דקות", "עשרים דקות", "שעה", "שעתיים"], 1, "כתוב 'I practice for twenty minutes'."),
      ],
    ),
    R(
      "The Music Show (מופע המוזיקה)",
      "Tonight there is a music show at our school. My class sings two songs. I stand next to my best friend. My parents sit in the first row and they smile at me.",
      "הערב יש מופע מוזיקה בבית הספר שלנו. הכיתה שלי שרה שני שירים. אני עומד ליד החבר הכי טוב שלי. ההורים שלי יושבים בשורה הראשונה ומחייכים אליי.",
      [
        g("show", "noun", "הצגה או מופע לקהל", "There is a show tonight.", "מופע"),
        g("row", "noun", "שורה של כיסאות", "They sit in the first row.", "שורה"),
        g("parent", "noun", "אמא או אבא", "My parents smile.", "הורה"),
      ],
      [
        q("How many songs does the class sing?", "כמה שירים הכיתה שרה?", ["One", "Two", "Three", "Five"], ["אחד", "שניים", "שלושה", "חמישה"], 1, "כתוב 'My class sings two songs'."),
        q("Where do the parents sit?", "איפה ההורים יושבים?", ["In the first row", "On the stage", "At the door", "At home"], ["בשורה הראשונה", "על הבמה", "ליד הדלת", "בבית"], 0, "כתוב 'in the first row'."),
      ],
    ),
    R(
      "My Pet Fish (דג המחמד שלי)",
      "I have a pet fish. It is small and orange. It lives in a glass bowl on my desk. Every morning I give it a little food. I look at it and I feel calm.",
      "יש לי דג מחמד. הוא קטן וכתום. הוא חי בקערת זכוכית על השולחן שלי. בכל בוקר אני נותן לו קצת אוכל. אני מסתכל עליו ומרגיש רגוע.",
      [
        g("pet", "noun", "חיה שחיה בבית", "My pet is a fish.", "חיית מחמד"),
        g("bowl", "noun", "כלי עגול וקעור", "The fish is in a bowl.", "קערה"),
        g("calm", "adjective", "רגוע", "I feel calm.", "רגוע"),
      ],
      [
        q("What color is the fish?", "באיזה צבע הדג?", ["Blue", "Orange", "Red", "White"], ["כחול", "כתום", "אדום", "לבן"], 1, "כתוב 'It is small and orange'."),
        q("Where does the fish live?", "איפה הדג חי?", ["In a glass bowl", "In a river", "In a pool", "In a box"], ["בקערת זכוכית", "בנהר", "בבריכה", "בקופסה"], 0, "כתוב 'in a glass bowl on my desk'."),
      ],
    ),
    R(
      "A Rabbit at Home (ארנב בבית)",
      "We have a white rabbit. Its name is Cloud. It eats carrots and green leaves. It likes to sleep in a box near the door. My little brother loves it very much.",
      "יש לנו ארנב לבן. קוראים לו ענן. הוא אוכל גזר ועלים ירוקים. הוא אוהב לישון בקופסה ליד הדלת. אחי הקטן אוהב אותו מאוד.",
      [
        g("rabbit", "noun", "חיה קטנה עם אוזניים ארוכות", "The rabbit is white.", "ארנב"),
        g("carrot", "noun", "ירק כתום וארוך", "It eats a carrot.", "גזר"),
        g("leaf", "noun", "החלק הירוק של עץ", "It eats a green leaf.", "עלה"),
      ],
      [
        q("What does the rabbit eat?", "מה הארנב אוכל?", ["Fish and rice", "Carrots and green leaves", "Bread and cheese", "Apples and cake"], ["דגים ואורז", "גזר ועלים ירוקים", "לחם וגבינה", "תפוחים ועוגה"], 1, "כתוב 'It eats carrots and green leaves'."),
        q("Where does the rabbit sleep?", "איפה הארנב ישן?", ["On the sofa", "In a box near the door", "In a bed", "In the garden"], ["על הספה", "בקופסה ליד הדלת", "במיטה", "בגינה"], 1, "כתוב 'in a box near the door'."),
      ],
    ),
    R(
      "Washing the Car (שוטפים את המכונית)",
      "On Saturday morning I help my father wash the car. I get a bucket of water and soap. I wash the wheels and he washes the windows. We are wet and we laugh. Then we drink cold juice.",
      "בשבת בבוקר אני עוזר לאבא שלי לשטוף את המכונית. אני מביא דלי מים וסבון. אני שוטף את הגלגלים והוא שוטף את החלונות. אנחנו רטובים וצוחקים. אחר כך אנחנו שותים מיץ קר.",
      [
        g("bucket", "noun", "כלי עגול לנשיאת מים", "I carry a bucket.", "דלי"),
        g("soap", "noun", "דבר שמשתמשים בו כדי לשטוף", "I use soap.", "סבון"),
        g("wheel", "noun", "החלק העגול של המכונית", "The car has four wheels.", "גלגל"),
      ],
      [
        q("Who does the writer help?", "למי הכותב עוזר?", ["His mother", "His father", "His sister", "His teacher"], ["לאמא שלו", "לאבא שלו", "לאחותו", "למורה שלו"], 1, "כתוב 'I help my father wash the car'."),
        q("What does the writer wash?", "מה הכותב שוטף?", ["The windows", "The wheels", "The door", "The roof"], ["את החלונות", "את הגלגלים", "את הדלת", "את הגג"], 1, "כתוב 'I wash the wheels'."),
      ],
    ),
    R(
      "A Party at the Pool (מסיבה בבריכה)",
      "My friend has a birthday party at the pool. We swim and we play with a big ball. There is a cake with seven candles. His mother gives us ice cream and we sing a song.",
      "לחבר שלי יש מסיבת יום הולדת בבריכה. אנחנו שוחים ומשחקים עם כדור גדול. יש עוגה עם שבעה נרות. אמא שלו נותנת לנו גלידה ואנחנו שרים שיר.",
      [
        g("candle", "noun", "נר שמדליקים על עוגה", "The cake has a candle.", "נר"),
        g("ball", "noun", "חפץ עגול למשחק", "We play with a ball.", "כדור"),
        g("swim", "verb", "לנוע במים", "We swim in the pool.", "לשחות"),
      ],
      [
        q("Where is the party?", "איפה המסיבה?", ["At the pool", "At school", "At the park", "At the beach"], ["בבריכה", "בבית הספר", "בפארק", "בים"], 0, "כתוב 'a birthday party at the pool'."),
        q("How many candles are on the cake?", "כמה נרות יש על העוגה?", ["Five", "Six", "Seven", "Eight"], ["חמישה", "שישה", "שבעה", "שמונה"], 2, "כתוב 'a cake with seven candles'."),
      ],
    ),
    R(
      "The New Boy (הילד החדש)",
      "A new boy is in our class today. His name is Adam. He is from a small town and he is shy. At lunch I say, \"Sit with us!\" Now he is my friend.",
      "ילד חדש בכיתה שלנו היום. קוראים לו אדם. הוא מעיירה קטנה והוא ביישן. בארוחת הצהריים אני אומר: \"שב איתנו!\" עכשיו הוא החבר שלי.",
      [
        g("shy", "adjective", "מתבייש לדבר עם אנשים", "He is shy.", "ביישן"),
        g("town", "noun", "עיר קטנה", "He is from a small town.", "עיירה"),
        g("lunch", "noun", "ארוחת הצהריים", "We eat lunch at school.", "ארוחת צהריים"),
      ],
      [
        q("What is Adam like?", "איך אדם?", ["Shy", "Angry", "Tall", "Lazy"], ["ביישן", "כועס", "גבוה", "עצלן"], 0, "כתוב 'he is shy'."),
        q("What does the writer say at lunch?", "מה הכותב אומר בארוחת הצהריים?", ["Go home!", "Sit with us!", "Be quiet!", "Stand up!"], ["לך הביתה!", "שב איתנו!", "שקט!", "קום!"], 1, "כתוב 'Sit with us!'."),
      ],
    ),
    R(
      "Drawing a Picture (מציירת תמונה)",
      "I draw a picture of my family. I use a pencil and a red pen. My father is tall and my mother has long hair. I draw our dog too. The teacher says it is very nice.",
      "אני מציירת תמונה של המשפחה שלי. אני משתמשת בעיפרון ובעט אדום. אבא שלי גבוה ולאמא שלי שיער ארוך. אני מציירת גם את הכלב שלנו. המורה אומרת שזה יפה מאוד.",
      [
        g("draw", "verb", "ליצור תמונה עם עט או עיפרון", "I draw a house.", "לצייר"),
        g("pencil", "noun", "כלי לכתיבה ולציור", "I use a pencil.", "עיפרון"),
        g("hair", "noun", "מה שגדל על הראש", "She has long hair.", "שיער"),
      ],
      [
        q("What does the writer draw?", "מה הכותבת מציירת?", ["Her school", "Her family", "A park", "A farm"], ["את בית הספר שלה", "את המשפחה שלה", "פארק", "חווה"], 1, "כתוב 'a picture of my family'."),
        q("Who has long hair?", "למי יש שיער ארוך?", ["The father", "The mother", "The dog", "The teacher"], ["לאבא", "לאמא", "לכלב", "למורה"], 1, "כתוב 'my mother has long hair'."),
      ],
    ),
    R(
      "The Bedtime Story (סיפור לפני השינה)",
      "At night my father reads me a story. It is about a small bear and a big tree. The bear is hungry and he looks for honey. I am tired and I sleep before the end.",
      "בלילה אבא שלי קורא לי סיפור. הוא על דוב קטן ועץ גדול. הדוב רעב והוא מחפש דבש. אני עייף וישן לפני הסוף.",
      [
        g("bear", "noun", "חיה גדולה וחזקה עם פרווה", "The bear is big.", "דוב"),
        g("tree", "noun", "צמח גבוה עם גזע", "The tree is tall.", "עץ"),
        g("tired", "adjective", "רוצה לישון", "I am tired.", "עייף"),
      ],
      [
        q("What is the story about?", "על מה הסיפור?", ["A small bear and a big tree", "A dog and a cat", "A king and a bird", "A boy and a boat"], ["דוב קטן ועץ גדול", "כלב וחתול", "מלך וציפור", "ילד וסירה"], 0, "כתוב 'about a small bear and a big tree'."),
        q("What does the bear look for?", "מה הדוב מחפש?", ["Fish", "Honey", "Water", "A house"], ["דגים", "דבש", "מים", "בית"], 1, "כתוב 'he looks for honey'."),
      ],
    ),
    R(
      "A Day with Dad at Work (יום עם אבא בעבודה)",
      "Today I go to work with my father. He is an engineer and his office is in a tall building. He shows me his computer and his desk. At lunch we eat pizza together.",
      "היום אני הולך לעבודה עם אבא שלי. הוא מהנדס והמשרד שלו בבניין גבוה. הוא מראה לי את המחשב ואת השולחן שלו. בארוחת הצהריים אנחנו אוכלים פיצה ביחד.",
      [
        g("engineer", "noun", "אדם שמתכנן מכונות או בניינים", "My father is an engineer.", "מהנדס"),
        g("office", "noun", "מקום שעובדים בו", "His office is in a big building.", "משרד"),
        g("building", "noun", "בית גדול", "The building is tall.", "בניין"),
      ],
      [
        q("What is the father's job?", "מה המקצוע של האבא?", ["Doctor", "Engineer", "Teacher", "Driver"], ["רופא", "מהנדס", "מורה", "נהג"], 1, "כתוב 'He is an engineer'."),
        q("What do they eat at lunch?", "מה הם אוכלים בארוחת הצהריים?", ["Pizza", "Soup", "Rice", "Salad"], ["פיצה", "מרק", "אורז", "סלט"], 0, "כתוב 'we eat pizza together'."),
      ],
    ),
    R(
      "The Basketball Team (קבוצת הכדורסל)",
      "I am in the school basketball team. We practice on Monday and Thursday. I am not tall, but I am fast. On Saturday we play a game and we win! I am very happy.",
      "אני בקבוצת הכדורסל של בית הספר. אנחנו מתאמנים בימי שני וחמישי. אני לא גבוה, אבל אני מהיר. בשבת אנחנו משחקים משחק ומנצחים! אני מאוד שמח.",
      [
        g("basketball", "noun", "משחק עם כדור וסל", "I play basketball.", "כדורסל"),
        g("practice", "verb", "להתאמן", "We practice on Monday.", "להתאמן"),
        g("win", "verb", "להצליח במשחק", "We win the game.", "לנצח"),
      ],
      [
        q("When does the team practice?", "מתי הקבוצה מתאמנת?", ["Monday and Thursday", "Sunday and Friday", "Every day", "Only Saturday"], ["שני וחמישי", "ראשון ושישי", "כל יום", "רק בשבת"], 0, "כתוב 'on Monday and Thursday'."),
        q("What happens on Saturday?", "מה קורה בשבת?", ["They lose", "They win a game", "They stay home", "They go to school"], ["הם מפסידים", "הם מנצחים במשחק", "הם נשארים בבית", "הם הולכים לבית הספר"], 1, "כתוב 'we play a game and we win'."),
      ],
    ),
    R(
      "The Lost Key (המפתח האבוד)",
      "I can't find my key. I look in my bag and in my pocket. It is not there. My sister laughs and says, \"Look at the door!\" The key is in the door.",
      "אני לא מוצאת את המפתח שלי. אני מחפשת בתיק ובכיס. הוא לא שם. אחותי צוחקת ואומרת: \"תסתכלי על הדלת!\" המפתח בדלת.",
      [
        g("key", "noun", "דבר שפותח דלת", "I have a key.", "מפתח"),
        g("pocket", "noun", "מקום קטן בבגד", "The key is in my pocket.", "כיס"),
        g("door", "noun", "מה שפותחים כדי להיכנס", "Close the door.", "דלת"),
      ],
      [
        q("Where does the writer look first?", "איפה הכותבת מחפשת קודם?", ["In her bag and pocket", "In the kitchen", "In the car", "Under the bed"], ["בתיק ובכיס", "במטבח", "במכונית", "מתחת למיטה"], 0, "כתוב 'I look in my bag and in my pocket'."),
        q("Where is the key?", "איפה המפתח?", ["In the bag", "In the door", "On the table", "In the garden"], ["בתיק", "בדלת", "על השולחן", "בגינה"], 1, "כתוב 'The key is in the door'."),
      ],
    ),
    R(
      "The Lost Hat (הכובע האבוד)",
      "I go to my aunt's house by bus. I wear my new red hat. At my aunt's door I can't find it. I call the bus driver. He has my hat and he is very nice.",
      "אני נוסע לבית של דודה שלי באוטובוס. אני חובש את הכובע האדום החדש שלי. ליד הדלת של דודה אני לא מוצא אותו. אני מתקשר לנהג האוטובוס. הכובע אצלו והוא נחמד מאוד.",
      [
        g("aunt", "noun", "האחות של אמא או אבא", "My aunt is nice.", "דודה"),
        g("hat", "noun", "בגד שחובשים על הראש", "I wear a hat.", "כובע"),
        g("driver", "noun", "אדם שנוהג בכלי רכב", "The driver is nice.", "נהג"),
      ],
      [
        q("Where does the writer go?", "לאן הכותב נוסע?", ["To school", "To his aunt's house", "To the beach", "To the zoo"], ["לבית הספר", "לבית של דודתו", "לים", "לגן החיות"], 1, "כתוב 'I go to my aunt's house by bus'."),
        q("Who has the hat?", "אצל מי הכובע?", ["The aunt", "The bus driver", "A friend", "The teacher"], ["הדודה", "נהג האוטובוס", "חבר", "המורה"], 1, "כתוב 'He has my hat'."),
      ],
    ),
    R(
      "Shopping for Clothes (קונים בגדים)",
      "I need a new shirt for school. My mother and I go to a big shop. I try a blue shirt and a green shirt. The blue shirt is too big. We buy the green shirt.",
      "אני צריך חולצה חדשה לבית הספר. אמא שלי ואני הולכים לחנות גדולה. אני מנסה חולצה כחולה וחולצה ירוקה. החולצה הכחולה גדולה מדי. אנחנו קונים את החולצה הירוקה.",
      [
        g("shirt", "noun", "בגד לחלק העליון של הגוף", "I wear a white shirt.", "חולצה"),
        g("need", "verb", "חייב לקבל", "I need a new shirt.", "צריך"),
        g("shop", "noun", "מקום שקונים בו", "We go to a big shop.", "חנות"),
      ],
      [
        q("What does the writer need?", "מה הכותב צריך?", ["A new shirt", "New shoes", "A new bag", "A new hat"], ["חולצה חדשה", "נעליים חדשות", "תיק חדש", "כובע חדש"], 0, "כתוב 'I need a new shirt'."),
        q("Why do they not buy the blue shirt?", "למה הם לא קונים את החולצה הכחולה?", ["It is too big", "It is too small", "It is old", "It is dirty"], ["היא גדולה מדי", "היא קטנה מדי", "היא ישנה", "היא מלוכלכת"], 0, "כתוב 'The blue shirt is too big'."),
      ],
    ),
    R(
      "A Windy Day (יום עם רוח)",
      "There is a lot of wind today. My brother and I go to the hill with a kite. The kite is yellow and it goes up high. It looks like a bird in the sky.",
      "יש היום הרבה רוח. אחי ואני הולכים אל הגבעה עם עפיפון. העפיפון צהוב והוא עולה גבוה. הוא נראה כמו ציפור בשמיים.",
      [
        g("wind", "noun", "אוויר שנע", "There is a lot of wind.", "רוח"),
        g("kite", "noun", "צעצוע שעף באוויר", "The kite is yellow.", "עפיפון"),
        g("hill", "noun", "הר קטן", "We go to the hill.", "גבעה"),
      ],
      [
        q("Where do the brothers go?", "לאן האחים הולכים?", ["To the hill", "To the pool", "To school", "To the shop"], ["אל הגבעה", "לבריכה", "לבית הספר", "לחנות"], 0, "כתוב 'go to the hill with a kite'."),
        q("What color is the kite?", "באיזה צבע העפיפון?", ["Red", "Blue", "Yellow", "Green"], ["אדום", "כחול", "צהוב", "ירוק"], 2, "כתוב 'The kite is yellow'."),
      ],
    ),
    R(
      "Up the Hill (עולים על הגבעה)",
      "On Saturday we walk up a hill with our family. The way is long and the sun is hot. We stop and drink water. From the top we see the whole city.",
      "בשבת אנחנו הולכים במעלה גבעה עם המשפחה. הדרך ארוכה והשמש חמה. אנחנו עוצרים ושותים מים. מהפסגה אנחנו רואים את כל העיר.",
      [
        g("top", "noun", "החלק הגבוה ביותר", "We stand at the top.", "פסגה"),
        g("city", "noun", "מקום גדול עם הרבה אנשים", "I live in a city.", "עיר"),
        g("whole", "adjective", "כל, שלם", "We see the whole city.", "כל"),
      ],
      [
        q("How is the way?", "איך הדרך?", ["Short", "Long", "Quiet", "Cold"], ["קצרה", "ארוכה", "שקטה", "קרה"], 1, "כתוב 'The way is long'."),
        q("What do they see from the top?", "מה הם רואים מלמעלה?", ["The sea", "The whole city", "A farm", "A river"], ["את הים", "את כל העיר", "חווה", "נהר"], 1, "כתוב 'we see the whole city'."),
      ],
    ),
    R(
      "Camping Night (לילה בקמפינג)",
      "We sleep outside in a tent. It is dark and the sky is full of stars. My father makes a small fire. We eat hot bread and tell stories.",
      "אנחנו ישנים בחוץ באוהל. חשוך והשמיים מלאים בכוכבים. אבא שלי מדליק אש קטנה. אנחנו אוכלים לחם חם ומספרים סיפורים.",
      [
        g("tent", "noun", "בית מבד שישנים בו בטבע", "We sleep in a tent.", "אוהל"),
        g("fire", "noun", "להבות חמות", "We make a small fire.", "אש"),
        g("star", "noun", "נקודת אור בשמיים בלילה", "I see a star.", "כוכב"),
      ],
      [
        q("Where do they sleep?", "איפה הם ישנים?", ["In a hotel", "In a tent", "In a car", "At home"], ["במלון", "באוהל", "במכונית", "בבית"], 1, "כתוב 'We sleep outside in a tent'."),
        q("What is in the sky?", "מה יש בשמיים?", ["Clouds", "Stars", "Birds", "Kites"], ["עננים", "כוכבים", "ציפורים", "עפיפונים"], 1, "כתוב 'the sky is full of stars'."),
      ],
    ),
    R(
      "Picking Oranges (קוטפים תפוזים)",
      "In winter we visit my uncle's farm. There are many orange trees. I pick oranges with a big basket. They are sweet and the juice is cold.",
      "בחורף אנחנו מבקרים בחווה של הדוד שלי. יש הרבה עצי תפוז. אני קוטף תפוזים עם סל גדול. הם מתוקים והמיץ קר.",
      [
        g("farm", "noun", "מקום שמגדלים בו חיות וצמחים", "My uncle has a farm.", "חווה"),
        g("basket", "noun", "כלי לנשיאת דברים", "I carry a basket.", "סל"),
        g("juice", "noun", "נוזל מפירות", "I drink orange juice.", "מיץ"),
      ],
      [
        q("Whose farm do they visit?", "את החווה של מי הם מבקרים?", ["The uncle's", "The aunt's", "The teacher's", "A friend's"], ["של הדוד", "של הדודה", "של המורה", "של חבר"], 0, "כתוב 'my uncle's farm'."),
        q("What does the writer pick?", "מה הכותב קוטף?", ["Apples", "Oranges", "Lemons", "Bananas"], ["תפוחים", "תפוזים", "לימונים", "בננות"], 1, "כתוב 'I pick oranges'."),
      ],
    ),
    R(
      "Making a Salad (מכינים סלט)",
      "I help my mother make a salad. I wash the tomatoes and the carrots. My mother cuts them. I add salt and a little lemon. The salad is very good.",
      "אני עוזרת לאמא שלי להכין סלט. אני שוטפת את העגבניות ואת הגזרים. אמא שלי חותכת אותם. אני מוסיפה מלח וקצת לימון. הסלט טוב מאוד.",
      [
        g("wash", "verb", "לנקות במים", "I wash my hands.", "לשטוף"),
        g("cut", "verb", "לחתוך עם סכין", "She cuts the tomato.", "לחתוך"),
        g("lemon", "noun", "פרי צהוב וחמוץ", "I add a little lemon.", "לימון"),
      ],
      [
        q("What does the writer wash?", "מה הכותבת שוטפת?", ["Tomatoes and carrots", "Apples and bananas", "Plates and cups", "Her hands"], ["עגבניות וגזרים", "תפוחים ובננות", "צלחות וכוסות", "את הידיים"], 0, "כתוב 'I wash the tomatoes and the carrots'."),
        q("What does the writer add?", "מה הכותבת מוסיפה?", ["Sugar and milk", "Salt and a little lemon", "Cheese and bread", "Rice and eggs"], ["סוכר וחלב", "מלח וקצת לימון", "גבינה ולחם", "אורז וביצים"], 1, "כתוב 'I add salt and a little lemon'."),
      ],
    ),
    R(
      "The Train Trip (הנסיעה ברכבת)",
      "We take the train to see my grandmother. The train is fast and quiet. I sit near the window and look at the fields. After two hours we are there.",
      "אנחנו נוסעים ברכבת לראות את סבתא שלי. הרכבת מהירה ושקטה. אני יושב ליד החלון ומסתכל על השדות. אחרי שעתיים אנחנו שם.",
      [
        g("train", "noun", "כלי רכב על פסים", "We take the train.", "רכבת"),
        g("field", "noun", "שטח גדול של עשב או גידולים", "I see a green field.", "שדה"),
        g("hour", "noun", "שישים דקות", "It takes two hours.", "שעה"),
      ],
      [
        q("Why do they take the train?", "למה הם נוסעים ברכבת?", ["To go to school", "To see the grandmother", "To go to work", "To visit a zoo"], ["כדי ללכת לבית הספר", "כדי לראות את הסבתא", "כדי ללכת לעבודה", "כדי לבקר בגן החיות"], 1, "כתוב 'to see my grandmother'."),
        q("How long is the trip?", "כמה זמן הנסיעה?", ["One hour", "Two hours", "Ten minutes", "Five hours"], ["שעה", "שעתיים", "עשר דקות", "חמש שעות"], 1, "כתוב 'After two hours we are there'."),
      ],
    ),
    R(
      "At the Airport (בשדה התעופה)",
      "My aunt comes from London today. We wait at the airport. Many people have big bags. I see her and I run to her. She gives me a small gift.",
      "הדודה שלי מגיעה היום מלונדון. אנחנו מחכים בשדה התעופה. לאנשים רבים יש תיקים גדולים. אני רואה אותה ורץ אליה. היא נותנת לי מתנה קטנה.",
      [
        g("airport", "noun", "מקום שמטוסים ממריאים ונוחתים בו", "We wait at the airport.", "שדה תעופה"),
        g("wait", "verb", "להישאר עד שמשהו קורה", "We wait for her.", "לחכות"),
        g("gift", "noun", "דבר שנותנים לאדם אחר", "She gives me a gift.", "מתנה"),
      ],
      [
        q("Where does the aunt come from?", "מאיפה הדודה מגיעה?", ["From London", "From the zoo", "From school", "From the farm"], ["מלונדון", "מגן החיות", "מבית הספר", "מהחווה"], 0, "כתוב 'My aunt comes from London'."),
        q("What does the aunt give the writer?", "מה הדודה נותנת לכותב?", ["A small gift", "A big cake", "A book", "A hat"], ["מתנה קטנה", "עוגה גדולה", "ספר", "כובע"], 0, "כתוב 'She gives me a small gift'."),
      ],
    ),
    R(
      "My Cousin's Visit (הביקור של בת הדודה)",
      "My cousin Yael comes to stay for the weekend. She sleeps in my room on a small bed. We play games and we watch a film. On Sunday she goes home and I am sad.",
      "בת הדודה שלי יעל באה להישאר לסוף השבוע. היא ישנה בחדר שלי על מיטה קטנה. אנחנו משחקות משחקים וצופות בסרט. ביום ראשון היא חוזרת הביתה ואני עצובה.",
      [
        g("stay", "verb", "להישאר במקום", "She comes to stay.", "להישאר"),
        g("weekend", "noun", "שבת וראשון או שישי ושבת", "We play at the weekend.", "סוף שבוע"),
        g("bed", "noun", "מקום לישון", "She sleeps on a small bed.", "מיטה"),
      ],
      [
        q("How long does Yael stay?", "כמה זמן יעל נשארת?", ["For the weekend", "For a year", "For one hour", "For a month"], ["לסוף השבוע", "לשנה", "לשעה", "לחודש"], 0, "כתוב 'stay for the weekend'."),
        q("How does the writer feel on Sunday?", "איך הכותבת מרגישה ביום ראשון?", ["Happy", "Sad", "Angry", "Hungry"], ["שמחה", "עצובה", "כועסת", "רעבה"], 1, "כתוב 'I am sad'."),
      ],
    ),
    R(
      "Staying Home Sick (נשארים בבית כשחולים)",
      "I am sick today and I stay in bed. My head hurts and I am hot. My mother gives me tea and soup. I sleep a lot and in the evening I feel better.",
      "אני חולה היום ונשאר במיטה. הראש שלי כואב וחם לי. אמא שלי נותנת לי תה ומרק. אני ישן הרבה ובערב אני מרגיש טוב יותר.",
      [
        g("sick", "adjective", "לא בריא", "I am sick today.", "חולה"),
        g("hurt", "verb", "לכאוב", "My head hurts.", "לכאוב"),
        g("better", "adjective", "טוב יותר", "I feel better.", "טוב יותר"),
      ],
      [
        q("What hurts?", "מה כואב?", ["His head", "His arm", "His leg", "His eye"], ["הראש שלו", "היד שלו", "הרגל שלו", "העין שלו"], 0, "כתוב 'My head hurts'."),
        q("What does the mother give him?", "מה האמא נותנת לו?", ["Tea and soup", "Cake and milk", "Bread and honey", "Rice and fish"], ["תה ומרק", "עוגה וחלב", "לחם ודבש", "אורז ודגים"], 0, "כתוב 'gives me tea and soup'."),
      ],
    ),
    R(
      "Spring Flowers (פרחי האביב)",
      "It is spring and there are flowers everywhere. In our garden there are red and yellow flowers. The bees come and the birds sing. I like to sit outside in the sun.",
      "זה האביב ויש פרחים בכל מקום. בגינה שלנו יש פרחים אדומים וצהובים. הדבורים באות והציפורים שרות. אני אוהבת לשבת בחוץ בשמש.",
      [
        g("spring", "noun", "העונה אחרי החורף", "I love spring.", "אביב"),
        g("flower", "noun", "חלק יפה וצבעוני של צמח", "I see a red flower.", "פרח"),
        g("bee", "noun", "חרק שמכין דבש", "The bee likes flowers.", "דבורה"),
      ],
      [
        q("What color are the flowers?", "באילו צבעים הפרחים?", ["Red and yellow", "Blue and white", "Green and black", "Pink and purple"], ["אדום וצהוב", "כחול ולבן", "ירוק ושחור", "ורוד וסגול"], 0, "כתוב 'red and yellow flowers'."),
        q("What do the birds do?", "מה הציפורים עושות?", ["They sing", "They sleep", "They swim", "They eat"], ["הן שרות", "הן ישנות", "הן שוחות", "הן אוכלות"], 0, "כתוב 'the birds sing'."),
      ],
    ),
    R(
      "Autumn Leaves (עלי הסתיו)",
      "In autumn the leaves are yellow and brown. They are on the ground all around the park. I walk on them and they make a funny noise. I take a big leaf home for my mother.",
      "בסתיו העלים צהובים וחומים. הם על הקרקע בכל הפארק. אני הולך עליהם והם משמיעים רעש מצחיק. אני לוקח הביתה עלה גדול בשביל אמא.",
      [
        g("autumn", "noun", "העונה אחרי הקיץ", "Autumn is nice.", "סתיו"),
        g("ground", "noun", "הרצפה שבחוץ", "The leaves are on the ground.", "קרקע"),
        g("noise", "noun", "קול", "The leaves make a noise.", "רעש"),
      ],
      [
        q("What color are the leaves?", "באילו צבעים העלים?", ["Yellow and brown", "Red and blue", "Green and white", "Black and pink"], ["צהוב וחום", "אדום וכחול", "ירוק ולבן", "שחור וורוד"], 0, "כתוב 'yellow and brown'."),
        q("What does the writer take home?", "מה הכותב לוקח הביתה?", ["A big leaf", "A flower", "A stone", "A book"], ["עלה גדול", "פרח", "אבן", "ספר"], 0, "כתוב 'I take a big leaf home'."),
      ],
    ),
    R(
      "Homework Time (זמן שיעורי בית)",
      "After lunch I do my homework. First I write in my notebook. Then I read a short story. My father helps me with math. I finish at five o'clock.",
      "אחרי ארוחת הצהריים אני עושה שיעורי בית. קודם אני כותב במחברת. אחר כך אני קורא סיפור קצר. אבא שלי עוזר לי בחשבון. אני מסיים בחמש.",
      [
        g("homework", "noun", "עבודה שעושים בבית", "I do my homework.", "שיעורי בית"),
        g("notebook", "noun", "ספר עם דפים ריקים", "I write in my notebook.", "מחברת"),
        g("finish", "verb", "לסיים", "I finish at five.", "לסיים"),
      ],
      [
        q("What does the writer do first?", "מה הכותב עושה קודם?", ["Writes in a notebook", "Reads a story", "Eats lunch", "Plays a game"], ["כותב במחברת", "קורא סיפור", "אוכל ארוחת צהריים", "משחק"], 0, "כתוב 'First I write in my notebook'."),
        q("Who helps with math?", "מי עוזר בחשבון?", ["The father", "The mother", "The sister", "A friend"], ["האבא", "האמא", "האחות", "חבר"], 0, "כתוב 'My father helps me with math'."),
      ],
    ),
    R(
      "Movie Night (ערב סרט)",
      "On Thursday night we have a movie night. We sit on the sofa with a big bowl of popcorn. My little brother is afraid, so he sits near my father. At the end we all laugh.",
      "בליל חמישי יש לנו ערב סרט. אנחנו יושבים על הספה עם קערה גדולה של פופקורן. אחי הקטן מפחד, ולכן הוא יושב ליד אבא שלי. בסוף כולנו צוחקים.",
      [
        g("movie", "noun", "סרט בקולנוע או בטלוויזיה", "We watch a movie.", "סרט"),
        g("sofa", "noun", "כיסא רך וגדול", "We sit on the sofa.", "ספה"),
        g("popcorn", "noun", "תירס מפוצץ", "I eat popcorn.", "פופקורן"),
      ],
      [
        q("When is movie night?", "מתי ערב הסרט?", ["On Thursday night", "On Monday morning", "On Friday afternoon", "On Tuesday"], ["בליל חמישי", "בבוקר יום שני", "אחר צהריים של יום שישי", "ביום שלישי"], 0, "כתוב 'On Thursday night'."),
        q("Who is afraid?", "מי מפחד?", ["The little brother", "The mother", "The writer", "The father"], ["האח הקטן", "האמא", "הכותב", "האבא"], 0, "כתוב 'My little brother is afraid'."),
      ],
    ),
    R(
      "At the Bakery (במאפייה)",
      "Every morning the bakery near my house is full. The smell of warm bread is very nice. I buy bread and a cake for my mother. The woman in the shop always smiles.",
      "כל בוקר המאפייה ליד הבית שלי מלאה. הריח של לחם חם נעים מאוד. אני קונה לחם ועוגה בשביל אמא. האישה בחנות תמיד מחייכת.",
      [
        g("bakery", "noun", "חנות שמוכרת לחם ועוגות", "The bakery is full.", "מאפייה"),
        g("smell", "noun", "מה שמרגישים עם האף", "I like the smell of bread.", "ריח"),
        g("warm", "adjective", "חם קצת", "The bread is warm.", "חם"),
      ],
      [
        q("What is near the writer's house?", "מה נמצא ליד הבית של הכותב?", ["A bakery", "A zoo", "A pool", "A school"], ["מאפייה", "גן חיות", "בריכה", "בית ספר"], 0, "כתוב 'the bakery near my house'."),
        q("What does the writer buy?", "מה הכותב קונה?", ["Bread and a cake", "Milk and eggs", "Apples and honey", "Fish and rice"], ["לחם ועוגה", "חלב וביצים", "תפוחים ודבש", "דגים ואורז"], 0, "כתוב 'I buy bread and a cake'."),
      ],
    ),
    R(
      "My Hometown (עיר הולדתי)",
      "I live in a small town near the sea. There is a library, a market and a big park. Everyone knows everyone. I love my town and I never want to leave.",
      "אני גר בעיירה קטנה ליד הים. יש בה ספרייה, שוק ופארק גדול. כולם מכירים את כולם. אני אוהב את העיירה שלי ולא רוצה לעזוב לעולם.",
      [
        g("town", "noun", "עיר קטנה", "I live in a small town.", "עיירה"),
        g("sea", "noun", "מים גדולים ומלוחים", "The town is near the sea.", "ים"),
        g("leave", "verb", "ללכת ממקום", "I do not want to leave.", "לעזוב"),
      ],
      [
        q("Where is the town?", "איפה העיירה?", ["Near the sea", "On a hill", "On a boat", "Near a farm"], ["ליד הים", "על גבעה", "על סירה", "ליד חווה"], 0, "כתוב 'a small town near the sea'."),
        q("What is in the town?", "מה יש בעיירה?", ["A library, a market and a park", "A zoo and a pool", "A train and an airport", "A museum and a hotel"], ["ספרייה, שוק ופארק", "גן חיות ובריכה", "רכבת ושדה תעופה", "מוזיאון ומלון"], 0, "כתוב 'a library, a market and a big park'."),
      ],
    ),
  ],
};

export const MORE_LISTENINGS10 = {
  A1: [
    L(
      "Hi, it is Dad. I am at work now. Please wait for me at the school door after class. I come at four o'clock. See you soon!",
      "היי, זה אבא. אני בעבודה עכשיו. בבקשה חכה לי ליד הדלת של בית הספר אחרי השיעור. אני מגיע בארבע. נתראה בקרוב!",
      [
        q("Where must the child wait?", "איפה הילד צריך לחכות?", ["At home", "At the school door", "At the bus stop", "In the park"], ["בבית", "ליד דלת בית הספר", "בתחנת האוטובוס", "בפארק"], 1, "נאמר 'wait for me at the school door'."),
        q("When does Dad come?", "מתי אבא מגיע?", ["At two o'clock", "At four o'clock", "At six o'clock", "At eight o'clock"], ["בשתיים", "בארבע", "בשש", "בשמונה"], 1, "נאמר 'I come at four o'clock'."),
      ],
    ),
    L(
      "Good morning! Here is the weather for Tuesday. In the morning it is cloudy and cold. In the afternoon there is rain. Please take your umbrella and a warm coat.",
      "בוקר טוב! הנה מזג האוויר ליום שלישי. בבוקר מעונן וקר. אחר הצהריים יש גשם. בבקשה קחו מטרייה ומעיל חם.",
      [
        q("How is the weather in the morning?", "איך מזג האוויר בבוקר?", ["Sunny and hot", "Cloudy and cold", "Rainy", "Snowy"], ["שמשי וחם", "מעונן וקר", "גשום", "מושלג"], 1, "נאמר 'cloudy and cold'."),
        q("What must people take?", "מה אנשים צריכים לקחת?", ["A hat", "An umbrella", "A bag", "A camera"], ["כובע", "מטרייה", "תיק", "מצלמה"], 1, "נאמר 'take your umbrella'."),
      ],
    ),
    L(
      "Hello. Two tickets for the movie at six o'clock, please. Yes, they are ten dollars. The movie starts at six and ends at eight. Here are your tickets. Have fun!",
      "שלום. שני כרטיסים לסרט בשש, בבקשה. כן, הם עשרה דולרים. הסרט מתחיל בשש ונגמר בשמונה. הנה הכרטיסים שלכם. תיהנו!",
      [
        q("How many tickets does the person buy?", "כמה כרטיסים האדם קונה?", ["One", "Two", "Three", "Four"], ["אחד", "שניים", "שלושה", "ארבעה"], 1, "נאמר 'Two tickets'."),
        q("When does the movie start?", "מתי הסרט מתחיל?", ["At six", "At eight", "At ten", "At four"], ["בשש", "בשמונה", "בעשר", "בארבע"], 0, "נאמר 'starts at six'."),
      ],
    ),
    L(
      "Welcome to the pool. Please listen. Do not run near the water. Take a shower before you swim. Little children must stay with a parent. Have a good day!",
      "ברוכים הבאים לבריכה. בבקשה הקשיבו. אל תרוצו ליד המים. התקלחו לפני שאתם שוחים. ילדים קטנים חייבים להישאר עם הורה. שיהיה לכם יום טוב!",
      [
        q("What must you do before you swim?", "מה צריך לעשות לפני ששוחים?", ["Eat lunch", "Take a shower", "Call a friend", "Run"], ["לאכול ארוחת צהריים", "להתקלח", "להתקשר לחבר", "לרוץ"], 1, "נאמר 'Take a shower before you swim'."),
        q("Who must stay with a parent?", "מי חייב להישאר עם הורה?", ["Little children", "Teachers", "Big boys", "Everyone"], ["ילדים קטנים", "מורים", "בנים גדולים", "כולם"], 0, "נאמר 'Little children must stay with a parent'."),
      ],
    ),
    L(
      "Good afternoon, class. Your homework is on page ten. Read the story and answer three questions. Write the answers in your notebook. See you on Wednesday.",
      "אחר צהריים טובים, כיתה. שיעורי הבית הם בעמוד עשר. קראו את הסיפור וענו על שלוש שאלות. כתבו את התשובות במחברת. נתראה ביום רביעי.",
      [
        q("Which page is the homework on?", "באיזה עמוד שיעורי הבית?", ["Page two", "Page ten", "Page twelve", "Page five"], ["עמוד שתיים", "עמוד עשר", "עמוד שתים עשרה", "עמוד חמש"], 1, "נאמר 'on page ten'."),
        q("Where do the children write the answers?", "איפה הילדים כותבים את התשובות?", ["On the board", "In their notebook", "On a poster", "In a letter"], ["על הלוח", "במחברת", "על כרזה", "במכתב"], 1, "נאמר 'Write the answers in your notebook'."),
      ],
    ),
    L(
      "Welcome to our shop! Today we have bread, cookies and chocolate cake. The bread is two dollars. The cookies are three dollars. The cake is five dollars.",
      "ברוכים הבאים לחנות שלנו! היום יש לנו לחם, עוגיות ועוגת שוקולד. הלחם עולה שני דולרים. העוגיות עולות שלושה דולרים. העוגה עולה חמישה דולרים.",
      [
        q("How much is the bread?", "כמה עולה הלחם?", ["Two dollars", "Three dollars", "Five dollars", "One dollar"], ["שני דולרים", "שלושה דולרים", "חמישה דולרים", "דולר אחד"], 0, "נאמר 'The bread is two dollars'."),
        q("What kind of cake do they have?", "איזו עוגה יש להם?", ["Apple cake", "Chocolate cake", "Cheese cake", "Banana cake"], ["עוגת תפוחים", "עוגת שוקולד", "עוגת גבינה", "עוגת בננה"], 1, "נאמר 'chocolate cake'."),
      ],
    ),
    L(
      "Hello, everyone. The plane to Paris leaves at half past ten. Please go to door five now. Have your tickets with you. Thank you.",
      "שלום לכולם. המטוס לפריז ממריא בעשר וחצי. בבקשה לכו עכשיו אל שער חמש. החזיקו את הכרטיסים ביד. תודה.",
      [
        q("Where is the plane going?", "לאן המטוס טס?", ["To London", "To Paris", "To a farm", "To the sea"], ["ללונדון", "לפריז", "לחווה", "לים"], 1, "נאמר 'The plane to Paris'."),
        q("Which door must people go to?", "לאיזה שער האנשים צריכים ללכת?", ["Door two", "Door five", "Door ten", "Door six"], ["שער שתיים", "שער חמש", "שער עשר", "שער שש"], 1, "נאמר 'go to door five'."),
      ],
    ),
    L(
      "Good evening. Welcome to our hotel. Your room is on the second floor. It is room number six. Breakfast is from seven to ten in the morning. Here is your key.",
      "ערב טוב. ברוכים הבאים למלון שלנו. החדר שלכם בקומה השנייה. זה חדר מספר שש. ארוחת הבוקר היא משבע עד עשר בבוקר. הנה המפתח שלכם.",
      [
        q("Which floor is the room on?", "באיזו קומה החדר?", ["The first floor", "The second floor", "The garden", "The top floor"], ["הקומה הראשונה", "הקומה השנייה", "הגינה", "הקומה העליונה"], 1, "נאמר 'on the second floor'."),
        q("When is breakfast?", "מתי ארוחת הבוקר?", ["From seven to ten", "From two to four", "From six to eight in the evening", "At night"], ["משבע עד עשר", "משתיים עד ארבע", "משש עד שמונה בערב", "בלילה"], 0, "נאמר 'from seven to ten in the morning'."),
      ],
    ),
    L(
      "Hello. I can't find my bag. It is black and it is small. It has a book and a bottle of water inside. I am at the station near the bus stop. Please call me.",
      "שלום. אני לא מוצא את התיק שלי. הוא שחור וקטן. יש בו ספר ובקבוק מים. אני בתחנה ליד תחנת האוטובוס. בבקשה התקשרו אליי.",
      [
        q("What color is the bag?", "באיזה צבע התיק?", ["Black", "Blue", "Red", "White"], ["שחור", "כחול", "אדום", "לבן"], 0, "נאמר 'It is black and it is small'."),
        q("What is inside the bag?", "מה יש בתוך התיק?", ["A book and a bottle of water", "A phone and a key", "A hat and a coat", "A sandwich and an apple"], ["ספר ובקבוק מים", "טלפון ומפתח", "כובע ומעיל", "כריך ותפוח"], 0, "נאמר 'a book and a bottle of water inside'."),
      ],
    ),
    L(
      "Hi, it is Lea. I have a party on Saturday at four o'clock. Please come to my house. We will eat pizza and cake and play games. I hope you can come!",
      "היי, זאת לאה. יש לי מסיבה בשבת בארבע. בבקשה בוא לבית שלי. נאכל פיצה ועוגה ונשחק משחקים. אני מקווה שתוכל לבוא!",
      [
        q("When is the party?", "מתי המסיבה?", ["On Saturday at four", "On Friday at six", "On Sunday at two", "On Monday at five"], ["בשבת בארבע", "ביום שישי בשש", "ביום ראשון בשתיים", "ביום שני בחמש"], 0, "נאמר 'on Saturday at four o'clock'."),
        q("What will they eat?", "מה הם יאכלו?", ["Pizza and cake", "Soup and bread", "Rice and fish", "Salad and eggs"], ["פיצה ועוגה", "מרק ולחם", "אורז ודגים", "סלט וביצים"], 0, "נאמר 'eat pizza and cake'."),
      ],
    ),
    L(
      "Welcome to the farm shop. We have eggs, milk and cheese. The milk is from our cows. The eggs are from our chickens. Everything is cheap today.",
      "ברוכים הבאים לחנות של החווה. יש לנו ביצים, חלב וגבינה. החלב מהפרות שלנו. הביצים מהתרנגולות שלנו. הכול זול היום.",
      [
        q("Where does the milk come from?", "מאיפה החלב?", ["From the cows", "From the chickens", "From the shop next door", "From a factory"], ["מהפרות", "מהתרנגולות", "מהחנות ליד", "ממפעל"], 0, "נאמר 'The milk is from our cows'."),
        q("What is the price today?", "מה המחיר היום?", ["Everything is cheap", "Everything is free", "Everything is big", "Everything is old"], ["הכול זול", "הכול בחינם", "הכול גדול", "הכול ישן"], 0, "נאמר 'Everything is cheap today'."),
      ],
    ),
    L(
      "Hello, team! Football practice is on Thursday at five o'clock. Please bring your shoes and a bottle of water. We play on the big field behind the school. Do not be late!",
      "שלום, קבוצה! אימון כדורגל ביום חמישי בחמש. בבקשה הביאו נעליים ובקבוק מים. אנחנו משחקים במגרש הגדול מאחורי בית הספר. אל תאחרו!",
      [
        q("When is the football practice?", "מתי אימון הכדורגל?", ["On Thursday at five", "On Monday at four", "On Friday at six", "On Sunday at nine"], ["ביום חמישי בחמש", "ביום שני בארבע", "ביום שישי בשש", "ביום ראשון בתשע"], 0, "נאמר 'on Thursday at five o'clock'."),
        q("What must the players bring?", "מה השחקנים צריכים להביא?", ["Shoes and water", "A hat and a coat", "A book and a pen", "Food and a chair"], ["נעליים ומים", "כובע ומעיל", "ספר ועט", "אוכל וכיסא"], 0, "נאמר 'bring your shoes and a bottle of water'."),
      ],
    ),
    L(
      "Class, listen please. Tomorrow we go to the lake. We will see ducks and boats. The bus leaves at eight o'clock. Bring a hat, because it is sunny.",
      "כיתה, הקשיבו בבקשה. מחר אנחנו נוסעים לאגם. נראה ברווזים וסירות. האוטובוס יוצא בשמונה. הביאו כובע, כי שמשי.",
      [
        q("Where does the class go?", "לאן הכיתה נוסעת?", ["To the lake", "To the museum", "To the zoo", "To the farm"], ["לאגם", "למוזיאון", "לגן החיות", "לחווה"], 0, "נאמר 'we go to the lake'."),
        q("Why must the children bring a hat?", "למה הילדים צריכים להביא כובע?", ["It is sunny", "It is cold", "It is rainy", "It is dark"], ["כי שמשי", "כי קר", "כי גשום", "כי חשוך"], 0, "נאמר 'because it is sunny'."),
      ],
    ),
    L(
      "Welcome to the library. Please be quiet. You can take three books for two weeks. Put the books back on the shelf. Do not eat or drink here. Thank you.",
      "ברוכים הבאים לספרייה. בבקשה שמרו על שקט. אפשר לקחת שלושה ספרים לשבועיים. החזירו את הספרים למדף. אין לאכול או לשתות כאן. תודה.",
      [
        q("How many books can you take?", "כמה ספרים אפשר לקחת?", ["Two", "Three", "Five", "Ten"], ["שניים", "שלושה", "חמישה", "עשרה"], 1, "נאמר 'take three books'."),
        q("For how long can you keep them?", "לכמה זמן אפשר לשמור אותם?", ["For two weeks", "For one day", "For a year", "For one hour"], ["לשבועיים", "ליום אחד", "לשנה", "לשעה"], 0, "נאמר 'for two weeks'."),
      ],
    ),
    L(
      "Hello. Where to, please? To the station? Okay. It is ten minutes from here. It is eight dollars. Here we are. Thank you, and have a good day!",
      "שלום. לאן, בבקשה? לתחנה? בסדר. זה עשר דקות מכאן. זה שמונה דולרים. הגענו. תודה, ויום טוב!",
      [
        q("Where does the person go?", "לאן האדם נוסע?", ["To the station", "To the hotel", "To the school", "To the beach"], ["לתחנה", "למלון", "לבית הספר", "לים"], 0, "נאמר 'To the station?'."),
        q("How long is the trip?", "כמה זמן הנסיעה?", ["Ten minutes", "One hour", "Two minutes", "Five hours"], ["עשר דקות", "שעה", "שתי דקות", "חמש שעות"], 0, "נאמר 'It is ten minutes from here'."),
      ],
    ),
    L(
      "Hello. Please sit here. Does your arm hurt? Show me your arm. It is not broken. Put ice on it for ten minutes. Come back on Monday.",
      "שלום. בבקשה שב כאן. היד שלך כואבת? תראה לי את היד. היא לא שבורה. שים עליה קרח לעשר דקות. חזור ביום שני.",
      [
        q("What hurts?", "מה כואב?", ["His arm", "His head", "His leg", "His eye"], ["היד שלו", "הראש שלו", "הרגל שלו", "העין שלו"], 0, "נאמר 'Does your arm hurt?'."),
        q("What must he put on it?", "מה הוא צריך לשים עליה?", ["Ice", "Soap", "Water", "A coat"], ["קרח", "סבון", "מים", "מעיל"], 0, "נאמר 'Put ice on it'."),
      ],
    ),
    L(
      "Hello! What do you want to eat today? We have chicken, fish and rice. We have a nice soup too. For drinks we have juice, water and tea.",
      "שלום! מה אתם רוצים לאכול היום? יש לנו עוף, דגים ואורז. יש לנו גם מרק טוב. לשתייה יש מיץ, מים ותה.",
      [
        q("Which food does the restaurant have?", "איזה אוכל יש במסעדה?", ["Chicken, fish and rice", "Pizza and cake", "Eggs and bread", "Salad and cheese"], ["עוף, דגים ואורז", "פיצה ועוגה", "ביצים ולחם", "סלט וגבינה"], 0, "נאמר 'chicken, fish and rice'."),
        q("Which drinks do they have?", "אילו משקאות יש להם?", ["Juice, water and tea", "Milk and coffee", "Only water", "Tea and milk"], ["מיץ, מים ותה", "חלב וקפה", "רק מים", "תה וחלב"], 0, "נאמר 'juice, water and tea'."),
      ],
    ),
    L(
      "Good morning! This is your morning radio show. Now here is a song for all the children. It is about a little frog. Sing with us!",
      "בוקר טוב! זו תוכנית הרדיו של הבוקר. עכשיו הנה שיר לכל הילדים. הוא על צפרדע קטנה. שירו איתנו!",
      [
        q("Who is the song for?", "בשביל מי השיר?", ["All the children", "The teachers", "The parents", "The doctors"], ["כל הילדים", "המורים", "ההורים", "הרופאים"], 0, "נאמר 'a song for all the children'."),
        q("What is the song about?", "על מה השיר?", ["A little frog", "A big bear", "A red car", "A school bus"], ["צפרדע קטנה", "דוב גדול", "מכונית אדומה", "אוטובוס בית ספר"], 0, "נאמר 'about a little frog'."),
      ],
    ),
    L(
      "Hello! My name is Noa. I am nine years old. I live in a small house near the sea. I like swimming and drawing. My best friend is my cousin.",
      "שלום! קוראים לי נועה. אני בת תשע. אני גרה בבית קטן ליד הים. אני אוהבת לשחות ולצייר. החברה הכי טובה שלי היא בת הדודה שלי.",
      [
        q("How old is Noa?", "בת כמה נועה?", ["Seven", "Eight", "Nine", "Ten"], ["שבע", "שמונה", "תשע", "עשר"], 2, "נאמר 'I am nine years old'."),
        q("What does Noa like?", "מה נועה אוהבת?", ["Swimming and drawing", "Football and music", "Cooking and reading", "Dancing and singing"], ["לשחות ולצייר", "כדורגל ומוזיקה", "לבשל ולקרוא", "לרקוד ולשיר"], 0, "נאמר 'I like swimming and drawing'."),
      ],
    ),
    L(
      "I have a big family. I have two brothers and three sisters. My grandmother lives with us too. Our house is full and it is never quiet. I love it.",
      "יש לי משפחה גדולה. יש לי שני אחים ושלוש אחיות. גם סבתא שלי גרה איתנו. הבית שלנו מלא והוא אף פעם לא שקט. אני אוהב את זה.",
      [
        q("How many brothers does the speaker have?", "כמה אחים יש לדובר?", ["One", "Two", "Three", "Five"], ["אחד", "שניים", "שלושה", "חמישה"], 1, "נאמר 'two brothers and three sisters'."),
        q("Who lives with the family?", "מי גר עם המשפחה?", ["The grandmother", "The aunt", "The teacher", "A friend"], ["הסבתא", "הדודה", "המורה", "חבר"], 0, "נאמר 'My grandmother lives with us'."),
      ],
    ),
    L(
      "Go straight on this street. Turn right at the school. The park is on the left, near the big tree. It takes five minutes. You can walk.",
      "לכו ישר ברחוב הזה. פנו ימינה ליד בית הספר. הפארק משמאל, ליד העץ הגדול. זה לוקח חמש דקות. אפשר ללכת ברגל.",
      [
        q("Where must you turn right?", "איפה צריך לפנות ימינה?", ["At the school", "At the shop", "At the park", "At the station"], ["ליד בית הספר", "ליד החנות", "ליד הפארק", "ליד התחנה"], 0, "נאמר 'Turn right at the school'."),
        q("How long does it take?", "כמה זמן זה לוקח?", ["Five minutes", "One hour", "Ten minutes", "A day"], ["חמש דקות", "שעה", "עשר דקות", "יום"], 0, "נאמר 'It takes five minutes'."),
      ],
    ),
    L(
      "Come, come! Tomatoes are two shekels. Apples are five shekels. Today the lemons are very cheap. Buy a lot and be happy!",
      "בואו, בואו! עגבניות בשני שקלים. תפוחים בחמישה שקלים. היום הלימונים זולים מאוד. קנו הרבה ותהיו שמחים!",
      [
        q("How much are the tomatoes?", "כמה עולות העגבניות?", ["Two shekels", "Five shekels", "Ten shekels", "One shekel"], ["שני שקלים", "חמישה שקלים", "עשרה שקלים", "שקל אחד"], 0, "נאמר 'Tomatoes are two shekels'."),
        q("Which fruit is cheap today?", "איזה פרי זול היום?", ["Lemons", "Bananas", "Oranges", "Grapes"], ["לימונים", "בננות", "תפוזים", "ענבים"], 0, "נאמר 'the lemons are very cheap'."),
      ],
    ),
    L(
      "This is the bus to the beach. The next stop is the market. Please do not stand near the door. The trip takes one hour. Have a nice day!",
      "זה האוטובוס לים. התחנה הבאה היא השוק. בבקשה אל תעמדו ליד הדלת. הנסיעה לוקחת שעה. שיהיה לכם יום נעים!",
      [
        q("Where does the bus go?", "לאן האוטובוס נוסע?", ["To the beach", "To the zoo", "To the school", "To the airport"], ["לים", "לגן החיות", "לבית הספר", "לשדה התעופה"], 0, "נאמר 'the bus to the beach'."),
        q("What is the next stop?", "מהי התחנה הבאה?", ["The market", "The park", "The station", "The hotel"], ["השוק", "הפארק", "התחנה", "המלון"], 0, "נאמר 'The next stop is the market'."),
      ],
    ),
    L(
      "Good morning! It is Friday and we have no school. Dad makes eggs and I make tea. After breakfast we go to see my grandmother. I like Fridays.",
      "בוקר טוב! זה יום שישי ואין לנו בית ספר. אבא מכין ביצים ואני מכינה תה. אחרי ארוחת הבוקר אנחנו הולכים לבקר את סבתא. אני אוהבת ימי שישי.",
      [
        q("Who makes the eggs?", "מי מכין את הביצים?", ["Dad", "Mom", "The speaker", "Grandmother"], ["אבא", "אמא", "הדוברת", "סבתא"], 0, "נאמר 'Dad makes eggs'."),
        q("What do they do after breakfast?", "מה הם עושים אחרי ארוחת הבוקר?", ["They see the grandmother", "They go to school", "They go to the beach", "They sleep"], ["הם מבקרים את סבתא", "הם הולכים לבית הספר", "הם הולכים לים", "הם ישנים"], 0, "נאמר 'we go to see my grandmother'."),
      ],
    ),
    L(
      "Hello, it is Grandpa. Come to my house on Friday. I want to show you my garden. The flowers are red and yellow now. Bring your sister too.",
      "שלום, זה סבא. בואו אליי הביתה ביום שישי. אני רוצה להראות לכם את הגינה שלי. הפרחים אדומים וצהובים עכשיו. תביאו גם את אחותכם.",
      [
        q("When must the children come?", "מתי הילדים צריכים לבוא?", ["On Friday", "On Monday", "On Sunday", "Tomorrow morning"], ["ביום שישי", "ביום שני", "ביום ראשון", "מחר בבוקר"], 0, "נאמר 'Come to my house on Friday'."),
        q("What does Grandpa want to show them?", "מה סבא רוצה להראות להם?", ["His garden", "His car", "His phone", "His dog"], ["את הגינה שלו", "את המכונית שלו", "את הטלפון שלו", "את הכלב שלו"], 0, "נאמר 'show you my garden'."),
      ],
    ),
    L(
      "Good morning, class. Today we go outside. Run to the tree and back. Then sit on the grass. After that we play a game with the ball.",
      "בוקר טוב, כיתה. היום אנחנו יוצאים החוצה. רוצו עד העץ וחזרה. אחר כך שבו על הדשא. אחרי זה נשחק משחק עם הכדור.",
      [
        q("Where must the children run?", "לאן הילדים צריכים לרוץ?", ["To the tree and back", "To the school", "To the door", "To the pool"], ["עד העץ וחזרה", "לבית הספר", "לדלת", "לבריכה"], 0, "נאמר 'Run to the tree and back'."),
        q("What game do they play?", "איזה משחק הם משחקים?", ["A game with the ball", "A game with cards", "A game with a kite", "A game on the phone"], ["משחק עם כדור", "משחק קלפים", "משחק עם עפיפון", "משחק בטלפון"], 0, "נאמר 'a game with the ball'."),
      ],
    ),
    L(
      "I need some things from the shop. Please buy milk, bread and six eggs. Buy two lemons and one big onion too. Thank you very much!",
      "אני צריכה כמה דברים מהחנות. בבקשה קנה חלב, לחם ושש ביצים. קנה גם שני לימונים ובצל גדול אחד. תודה רבה!",
      [
        q("How many eggs must he buy?", "כמה ביצים הוא צריך לקנות?", ["Two", "Four", "Six", "Ten"], ["שתיים", "ארבע", "שש", "עשר"], 2, "נאמר 'six eggs'."),
        q("What else must he buy?", "מה עוד הוא צריך לקנות?", ["Two lemons and an onion", "Apples and bananas", "Fish and rice", "Cheese and butter"], ["שני לימונים ובצל", "תפוחים ובננות", "דגים ואורז", "גבינה וחמאה"], 0, "נאמר 'two lemons and one big onion'."),
      ],
    ),
    L(
      "I have a pet bird. It is small and yellow. Its name is Sunny. It sings every morning at seven o'clock. I give it water and I talk to it.",
      "יש לי ציפור מחמד. היא קטנה וצהובה. קוראים לה סאני. היא שרה כל בוקר בשבע. אני נותן לה מים ומדבר איתה.",
      [
        q("What color is the bird?", "באיזה צבע הציפור?", ["Yellow", "Red", "Blue", "Green"], ["צהובה", "אדומה", "כחולה", "ירוקה"], 0, "נאמר 'small and yellow'."),
        q("When does the bird sing?", "מתי הציפור שרה?", ["Every morning", "Every night", "Every Friday", "Every afternoon"], ["כל בוקר", "כל לילה", "כל יום שישי", "כל אחר צהריים"], 0, "נאמר 'sings every morning'."),
      ],
    ),
    L(
      "Here is our school day. First we have math. Then we have music. After lunch we have science and sport. School ends at two o'clock.",
      "הנה יום הלימודים שלנו. קודם יש לנו חשבון. אחר כך מוזיקה. אחרי ארוחת הצהריים יש לנו מדעים וספורט. בית הספר נגמר בשתיים.",
      [
        q("What do they have after lunch?", "מה יש להם אחרי ארוחת הצהריים?", ["Science and sport", "Math and music", "Only music", "Nothing"], ["מדעים וספורט", "חשבון ומוזיקה", "רק מוזיקה", "כלום"], 0, "נאמר 'After lunch we have science and sport'."),
        q("When does school end?", "מתי בית הספר נגמר?", ["At two o'clock", "At one o'clock", "At four o'clock", "At six o'clock"], ["בשתיים", "באחת", "בארבע", "בשש"], 0, "נאמר 'School ends at two o'clock'."),
      ],
    ),
    L(
      "Hi! Can you sleep at my house on Friday? My mother says yes. We can watch a film and eat pizza. Bring a blanket. It is cold at night.",
      "היי! את יכולה לישון אצלי בבית ביום שישי? אמא שלי אומרת כן. אנחנו יכולות לראות סרט ולאכול פיצה. תביאי שמיכה. קר בלילה.",
      [
        q("Where will the friend sleep?", "איפה החברה תישן?", ["At the speaker's house", "At school", "At a hotel", "At the beach"], ["בבית של הדוברת", "בבית הספר", "במלון", "בים"], 0, "נאמר 'sleep at my house on Friday'."),
        q("What must she bring?", "מה היא צריכה להביא?", ["A blanket", "A book", "A ball", "A hat"], ["שמיכה", "ספר", "כדור", "כובע"], 0, "נאמר 'Bring a blanket'."),
      ],
    ),
    L(
      "Hello. Here is your ticket. Please show it to me. Your seat is number twelve, near the window. The train goes to the city. It is very fast today.",
      "שלום. הנה הכרטיס שלך. בבקשה הראה לי אותו. המושב שלך מספר שתים עשרה, ליד החלון. הרכבת נוסעת לעיר. היא מהירה מאוד היום.",
      [
        q("What must the person show?", "מה האדם צריך להראות?", ["The ticket", "The key", "The phone", "The bag"], ["את הכרטיס", "את המפתח", "את הטלפון", "את התיק"], 0, "נאמר 'Please show it to me'."),
        q("Where is the seat?", "איפה המושב?", ["Near the window", "Near the door", "At the top", "Outside"], ["ליד החלון", "ליד הדלת", "למעלה", "בחוץ"], 0, "נאמר 'near the window'."),
      ],
    ),
    L(
      "Hello, class. Take a pencil and a piece of paper. Draw your favourite animal. Use the pencil first. Then use a red pen.",
      "שלום, כיתה. קחו עיפרון וחתיכת נייר. ציירו את החיה האהובה עליכם. השתמשו קודם בעיפרון. אחר כך השתמשו בעט אדום.",
      [
        q("What must the children draw?", "מה הילדים צריכים לצייר?", ["Their favourite animal", "Their house", "Their family", "Their teacher"], ["את החיה האהובה עליהם", "את הבית שלהם", "את המשפחה שלהם", "את המורה שלהם"], 0, "נאמר 'Draw your favourite animal'."),
        q("What do they use first?", "במה הם משתמשים קודם?", ["The pencil", "A red pen", "A ruler", "A book"], ["בעיפרון", "בעט אדום", "בסרגל", "בספר"], 0, "נאמר 'Use the pencil first'."),
      ],
    ),
    L(
      "Hello. Please close the door when you leave the building. It is cold at night. Thank you very much. Have a good evening!",
      "שלום. בבקשה סגרו את הדלת כשאתם יוצאים מהבניין. קר בלילה. תודה רבה. ערב טוב!",
      [
        q("What must people close?", "מה אנשים צריכים לסגור?", ["The door", "The window", "The book", "The bag"], ["את הדלת", "את החלון", "את הספר", "את התיק"], 0, "נאמר 'close the door'."),
        q("Why is this important?", "למה זה חשוב?", ["It is cold at night", "It is hot", "It is dark", "It is raining"], ["קר בלילה", "חם", "חשוך", "יורד גשם"], 0, "נאמר 'It is cold at night'."),
      ],
    ),
    L(
      "Good morning, everyone! Wake up! It is seven o'clock. Wash your face and come to breakfast. After breakfast we walk to the hill.",
      "בוקר טוב לכולם! קומו! השעה שבע. שטפו את הפנים ובואו לארוחת בוקר. אחרי ארוחת הבוקר אנחנו הולכים אל הגבעה.",
      [
        q("What time is it?", "מה השעה?", ["Seven o'clock", "Six o'clock", "Nine o'clock", "Ten o'clock"], ["שבע", "שש", "תשע", "עשר"], 0, "נאמר 'It is seven o'clock'."),
        q("What do they do after breakfast?", "מה הם עושים אחרי ארוחת הבוקר?", ["They walk to the hill", "They swim", "They sleep", "They go home"], ["הם הולכים אל הגבעה", "הם שוחים", "הם ישנים", "הם חוזרים הביתה"], 0, "נאמר 'we walk to the hill'."),
      ],
    ),
    L(
      "Welcome to the beach. Please swim near the flags. The sea is big and the water is cold today. Little kids must stay with their parents. Have a good day!",
      "ברוכים הבאים לחוף. בבקשה שחו ליד הדגלים. הים גדול והמים קרים היום. ילדים קטנים חייבים להישאר עם ההורים שלהם. שיהיה לכם יום טוב!",
      [
        q("Where must people swim?", "איפה צריך לשחות?", ["Near the flags", "Near the school", "Away from the beach", "Near the road"], ["ליד הדגלים", "ליד בית הספר", "רחוק מהחוף", "ליד הכביש"], 0, "נאמר 'swim near the flags'."),
        q("How is the water today?", "איך המים היום?", ["Cold", "Hot", "Warm", "Green"], ["קרים", "חמים מאוד", "חמימים", "ירוקים"], 0, "נאמר 'the water is cold today'."),
      ],
    ),
    L(
      "I have a new phone! It is small and it is blue. It has a very good camera. I take photos of my cat and my friends. I love it.",
      "יש לי טלפון חדש! הוא קטן והוא כחול. יש לו מצלמה טובה מאוד. אני מצלם את החתול שלי ואת החברים שלי. אני אוהב אותו.",
      [
        q("What color is the phone?", "באיזה צבע הטלפון?", ["Blue", "Black", "Red", "White"], ["כחול", "שחור", "אדום", "לבן"], 0, "נאמר 'it is blue'."),
        q("What does the speaker take photos of?", "את מה הדובר מצלם?", ["His cat and friends", "His food", "His school", "His house"], ["את החתול והחברים שלו", "את האוכל שלו", "את בית הספר שלו", "את הבית שלו"], 0, "נאמר 'photos of my cat and my friends'."),
      ],
    ),
    L(
      "Excuse me, does this bus go to the hospital? No, it does not. Take bus number five. It is over there, near the big tree. Thank you!",
      "סליחה, האוטובוס הזה נוסע לבית החולים? לא, הוא לא נוסע. קחו אוטובוס מספר חמש. הוא שם, ליד העץ הגדול. תודה!",
      [
        q("Where does the person want to go?", "לאן האדם רוצה להגיע?", ["To the hospital", "To the school", "To the market", "To the beach"], ["לבית החולים", "לבית הספר", "לשוק", "לים"], 0, "נאמר 'does this bus go to the hospital?'."),
        q("Which bus must the person take?", "איזה אוטובוס האדם צריך לקחת?", ["Number five", "Number two", "Number ten", "Number six"], ["מספר חמש", "מספר שתיים", "מספר עשר", "מספר שש"], 0, "נאמר 'Take bus number five'."),
      ],
    ),
    L(
      "Everyone, stand here. Tall children go behind. Small children go in front. Look at the camera and smile. One, two, three! Thank you.",
      "כולם, עמדו כאן. ילדים גבוהים עומדים מאחור. ילדים נמוכים עומדים מלפנים. הסתכלו למצלמה וחייכו. אחת, שתיים, שלוש! תודה.",
      [
        q("Where do the tall children go?", "לאן הילדים הגבוהים הולכים?", ["Behind", "In front", "Outside", "Near the door"], ["מאחור", "מלפנים", "החוצה", "ליד הדלת"], 0, "נאמר 'Tall children go behind'."),
        q("What must everyone do?", "מה כולם צריכים לעשות?", ["Smile", "Run", "Sing", "Sit down"], ["לחייך", "לרוץ", "לשיר", "לשבת"], 0, "נאמר 'Look at the camera and smile'."),
      ],
    ),
    L(
      "We have a new house! It is big and it has a garden. My room is on the first floor. I have a new bed and a big window. I like it very much.",
      "יש לנו בית חדש! הוא גדול ויש בו גינה. החדר שלי בקומה הראשונה. יש לי מיטה חדשה וחלון גדול. אני אוהב אותו מאוד.",
      [
        q("What does the new house have?", "מה יש בבית החדש?", ["A garden", "A pool", "A shop", "A farm"], ["גינה", "בריכה", "חנות", "חווה"], 0, "נאמר 'it has a garden'."),
        q("Where is the speaker's room?", "איפה החדר של הדובר?", ["On the first floor", "On the top floor", "Near the garden", "Under the stairs"], ["בקומה הראשונה", "בקומה העליונה", "ליד הגינה", "מתחת למדרגות"], 0, "נאמר 'My room is on the first floor'."),
      ],
    ),
    L(
      "My favourite subject is science. We learn about the sun and the moon. Our teacher shows us a big picture of the sky. I want to be a scientist.",
      "המקצוע האהוב עליי הוא מדעים. אנחנו לומדים על השמש ועל הירח. המורה שלנו מראה לנו תמונה גדולה של השמיים. אני רוצה להיות מדען.",
      [
        q("What is the favourite subject?", "מהו המקצוע האהוב?", ["Science", "Math", "Music", "Sport"], ["מדעים", "חשבון", "מוזיקה", "ספורט"], 0, "נאמר 'My favourite subject is science'."),
        q("What do they learn about?", "על מה הם לומדים?", ["The sun and the moon", "Animals and trees", "Food and water", "Cars and trains"], ["על השמש והירח", "על חיות ועצים", "על אוכל ומים", "על מכוניות ורכבות"], 0, "נאמר 'about the sun and the moon'."),
      ],
    ),
    L(
      "My mother is a nurse. She works at a hospital. My father is a bus driver. They are tired in the evening, but they are happy. I love my parents.",
      "אמא שלי אחות. היא עובדת בבית חולים. אבא שלי נהג אוטובוס. הם עייפים בערב, אבל הם שמחים. אני אוהב את ההורים שלי.",
      [
        q("Where does the mother work?", "איפה האמא עובדת?", ["At a hospital", "At a school", "At a shop", "At a bank"], ["בבית חולים", "בבית ספר", "בחנות", "בבנק"], 0, "נאמר 'She works at a hospital'."),
        q("What is the father's job?", "מה המקצוע של האבא?", ["Bus driver", "Doctor", "Teacher", "Farmer"], ["נהג אוטובוס", "רופא", "מורה", "חקלאי"], 0, "נאמר 'My father is a bus driver'."),
      ],
    ),
    L(
      "Welcome to the old town. On your left you can see the old church. On your right there is a big tower. Please stay together and do not run.",
      "ברוכים הבאים לעיר העתיקה. משמאל אפשר לראות את הכנסייה הישנה. מימין יש מגדל גדול. בבקשה הישארו ביחד ואל תרוצו.",
      [
        q("What is on the left?", "מה יש משמאל?", ["The old church", "The big tower", "A school", "A river"], ["הכנסייה הישנה", "המגדל הגדול", "בית ספר", "נהר"], 0, "נאמר 'On your left you can see the old church'."),
        q("What is on the right?", "מה יש מימין?", ["A big tower", "A hotel", "A market", "A park"], ["מגדל גדול", "מלון", "שוק", "פארק"], 0, "נאמר 'On your right there is a big tower'."),
      ],
    ),
    L(
      "Today we make a simple soup. First cut the onion and the carrots. Put them in water. Add a little salt. Cook for ten minutes. Then eat!",
      "היום אנחנו מכינים מרק פשוט. קודם חתכו את הבצל ואת הגזרים. שימו אותם במים. הוסיפו מעט מלח. בשלו עשר דקות. ואז לאכול!",
      [
        q("What must you cut first?", "מה צריך לחתוך קודם?", ["The onion and the carrots", "The bread", "The cheese", "The apples"], ["את הבצל ואת הגזרים", "את הלחם", "את הגבינה", "את התפוחים"], 0, "נאמר 'First cut the onion and the carrots'."),
        q("How long must you cook the soup?", "כמה זמן צריך לבשל את המרק?", ["Ten minutes", "One hour", "Two minutes", "One day"], ["עשר דקות", "שעה", "שתי דקות", "יום"], 0, "נאמר 'Cook for ten minutes'."),
      ],
    ),
    L(
      "It is seven o'clock. Time to get up! Breakfast is at quarter past seven. School starts at eight. Please do not be late today.",
      "השעה שבע. הגיע הזמן לקום! ארוחת הבוקר בשבע ורבע. בית הספר מתחיל בשמונה. בבקשה אל תאחרו היום.",
      [
        q("When is breakfast?", "מתי ארוחת הבוקר?", ["At quarter past seven", "At eight o'clock", "At six o'clock", "At half past eight"], ["בשבע ורבע", "בשמונה", "בשש", "בשמונה וחצי"], 0, "נאמר 'at quarter past seven'."),
        q("When does school start?", "מתי בית הספר מתחיל?", ["At eight", "At seven", "At nine", "At ten"], ["בשמונה", "בשבע", "בתשע", "בעשר"], 0, "נאמר 'School starts at eight'."),
      ],
    ),
    L(
      "It is raining, so we stay at home today. Let's play cards and make hot chocolate. Then we can watch a film. I like rainy days with my family.",
      "יורד גשם, ולכן אנחנו נשארים היום בבית. בואו נשחק קלפים ונכין שוקו חם. אחר כך נוכל לראות סרט. אני אוהב ימים גשומים עם המשפחה שלי.",
      [
        q("Why do they stay at home?", "למה הם נשארים בבית?", ["It is raining", "It is hot", "They are sick", "It is Friday"], ["יורד גשם", "חם", "הם חולים", "זה יום שישי"], 0, "נאמר 'It is raining, so we stay at home'."),
        q("What do they play?", "במה הם משחקים?", ["Cards", "Football", "Basketball", "Music"], ["קלפים", "כדורגל", "כדורסל", "מוזיקה"], 0, "נאמר 'play cards'."),
      ],
    ),
    L(
      "Come and buy our lemon juice! It is cold and sweet. One cup is two dollars. All the money is for the animals at the zoo. Thank you!",
      "בואו וקנו את מיץ הלימון שלנו! הוא קר ומתוק. כוס אחת עולה שני דולרים. כל הכסף הולך לחיות בגן החיות. תודה!",
      [
        q("How much is one cup?", "כמה עולה כוס אחת?", ["Two dollars", "One dollar", "Five dollars", "Ten dollars"], ["שני דולרים", "דולר אחד", "חמישה דולרים", "עשרה דולרים"], 0, "נאמר 'One cup is two dollars'."),
        q("What is the money for?", "בשביל מה הכסף?", ["The animals at the zoo", "A new bike", "A school trip", "A party"], ["החיות בגן החיות", "אופניים חדשים", "טיול בית ספר", "מסיבה"], 0, "נאמר 'for the animals at the zoo'."),
      ],
    ),
    L(
      "Hello? Is this Dina? I am sorry. It is the wrong number. Do you know a girl called Dina? No? Thank you. Goodbye!",
      "הלו? זאת דינה? סליחה. זה מספר שגוי. את מכירה ילדה בשם דינה? לא? תודה. להתראות!",
      [
        q("Who does the speaker want to talk to?", "עם מי הדובר רוצה לדבר?", ["Dina", "Grandma", "The teacher", "A doctor"], ["עם דינה", "עם סבתא", "עם המורה", "עם רופא"], 0, "נאמר 'Is this Dina?'."),
        q("What is the problem?", "מה הבעיה?", ["It is the wrong number", "The phone is broken", "It is too late", "Mom is not home"], ["זה מספר שגוי", "הטלפון שבור", "מאוחר מדי", "אמא לא בבית"], 0, "נאמר 'It is the wrong number'."),
      ],
    ),
    L(
      "This weekend we have a lot of plans. On Saturday we go to the beach. On Sunday we visit my grandmother. I am very excited!",
      "בסוף השבוע הזה יש לנו הרבה תוכניות. בשבת אנחנו הולכים לים. ביום ראשון אנחנו מבקרים את סבתא שלי. אני מתרגש מאוד!",
      [
        q("What do they do on Saturday?", "מה הם עושים בשבת?", ["They go to the beach", "They visit Grandma", "They go to school", "They stay home"], ["הם הולכים לים", "הם מבקרים את סבתא", "הם הולכים לבית הספר", "הם נשארים בבית"], 0, "נאמר 'On Saturday we go to the beach'."),
        q("What do they do on Sunday?", "מה הם עושים ביום ראשון?", ["They visit Grandma", "They go to the zoo", "They play football", "They work"], ["הם מבקרים את סבתא", "הם הולכים לגן החיות", "הם משחקים כדורגל", "הם עובדים"], 0, "נאמר 'On Sunday we visit my grandmother'."),
      ],
    ),
    L(
      "Today is my father's birthday. My sister and I have a gift for him. It is a blue shirt. We put it in a box with a red ribbon. He will be so surprised!",
      "היום יום ההולדת של אבא שלי. לאחותי ולי יש מתנה בשבילו. זו חולצה כחולה. אנחנו שמים אותה בקופסה עם סרט אדום. הוא יהיה מופתע מאוד!",
      [
        q("What is the gift?", "מהי המתנה?", ["A blue shirt", "A red hat", "A new phone", "A book"], ["חולצה כחולה", "כובע אדום", "טלפון חדש", "ספר"], 0, "נאמר 'It is a blue shirt'."),
        q("What color is the ribbon?", "באיזה צבע הסרט?", ["Red", "Blue", "Green", "Yellow"], ["אדום", "כחול", "ירוק", "צהוב"], 0, "נאמר 'a red ribbon'."),
      ],
    ),
    L(
      "Welcome on board. Please sit down and put on your seat belt. The trip is two hours. Drinks come soon. Please do not stand up now.",
      "ברוכים הבאים על המטוס. בבקשה שבו וחגרו חגורת בטיחות. הטיסה היא שעתיים. משקאות יגיעו בקרוב. בבקשה אל תעמדו עכשיו.",
      [
        q("How long is the trip?", "כמה זמן הטיסה?", ["Two hours", "One hour", "Ten hours", "Ten minutes"], ["שעתיים", "שעה", "עשר שעות", "עשר דקות"], 0, "נאמר 'The trip is two hours'."),
        q("What must the people put on?", "מה האנשים צריכים לחגור?", ["Their seat belt", "Their coat", "Their hat", "Their shoes"], ["את חגורת הבטיחות", "את המעיל", "את הכובע", "את הנעליים"], 0, "נאמר 'put on your seat belt'."),
      ],
    ),
  ],
};
