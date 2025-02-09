"use client";

import { useEffect, useState } from "react";
import { Order } from "@/src/interfaces/Order";
import { OrderDescription } from "@/src/interfaces/OrderDescription";
import ErrorMassage from "./errorMassage";

export default function OrderList() {
    const [orders, setOrder] = useState<Order[]>([]);
    const [error, setError] = useState("");
    const [detail, setDetail] = useState<OrderDescription[]>([]);

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

    const showDetails = (order_id: number) => {
        async function fetchDetalis(order_id: number) {
            try {
                const res = await fetch(`/api/orders/description/${order_id}`);
                const data = await res.json();
                setDetail(data);
            } catch (error) {
                setError("Details not fund!" + error);
            }
        }

        fetchDetalis(order_id);
    }

    return (
        <div className="container mt-4">
            <h2>Orders</h2>
            <ErrorMassage massage={error} />
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Amount, $</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} onClick={() => { showDetails(order.id) }}>
                            <td>{order.id}</td>
                            <td>{order.user.email}</td>
                            <td>{order.user.last_name} {order.user.first_name}</td>
                            <td>{order.amount}</td>
                            <td>{detail.map((det) => (
                                <p key={det.item_id}>{det.quantity} x {det.item.name} </p>
                            ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}