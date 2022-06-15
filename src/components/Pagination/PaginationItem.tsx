import { Button } from '@chakra-ui/react';

type PaginationItemProps = {
  number: number;
  isCurrent?: boolean;
  onChangePage: (page: number) => void;
};

export function PaginationItem({
  number,
  isCurrent = false,
  onChangePage,
}: PaginationItemProps): JSX.Element {
  return (
    <>
      {isCurrent ? (
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          disabled
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          {number}
        </Button>
      ) : (
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          bg="gray.700"
          _hover={{
            bg: 'gray.500',
          }}
          onClick={() => onChangePage(number)}
        >
          {number}
        </Button>
      )}
    </>
  );
}
