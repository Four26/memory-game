import PropTypes from 'prop-types';

export const PokemonCard = ({ pokemon, onClick }) => (
    <li>
        <h2>{pokemon.name}</h2>
        <img
            src={pokemon.img}
            alt={pokemon.name}
            onClick={() => onClick(pokemon.id)}
            className="img"
        />
    </li>
);

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
}

