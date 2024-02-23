


import { Flex, Input,Box,Heading,FormControl,FormLabel,Button, Image } from '@chakra-ui/react'
import Navbar from './Navbar'
import image from '../assests/finallogo.png'
import React,{useEffect} from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import jwt_decode from 'jwt-decode'

function Login () {

  const [email, setemail] = useState('');
  const [password,setpassword] = useState('');
  const navigate=useNavigate();
  const LOGIN=process.env.REACT_APP_SECRET_KEY + '/login'
  const ID=process.env.REACT_APP_KEY
  const TOKEN=process.env.REACT_APP_SECRET_KEY + '/token'




  function handlecallbackresponse(response){
    
    fetch(TOKEN, {
     
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
        "tokenold":response.credential
    }),
       
      // Adding headers to the request
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
   
  // Converting to JSON
  .then(response => response.json())
   
  // Displaying results to console
  .then(json => {
    const decode = jwt_decode(json.user);
    sessionStorage.setItem("username",decode.name);
    sessionStorage.setItem("token",json.user);
    navigate("/home")
  }
     
  );
  }

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:ID,
      callback: handlecallbackresponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signupdiv"),
      {size:"medium"}
    );


  },[])





  const checkfield=(e)=>{
    e.preventDefault();
    if( email!=="" && password!=="" ){
    fetch(LOGIN, {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      "email":email,
      "password":password,
  }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json =>{
  console.log(json.user)
    if(json.user){
        alert("login successfully")
        const decode = jwt_decode(json.user)
        sessionStorage.setItem("username",decode.name);
        sessionStorage.setItem("token",json.user);
        navigate("/home")
    }
    else{
        alert("Please check your email and password")
    }
});
    
    }
    
  }

  


  return (
    <div >

{/* <Navbar/> */}
<Flex fontSize={'15px'} width={{base:'35rem',md:'full',lg:'full'}} align="center" justifyContent="center">
      <Box fontSize={'15px'} p={2}>
        <Box  textAlign="center">
        <Flex justifyContent={'center'} >
        <Image h={{md:'10vh',lg:'10vh'}} w={{base:'10rem',md:'10vw',lg:'10vw'}} src={image} alt='logo'  />
        </Flex>
          <Heading mb={'10'} fontSize={'30px'} >Welcome to Agroshield</Heading>
        </Box>
        <Box  my={4} textAlign="left">
          <form onSubmit={(e)=>checkfield(e)} >
            


            


        

           


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Email</FormLabel>
              <Input
              sx={{
                "::placeholder": {
                  color: "black"
                }
              }}
              onChange={(e)=>setemail(e.target.value)} h={'16'} size={'lg'} type={'email'}  placeholder="Enter Email..." value={email} />
            </FormControl>


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Password</FormLabel>
              <Input 
              sx={{
                "::placeholder": {
                  color: "black"
                }
              }}
              onChange={(e)=>setpassword(e.target.value)} h={'16'} size={'lg'} type={'password'}  placeholder="Enter password..." value={password} />
            </FormControl>


            <Button borderRadius={'2rem'} h={'16'} fontSize={'1.5rem'} width="full" mt={4} type="submit" onClick={()=>checkfield()} >
              Continue
            </Button>
            <Flex justifyContent={'center'} fontSize='1.5rem' >OR</Flex>
            <Button bg={'white'} id='signupdiv' leftIcon={<FaGoogle/>} borderRadius={'2rem'} h={'16'} fontSize={'1.5rem'} width="full" mt={4} type="submit" >
              Continue with Google
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>


       {/* <Footer/> */}
    </div>
  )
}

export default Login;