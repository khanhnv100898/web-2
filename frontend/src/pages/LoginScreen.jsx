import React, { Component } from "react";
import "./LoginScreen.css";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // validate
    if (!this.state.email) {
      this.setState({
        errorMessage: "Please input email!",
      });
    } else if (!this.state.password) {
      this.setState({
        errorMessage: "Please input password!",
      });
    } else {
      this.setState({
        errorMessage: "",
        loading: true,
      });

      // fetch
      fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.success) {
            this.setState({
              errorMessage: data.message,
              loading: false,
            });
          } else {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            errorMessage: error.message,
            loading: false,
          });
        });
    }
  };

  // eslint-disable-next-line
  render() {
    return (
      <div
        className="bg-login"
        style={{}}
      >
        <div className="container">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <p className="text-danger">{this.state.errorMessage}</p>

            {this.state.loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loding.....</span>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}
