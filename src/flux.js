// dash-ui/lib/flux - An EventEmitter-based layman's Flux implementaion
// The MIT License (MIT) Copyright (c) 2016 Masakazu Yoshida

import React from 'react';
import { EventEmitter } from 'events';

const sharedContextTypes = { store: React.PropTypes.any };

export class Component extends React.Component {
  dispatch(...args) {
    return this.context.store.dispatch(...args);
  }
  render() {
    return null;
  }
}
Component.contextTypes = sharedContextTypes;

export const dispatchMixin = {
  contextTypes: sharedContextTypes,
  dispatch(...args) {
    return this.context.store.dispatch(...args);
  },
};

class Provider extends React.Component {
  getChildContext() {
    return { store: this.props.store };
  }
  render() {
    return React.Children.only(this.props.children);
  }
}
Provider.childContextTypes = sharedContextTypes;
Provider.propTypes = {
  children: React.PropTypes.any.isRequired,
  store: React.PropTypes.any.isRequired,
};

class Store extends EventEmitter {
  constructor({ actions = [], initialState = {}, middleware = [],
                renderer = null }) {
    super();
    this.addActions(actions);
    this.state = initialState;
    this.middleware = middleware;
    this.setRenderer(renderer);
    this.rendered = null;
    this._queue = [];
    this._engaged = this._async = false;
  }

  addActions(actions) {
    Object.keys(actions).forEach(k => this.on(k, actions[k]));
  }

  getState() {
    return this.state;
  }

  setRenderer(renderer) {
    if (renderer !== null && typeof renderer !== 'function') {
      console.error('store: renderer is not a function');
    }
    this.renderer = renderer;
  }

  render() {
    const connect = rootElement =>
            React.createElement(Provider, { store: this }, rootElement);
    if (this.renderer) {
      this.rendered = this.renderer(this.state, connect);
    }
  }

  dispatch(event, ...args) {
    this.emit(':dispatch', event, ...args);
    this.emit(event, ...args);
  }

  applyMiddleware(state) {
    return this.middleware.reduce((s, next) => next(s), state);
  }

  update(fn) {
    const loop = state => {
      if (this._queue.length === 0) {
        const async = this._async;
        const prev = this.state;
        this._engaged = this._async = false;
        if (state === null || state === undefined) {
          const msg = 'store: update function returned null or undefined';
          console.error(msg);
        }
        if (state !== prev) {
          this.state = state;
          this.render();
        }
        this.emit(':update-state', state, prev);
        if (async) {
          this.emit(':end-async-update');
        }
        return state;
      }
      const next = this._queue.shift();
      let nextState = this.applyMiddleware(next(state));
      if (nextState instanceof Promise) {
        if (!this._async) {
          this._async = true;
          this.emit(':start-async-update');
        }
      } else {
        if (this._queue.length === 0) {
          return Promise.resolve(loop(nextState));	// shortcut
        }
        nextState = Promise.resolve(nextState);
      }
      return nextState.then(s => loop(s));
    };

    // Note: A promise may have multiple ".then()". They work as if
    // multiple event handlers listening to the same event.
    if (this._engaged) {
      this._queue.push(fn);
      return this._promise;
    }
    this._engaged = true;
    this._queue = [fn];
    this._promise = loop(this.state);
    return this._promise;
  }

  inject(fn) {
    if (!this._engaged) {
      return null;
    }
    const state = this.applyMiddleware(fn(this.state));
    if (state instanceof Promise) {
      console.error('store: inject: a Promise was passed as state');
      return null;
    }
    const prev = this.state;
    this.state = state;
    this.render();
    this.emit(':inject-state', state, prev);
    return state;
  }
}

export function createStore({
  actions = {}, initialState = {}, middleware = [], renderer = null }) {
  return new Store({ actions, initialState, middleware, renderer });
}

function isObject(obj) {
  return (typeof obj === 'object' && obj !== null);
}

function copyProps(dst, src) {
  Object.keys(src).forEach(k => { dst[k] = src[k]; });
  return dst;
}

export function dup(objOrArray) {
  // Note: this function works fine with ES5 or better
  if (Array.isArray(objOrArray)) {
    return objOrArray.slice(0);
  }
  if (isObject(objOrArray)) {
    return copyProps(objOrArray.constructor(), objOrArray);
  }
  return objOrArray;
}

export function next(state, delta = {}) {
  if (!isObject(state)) {
    console.error('store: next: state is not an object');
    return state;
  }
  return copyProps(dup(state), delta);
}
