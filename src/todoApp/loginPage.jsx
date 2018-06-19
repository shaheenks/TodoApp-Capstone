import React from "react";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password: '',
            failed: this.props.failed
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit(e) {
        this.props.onSubmit(this.state.username, this.state.password);
        e.preventDefault()
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-5">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" value={this.state.username} onChange={this.onUsernameChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-5">
                    <input type="password" className="form-control" id="inputPassword3" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange}/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </div>
            {this.props.failed ? <div className="alert alert-danger" role="alert">
            Login Failed.
            </div>: <div></div>}
            </form>
        )
    }
}

export default LoginPage;