"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      py={12}
      px={4}
      backgroundImage="url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2069')"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading fontSize="3xl" color="brand.500" textAlign="center" mb={10}>
        Bem-vindo a Innovation Brindes
      </Heading>

      <Container maxW="lg">
        <Box
          bg="white"
          p={16}
          rounded="lg"
          boxShadow="lg"
          backdropFilter="blur(10px)"
          backgroundColor="brand.500"
        >
          <Stack spacing={8}>
            <form onSubmit={handleLogin}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel color="white">Usuário</FormLabel>
                  <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu usuário"
                    bg="white"
                    rounded="3xl"
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="white">Senha</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    bg="white"
                    rounded="3xl"
                    required
                    
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align="start"
                    justify="space-between"
                  >
                    <Checkbox color="white">Manter logado</Checkbox>
                    <Text color="white" cursor="pointer" _hover={{ color: "blue.500"}}>
                      Esqueceu a senha?
                    </Text>
                  </Stack>
                  <Button
                    bg="white"
                    color="gray.500"
                    rounded="3xl"
                    width="10rem"
                    mx="auto"
                    _hover={{
                      bg: "green",
                      color: "white",
                    }}
                    type="submit"
                    isLoading={isLoading}
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
