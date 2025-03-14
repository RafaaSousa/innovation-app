// app/components/ProductCard.jsx
import {
  Box,
  Card,
  CardBody,
  Image,
  Text,
  VStack,
  Flex,
  Button,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionCard = motion.create(Card);

export default function ProductCard({ product, colorOptions, onProductClick, index }) {
  return (
    <MotionCard
      key={product.codigo}
      maxW="sm"
      position="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Box position="relative" height="200px">
        <Image
          src={product.imagem}
          alt={product.nome}
          width="100%"
          height="100%"
          objectFit="contain"
          bg="white"
        />
        <Badge
          colorScheme="cyan"
          position="absolute"
          top={2}
          right={2}
          fontSize="xs"
        >
          EXCLUSIVO!
        </Badge>
      </Box>
      <CardBody p={4}>
        <VStack spacing={2} align="stretch">
          <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
            {product.nome}
          </Text>
          <Box>
            <Text fontSize="xs" color="gray.500" mb={2}>
              Cores:
            </Text>
            <Flex wrap="wrap" gap={1}>
              {colorOptions.map((color, index) => (
                <Box
                  key={index}
                  w="12px"
                  h="12px"
                  borderRadius="full"
                  bg={color}
                  cursor="pointer"
                />
              ))}
            </Flex>
          </Box>
          <Text fontSize="sm" color="gray.500">
            a partir de
          </Text>
          <Text color="brand.500" fontSize="lg" fontWeight="bold">
            R$ {Number(product.preco).toFixed(2)}
          </Text>
          <Button
            colorScheme="brand"
            size="sm"
            width="100%"
            _hover={{
              bg: "green",
              color: "white",
            }}
            onClick={() => onProductClick(product)}
          >
            CONFIRA
          </Button>
        </VStack>
      </CardBody>
    </MotionCard>
  );
}