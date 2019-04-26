import React, { Component } from 'react';
// routing
import { withRouter } from "react-router-dom";

class Refresh extends Component {

  componentDidMount() {
    this.props.history.push({
      pathname: '/results'
    });
  }

  render() {
    return (
      <div className="RefreshPage" style={styles.app}>
        <div style={styles.text}>
          searching ...
        </div>
      </div>
    );
  }
}

const styles = {
  app: {
    fontFamily: 'Titillium Web'
  },
  text: {
    position: 'relative',
    left: '30vw',
    textAlign: 'center',
    marginTop: '10vh',
    fontSize: '24px'
  },
};

export default withRouter(Refresh);
