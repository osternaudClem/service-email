export type AzelysseClient = {
  first_name: string;
  email: string;
};

type AzelysseService = {
  name: string;
  duration: number;
};

type AzelysseProduct = {
  name: string;
  price: number;
  aget_restriction?: number;
};

export type AzelyssePrestation = {
  service: AzelysseService;
  product?: AzelysseProduct;
};

export type AzelysseMeeting = {
  id: string;
  start_time: Date;
  end_time?: Date;
  client: AzelysseClient;
  prestations: AzelyssePrestation[];
};

export type AzelysseContent = {
  instagram_link: string;
  phone_number: string;
  contact_email: string;
  contact_phone_number: string;
  contact_address: string;
  facebook_link: string;
  instagram_username: string;
  google_review_link: string;
  google_maps_link: string;
};
