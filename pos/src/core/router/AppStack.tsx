import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateProductCategory from '../../features/product_category/views/CreateProductCategory';

export type AppStackParams = {
  CreateProductCategory: {};
};

const Stack = createStackNavigator<AppStackParams>();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="CreateProductCategory"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CreateProductCategory"
        component={CreateProductCategory}
      />
    </Stack.Navigator>
  );
}
