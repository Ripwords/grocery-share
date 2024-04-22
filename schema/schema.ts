export type GroceryShareCode = {
  id: string;
  users: string[];
  toBeApproved: {
    id: string;
    username: string;
    email: string;
  }[];
  list: GroceryList['id'];
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
  remarks: string;
  location: string;
  totalAdded: number;
}

export type GroceryList = {
  id: string;
  code: GroceryShareCode['users'][0];
  items: {
    [key: string]: {
      item: GroceryItemType;
      quantity: number;
    }
  }[];
}