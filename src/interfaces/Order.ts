import { User } from "./User";

export interface Order {
    id: number;
    user: User
    user_id: number;
    amount: number;
}