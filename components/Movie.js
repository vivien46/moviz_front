import React, { useState } from "react";
import styles from '../styles/Movie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faHeart } from '@fortawesome/free-solid-svg-icons';

function Movie(props) {
    const stars =[];

    for ( let i = 0; i< 10; i++){
        let style = {};
        if ( i < props.voteAverage - 1){
        style = {color : '#f1c40f'};
            
        }
        stars.push(<FontAwesomeIcon icon={faStar} key={i} style={style}/>);
        
    }
    
    
    // Définisez les trois états suivants avec leur setter
    //personalNote initialisé à 0
    // WatchCount initialisé à 0
    // Like initialisé à false

    const [personalNote, setpersonalNote] = useState(0);
    const [watchCount, setwatchCount] = useState(0);
    const [like, setlike] = useState(false);

    //2
    // Créer le système des étoiles de notation personnelle #2196f3
    const persostars = [];
    for ( let i = 0; i< 10; i++){
        let starstyle = { cursor : 'pointer'};
        if ( i < personalNote){
        starstyle = {color : '#2196f3', cursor: 'pointer'};
            
        }
        persostars.push(<FontAwesomeIcon icon={faStar} onClick={() => setpersonalNote(i + 1)} style={starstyle} key={i} />);
    }

    // Au clic sur l'étoile, vous attriburez la note sous forme d'étoile
    // entre parenthèses affichez la note d'après les étoiles

    //3
   // au clic sur la camera l'icone deviendra rouge #e74c3c et on incrémente à chaque clic
    const handleMovie = () =>{
        setwatchCount(watchCount + 1);
    };
    let videoIconStyle ={
        cursor: 'pointer'
    }
    if (watchCount){
        videoIconStyle = {color: '#e74c3c', cursor: 'pointer'};
    }

   //4 ==> le bouton Like
   //Mettre en place le systeme de like : au clic le coeur devient rouge et au re-clic il redeviendra noir
    const handleLike =() =>{
        setlike(!like);
        props.updateLastMovies(props.title);
    };

    let heartIconStyle = {cursor : 'pointer'};
    if(like){
        heartIconStyle = { color: '#e74c3c', cursor: 'pointer'};
    };

    return (
    <div className={styles.card}>
        <Image className={styles.image} src={props.poster} alt={props.title} />
        <div className={styles.textContainer}>
            <span className={styles.name}>{props.title}</span>
            <p className={styles.description}>{props.overview}</p>
        </div>
        <span className={styles.vote}>{stars} {props.voteCount}</span>
        <span className={styles.vote}>{persostars} ({personalNote})</span>
        <span>
        <FontAwesomeIcon icon={faVideo} style={videoIconStyle} onClick={() => handleMovie()} />
        ({watchCount})
        </span>
        <span>
        <FontAwesomeIcon icon={faHeart} style={heartIconStyle} onClick={() => handleLike()} />
        </span>
    </div>
    );
  }

export default Movie;