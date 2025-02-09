"use client";

import { useEffect, useState } from "react"
import { getSession, SessionProvider, useSession } from "next-auth/react";
import ErrorMassage from "@/components/errorMassage";

const Profile = () => {
    const { data: session } = useSession();
    const [error, setError] = useState("");
    const [formdata, setForm] = useState({
        email: "",
        password: "",
        new_password: "",
        rep_password: "",
        first_name: "",
        last_name: ""
    });

    useEffect(() => {
        if (session?.user) {
            setForm({
                email: session.user.email || "",
                password: "",
                new_password: "",
                rep_password: "",
                first_name: session.user.first_name || "",
                last_name: session.user.last_name || "",
            });
        }
    }, [session]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...formdata, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formdata.first_name.trim().length < 2 || formdata.last_name.trim().length < 2) {
            setError("Your name too sort...");
            return;
        }

        if (formdata.new_password !== formdata.rep_password) {
            setError("The password does not match!");
            return;
        }

        const res = await fetch("/api/auth/profile/updata", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || "Updata error");
        } else {
            alert("Ok!");
        }
    };

    return (
        < >

            <div className="container width50">
                <h1>Profile</h1>
                <ErrorMassage massage={error} />

                <form onSubmit={handleSubmit} >
                    <div className="input-group mb-3">
                        <input type="text" name="first_name" onChange={handleChange} className="form-control" placeholder="First Name" value={formdata.first_name} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="last_name" onChange={handleChange} className="form-control" placeholder="Last Name" value={formdata.last_name} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="email" onChange={handleChange} className="form-control" placeholder="email@gamil.com" value={formdata.email} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="password" onChange={handleChange} className="form-control" placeholder="current password" value={formdata.password} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="new_password" onChange={handleChange} className="form-control" placeholder="new password" value={formdata.new_password} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="rep_password" className="form-control" onChange={handleChange} placeholder="repeat password" value={formdata.rep_password} required />
                    </div>
                    <button type="submit" className="btn btn-outline-success">Save</button>
                </form>
            </div>
        </ >
    )
}

export default function SessionProfile() {
    return (
        <SessionProvider>
            <Profile />
        </SessionProvider>
    )
}