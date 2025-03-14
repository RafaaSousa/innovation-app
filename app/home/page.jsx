'use client';

import {
  Box,
  Container,
  Grid,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Flex,
  Button,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';
import { motion } from 'framer-motion';
import { fetchProductsApi } from '../services/api';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const MotionGrid = motion.create(Grid);

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'none',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const fetchProducts = async (search = '') => {
    setIsLoading(true);
    try {
      const response = await fetchProductsApi(search);
      setProducts(response.data);
      applyFilters(response.data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar produtos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      if (error === 'Token not found') {
        router.push('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (productsToFilter) => {
    let filtered = [...productsToFilter];

    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
        break;
      case 'price-desc':
        filtered.sort((a, b) => parseFloat(b.preco) - parseFloat(a.preco));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const debouncedSearch = debounce((term) => {
    fetchProducts(term);
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  useEffect(() => {
    applyFilters(products);
  }, [filters, products]);

  const colorOptions = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#00FFFF', '#FFA500', '#800080', '#008000', '#000080'
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />

      <Container maxW="container.xl" py={8}>
        <VStack spacing={4} align="stretch">
          <Flex
            gap={4}
            direction={{ base: 'column', md: 'row' }}
          >
            <InputGroup size="lg" flex={1}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Buscar produtos..."
                bg="white"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
            <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  size="lg"
                  width={{ base: '100%', md: 'auto' }}
                >
                  Filtros
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setFilters({ sortBy: 'price-asc' })}>
                    Preço: Menor para Maior
                  </MenuItem>
                  <MenuItem onClick={() => setFilters({ sortBy: 'price-desc' })}>
                    Preço: Maior para Menor
                  </MenuItem>
                  <MenuItem onClick={() => setFilters({ sortBy: 'name-asc' })}>
                    Nome: A-Z
                  </MenuItem>
                  <MenuItem onClick={() => setFilters({ sortBy: 'name-desc' })}>
                    Nome: Z-A
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          <Text color="gray.600">
            {filteredProducts.length} produto(s) encontrado(s)
          </Text>

          {filteredProducts.length === 0 ? (
            <Box textAlign="center" py={10}>
              <Text fontSize="xl" color="gray.500">
                Nenhum produto encontrado
              </Text>
            </Box>
          ) : (
            <MotionGrid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(5, 1fr)',
              }}
              gap={4}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.codigo}
                  product={product}
                  colorOptions={colorOptions}
                  onProductClick={handleProductClick}
                  index={index}
                />
              ))}
            </MotionGrid>
          )}
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent margin={4}>
        <ModalHeader>{selectedProduct?.nome}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Image
              src={selectedProduct?.imagem}
              alt={selectedProduct?.nome}
              width="100%"
              height="300px"
              objectFit="contain"
              bg="white"
            />
            <Box>
              <Text fontWeight="bold" mb={2}>Informações do Produto:</Text>
              <Text>Código: {selectedProduct?.codigo}</Text>
              <Text>Referência: {selectedProduct?.referencia}</Text>
              <Text>Categoria: {selectedProduct?.codigo_categoria}</Text>
              <Text>Descrição: {selectedProduct?.descricao}</Text>
              <Text fontSize="xl" color="brand.500" fontWeight="bold" mt={4}>
                R$ {selectedProduct && Number(selectedProduct.preco).toFixed(2)}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>Cores disponíveis:</Text>
              <Flex wrap="wrap" gap={2}>
                {colorOptions.map((color, index) => (
                  <Box
                    key={index}
                    w="24px"
                    h="24px"
                    borderRadius="full"
                    bg={color}
                    cursor="pointer"
                  />
                ))}
              </Flex>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  </Box>
);
}