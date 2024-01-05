import { NextResponse } from "next/server";

// local imports:
import { users } from "@/global/users";

// type imports:
import type { NextRequest } from "next/server";

type Meta = {
    params: { id: string }
}

const usersMap: { [ K:string ]: typeof users[ 0 ] } = {};
for( let user of users ){
    usersMap[ user.id ] = user; 
}

export const GET = ( req: NextRequest, { params: { id } }: Meta ) => {
    return NextResponse.json( usersMap[ id ] ?? {} );
}