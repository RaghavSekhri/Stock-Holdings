import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStackNavigation from './AppStack';
import { RootStackParamList } from '../config';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                <RootStack.Screen name='AppStack' component={AppStackNavigation}></RootStack.Screen>
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;