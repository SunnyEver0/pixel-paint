import "./App.css";

import { ObservableMap, action, observable } from "mobx";

import DevTools from "mobx-react-devtools";
/* eslint import/no-webpack-loader-syntax: off */
import MobXCanvas from './MobXCanvas';
// import MobXCanvas from "./MobXCanvas";
import React from "react";

// const MobXCanvas = require('bundle-loader?lazy&name=MobXCanvas!./MobXCanvas')
const availableExperiments = {
  MobXCanvas
};

class App extends React.Component {
  renderContent() {
    console.log(this.props.experiment, 'MobXCanvas');
    const experiment = availableExperiments[this.props.experiment];
    if (!experiment) {
      return <ChooseAnExperiment />;
    }
    return <ExperimentContainer experiment={experiment} />;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Pixel Paint</h2>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

class ExperimentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Canvas: null, devTool: null };
  }
  componentDidMount() {
    debugger
    console.log(this.props.experiment);
    this.props.experiment(experimentModule => {
      console.log(experimentModule, 'experimentModule')
      this.setState({
        Canvas: experimentModule,
        devTool:
          (experimentModule.renderDevTool &&
            experimentModule.renderDevTool()) ||
          null
      });
    });
  }
  render() {
    if (!this.state.Canvas) {
      return (
        <div style={{ marginTop: 48, fontSize: 32 }}>(loading experiment)</div>
      );
    }
    const { Canvas } = this.state;
    return (
      <div>
        <div className="App-canvasContainer">
          <div className="App-canvas">
            <Canvas />
          </div>
        </div>
        <div className="App-canvasContainer">
          <div className="App-canvas">
            <Canvas />
          </div>
        </div>
        {this.state.devTool}
      </div>
    );
  }
}

function ChooseAnExperiment() {
  return (
    <div>
      <h1>Choose an experiment</h1>
      {Object.keys(availableExperiments).map(experimentName => {
        const href = `?experiment=${experimentName}`;
        return (
          <a
            style={{ display: "block", padding: 5 }}
            href={href}
            key={experimentName}
          >
            {experimentName}
          </a>
        );
      })}
    </div>
  );
}

export default App;
