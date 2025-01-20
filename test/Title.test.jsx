import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Title } from "../src/components/Title";

describe('Title', () => {
    it('should render the title', () => {
        render(<Title />);
        expect(screen.getByText('Memory Game')).toBeInTheDocument();
    })
});