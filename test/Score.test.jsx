import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Score } from "../src/components/Score";

describe('Score', () => {
    it('should render the score and best score', () => {
        render(<Score score={0} bestScore={0} />);
        expect(screen.getByText('Score: 0')).toBeInTheDocument();
        expect(screen.getByText('Best Score: 0')).toBeInTheDocument();
    });
});