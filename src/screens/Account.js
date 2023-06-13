import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LoginForm from '../componets/Auth/LoginForm';
import UserData from '../componets/Auth/UserData';
import useAuth from '../hooks/useAuth';

export default function Account() {
    const { auth } = useAuth()
    return (
        <View>
            {auth ? <UserData /> : <LoginForm />}
        </View>
    );
};

const styles = StyleSheet.create({});