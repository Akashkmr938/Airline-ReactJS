import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IS_ADMIN } from './../../../store/actions/actionTypes';
import { withRouter } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LoginStyles from './Login.module.scss';
import { httpGet } from '../../../utils/api/http-calls';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: undefined,
            userName: undefined,
            isSignedIn: null,
            anchorEl: null
        };
    }
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '245046245085-aqtiof6fnq42g2u1uooag9q9j028h9i4.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get()
                })

                this.OAuthChange(this.state.isSignedIn);
                this.auth.isSignedIn.listen(this.OAuthChange);
            });
        });
    }

    OAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.setState({
                isSignedIn: true
            })
            const userData = this.auth.currentUser.get().getBasicProfile();
            this.setState({ imageURL: userData.getImageUrl(), userName: userData.getName() });

            httpGet('/users').then((response) => {
                response.data.forEach(user => {
                    if (user.email === userData.getEmail()) {
                        localStorage.setItem('isAdmin', true);
                        this.props.adminToggle(true);
                    }
                })
            })
        } else {
            this.props.adminToggle(false);
            localStorage.removeItem('isAdmin');
            this.setState({ imageURL: undefined, userName: undefined, isSignedIn: false });
            this.props.history.push('/');
        }
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn({ prompt: 'select_account' });
    }

    handleClick = event => {
        event.persist();
        this.setState({
            anchorEl: event.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    renderAuthButton = () => {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <Fragment>
                    <img src={this.state.imageURL} onClick={this.handleClick} className={LoginStyles.logoImg} alt="user-profile-pic"></img>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}>
                        <MenuItem onClick={this.onSignOutClick}>Logout</MenuItem>
                    </Menu>
                </Fragment>
            );
        } else {
            return (
                <AccountCircle role="button" onClick={this.onSignInClick} className={LoginStyles.logoIcon} ></AccountCircle>
            );
        }
    }

    render() {

        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAdmin: state.isAdmin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        adminToggle: (isAdmin) => dispatch({ type: IS_ADMIN, payload: isAdmin })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));