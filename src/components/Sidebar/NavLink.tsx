import {
  Icon,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

import { ElementType } from 'react';
import { ActiveLink } from '../ActiveLink';

type NavLinkProps = {
  children: string;
  icon: ElementType;
  href: string;
} & ChakraLinkProps;

export function NavLink({
  icon,
  children,
  href,
  ...rest
}: NavLinkProps): JSX.Element {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
