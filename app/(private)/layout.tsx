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
                <Sidebar />
                <div className="col-span-5 px-8 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

const NAV_OPTIONS = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Agencies',
        href: '/agencies'
    },
    {
        label: 'Locations',
        href: '/locations'
    },
    {
        label: 'Install Apps',
        href: '/apps'
    },
    {
        label: 'API Keys',
        href: '/api-keys'
    },
]

function Sidebar() {
    return (
        <div className="relative">
            <div className="p-4 shadow h-screen absolute w-full">
                <ul>
                    {
                        NAV_OPTIONS.map((option, i) => (
                            <div key={`${option.href}-${i}`} className="mb-4">
                                <Link href={option.href}>
                                    <li>{option.label}</li>
                                </Link>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}