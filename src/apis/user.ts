
export type User = {
    id: number,
    username: string,
    age: number,
    email: string
}

const fetchUsers = ( query?: string ): Promise< User[] > => {
    const searchParams = new URLSearchParams();
    if( query )searchParams.set( 'query', query );
    return fetch( '/api/users' + ( query ? '?' + searchParams.toString() : '' ) ).then( res => res.json() );
}


export {
    fetchUsers
}