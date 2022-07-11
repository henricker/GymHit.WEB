/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { MdOutlineRemoveCircleOutline } from 'react-icons/md';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import { getUsers, useUsers } from '../../services/hooks/useUsers';
import { SearchBox } from '../../components/Header/SearchBox';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { ModalDetails } from '../../components/alunos/ModalDetails';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/axios';

export default function Users({ users }): JSX.Element {
  const [page, setPage] = useState(1);
  const [pattern, setPattern] = useState<string>(null);
  const [pupilId, setPupilId] = useState<number>(null);
  const {isOpen, onOpen, onClose } = useDisclosure();
  const [pupil, setPupil] = useState(null);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const { data, isLoading, error, isFetching, refetch } = useUsers(page, {
    initialData: users,
  }, pattern);

  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const user = auth.getAuth();
    if(!user) {
      router.push('/');
    }
  }, []);

  async function handlePrefetchUser(user_id: number): Promise<void> {
    await queryClient.prefetchQuery(
      ['user', user_id],
      async () => {
        const response = await api.get(`pupils/${user_id}`);
    
        setPupil(response.data);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }

  useEffect(() => {
    pupilId && handlePrefetchUser(pupilId);
  }, [pupilId]);

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Alunos
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <SearchBox placeholder='Busca por nome/CPF' inputBg='gray.200' exec={setPattern}/>
            <NextLink href="/alunos/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                bg="#F54A48"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Matricular
              </Button>
            </NextLink>
          </Flex>
          <ModalDetails
            finalRef={finalRef}
            initialRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
            key="modal-details"
            pupil={pupil}
            onOpen={onOpen}
          />
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos alunos.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" overflowX="scroll">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    <Th>Data de cadastro</Th>
                    <Th width="8">Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onClick={() => {
                              setPupilId(user.id)
                            }}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.cpf}
                          </Text>
                        </Box>
                      </Td>
                      <Td>{user.createdAt}</Td>
                      <Td>
                        <HStack>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            Editar
                          </Button>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={
                              <Icon
                                as={MdOutlineRemoveCircleOutline}
                                fontSize="16"
                              />
                            }
                          >
                            Remover
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                onChangePage={setPage}
                currentPage={page}
                totalCountOfRegisters={data.totalCount}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<any>
> => {
  const { users, totalCount } = await getUsers(1);

  return {
    props: {
      users,
    },
  };
};
