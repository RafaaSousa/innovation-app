'use client';

import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar',
        {
          email: email,
          senha: password,
        }
      );

      if (response.data.status === 1) {
        localStorage.setItem('token', response.data.token_de_acesso);
        localStorage.setItem('user', JSON.stringify(response.data.dados_usuario));
        router.push('/home');
      } else {
        toast({
          title: 'Erro no login',
          description: response.data.message || 'Credenciais inválidas',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao tentar fazer login',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);