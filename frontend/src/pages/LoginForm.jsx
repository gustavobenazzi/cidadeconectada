import { useEffect, useState } from "react";
import React from "react";
import cclogo from "../assets/cc-logo.svg";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  //Authenticação login
  const [email, setEmail] = useState('');
  const [senha_user, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4444/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha_user }),
      });

      const data = await response.json();
      if (response.ok) {
        //armazena o Token localStorage
        localStorage.setItem('token', data.token);

        //redireciona o usuario para pagina de inicio
        navigate('/')
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro de conexão com o servidor');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <img src={cclogo} alt="Icone cidade Conectada" width={660}></img>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Entre com a sua conta
        </h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Seu email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <input
            type="password"
            placeholder="Sua senha"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={senha_user}
            onChange={(e) => setSenha(e.target.value)}
          />

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12m0 0a3 3 0 01-6 0m6 0a3 3 0 00-6 0m6 0a3 3 0 01-6 0M2 12s2-7 10-7 10 7 10 7-2 7-10 7-10-7-10-7z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mb-6 text-right">
          <a href="#" className="text-blue-500 hover:underline">
            Esqueceu sua senha?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <div className="mt-4 text-sm text-center">
          Clicando aqui, você concorda com os{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Termos de Serviço
          </a>{" "}
          e a{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Política de Privacidade
          </a>
        </div>
        <div className="mt-4 text-center">
          Não tem uma conta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Crie uma
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
