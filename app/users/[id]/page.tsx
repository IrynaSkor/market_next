"use client";

import ErrorMassage from "@/components/errorMassage";
import { Role } from "@/src/types/Role";
import { notFound } from "next/navigation"
import { useEffect, useState } from "react";
import { use } from "react";



export default function User({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params);
    const [error, setError] = useState("");
    const [formdata, setForm] = useState({
        email: "",
        first_name: "",
        last_name: "",
        role: Role.User
    })

    if (!id) {
        return notFound();
    }


    useEffect(() => {
        const gatUser = async () => {
            try {
                if (id != 0) {
                    const res = await fetch(`/api/users/${id}`);
                    if (id !== 0 && !res.ok) {
                        setError("User not fund!");
                        return;
                    }
                    const data = await res.json();
                    setForm({
                        email: data.email || "",
                        first_name: data.first_name || "",
                        last_name: data.last_name || "",
                        role: data.role || Role.User
                    });
                }
            } catch (error) {
                setError("Item data upadate error:" + error);
            }
        };

        gatUser();
    }, [id]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...formdata, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formdata.first_name.length < 2 || formdata.last_name.length < 2) {
            setError("Value input error");
            return;
        }

        const res = await fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || "User error");
        } else {
            alert("Ok!");
        }
    }

    return (
        <>
            <div className="container width50">
                <h1>Edit user # {id}</h1>
                <ErrorMassage massage={error} />

                <form onSubmit={handleSubmit} >
                    <div className="input-group mb-3">
                        <input type="text" name="email" onChange={handleInputChange} className="form-control" placeholder="Email" value={formdata.email} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="name" onChange={handleInputChange} className="form-control" placeholder="First Name" value={formdata.first_name} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="name" onChange={handleInputChange} className="form-control" placeholder="Last Name" value={formdata.last_name} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="name" onChange={handleInputChange} className="form-control" placeholder="Role" value={formdata.role} required />
                    </div>


                    <button type="submit" className="btn btn-outline-success">Save</button>
                </form>
            </div>
        </>
    )
}