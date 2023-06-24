import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/fetchApi/Authentification';

export const AuthContext = createContext({
    user: undefined,
    isConnected: false,
    isLoading: true,
    error: null,
    signIn: () => {},
    signOut: () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const signIn = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await login(email, password);
            setUser(response);
            setIsConnected(true);
        await AsyncStorage.setItem('token', response?.data?.token);
        } catch (error) {
            setIsConnected(false);
            setIsLoading(false);
            setError(error);
        }
    };

    const signOut = async () => {
        setIsConnected(false);
        setUser(null);
        await AsyncStorage.removeItem('token');
    };

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                // Realizar aquí cualquier validación adicional del token si es necesario
                    setIsConnected(true);
                }
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        checkToken();
    }, [setIsConnected]);

    const valueContext = {
        user,
        isConnected,
        isLoading,
        error,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    );
}
