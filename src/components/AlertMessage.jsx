import PropTypes from 'prop-types';

export const AlertMessage = ({ message, type }) => {
    if (!message) return null;
    return <div className={`message ${type}`}>{message}</div>
}

AlertMessage.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string
}

