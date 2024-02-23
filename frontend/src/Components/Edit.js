import { Flex, Input,Box,Heading,FormControl,FormLabel,Button,  LightMode } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

function Edit() {

  const [Crop, setcrop] = useState('');
  const [medicine,setmedicine] = useState('');
  const [type,settype] = useState('');
  const [diseasename,setdisease] = useState('');
  const [image,setimage] = useState('');
  const [tost,settost] = useState(false);
  

  const navigate = useNavigate();

   const USERINPUT = process.env.REACT_APP_SECRET_KEY + '/userinput'
    const Token = sessionStorage.getItem("token")
    const name=sessionStorage.getItem('username')
    const {id} = useParams();






  setTimeout(()=>{
    document.getElementById('search').style.display='none' 
    document.getElementById('suggest').style.display='none'
  },500)









  let requestInProgress = false;


  const EDITlink = process.env.REACT_APP_SECRET_KEY + `/edit/${id}`

  const checkfield = (e) => {
    e.preventDefault();
    if (Crop !== "" && medicine !== "" && type !== "" && name !== "" && (image !== "" ) && diseasename !== "" ) {
     if(!requestInProgress){

     
  
        requestInProgress = true;
  
        fetch(EDITlink, {
          method: "PUT",
          body: JSON.stringify({
            "cropName":Crop,
            "Disease":diseasename,
            "solution":medicine,
            "UserName":name,
            "type":type,
            "image":image,
        }),
        headers: {
            'Authorization': 'Bearer ' + Token,
              "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((data) => {
            settost(true);
            setTimeout(()=>{
            navigate('/home')
            },2000)
            requestInProgress = false;
          })
          .catch((error) => {
            console.error(error);
            requestInProgress = false;
          });
        }
    }
      
    }
  
  


  const toast = useToast();

  function handleClick() {
    toast({
      title: "Document ",
      description: "Edited successfully",
      status: "success",
      position:'top-right',
      duration: 3000,
      isClosable: true,

    });
  }

  useEffect(()=>{
    if(tost){
      handleClick();
    }
  },[tost])

 

  const API1=process.env.REACT_APP_SECRET_KEY+`/data/${id}`

  useEffect(()=>{
    fetch(API1,{
        method:"GET",
        headers: {
            'Authorization': 'Bearer ' + Token,
              "Content-type": "application/json; charset=UTF-8"
          }
    }).then(res=>res.json())
    .then((data)=>{
        setcrop(data.data[0].cropName);
        setmedicine(data.data[0].solution);
        settype(data.data[0].type);
        setdisease(data.data[0].Disease);
        setimage(data.data[0].image)
        

    }).catch(Error=>console.log(Error))
},[])




  


  return (
    <div >




<Flex mt={'10rem'}  color={'black'} fontSize={'15px'} width="full" align="center" justifyContent="center">
      <Box mb={'5rem'} boxShadow='dark-lg' p='6' rounded='md' bg='white' borderRadius={'2rem'} w={'35rem'}  fontSize={'15px'} >
        <Box  textAlign="center">
          <Heading mb={'10'} fontSize={'30px'} >Information Form</Heading>
        </Box>
        <Box  my={4} textAlign="left">
          <form onSubmit={(e)=>checkfield(e)} >
            <FormControl  mb={'10'} >
              <FormLabel fontSize={'20px'} >Crop Name</FormLabel>
              <Input value={Crop} onChange={(e)=>setcrop(e.target.value)} size={'lg'} h={'16'} placeholder="Enter Crop Name..." />
            </FormControl>


            


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Medicine Name</FormLabel>
              <Input value={medicine} onChange={(e)=>setmedicine(e.target.value)} h={'16'} type={'text'} size={'lg'}  placeholder="Type Medicine name..." />
            </FormControl>

           
            <FormControl  mb={'10'} >
              <FormLabel color={'black'} bg={'white'} fontSize={'20px'}  >Type of Medicine</FormLabel>
              <select value={type} color='black' backgroundcolor="white" onChange={(e)=>settype(e.target.value)} >
                <LightMode>
                <option  value="">Select the type</option>
            <option value="Insecticide">Insecticide</option>
            <option value="Herbicide">Herbicide</option>
            <option value="Fungicide">Fungicide</option>
            <option value="Biofungicide">Bio-Fungicide</option>
            <option value="Bioinsecticide">Bio-Insecticide</option>
            </LightMode>
              </select>
            </FormControl>
           
           


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Disease Name</FormLabel>
              <Input value={diseasename} onChange={(e)=>setdisease(e.target.value)} h={'16'} size={'lg'} type={'text'}  placeholder="Type Disease Name..." />
            </FormControl>


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Disease Image</FormLabel>
              <Input value={image} onChange={(e)=>setimage(e.target.value)} h={'16'} size={'lg'} type={'text'}  placeholder="Paste the image link here..." />
            </FormControl>

        






         


            <Button h={'16'} fontSize={'20px'} width="full" mt={4} type="submit" onClick={(e)=>checkfield(e)} >
              submit
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>


       {/* <Footer/> */}
      
    </div>
  )
}

export default Edit