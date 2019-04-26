import React, { Component } from 'react';
import classnames from 'classnames';

// components
import Autosuggest from 'react-autosuggest';

// redux store
import store from '../../store';

// redux actions
import Actions from '../../actions';

// routing
import { withRouter } from "react-router-dom";

const tagsFile = require('../../data/tags.json');



const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : tagsFile.tags.filter(tag =>
    tag.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class QueryBox extends Component {

  constructor() {
    super();

    let appState = store.getState();

    this.state = {
      value: appState.tag,
      suggestions: [],
    };

    this.onSearchBtnClicked = this.onSearchBtnClicked.bind(this);
  }

  onInputChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentDidMount() {
    console.log(store.getState());
    console.log(tagsFile);
  }

  onSearchBtnClicked = (e) => {
    store.dispatch(Actions.addTag({tag: this.state.value}));
    this.props.history.push({
      pathname: '/refresh'
    });
  };


  render() {

    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'ENTER THE TAG YOU WANT TO SEARCH',
      value,
      onChange: this.onInputChange
    };

    let classes = classnames({
      'query-box': true
    });

    return (
      <div className={classes} style={this.props.mode === 'compact' ? styles.containerCompact : styles.container}>

        <div style={styles.inputContainer}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={styles.inputBox}
          />
        </div>
        <button className="ui green basic button"
                style={this.props.mode === 'compact' ? styles.searchBtnCompact : styles.searchBtn}
                onClick={(e) => this.onSearchBtnClicked(e)}>S E A R C H</button>

      </div>
    );
  }

}

const styles = {
  container: {
    width: '40vw',
    textAlign: 'center'
  },
  containerCompact: {
    width: '100vw',
    textAlign: 'center'
  },
  input: {
    // border: '1px solid #000',
    width: '100%',
    fontSize: '18px'
  },
  inputBox: {
    container: {
      width: '40vw',
      borderRadius: '8px',
      padding: '5px',
      border: '2px solid #ebebeb',
      zIndex: '5',
      backgroundColor: '#fff'

    },
    input: {
      width: '100%',
      padding: '20px',
      // borderRadius: '4px',
      border: 0,
      borderBottom: '1px solid #ebebeb',
      outline: 'None'

    },
    suggestionsList: {
      textDecoration: 'none',
      listStyle: 'none',
      paddingLeft: '0'
    },
    suggestion: {
      textAlign: 'left',
      padding: '2px',

    },
    suggestionHighlighted: {
      backgroundColor: '#eee'
    }
  },
  searchBtn: {
    marginTop: '21px'
  },
  searchBtnCompact: {
    marginTop: '21px',
    marginLeft: '21px',
    float: 'left'
  },
  inputContainer: {
    float: 'left'
  }
};

export default withRouter(QueryBox);
