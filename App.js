import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Splash,
  SignIn,
  CreateAccount,
  Profile,
  Home,
  Search,
  Details,
  Search2,
} from './Screens';

import { AuthContext } from './context';

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => {
  return (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Home" component={TabsScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    </Drawer.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const TabsScreen = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Search" component={SearchStackScreen} />
    </Tabs.Navigator>
  );
};

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="Details"
        component={Details}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </HomeStack.Navigator>
  );
};

const SearchStack = createStackNavigator();
const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Search2" component={Search2} />
    </SearchStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'Sign In' }}
      />
      <AuthStack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: 'Create Account',
        }}
      />
    </AuthStack.Navigator>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('123abc');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('123abc');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
