const React = require('react');
const ReactPlayer = (props) => React.createElement('div', { 'data-testid': 'react-player', ...props });
module.exports = ReactPlayer;
module.exports.default = ReactPlayer;
