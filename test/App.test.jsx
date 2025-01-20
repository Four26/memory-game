import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
    describe('fetchData', () => {
        it('should fetch and render the first 10 Pokémon', async () => {
            // Mock the initial Pokémon list fetch
            const mockResponse = {
                results: Array.from({ length: 10 }, (_, i) => ({
                    name: `pokemon-${i + 1}`,
                    url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
                })),
            };

            // Mock the detailed Pokémon data fetch
            const mockDetailedResponse = (id) => ({
                id,
                name: `pokemon-${id}`,
                sprites: {
                    other: {
                        "official-artwork": {
                            front_default: `https://pokeapi.co/artwork/${id}.png`,
                        },
                    },
                },
            });

            globalThis.fetch = vi.fn((url) => {
                if (url.includes('pokemon?limit=10')) {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(mockResponse),
                    });
                } else if (url.includes('pokemon/')) {
                    const id = parseInt(url.split('/').pop(), 10);
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(mockDetailedResponse(id)),
                    });
                }
                return Promise.reject(new Error('Invalid URL'));
            });

            render(<App />);

            // Wait for all Pokémon images to be rendered
            const pokemonImages = await screen.findAllByRole('img');

            // Assertions
            expect(pokemonImages).toHaveLength(10); // Ensure 10 images are rendered

            // Verify the image sources and alt text
            pokemonImages.forEach((img, i) => {
                expect(img).toHaveAttribute('src', `https://pokeapi.co/artwork/${i + 1}.png`);
                expect(img).toHaveAttribute('alt', `pokemon-${i + 1}`);
            });

            // Clean up the mock
            vi.restoreAllMocks();
        });
    });

    describe('shuffleImages', () => {
        it('should shuffle the images correctly', async () => {
            // Mock the initial Pokémon list
            const mockResponse = {
                results: Array.from({ length: 10 }, (_, i) => ({
                    name: `pokemon-${i + 1}`,
                    url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
                }))
            };

            const mockDetailedResponse = (id) => ({
                id,
                name: `pokemon-${id}`,
                sprites: {
                    other: {
                        "official-artwork": {
                            front_default: `https://pokeapi.co/artwork/${id}.png`,
                        }
                    }
                }
            });

            globalThis.fetch = vi.fn((url) => {
                if (url.includes('pokemon?limit=10')) {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(mockResponse)
                    });
                } else if (url.includes('pokemon/')) {
                    const id = parseInt(url.split('/').pop(), 10);
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(mockDetailedResponse(id))
                    })
                }
                return Promise.reject(new Error('Invalid URL'));
            });
            render(<App />);

            //wait for all images to be rendered
            const pokemonImages = await screen.findAllByRole('img');

            //store the initial order of the images
            const initialOrder = pokemonImages.map((img) => img.src);

            fireEvent.click(pokemonImages[0]);

            const shuffledImages = await screen.findAllByRole('img');

            expect(shuffledImages.map((img) => img.src)).not.toEqual(initialOrder);

            vi.restoreAllMocks();
        });
    });

});