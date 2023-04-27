import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de inspeção com assinatura</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignContent: 'center' },
  titulo: { fontSize: 20 },
});

export default Home;