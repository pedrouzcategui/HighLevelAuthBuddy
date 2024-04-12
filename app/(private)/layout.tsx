import { getServerSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession();

    if (!session) {
        redirect("/auth/login");
    }

    return (
        <div>
            <div className="grid grid-cols-6">
                <div className="relative">
                    <div className="p-4 shadow h-screen absolute w-full">
                        <ul>
                            <Link href={'/dashboard'}>
                                <li>Dashboard</li>
                            </Link>
                            <Link href={'/agencies'}>
                                <li>Agencies</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="col-span-5 px-8 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
