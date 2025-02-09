"use client";

import { useEffect, useState } from "react";
import { Item } from "@/src/interfaces/Item";
import { SessionProvider, useSession } from "next-auth/react";
import { Role } from "@/src/types/Role";
import { useRouter } from "next/navigation";

const ItemList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await fetch("/api/items");
                const res = await response.json();
                setItems(res);
            } catch (error) {
                console.error("Ошибка при загрузке товаров", error);
            }
        }
        fetchItems();
    }, []);

    const handlItem = ({ id }: { id: number }) => {
        router.push(`/items/${id}`);
        router.refresh();
    }


    return (
        <div className="container mt-4">
            {session?.user.role === Role.Admin &&
                <table className="width100"><thead>
                    <tr>
                        <th><h1>Items</h1></th>
                        <th className="right"><button onClick={() => handlItem({ id: 0 })} className="btn btn-outline-info">Add</button></th>
                    </tr></thead>
                </table>
            }
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price, $</th>
                        {session?.user &&
                            <th scope="col">Action</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            {session?.user.role === Role.Admin &&
                                <td><button onClick={() => handlItem({ id: item.id })} className="btn btn-outline-warning">Edit</button></td>
                            }
                            {session?.user.role === Role.User &&
                                <td><button className="btn btn-outline-success">Buy</button></td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function List() {
    return (
        <SessionProvider>
            <ItemList />
        </SessionProvider>
    );
}
