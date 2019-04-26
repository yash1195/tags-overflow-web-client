import React, { Component } from 'react';
import classnames from 'classnames';

// components
import { Button } from 'semantic-ui-react';

class ActionableTab extends Component {



  render() {

    let classes = classnames({
      'actionable-tag': true
    });

    return (
      <div className={classes} style={styles}>
        <Button basic color={this.props.color}>
          {this.props.color}
        </Button>
      </div>
    );
  }
}

const styles = {
  margin: '3px 2px 3px 2px',
  float: 'center'
};

export default ActionableTab;
