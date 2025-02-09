import Link from "next/link";
import Search from "./search";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LinkOut from "./linkOut";


export default async function Navigation({ tab }: { tab: string }) {
    const session = await getServerSession(authOptions);

    return (
        <>
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid color_white">
                    <label >Hi! {session?.user ? session.user.first_name + " " + session.user.last_name : "SingIn and BUY!"}</label>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link href="/" className="navbar-brand">Home</Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href="/items" className={tab === "item" ? "nav-link activ" : "nav-link"} aria-current="page">Items</Link>
                            </li>
                            {session?.user &&
                                <li className="nav-item">
                                    <Link href="/orders" className={tab === "order" ? "nav-link activ" : "nav-link"} aria-current="page">Orders</Link>
                                </li>
                            }
                            {session?.user.role === "Admin" &&
                                <li className="nav-item">
                                    <Link href="/users" className={tab === "user" ? "nav-link activ" : "nav-link"} aria-current="page">Users</Link>
                                </li>
                            }
                            {session?.user.role === "User" &&
                                <li className="nav-item">
                                    <Link href="/card" className={tab === "card" ? "nav-link activ" : "nav-link"} aria-current="page">Card</Link>
                                </li>
                            }
                            {session?.user &&
                                <li className="nav-item">
                                    <Link href="/auth/profile" className={tab === "profile" ? "nav-link activ" : "nav-link"} aria-current="page">Profile</Link>
                                </li>
                            }
                        </ul>
                        <Search />
                        {session ?
                            <LinkOut />
                            :
                            <Link href="/auth/singin" className="navbar-brand">Sing In</Link>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}