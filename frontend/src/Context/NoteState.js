import "../Components/navbar&footer.css";
import React from "react";
import NoteContext from "./noteContext";
import { Box, Button, Card, CardBody, Flex, Image, Input } from "@chakra-ui/react";
import image from '../assests/finallogo.png'
import { useState,useEffect } from "react";
import { Link, useLocation} from "react-router-dom";




function NoteState(props) {
  const name=sessionStorage.getItem("username");
  const location=useLocation();
  const [search, setsearch] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loder,setloderinhome] = useState(false);
  




  const handlesearch=()=>{

    if(search){
      setsearch(false);
    }
    else{
      setsearch(true);
    }
  }

  const [query, setQuery] = useState('');

  const API=process.env.REACT_APP_SECRET_KEY + `/userinput?cropName=${query}`


  const Token=sessionStorage.getItem("token")

  function removeduplicate(array){
    const result=[];
    for(let i=0; i<array.length-1; i++){
      if(array[i].cropName!==array[i+1].cropName) result.push(array[i]);
    }
    return setSuggestions(result);
  }


  useEffect(()=>{
    fetch(API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Token,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res=>res.json())
      .then((data)=>{
        removeduplicate(data);
        
      })
      .catch((err)=>{
        console.log(err);
      })
  },[query])


  function remove (){
    setSuggestions([])
  }

  const handleSuggestionClick = (suggestion) => {
    // Update the input field with the selected suggestion
    setQuery(suggestion);
    handlesearch();
    setloderinhome(true);
    remove();
  };
 

console.log("path",location.pathname)


if(location.pathname==='/' ){
 
  return (
    <NoteContext.Provider value={{query,search,loder}} >
    {props.children}
    </NoteContext.Provider>
  )

}








  


    return(
<>
        
<header className="header">
      <Flex  justifyContent={'space-between'} >
      <Box>
      <Link to="/home" className="logo" id="websiteName">
      
          <Image   h={'5rem'}  src={image} alt='logo'  />
      </Link>
      </Box>
      <Box>
      <Flex id="search" alignContent={'center'} justifyContent='space-around' >
        
        <Box>   
          <Flex w={{base:'22rem',md:'30rem',lg:'30rem'}} >  
           <Input
           boxShadow='dark-lg' p='6' rounded='md' bg='white'
           type={'text'}
           fontSize={'1.5rem'}
           onChange={(e)=>setQuery(e.target.value)}
           value={query}
           mt={'0.5rem'}
           h={'4rem'} w={'30rem'} borderRadius='2rem 0rem 0rem 2rem' />
           
           <Button fontSize={'1.4rem'} boxShadow='dark-lg' p='6' rounded='md' bg='white' w={{base:'8rem',md:'7rem',lg:'7rem'}} mt={'0.5rem'} h={'4rem'} onClick={()=>{handlesearch()}} borderRadius='0rem 2rem 2rem 0rem' >Search</Button>
           </Flex>
           </Box>
      </Flex>
      </Box>
      <Box>
      <Flex  fontSize={'2rem'} mt='1rem' mr='2rem' >{name}</Flex>
      </Box>
      </Flex>



      {
          
          
          (suggestions.length>0)?
            <Flex id="suggest" mr={'7rem'} justifyContent={'center'}>
              <Card h={'30rem'}  borderRadius={'0.5rem 0.5rem 0rem 0rem'} color='black' backgroundColor={'white'} position={'fixed'} w='30rem' zIndex={9999} cursor={'pointer'} overflow='auto'>
                {suggestions.map((suggestion) => (
                  <CardBody _hover={{ boxShadow: "outline" }} key={suggestion._id} onClick={() => handleSuggestionClick(suggestion.cropName)}>
                    {suggestion.cropName}
                  </CardBody>
                ))}
              </Card>
            </Flex>
            :<></>
        }



      </header>
      <NoteContext.Provider value={{query,search,loder}} >
            {props.children}
        </NoteContext.Provider>

      </>
    )
  
  



      



}

export default NoteState;










