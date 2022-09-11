import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';

import { IUser } from '../../interfaces/user';
import { tesloApi } from '../../api';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
    children?: React.ReactNode | undefined;
}

const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,

}

export const AuthProvider:FC<AuthState> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    const router = useRouter();

    const { data, status } = useSession();

    useEffect(() => {

        if ( status === 'authenticated' ){
            console.log({user: data?.user});
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }

    },[status, data]);

    // useEffect(() => {
    //     checkToken();
    // },[]);

    const checkToken = async() => {

        // Verificar si hay token en cookies
        if ( !Cookies.get('token') ) {
            return; 
        }

        // Llamar al endpoint
        try {
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            
        } catch (error) {
            Cookies.remove('token');
        }
        // Revalidar token, guardando el nuevo
        // dispatch login
        // Borrar token de las cookies
    } 

    const loginUser = async ( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    const registerUser = async ( name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false,
            }
            // TODO: return
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                const { message } = error.response?.data as { message: string}
                return {
                    hasError: true,
                    message
                }
            }

            return {
                hasError: true,
                message: 'No se puede crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city',);
        Cookies.remove('country');
        Cookies.remove('phone');

        signOut();
        
        // Cookies.remove('token');
        // router.reload(); // hace un refresh de la aplicacion, pierde todo
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            // checkToken,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}