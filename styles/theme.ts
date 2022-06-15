import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig  } from 'chakra-ui-steps';

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: props => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      label: {
        ...StepsStyleConfig.baseStyle(props).label,
        // your custom styles here
        color: '#FFFF'
      },
      stepIconContainer: {
        ...StepsStyleConfig.baseStyle(props).stepIconContainer,
        bg: '#F54A48',
      } 
    };
  },
};



export const theme = extendTheme({
  components: {
    Steps: CustomSteps,
  },
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
  
});
