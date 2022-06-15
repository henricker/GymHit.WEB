import { Box, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type NavigationSectionProps = {
  title: string;
  children: ReactNode;
};

export function NavigationSection({
  children,
  title,
}: NavigationSectionProps): JSX.Element {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
