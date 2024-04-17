import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { PlusCircle } from 'lucide-react'
import { AuthBuddyAPI } from "@/apis/AuthBuddy/AuthBuddyAPI";
import { CompanyLocationAccordion } from "@/components/authbuddy/CompanyLocationAccordion";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LocationsTable from "../../../components/authbuddy/LocationsTable";

const { AUTH_BUDDY_CLIENT_ID } = process.env;

const AUTHORIZATION_PAGE_URL = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=http://localhost:3000/api/code&client_id=${AUTH_BUDDY_CLIENT_ID}&scope=contacts.write%20locations.readonly`

export default async function AgenciesPage() {

    const session = await getServerSession();
    if (!session) redirect('/auth/login')

    const locations = await AuthBuddyAPI.getLocations(session.user.id);
    if (!locations) redirect('/dashboard')


    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Locations</h2>
                <div>
                    <ConnectionButton
                        authorization_page_url={AUTHORIZATION_PAGE_URL}
                        label={'Connect New Location'}
                    />
                </div>
            </div>
            <LocationsTable locations={locations} />
        </div>
    )
}

type ConnectionButtonProps = {
    authorization_page_url: string,
    label: string
}

function ConnectionButton({ authorization_page_url, label }: ConnectionButtonProps) {
    return (
        <Link href={authorization_page_url}>
            <Button>
                <PlusCircle size={16} className="mr-2" />
                <span>
                    {label}
                </span>
            </Button>
        </Link>
    )
}