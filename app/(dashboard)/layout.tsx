import Link from "next/link";

export default function NameLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="grid grid-cols-6">
                <div className="relative">
                    <div className="p-4 shadow h-screen absolute w-full">
                        <ul>
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