import React, { Component } from "react";

export default class RegisterScreen extends Component {
  state = {
    email: "",
    password: "",
    fullName: "",
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

  handleFullnameChange = (event) => {
    this.setState({
      fullName: event.target.value,
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
    } else if (!this.state.fullName) {
      this.setState({
        errorMessage: "Please input fullname!",
      });
    } else {
      this.setState({
        errorMessage: "",
        loading: true,
      });

      // fetch
      fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          fullName: this.state.fullName,
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
            window.location.href = "/login";
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

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
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
          <div className="form-group">
            <label>Fullname</label>
            <input
              className="form-control"
              value={this.state.fullName}
              onChange={this.handleFullnameChange}
            />
          </div>
          <p className="text-danger">{this.state.errorMessage}</p>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
