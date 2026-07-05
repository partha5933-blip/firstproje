import { Schema, model, models, type InferSchemaType } from "mongoose";

const SettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    homepage: {
      heroHeadline: String,
      heroSubheadline: String,
      heroVideoUrl: String,
      featuredPortfolioIds: [String]
    },
    contact: {
      phone: String,
      whatsapp: String,
      email: String,
      instagram: String,
      facebook: String,
      mapEmbedUrl: String
    },
    seo: {
      defaultTitle: String,
      defaultDescription: String,
      ogImage: String
    },
    gdpr: {
      privacyVersion: String,
      termsVersion: String,
      cookieVersion: String
    },
    analytics: {
      gaId: String,
      metaPixelId: String
    }
  },
  { timestamps: true }
);

export type SettingsDocument = InferSchemaType<typeof SettingsSchema>;

const Settings = models.Settings || model("Settings", SettingsSchema);

export default Settings;
