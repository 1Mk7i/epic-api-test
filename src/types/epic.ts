export interface EpicGame {
  title: string;
  description: string;
  keyImages: { type: string; url: string }[];
  productSlug: string;
  urlSlug: string;
  catalogNs: { mappings?: { pageSlug: string }[] };
  promotions: {
    promotionalOffers?: { promotionalOffers: { startDate: string; endDate: string }[] }[];
    upcomingPromotionalOffers?: { promotionalOffers: { startDate: string; endDate: string }[] }[];
  };
}