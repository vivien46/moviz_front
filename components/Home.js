import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'antd/dist/antd.css';
import { Popover, Button, Image } from 'antd';
import Movie from '../components/Movie';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


export default function Home() {

const [lastMovies, setLastMovies] = useState([]);
const [ moviesList, setMoviesList] = useState([]);

useEffect ( () => {
  fetch('http://localhost:4000/movies')
  .then((res) => res.json())
  .then((data) => {
    setMoviesList(data.movies);
  })
  .catch((error) => {
    console.log(error);
  });
}, [])

const updateLastMovies = (movieTitle) => {
  const found = lastMovies.find(el => el === movieTitle)
  if (lastMovies){
    return;

  }
  setLastMovies ([...lastMovies, movieTitle]);
}

// const moviesData = [
//     { title: 'Forrest Gump', poster: 'forrestgump.jpg', voteAverage: 9.2, voteCount: 22_705, overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case.' },
//     { title: 'The Dark Knight', poster: 'thedarkknight.jpg', voteAverage: 8.5, voteCount: 27_547, overview: 'Batman raises the stakes in his war on crime and sets out to dismantle the remaining criminal organizations that plague the streets.' },
//     { title: 'Your name', poster: 'yourname.jpg', voteAverage: 8.5, voteCount: 8_691, overview: 'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.' },
//     { title: 'Iron Man', poster: 'ironman.jpg', voteAverage: 7.6, voteCount: 22_7726, overview: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.' },
//     { title: 'Inception', poster: 'inception.jpg', voteAverage: 8.4, voteCount: 31_546, overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.' },
//   ];

//faire un map sur le tableau d'objets moviesData
//créér les props a faire passer dans le composant movie du map()
// Faire passer les props vers le composant movie

const updateLikedMovies = (movieTitle) => {
  const newMovies = lastMovies.filter(el => el !== movieTitle);
  setLastMovies(newMovies);
}

const films = moviesList.map((el, i) => {
  return (
    <Movie
     title={el.title}
     poster={'https://image.tmdb.org/t/p/w500' + el.poster_path}
     voteAverage={el.voteAverage}
     voteCount={el.voteCount}
     overview={el.overview}
     updateLastMovies={updateLastMovies}
     key={i}
     />
  );
});
console.log(moviesList);

  
    const popoverContent = lastMovies.map((el,i) => {
    return (
      <span key={i} className={styles.popoverContent}>{el}
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => updateLikedMovies(el)}/>
        </span>
    ); 
   });
  

  return (
  <div className={styles.main}>
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="logo.png" width={50} height={50} alt="logo" />
        <p className={styles.title}>Movies</p>
      </div>
      <Popover title='Liked Movies' content={popoverContent} trigger="click">
        <Button>❤️ 4 movie(s)</Button>
      </Popover>
    </div>
  <div className={styles.release}>Last Release</div>
  <div className={styles.moviesContainer}>{films}</div>
  </div>
  );
  }