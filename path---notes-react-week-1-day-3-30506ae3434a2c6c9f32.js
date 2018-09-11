webpackJsonp([34472714654488],{338:function(e,t){e.exports={data:{markdownRemark:{html:'<p>Class Components are a big part of the React ecosystem because they bring a lot of functionality that we normally don’t get with the React API when using Functional Components.</p>\n<!-- end -->\n<p>Objectives:</p>\n<ul>\n<li>use a class component to render some state data to the DOM</li>\n<li>iterate over a list of of data and generate an array of React Components</li>\n<li>share data between components using state and props</li>\n<li>respond to events triggered by user interaction and handle user input via forms in React</li>\n</ul>\n<h2>Using a class component to render some state data to the DOM</h2>\n<p>The <code>React.Component</code> <em><strong>base</strong></em> class  allows us to tap into what we call the <code>Component Lifecycle</code>. Its methods give us control into how our components work, and if we’d like to use them, we have to build out a class component that extends the <code>React.Component</code> parent class:</p>\n<pre><code>class FooComponent extends React.Component {}\n</code></pre>\n<p>One integral part of creating components as classes is that you have the ability to set up a data object that your component might need to be concerned with by way using <code>state</code> as we call it and setting that object up on our <code>constructor</code> method. Once we have some data that we can render out to the DOM we need a vehicle that will allow us to render that data - this is achieved by returning some sort of JSX from within the life-cycle hook called <code>render</code>.</p>\n<ol>\n<li>Declare your class, and extend the React.Component Base class.</li>\n</ol>\n<pre><code>class FooComponent extends React.Component {\n</code></pre>\n<ol start="2">\n<li>Now we’ll set up our constructor and add state.</li>\n</ol>\n<pre><code>constructor() {\n  super();\n  this.state = {};\n}\n</code></pre>\n<ol start="3">\n<li>Render some UI and don’t forget to return some JSX</li>\n</ol>\n<pre><code>render() {\n  return &#x3C;div>Hello, I am Foo Component&#x3C;/div>;\n}\n</code></pre>\n<p>Our final component should look like this.</p>\n<pre><code>class FooComponent extends React.Component {\n  constructor() { \n    super();\n    this.state = {};\n  }\n  render() {\n    return &#x3C;div>Hello, I am Foo Component&#x3C;/div>;\n  }\n} \n</code></pre>\n<ol start="4">\n<li>Now lets add a property to our state data. Define a message property on the state object.</li>\n</ol>\n<pre><code>this.state = { \n  message: "Hello from App State!!"\n};\n</code></pre>\n<ol start="5">\n<li>Now we have that message on our Component’s state we can use it through interpolation. In our render method lets change the the message that we are currently printing out inside of that <code>div</code> to reference the state object. Remember the <code>this</code> keyword when pointing to an object on the Class constructor.</li>\n</ol>\n<pre><code>render() {\n  return &#x3C;div>{this.state.message}&#x3C;/div>;\n}\n</code></pre>\n<h3>Challenge</h3>\n<p>Lets take the functionality of this class component that we built earlier and extend it just a little bit. Declare a <code>Functional Component</code> called <code>RenderMessage</code> inside this <a href="https://codesandbox.io/s/103jkor46q">CodeSandbox</a>.</p>\n<ul>\n<li>Make sure you declare your Props Object that will be passed into this component.</li>\n<li>Return a <code>div</code> who’s child is <code>props.message</code></li>\n<li>Now inside of the <code>App</code> class pass in that <code>RenderMessage</code> component and pass down a message prop to <code>RenderMessage</code>. This message prop should be set equals to the message property on the state object.</li>\n<li>Once it’s all wired up properly you’ve done it!</li>\n</ul>\n<h2>Iterating over a list of data and generating an array of React Components</h2>\n<p>Lets look at the data we want to represent as DOM elements. We’ll render out a list of <code>Favorite Bands</code>.</p>\n<pre><code>const BandsData = [\n  { bandName: "Modest Mouse" },\n  { bandName: "Led Zeppelin" },\n  { bandName: "The Beatles" },\n  { bandName: "Guster" },\n  { bandName: "Kygo" },\n  { bandName: "Dear and the Headlights" },\n  { bandName: "Grizzly Bear" }\n];\n</code></pre>\n<p>We’ll give this new list to React and let it do it’s magic! This is all done with <code>.map</code>. Lets see the logic of this first before we apply it to a React Component. This should return us an array of <code>JSX</code> elements which are <code>divs</code> with the child of <code>band.bandName</code> interpolated as strings.</p>\n<pre><code>const newListOfData = BandsData.map(band => {\n  return &#x3C;div>{band.bandName}&#x3C;/div>;\n});\n</code></pre>\n<p>Now lets apply this to a React Component.</p>\n<pre><code>const App = () => {\n  return (\n    &#x3C;div className="App">\n      {BandsData.map(band => {\n        return &#x3C;div>{band.bandName}&#x3C;/div>;\n      })}\n    &#x3C;/div>\n  );\n};\n</code></pre>\n<p>To make this work, there a few more steps:</p>\n<ol>\n<li>Take the list and set in on state</li>\n<li>Check your state by console.logging</li>\n<li><code>Map</code> over <code>bands</code> and return all wrapped in <code>divs</code> with <code>band.bandName</code> and <code>band.albumName</code></li>\n<li>Give each child a unique <code>key</code> prop</li>\n</ol>\n<pre><code>import React from "react";\nimport ReactDOM from "react-dom";\n\nimport "./styles.css";\n\nconst BandsData = [\n  { id: 0, bandName: "Led Zeppelin", albumName: "Led Zeppelin II" },\n  { id: 1, bandName: "The Beatles", albumName: "Sgt. Peppers Lonely Heart Clubs Band" },\n  { id: 2, bandName: "Grizzly Bear", albumName: "Veckatimist" }\n];\n\nclass App extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      name: "music",\n      // Step 1\n      bands: BandsData\n    };\n  }\n  render() {\n      // Step 2\n    console.log(this.state);\n    return (\n      &#x3C;div className="App">\n        &#x3C;h1>My favourite {this.state.name}&#x3C;/h1>\n        // Step 3\n        {this.state.bands.map(band => {\n                // Step 4\n          return &#x3C;div key={band.id}>{band.bandName}: {band.albumName} &#x3C;/div>\n        })}\n      &#x3C;/div>\n    );\n  }\n}\n\nconst rootElement = document.getElementById("root");\nReactDOM.render(&#x3C;App />, rootElement);\n</code></pre>\n<h2>Sharing data between components using state and props</h2>\n<p>We are nothing in React if we can’t pass state around from one component to another. The way that we achieve this is this idea of <code>state to props</code>. Whatever is set on the state of our <code>Components</code> can be shared between components by passing it down as props.</p>\n<p>State is as persistent as long as the component is on the screen, we can use it to hold on to memory for our application. That memory could be any data that we pull in from a server elsewhere, some edits from a submission form or simply just based on Users interacting with your web page.</p>\n<p>Remember that state is just an object that we have access to which lives on the <code>class component</code>\'s constructor. What’s great about this state object, is that when it changes our component will re-render. We can also pass whatever data is found on this state object around as props to other components.</p>\n<ol>\n<li>Create a <code>Message</code> component in <code>./components/MessageComponent</code> (steps are the same for the <code>Name</code> component)</li>\n</ol>\n<pre><code>import React from "react";\n\nconst Message = props => &#x3C;h1>{props.propsMessage}&#x3C;/h1>;\n\nexport default Message;\n\n// Name component\n\nimport React from "react";\n\nconst Name = props => &#x3C;h1>My name is {props.propsName}&#x3C;/h1>;\n\nexport default Name;\n</code></pre>\n<ol start="2">\n<li>Import it with <code>import Message from "./components/MessageComponent";</code></li>\n<li>Add a <code>message</code> to <code>this.state</code></li>\n<li>Bring in the <code>Message</code> component to App and pass down the message with <code>propsMessage={this.state.message}</code> (notice propsMessage is the same as the component above)</li>\n</ol>\n<pre><code>import React from "react";\nimport ReactDOM from "react-dom";\n\nimport "./styles.css";\n// Step 2\nimport Message from "./components/MessageComponent";\n\nclass App extends React.Component {\n  constructor() {\n    super();\n    // Step 3\n    this.state = {\n      message: "G\'day, monsieur!",\n      name: "Blake"\n    };\n  }\n\n  render() {\n    return (\n      &#x3C;div className="App">\n      // Step 4\n        &#x3C;Message propsMessage={this.state.message} />\n        &#x3C;Name propsName={this.state.name} />\n      &#x3C;/div>\n    );\n  }\n}\n\nconst rootElement = document.getElementById("root");\nReactDOM.render(&#x3C;App />, rootElement);\n</code></pre>\n<p>Remember, state is mutable. You can change it with a function called <code>setState()</code>. This is how it works with an input form</p>\n<ol>\n<li>Change <code>message</code> in state to an empty string</li>\n</ol>\n<pre><code>this.state = {\n      message: "",\n      name: "Blake"\n    };\n</code></pre>\n<ol start="2">\n<li>Create a <code>handleInputChange</code> function that uses <code>setState</code> to set the value of <code>message</code> with whatever is in the input field</li>\n</ol>\n<pre><code>  handleInputChange = event => {\n    this.setState({message: event.target.value})\n  }\n</code></pre>\n<ol start="3">\n<li>Add an <code>input</code> div to App and onChange set it to <code>this.handleInputChange</code> (notice its not in state so it doesn\'t have this.state)</li>\n</ol>\n<p>Remember, the message component is receiving the changes from this.setState. In the end, the file will look like this:</p>\n<pre><code>import React from "react";\nimport ReactDOM from "react-dom";\n\nimport "./styles.css";\nimport Message from "./components/MessageComponent";\nimport Name from "./components/NameComponent";\n\nclass App extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      message: "",\n      name: "Blake"\n    };\n  }\n\n  handleInputChange = event => {\n    this.setState({message: event.target.value})\n  }\n\n  render() {\n    return (\n      &#x3C;div className="App">\n        &#x3C;Message propsMessage={this.state.message} />\n        &#x3C;Name propsName={this.state.name} />\n        &#x3C;input onChange={this.handleInputChange} />\n      &#x3C;/div>\n    );\n  }\n}\n\nconst rootElement = document.getElementById("root");\nReactDOM.render(&#x3C;App />, rootElement);\n</code></pre>\n<h2>Responding to events triggered by user interaction and handle user input via forms in React</h2>\n<p>In Web development everything you do is based around the <code>Document Object Model (DOM)</code>. The DOM has built into it an event loop that listens for changes across some part of the UI. To access that event loop in the Virtual DOM the react team put together what is called the <code>Synthetic Event</code> so that we can pretty much have access to all the events we would need to provide users with an interactive web application. <em><strong>Learn to harness the power of events in React and you’ll be set to build out React Web Applications.</strong></em></p>\n<p>How do we take in user input via forms, respond to clicks, mouse events and scrolling? Here is a statement straight from the <a href="https://reactjs.org/docs/handling-events.html" title="Handling events">React Docs</a></p>\n<p>Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:</p>\n<ul>\n<li>React events are named using camelCase, rather than lowercase.</li>\n<li>With JSX you pass a function as the event handler, rather than a string.</li>\n</ul>\n<p>Below are three examples of different handlers (<code>onClick</code>, <code>onDoubleClick</code>, <code>onChange</code>) and different outputs (<code>alert</code>, <code>console.log</code>, <code>this.setState</code>)</p>\n<pre><code>import React from "react";\nimport ReactDOM from "react-dom";\n\nimport "./styles.css";\n\nclass App extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      someValue: \'\',\n    }\n  }  \n\n  clickHandler = () => alert("Single Click!");\n  doubleClickHandler = () => console.log("Double Clicked!");\n  changeHandler = event => {\n    this.setState({ someValue: event.target.value });\n  };\n\n  render() {\n    return (\n      &#x3C;div className="App">\n        &#x3C;h1>Hello Handlers&#x3C;/h1>\n        &#x3C;h2>Lets build out some handler functions.&#x3C;/h2>\n        &#x3C;button onClick={this.clickHandler}>Click Handler Demo&#x3C;/button>\n        &#x3C;button onDoubleClick={this.doubleClickHandler}>Double Click Handler&#x3C;/button>\n        &#x3C;input onChange={this.changeHandler} placeholder="Change my input" />\n        &#x3C;p>To get this output: {this.state.someValue}&#x3C;/p>\n      &#x3C;/div>\n    );\n  }\n}\n\nconst rootElement = document.getElementById("root");\nReactDOM.render(&#x3C;App />, rootElement);\n</code></pre>\n<h3>Two projects</h3>\n<p><a href="https://github.com/LambdaSchool/React-Todo">React Todo</a></p>\n<p><a href="https://github.com/LambdaSchool/React-Sorting-Hat">React-Sorting-Hat</a></p>',frontmatter:{title:"How it works: React Week 1 Day 2 - Class components I",date:"June 13 2018"}}},pathContext:{slug:"/notes/react-week-1-day-3/"}}}});
//# sourceMappingURL=path---notes-react-week-1-day-3-30506ae3434a2c6c9f32.js.map