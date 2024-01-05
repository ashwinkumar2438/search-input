import styled from 'styled-components';

// type imports:
import type { User } from '@/apis/user';

type Iprops = {
    user: User,
    onSelect: ( user: User ) => void
}


const Styles = styled.option`
    cursor: pointer;
    padding: 6px;
    &:hover{
        background: lightgray;
    }
`


const Option = ( { user, onSelect } : Iprops ) => {

    return (
        <Styles onClick={ () => onSelect( user ) }>
            { user.username }
        </Styles>
    )
}


export default Option;