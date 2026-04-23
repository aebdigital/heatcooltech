export type GalleryImage = {
  src: string;
  alt: string;
};

export type ContentPage = {
  slug: string;
  title: string;
  browserTitle?: string;
  description: string;
  paragraphs: string[];
  listItems?: string[];
  gallery?: GalleryImage[];
  partnerHeading?: string;
  dotacieImage?: GalleryImage;
};

const upload = (file: string) => `/wp-content/uploads/2025/04/${file}`;

export const site = {
  name: "Heatcooltech s.r.o.",
  brandName: "Heatcooltech klimatizácie, tepelné čerpadlá, vykurovanie",
  source: "https://www.heatcooltech2.sk",
  logo: upload("LOGO.png"),
  socialImage: upload("1-1024x768.jpg"),
  phone: "+421 910 945 137",
  phoneHref: "tel:+421910945137",
  email: "info@heatcooltech.sk",
  secondaryEmail: "juraj.jombik@gmail.com",
  facebook: "https://www.facebook.com/www.heatcooltech.sk",
  addressLines: ["Banícka 404/8A", "974 05 Malachov"],
  streetAddress: "Banícka 404/8A",
  postalCode: "974 05",
  addressLocality: "Malachov",
  addressCountry: "SK",
  hoursLabel: "Otvorené pondelok - piatok",
  hours: "9:00 - 18:00",
  hoursFull: "Pondelok-Piatok 9.00 - 18.00",
  manager: "Juraj Jombík",
  googleVerification: "8vXONFsWoYiftQUzjWPSGsstlkgOcnUBhDHCSnG0Wuc",
  youtubeEmbed: "https://www.youtube.com/embed/5qXJ5b78Ngw?rel=0&enablejsapi=1",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Heatcooltech%20s.r.o.&t=m&z=15&output=embed",
  copyrightYear: "2026",
  footerCreditName: "AEB Digital",
  footerCreditUrl: "https://www.aebdigital.sk/",
  description:
    "Heatcooltech s.r.o. – špecialisti na podlahové kúrenie, tepelné čerpadlá a klimatizácie. Kvalitná montáž, odborné poradenstvo a individuálny prístup.",
};

export const navItems = [
  { label: "Domov", href: "/" },
  {
    label: "Služby",
    href: "#",
    children: [
      { label: "Tepelné čerpadlá", href: "/tepelne-cerpadla/" },
      { label: "Klimatizácie", href: "/klimatizacie/" },
      { label: "Podlahové vykurovanie", href: "/podlahove-vykurovanie/" },
      { label: "Vodoinštalačné a kurenárske práce", href: "/kurenarske-prace-a-vymena-radiatorov/" },
    ],
  },
  { label: "Realizácie", href: "/realizacie/" },
  { label: "Partneri", href: "/partneri/" },
  { label: "Dotácie", href: "/dotacie/" },
  { label: "Kontakt", href: "/kontakt/" },
];



export const heroSlides = [
  upload("2-768x1024.jpg"),
  upload("1-1024x768.jpg"),
  upload("3-768x1024.jpg"),
];

export const heroHeadline = {
  firstLine: "Tepelné čerpadlá, podlahové",
  secondLine: "vykurovanie a klimatizácie na ktoré",
  highlight: "sa dá spolahnúť",
};

export const homeFeatureItems = [
  "Moderné vybavenie",
  "Najvyššia kvalita práce",
  "Tisícky spokojných zákaznikov",
];

export const certificates: GalleryImage[] = [
  { src: upload("2.jpg"), alt: "Osvedčenie o získaní profesnej kvalifikácie" },
  { src: upload("1.jpg"), alt: "Osvedčenie pre inštalatérov tepelných čerpadiel" },
  { src: upload("3.jpg"), alt: "Certifikovaný servisný technik IVT" },
];

