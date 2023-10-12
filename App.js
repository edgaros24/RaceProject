import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import championshipData from './championshipData.json';

const styles = StyleSheet.create({
    buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    fontSize: 32,
    padding: 50,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
  playerButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 8,
    marginBottom: 10,
  },
  playerButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
container: {
    flex: 1,
    padding: 15,
  },
  name: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 15,
  },
  car: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 28,
    marginVertical: 15,
  },
  raceItem: {
    fontSize: 28,
    marginVertical: 15,
  },
});

function HomeScreen({ navigation }) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.heading}>Welcome to Lithuanian Drift Championship</Text>
      <View style={{ height: 20 }} />
      <Text style={styles.heading}>Select a League:</Text>
      <FlatList
        data={championshipData}
        keyExtractor={(item) => item.league_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('League Details', { league: item })}
          >
            <Text style={styles.buttonText}>{item.league_title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function calculateSeasonPoints(raceResults) {
  let totalPoints = 0;

  for (const race of raceResults) {
    totalPoints += race.qualification_points + race.tandem_points;
  }

  return totalPoints;
}


function LeagueDetailsScreen({ route, navigation }) {
  const { league } = route.params;
  const drivers = league.drivers;

  // Calculate total points for each driver
  const driversWithPoints = drivers.map((driver) => ({
    ...driver,
    points: calculateSeasonPoints(driver.race),
  }));

  // Sort drivers by points in descending order
  const sortedDrivers = driversWithPoints.sort((a, b) => b.points - a.points);

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.heading}>{league.league_title} League</Text>
      <FlatList
        data={sortedDrivers} // Use sorted drivers
        keyExtractor={(item) => item.driver_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.playerButton}
            onPress={() => navigation.navigate('Participant Details', { driver: item })}
          >
            <Text style={styles.playerButtonText}>
              {item.firstname} {item.lastname} | Car: {item.car} | Points: {item.points}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}



function ParticipantDetailsScreen({ route }) {
  const { driver } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{driver.firstname} {driver.lastname}</Text>
      <Text style={styles.car}>Car: {driver.car}</Text>
      <Text style={styles.sectionTitle}>Race Information:</Text>
      {driver.race.map((raceItem) => (
        <View style={styles.raceItem} key={raceItem.race_id}>
          <Text>Race Place: {raceItem.race_information}</Text>
          <Text>Qualification Position: {raceItem.qualification_position}</Text>
          <Text>Qualification Result: {raceItem.qualification_result}</Text>
          <Text>Qualification Points: {raceItem.qualification_points}</Text>
          <Text>Tandem Result: {raceItem.tandem_result}</Text>
          <Text>Tandem Points: {raceItem.tandem_points}</Text>
          <View style={{ marginBottom: 10}}></View>
        </View>
        

))}

    </ScrollView>
  );
}


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
