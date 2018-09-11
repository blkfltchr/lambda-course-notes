---
title: "How it works: React Week 1 Day 2 - Class components I"
date: "2018-06-13"
---

Class Components are a big part of the React ecosystem because they bring a lot of functionality that we normally don’t get with the React API when using Functional Components.

<!-- end -->

Objectives:
* use a class component to render some state data to the DOM
* iterate over a list of of data and generate an array of React Components
* share data between components using state and props
* respond to events triggered by user interaction and handle user input via forms in React

## Using a class component to render some state data to the DOM

The `React.Component` _**base**_ class  allows us to tap into what we call the `Component Lifecycle`. Its methods give us control into how our components work, and if we’d like to use them, we have to build out a class component that extends the `React.Component` parent class:

```
class FooComponent extends React.Component {}
```

One integral part of creating components as classes is that you have the ability to set up a data object that your component might need to be concerned with by way using `state` as we call it and setting that object up on our `constructor` method. Once we have some data that we can render out to the DOM we need a vehicle that will allow us to render that data - this is achieved by returning some sort of JSX from within the life-cycle hook called `render`.

1. Declare your class, and extend the React.Component Base class.

```
class FooComponent extends React.Component {
```

2. Now we’ll set up our constructor and add state.

```
constructor() {
  super();
  this.state = {};
}
```

3. Render some UI and don’t forget to return some JSX

```
render() {
  return <div>Hello, I am Foo Component</div>;
}
```

Our final component should look like this.

```
class FooComponent extends React.Component {
  constructor() { 
    super();
    this.state = {};
  }
  render() {
    return <div>Hello, I am Foo Component</div>;
  }
} 
```

4. Now lets add a property to our state data. Define a message property on the state object.

```
this.state = { 
  message: "Hello from App State!!"
};
```

5. Now we have that message on our Component’s state we can use it through interpolation. In our render method lets change the the message that we are currently printing out inside of that `div` to reference the state object. Remember the `this` keyword when pointing to an object on the Class constructor.

```
render() {
  return <div>{this.state.message}</div>;
}
```

### Challenge

