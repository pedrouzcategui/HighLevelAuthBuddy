import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import LocationsTable from "./LocationsTable";
import { PlusCircle } from 'lucide-react'
const { AUTH_BUDDY_CLIENT_ID } = process.env;

const AUTHORIZATION_PAGE_URL = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=http://localhost:3000/api/code&client_id=${AUTH_BUDDY_CLIENT_ID}&scope=contacts.write%20locations.readonly`

export default async function AgenciesPage() {

    const locations = await db.location.findMany();

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Locations</h2>
                <Link href={AUTHORIZATION_PAGE_URL}>
                    <Button>
                        <PlusCircle size={16} className="mr-2" />
                        <span>
                            Connect Location
                        </span>
                    </Button>
                </Link>
                <Link href={AUTHORIZATION_PAGE_URL}>
                    <Button>
                        <PlusCircle size={16} className="mr-2" />
                        <span>
                            Connect Agency
                        </span>
                    </Button>
                </Link>
            </div>
            <div>
                <LocationsTable locations={locations} />
            </div>
        </div>
    )
}