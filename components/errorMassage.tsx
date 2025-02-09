"use client";
import { useEffect, useState } from "react"


export default function ErrorMassage({ massage }: { massage: string }) {
    const [error, setError] = useState(massage);

    useEffect(() => {
        setError(massage);
    }, [massage]);

    const colseError = () => {
        setError("");
    }

    return (
        <>
            {error &&
                <div className="container width50">
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {error}
                        <button type="button" onClick={colseError} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            }
        </>
    )
}