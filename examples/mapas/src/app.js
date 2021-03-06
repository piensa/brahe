// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import styled from 'styled-components';
import window from 'global/window';
import {connect} from 'react-redux';

import {loadSampleConfigurations} from './actions';
import {replaceLoadDataModal} from './factories/load-data-modal';

const KeplerGl = require('kepler.gl/components').injectComponents([
  replaceLoadDataModal()
]);

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// Sample data
/* eslint-disable no-unused-vars */
// import colombiaJson from './data/colombia.json';
import {updateVisData, addDataToMap} from 'kepler.gl/actions';
/* eslint-enable no-unused-vars */

const GlobalStyleDiv = styled.div`
  font-family: ff-clan-web-pro, 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.71429;

  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

class App extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  componentWillMount() {
    // if we pass an id as part of the url
    // we ry to fetch along map configurations
    const {params: {id: sampleMapId} = {}} = this.props;
    this.props.dispatch(loadSampleConfigurations(sampleMapId));
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentDidMount() {
    // load sample data
    const mapNameUrl = this.props.demo.app.mapName;

    fetch(mapNameUrl)
      .then(res =>  res.json())
      .then(data => {
        this._loadSampleData(data);
      });
  }

  componentWillUnmount() {
    window.remmoveEventListener('resize', this._onResize);
  }

  _onResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  _loadSampleData(dataJson) {
    const { datasets, config } = dataJson;

    const {params: {coor: coordinates} } = this.props;
    if (coordinates) {
        config.config.mapState = this._updateCoordinates(
            config.config.mapState, coordinates);
    }

    this.props.dispatch(
        addDataToMap({
            config,
            datasets:  datasets.map(dataset => ({
                data: {
                    fields: dataset.data.fields,
                    rows: dataset.data.allData
                },
                info: {
                    color: dataset.data.color,
                    id: dataset.data.id,
                    label: dataset.data.label
                }
            }))
        })
    );
  }

  _updateCoordinates(mapState, coordinates){
      const coorArray = coordinates.slice(1, -1).split(',');
      const zoom = Number(coorArray[2]) - 1; // - 1 for google/maps compatibility
      if (coorArray.length === 3) {
          return Object.assign({}, mapState, {
              latitude: Number(coorArray[0]),
              longitude: Number(coorArray[1]),
              zoom: zoom >= 1 ?  zoom : 1
          })
      }

      return mapState;
  }

  render() {
    const {width, height} = this.state;
    return (
      <GlobalStyleDiv>
          <KeplerGl
            mapboxApiAccessToken={MAPBOX_TOKEN}
            id="map"
            // Specify path to keplerGl state, because it is not mount at the root
            getState={state => state.demo.keplerGl}
            width={width}
            height={height}
          />
      </GlobalStyleDiv>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(
  mapStateToProps,
  dispatchToProps
)(App);
