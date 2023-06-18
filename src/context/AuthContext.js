import React, { useState, createContext, useEffect } from "react";
import { login } from '../api/fetchApi/Authentification';


// Creamos - Le especificamos los datos que seran undefined al principio
export const AuthContext = createContext({
    user: undefined,
        signIn: () => {},
        signOut: () => {},
});

// Crear el provider - Este va a definir las acciones que va a hacer nuestro contexto
// ex: reset, upload, add, delete, etc
// El provider envuelve a toda mi aplicacion
export function AuthProvider(props) {
    // desestructuring
    const { children } = props;
    const [dataUser, setDataUser] = useState("");
    const [statusRequet, setStatusRequet] = useState(undefined);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const signIn = async (email, password) => {
        try {
            setIsLoading(true)
            const response = await login(email, password)
            setDataUser(response)
        } catch (error) {
            setIsConnected(false)
            setIsLoading(false)
            setError(error)
            console.error(error)
        }
    };

    useEffect(()=> {
        if (dataUser.status == "200") {
            setIsLoading(false)
            if (dataUser.data.token) {
                setIsConnected(true)
                console.log("The user is connected !")
            }
            console.error("The request was success but isn't any token")
        } else {
            setIsLoading(false)
            setIsConnected(false)
            console.log("The user isn't connected")
        }
    },[dataUser])

    const signOut = () => {
        setIsConnected(false);
        setDataUser("")
    };

    const valueContext = {
        dataUser,
        statusRequet,
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