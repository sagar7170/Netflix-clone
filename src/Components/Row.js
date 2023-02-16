import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from './axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "http://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl,isLargRow}) {

    const [movies,setMovies] = useState();
    const [trailerUrl, setTrailerUrl] = useState();
  
    useEffect(() =>{
     async function fetchData() {
      const request = await axios.get(fetchUrl);
    //   console.log(request);
    setMovies(request.data.results);
      return request;
     }
     fetchData();
    },[fetchUrl]);
   
    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay:1,
      },
    };

    const  handleClick =(movie)=>{
      console.log(movie);
      if(trailerUrl){
        setTrailerUrl('');
      }else{
        movieTrailer(movie?.name  || "")
        .then(url => {
          console.log(url)
        const urlParams =  new URLSearchParams (new URL(url).search); 
        setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
      }
    }


  return (
    <div className='row'>
        <h1>{title}</h1>
        <div className='row__posters'>
           {
             movies?.map((movie)=>(
                <img key={movie.id} onClick={() => handleClick(movie)} className={`row__poster ${isLargRow && "row__posterLarge"}`} src={`${base_url}${isLargRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />
                // console.log(movie.backdrop_path)
             ))
           }
        </div>
        {trailerUrl && <YouTube videoId ={trailerUrl} opts = {opts}/>}
    </div>
  )
}

export default Row;