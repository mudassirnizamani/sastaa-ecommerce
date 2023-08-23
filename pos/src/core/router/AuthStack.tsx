import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../../features/auth/views/Signin';
import Signup from '../../features/auth/views/Signup';

export type AuthStackParams = {
  Signin: {};
  Signup: {};
};

const Stack = createStackNavigator<AuthStackParams>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
