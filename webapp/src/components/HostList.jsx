import React from 'react';

import { connect } from 'react-redux';

import * as actionsCreator from '../actions/resourceActions';

import { ResourceListContainer } from './ResourceList';

export const HostList = React.createClass({
  render: function() {
    const { hosts } = this.props;
    const buttonStyle = {
      marginLeft: '10px'
    };
    return (
      <div>
        <h1>Resources</h1>
        <button className="btn btn-info">Discover all</button>
          {hosts.map((host, key) => {
            return (
              <ResourceListContainer {...this.props} resources={host.resources ? host.resources : []} />
            )
          })}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    hosts: state.get('hosts').toJS()
  }
}

export const HostListContainer = connect(
  mapStateToProps,
  actionsCreator
)(HostList);