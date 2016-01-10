const React = require('react');
const ReactDOM = require('react-dom');
const styles = require('!style!css!sass!./stylesheet/index.scss');
const AuthWrapper = require('./components/AuthWrapper');

const App = React.createClass({
	render() {
		return (
			<div className="app-wrapper">
				<AuthWrapper />
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));
