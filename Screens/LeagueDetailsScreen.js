import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles';


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
    const sortedDrivers = driversWithPoints.sort((a, b) => {
      // Compare by points first
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      
      return a.lastname.localeCompare(b.lastname);
    });
  
  
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

  export default LeagueDetailsScreen;