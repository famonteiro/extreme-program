var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;


UsersManagement = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        this.props.checkPermission(this.props.permissions.Attributor);

        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        )
    },
    _getState: function() {
        return {
            admin: AdminStore.getAdmin(),
            users: AdminStore.getUsers(),
            roles: AdminStore.getRoles(),
            user: {}
        }
    },
    _setUser: function(user) {
        return function() {
            AdminActions.getUser('/api/users/' + user._id);
        }
    },
    render: function() {
        var that = this;
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    <div className="col-xs-12 col-sm-4" >
                        <h3 className="underline">Users</h3>
                        { this.state.users && this.state.users.length > 0
                        ?    <ul id="admin-user-list">
                                {this.state.users.map(function(user, index) {
                                    var link = '/users/' + user._id;
                                    return (
                                        <li className="user-list-item" key={index}>
                                            <Link activeClassName="active" to={link} onClick={that._setUser(user)} ><i className="fa fa-user" aria-hidden="true"></i><span className="spacing"></span>{user.email}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        :  null
                        }
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        {this.props.children && React.cloneElement(this.props.children, { permissions: this.props.permissions, checkPermission: this.props.checkPermission, isAdmin: this.props.isAdmin}) }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UsersManagement;