export const aboutParagraphs = [
  "Spoločnosť Heatcooltech s.r.o. vznikla na základe dlhoročných skúseností v oblasti vykurovacích a chladiarenských systémov. Hlavná činnosť spočíva v pokládke podlahového vykurovania v spojení s montážou tepelných čerpadiel.",
  "Najčastejšie pracujeme s produktami firmy IVT, ale montujeme aj rôzne produkty iných dodávateľov, a to na základe individuálnych požiadaviek zákazníkov. Ďalej ponúkame odborné poradenstvo v danej oblasti, individuálny prístup k zákazníkom a zaručujeme kvalitu vykonanej práce.",
  "Samostatný systém podlahového vykurovania v spojení s tepelnými čerpadlami je čím ďalej, tým viac obľúbenejším riešením. Pre podlahové vykurovanie postačuje teplota vody od 25 do 40 °C. Tepelné čerpadlo pracuje tiež v nízko-teplotnom režime, čím sa priamo zvýši celkový koeficient účinnosti a zlepší sa ekonomika prevádzky. Ide o moderný spôsob vykurovania v porovnaní s klasickým, pri ktorom môžeme ušetriť až tretinu nákladov.",
  "Jednou z hlavných služieb, ktoré Heatcooltech poskytuje, je montáž tepelných čerpadiel. Tepelné čerpadlá sú ekologickými alternatívami k tradičným vykurovacím systémom, pretože využívajú energiu zo zdrojov ako je vzduch, voda alebo zem. Tieto systémy nielenže znižujú spotrebu energie, ale aj pomáhajú znižovať emisie skleníkových plynov, čím prispievajú k ochrane životného prostredia.",
  "Heatcooltech ponúka široký výber tepelných čerpadiel a svojim zákazníkom poskytuje odborné poradenstvo pri výbere najvhodnejšieho systému pre ich potreby. Okrem tepelných čerpadiel sa špecializuje aj na montáž podlahového kúrenia a klimatizácií, ktoré zabezpečujú komfort a efektívnu prevádzku počas celého roka.",
];

export const serviceCards = [
  {
    title: "Tepelné čerpadlá",
    href: "/tepelne-cerpadla/",
    image: upload("20-769x1024.jpg"),
  },
  {
    title: "Podlahové vykurovanie",
    href: "/podlahove-vykurovanie/",
    image: upload("104-1024x768.jpg"),
  },
  {
    title: "Klimatizácie",
    href: "/klimatizacie/",
    image: upload("200-1024x769.jpg"),
  },
  {
    title: "Kurenárske práce - výmena radiatorov",
    href: "/kurenarske-prace-a-vymena-radiatorov/",
    image: upload("302.jpg"),
  },
];

const heatPumpGallery = [
  "1-1-654x1024.jpg",
  "2-1.jpg",
  "3-1-1024x768.jpg",
  "4-1024x768.jpg",
  "5.jpg",
  "6-1024x613.jpg",
  "7-768x1024.jpg",
  "8-1024x968.jpg",
  "9.jpg",
  "10-768x1024.jpg",
  "11-1024x679.jpg",
  "12-1024x768.jpg",
  "13-868x1024.jpg",
  "14-768x1024.jpg",
  "15-768x1024.jpg",
  "16-1024x768.jpg",
  "17-1024x769.jpg",
  "18-1024x768.jpg",
  "19-769x1024.jpg",
  "20-769x1024.jpg",
  "21-768x1024.jpg",
  "23-1024x982.jpg",
  "24-513x1024.jpg",
].map((file, index) => ({ src: upload(file), alt: `Tepelné čerpadlá galéria ${index + 1}` }));

const floorHeatingGallery = [
  "100-1024x768.jpg",
  "101-1024x768.jpg",
  "102-1024x768.jpg",
  "103-1024x768.jpg",
  "104-1024x768.jpg",
  "105-1024x768.jpg",
  "106-768x1024.jpg",
  "107-768x1024.jpg",
  "108-1024x768.jpg",
].map((file, index) => ({ src: upload(file), alt: `Podlahové vykurovanie galéria ${index + 1}` }));

const airConditioningGallery = ["200-1024x769.jpg", "201.jpg", "202-1024x769.jpg", "203.jpg"].map((file, index) => ({
  src: upload(file),
  alt: `Klimatizácie galéria ${index + 1}`,
}));

const radiatorGallery = ["300.jpg", "301.jpg", "302.jpg"].map((file, index) => ({
  src: upload(file),
  alt: `Kurenárske práce galéria ${index + 1}`,
}));

