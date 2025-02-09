"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function Register() {
    const [formdata, SetForm] = useState({
        email: "",
        password: "",
        rep_password: "",
        first_name: "",
        last_name: ""
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetForm({ ...formdata, [e.target.name]: e.target.value });
    };

    const colseError = () => {
        setError("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formdata.password !== formdata.rep_password) {
            setError("The password does not match!");
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || "Registration error");
        } else {
            alert("Ok!");
            router.push("/auth/singin");
        }
    };


    return (
        <>
            <br />
            <div className="container width50">
                <h1>Hi! let's register</h1>
                {error &&
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {error}
                        <button type="button" onClick={colseError} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }
                <form onSubmit={handleSubmit} >
                    <div className="input-group mb-3">
                        <input type="text" name="first_name" onChange={handleChange} className="form-control" placeholder="First Name" required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="last_name" onChange={handleChange} className="form-control" placeholder="Last Name" required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="email" onChange={handleChange} className="form-control" placeholder="email@gamil.com" required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="password" onChange={handleChange} className="form-control" placeholder="password" required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="rep_password" className="form-control" onChange={handleChange} placeholder="repeat password" required />
                    </div>
                    <div className="form-text right">
                        Already have a profile? Then <a href="/auth/singin">sing in</a>!
                    </div>
                    <button type="submit" className="btn btn-outline-success">Save</button>
                </form>
            </div>
        </>
    )
}