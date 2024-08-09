import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import championshipData from '../championshipData.json';
import { styles } from '../styles';


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

  export default HomeScreen;