import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, hashHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';

import io from 'socket.io-client';

import { App } from './components/App';
import { ResourceListContainer } from './components/ResourceList';
import { MonitorListContainer } from './components/MonitorList';

import * as ResourceActions from './actions/resourceActions';
import resourceReducer from './reducers/resourceReducer';

import remoteMiddleware from './actions/remote-middleware';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const socket = io('http://52.66.121.213/', {
  query: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NzZjNjFhZTE1ZTVlOWRkMjg2MjJjY2YiLCJuYW1lIjoiSHVkbyIsImVtYWlsIjoiaHVkb0BodWRvLmNvbSIsImlhdCI6MTQ2OTczMzY2NCwiZXhwIjoxNDcwNTk3NjY0fQ.GeODDuc4mh8fI_-yymJ6IbI_O7yA82KabOx5-DU-MO4"
});

const createStoreWithMiddleware = applyMiddleware(
  remoteMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(resourceReducer);

socket.on("discovery response", function(resource) {
  console.log("discover response");
  console.log(resource);
  switch(resource.uri)
  {
  case '/oic/d':
    return;
    //store.dispatch(discoverDevice(host));
  case '/oic/p':
    return;
    //sotre.dispatch(discoverPlatform(host));
  default:
    store.dispatch(ResourceActions.rcvdDiscoverResource(resource));
    return;
  }
});

socket.on("get response", function(resource) {
  console.log("get response");
  console.log(resource);
  switch(resource.uri)
  {
  case '/oic/d':
    return;
    //store.dispatch(discoverDevice(host));
  case '/oic/p':
    return;
    //sotre.dispatch(discoverPlatform(host));
  default:
    store.dispatch(ResourceActions.rcvdGetResource(resource));
    return;
  }
});

socket.on("observe response", function(resource) {
  console.log("observe response");
  console.log(resource);
  store.dispatch(ResourceActions.rcvdObserveResource(resource));
  // switch(host.resource.uri)
  // {
  // case '/oic/d':
  //   return;
  //   //store.dispatch(discoverDevice(host));
  // case '/oic/p':
  //   return;
  //   //sotre.dispatch(discoverPlatform(host));
  // default:
  //   store.dispatch(ResourceActions.rcvdGetResource(host));
  //   return;
  // }
});

const routes = 
  <Route component={App}>
    <Redirect from='/' to='/resources' />
    <Route path="/resources" component={ResourceListContainer} />
    <Route path="/monitor" component={MonitorListContainer} />
  </Route>;

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={hashHistory}>{routes}</Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
