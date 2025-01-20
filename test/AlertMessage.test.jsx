import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AlertMessage } from "../src/components/AlertMessage";

describe('AlertMessage', () => {
    it('should render the alert message', () => {

        //render success
        render(<AlertMessage message="Congratulations! You won the game!" type="success" />);
        expect(screen.getByText('Congratulations! You won the game!')).toBeInTheDocument();

        //render error
        render(<AlertMessage message="Game Over! You clicked the same image twice." type="error" />);
        expect(screen.getByText('Game Over! You clicked the same image twice.')).toBeInTheDocument();
    });

    it('should have a class based on the type prop', () => {

        //render success type
        render(<AlertMessage message="Congratulations! You won the game!" type="success" />);
        expect(screen.getByText('Congratulations! You won the game!')).toHaveClass('message success');

        //render error type
        render(<AlertMessage message="Game Over! You clicked the same image twice." type="error" />);
        expect(screen.getByText('Game Over! You clicked the same image twice.')).toHaveClass('message error');
    })
});