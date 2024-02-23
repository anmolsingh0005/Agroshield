import { Box, Flex } from '@chakra-ui/react'
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function Register() {

    const [login,setlogin] = useState(true);

  return (
    <div id='signup' >
    <Flex color='white' display={{base:'none',md:'flex',lg:'flex'}} width={'50vw'} ml={'10rem'} mt={'20rem'} fontSize={'5rem'} >
        Sign up to<br></br> Explore our <br></br> Website
        
    </Flex>
    {
      (login)?
            <Box   as={'Flex'} borderRadius={'2rem'}  color={'black'} ml={{base:'3rem',md:'0rem',lg:'0rem'}} mr='10rem' backgroundColor={'whiteAlpha.700'} mt={'5rem'} mb='5rem' justifyContent={'center'} >
            <Flex justifyContent={'center'} >
            <Signup/>

            </Flex>
            <Flex mb={'3rem'} justifyContent={'center'}  fontSize='1.3rem' >
                  <Flex>Already a member?</Flex>
                  <Link to={'/'} >
                  <Flex onClick={()=>{setlogin(false)}}  >Log in</Flex>
                  </Link>
                  </Flex>  
            </Box>:

              <Box  ml={{base:'3rem',md:'0rem',lg:'0rem'}} as={'Flex'} borderRadius={'2rem'}  color={'black'} mr='10rem' backgroundColor={'whiteAlpha.700'} mt={'5rem'} mb='5rem' justifyContent={'center'} >
              <Flex justifyContent={'center'} >
              <Login/>

              </Flex>
              <Flex justifyContent={'center'} mb='3rem'  fontSize='1.3rem' >
                    <Flex>Not on Agroshield yet?</Flex>
                    <Link to={'/'} >
                    <Flex onClick={()=>{setlogin(true)}}  >Sign up</Flex>
                    </Link>
                    </Flex>  
              </Box>
    }
       
  </div>
  )
}

export default Register