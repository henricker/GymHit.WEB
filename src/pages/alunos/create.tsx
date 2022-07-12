import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';
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
import { FormEvent, useEffect, useState } from 'react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { InputImage } from '../../components/Form/InputImage';

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
  weight: yup.number().required('Peso é requerido').positive("Altura deve ser positiva"),
  height: yup.number().required('Altura é requerido').positive("Altura deve ser positiva")
});

export default function Create(): JSX.Element {
  const nextRouter = useRouter();
  const auth = useAuth();
  const [studentId, setStudentId] = useState(null);

  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });


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
          admin_id: auth.user.id || auth.getAuth().id,
        }, {
          headers: {
            Authorization: `Bearer ${auth.user.accessToken}`
          }
        });
        setStudentId(response.data.id);
        toast({
          status: 'success',
          title: 'Informações básicas adicionadas com sucesso!',
          position: 'top-left',
          onCloseComplete: async () => {
            nextStep();
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

  const basicInfoUserForm = (
    <Box
    as="form"
    flex="1"
    borderRadius={8}
    bg="gray.800"
    p={['6', '8']}
    onSubmit={handleSubmit(handleSubmitUser)}
    mt="-2rem"
  >
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
        <Button as="a" colorScheme="whiteAlpha" disabled={activeStep === 0} onClick={() => {
          if(activeStep > 0) {
            prevStep()
          }
        }}>
          Voltar
        </Button>
        <Button bg="#F54A48" type="submit">
          Salvar
        </Button>
      </HStack>
    </Flex>
  </Box>
  )

  async function onSubmitImage(event: FormEvent) {
    event.preventDefault();
    const file = event.target[0].files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      await api.post(`/pupils/image/${studentId}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.user.accessToken || auth.getAuth().accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast({
        status: 'success',
        title: 'Foto adicionada com sucesso!',
        position: 'top-left',
        onCloseComplete: async () => {
          nextRouter.push(`/alunos`);
        },
        duration: 1000
      })
    } catch(err) {
      console.log(err.response.data);
    }

  }

  const formImage = (
    <Box
      as="form"
      flex="1"
      borderRadius={8}
      bg="gray.800"
      p={['6', '8']}
      encType="multipart/form-data"
      onSubmit={onSubmitImage}
      mt="-2rem"

    >
        <Box width="50%" margin="0 auto">
          <Divider my="6" borderColor="gray.700" />
          <InputImage name={'image'} label={'Foto do aluno'} bg="gray.800" _hover={{bg: "gray.800"}} labelSize="1.5rem"/>
        </Box>
        <Button mt="2rem" bg="#F54A48" type="submit" margin="0 auto">
            Enviar
        </Button>
    </Box>
  )

  const steps = [
    { label: 'Informações básicas', content: basicInfoUserForm },
    { label: 'Outras informações', content: formImage },
  ] 

  return (
    <Box>
    <Header />
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar />

      <Box flex="1" px="6">
      <Steps
        activeStep={activeStep}
        bg="gray.800"
        paddingTop="1rem"
        paddingEnd="1rem"
        paddingStart="1rem"
      > 
        {steps.map(({ label, content }) => (
            <Step key={label} label={label} >
                { content }
            </Step>
        ))}
      </Steps>
      </Box>

    </Flex>
  </Box>

  );
}
