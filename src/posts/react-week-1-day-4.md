---
title: "How it works: React Week 1 Day 4: Class components II"
date: "2018-06-14"
---

This module is about the intricicies of how we operate within a React Class Component, how to build out an application that allows you to perform basic operations to a data set, and display changes to that data set to the screen.

<!-- end -->

Objectives:
* create, read and update a component's state object
* of  demonstrate two ways to properly use the `setState` function and describe the rules of it
* implement reusable and nested class components

## Creating reading and updating a component's state object

You can think of state as the data your components need, and the ability your components have to update/access data that would need to be displayed by the component itself. Learning to use the `state` object and `setState` function will help you gain an understanding as to why we have React and what it’s really good at doing.

[State and lifecycle explained in the React Docs](https://reactjs.org/docs/state-and-lifecycle.html)

If we simply passed down some items to a component via props on an array for example, we wouldn’t really have a way for us to manipulate and update that information as needed.

React gives us a tool to work with the `state` object that we put on our constructor function. This tool is called `setState` and it lives on the `Component` base-class as a method that we can tap into in order to make changes to state. Note calling setState will for React to trigger an invocation (call) to `render`. This is how react is reactive. Any time we change our state, our component gets re-rendered and our changes are immediately reflected on the screen.

```
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      [STATE_OBJECT]: ""
    };
  }

handleInputChange = (event) => {
  this.setState({ [STATE_OBJECT]: event.target.value });
}

render() {
    return (
      <div>
        <div>{this.state.[STATE_OBJECT]}</div>
        <input
            type="text"
            placeholder="change the [STATE_OBJECT]"
            onChange={this.handleInputChange}
        />
      </div>
    );
  }

}
```

This input field is pretty trivial, and demonstrates the use of `setState` pretty well, however, we’re trying to achieve the idea of `reusability`. So lets take a look at what happens to our input handler if we bind it to our input in a `controlled` fashion. One can create state from scratch.

```
class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  onClickMe = () => {
    this.setState({message: "Clicked"})
  }

  render() {
    return (
      <div className="App">
        <h1>Updating State via `SetState`</h1>
        <p>{this.state.message}</p>
        <button onClick={this.onClickMe}>Click me</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Changing the state of a boolean and conditionally rendering components is when things get interesting.

```
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

## Demonstrating two ways to use setState (and describing its rules)

`setState` can be async. There is a step between when we call `setState` in which our component changes are `diffed` through a process called `reconciliation`. Lets say we have a user that types in an input field: (1) User types in input field, (2) Reconciliation, (3) Input Component, (4) setState invoked, (5) Input Component re-renders

If I had some state that I was expecting to be changed by multiple calls to the `setState` function, it wouldn’t behave the way that I may have initially intended it to.

```
counterByThree = () => {
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 1 });
};
```

React will simply ignore a couple of the calls by using this process called batching. This will result in only the last call to setState actually taking place. The solution is using functional setState (the ability to pass a callback function to our setState function).

```
counterByThree = () => {
  this.setState(prevState => ({ count: prevState.count + 1 })),
    this.setState(prevState => ({ count: prevState.count + 1 })),
    this.setState(prevState => ({ count: prevState.count + 1 }));
};
```

This way solves both of our problems. We have controlled the batching of these calls to `setState` by returning a `Queue` of calls in this fashion. We are also reading from the `previous copy` of state rather than the current copy.

## Implimenting reusable and nested class components 

The idea that you could build a single component, and share it all over your application is one that React does really well. Because components can be singular representations of UI, you can achieve reusability rather simply and eloquently. This will help your applications grow and scale in a wonderful way.

A navigation bar may have a container, and multiple buttons/links, some logo. You’d need to pass these children elements into the navbar container you build right? It’s the same with react, we’ll build some complex piece of UI that we can nest together using the `compositional paradigm`.

[Composition and inheritance explained in the React Docs](https://reactjs.org/docs/composition-vs-inheritance.html)

https://codesandbox.io/s/qvkrx4zm56

1. Change the parent of the child to a Class component: (1) Change const to class, (2) Add CCR, (3) Add this to props, (4) console.log(props)

```
const City = props => {
  return (
    <div>
      {props.city.city}, {props.city.state}{" "}
      <Zips zipList={props.city.zip_codes} />{" "}
    </div>
  );
};

// becomes

class City extends React.Component {
  constructor(props) {
    console.log(props);
    super(props)
    // this.state goes here
  }
  render() {
  return (
    <div>
      {this.props.city.city}, {this.props.city.state}{" "}
      <Zips zipList={this.props.city.zip_codes} />{" "}
    </div>
  );
  }
};
```

2. Add zips to the state and console.log under the render function to make sure they're getting passed down

```
this.state = {
      zips: props.city.zip
    }

render() {
    console.log(this.state);
```

3. Change the child component into a stateless functional component

```
import React from "react";

class Zip extends React.Component {
  constructor() {
    super();
    this.state = {
      zips: []
    };
  }
  render() {
    // Lets build this out together!
    return <div>Zippity</div>;
  }
}
export default Zip;

// becomes

import React from "react";

const Zip = props => {
    // Lets build this out together!
    return <div>Zippity</div>;
  }

export default Zip;
```

4. Map over the `zips` in `state` of the `City` component

```
class City extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      zips: props.city.zip
    };
  }
  render() {
    console.log(this.state);
    return (
      <div>
        {this.props.city.city}, {this.props.city.state}{" "}
        {this.state.zips.map(zip => <Zip zipCode={zip} key={zip} />)}
      </div>
    );
  }
}
```

5. return `props.zipCode` on the `Zip` component

```
const Zip = props => {
    return <div>{props.zipCode}</div>;
  }
```

#### Here is a [recap](https://www.youtube.com/watch?time_continue=983&v=zlBDC1-hf-s)