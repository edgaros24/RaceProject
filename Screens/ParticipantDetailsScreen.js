import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles';

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

export default ParticipantDetailsScreen;