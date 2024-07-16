import { UUID } from "crypto";

export interface Plant {
  plantId: UUID;
  name: string;
  latinName: string;
  price: number;
  amount: number;
  category: string;
  height: string;
  waterDemand: string;
  description: string;
  imageLink: string;
}
