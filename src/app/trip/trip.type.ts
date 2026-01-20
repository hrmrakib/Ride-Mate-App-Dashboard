export interface TripDetails {
  id: string;
  slug: string;
  requested_at: string;
  accepted_at: string | null;
  started_at: string | null;
  arrived_at: string | null;
  payment_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  time: string | null;
  date: string;
  user_id: string;
  driver_id: string | null;
  pickup_type: string;
  pickup_lat: number;
  pickup_lng: number;
  pickup_address: string;
  dropoff_type: string;
  dropoff_lat: number;
  dropoff_lng: number;
  dropoff_address: string;
  location_type: string;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;
  status: string;
  total_cost: number;
  processing_driver_id: string | null;
  processing_at: string | null;
  is_processing: boolean;
  user: TripUser;
  driver: TripDriver;
}

export interface TripUser {
  id: string;
  role: string;
  email: string;
  onesignal_id: string | null;
  avatar: string;
  name: string;
  gender: string;
  trip_received_count: number;
  is_stripe_connected: boolean;
  rating: number;
  rating_count: number;
  location_lat: number | null;
  location_lng: number | null;
}

export interface TripDriver {
  id: string;
  role: string;
  email: string;
  onesignal_id: string | null;
  avatar: string;
  name: string;
  gender: string;
  driving_license_photos: string[];
  vehicle_type: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  vehicle_plate_number: string | null;
  vehicle_registration_photos: string[];
  vehicle_photos: string[];
  trip_given_count: number;
  is_stripe_connected: boolean;
  rating: number;
  rating_count: number;
  location_lat: number | null;
  location_lng: number | null;
}
