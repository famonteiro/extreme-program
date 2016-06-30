var React = require('react');
var Link = require('react-router').Link;

var Login = React.createClass({
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>This is the login page!</h1>
                        Not registered? <a href="/auth/slack">Sign in with Slack</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Login;