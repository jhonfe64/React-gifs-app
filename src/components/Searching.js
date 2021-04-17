import {React, useState, useEffect} from 'react';
import Results from './Results';

const Searching = ({darkModeBtn}) => {

    const [getInputValue, setInputValue] = useState("");
    const [btnGetInputValue, setBtnGetInputValue] = useState("");
    //Valor del input al hacer click
    const [sendInputValue, setSendInputValue] = useState("");
    //lista de gifs sugeridos para el desplegable
    const [suggestedGifsList, setSuggestedGifsList] = useState([]);
    //valor del desplegable
    const [suggestedTag, setSugegstedTag] = useState("");
    

    const hadleClick = () => {
        setBtnGetInputValue(getInputValue);
        setSugegstedTag('');
    }

    
    const inputValue = (e) => {
        setInputValue(e.target.value);
    }

    const suggestedTagValue = (e) => {
        setSugegstedTag(e.target.getAttribute('value'));
        setInputValue(e.target.getAttribute('value'));
    }


    useEffect(() => {
       if(btnGetInputValue.length > 0){
        setSendInputValue(btnGetInputValue);
       }
    }, [btnGetInputValue]);



    useEffect(()=>{
        if(getInputValue){
            fetch(`http://api.giphy.com/v1/tags/related/${getInputValue}?&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=3`)
            .then((res)=>{
                return res.json();
            }).then((suggestedGifs)=>{
                for(let i=0; i<suggestedGifs.data.length; i++){
                    setSuggestedGifsList(suggestedGifs.data);
                }
            });
        }
    },[getInputValue])

    return (
        <div className="searching">
            <h1>¡Inspirate y busca los mejores GIFS!</h1>
            <div className="container">
                <div className="topSearching">
                    <div className="img-container">
                        <img src="../../img/ilustra_header.svg" alt=""/>
                    </div>
                    <div className="searchin-bar">
                        <input type="text" onChange={inputValue} value={getInputValue} placeholder="Buscar gifs" />
                        <button onClick={hadleClick}>
                            <img src="../../img/icon-search-mod-noc.svg" alt=""/>
                        </button>
                    </div>
                    {getInputValue &&  <div className="suggestions">
                        <ul>
                            {getInputValue && suggestedGifsList.length > 0 ? suggestedGifsList.map((suggestedGif)=>{
                            return <li>
                                <div onClick={suggestedTagValue}  value={suggestedGif.name}>{suggestedGif.name}</div>
                                </li>
                        }) : ""}
                        </ul>
                    </div> }
                </div>
            </div>
            <Results sendInputValue = {sendInputValue} suggestedTag = {suggestedTag}/>
        </div>
    );
}

export default Searching;


//Renderizado condiconal