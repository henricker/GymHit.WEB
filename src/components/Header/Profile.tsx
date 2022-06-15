import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

type ProfileProps = {
  showProfileData: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Henrique Vieira</Text>
          <Text color="gray.300" fontSize="small">
            henriquevieira@alu.ufc.br
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Henrique Vieira"
        src="https://github.com/henricker.png"
      />
    </Flex>
  );
}
