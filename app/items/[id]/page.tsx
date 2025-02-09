"use client";

import ErrorMassage from "@/components/errorMassage";
import { notFound } from "next/navigation"
import { useEffect, useState } from "react";
import { use } from "react";



export default function Item({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params);
    const [error, setError] = useState("");
    const [formdata, setForm] = useState({
        name: "",
        description: "",
        price: 0
    })

    if (!id) {
        return notFound();
    }


    useEffect(() => {
        const gatItem = async () => {
            try {
                if (id != 0) {
                    const res = await fetch(`/api/items/${id}`);
                    if (id !== 0 && !res.ok) {
                        setError("Item not fund!");
                        return;
                    }
                    const data = await res.json();
                    setForm({
                        name: data.name || "",
                        description: data.description || "",
                        price: Number(data.price) || 0
                    });
                }
            } catch (error) {
                setError("Item data upadate error:" + error);
            }
        };

        gatItem();
    }, [id]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({ ...formdata, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formdata.name.length < 2 || formdata.description.length < 2 || !Number(formdata.price)) {
            setError("Value input error");
            return;
        }

        const res = await fetch(`/api/items/${id}`, {
            method: id == 0 ? "POST" : "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || "Item error");
        } else {
            alert("Ok!");
        }
    }

    return (
        <>
            <div className="container width50">
                {id == 0 &&
                    <h1>Add new item</h1>}
                {id > 0 &&
                    <h1>Edit item # {id}</h1>}
                <ErrorMassage massage={error} />

                <form onSubmit={handleSubmit} >
                    <div className="input-group mb-3">
                        <input type="text" name="name" onChange={handleInputChange} className="form-control" placeholder="Name" value={formdata.name} required />
                    </div>
                    <div className="input-group mb-3">
                        <textarea name="description" onChange={handleAreaChange} className="form-control" placeholder="Description" value={formdata.description} rows={3} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="number" name="price" onChange={handleInputChange} className="form-control" placeholder="Price" value={formdata.price} required />
                    </div>
                    <button type="submit" className="btn btn-outline-success">Save</button>
                </form>
            </div>
        </>
    )
}