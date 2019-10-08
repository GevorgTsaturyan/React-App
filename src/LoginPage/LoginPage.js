import React from 'react';
import languages from '../languages/languages';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            eMail: '',
            password: '',
            submitted: false,
            language: 'en',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTranslateToRussian = this.handleTranslateToRussian.bind(this);
        this.handleTranslateToEnglish = this.handleTranslateToEnglish.bind(this)
    }
    handleTranslateToRussian () {
        this.setState({ language: 'ru' })
    }
    handleTranslateToEnglish () {
        this.setState({ language: 'en' })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { eMail, password } = this.state;
        if (eMail && password) {
            this.props.login(eMail, password);
        }
    }

    render() {
        const translation = languages.currentLang(this.state.language);
        const { loggingIn } = this.props;
        const { eMail, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className="form-group">
                        <button onClick = {this.handleTranslateToEnglish} className={this.state.language === "en" ? "btn btn-default active btn-md": "btn btn-default btn-md"}>En</button>
                        <button onClick = {this.handleTranslateToRussian} className={this.state.language === "ru" ? "btn btn-default active btn-md": "btn btn-default btn-md"}>Ру</button>
                </div>
                <h2>{translation.logIn}</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !eMail ? ' has-error' : '')}>
                        <input type="text" className="form-control" placeholder = {translation.emailPlaceholder} name="eMail" value={eMail} onChange={this.handleChange} />
                        {submitted && !eMail &&
                            <div className="help-block">{translation.emailReq}</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control" placeholder = {translation.passPlaceholder} name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">{translation.reqPass}</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">{translation.logIn}</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <p>{translation.logInQuestion}</p>
                        <Link to="/register" className="btn btn-default btn-md">{translation.signUp}</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };