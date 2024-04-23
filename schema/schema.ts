import type { doc } from "firebase/firestore";

export type GroceryShareCode = {
  id: string;
  users: string[];
  toBeApproved: {
    id: string;
    username: string;
    email: string;
  }[];
  list: GroceryList;
}

export type GroceryShareUser = {
  username: string;
  email: string;
  creator: boolean;
  code: string;
  id: string;
}

export type GroceryItemType = {
  id: string;
  name: string;
  location: string;
  totalAdded: number;
}

export type GroceryListItem = {
  item: GroceryItemType;
  remarks?: string;
  quantity: number;
  locationOverride?: string;
}

export type GroceryListItemDB = {
  item: ReturnType<typeof doc>;
  remarks?: string;
  quantity: number;
  locationOverride?: string;
}

export type GroceryList = GroceryListItem[];