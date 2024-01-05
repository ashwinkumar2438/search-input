import styled from "styled-components";
import ContentEditable from "react-contenteditable";

// type imports:
import type { MutableRefObject, ReactNode } from 'react';
import type { ContentEditableEvent } from "react-contenteditable";

export type Content = { html: string, search?: string }

type IProps< T > = {
    content: Content,
    onChange: ( content: Content ) => void,
    name: string,
    options?: T[],
    renderOption?: ( option: T ) => ReactNode,
    Styles?: typeof DefaultStyles,
    inputRef?: MutableRefObject< ContentEditable | null > 
}


export const DefaultStyles = styled.div.withConfig( {
    shouldForwardProp( prop ){ 
        return prop !== 'visible'
    }
} )< { visible: boolean } >`
    width: 100%;
    max-width: min( 450px, 80vw );
    position: relative;
    .search-input{
        border: 1px solid rgba( 0, 0, 0, 0.53);
        padding: 8px 12px;
        border-radius: 4px;
        width: 100%;
        & > span.search{
            display: inline-block;
            padding: 4px;
            background: rgba(148, 148, 148, 0.25)
        }
        & > span.highlight{
            display: inline-block;
            padding: 4px;
            color: darkcyan;
            background: lightblue;
            font-weight: 500;
        }
    }

    datalist{
        display: ${ ( { visible } ) => visible ? 'block' : 'none' };
        position: absolute;
        top: 100%;
        left: 0;
        width: 60%;
        padding: 12px 8px;
        background: rgba(255, 255, 255, 0.3 );
        box-shadow: 0 8px 8px 2px rgba(0, 0, 0, 0.2 );
    }
`


export const SearchInput = < T extends {} >( {
    content,
    options = [],
    name,
    renderOption,
    Styles = DefaultStyles,
    inputRef,
    ...props
} : IProps< T > ) => {

    const onChange = ( event: ContentEditableEvent ) => {
        const html = event.target.value;
        const parent = document.createElement( 'div' );
        parent.innerHTML = html;
        let searchEl = parent.querySelector( 'span.search' );
        searchEl?.remove();

        const namesEls = parent.querySelectorAll( `span.${ name }` );
        for( let i = 0; i < namesEls.length; i++ ) {
            const nameEl = namesEls[ i ] as HTMLSpanElement;
            if( nameEl.textContent !== nameEl.dataset[ name ] )nameEl.remove();
        }
        
        let value = parent.innerHTML;
        let search = searchEl?.textContent;
        if( value.slice( -1 ) === '@' ){ 
            value = value.slice( 0, -1 ); 
            if( !search )search = '@'
        }

        props.onChange( { html: value, ...!!search && { search } } ); 
    }

    return (
        <Styles visible={ !!content.search }>
            <ContentEditable 
                ref={ inputRef as any }
                className='search-input'
                html={ content.html + ( content.search ? `<span class='search'>${ content.search }</span>` : '' ) }
                onChange={ onChange }
            />
            <datalist>
                {
                   !!renderOption && options.map( renderOption ) 
                }
            </datalist>
       </Styles>
    )
}

export default SearchInput;