export const pages: ContentPage[] = [
  {
    slug: "tepelne-cerpadla",
    title: "Tepelné čerpadlá",
    description:
      "Montáž tepelných čerpadiel vzduch-voda aj zem-voda s odborným poradenstvom, galériou realizácií a dôrazom na efektívnu prevádzku.",
    paragraphs: [
      "Princíp fungovania tepelného čerpadla je v tom, že odoberá teplo z okolia vykurovaného objektu (vzduchu, zeme alebo vody) a prevádza ho na vyššiu teplotnú hladinu použiteľnú pre vykurovanie a ohrev teplej vody. Prevod tepla na vyššiu teplotnú hladinu je možný vďaka stlačeniu pár chladiva v kompresore. Pri tomto dôjde k jeho zahriatiu. Je to rovnaký princíp, ako keď pumpičkou fúkate koleso. Vzduch aj pumpička sa pri stláčaní vzduchu výrazne zahrejú.",
      "Tepelné čerpadlo dokáže tohto princípu skvelo využiť a získať tak zdarma teplo z okolia. Ako ale získať teplo z miesta, kde je zima? Ešte viac to miesto ochladiť a tým mu teplo odobrať. Vďaka tomuto princípu môže tepelné čerpadlo získať teplo aj zo vzduchu, ktorý má teplotu -20 °C. Získavanie tepla z takto nízkych teplôt je o niečo menej efektívne, ale stále ešte výhodné.",
      "Tepelné čerpadlá vzduch – voda sú vyhľadávané vďaka ich jednoduchej inštalácii a vhodnosti do každej lokality. Na získavanie tepelnej energie nepotrebujete žiadne vrty a ani zemné kolektory. Zdrojom energie je vonkajší vzduch, z ktorého dokáže tepelné čerpadlo využívať energiu.",
      "Tepelné čerpadlá zem – voda sú tiež veľmi obľúbené najmä v zahraničí. U nás, aj napriek svojím pozitívam, sú stále v úzadí. Dôvod je jednoduchý – vyššia cena investície. Ide však o najefektívnejšie tepelné čerpadlo z hľadiska účinnosti. Aj napriek veľkej mrznúcej zime, pôda má už 10 metrov pod povrchom cca 10 – 12 °C.",
    ],
    gallery: heatPumpGallery,
  },
  {
    slug: "klimatizacie",
    title: "Klimatizácie",
    description:
      "Montáž klimatizácií do bytov a domov, čisté a zdravé vnútorné prostredie a ukážky realizácií Heatcooltech.",
    paragraphs: [
      "Ďalšou dôležitou službou, ktorú Heatcooltech poskytuje, je montáž klimatizácií. Klimatizácie sú neodmysliteľnou súčasťou moderného bývania a pracovného prostredia, najmä v horúcich letných mesiacoch. Firma Heatcooltech ponúka široký výber klimatizačných jednotiek, ktoré zabezpečujú nielen príjemné teploty v interiéri, ale aj čisté a zdravé ovzdušie.",
    ],
    gallery: airConditioningGallery,
  },
  {
    slug: "podlahove-vykurovanie",
    title: "Podlahové vykurovanie",
    description:
      "Podlahové vykurovanie s modernou reguláciou, nižšou spotrebou energie a galériou ukážok z realizácií Heatcooltech.",
    paragraphs: [
      "V minulosti prevládal mýtus, že podlahové vykurovanie vysušuje kĺby a nepriaznivo pôsobí na kŕčové žily. V tej dobe však podlahové vykurovanie nebolo regulované a teplota povrchu podlahy presahovala spomenutú prípustnú teplotu.",
      "Systémy moderného plošného vykurovania nie sú zdraviu škodlivé pri správnej manipulácii a nastavení. Dôležitou podmienkou pri tomto type vykurovania je práve fakt, že musíte dodržať maximálne teploty ohrievaných povrchov na zdraviu neškodnej úrovni – tzn. pri podlahovom vykurovaní 25 až 30 °C.",
      "V porovnaní s klasickým vykurovaním je výška investičných nákladov o cca 20-30 % vyššia. Avšak po zohľadnení princípu vykurovania, kde z dôvodu vysokého podielu energetického sálania rúrkového podlahového vykurovania sa pocit komfortu dostaví pri výrazne nižšej teplote, ktorú môžete znížiť o 1 až 2 °C. Vaša ročná spotreba energie sa tak zníži až do 20 %, pri veľkých vykurovaných plochách to je až 25 %. Vo všeobecnosti je návratnosť investície do podlahového vykurovania rádovo do 5 rokov.",
    ],
    gallery: floorHeatingGallery,
  },
  {
    slug: "kurenarske-prace-a-vymena-radiatorov",
    title: "Vodoinštalačné a kurenárske práce",
    browserTitle: "Kurenárske práce a výmena radiátorov",
    description:
      "Vodoinštalačné a kurenárske práce vrátane výmeny radiátorov bez vypúšťania vykurovacieho systému pomocou zmrazovača Rems.",
    paragraphs: [
      "Potrebujete vymeniť radiátor a nechcete vypustiť celý vykurovací systém aby bola možná výmena nového radiátora?",
      "Pomocou zmrazovača Rems prevádzame demontáž bytových radiátorov bez vypúšťania vykurovacieho systému.",
      "Výhody zmrazovania vykurovacieho systému:",
    ],
    listItems: ["systém sa nezavzdušní", "rýchla montáž", "výhodné pre výmenu radiátorov v paneláku"],
    gallery: radiatorGallery,
  },
  {
    slug: "partneri",
    title: "Partneri",
    description: "Heatcooltech úzko spolupracuje s partnerom IVT pri dodávkach a montáži tepelných čerpadiel.",
    partnerHeading: "Úzko spolupracujeme s IVT",
    paragraphs: [],
  },
  {
    slug: "dotacie",
    title: "Dotácie",
    description:
      "Pomoc s vybavením dotácie Zelená domácnostiam na tepelné čerpadlá a obnoviteľné zdroje energie od spoločnosti Heatcooltech.",
    dotacieImage: { src: upload("heatcool-dotacie.gif"), alt: "Zelená domácnostiam" },
    paragraphs: [
      "Nie sú Vám ľahostajné účty za energie? Chcete využívať obnoviteľné zdroje energie alebo uvažujete o kúpe tepelného čerpadla? Aké opatrenia podniknúť a ako si vybrať najvhodnejšie čo najefektívnejšie zariadenie?",
      "Získajte s nami finančný príspevok na obnoviteľné zdroje energií až do výšky 4 370 € v rámci dotačného programu „Zelená domácnostiam“ a ušetrite si energiu, čas a aj peniaze. Spoločnosť Heatcooltech s.r.o. Vám pomôže pohodlne získať túto dotáciu.",
      "Tepelné čerpadlá využívajú dostupné teplo zo vzduchu, zeme alebo z vody. Tešia sa stále väčšiemu záujmu. Aj preto, že toto teplo je k dispozícii zadarmo a možno ho energeticky veľmi efektívne zhodnotiť.",
      "Tepelné čerpadlá vzduch – voda sú vyhľadávané vďaka ich jednoduchej inštalácii a vhodnosti do každej lokality. Na získavanie tepelnej energie nepotrebujete žiadne vrty a ani zemné kolektory. Zdrojom energie je vonkajší vzduch, z ktorého dokáže tepelné čerpadlo využívať energiu.",
      "Tepelné čerpadlá zem – voda sú tiež veľmi obľúbené najmä v zahraničí. U nás, aj napriek svojím pozitívam, sú stále v úzadí. Dôvod je jednoduchý – vyššia cena investície. Ide však o najefektívnejšie tepelné čerpadlo z hľadiska účinnosti. Aj napriek veľkej mrznúcej zime, pôda má už 10 metrov pod povrchom cca 10 – 12 °C.",
      "Firma Heatcooltech je tiež známa tým, že dokáže vybaviť dotácie za svojich zákazníkov. S touto službou zákazníci nemusia mať starosti s administratívnymi záležitosťami spojenými s vybavovaním dotácií. Heatcooltech sa postará o všetky potrebné kroky a dokumentáciu, aby zákazníci mohli využiť všetky dostupné finančné prostriedky na modernizáciu svojej tepelnej techniky.",
    ],
  },
];

