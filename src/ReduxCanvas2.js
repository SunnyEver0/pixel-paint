import Immutable from "immutable";
import React from "react";
import { Provider, connect } from "react-redux";
import Pixel from "./Pixel";
import createStore from "./createStore";

// Reducer
const store = createStore((state = Immutable.Map(), action) => {
  if (action.type === "TOGGLE") {
    const key = action.i + "," + action.j;
    return state.set(key, !state.get(key));
  }
  return state;
});

// Selector
const selectActive = (state, i, j) => {
//   if (state) {
    state.get(i + "," + j);
//   }
};

// Action creator
const toggle = (i, j) => ({ type: "TOGGLE", i, j });

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _getPixelItem() {
    const { state, onToggle } = this.props;
    const items = [];
    for (let i = 0; i < 128; i++) {
      for (let j = 0; j < 128; j++) {
        items.push(
          <Pixel
            i={i}
            j={j}
            active={selectActive(state, i, j)}
            onToggle={() => {
                onToggle(i ,j)
            }}
            key={i + "," + j}
          />
        );
      }
    }
    console.log(items)
    return items;
  }

  render() {
    const items = this._getPixelItem();
    return <div>{items}</div>;
  }
}

const PixelContainer = connect(
  (state) => ({ state }),
  (dispatch) => ({ onToggle: (i, j) => dispatch(toggle(i, j)) })
)(Canvas);

// Root component
function ReduxCanvas2() {
  return (
    <Provider store={store}>
      <PixelContainer />
    </Provider>
  );
}

export default ReduxCanvas2;
