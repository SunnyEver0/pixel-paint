import "./App.css";

/* eslint import/no-webpack-loader-syntax: off */
import MobXCanvas from "bundle-loader?lazy&name=MobXCanvas!./MobXCanvas";
import ReduxCanvas1 from "bundle-loader?lazy&name=ReduxCanvas1!./ReduxCanvas1";
import ReduxCanvas2 from "bundle-loader?lazy&name=ReduxCanvas2!./ReduxCanvas2";
import React from "react";

const availableExperiments = {
  MobXCanvas,
  ReduxCanvas1,
  ReduxCanvas2
};

class App extends React.Component {
  renderContent() {
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
    this.props.experiment(experimentModule => {
      this.setState({
        Canvas: experimentModule.default,
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
