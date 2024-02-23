import { Box,  Flex} from '@chakra-ui/react'
import React from 'react'
import './Landing.css'
import Register from './Register'




function Landingpage() {

  

  return (
    <div id='main' >
      <div id='image'  >
      <Flex className='head' justifyContent={{base:'center',md:'left',lg:'left'}} ml={'5%'} fontSize={{ base: '24px', md: '40px', lg: '56px' }} mt='13rem' >
      Empowering farmers
      <br></br>
       for a brighter future.
      </Flex>
      <Flex mt={'1rem'} justifyContent={{base:'center',md:'left',lg:'left'}} fontSize={{ base: '1.7rem', md: '2rem', lg: '2rem' }}  >
        <Box fontWeight={{base:'500',md:'100',lg:'100'}} color={{base:'green.800',md:'black',lg:'black'}} width={{base:'100vw',md:'50vw',lg:'50vw'}} >
      Get expert guidance on pest management by using our website for all your farming needs.
      Whether you're interested in urban farming, homesteading, or large-scale agriculture,  our website has everything you need to succeed and thrive.
      </Box>
      </Flex>
      </div>
      <Register/>





    </div>
  )
}

export default Landingpage