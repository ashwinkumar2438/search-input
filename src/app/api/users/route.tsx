import { NextResponse } from "next/server";
import { URL } from "url";

// local imports:
import { users } from "@/global/users";

// type imports:
import type { NextRequest } from "next/server";

export const GET = ( req: NextRequest ) => {

    const { searchParams } = new URL( req.url );

    const search = searchParams.get( 'query' )?.toLowerCase() ?? ''; 

    const filteredUsers = users.filter( user => user.username.toLowerCase().includes( search ) );

    return NextResponse.json( filteredUsers );
}