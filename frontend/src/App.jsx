import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import CreatePostScreen from "./pages/CreatePostScreen";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/create-post" component={CreatePostScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
