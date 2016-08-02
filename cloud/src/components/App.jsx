import React from 'react';
import { Navigation } from './Navigation';

export const App = React.createClass({
  render: function() {
    return (
      <div>
        <Navigation />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
});