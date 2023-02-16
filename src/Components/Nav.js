import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect( () => {
        window.addEventListener("scroll" ,()=>{
            
            if(window.scrollY > 180){
                handleShow(true);
            }else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll",null);
        };
    },[]);

return (
    <div className={`nav ${show && "nav__black"}`}>
        <img className='nav__logo' src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png" alt="Netflix Logo" />
        <img className='nav__avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" alt="" />
    </div>
  )
}

export default Nav