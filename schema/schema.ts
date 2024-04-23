export type GroceryShareCode = {
  id: string;
  users: string[];
  toBeApproved: {
    id: string;
    username: string;
    email: string;
  }[];
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
}

export type GroceryListItem = {
  id: string;
  item: GroceryItemType;
  remarks?: string;
  quantity: number;
  locationOverride?: string;
}

export type GroceryList = GroceryListItem[];