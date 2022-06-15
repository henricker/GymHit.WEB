import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as Inputchakra,
  InputProps as InputChakraProps,
  TypographyProps,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputChakraProps {
  name: string;
  label?: string;
  mask?: (value: string) => string;
  error?: FieldError | null;
  labelColor?: string;
  labelSize?: string | number;
  labelWeight?: string;
  marginTopLabel?: number | string;
  marginBottomLabel?: number | string;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, error = null, labelColor, labelSize, labelWeight, marginTopLabel, marginBottomLabel, mask, ...rest }: InputProps, ref): JSX.Element => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name} fontSize={labelSize} color={labelColor} fontWeight={labelWeight} mt={marginTopLabel} mb={marginBottomLabel} >{label}</FormLabel>}
      <Inputchakra
        name={name}
        type="email"
        id="email"
        focusBorderColor="#F54A48"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900',
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      <FormErrorMessage>{!!error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

// Made ref to using on children components
export const Input = forwardRef(InputBase);
