"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Avatar,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, HamburgerIcon } from "@chakra-ui/icons";
import { BiLogOutCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../assets/images/logoInnovation.webp";

export default function Header() {
  const router = useRouter();

  const formatDate = () => {
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const date = new Date();
    const dayName = days[date.getDay()];
    return `${dayName}, ${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <Box bg="brand.500" color="white" py={4} px={{ base: 4, md: 8 }}>
      <Flex
        direction={{ base: "row" }}
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
        maxW="container.xl"
        mx="auto"
        gap={{ base: 4, md: 0 }}
      >
        <Image
          src={logo}
          alt="Innovation Brindes"
          h="40px"
        />
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "center" }}
          gap={{ base: 4, md: 6 }}
        >
          <HStack spacing={4} display={useBreakpointValue({ base: 'none', md: 'flex' })}>
            <IconButton
              aria-label="Messages"
              icon={<EmailIcon />}
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
            />
            <IconButton
              aria-label="Phone"
              icon={<PhoneIcon />}
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
            />
          </HStack>
          <Flex align="center" gap={3}>
            {useBreakpointValue({
              base: (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Menu"
                    icon={<HamburgerIcon />}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "whiteAlpha.200" }}
                  />
                  <MenuList>
                    <VStack align="center" spacing={0}>
                    <Avatar
                      size="sm"
                      align="center" 
                      name={user.nome_usuario}
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    />
                      <Text color="gray.500" fontWeight="medium">{user.nome_usuario}</Text>
                      <Text color="gray.500" fontSize="sm" opacity={0.8}>
                        {formatDate()}
                      </Text>
                    </VStack>
                    <MenuItem
                      color="gray.500"
                      icon={<EmailIcon />}
                      onClick={() => {}}
                    >
                      Mensagens
                    </MenuItem>
                    <MenuItem
                      color="gray.500"
                      icon={<PhoneIcon />}
                      onClick={() => {}}
                    >
                      Ligações
                    </MenuItem>
                    <MenuItem
                      color="gray.500"
                      icon={<BiLogOutCircle />}
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ),
              md: null,
            })}
            <IconButton
              aria-label="Logout"
              icon={<BiLogOutCircle />}
              variant="ghost"
              color="white"
              alt="Logout"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={handleLogout}
              display={useBreakpointValue({ base: "none", md: "flex" })}
            />
            <Avatar
              size="sm"
              display={useBreakpointValue({ base: "none", md: "flex" })}
              name={user.nome_usuario}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
            />
            <VStack align="start" spacing={0}>
              <Text display={useBreakpointValue({ base: "none", md: "flex" })} fontWeight="medium">{user.nome_usuario}</Text>
              <Text display={useBreakpointValue({ base: "none", md: "flex" })} fontSize="sm" opacity={0.8}>
                {formatDate()}
              </Text>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
