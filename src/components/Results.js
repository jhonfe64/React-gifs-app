import React, {useState, useEffect} from 'react';
const Results = (props) => {

console.log(props.darkModeBtn);
const [gettingTrendingGifs, setGettingTrendingGifs] = useState([]);
const [loader, setLoader] = useState(true);


//Al cargar la pagina
    useEffect(() => {
        fetch(`http://api.giphy.com/v1/gifs/trending?&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=21`)
        .then((res)=>{
            return res.json();
        })
        .then((trendingGifsCollection)=>{
            setLoader(false);
            setGettingTrendingGifs(trendingGifsCollection.data);
           
        });
    },[]);

  
    const [searchingItem, setSearchingItem] = useState("");

        const fetching = () => {
        fetch(`http://api.giphy.com/v1/gifs/search?q=${searchingItem}&api_key=x58Cq33OnTiwdQ7gRoG1bsCNVFJdEX1d&limit=21`)
        .then((res)=>{
            return res.json();
        }).then((gifList)=>{
            setGettingTrendingGifs(gifList.data);
        })
    }
 


    //si viene una palabra en las prop sendInputValue cuando se hace click en el btn de busqueda
    useEffect(()=>{
        if(props.sendInputValue !== undefined && props.sendInputValue.length > 0){
            if(props.sendInputValue){
                setSearchingItem(props.sendInputValue);
                if(searchingItem === props.sendInputValue){
                    fetching();
                }
            }
        }
    },[props.sendInputValue, searchingItem, props.suggestedTag]);


    //cuando viene valor del desplegable
    useEffect(()=>{
        if(props.suggestedTag !== undefined && props.suggestedTag.length > 0){
            setSearchingItem(props.suggestedTag)
            if(searchingItem === props.suggestedTag){
                fetching();
             }
        }
    }, [props.suggestedTag, searchingItem]);


    return (
        <div className="results" href="https://fonts.google.com/specimen/Roboto?preview.text_type=custom" target="_blank">
            <div className="container">
            {loader === true ? <div className="spinner">
                <img src="../../img/spinner.gif" alt="loading"/>
            </div>: <h1>{searchingItem.length > 0 ? "Resultados para " + searchingItem : "Es trending" }</h1>}
                {gettingTrendingGifs.length > 0 ?
                    gettingTrendingGifs.map((singleGif)=>{
                    return(
                        <div className="imgContainer">
                            <img src={singleGif.images.downsized.url} alt="" />
                        </div>
                    )
                    }): <div className="noResults">
                        {!loader &&  <div><h2>Que SAD: no encontramos nada :(</h2><img src="https://media.giphy.com/media/H3GhLSfzamgkGKQ67A/giphy.gif" alt=""/></div>}
                    </div> 
                 }
            </div>
        </div>
    );
}

export default Results;

