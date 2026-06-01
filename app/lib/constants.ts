import { AccordionItem, Model, ProductionPhase } from "../../types";

/**
 * Default data for HeaderBlock
 */
export const DEFAULT_HEADER_DATA = {
  tagline: "Modulhus som vokser med deg",
  subtagline: "Bærekraftig og fleksibelt",
} as const;

/**
 * Default data for HeroBlock
 */
export const DEFAULT_HERO_DATA = {
  videoFileName: "background-video.mp4",
  videoFallback: "/videos/background-video.mp4",
} as const;

/**
 * Default data for IntroductionBlock
 */
export const DEFAULT_INTRODUCTION_TEXT =
  "Reika modulhus er designet for moderne liv i endring. Bo smart og fleksibelt i bærekraftige modulhus i massivtre.";

/**
 * Default data for ValuesBlock
 */
export const DEFAULT_VALUES_PARAGRAPHS = [
  "Vårt dedikerte team av arkitekter, ingeniører og håndverkere jobber sammen for å levere skreddersydde løsninger av høyeste kvalitet som møter våre kunders unike behov og ønsker.",
  "Med vår lidenskap for innovasjon og vårt sterke fokus på kvalitet og bærekraft, er vi stolte av å kunne tilby moderne og miljøvennlige boliger som skaper verdi og trivsel for våre kunder og samfunnet som helhet.",
] as const;

/**
 * Default data for ModelsBlock
 */
export const DEFAULT_MODELS: Model[] = [
  {
    id: 1,
    name: "Reika Mini",
    description:
      "Reika Mini er vår minste modell og passer deg som ønsker et kompakt og effektivt hjem.",
    size: "30 kvm",
    capacity: "2 pers",
    rooms: "1",
    floors: "1",
    images: ["images/reika-1.jpg"],
  },
  {
    id: 2,
    name: "Reika Vega",
    description:
      "Reika Vega er vår minste modell og passer deg som ønsker et kompakt og effektivt hjem.",
    size: "45 kvm",
    capacity: "2-3 pers",
    rooms: "2",
    floors: "1",
    images: ["images/reika-2.jpg"],
  },
  {
    id: 3,
    name: "Reika Nord",
    description:
      "Reika Vega er vår minste modell og passer deg som ønsker et kompakt og effektivt hjem.",
    size: "45 kvm",
    capacity: "2-3 pers",
    rooms: "2",
    floors: "2",
    images: ["images/reika-3.jpg"],
  },
  {
    id: 4,
    name: "Reika Sand",
    description:
      "Reika Vega er vår minste modell og passer deg som ønsker et kompakt og effektivt hjem.",
    size: "45 kvm",
    capacity: "2-3 pers",
    rooms: "2",
    floors: "2",
    images: ["images/reika-4.jpg"],
  },
];

/**
 * Default data for ProductionBlock
 */
export const DEFAULT_PRODUCTION_PHASES: ProductionPhase[] = [
  {
    title: "Materialvalg",
    description:
      "Vi velger ut bærekraftig massivtre fra sertifiserte leverandører. Kvaliteten på materialet er grunnlaget for et langt levetid.",
    duration: "1-2 dager",
    features: [
      "Sertifisert bærekraftig tre",
      "Kvalitetskontroll av råmaterialer",
      "Optimal fuktighetsnivå",
      "Sporbarhet fra skog til fabrikk",
    ],
  },
  {
    title: "Prefabrikasjon",
    description:
      "Presise CNC-maskiner kutter og forbereder alle komponenter. Hver del produseres med millimeters nøyaktighet for perfekt passform.",
    duration: "3-5 dager",
    features: [
      "CNC-styrt presisjonskutting",
      "Automatisert kvalitetskontroll",
      "Optimalisert materialbruk",
      "Digitale produksjonstegninger",
    ],
  },
  {
    title: "Montering",
    description:
      "Erfarne håndverkere monterer modulene i kontrollerte omgivelser. Dette sikrer høy kvalitet uavhengig av værforhold.",
    duration: "1-2 uker",
    features: [
      "Innendørs produksjon",
      "Erfarne fagfolk",
      "Kvalitetssikring ved hver etappe",
      "Integrerte installasjoner",
    ],
  },
  {
    title: "Kvalitetskontroll",
    description:
      "Grundig inspeksjon og testing av alle systemer. Vi sikrer at alt fungerer perfekt før levering til byggeplass.",
    duration: "2-3 dager",
    features: [
      "Strukturell integritet",
      "Elektriske og VVS-systemer",
      "Isolasjon og tetthet",
      "Overflatebehandling",
    ],
  },
  {
    title: "Ferdigstilling",
    description:
      "Siste finish og beskyttelse påføres. Modulene forberedes for transport med værbestandig emballasje.",
    duration: "1-2 dager",
    features: [
      "Overflatebehandling",
      "Værbestandig beskyttelse",
      "Transportemballasje",
      "Dokumentasjon og manualer",
    ],
  },
  {
    title: "Levering",
    description:
      "Modulene transporteres trygt til byggeplass og monteres av vårt team. Fra fabrikk til ferdig hjem på kort tid.",
    duration: "1-2 dager",
    features: [
      "Profesjonell transport",
      "Kranbil og montasje",
      "Tilkobling av systemer",
      "Innflytningsklar",
    ],
  },
];

