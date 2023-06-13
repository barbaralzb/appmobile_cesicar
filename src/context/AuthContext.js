import React, { useState, createContext } from "react";

// Creamos - Le especificamos los datos que seran undefined al principio
export const AuthContext = createContext({
    user: undefined,
        login: () => {},
        logout: () => {},
});

// Crear el provider - Este va a definir las acciones que va a hacer nuestro contexto
// ex: reset, upload, add, delete, etc
// El provider envuelve a toda mi aplicacion
export function AuthProvider(props) {
    // desestructuring
    const { children } = props;
    const [auth, setAuth] = useState(undefined);

    const login = (userData) => {
        setAuth(userData);
    };

    const logout = () => {
        setAuth(undefined);
    };

    const valueContext = {
        auth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    );
}