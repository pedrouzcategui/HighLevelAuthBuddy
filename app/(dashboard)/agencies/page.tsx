import { Button } from "@/components/ui/button";
import Link from "next/link";

const { AUTH_BUDDY_CLIENT_ID, AUTH_BUDDY_REDIRECT_URI } = process.env;

const AUTHORIZATION_PAGE_URL = `
    https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=http://localhost:3000/api/code&client_id=${AUTH_BUDDY_CLIENT_ID}&scope=contacts.write`

export default function AgenciesPage() {
    return (
        <div>
            <Link href={AUTHORIZATION_PAGE_URL}>
                <Button>Connect Agency</Button>
            </Link>
        </div>
    )
}