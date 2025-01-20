import PropTypes from 'prop-types';

export const Score = ({ score, bestScore }) => (
    <div className="score-con">
        <div className="score">Score: {score}</div>
        <div className="best-score">Best Score: {bestScore}</div>
    </div>
);

Score.propTypes = {
    score: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired
}

