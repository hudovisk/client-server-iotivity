import classNames from 'classnames';
import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import ResourceAttr from './ResourceAttr';

export default React.createClass({
  renderAttrs: function(attrs) {
    if(attrs) {
      return (
        <div>
          {attrs.map((attr, key) =>
            <ResourceAttr attr={attr} />
          )}
        </div>
      );
    } else {
      return <span>No attrs</span>;
    }
  },

  render: function() {
    const { resource } = this.props;
    const buttonStyle = {
      marginLeft: '10px'
    };
    return (
      <div className='col-md-4 col-sm-8'>
      <Card>
        <CardTitle title={resource.uri} subtitle={resource.id} />
        <CardText>
          <div>
            {this.renderAttrs(resource.attrs)}
          </div>
        </CardText>
        <CardActions>
          <FlatButton 
            label="Get" 
            onClick={() => this.props.getResource(resource.id)}
          />
          <FlatButton 
            label="Observe"
            onClick={() => this.props.observeResource(resource.id)} 
          />
          <FlatButton 
            label="Cancel observe"
            onClick={() => this.props.deobserveResource(resource.id)} 
          />
        </CardActions>
      </Card>
      </div>
    );
  }
})