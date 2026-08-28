import { createClient } from "@sanity/client";

export async function seedSanity() {
  try {
    // Validate environment variables
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const token = process.env.SANITY_API_TOKEN;

    if (!projectId) {
      throw new Error(
        "NEXT_PUBLIC_SANITY_PROJECT_ID is required. Please set it in .env.local"
      );
    }

    if (!token) {
      throw new Error(
        "SANITY_API_TOKEN is required for seeding. Please set it in .env.local"
      );
    }

    // Create a write client for seeding (requires token)
    const writeClient = createClient({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: "2024-01-01",
      token,
    });

    console.log("🌱 Starting Sanity seed...");
    console.log(`📦 Project ID: ${projectId}`);
    console.log(`📊 Dataset: ${dataset}`);

    // 1. Create Settings document
    console.log("📝 Creating Settings...");
    await writeClient.createOrReplace({
      _id: "settings",
      _type: "settings",
      title: "Settings",
      siteName: "Reika",
      siteDescription: "Modulhus som vokser med deg",
      tagline: "Modulhus som vokser med deg",
      subtagline: "Bærekraftig og fleksibelt",
      contactFormEmail: "morten@anti.as",
      footer: {
        contactText: "Vi hjelper deg gjerne med ditt neste prosjekt",
        contactEmail: "Send oss en e-post",
        contactEmailUrl: "mailto:info@reika.no",
        findUsText: "Finn oss",
        address: "Skagavegen 138, 8724 Saura",
        addressUrl: "https://maps.google.com",
        followUsText: "Følg oss",
        socialLinks: [
          {
            platform: "facebook",
            url: "https://facebook.com",
          },
          {
            platform: "instagram",
            url: "https://instagram.com",
          },
        ],
      },
    });
    console.log("✅ Settings created");

    // 2. Create Models
    console.log("📝 Creating Models...");
    const models = [
      {
        _type: "model",
        name: "Reika Mini",
        slug: { _type: "slug" as const, current: "reika-mini" },
        description:
          "Reika Mini er vår minste modell og passer deg som ønsker et kompakt og effektivt hjem.",
        size: "30 kvm",
        capacity: "2 pers",
        rooms: "1",
        floors: "1",
        // Note: Images need to be uploaded manually in Sanity Studio
        // After upload, update these with the actual image references
      },
      {
        _type: "model",
        name: "Reika Vega",
        slug: { _type: "slug" as const, current: "reika-vega" },
        description:
          "Reika Vega er vår minste modell og passer deg som ønsker et kompakt og effektivt hjem.",
        size: "45 kvm",
        capacity: "2-3 pers",
        rooms: "2",
        floors: "1",
      },
      {
        _type: "model",
        name: "Reika Nord",
        slug: { _type: "slug" as const, current: "reika-nord" },
        description:
          "Reika Vega er vår minste modell og passer deg som ønsker et kompakt og effektivt hjem.",
        size: "45 kvm",
        capacity: "2-3 pers",
        rooms: "2",
        floors: "2",
      },
      {
        _type: "model",
        name: "Reika Sand",
        slug: { _type: "slug" as const, current: "reika-sand" },
        description:
          "Reika Vega er vår minste modell og passer deg som ønsker et kompakt og effektivt hjem.",
        size: "45 kvm",
        capacity: "2-3 pers",
        rooms: "2",
        floors: "2",
      },
    ];

    const createdModels = [];
    for (const model of models) {
      const created = await writeClient.create(model);
      createdModels.push(created._id);
      console.log(`✅ Created model: ${model.name}`);
    }

    // 3. Create Home Page with content blocks
    console.log("📝 Creating Home Page...");
    await writeClient.createOrReplace({
      _id: "home",
      _type: "home",
      hero: {
        // Note: Video needs to be uploaded manually in Sanity Studio
      },
      contentBlocks: [
        {
          _type: "introductionBlock",
          _key: "intro-1",
          text: "Reika modulhus er designet for moderne liv i endring. Bo smart og fleksibelt i bærekraftige modulhus i massivtre.",
        },
        {
          _type: "modelsBlock",
          _key: "models-1",
          models: createdModels.map((id) => ({
            _type: "reference",
            _ref: id,
          })),
        },
        {
          _type: "valuesBlock",
          _key: "values-1",
          paragraphs: [
            "Vårt dedikerte team av arkitekter, ingeniører og håndverkere jobber sammen for å levere skreddersydde løsninger av høyeste kvalitet som møter våre kunders unike behov og ønsker.",
            "Med vår lidenskap for innovasjon og vårt sterke fokus på kvalitet og bærekraft, er vi stolte av å kunne tilby moderne og miljøvennlige boliger som skaper verdi og trivsel for våre kunder og samfunnet som helhet.",
          ],
        },
        {
          _type: "accordionBlock",
          _key: "accordion-1",
          title: "Hvorfor Reika?",
          items: [
            {
              title: "Kort produksjonstid",
              content:
                "Våre modulhus produseres i kontrollerte omgivelser, noe som reduserer produksjonstiden betydelig sammenlignet med tradisjonell bygging. Dette sikrer også høyere kvalitet og bedre overholdelse av bærekraftige standarder.",
            },
            {
              title: "Kort monteringstid",
              content:
                "Takket være vår modulære tilnærming kan monteringen av ditt nye hjem fullføres på bare noen få dager. Dette minimerer forstyrrelser og lar deg raskt flytte inn i ditt nye hjem.",
            },
            {
              title: "Fleksible løsninger",
              content:
                "Våre modulhus kan tilpasses dine spesifikke behov og ønsker. Enten du trenger mer plass senere eller ønsker å tilpasse layouten, gir våre fleksible løsninger deg muligheten til å vokse med hjemmet ditt.",
            },
            {
              title: "Rene materialer",
              content:
                "Vi bruker kun rene, naturlige materialer av høyeste kvalitet. Våre modulhus er bygget i massivtre, som ikke bare er miljøvennlig, men også skaper et sunt og behagelig innemiljø.",
            },
            {
              title: "Bærekraftig bygg",
              content:
                "Bærekraft står i sentrum for alt vi gjør. Fra valg av materialer til produksjonsprosesser, sikrer vi at våre modulhus har minimal miljøpåvirkning og bidrar til en mer bærekraftig fremtid.",
            },
            {
              title: "Minimalt fotavtrykk",
              content:
                "Våre modulhus er designet for å ha minimalt miljøfotavtrykk. Gjennom effektiv bruk av ressurser, gjenbrukbare komponenter og energieffektiv produksjon, bidrar vi til å bevare miljøet for fremtidige generasjoner.",
            },
          ],
        },
      ],
    });
    console.log("✅ Home Page created");

    console.log("🎉 Seed completed successfully!");
    console.log("\n📋 Next steps:");
    console.log("1. Open Sanity Studio and upload images for models");
    console.log("2. Upload video for hero section");
    console.log("3. Update model image references in Sanity Studio");
    console.log("4. Update hero video in Sanity Studio");
  } catch (error) {
    console.error("❌ Error seeding Sanity:", error);
    throw error;
  }
}
