import React from 'react';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/HomeScreen/home';
import AddScreen from '../screens/AddScreen/index'
import ProfileScreen from '../screens/ProfileScreen/index'
import Searchscr from '../screens/Search/index';
import Splash from '../screens/SplashScreen/index';
import Loginscreen from '../screens/LoginScreen/index';
const Stack=createStackNavigator();
function Search() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: null, }} />
            <Stack.Screen name="Search" component={Searchscr} options={{ headerShown: null, }} />
        </Stack.Navigator>
    )
}
const SwitchSplashLogin = createAnimatedSwitchNavigator({
    Splash:Splash,
    Login:Loginscreen
}, {
    initialRouteName: 'Splash'
});

const Tab = createMaterialBottomTabNavigator();
function BottomNavigator() {
    return (
        <Tab.Navigator shifting>
            <Tab.Screen name="Home"
                component={Search}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#6495ED',
                    tabBarIcon: () => (
                        <Octicons name="home" color='white' size={26} />
                    ),
                }}
            />
            <Tab.Screen name="Add"
                component={AddScreen}
                options={{
                    tabBarLabel: 'Add',
                    tabBarColor: '#DC143C',
                    tabBarIcon: () => (
                        <MaterialIcons name="add-to-photos" color='white' size={26} />
                    ),
                }}
            />
            <Tab.Screen name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#FFC0CB',
                    tabBarIcon: () => (
                        <MaterialIcons name="account-circle" color='white' size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
const SwitchNavigator = createAnimatedSwitchNavigator({
    Auth: SwitchSplashLogin,
    App: BottomNavigator,
}, {
    initialRouteName: 'Auth'
});
const AppNavigator = createAppContainer(SwitchNavigator);

export default AppNavigator;