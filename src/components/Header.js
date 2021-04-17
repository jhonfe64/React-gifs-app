import React from 'react';

const Header = ({setDarkModeBtn, darkModeBtn}) => {
    
    const activateDarkMode = () => {
        if(darkModeBtn === true){
            setDarkModeBtn(false);
        }else{
            setDarkModeBtn(true);
        }
    }


    return (
        <div className="header">
           <div className="container">
                <div className="logo">
                    <img src="../../img/logo-desktop.svg" alt=""/>
                </div>
                <div className="btnContainer">
                    <button onClick={activateDarkMode} >Dark mode</button>
                </div>
           </div>
        </div>
    );
}

export default Header;




///////////////////////////////////////////////////////////////





