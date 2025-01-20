import { afterEach, describe, expect, it, vi } from "vitest";
import { PokemonCard } from "../src/components/PokemonCard";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

describe('PokemonCard', () => {
    const mockPokemons = Array.from({ length: 10 }, (_, i) => (
        {
            id: i + 1,
            name: `Pokemon-${i + 1}`,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`,
        }
    ))

    const mockOnClick = vi.fn();

    afterEach(() => {
        //ensure that the component is unmounted after each test
        cleanup();
    })

    it('render the Pokemon name and image correctly', () => {
        mockPokemons.forEach((mockPokemon) => {
            render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

            const name = screen.getByText(mockPokemon.name);
            expect(name).toBeInTheDocument();

            const image = screen.getByAltText(mockPokemon.name);
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', mockPokemon.img);
        })

    });

    it('calls onClick with the correct Pokémon ID when the image is clicked', () => {
        mockPokemons.forEach((mockPokemon) => {
            render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

            const image = screen.getByAltText(mockPokemon.name);
            fireEvent.click(image);

            // Assert the onClick handler was called with the correct ID
            expect(mockOnClick).toHaveBeenCalledWith(mockPokemon.id);
        });

        // Assert the onClick handler was called with the correct number of times
        expect(mockOnClick).toHaveBeenCalledTimes(mockPokemons.length);
    });
});