export const allRealizations = [
  ...heatPumpGallery.map((img) => ({ ...img, category: "Tepelné čerpadlá" })),
  ...airConditioningGallery.map((img) => ({ ...img, category: "Klimatizácie" })),
  ...floorHeatingGallery.map((img) => ({ ...img, category: "Podlahové vykurovanie" })),
  ...radiatorGallery.map((img) => ({ ...img, category: "Kurenárske práce" })),
];

export const realizationCategories = [
  "Všetko",
  "Tepelné čerpadlá",
  "Klimatizácie",
  "Podlahové vykurovanie",
  "Kurenárske práce",
];

export const blogPost = {
  slug: "ahoj-svet",
  title: "Ahoj svet!",
  description: "Prvý testovací článok importovaný z pôvodného WordPress webu.",
  author: "admin",
  date: "5. apríla 2025",
  content: "Vitajte vo WordPress. Toto je váš prvý článok. Upravte ho alebo zmažte a začnite písať!",
  commentAuthor: "WordPress komentátor",
  comment:
    "Ahoj, toto je komentár. Pre správu, úpravu alebo mazanie komentárov si pozrite sekciu Komentáre na nástenke. Profilové obrázky komentujúcich sprostredkúva služba Gravatar.",
};

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function getPagePath(slug: string) {
  return `/${slug}/`;
}
