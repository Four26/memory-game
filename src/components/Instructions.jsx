export const Instructions = () => {
    return (
        <div className="instructions">
            <h2>How to Play?</h2>
            <p>
                The goal of the game is to remember and click on all the Pokémon images
                without clicking the same one twice.
            </p>
            <ul>
                <li>Click on any image to score a point.</li>
                <li>Each time you click an image, it will shuffle with other images.</li>
                <li>If you click the same image twice, you lose all your points and start over.</li>
                <li>Try to beat your best score by clicking all the images correctly.</li>
            </ul>
        </div>
    )
}

