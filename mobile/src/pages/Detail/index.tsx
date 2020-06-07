import React, { useEffect, useState } from 'react'
import { Feather as Icon, FontAwesome as Icon2 } from '@expo/vector-icons'
import { View, StyleSheet,TouchableOpacity, Image, Text, SafeAreaView, Linking } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'
import api from '../../services/api'

interface Params {
  petpoint_id: number,
}

interface Data {
  petpoint: {
    image: string,
    petname: string,
    description: string,
    username: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string,
  },
  category: {
    title: string,
  }[]
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data)

  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as Params

  useEffect(() => {
    api.get(`petpoints/${routeParams.petpoint_id}`).then(res => {
      setData(res.data)
    })
  },  [])

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: `Interesse em adotar o(a) ${data.petpoint.petname}`,
      recipients: [data.petpoint.email],
    })
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.petpoint.whatsapp}&text=Olá, ${data.petpoint.username}, tenho interesse em adotar o(a) ${data.petpoint.petname}!`)
  }

  if (!data.petpoint) {
    return null // Loading screen
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container} >
      <TouchableOpacity onPress={handleNavigateBack}>
          <Icon style={{ marginTop: 20 }} name="arrow-left" size={25} color="#592211" />
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{ uri: data.petpoint.image }} />

      <Text style={styles.petPointName}>{data.petpoint.petname}</Text>
      <Text style={styles.petPointCategory}>{data.category.map(category => category.title).join(', ')}</Text>

      <View style={styles.address}>
        <Text style={styles.titleField}>Descrição</Text>
  <Text style={styles.dataField}>{data.petpoint.description}</Text>
      </View>

      <View style={styles.address}>
        <Text style={styles.titleField}>Nome do(a) doador(a)</Text>
        <Text style={styles.dataField}>{data.petpoint.username}</Text>
      </View>

      <View style={styles.address}>
        <Text style={styles.titleField}>Endereço</Text>
        <Text style={styles.dataField}>{data.petpoint.city}, {data.petpoint.uf}</Text>
      </View>
    </View>
    <View style={styles.footer}>
      <RectButton style={styles.button} onPress={handleWhatsapp}>
        <Icon2 name='whatsapp' size={24} color="#FFF" />
        <Text style={styles.buttonText}>WhatsApp</Text>
      </RectButton>
      <RectButton style={styles.button} onPress={handleComposeMail}>
        <Icon name='mail' size={24} color="#FFF" />
        <Text style={styles.buttonText}>E-mail</Text>
      </RectButton>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  pointImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  petPointName: {
    color: '#361D36',
    fontSize: 36,
    fontFamily: 'FredokaOne_400Regular',
    marginTop: 24,
  },

  petPointCategory: {
    fontFamily: 'Comfortaa_400Regular',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 24,
    marginTop: 8,
    color: '#592211'
  },

  address: {
    marginTop: 32,
  },
  
  titleField: {
    color: '#322153',
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 16,
  },

  dataField: {
    fontFamily: 'Comfortaa_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#592211',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Comfortaa_500Medium',
  },
});

export default Detail