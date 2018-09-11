---
title: "How it works: React Week 1 Day 1 - Functional components I"
date: "2018-06-11"
---

React is a UI library that is used in various forms to create complex, rich user interfaces. It powers user experiences in a way that is decoupled and unconcerned when and where the data is received.

<!-- end -->

Objectives:
* use an html file set up a react environment and mount an application to a target DOM element using React and ReactDOM.render
* use JSX to mount a DOM element and display that element in a web browser
* implement a functional component to render a piece of UI to the screen

## Setting up a React environment using a single HTML file

React takes what we have written, and passes it to this function called `React.createElement()` which turns our code into DOM elements with all of their appropriate handlers, styles and attributes laid out.

What we get with react is this idea of `composability` because all we have to do is think about React elements as smaller pieces of UI, and build out those small pieces of UI in these code blocks we call `components`.

Everything you do in react will done through this `createElement()` method however, as you’ll see in the coming material,this has now been abstracted away from us and we now have the ability to use this new technology called `JSX` to write out our react elements.

1. Create an `index.html` file with the following scaffolding

```
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Hello World React</title>
</head>

<body>
  <div id="target"></div>
</body>

<script>
  // Our app goes in between these script tags
</script>

</html>
```

2. Just before the script tags, add in our packages that we need

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

<script>
  // Our app goes in between these script tags
</script>
```

3. Create a DOM element using `React.createElement()` and make an `h1` element with a `class="heading"` and some child text `Hello world` 

```
<script>
const myElement = React.createElement('h1', {className:'heading'}, 'Hello World');
</script>
```

4. Use the `ReactDOM` library to target where our application will live, and inject our newly created `myElement` element using the `.render` method

```
<script>
const myElement = React.createElement('h1', {className:'heading'}, 'Hello World');
ReactDOM.render(myElement, document.getElementById('target'));
</script>
```

Notice we are passing our `myElement` as the first argument to render and we’re selecting our `<div id="target"></div>`. For every single react application you’ll ONLY DO THIS ONE TIME for a single application. Everything else well be built out as a child of this.

### Challenge

Steps to complete this assignment

* create an `index.html` file
* scaffold out a regular html page and add a `<div id="target"></div>` as the container for your application to live.
* pull in the React and ReactDOM packages via CDN/UNPKG
* create a script tag and add the attribute `type = “text/javascript”` so that you can write your react application inline
* inside your script tag, create your myElement variable and set it equal to the React.createElement() function: `const myElement = React.createElement()`
* Decide what type of element you want rendered to the screen, and what attributes (should have at least 1 className) you want on your element and what children text you’d like your element to display. Pass multiple strings to as children and see what happens.
* finally, mount your element to your wrapper div using `ReactDOM.render`

## Using JSX to mount a DOM element and display it in a web browser

We actually could build out an application using solely the `createElement` method, but eventually it’ll get really complex, and hard to reason about, as our application scales. This is why React gave us an abstraction on top of this method, called `JSX`.

[React takes your JSX and boils it down through React.createElement() calls](https://reactjs.org/docs/introducing-jsx.html#jsx-represents-objects "ReactJS docs: JSX represents objects") that is why it’s important to understand a little bit about this particular method.

1. Use something like `Babel` transpile your JSX into a regular version of JavaScript so that Chrome can read it. To get `babel-standalone` included into our html file for now, we can simply use the `UNPKG` cdn to retrieve it.

```
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
```

2. Refactor our `myElement` variable to use `JSX` instead of `React.createElement()`

```
const myElement = React.createElement('h1', {className:'heading'}, 'Hello World');

// becomes

const myElement = <h1 className="heading" >Hello World</h1>;
```

### Challenge

From scratch, build out a React application within an HTML file that will mount an header with your name, age and location. Use a `<style>` tag to add some CSS and make your profile you just built look nice and pretty.

## Implementing a functional component to render a piece of UI to the screen

Everything we’ll do in React will revolve around components. There are different types of components that we can use, and we’re going to start with the simplest type, the `Functional Component`. Simply put, we can use basic functions as components. These functions will simply return out some sort of JSX. Which will then be rendered out to the Browser.

Our most basic of components looks like this. It looks exactly like an anonymous arrow function that we’ve named BasicComponent. In fact, that is literally what this is.

```
const BasicComponent = () => <h1>Hello World</h1>;
```

1. Create a wrapper element `App` and pass it in to `ReactDOM.render`

```
const App = () => (
  <div>
   // Our components go in between these parent div tags
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
```

2. Build out some reusable functional components

```
const Header = () => {
  return <h1>Hello From React</h1>;
};

const BasicInput = () => {
  return <input type="text" placeholder="Change the world, one input at a time" />;
};

const BasicButton = () => {
  return <button>Click me I'm a button!</button>;
};
```

3. Pass the components into our wrapper `<App/>` component and Capitalize the Components

```
const App = () => (
  <div>
    <Header />
    <BasicInput />
    <BasicButton />
  </div>
);
```

### Challenge

Build out a few pieces of composed components from scratch.

This is a [React Cheat Sheet](https://devhints.io/react "by DEVHINTS.IO") and below is another

![React Cheat Sheet](https://ibin.co/4BGcJlgplMcW.png "React Cheat Sheet")
