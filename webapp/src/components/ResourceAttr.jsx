import React from 'react';
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
            <span>{attr.name}</span>
            <input type="number" value={attr.value}></input>
          </div>
        );
      case "Boolean":
        return (
          <Toggle
            toggled={attr.value}
            label={attr.name}
            style={styles.toggle}
          />
        );
      default:
        return (
          <input type="text" value={attr.value}></input>
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
