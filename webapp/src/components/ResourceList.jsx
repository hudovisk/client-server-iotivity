import React from 'react';

import { connect } from 'react-redux';

import Resource from './Resource';

export const ResourceList = React.createClass({
  render: function() {
    const { resources } = this.props;
    return (
      <div>
          {resources.map(res => 
            <Resource key={res.id} {...this.props} resource={res} />
          )}
      </div>
    );
  }
});

export const ResourceListContainer = connect()(ResourceList);