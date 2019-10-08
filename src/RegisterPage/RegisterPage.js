import React from 'react';
import languages from '../languages/languages';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                confirmedPass: '',
                eMail: '',
                password: ''
            },
            submitted: false,
            language: 'en',

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTranslateToRussian = this.handleTranslateToRussian.bind(this);
        this.handleTranslateToEnglish = this.handleTranslateToEnglish.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleTranslateToRussian() {
        this.setState({ language: 'ru' });
    }
    handleTranslateToEnglish() {
        this.setState({ language: 'en' });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.name && user.confirmedPass && user.eMail && user.password && user.password === user.confirmedPass) {
            this.props.register(user);
        }
    }

    render() {
        const translation = languages.currentLang(this.state.language);
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className="form-group">
                    <button onClick={this.handleTranslateToEnglish} className={this.state.language == "en" ? "btn btn-default active btn-md" : "btn btn-default btn-md"}>En</button>
                    <button onClick={this.handleTranslateToRussian} className={this.state.language == "ru" ? "btn btn-default active btn-md" : "btn btn-default btn-md"}>Ру</button>
                </div>
                <h2>{translation.signUp} </h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.eMail ? ' has-error' : '')}>
                        <input type="text" className="form-control" placeholder={translation.emailPlaceholder} name="eMail" value={user.eMail} onChange={this.handleChange} />
                        {submitted && !user.eMail &&
                            <div className="help-block">{translation.emailReq}</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>

                        <input type="password" className="form-control" placeholder={translation.passPlaceholder} name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">{translation.reqPass}</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.confirmedPass ? ' has-error' : '')}>

                        <input type="password" className="form-control" placeholder={translation.confPass} name="confirmedPass" value={user.confirmedPass} onChange={this.handleChange} />
                        {submitted && user.password != user.confirmedPass && <div className="help-block">Incorrect Password Confirmation </div> || submitted && !user.confirmedPass &&
                            <div className="help-block">{translation.reqConfPass} </div>
                        }

                    </div>
                    <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>

                        <input type="text" className="form-control" placeholder={translation.namePlaceholder} name="name" value={user.name} onChange={this.handleChange} />
                        {submitted && !user.name &&
                            <div className="help-block">{translation.nameReq}</div>
                        }
                    </div>


                    <div className="form-group">
                        <button className="btn btn-primary">{translation.signUp}</button>
                        {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <p>{translation.question}</p>
                        <Link to="/login" className="btn btn-default btn-md">{translation.logIn}</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };