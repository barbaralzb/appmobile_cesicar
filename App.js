import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { I18nextProvider } from 'react-i18next';
import Navigation from "./src/navigation/Navigation";
import i18n from './i18n';
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          {/* Envuelvo solo la Navigation por que si en AuthProvider necesito utilizar algo de la navegacion el AuthProvider tiene que estar dentro de NavigationContainer */}
          <AuthProvider>
              <Navigation />
          </AuthProvider>
        </NavigationContainer>
    </I18nextProvider>
  );
}