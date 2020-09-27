

import React,{useState} from 'react';
import {  LogBox} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import Searchscr from './src/screens/Search/index'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './src/screens/SplashScreen/index';
import Loginscreen from './src/screens/LoginScreen/index';
import Home from './src/screens/HomeScreen/home'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AddScreen from './src/screens/AddScreen/index'
import ProfileScreen from './src/screens/ProfileScreen/index'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs(['Require cycle:']);

/*const Appcontainer=createAppContainer(createSwitchNavigator(
  {
    Splashct:Splashsw,
    Homect:Loginsw,
  },
  {
   initialRouteName:'Splashct'
  }
)
);*/

import { AuthContext} from './src/utils/Context'


const Stack = createStackNavigator();

function Search() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: null, }} />
      <Stack.Screen name="Search" component={Searchscr} options={{ headerShown: null, }} />
    </Stack.Navigator>
  )
}

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

export default function App({ navigation }) {
  const [emailInfor, setEmailInfor] = useState({
    email: null,
    displayName: null,
    phoneNumber: null,
    token: null,
  });
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    setTimeout(() => {
      const bootstrapAsync = async () => {
        let userToken;
        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch (e) {
          console.log(e)
        }
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };
      bootstrapAsync();
    }, 2000)
  }, []);
 
  const authContext = React.useMemo(
    () => ({
      signIn:() => dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' }),
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      {/* <SafeAreaView>
        <AppNavigator/>
      </SafeAreaView> */}
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splashsw" component={Splash} options={{ headerShown: null, }} />
          ) : state.userToken == null ? (
            <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: null, }} />
          ) : (

                <Stack.Screen name="Bottom" children={BottomNavigator} options={{ headerShown: null, }} />
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  );
}
