import React, { useEffect, useState } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Image, StyleSheet, Text, TextInput } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'

const Home = () => {
  const navigation = useNavigation()

  const [ufs, setUfs] = useState<PickerItem[]>([]);
  const [cities, setCities] = useState<PickerItem[]>([]);
  const [selectedUf, setSelectedUf] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  function handleNavigateToPetPoints() {
    navigation.navigate('PetPoints', {
      uf: selectedUf,
      city: selectedCity
    })
  }

  interface IBGEUFResponse {
    sigla: string;
    nome: string;
  }
  
  interface IBGECityResponse {
    nome: string;
  }
  
  interface PickerItem {
    label: string;
    value: string;
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {
        const ufInitials = response.data.map(uf => ({
          label: uf.nome,
          value: uf.sigla,
        }));
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === null) return;

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => ({
          label: city.nome,
          value: city.nome,
        }));
        setCities(cityNames);
      });
  }, [selectedUf]);

  return (
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{ width: 91, height: 549, left: 300, top: 30  }}
      >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>O lugar ideal para encontrar seu novo pet.</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem animais de estimação disponíveis para adoção de forma fácil e direta.</Text>
      </View>

      <View style={styles.footer}>

      <RNPickerSelect
          style={ pickerSelectStyles }
          onValueChange={(value) => setSelectedUf(value)}
          placeholder={{ label: "Selecione um estado", value: null }}
          items={ufs}
          Icon={() => <Icon name="chevron-down" size={20} color="#A0A0B2" />}
        />

        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={(value) => setSelectedCity(value)}
          placeholder={{ label: "Selecione uma cidade", value: null }}
          items={cities}
          disabled={cities.length === 0}
          Icon={() => <Icon name="chevron-down" size={20} color="#A0A0B2" />}
        />

        <RectButton style={styles.button} onPress={handleNavigateToPetPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#361D36',
    fontSize: 40,
    fontFamily: 'FredokaOne_400Regular',
    maxWidth: 260,
    marginTop: 72,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Comfortaa_400Regular',
    maxWidth: 260,
    lineHeight: 28,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#592211',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Comfortaa_500Medium',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    height: 56,
  },
  iconContainer: {
    top: 18,
    right: 12,
    color: '#A0A0B2',
    opacity: 0.5
  },
});

export default Home