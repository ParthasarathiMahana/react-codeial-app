import {createContext} from 'react';
import {useProvideAuth} from '../hooks';

const initialState={
    user: null,
    login: ()=>{},
    loading: true,
    signup: ()=>{},
    updateUser: ()=>{},
    updateUserFriends:()=>{}
};

export const Authcontext = createContext(initialState);

export const AuthProvider = ({children})=>{
    const auth = useProvideAuth();
    return <Authcontext.Provider value={auth}>{children}</Authcontext.Provider>
}