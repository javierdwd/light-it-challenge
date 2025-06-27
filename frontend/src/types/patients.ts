export type Patient = {
  id: number;
  name: string;
  email: string;
  phone: {
    dial_code: string;
    country_code: string;
    phone_number: string;
  };
  image_path: string;
};
