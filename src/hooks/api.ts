import { useState, useRef, useEffect, useCallback } from "react"

type Params< T, P extends string[] > = {
    fetchApi: ( ...args: P ) => Promise< T >,
    deps: P,
    debounce?: number
}

const STATES = {
    idle: 'IDLE',
    success: 'SUCCESS',
    error: 'ERROR',
    fetching: 'FETCHING',
    loading: 'LOADING'
} as const;


type Timeout = ReturnType< typeof setTimeout >;

const useApi = < T extends {}, P extends string[] = [] >( { fetchApi, deps, debounce = 0 } : Params< T, P > ) => {

    const [ state, setState ] = useState< typeof STATES[ keyof typeof STATES ] >( STATES.idle );
    const [ data, setData ] = useState< T >();
    const [ error, setError ] = useState< any >();
    const cachedRef = useRef< string | null >( null );
    const mountedRef = useRef< boolean >( true );
    const timeoutIdRef = useRef< Timeout >();

    const callApi = useCallback( async () => {
        try{
            const data = await fetchApi( ...deps );
            setData( data );
            setState( STATES.success );
        }
        catch( e ){
            setError( e );
            setState( STATES.error);
        }
    }, [ fetchApi, deps ] )

    
    useEffect( () => {
        return () => {
            mountedRef.current = false;
        }
    },  [] )

    useEffect( () => {
        const cache = deps.join( ',' );
        if( cache === cachedRef.current )return;
        setState( cachedRef === null ? STATES.loading : STATES.fetching );
        cachedRef.current = cache;

        clearTimeout( timeoutIdRef.current );
        timeoutIdRef.current = setTimeout( callApi, debounce );

    }, [ callApi, debounce ] )


    return {
        state,
        data,
        error
    }
}


export {
    useApi,
    STATES
}