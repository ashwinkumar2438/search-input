'use client';
import { useState, useRef } from "react";

// local imports:
import SearchInput from "./SearchInput";
import Option from "./option";
import { useApi } from "@/hooks/api";
import { fetchUsers } from "@/apis/user";

// type imports:
import ContentEditable from "react-contenteditable";
import type { Content } from "./SearchInput";
import type { User } from "@/apis/user";


export const Thoughts = () => {
    const [ content, setContent ] = useState< { html: string, search?: string } >( { html: 'hello' } );
    const inputRef = useRef< ContentEditable >( null );

    const query = ( content.search ?? '' ).slice( 1 );
    const { data } = useApi( { fetchApi: fetchUsers, deps: [ query ], debounce: 200 } );

    const onChange = ( { html, search } : Content ) => {
        setContent( { html, ...!!search && { search } } ); 
    }

    const onSelect = ( user: User ) => {
        setContent( ( { html } ) => {
            html += `<span class='user highlight' data-id=${ user.id } data-user=${ user.username }>${ user.username }</span>&nbsp;`
            return {
                html
            }
        } );
        inputRef.current?.getEl().focus();
    }


    return (
       <SearchInput<User> 
            inputRef={ inputRef }
            content={ content }
            onChange={ onChange }
            name='user'
            options={ content.search && data ? data : [] }
            renderOption={ ( user ) =>  <Option key={ user.id } user={ user } onSelect={ onSelect }/>}
       />
    )
}