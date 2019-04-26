import React, { Component } from 'react';
import WebFont from 'webfontloader';

// packages
import 'semantic-ui-css/semantic.min.css';

// components
import QueryBox from './components/query-box';

// css
import './App.css';

// fonts
WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif']
  }
});

class App extends Component {
  render() {
    return (
      <div className="App" style={styles.app}>
        <div style={styles.appLandingPageLogo}>
          tags-overflow
        </div>
        <div style={styles.queryBox}>
          <QueryBox />
        </div>
      </div>
    );
  }
}

const styles = {
  app: {
    fontFamily: 'Titillium Web'
  },
  queryBox: {
    position: 'relative',
    left: '30vw',
    textAlign: 'center',
    marginTop: '10vh'
  },
  appLandingPageLogo: {
    marginTop: '25vh',
    fontSize: '72px',
    letterSpacing: '4px',
    fontWeight: '700'
  }
};

export default App;
