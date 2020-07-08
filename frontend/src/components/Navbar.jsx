import React, { Component } from "react";

export default class Navbar extends Component {
  state = {
    currentUser: undefined,
  };

  componentWillMount() {
    fetch("http://localhost:3001/api/users/get-current-user", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          this.setState({
            currentUser: data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  handleLogout = () => {
    // goi sang server de logout
    fetch("http://localhost:3001/api/users/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          // clear session
          this.setState({
            currentUser: undefined,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  handleCreatePostClick = () => {
    window.location.href = "/create-post";
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <a className="navbar-brand" href="/">
          Image
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.state.currentUser ? (
              <>
                <li className="nav-item">
                  <div className="nav-link">
                    Welcome, {this.state.currentUser.email}
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={this.handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          {this.state.currentUser ? (
            <>
              <button
                onClick={this.handleCreatePostClick}
                className="btn btn-outline-primary my-2 my-sm-0 ml-2"
              >
                + New post
              </button>
            </>
          ) : null}
        </div>
      </nav>
    );
  }
}
