import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de inspeção com assinatura</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Inspection')}
        style={styles.button}>
        Realizar Inspeção
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Signature')}
        style={styles.button}>
        Assinar Inspeção
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 80
  },
  button: {
    marginBottom: 20,
  },
});

export default Home;
