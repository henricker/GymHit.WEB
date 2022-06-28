import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

type ProfileProps = {
  showProfileData: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
  const auth = useAuth();
 
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{ auth.user?.fantasy_name ?? auth.getAuth()?.fantasy_name }</Text>
          <Text color="gray.300" fontSize="small">
            { auth.user.email ?? auth.getAuth()?.email }
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Henrique Vieira"
        src="https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize/2014/09/19/09/Logo-LV-80702_2750_044514432_2097143041.jpg"
      />
    </Flex>
  );
}
