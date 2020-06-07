import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import PetPoints from './pages/PetPoints'
import Detail from './pages/Detail'

const AppStack = createStackNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator 
        headerMode="none" 
        screenOptions={{
          cardStyle: {            
            backgroundColor: "#F0F0F5"
          }
        }}>
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="PetPoints" component={PetPoints} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes