import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Assinatura from './src/components/Assinatura';
import Inspecao from './src/components/Inspecao';
import Home from './src/components/Home';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const App = () => {
  const [file, setFile] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Tela Inicial' }}
        />
        <Stack.Screen name="Inspection">
          {props => <Inspecao {...props} setFile={setFile} />}
        </Stack.Screen>
        <Stack.Screen
          name="Signature"
          component={Assinatura}
          options={{ title: 'Assinatura' }}
          initialParams={{ file: file }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
