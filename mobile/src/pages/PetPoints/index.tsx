import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { Feather as Icon } from '@expo/vector-icons'
import Emoji from 'react-native-emoji'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { SvgUri } from 'react-native-svg'
import api from '../../services/api'

interface Category {
  id: number,
  title: string,
  image_url: string,
}

interface PetPoints {
  id: number,
  petname: string,
  image: string,
  image_url: string,
  latitude: number,
  longitude: number
}

interface Params {
  uf: string,
  city: string
}

const PetPoints = () => {
  const [category, setCategory] = useState<Category[]>([])
  const [petPoints, setPetPoints] = useState<PetPoints[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as Params

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Ooops...', 'Precisamos da sua permissão para obtermos a localização.')
        return
      }

      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords

      setInitialPosition([
        latitude,
        longitude
      ])
    }

    loadPosition()
  }, [])

  useEffect(() => {
    api.get('category').then(res => {
      setCategory(res.data)
    })
  }, [])

  useEffect(() => {
    api.get('petpoints', {
      params: {
        selectedCity: routeParams.city,
        selectedUf: routeParams.uf,
        category: selectedCategory
      }
    }).then(res => {
      setPetPoints(res.data)
    })
  }, [selectedCategory])

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { petpoint_id: id })
  }

  function handleSelectItem(id: number) {
    setSelectedCategory([id])
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={25} color="#C67472" />
        </TouchableOpacity>

        <Text style={styles.title}><Emoji name="blush" style={{ fontSize: 20 }} /> Seja bem-vinde!</Text>
        <Text style={styles.description}>Encontre no mapa um pet esperando por você.</Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}>

              {petPoints.map(petPoint => (
                <Marker
                  key={String(petPoint.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(petPoint.id)}
                  coordinate={{
                    latitude: petPoint.latitude,
                    longitude: petPoint.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: petPoint.image_url }} />
                    <Text style={styles.mapMarkerTitle}>{petPoint.petname}</Text>
                  </View>
                </Marker>
              ))}

            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 32 }}
        >
          {category.map(category => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={String(category.id)}
              style={[
                styles.item,
                selectedCategory.includes(category.id) ? styles.selectedItem : {}
              ]}
              onPress={() => handleSelectItem(category.id)}>
              <SvgUri width={42} height={42} uri={category.image_url} />
              <Text style={styles.itemTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'FredokaOne_400Regular',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Comfortaa_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#C67472',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Comfortaa_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#C67472',
    backgroundColor: 'rgba(198, 116, 114, .1)',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Comfortaa_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default PetPoints