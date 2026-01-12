import { Parcel } from "../percel/parcel.types";

export type TransactionType = "INCOME" | "EXPENSE" | "REFUND";
export type PaymentMethod = "WALLET" | "CARD" | "CASH" | "BANK_TRANSFER";

export interface IWalletTransaction {
  id: string;
  created_at: string;
  updated_at: string;

  stripe_transaction_id: string | null;

  user_id: string;
  driver_id: string | null;

  amount: number;
  type: TransactionType;
  payment_method: PaymentMethod;

  ref_trip_id: string | null;
  ref_parcel_id: string | null;

  data: Parcel | null;
}
