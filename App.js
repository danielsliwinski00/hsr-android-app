import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-notifications';

import Start from './screens/start.js';
import SignUp from './screens/signup.js';
import LogIn from './screens/login.js';
import Main from './screens/main.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          initialParams=""
          options={() => ({
            headerTitle: 'Log in',
            headerTransparent: true,
            headerTintColor: '#ffffff',
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={() => ({
            headerTitle: 'Sign up',
            headerTransparent: true,
            headerTintColor: '#ffffff',
          })}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
      <Toast ref={(ref) => global.toast = ref} />
    </NavigationContainer>
  );
}