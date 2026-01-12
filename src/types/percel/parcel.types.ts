import { IDriver } from "../user/driver.types";
import { IUSER } from "../user/user.types";

export type ParcelStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "STARTED"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED";

export type ParcelType = "SMALL" | "MEDIUM" | "LARGE";

export type LocationType = "Point";

export interface Parcel {
  id: string;
  slug: string;

  requested_at: string;
  accepted_at: string | null;
  started_at: string | null;
  delivered_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  payment_at: string | null;

  date: string;
  time: string | null;

  user_id: string;
  driver_id: string | null;

  pickup_type: LocationType;
  pickup_lat: number;
  pickup_lng: number;
  pickup_address: string;

  dropoff_type: LocationType;
  dropoff_lat: number;
  dropoff_lng: number;
  dropoff_address: string;

  location_type: LocationType;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;

  status: ParcelStatus;

  parcel_type: ParcelType;
  weight: number;
  amount: number;
  total_cost: number;

  processing_driver_id: string | null;
  processing_at: string | null;
  is_processing: boolean;

  delivery_proof_files: string[];
  delivery_lat: number | null;
  delivery_lng: number | null;

  user: IUSER;
  driver: IDriver;
}
