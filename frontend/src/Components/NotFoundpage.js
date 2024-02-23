import Spline from '@splinetool/react-spline'



import { Box,Flex} from "@chakra-ui/react";


const NotFoundPage = () => {
    return (
      <Box textAlign="center">
        <Flex minH={'100vh'} h={'100vh'} w={'100vw'} >
        <Spline 
        
        scene='https://prod.spline.design/s-Ju3hpzU123GPax/scene.splinecode'
        />
        </Flex>
      </Box>
    );
  };

  export default NotFoundPage;