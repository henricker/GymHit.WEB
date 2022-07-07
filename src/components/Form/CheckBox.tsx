import { Box, BoxProps, Checkbox, CheckboxProps, Heading } from "@chakra-ui/react";

type CheckBoxType = {
    register: any;
    question: string;
    props: CheckboxProps
    boxProps?: BoxProps
}

export function CheckBox({ register, question, props, boxProps }: CheckBoxType) {
    return (
        <Box flexDirection="row" mr="auto" display="flex" alignItems="center" justifyContent="center" {...boxProps}>
            <Heading size=".8rem" fontWeight="thin" mr="1rem">{question}</Heading>
            <Checkbox
                {...register(props.name)}
                {...props}
            />
        </Box>
    )
}