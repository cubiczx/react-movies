const React = require('react');

const SvgMock = (props) => React.createElement('svg', props);
SvgMock.ReactComponent = (props) => React.createElement('svg', props);

module.exports = SvgMock;
module.exports.ReactComponent = SvgMock.ReactComponent;
module.exports.default = SvgMock;
