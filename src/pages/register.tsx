import { Grid, Flex, Box, Heading, Stack } from "@chakra-ui/layout";
import { Button, Image, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { Input } from "../components/Form/Input";
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../services/axios";
import { useRouter } from 'next/router';
import { useAuth } from "../context/AuthContext";

const RegisterSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    telephone: yup.string().matches(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/, 'Celular inválido').required('Celular obrigatório'),
    password: yup.string().required('Senha obrigatória'),
    cnpj: yup.string().matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'CNPJ inválido'),
    fantasy_name: yup.string().required('Nome fantasia é obrigatório'),
    coorporate_name: yup.string().required('Nome fantasia é obrigatório'),
    street: yup.string().required('Rua é obrigatório'),
    district: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
});

type RegisterFormData = {
    email: string;
    password: string;
    telephone: string;
    cnpj: string;
    fantasy_name: string;
    coorporate_name: string;
    street: string;
    city: string;
    number: string;
    district: string;
};

export default function Register() {
    const { nextStep, prevStep, activeStep } = useSteps({
        initialStep: 0,
    });

    const router = useRouter();

    const auth = useAuth();

    const toast = useToast();

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(RegisterSchema)
    });

    const { errors } = formState;

    const handleSignIn: SubmitHandler<RegisterFormData> = async (values): Promise<void> => {
        try {
            if(Object.keys(errors).length > 0) {
                toast({
                    title: 'Erros no formulário',
                    description: "Corrija os erros no formulário e reenvie",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                  })
                  return;
            }
            const response = await api.post('/admins', values);

            auth.login({ 
                accessToken: response.data.accessToken, 
                email: response.data.email, 
                profile_url: null, 
                fantasy_name: response.data.fantasy_name,
                id: response.data.id,
            });

            toast({
                title: 'Academia cadastrada com sucesso!',
                status: 'success',
                duration: 1000,
                isClosable: true
            });

            router.push('/dashboard')
        } catch(err) {
            toast({
                title: 'Erro ao cadastrar academia',
                description: "Tente novamente mais tarde",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
     
    };

    useEffect(() => {
        console.log(errors)
    }, [errors])

    const firstFormStep = (
        <Flex width='100%'>
            <Box width='45%' mr='10%'>
                <Input
                    name="email"
                    id="email"
                    error={errors?.email}
                    type="email"
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="Endereço de email"
                    {...register('email')}
                />
                <Input
                    marginTopLabel='1rem'
                    name="password"
                    id="password"
                    error={errors?.password}
                    labelColor='#7C7C7C'
                    type="password"
                    labelWeight='semibold'
                    label="Senha"
                    {...register('password')}
                />
            </Box>
            <Box width='45%'>
                <Input
                    name="telephone"
                    id="telephone"
                    error={errors?.telephone}
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="Telefone"
                    {...register('telephone')}
                />
            </Box>
        </Flex>
    )

    const secondFormStep = (
        <Flex width='100%'>
            <Box width='45%' mr='10%'>
                <Input
                    name="coorporate_name"
                    id="coorporate_name"
                    error={errors?.coorporate_name}
                    type="email"
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="Nome corporativo"
                    {...register('coorporate_name')}
                />
                <Input
                    marginTopLabel='1rem'
                    name="fantasy_name"
                    id="fantasy_name"
                    error={errors?.fantasy_name}
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="Nome fantasia"
                    {...register('fantasy_name')}
                />
            </Box>
            <Box width='45%'>
                <Input
                    name="cnpj"
                    id="cnpj"
                    error={errors?.cnpj}
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="CNPJ"
                    {...register('cnpj')}
                />
            </Box>
        </Flex>
    )

    const thirdFormStep = (
        <Flex width='100%'>
            <Box width='45%' mr='10%'>
                <Input
                    name="address_street"
                    id="address_street"
                    error={errors?.street}
                    type="email"
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="Rua"
                    {...register('street')}
                />
                <Input
                    marginTopLabel='1rem'
                    name="address_district"
                    id="address_district"
                    error={errors?.district}
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="Bairro"
                    {...register('district')}
                />
            </Box>
            <Box width='45%'>
                <Input
                    name="number"
                    id="number"
                    error={errors?.number}
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="Número"
                    {...register('number')}
                />

                <Input
                    marginTopLabel='1rem'
                    name="city"
                    id="city"
                    error={errors?.city}
                    labelColor='#7C7C7C'
                    labelWeight='semibold'
                    label="Cidade"
                    {...register('city')}
                />
            </Box>
        </Flex>
    )

    const steps = [
        { label: 'Usuário', content: firstFormStep },
        { label: 'Empresa', content: secondFormStep },
        { label: 'Endereço', content: thirdFormStep }
    ]

    return (
        <Grid width='100vw' height='100vh' gridTemplateColumns='1.1fr 0.9fr'>
            <Flex
                as="form"
                width="100%"
                maxWidth='100%'
                bg="gray.800"
                padding="8"
                borderRadius={8}
                flexDir="column"
            >
            <Image src='logo.svg' width={200} height={200} mt='-5rem' mb='2rem'/>
            <Box ml='2rem'>
            <Box mt='-3rem'>
                <Heading size='lg' fontWeight='semibold' mb='1.5rem' fontSize='2.37rem'>
                Cadastre sua academia!
                </Heading>
                <Heading fontWeight='semibold' fontSize='.75rem' color='#A2A2A2' mb='3rem'>
                Iremos lhe ajudar a gerenciar sua academia!
                </Heading>
            </Box>
            <Stack spacing={6}>
                <Steps
                    activeStep={activeStep}
                > 
                    {steps.map(({ label, content }) => (
                        <Step key={label} label={label} >
                            { content }
                        </Step>
                    ))}
                </Steps>
            </Stack>
            <Flex flexDirection='row' justifyContent='space-between'>
                <Button
                    type="button"
                    mt="6"
                    isDisabled={activeStep === 0}
                    backgroundColor='#F54A48'
                    width='40%'
                    onClick={prevStep}
                    mb="3.82rem"
                >
                    Voltar
                </Button>
                <Button
                    type={activeStep === steps.length ? 'submit' : 'button'}
                    mt="6"
                    backgroundColor='#F54A48'
                    width='40%'
                    isLoading={formState.isSubmitting}
                    mb="3.82rem"
                    onClick={() => {

                        if(activeStep < steps.length - 1) {
                            nextStep();
                        }

                        if(activeStep + 1 === steps.length) {
                            handleSubmit(handleSignIn)()
                        }
                    }}
                >
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
            </Flex>
            <Heading fontSize='0.875rem' fontWeight='medium'>
                Já possui uma conta? <Heading cursor='pointer' display='inline' fontSize='0.875rem' color='#F54A48' fontWeight='medium' onClick={() => router.push('/')}>Faça login</Heading>  
            </Heading>
            </Box>
            </Flex>
            <Box backgroundImage='gym.svg' backgroundPosition='center' backgroundSize='cover'/>
        </Grid>
    );
}