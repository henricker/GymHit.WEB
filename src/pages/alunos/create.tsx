import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
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
import { useEffect, useState } from 'react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { CheckBox } from '../../components/Form/CheckBox';
import { BodyComponent } from 'reactjs-human-body'

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
  const auth = useAuth();

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

  const firstFormStep = (
    <Flex width='100%'>
      <Box width='45%' mr='10%'>
          <Input
              name="name"
              id="name"
              error={errors?.name}
              type="email"
              labelColor='#7C7C7C'
              labelWeight='semibold'
              label="Nome completo"
              {...register('name')}
          />
          <Input
              name="cpf"
              marginTopLabel='1rem'
              id="cpf"
              error={errors?.cpf}
              labelColor='#7C7C7C'
              type="text"
              labelWeight='semibold'
              label="CPF"
              {...register('cpf')}
          />
      </Box>
      <Box width='45%'>
          <Input
              name="telephone"
              id="telephone"
              error={errors?.telephone}
              labelColor='#7C7C7C'
              labelWeight='semibold'
              label="Celular"
              {...register('telephone')}
          />
          <Input
              name="email"
              marginTopLabel='1rem'
              id="email"
              error={errors?.email}
              labelColor='#7C7C7C'
              labelWeight='semibold'
              label="E-mail"
              {...register('email')}
          />
      </Box>
  </Flex>
  );

  const secondStepRegister = (
    <HStack width='100%' spacing="4">
        <Input
            name="weight"
            id="weight"
            error={errors?.weight}
            type="text"
            labelColor='#7C7C7C'
            labelWeight='semibold'
            label="Peso"
            {...register('weight')}
        />
        <Input
            name="height"
            id="height"
            error={errors?.height}
            labelColor='#7C7C7C'
            type="text"
            labelWeight='semibold'
            label="Altura"
            {...register('height')}
        />
  </HStack>
  );

  const thirdStepRegister = (
    <Flex width='100%' direction="column" textAlign="center">
      <Heading fontWeight='600' size="3rem">Marque se você possui algum problema de saúde</Heading>
        <CheckBox
          register={register}
          props={{name: 'smoker', id: 'smoker'}}
          boxProps={{ mt: '1rem', mb: '1rem' }}
          question="Fuma ou já fumou?"
        />
        <hr/>
        <CheckBox
          register={register}
          question="Tem diabetes?"
          boxProps={{ mt: '1rem', mb: '1rem' }}
          props={{ name: "diabetes", id: "diabetes" }}
        />
        <hr/>
        <CheckBox
          register={register}
          question="Problema respiratório?"
          boxProps={{ mt: '1rem', mb: '1rem' }}
          props={{ name: "respiratory_problem", id: "respiratory_problem"}}
        />
        <hr/>
        <CheckBox
          register={register}
          boxProps={{ mt: '1rem', mb: '1rem' }}
          question="Possui ou alguém da família tem alguma doença crônica?"
          props={{ name: 'chronic_disease' }}
        />
    </Flex>
  );

  const fourtyStepRegister = (
    <Flex width="100%" direction="column" alignItems="center" justifyContent="center">
      <Box flexDirection="row" display="flex" gap="2rem" mb="2rem" >
      <Input
            name='chest'
            id="chest"
            type="number"
            label='Peito'
            width="10rem"
            height="2.5rem"
            labelSize=".8rem"
          />
          <Input
            name='shoulder'
            id="shoulder"
            type="number"
            label='Ombro'
               height="2.5rem"
            width="10rem"
            labelSize=".8rem"
          />
      </Box>
      <Box flexDirection="row" display="flex" gap="2rem" mb="2rem" >
          <Input
            name='biceps_left'
            id="bicepts_left"
            type="number"
            label='Bíceps esquerdo'
            width="10rem"
            height="2.5rem"
            labelSize=".8rem"
          />
          <Input
            name='biceps_right'
            id="bicepts_right"
            type="number"
            label='Bíceps direito'
            width="10rem"
            height="2.5rem"
            labelSize=".8rem"
          />
      </Box>
      <Box flexDirection="row" display="flex" gap="2rem" mb="2rem" >
        <Input
            name='stomach'
            id="stomach"
            type="number"
            label='Barriga'
            width="10rem"
            height="2.5rem"
            labelSize=".8rem"
          />
      </Box>
      <Box flexDirection="row" display="flex" gap="2rem" mb="2rem" >
      <Input
            name='leg_left'
            id="leg_left"
            type="number"
            label='Coxa esquerda'
            width="10rem"
            height="2.5rem"
            labelSize=".8rem"
          />
          <Input
            name='leg_right'
            id="leg_right"
            type="number"
            label='Coxa direita'
            width="10rem"
            height="2.5rem"
            labelSize=".8rem"
          />
          <Input
            name='calf_left'
            id="calf_left"
            type="number"
            label='Panturrilha esquerda'
            width="10rem"
            height="2.5rem"
            labelSize=".8rem"
          />
          <Input
            name='calf_right'
            id="calf_right"
            type="number"
            label='Panturrilha direita'
            width="10rem"
            height="2.5rem"
            labelSize=".8rem"
          />
      </Box>
    </Flex>
  )

  
  const steps = [
    { label: 'Dados básicos', content: firstFormStep },
    { label: 'Dados corpóreos', content: secondStepRegister },
    { label: 'Saúde', content: thirdStepRegister },
    { label: 'Medidas corpóreas', content: fourtyStepRegister }
]

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
            <Steps
                  activeStep={activeStep}
              > 
                  {steps.map(({ label, content }) => (
                      <Step key={label} label={label} >
                          { content }
                      </Step>
                  ))}
              </Steps>
          </VStack>
          <Flex  mt="8" justify={['center', 'center', 'flex-end']}>
            <HStack spacing={4}>
            <Button
              type="button"
              isDisabled={activeStep === 0}
              colorScheme="whiteAlpha"
              onClick={prevStep}
            >
                    Voltar
            </Button>
            <Button
              type={activeStep === steps.length ? 'submit' : 'button'}
              backgroundColor='#F54A48'
              isLoading={formState.isSubmitting}
              onClick={() => {

                  if(activeStep < steps.length - 1) {
                      nextStep();
                  }

                  if(activeStep + 1 === steps.length) {
                      handleSubmit(handleSubmitUser)()
                  }
              }}
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
            </HStack>
            </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
