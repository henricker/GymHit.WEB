import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
  RiMoneyCnyBoxFill,
} from 'react-icons/ri';
import { NavigationSection } from './NavigationSection';
import { NavLink } from './NavLink';

export function NavigationBar(): JSX.Element {
  return (
    <Stack spacing="12" align="flex-start">
      <NavigationSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink icon={RiContactsLine} href="/alunos">
          Alunos
        </NavLink>
        <NavLink icon={RiContactsLine} href="/instructors">
          Instrutores
        </NavLink>
        <NavLink icon={RiMoneyCnyBoxFill} href="/payments">
          Pagamentos
        </NavLink>
      </NavigationSection>
      <NavigationSection title="ACADEMIA">
        <NavLink icon={RiInputMethodLine} href="/forms">
          Equipamentos
        </NavLink>
        <NavLink icon={RiGitMergeLine} href="/automation">
          Pendências
        </NavLink>
      </NavigationSection>
    </Stack>
  );
}
