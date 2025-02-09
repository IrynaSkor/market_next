"use client";

import { User } from "@/src/interfaces/User";
import { Role } from "@/src/types/Role";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserList = () => {
    const [users, setUser] = useState<User[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("/api/users");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("users get error", error);
            }
        }
        fetchUsers();
    }, []);

    const handlUser = ({ id }: { id: number }) => {

        router.push(`/users/${id}`);
        router.refresh();
    }

    return (
        <div className="container mt-4">
            <h2>Users</h2>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Role</th>
                        {session?.user.role === Role.Admin &&
                            <th scope="col">Action</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.role}</td>
                            {session?.user.role === Role.Admin &&
                                <td><button onClick={() => handlUser({ id: user.id })} className="btn btn-outline-warning">Edit</button></td>
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
            <UserList />
        </SessionProvider>
    );
}