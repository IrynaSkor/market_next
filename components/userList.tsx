"use client";

import { User } from "@/src/interfaces/User";
import { useEffect, useState } from "react";

export default function UserList() {
    const [users, setUser] = useState<User[]>([]);

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


    return (
        <div className="container mt-4">
            <h2>Users</h2>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.role}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}