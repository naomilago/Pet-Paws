import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'
import api from '../../services/api'

import Dropzone from '../../components/Dropzone'

import './styles.css'
import logo from '../../assets/logo.svg'

import SuccessModal from '../../components/SuccessModal';

interface Category {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePetPoint = () => {
  const [category, setCategory] = useState<Array<Category>>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [ufsInitials, setUfsInitials] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [modalVisibility, setModalVisibility] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    whatsapp: '',
    petname: '',
    description: ''
  })

  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedUfInitials, setSelectedUfInitials] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')
  const [selectedItem, setSelectedItem] = useState<number[]>([])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [selectedFile, setSelectedFile] = useState<File>()

  const history = useHistory()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords

      setInitialPosition([latitude, longitude])
    })
  }, [])

  useEffect(() => {
    api.get('category').then(res => {
      setCategory(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(res => {
      const ufName = res.data.map(uf => uf.nome)
      const ufInitials = res.data.map(uf => uf.sigla)

      setUfs(ufName)
      setUfsInitials(ufInitials)
    })
  }, [])

  useEffect(() => {
    if (selectedUfInitials === "0") {
      return
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUfInitials}/municipios`).then(res => {
      const cityNames = res.data.map(uf => uf.nome)

      setCities(cityNames)
    })
  }, [selectedUfInitials])

  function handleSelectUf(e: ChangeEvent<HTMLSelectElement>) {
    const uf = e.target.value

    function defineUfInitials(uf: string) {
      if (uf === "Acre") {
        return setSelectedUfInitials("AC")
      }
      if (uf === "Alagoas") {
        return setSelectedUfInitials("AL")
      }
      if (uf === "Amapá") {
        return setSelectedUfInitials("AP")
      }
      if (uf === "Amazonas") {
        return setSelectedUfInitials("AM")
      }
      if (uf === "Bahia") {
        return setSelectedUfInitials("BA")
      }
      if (uf === "Ceará") {
        return setSelectedUfInitials("CE")
      }
      if (uf === "Distrito Federal") {
        return setSelectedUfInitials("DF")
      }
      if (uf === "Espírito Santo") {
        return setSelectedUfInitials("ES")
      }
      if (uf === "Goiás") {
        return setSelectedUfInitials("GO")
      }
      if (uf === "Maranhão") {
        return setSelectedUfInitials("MA")
      }
      if (uf === "Mato Grosso") {
        return setSelectedUfInitials("MT")
      }
      if (uf === "Mato Grosso do Sul") {
        return setSelectedUfInitials("MS")
      }
      if (uf === "Minas Gerais") {
        return setSelectedUfInitials("MG")
      }
      if (uf === "Pará") {
        return setSelectedUfInitials("PA")
      }
      if (uf === "Paraíba") {
        return setSelectedUfInitials("PB")
      }
      if (uf === "Paraná") {
        return setSelectedUfInitials("PR")
      }
      if (uf === "Pernambuco") {
        return setSelectedUfInitials("PE")
      }
      if (uf === "Piauí") {
        return setSelectedUfInitials("PI")
      }
      if (uf === "Rio de Janeiro") {
        return setSelectedUfInitials("RJ")
      }
      if (uf === "Rio Grande do Norte") {
        return setSelectedUfInitials("RN")
      }
      if (uf === "Rio Grande do Sul") {
        return setSelectedUfInitials("RS")
      }
      if (uf === "Rondônia") {
        return setSelectedUfInitials("RO")
      }
      if (uf === "Roraima") {
        return setSelectedUfInitials("RR")
      }
      if (uf === "Santa Catarina") {
        return setSelectedUfInitials("SC")
      }
      if (uf === "São Paulo") {
        return setSelectedUfInitials("SP")
      }
      if (uf === "Sergipe") {
        return setSelectedUfInitials("SE")
      }
      if (uf === "Tocantins") {
        return setSelectedUfInitials("TO")
      }
    }

    defineUfInitials(uf)
    setSelectedUf(uf)
  }

  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value

    setSelectedCity(city)
  }

  function handleMapClick(e: LeafletMouseEvent) {
    setSelectedPosition([e.latlng.lat, e.latlng.lng])
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSelectItem(id: number) {
    setSelectedItem([id])
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const { username, email, whatsapp, petname, description } = formData
    const uf = selectedUf
    const city = selectedCity
    const [latitude, longitude] = selectedPosition
    const category = selectedItem

    const data = new FormData()
    data.append('username', username)
    data.append('email', email)
    data.append('whatsapp', whatsapp)
    data.append('petname', petname)
    data.append('description', description)
    data.append('uf', uf)
    data.append('city', city)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('category', category.join(','))

    if (selectedFile) {
      data.append('image', selectedFile)
    }

    await api.post('petpoints', data)

    setModalVisibility(true);

    // history.push('/')
  }

  return (
    <>
      {(modalVisibility === true) ? <SuccessModal /> : <></>}
      <div id="page-create-point">
        <header>
          <Link to="/">
            <img src={logo} alt="PetPaws" />
          </Link>

          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>Cadastro do meu Pet</h1>

          <Dropzone onFileUploaded={setSelectedFile} />

          <fieldset>
            <legend>
              <h2>Dados Pessoais</h2>
            </legend>

            <div className="field">
              <label htmlFor="username">Nome do(a) doador(a)</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleInputChange}
              />

              <br />

              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="username">WhatsApp</label>
                  <input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Dados do Pet</h2>
            </legend>

            <div className="field">
              <label htmlFor="petname">Nome do pet</label>
              <input
                type="text"
                name="petname"
                id="petname"
                onChange={handleInputChange}
              />

              <br />

              <label htmlFor="description">Descrição</label>
              <textarea
                name="description"
                id="description"
                onChange={handleTextareaChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map center={initialPosition} zoom={13} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={selectedPosition} />
            </Map>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select value={selectedUf} onChange={handleSelectUf} name="uf" id="uf">
                  <option value="0">Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select value={selectedCity} onChange={handleSelectCity} name="city" id="city">
                  <option value="0">Selecione uma cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Categoria</h2>
              <span>Selecione a categoria do seu pet</span>
            </legend>

            <ul className="items-grid">
              {category.map(categoryItem => (
                <li
                  className={selectedItem.includes(categoryItem.id) ? 'selected' : ''}
                  key={categoryItem.id}
                  onClick={() => handleSelectItem(categoryItem.id)}>
                  <img src={categoryItem.image_url} alt={categoryItem.title} />
                  <span>{categoryItem.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">
            Cadastrar novo pet
          </button>
        </form>
      </div>
    </>
  )
}


export default CreatePetPoint