import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import LeagueDetailsScreen from './Screens/LeagueDetailsScreen';
import ParticipantDetailsScreen from './Screens/ParticipantDetailsScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="League Details" component={LeagueDetailsScreen} />
        <Stack.Screen name="Participant Details" component={ParticipantDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
