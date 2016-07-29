import React from 'react';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
};

export default React.createClass({
  renderAttrByType: function(attr) {
    switch(attr.type) {
      case "Double":
      case "Integer":
        return (
          <div>
            <TextField 
              value={attr.value}
              floatingLabelText={attr.name}>    
            </TextField>
          </div>
        );
      case "Boolean":
        return (
          <Toggle
            toggled={attr.value}
            label={attr.name}
            style={styles.toggle}
            onClick={() => {
              attr.value = !attr.value;
              this.props.onAttrChange(attr);
            }}
          />
        );
      default:
        return (
          <TextField value={attr.value}></TextField>
        );
    }
  },

  render: function() {
    const { attr } = this.props;

    return (
      <div>
        {this.renderAttrByType(attr)}
      </div>
    );
  }
})
