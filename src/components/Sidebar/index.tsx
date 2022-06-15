import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useSidebarDrawer } from '../../context/SidebarDrawerContext';
import { NavigationBar } from './SidebarNav';

export function Sidebar(): JSX.Element {
  const { onClose, isOpen } = useSidebarDrawer();

  const drawerIsActive = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (drawerIsActive) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton mt="6" />
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>
            <NavigationBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <NavigationBar />
    </Box>
  );
}
