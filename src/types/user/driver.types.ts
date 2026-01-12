import { IUSER } from "./user.types";

export interface IDriver extends IUSER {
  driving_license_photos: string[];

  vehicle_type: string;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_plate_number: string;

  vehicle_registration_photos: string[];
  vehicle_photos: string[];

  trip_given_count: number;
}
