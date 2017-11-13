# dash-ui/lib/flux

An EventEmitter-based layman's Flux implementaion

## Installation

```shell
  npm install dash-ui --save
```

## Basic Usage ("Hello World")

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Component, createStore, next } from 'dash-ui/lib/flux';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <span>Counter: {this.props.count} </span>
        <button onClick={() => this.dispatch('inc')}>INC</button>
      </div>
    );
  }
}
MyComponent.propTypes = {
  count: React.PropTypes.number.isRequired,
};

const store = createStore({
  actions: {
    inc: ({ val = 1 }) => {
      store.update(state => {
        const { count } = state;
        return next(state, { count: count + val });
      });
    },
  },
  renderer(state, provider) {
    return ReactDOM.render(
      provider(<MyComponent {...state} />),
      document.getElementById('example'));
  },
});

store.update(() => { count: 0 });	// this fires rendering
```

## Release History

* 0.0.3 Revised lib/flux.js.

* 0.0.2 Added some utility functions.

* 0.0.1 Initial preliminary release
