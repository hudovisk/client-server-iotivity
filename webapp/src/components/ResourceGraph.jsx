import React from 'react';

import { connect } from 'react-redux';

import rd3 from 'rd3';

const LineChart = rd3.LineChart;

export const ResourceGraph = React.createClass({
  render: function() {
    const { resource } = this.props;
    console.log(resource);
    const lineData = [
      { 
        name: 'series1',
        values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        strokeWidth: 3,
        strokeDashArray: "5,5",
      }
    ];

    return (
      <div>
        <LineChart
          legend={false}
          data={resource.lineData}
          width='100%'
          height={400}
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 500,
            height: 400
          }}
          title="Line Chart"
          yAxisLabel="Altitude"
          xAxisLabel="Elapsed Time (sec)"
          domain={{x: [,], y: [-10,]}}
          gridHorizontal={true}
        />
      </div>
    );
  }
});

export const ResourceGraphContainer = connect()(ResourceGraph);
