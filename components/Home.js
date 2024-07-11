import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {

  const[deck, setDeck]=useState([
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
])
  const [temporaryDeck, setTemporary]=useState([])
  const [randomedDeck, setRandomedDeck]=useState([])
  const [selected, setSelected] = useState([]);
  const [winned, setWinned] = useState([]);
  
  
  useEffect(() => {
    setTemporary(deck)
    let i=1
    while(i <= temporaryDeck.length)
    {
      // get random data & push in randomedarray
      let randomOne=temporaryDeck[Math.floor(Math.random()*temporaryDeck.length)]
      setRandomedDeck([...randomedDeck,randomOne])
      //console.log('randomone',randomOne)
      //randomedDeck.push(randomOne)
      // delete data
      setTemporary(temporaryDeck.filter((element) => element.id != randomOne.id))
      i++
    }
    
  },[randomedDeck]);


  useEffect(() => {
    console.log(selected.length,' sélectionnées !')
    if (selected.length == 2)
    {
     console.log(selected)
     let firstcard=randomedDeck.find((element) => element.id == selected[0])
     let secondcard=randomedDeck.find((element) => element.id == selected[1])

      if (firstcard.name == secondcard.name)
      {

        console.log('2 cartes identiques')
        setWinned([...winned,...selected])
        setTimeout(() => {
          setSelected([])
        }, "1000")
      }
      else
      {
        console.log('Cartes différentes')
        setTimeout(() => {
          setSelected([])
        }, "1000")
       
      }
    }
    console.log('deck',randomedDeck)
    console.log('winned',winned)

  

  },[selected]);
  
  if(winned.length == 16)
    {
      setTimeout(() => {
        setWinned([])
        
        setRandomedDeck([])
      }, "1500")
    }

  const selectCard = (id) => {
    setSelected([...selected, id]);
   
  };

  const cardsToDisplay = randomedDeck.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id)}
        winned={winned.includes(card.id)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Memory Game 🧠
        </h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
