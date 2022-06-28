import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/axios';
import { queryClient } from '../../services/queryClient';

type CreateUserFormData = {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
};

const CreateUserSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
  telephone: yup.string().matches(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/, 'Celular inválido').required('Celular obrigatório'),
  email: yup.string().required('Email é obrigatório').email('Email inválido')
});

export default function Create(): JSX.Element {
  const nextRouter = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('pupils', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('users');
      },
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserSchema),
  });

  const handleSubmitUser: SubmitHandler<CreateUserFormData> = async values => {
    await createUser.mutateAsync(values);

    await nextRouter.push('/users');
  };

  const { errors } = formState;

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleSubmitUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Matricular aluno
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="name"
                label="Nome completo"
                {...register('name')}
                error={errors.name}
              />
              <Input
                name="cpf"
                label="CPF"
                {...register('cpf')}
                error={errors.cpf}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="telephone"
                label="Celular"
                type="text"
                {...register('password')}
                error={errors.telephone}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify={['center', 'center', 'flex-end']}>
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>

              <Button colorScheme="pink" type="submit">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