export const DEFAULT_PRODUCTION_HEADING = "Vår produksjonsprosess";
export const DEFAULT_PRODUCTION_SUBHEADING =
  "Fra bærekraftige råmaterialer til ferdig modulhus – hver fase er nøye planlagt for å sikre kvalitet og presisjon.";

/**
 * Default data for AccordionBlock
 */
export const DEFAULT_ACCORDION_ITEMS: AccordionItem[] = [
  {
    id: 1,
    title: "Kort produksjonstid",
    content:
      "Våre modulhus produseres i kontrollerte omgivelser, noe som reduserer produksjonstiden betydelig sammenlignet med tradisjonell bygging. Dette sikrer også høyere kvalitet og bedre overholdelse av bærekraftige standarder.",
  },
  {
    id: 2,
    title: "Kort monteringstid",
    content:
      "Takket være vår modulære tilnærming kan monteringen av ditt nye hjem fullføres på bare noen få dager. Dette minimerer forstyrrelser og lar deg raskt flytte inn i ditt nye hjem.",
  },
  {
    id: 3,
    title: "Fleksible løsninger",
    content:
      "Våre modulhus kan tilpasses dine spesifikke behov og ønsker. Enten du trenger mer plass senere eller ønsker å tilpasse layouten, gir våre fleksible løsninger deg muligheten til å vokse med hjemmet ditt.",
  },
  {
    id: 4,
    title: "Rene materialer",
    content:
      "Vi bruker kun rene, naturlige materialer av høyeste kvalitet. Våre modulhus er bygget i massivtre, som ikke bare er miljøvennlig, men også skaper et sunt og behagelig innemiljø.",
  },
  {
    id: 5,
    title: "Bærekraftig bygg",
    content:
      "Bærekraft står i sentrum for alt vi gjør. Fra valg av materialer til produksjonsprosesser, sikrer vi at våre modulhus har minimal miljøpåvirkning og bidrar til en mer bærekraftig fremtid.",
  },
  {
    id: 6,
    title: "Minimalt fotavtrykk",
    content:
      "Våre modulhus er designet for å ha minimalt miljøfotavtrykk. Gjennom effektiv bruk av ressurser, gjenbrukbare komponenter og energieffektiv produksjon, bidrar vi til å bevare miljøet for fremtidige generasjoner.",
  },
];

export const DEFAULT_ACCORDION_TITLE = "Hvorfor Reika?";

/**
 * Default data for ContactBlock
 */
export const DEFAULT_CONTACT_BLOCK_DATA = {
  badge: "KOM I GANG",
  heading: "Ønsker du et REIKA hjem?",
  description:
    "Vi ser frem i mot å høre fra deg. Fyll ut skjemaet, og kom i gang.",
  submitLabel: "Send",
} as const;

/**
 * Default data for FooterBlock
 */
export const DEFAULT_FOOTER_DATA = {
  contactText: "Vi hjelper deg gjerne med ditt neste prosjekt",
  contactEmail: "Send oss en e-post",
  contactEmailUrl: "mailto:info@reika.no",
  findUsText: "Finn oss",
  address: "Skagavegen 138, 8724 Saura",
  addressUrl: "https://maps.google.com",
  followUsText: "Følg oss",
  socialLinks: [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "instagram", url: "https://instagram.com" },
  ],
} as const;
