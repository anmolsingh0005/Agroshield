import React from 'react'
import { FaLinkedin,FaInstagram  } from "react-icons/fa";



function Footer() {
  
  return (
    <>
     <footer>
     
      <ul className='social_icon'>
        <li><a href='https://www.linkedin.com/in/anmol-singh-159734255/'><FaLinkedin style={{color:'#0072b1'}}/></a></li>
        <li><a href='https://www.instagram.com/anmol_virk0005/'><FaInstagram style={{color:'#fa7e1e'}}/></a></li>
        
        

      </ul>

      <h2> I am a first year student and I am looking for intership <br></br> You can contact me at anmol.singh@kalvium.community <span className='span'></span></h2>     </footer>
    </>
  )
}

export default Footer