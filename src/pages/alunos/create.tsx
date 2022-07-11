import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
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
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

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
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  weight: yup.number().required('Peso é requerido'),
  height: yup.number().required('Altura é requerido')
});

export default function Create(): JSX.Element {
  const nextRouter = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const user = auth.getAuth();
    if(!user) {
      nextRouter.push('/');
    }
  }, []);

  const toast = useToast();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      try {
        const response = await api.post('pupils', {
          ...user,
          admin_id: auth.user.id,
        }, {
          headers: {
            Authorization: `Bearer ${auth.user.accessToken}`
          }
        });

        toast({
          status: 'success',
          title: 'Aluno matriculado com sucesso!',
          position: 'top-left',
          onCloseComplete: async () => {
            await nextRouter.push('/alunos');
          },
          duration: 1000
        })
  
        return response.data.user;
      } catch(err) {
        toast({
          title: 'Erro ao matrícular aluno',
          duration: 1000,
          status: 'warning',
          position: 'top-start'
        })
      }

    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('pupils');
      },
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserSchema),
  });

  const handleSubmitUser: SubmitHandler<CreateUserFormData> = async values => {
    await createUser.mutateAsync(values);
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
                {...register('telephone')}
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
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="weight"
                label="Peso (kg)"
                type="text"
                {...register('weight')}
                error={errors.weight}
              />
              <Input
                name="height"
                label="Altura (m)"
                type="text"
                {...register('height')}
                error={errors.height}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify={['center', 'center', 'flex-end']}>
            <HStack spacing="4">
              <Link href="/alunos" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>

              <Button bg="#F54A48" type="submit">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
