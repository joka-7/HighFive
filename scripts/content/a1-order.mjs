// The order in which the A1 word cards are taught: themes a new learner needs
// first (greetings, family, numbers, time, home, food) before the broader ones.
// Five words a day, so a week of five learning days walks 25 words; the
// generator cuts this list into days in this order and fails if a word is
// missing, repeated or unknown (see applyCurriculumOrder in generate-content).

export const A1_ORDER = [
  {
    theme: "Greetings & politeness",
    themeHe: "ברכות ונימוס",
    words: ["hello","good morning","good afternoon","good night","goodbye","bye","please","thank","thanks","sorry","excuse me","pardon","welcome","sir","Mr","Mrs","Miss","Dr","ok","nice","dear"],
  },
  {
    theme: "Me & my family",
    themeHe: "אני והמשפחה שלי",
    words: ["friend","family","name","child","woman","man","mother","father","brother","sister","boy","girl","baby","grandmother","grandfather","uncle","aunt","son","daughter","wife","husband","cousin","grandpa","age","boyfriend","dad","girlfriend","grandma","grandparent","guy","kid","lady","mom","parent"],
  },
  {
    theme: "Numbers & counting",
    themeHe: "מספרים וספירה",
    words: ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety","hundred","number","minute","hour","half","line","once","pair","period","piece","quarter","row","second"],
  },
  {
    theme: "Days, months & time",
    themeHe: "ימים, חודשים וזמן",
    words: ["morning","day","time","night","week","today","tomorrow","yesterday","year","now","again","month","evening","afternoon","sunday","saturday","friday","monday","April","August","date","December","February","January","July","June","March","May","November","October","September","Thursday","tonight","Tuesday","Wednesday","a.m.","p.m.","o'clock"],
  },
  {
    theme: "The home",
    themeHe: "הבית",
    words: ["house","room","door","window","chair","table","bed","garden","kitchen","key","clock","floor","wall","box","home","roof","yard","stairs","mirror","lamp","desk","sofa","fridge","bathroom","bedroom","couch","dining room","living room","shelf","toilet","vase"],
  },
  {
    theme: "Things in the house",
    themeHe: "חפצים בבית",
    words: ["phone","letter","picture","spoon","fork","cup","plate","bowl","radio","towel","soap","blanket","basket","bottle","glass","watch","camera","computer","television","map","knife","paper","wheel","bell","bucket","button","garbage","machine","mobile phone","poster","telephone","tool","cd","dvd","cd player","mobile"],
  },
  {
    theme: "Food I eat",
    themeHe: "אוכל",
    words: ["food","milk","bread","egg","fish","rice","chicken","meat","sugar","salt","cheese","butter","soup","cake","salad","fruit","vegetable","chocolate","ice","pizza","sandwich","candy","honey","eggs","corn","snack","breakfast","lunch","dinner","bean","beef","biscuit","cookie","hamburger","ice cream","meal","yogurt","burger","turkey","coke"],
  },
  {
    theme: "Fruit & vegetables",
    themeHe: "פירות וירקות",
    words: ["apple","banana","tomato","potato","lemon","grape","carrot","onion","orange","apples"],
  },
  {
    theme: "Drinks & the table",
    themeHe: "שתייה ושולחן",
    words: ["water","eat","drink","tea","juice","cook","sweet","delicious","hungry","thirsty","coffee"],
  },
  {
    theme: "Body",
    themeHe: "הגוף",
    words: ["hand","eye","head","leg","arm","face","hair","mouth","nose","ear","finger","foot","knee","back","neck","stomach","tooth","lip","shoulder","heart","body","bone","brain"],
  },
  {
    theme: "Clothes",
    themeHe: "בגדים",
    words: ["shoe","shirt","hat","dress","coat","sock","trousers","jacket","skirt","glove","scarf","sweater","belt","shorts","shoes","lace","clothes","apron","cap","cloth","jeans","jewelry","pants","pocket","ribbon","T-shirt","glasses"],
  },
  {
    theme: "Colours & shapes",
    themeHe: "צבעים וצורות",
    words: ["red","blue","green","white","black","color","yellow","brown","pink","purple","gray","circle","gold"],
  },
  {
    theme: "Animals",
    themeHe: "חיות",
    words: ["dog","cat","bird","animal","horse","cow","lion","monkey","bear","rabbit","duck","sheep","pig","mouse","elephant","tiger","snake","frog","bee","butterfly","ghost","pet"],
  },
  {
    theme: "Nature & weather",
    themeHe: "טבע ומזג אוויר",
    words: ["hot","cold","tree","sun","moon","rain","flower","sky","star","cloud","wind","snow","boat","lake","hill","grass","sea","fire","stone","warm","river","ship","dark","wet","dry","wood","storm","bright","cloudy","cool","field","foggy","ground","leaf","rainy","snowy","sunny","sunshine"],
  },
  {
    theme: "Seasons",
    themeHe: "עונות השנה",
    words: ["summer","spring","autumn","raining","outside","winter","snowman"],
  },
  {
    theme: "School & learning",
    themeHe: "בית ספר ולמידה",
    words: ["school","book","teacher","student","pen","pencil","music","word","homework","article","board","class","classmate","classroom","college","dictionary","drama","example","grammar","history","language","lesson","math","notebook","page","paragraph","practice","question","ruler","science","sentence","study","subject","test","topic","underline","grade","elementary","blank","code","survey","section","reading"],
  },
  {
    theme: "Everyday verbs 1",
    themeHe: "פעלים יומיומיים 1",
    words: ["go","see","walk","open","read","write","sit","stand","wash","run","sleep","come","wake up","brush","hear","say","speak","talk"],
  },
  {
    theme: "Everyday verbs 2",
    themeHe: "פעלים יומיומיים 2",
    words: ["love","know","like","sing","smile","cry","play","buy","give","take","make","put","find","call","carry","draw","feed","swim","blow out","hug","share","laugh","throw","drop","begin","bring","build","choose","cover","feel","guess","happen","keep","leave","let","mean","meet","pray","solve","spend","stay","stop","teach","think","turn","use","visit","want","wear","wish","pick up","fly","vote","set","do"],
  },
  {
    theme: "Places in town",
    themeHe: "מקומות בעיר",
    words: ["city","street","shop","park","zoo","farm","town","village","road","station","airport","hotel","restaurant","cafe","hospital","library","museum","cinema","market","office","bookstore","building","church","palace","store","subway","supermarket","temple","theater","tower","café","site"],
  },
  {
    theme: "Transport & travel",
    themeHe: "תחבורה ונסיעות",
    words: ["car","bus","train","beach","bike","ticket","holiday","trip","taxi","island","airplane","bicycle","camp","driver","picnic","plane","truck","vacation","jet"],
  },
  {
    theme: "Jobs",
    themeHe: "מקצועות",
    words: ["doctor","farmer","job","nurse","actor","business","engineer","leader","musician","officer","reporter","sailor","scientist","singer","waiter","waitress","worker","writer","interviewer","judge"],
  },
  {
    theme: "Feelings & states",
    themeHe: "רגשות ומצבים",
    words: ["happy","sad","tired","full","funny","hurt","quiet","healthy","strong","sick","well","afraid","angry","excited","bored","surprised","worried","beautiful","cute","fine","glad","handsome","lazy","lonely","lovely","ugly","smart"],
  },
  {
    theme: "Describing things",
    themeHe: "תיאור דברים",
    words: ["big","small","good","new","old","slow","tall","young","heavy","great","little","best","cheap","free","easy","thin","bad","better","broken","difficult","excellent","fast","fat","flat","hard","high","important","interesting","large","long","same","short","straight","strange","thick","tight","closed","ideal","super","merry"],
  },
  {
    theme: "Sports & fun",
    themeHe: "ספורט ופנאי",
    words: ["ball","game","song","toy","doll","football","film","sport","team","match","win","lose","guitar","band","baseball","basketball","cartoon","celebration","drum","festival","fun","kite","movie","party","piano","player","soccer","tennis","video","volleyball","surf","fishing","dancing","painting","swimming","bat","pop","opera","Olympics","fight"],
  },
  {
    theme: "Holidays & special days",
    themeHe: "חגים ואירועים",
    words: ["gift","birthday","flag","present"],
  },
  {
    theme: "Little words & adverbs",
    themeHe: "מילים קטנות ותואר פועל",
    words: ["here","there","very","also","maybe","near","often","always","sometimes","never","above","almost","along","already","away","before","behind","below","bottom","down","front","later","middle","only","quickly","really","side","soon","still","then","too","top","usually","else","each other","have to","ours","hers","yourself","due","following","of course"],
  },
  {
    theme: "Phrases",
    themeHe: "ביטויים",
    words: ["all right","end","interested","a bit","at all","at least","by the wall","cross the street","find out","go on a trip","in fact","in front of","in the end","interested in","lie down","on my own","right","the same","wait for"],
  },
  {
    theme: "People & communication",
    themeHe: "אנשים ותקשורת",
    words: ["last","story","newspaper","magazine","club","conversation","email","foreigner","group","guest","idea","information","internet","interview","last name","mail","meeting","message","nationality","note","owner","partner","people","person","poem","reader","speech","suggestion","card","post","news"],
  },
  {
    theme: "Time & order",
    themeHe: "זמן וסדר",
    words: ["first","next","birth","everyday","future","late","moment","past"],
  },
  {
    theme: "Money & shopping",
    themeHe: "כסף וקניות",
    words: ["money","price","credit card","dollar","sale","shopping"],
  },
  {
    theme: "Around the house extras",
    themeHe: "עוד בבית ובסביבה",
    words: ["bag","teddy bear","photo","umbrella","seat","world","album","bath","dish","hall","hole","pool","shower","swimming pool"],
  },
  {
    theme: "More useful words",
    themeHe: "עוד מילים שימושיות",
    words: ["work","together","favourite","about","action","activity","address","awake","block","both","care","carefully","character","collection","design","everywhere","fairy","false","fan","feeling","file","form","get","habit","haircut","hometown","item","king","left","life","list","live","luck","memory","noise","peace","pleasure","point","pretty","prince","princess","program","review","role","rose","rule","show","sign","size","stage","step","sum","surprise","thing","TV","type","way","wrong","matter","bar","sight","spot","tube","smell","copy","personal"],
  },
];
