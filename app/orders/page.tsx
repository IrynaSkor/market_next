import OrderList from "@/components/orderList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ErrorMassage from "@/components/errorMassage";

export default async function Orders() {
    const session = await getServerSession(authOptions);
    if (!session?.user)
        return (
            <ErrorMassage massage="You are not logged in!" />
        );

    return (
        <OrderList />
    )
}