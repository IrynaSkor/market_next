"use client";

import ErrorMassage from "@/components/errorMassage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SingIn() {
    const [formdata, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const router = useRouter();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email: formdata.email,
            password: formdata.password,
        });


        if (res?.error) {
            setError(res.error);
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <>
            <br />
            <div className="container width50">
                <h1>Hi! Please sing in!</h1>
                <ErrorMassage massage={error} />

                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" name="email" onChange={handleChange} className="form-control" placeholder="email@gamil.com" required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="password" onChange={handleChange} className="form-control" placeholder="password" required />
                    </div>
                    <div className="form-text right">
                        Don't have a profile yet? Then <a href="/auth/register">register</a>!
                    </div>
                    <button type="submit" className="btn btn-outline-success">Go</button>
                </form>
            </div>
        </>
    )
}