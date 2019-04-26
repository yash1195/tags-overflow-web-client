import React, { Component } from 'react';
import './style.css';

// components
import { Card } from 'semantic-ui-react';

class Post extends Component {

  render() {


    return (

      <div>
        {/*{this.props.description}*/}

        <Card style={styles.card}>
        <Card.Content>
        <Card.Header><a href={this.props.url} target="_blank">{this.props.title}</a></Card.Header>
        <Card.Meta>Tag: {this.props.tag}</Card.Meta>
        <Card.Description>
          <div contentEditable='true' dangerouslySetInnerHTML={{ __html: this.props.description }}></div>
          {/*<div className="content" dangerouslySetInnerHTML={{__html: this.props.description}}>hh</div>*/}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
          meta information
          <br/>
          <div>Aggregate Score: {this.props.aggregateValue}</div>
          <div>View Count: {this.props.viewCount}</div>
          <div>Max upvote: {this.props.maxUpvote}</div>
          <div>Page Rank value: {this.props.pageRankValue}</div>
        </Card.Content>
        </Card>
      </div>


    );
  }
}



const styles = {
  card: {
    width: '95vw',
    margin: '4vh',
    marginTop: '1vh',
    fontSize: '12px',
    overflowWrap: 'break-word',
  }
};

export default Post;
