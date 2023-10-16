
export const categories: string[] = [
    "Groceries",
    "Utilities",
    "Entertainment",
  ];

export declare interface Items {
  id: number;
  description: string;
  amount: number | string;
  category: string;
}
