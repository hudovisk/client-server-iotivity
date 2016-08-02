import React from 'react';

import { connect } from 'react-redux';

import Resource from './Resource';

import * as actionsCreator from '../actions/resourceActions';

export const ResourceList = React.createClass({
  renderResources: function(resources) {
    if(resources) {
      return (
        <div>
          {resources.map(res => 
            <Resource key={res.id} {...this.props} resource={res} />
          )}
        </div>
      )
    } else {
      return (
        <div>
          <h2><small>None resources available!</small></h2>
        </div>
      )
    }
  },

  render: function() {
    const { resources } = this.props;
    return (
      <div>
        <h1>Resources</h1>
        <button 
          className="btn btn-info"
          onClick={() => this.props.discoverResources()}>
            Discover all
        </button>
        <div style={{marginTop: '10px'}} className="container">
          { this.renderResources(resources) }
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    resources: state.get('resources').toJS()
  }
}

export const ResourceListContainer = connect(
  mapStateToProps,
  actionsCreator
)(ResourceList);