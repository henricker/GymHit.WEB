import {  Flex, FormControl, FormLabel, Image, Input, InputProps as InputChakraProps, } from "@chakra-ui/react"
import React, { ForwardRefRenderFunction, useState } from "react"
import { FieldError } from "react-hook-form";

interface InputProps extends InputChakraProps {
    name: string;
    label: string;
    error?: FieldError | null;
    labelColor?: string;
    labelSize?: string | number;
    labelWeight?: string;
    marginTopLabel?: number | string;
    marginBottomLabel?: number | string;
}
 
 export const InputImage: ForwardRefRenderFunction<
 HTMLInputElement,
 InputProps
> = ({ label, name, labelSize, labelColor, labelWeight, marginTopLabel, marginBottomLabel, ...rest }: InputProps, ref): JSX.Element => {
    const [file, setFile] = useState(null);

    function handleChangeFileImage(event: React.ChangeEvent<HTMLInputElement>) {
         console.log(event.target.files);
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <FormControl>
            {label && <FormLabel htmlFor={name} fontSize={labelSize} color={labelColor} fontWeight={labelWeight} mt={marginTopLabel} mb={marginBottomLabel} >{label}</FormLabel>}
            <Flex direction='row' alignItems='center' >
                <Image src={file ?? './input/enter.png'} width='4rem' height='4rem' borderRadius='1rem'/>
                <Input
                    fontSize='1rem'
                    name={name}
                    onChange={handleChangeFileImage}
                    type="file"
                    focusBorderColor="#F54A48"
                    bgColor="gray.900"
                    _hover={{
                        bgColor: 'gray.900',
                      }}
                      variant="filled"
                      size="lg"
                />
            </Flex>
        </FormControl>
    )
 }