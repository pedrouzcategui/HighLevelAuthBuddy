import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import LocationsTable from "./LocationsTable";

const { AUTH_BUDDY_CLIENT_ID } = process.env;

const AUTHORIZATION_PAGE_URL = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=http://localhost:3000/api/code&client_id=${AUTH_BUDDY_CLIENT_ID}&scope=contacts.write%20locations.readonly`

export default async function AgenciesPage() {

    const locations = await db.location.findMany();

    return (
        <div>
            <Link href={AUTHORIZATION_PAGE_URL}>
                <Button>Connect Agency</Button>
            </Link>
            <div>
                <h2>Your Locations</h2>
                <LocationsTable locations={locations} />
            </div>
        </div>
    )
}