Lets take the functionality of this class component that we built earlier and extend it just a little bit. Declare a `Functional Component` called `RenderMessage` inside this [CodeSandbox](https://codesandbox.io/s/103jkor46q).

* Make sure you declare your Props Object that will be passed into this component.
* Return a `div` who’s child is `props.message`
* Now inside of the `App` class pass in that `RenderMessage` component and pass down a message prop to `RenderMessage`. This message prop should be set equals to the message property on the state object.
* Once it’s all wired up properly you’ve done it!

## Iterating over a list of data and generating an array of React Components

Lets look at the data we want to represent as DOM elements. We’ll render out a list of `Favorite Bands`.

```
const BandsData = [
  { bandName: "Modest Mouse" },
  { bandName: "Led Zeppelin" },
  { bandName: "The Beatles" },
  { bandName: "Guster" },
  { bandName: "Kygo" },
  { bandName: "Dear and the Headlights" },
  { bandName: "Grizzly Bear" }
];
```

We’ll give this new list to React and let it do it’s magic! This is all done with `.map`. Lets see the logic of this first before we apply it to a React Component. This should return us an array of `JSX` elements which are `divs` with the child of `band.bandName` interpolated as strings.

```
const newListOfData = BandsData.map(band => {
  return <div>{band.bandName}</div>;
});
```

Now lets apply this to a React Component.

```
const App = () => {
  return (
    <div className="App">
      {BandsData.map(band => {
        return <div>{band.bandName}</div>;
      })}
    </div>
  );
};
```

To make this work, there a few more steps:
1. Take the list and set in on state
2. Check your state by console.logging
3. `Map` over `bands` and return all wrapped in `divs` with `band.bandName` and `band.albumName`
4. Give each child a unique `key` prop

```
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const BandsData = [
  { id: 0, bandName: "Led Zeppelin", albumName: "Led Zeppelin II" },
  { id: 1, bandName: "The Beatles", albumName: "Sgt. Peppers Lonely Heart Clubs Band" },
  { id: 2, bandName: "Grizzly Bear", albumName: "Veckatimist" }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "music",
      // Step 1
      bands: BandsData
    };
  }
  render() {
      // Step 2
    console.log(this.state);
    return (
      <div className="App">
        <h1>My favourite {this.state.name}</h1>
        // Step 3
        {this.state.bands.map(band => {
                // Step 4
          return <div key={band.id}>{band.bandName}: {band.albumName} </div>
        })}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Sharing data between components using state and props

We are nothing in React if we can’t pass state around from one component to another. The way that we achieve this is this idea of `state to props`. Whatever is set on the state of our `Components` can be shared between components by passing it down as props.

State is as persistent as long as the component is on the screen, we can use it to hold on to memory for our application. That memory could be any data that we pull in from a server elsewhere, some edits from a submission form or simply just based on Users interacting with your web page.

Remember that state is just an object that we have access to which lives on the `class component`'s constructor. What’s great about this state object, is that when it changes our component will re-render. We can also pass whatever data is found on this state object around as props to other components.

1. Create a `Message` component in `./components/MessageComponent` (steps are the same for the `Name` component)

```
import React from "react";

const Message = props => <h1>{props.propsMessage}</h1>;

export default Message;

// Name component

import React from "react";

const Name = props => <h1>My name is {props.propsName}</h1>;

export default Name;

```

2. Import it with `import Message from "./components/MessageComponent";`
3. Add a `message` to `this.state`
4. Bring in the `Message` component to App and pass down the message with `propsMessage={this.state.message}` (notice propsMessage is the same as the component above)

```
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
// Step 2
import Message from "./components/MessageComponent";

class App extends React.Component {
  constructor() {
    super();
    // Step 3
    this.state = {
      message: "G'day, monsieur!",
      name: "Blake"
    };
  }

  render() {
    return (
      <div className="App">
      // Step 4
        <Message propsMessage={this.state.message} />
        <Name propsName={this.state.name} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Remember, state is mutable. You can change it with a function called `setState()`. This is how it works with an input form

1. Change `message` in state to an empty string

```
this.state = {
      message: "",
      name: "Blake"
    };
```

2. Create a `handleInputChange` function that uses `setState` to set the value of `message` with whatever is in the input field

```
  handleInputChange = event => {
    this.setState({message: event.target.value})
  }
```

3. Add an `input` div to App and onChange set it to `this.handleInputChange` (notice its not in state so it doesn't have this.state)

Remember, the message component is receiving the changes from this.setState. In the end, the file will look like this:

```
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Message from "./components/MessageComponent";
import Name from "./components/NameComponent";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      name: "Blake"
    };
  }

  handleInputChange = event => {
    this.setState({message: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <Message propsMessage={this.state.message} />
        <Name propsName={this.state.name} />
        <input onChange={this.handleInputChange} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Responding to events triggered by user interaction and handle user input via forms in React

In Web development everything you do is based around the `Document Object Model (DOM)`. The DOM has built into it an event loop that listens for changes across some part of the UI. To access that event loop in the Virtual DOM the react team put together what is called the `Synthetic Event` so that we can pretty much have access to all the events we would need to provide users with an interactive web application. _**Learn to harness the power of events in React and you’ll be set to build out React Web Applications.**_

How do we take in user input via forms, respond to clicks, mouse events and scrolling? Here is a statement straight from the [React Docs](https://reactjs.org/docs/handling-events.html "Handling events")

Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:

* React events are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

Below are three examples of different handlers (`onClick`, `onDoubleClick`, `onChange`) and different outputs (`alert`, `console.log`, `this.setState`)

```
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      someValue: '',
    }
  }  

  clickHandler = () => alert("Single Click!");
  doubleClickHandler = () => console.log("Double Clicked!");
  changeHandler = event => {
    this.setState({ someValue: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <h1>Hello Handlers</h1>
        <h2>Lets build out some handler functions.</h2>
        <button onClick={this.clickHandler}>Click Handler Demo</button>
        <button onDoubleClick={this.doubleClickHandler}>Double Click Handler</button>
        <input onChange={this.changeHandler} placeholder="Change my input" />
        <p>To get this output: {this.state.someValue}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```

### Two projects

[React Todo](https://github.com/LambdaSchool/React-Todo)

[React-Sorting-Hat](https://github.com/LambdaSchool/React-Sorting-Hat)