import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { I18nextProvider } from 'react-i18next';
import Navigation from "./src/navigation/Navigation";
import i18n from './i18n';
import AuthNavigation from "./src/navigation/AuthNavigation";
import { AuthProvider } from "./src/context/AuthContext";
import useAuth from "./src/hooks/useAuth";


export default function App() {
  
  const { isConnected } = useAuth();

  useEffect(()=> (
    console.log("isConnected", isConnected)
  ),[isConnected])


  return (
    <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          {/* Envuelvo solo la Navigation por que si en AuthProvider necesito utilizar algo de la navegacion el AuthProvider tiene que estar dentro de NavigationContainer */}
          <AuthProvider>
            {isConnected === true ? <Navigation /> : <AuthNavigation />}
          </AuthProvider>
        </NavigationContainer>
    </I18nextProvider>
  );
}