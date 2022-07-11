import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { theme } from '../../styles/theme';
import { Header } from '../components/Header';

import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

// This data is fake, just to build dashboard graphs
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2022-07-07T00:00:00.000Z',
      '2022-07-08T00:00:00.000Z',
      '2022-07-09T00:00:00.000Z',
      '2022-07-10T00:00:00.000Z',
      '2022-07-11T00:00:00.000Z',
      '2022-07-12T00:00:00.000Z',
      '2022-07-13T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: 'newStudentsGym',
    data: [9, 2, 0, 0, 5, 9, 1],
  },
];

const seriesTotalGains = [
  {
    name: 'gains',
    data: [540, 120, 0, 0, 300, 540, 60]
  }
]

export default function Dashboard(): JSX.Element {

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const user = auth.getAuth();
    if(!user) {
      router.push('/');
    }
  }, [])

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px">
          <Box p={['6', '8']} bg="gray.800" borderRadius={8}>
            <Text>Inscritos da semana</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p={['6', '8']} bg="gray.800" borderRadius={8}>
            <Text>Ganhos da semana</Text>
            <Chart options={options} series={seriesTotalGains} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
