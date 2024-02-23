import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function Editaccess() {
    const Token=sessionStorage.getItem("token")

    const [userdetail,setuserdetail] = useState([]);


    const getuserapi=process.env.REACT_APP_SECRET_KEY + `/getuserdata`

    useEffect(()=>{
        fetch(getuserapi,{
            method:'GET',
            headers: {
                'Authorization': 'Bearer ' + Token,
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data);
            setuserdetail(data)
        })
    },[])

    setTimeout(()=>{
        document.getElementById('search').style.display='none' 
        document.getElementById('suggest').style.display='none'
      },500)

      function EditAccess(){
            
      }

  return (
    <div>
        <Box m={'5rem'} >
        {
            
            userdetail.map((res)=>{
                
                return(
                    <Flex justifyContent={'center'} >
                    <Flex m='1rem' h={'7rem'} borderRadius={'1.5rem'}  boxShadow={'dark-lg'} width={'120rem'} alignItems={'center'} justifyContent={'space-between'}  >
                    <Flex ml='2rem' >
                        {res.name}
                    </Flex>
                    <Button onClick={()=>EditAccess()} mr='2rem' h={'4rem'} fontSize={'1.5rem'} >Give editing access</Button>
                    </Flex>
                    </Flex>
                )
            })
            
        }
        </Box>
    </div>
  )
}

export default Editaccess