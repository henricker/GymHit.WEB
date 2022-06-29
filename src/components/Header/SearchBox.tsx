import { Flex, Icon, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

type SearchBoxType = {
  placeholder: string;
  inputBg?: string;
  exec?: (pattern: string) => void;
}

export function SearchBox({ placeholder, inputBg, exec }: SearchBoxType): JSX.Element {
  const [pattern, setPattern] = useState<string>(null);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        onChange={(event) => setPattern(event.target.value)}
        color={inputBg ?? 'gray.50'}
        variant="unstyled"
        px="4"
        mr="4"
        placeholder={ placeholder }
        _placeholder={{ color: 'gray.400' }}
      />

      <Icon as={RiSearchLine} cursor="pointer" onClick={() => exec(pattern)}/>
    </Flex>
  );
}
