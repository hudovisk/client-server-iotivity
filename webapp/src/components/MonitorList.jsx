import React from 'react';

import { connect } from 'react-redux';

import { ResourceGraphContainer } from './ResourceGraph';

export const MonitorList = React.createClass({
  render: function() {
    const { resources } = this.props;
    return (
      <div>
        <h1>Monitor</h1>
        <div className='row'>
          {resources.map(resource => {
            return (
              <div className='col-md-4 col-sm-6' key={resource.id}>
                <div className="panel panel-default">
                  <div className='panel-heading'>
                    <strong>{resource.uri}</strong>
                  </div>
                  <div className="panel-body">
                    <ResourceGraphContainer {...this.props} resource={resource} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    resources: state.get('monitoredResources').toJS()
  }
}

export const MonitorListContainer = connect(
  mapStateToProps
)(MonitorList);