import React from 'react'

import './login.css'
import Api from '../../Api'


export default function Login({ onReceive }) {


    const handleFaceLogin = async () => {
        let result = await Api.fbPopup()
        if (result) {
            onReceive(result.user)
        } else {
            alert('Erro')
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp Logo"
                    className="login-logo"
                />
                <h2 className="login-title">Entrar no WhatsApp</h2>
                <p className="login-subtitle">Use o Facebook para continuar</p>
                <button className="login-button" onClick={handleFaceLogin}>
                    Logar com o Facebook
                </button>
            </div>
        </div>
    )
}
