import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './styles.css'

import logo from '../../assets/logo.svg'

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header className="homeIllustration">
          <img src={logo} alt="PetPaws" />
        </header>

        <main>
          <h1>
            Adote um <span style={{ color: "#C67472" }}>pet</span> <br />
            Adote um <span style={{ color: "#C67472" }}>amigo</span>
          </h1>
          <p>
            Pet Paws é a conexão ideal entre aqueles <br />
            que são apaixonados por animais de <br />
            estimação.
          </p>

          <Link to="/create-petpoint">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um pet para doação</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home