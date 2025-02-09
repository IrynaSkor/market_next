import { Item } from "./Item";
import { Order } from "./Order";

export interface OrderDescription {
    order_id: number;
    order: Order
    item_id: number;
    item: Item
    quantity: number;
}