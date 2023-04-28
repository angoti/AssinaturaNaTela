import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Assinatura from './src/components/Assinatura';
import Inspecao from './src/components/Inspecao';
import Home from './src/components/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Tela Inicial' }}
        />
        <Stack.Screen
          name="Inspection"
          component={Inspecao}
          options={{ title: 'Inspeção' }}
        />
        <Stack.Screen
          name="Signature"
          component={Assinatura}
          options={{ title: 'Assinatura' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
