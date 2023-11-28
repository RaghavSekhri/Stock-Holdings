import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HoldingsPage } from '../screens';
import { RootStackParamList } from '../config';

const AppStack = createNativeStackNavigator<RootStackParamList>();

const AppStackNavigation = () => {

    return (
        <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name="HoldingsPage" component={HoldingsPage} />
        </AppStack.Navigator>
    );
};

export default AppStackNavigation;
