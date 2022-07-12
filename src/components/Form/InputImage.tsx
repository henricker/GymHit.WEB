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
    formControlWidth?: number | string;
    formControlMargin?: string;
    register?: any;
}
 
 export const InputImage: ForwardRefRenderFunction<
 HTMLInputElement,
 InputProps
> = ({ label, name, labelSize, labelColor, labelWeight, marginTopLabel, marginBottomLabel, formControlWidth, formControlMargin, register, ...rest }: InputProps, ref): JSX.Element => {
    const [file, setFile] = useState(null);

    function handleChangeFileImage(event: React.ChangeEvent<HTMLInputElement>) {
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <FormControl width={formControlWidth} margin={formControlMargin}>
            {label && <FormLabel htmlFor={name} fontSize={labelSize} color={labelColor} fontWeight={labelWeight} mt={marginTopLabel} mb={marginBottomLabel} >{label}</FormLabel>}
            <Flex direction='row' alignItems='center' justifyContent="space-between" width="100%">
                <Image src={file ?? 'https://cdn2.iconfinder.com/data/icons/image-editing-6/1000/Image_Edit-14-512.png'} width='10rem' height='10rem' borderRadius='1rem'/>
                <Input
                    fontSize='1rem'
                    name={name}
                    onChange={handleChangeFileImage}
                    type="file"
                    focusBorderColor="#F54A48"
                    variant="filled"
                    size="lg"
                    {...rest}
                />
            </Flex>
        </FormControl>
    )
 }