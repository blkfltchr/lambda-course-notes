---
title: "How it works: React Week 1 Day 2: Functional components II"
date: "2018-06-12"
---
The way that data flows throughout a React app is crucial to understand when it comes to developing programs built in React. In React, when we pass our data around it’s passed around using State and Props. 

<!-- end -->

Objectives:
* describe props and how data flows in a reacy application
* use props to dynamically pass data to a React Component making it reusable in different contexts
* demonstrate the ability to implement nested functional components

## Describing props and how data flows in a react application

In React, when we pass our data around it’s passed around using State and Props. The direction in which data flows is top to bottom.

Props are immutable (or Read only) meaning we cannot mutate props in any fashion. We simple receive them in our components and use them to display data to the user. Remember the idea here is to build out User Interfaces. How do we interface with our users, and Props are that data that we pass around that our users will interact with.

Take the following example:

```
const MyComponentsWithProps = props => {
    return <h1>Hello, my name is {props.name}</h1>;
};
```

When we use the component above, we’ll pass it some props so that we can print our name using that component. Because of reusability, I can now use this component in multiple instances:

```
<MyComponentsWithProps name="Fred" />
```

Displays "Hello, my name is Fred." And we can use it in other instances.

```
<MyComponentsWithProps name="Barney" />
<MyComponentsWithProps name="Bam-bam" />
<MyComponentsWithProps name="Bety" />
<MyComponentsWithProps name="Wilma" />
<MyComponentsWithProps name="Pebbles" />
```

All of these components will display their name prop respectively. Each will have their own object created through the react ecosystem as we pass props DOWN to them that will look like this.

 Using props to get to know Bart

1. Open up an html document and add in the proper dependancies
2. Create an object with with name, identity, age and best_friend
3. Set up a component that relys on the props from the `BartProfile` object
4. Pass down the object as a prop called `bart` and mount it up

```
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Getting to know Bartholomew J. Simpson</title>
</head>

<body>
    <div id="root"></div>

    // Step 1
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

    <script type="text/babel">

        // Step 3
        const BartComponent = props => {
            return (
                <div>
                <h3>Name: {props.bart.name}</h3>
                <p> age: {props.bart.age}</p>
                <p>Identity: {props.bart.identity}</p>
                <p>Best Friend: {props.bart.best_friend}</p>
                </div>
            );
            }

        const App = () => {
            
            // Step 2
            const BartProfile = {
                name: "Bartholomew Jo-Jo Simpson",
                identity: "The troublemaker of the Simpson family.",
                age: "10 (2 years and 38 days older than Lisa)",
                best_friend: 'Milhouse Van Houten',
            }

            return
                <div>
                    // Step 4
                    <BartComponent bart={BartProfile}>
                </div>
        }

        ReactDom.render(<App />, document.getElementById('root'));
    </script>

</body>

</html>
```

### Challenge

Build out a component called `<MeComponent />` that will depend on Props being passed down to it. Those fields on the Props object will be descriptors about who you are as a person. Render out your `name`, `age`, `location`, `favoriteBook`, `favoriteBand`.

## Using props to dynamically pass data to a React Component making it reusable in different contexts

1. Define a basic button and declare a className of `props.buttonStyles`
2. Pass the `<Basicbutton />` into the `App`
3. Use defaultProps to declare the className of `props.buttonStyles` as teal
4. Wrap ``props.buttonStyles`` with `backticks` and add basic styling to the button with a second class in a string
5. Copy and paste more buttons into the `App` component
6. Change the `buttonStyles` prop to red and create a new class in between the style tags

```
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Changing button colours with Reusability</title>

    <style>
    // Inline styles go here

    // Step 2b
    .teal {
        background: teal;
    }

    // Step 6b
    .red {
        background: red;
    }

    // Step 4b
    .basicButtonStyles {
        height: 40px;
        width: 150px;
        color: white;
        font-size: 18px;
    }

    </style>

</head>

<body>
    <div id="root"></div>

    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

    <script type="text/babel">

        // Step 1                                       Step 4a
        const BasicButton = props => <button className={`basicButtonStyles ${props.buttonStyles}`}>Click me!</button>
        // Step 2a
        BasicButton.defaultProps = {
            buttonStyles: 'teal',
        }

        const App = () => {

            return
                <div>
                    <h2>Click on a button</h2>
                    // Step 2
                    <BasicButton />
                    // Step 5
                    <BasicButton buttonStyles={red} />
                    <BasicButton />
                    // Step 6a
                    <BasicButton buttonStyles={red} />
                    <BasicButton />
                </div>
        }

        ReactDom.render(<App />, document.getElementById('root'));
    </script>

</body>

</html>
```

### Challenge

Create dynamic text on some of the buttons with `props.buttonText`

## Implementing nested functional components

* All components return some sort of object at the end of the day.
* Being that we can use functions to return these objects, we can nest them together to make giant component trees.
* The props chain will flow top to bototn.
* As we pass data from one component to the next, we need to make sure that we reference the props in the proper manner. This pattern is called Prop Drilling...

1. Create a html document with personData and a Parent component with props passed

```
<script type="text/babel">

    const Parent = props => {
        return (
            <h1>
                Parent: {props.personData.parentName}
            </h1>
        )
    };

    const App = () => {
        const personData = {
            parentName: 'Gordon',
            childName: 'Mark',
            grandChildName: 'Blake'
        };

        return (
            <div>
                <Parent personData={personData} />
            </div>
        );
    };

    ReactDom.render(<App />, document.getElementById('root'));

</script>
```

2. Create a `Child` component and pass it in to the `Parent` component

```
const Child = props => {
        return (
            <div>
                <h2>Child: {props.personData.childName}</h2>
            </div>
        )
    };

const Parent = props => {
    return (
        <div>
            <h1>Parent: {props.personData.parentName}</h1>
            <Child personData={props.personData} />
        </div>
    )
}
```

3. The cycle continues for the `Grandhcild` component

```
const GrandChild = props => <h3>Grandchild: {props.personData.childName}</h2>;

const Child = props => {
    return (
        <div>
            <h2>Child: {props.personData.childName}</h2>
            <Grandchild personData={props.personData} />
        </div>
    )
}
```

### Challenge

Create an object that represents a generational tree of your family similar to the [Simpsons Object](https://learn.lambdaschool.com/fsw/module/reckyfgpdgasln9ci#follow-along-5) found in our follow along example. Keep it simple. Build out a few nested components that demonstrate the ability to pass data and conditionally render components if certain props are available.