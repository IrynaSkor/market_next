"use client";

import { useEffect, useState } from "react";
import { Order } from "@/src/interfaces/Order";

export default function OrderList() {
    const [orders, setOrder] = useState<Order[]>([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("/api/orders");
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error("Ошибка при загрузке товаров", error);
            }
        }

        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Orders</h2>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User</th>
                        <th scope="col">Amount, $</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.amount}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}