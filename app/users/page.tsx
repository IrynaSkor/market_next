import UserList from "@/components/userList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ErrorMassage from "@/components/errorMassage";

export default async function Users() {
    const session = await getServerSession(authOptions);

    if (!session?.user)
        return (
            <ErrorMassage massage="You are not logged in!" />
        );

    return (
        <UserList />
    )
}