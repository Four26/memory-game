import { Title } from './components/Title.jsx';
import { AlertMessage } from './components/AlertMessage.jsx';
import { Instructions } from './components/Instructions';
import { PokemonCard } from './components/PokemonCard.jsx';
import { Score } from './components/Score.jsx';
import './App.css';
import { useState, useEffect } from 'react';


function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [clickedImages, setClickedImages] = useState(new Set());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [alertMessage, setAlertMessage] = useState({ text: '', type: '' });

    const fetchData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
            if (!response.ok) throw new Error('Failed to fetch Pokemon list');

            const { results } = await response.json();

            const detailedPokemonList = await Promise.all(
                results.map((pokemon) => fetch(pokemon.url).then((response) => response.json()))
            );

            //Extract the name id and image then store it in an array
            const pokemonImages = detailedPokemonList.map(({ id, name, sprites }) => ({
                id,
                name,
                img: sprites.other["official-artwork"].front_default
            }));
            console.log(pokemonImages);
            setPokemonList(pokemonImages);
        } catch (error) {
            alert('Error fetching Pokemon', error);
        }
    };

    const shuffleImages = () => {
        setPokemonList((prevList) => [...prevList].sort(() => Math.random() - 0.5));
    };

    const resetGame = () => {
        setScore(0);
        setClickedImages(new Set());
    };

    const handleClick = (pokemonId) => {
        if (clickedImages.has(pokemonId)) {
            setAlertMessage({ text: 'Game Over! You clicked the same image twice.', type: 'error' });
            resetGame();

            setTimeout(() => setAlertMessage({ text: '', type: '' }), 3000);
            return;
        }

        const updatedClickedImages = new Set(clickedImages).add(pokemonId);
        setClickedImages(updatedClickedImages);

        const newScore = score + 1;
        setScore(newScore);

        if (newScore > bestScore) {
            setBestScore(newScore);
        }

        if (newScore === 10) {
            setAlertMessage({ text: 'Congratulations! You won the game!', type: 'success' });
            setTimeout(() => setAlertMessage({ text: '', type: '' }), 3000);
            resetGame();
        } else {
            shuffleImages();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Title />
            <AlertMessage message={alertMessage.text} type={alertMessage.type} />
            <Instructions />
            <Score score={score} bestScore={bestScore} />
            <div className="img-con">
                <ul className='ul'>
                    {pokemonList.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={handleClick} />
                    ))}
                </ul>
            </div>
        </>
    )
}

export default App;

