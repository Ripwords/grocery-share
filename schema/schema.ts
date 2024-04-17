export type GroceryShareCode = {
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