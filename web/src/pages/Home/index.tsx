import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './styles.css'

import logo from '../../assets/logo.svg'
import homeBackground from "../../assets/home-background.svg";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header className="homeIllustration">
          <img src={logo} alt="PetPaws" />
        </header>

        <main>
          <div className="content-wrapper">
            <div>
              <h1>
                Adote um <span className="themed-text">pet</span> <br />
                Adote um <span className="themed-text">amigo</span>
              </h1>
              <p>
                Pet Paws é a conexão ideal entre aqueles <br />
                que são apaixonados por animais de <br />
                estimação.
              </p>
            <div className="button-petpoint">
              <Link to="/create-petpoint">
                <span>
                  <FiLogIn />
                </span>
                <strong>Cadastre um pet para doação</strong>
              </Link>
            </div>
            </div>
            <img src={homeBackground} alt="home-background" className="home-background-img" />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home