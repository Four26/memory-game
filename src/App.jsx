import './App.css'
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
            <h1 className='title'>Memory Game</h1>

            {alertMessage.text && (<div className={`message ${alertMessage.type}`}>{alertMessage.text}</div>)}

            <div className="instructions">
                <h2>How to Play?</h2>
                <p>
                    The goal of the game is to remember and click on all the Pokémon images without clicking the same one twice.
                </p>
                <ul>
                    <li>Click on any image to score a point.</li>
                    <li>Each time you click an image, it will shuffle with other images.</li>
                    <li>If you click the same image twice, you lose all your points and start over.</li>
                    <li>Try to beat your best score by clicking all the images correctly.</li>
                </ul>
            </div>

            <div className="score-con">
                <div className="score">Score: {score}</div>
                <div className="best-score">Best Score:{bestScore}</div>
            </div>

            <div className="img-con">
                <ul className='ul'>
                    {pokemonList.map((pokemon) => {
                        return (
                            <li key={pokemon.id}>
                                <h2>{pokemon.name}</h2>
                                <img src={pokemon.img} alt={pokemon.name} onClick={() => handleClick(pokemon.id)} className='img' />
                            </li>
                        )
                    })}
                </ul>
            </div>

        </>
    )
}

export default App
