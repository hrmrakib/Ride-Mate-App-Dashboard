export type UserRole = "DRIVER" | "USER";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface IUSER {
  id: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string;

  role: UserRole;
  email: string;
  phone: string | null;

  is_verified: boolean;
  is_active: boolean;
  is_admin: boolean;
  is_verification_pending: boolean;

  avatar: string | null;
  name: string;
  date_of_birth: string; // ISO date string
  gender: Gender;

  driving_license_photos: string[];

  vehicle_type: string;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_plate_number: string;

  vehicle_registration_photos: string[];
  vehicle_photos: string[];

  trip_given_count: number;

  is_stripe_connected: boolean;

  rating: number;
  rating_count: number;

  location_lat: number;
  location_lng: number;
  location_address: string;
}
