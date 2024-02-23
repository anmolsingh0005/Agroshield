import { Flex, Input,Box,Heading,FormControl,FormLabel,Button,  LightMode } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

function Form() {

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

    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function senddata(Image){
    
    fetch(USERINPUT, {
     
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
        "cropName":Crop,
        "diseaseName":diseasename,
        "solution":medicine,
        "UserName":name,
        "type":type,
        "image":Image,
    }),
       
      // Adding headers to the request
      headers: {
        'Authorization': 'Bearer ' + Token,
          "Content-type": "application/json; charset=UTF-8"
      }
  })
   
  
  .then(response => response.json())
   
  // Displaying results to console
  .then(json =>{ 
    console.log(json)
    settost(true);
    setTimeout(()=>{
      navigate('/home')
    },2000)
    
  });
  }

  setTimeout(()=>{
    document.getElementById('search').style.display='none' 
    document.getElementById('suggest').style.display='none'
  },500)







  const createlink=process.env.REACT_APP_SECRET_KEY+'/createlink'

  let requestInProgress = false;

  const checkfield = (e) => {
    e.preventDefault();
    if (Crop !== "" && medicine !== "" && type !== "" && name !== "" && (image !== "" || selectedFile !== "") && diseasename !== "" ) {
      const fileExtension = image.split(".").pop().toLowerCase();
      console.log(fileExtension);
      if ((((fileExtension === "jpg" || fileExtension === "png") && image.length < 100 ) || selectedFile)) {
        if(!requestInProgress){
        const formData = new FormData();
        formData.append("cropImage", selectedFile);
        formData.append("imageUrl", `${image}`);
  
        requestInProgress = true;
  
        fetch(createlink, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.imageUrl);
            senddata(data.imageUrl);
            requestInProgress = false;
          })
          .catch((error) => {
            console.error(error);
            requestInProgress = false;
          });
        }
      } else {
        console.log("Image extension is invalid");
        alert(
          "only png and jpg extension is supported and length should be not greater than 100 characters"
        );
        setimage("");
      }
    }
  };
  


  const toast = useToast();

  function handleClick() {
    toast({
      title: "Information ",
      description: "added successfully",
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
              <Input onChange={(e)=>setcrop(e.target.value)} size={'lg'} h={'16'} placeholder="Enter Crop Name..." />
            </FormControl>


            


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Medicine Name</FormLabel>
              <Input onChange={(e)=>setmedicine(e.target.value)} h={'16'} type={'text'} size={'lg'}  placeholder="Type Medicine name..." />
            </FormControl>

           
            <FormControl  mb={'10'} >
              <FormLabel color={'black'} bg={'white'} fontSize={'20px'}  >Type of Medicine</FormLabel>
              <select color='black' backgroundcolor="white" onChange={(e)=>settype(e.target.value)} >
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
              <Input onChange={(e)=>setdisease(e.target.value)} h={'16'} size={'lg'} type={'text'}  placeholder="Type Disease Name..." />
            </FormControl>


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Disease Image</FormLabel>
              <Input value={image} onChange={(e)=>setimage(e.target.value)} h={'16'} size={'lg'} type={'text'}  placeholder="Paste the image link here..." />
            </FormControl>

            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Disease Image</FormLabel>
              <Input type="file" onChange={handleFileInputChange} h={'16'} size={'lg'} placeholder="provide image here..." />
              {selectedFile && <p>Selected file: {selectedFile.name}</p>}
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

export default Form