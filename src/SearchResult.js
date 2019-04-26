import React, { Component } from 'react';
import WebFont from 'webfontloader';

// packages
import 'semantic-ui-css/semantic.min.css';

import { Card } from 'semantic-ui-react';

// components
import QueryBox from './components/query-box';
import SoPost from './components/so-post';

// css
import './App.css';

import Loader from 'react-loader-spinner';

import store from './store';

import rp from 'request-promise';


// fonts
WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif']
  }
});

class SearchResult extends Component {

  constructor() {
    super();

    let appState = store.getState();

    console.log('state from store');
    console.log(appState);

    this.state = {
      isResultLoaded: false,
      tag: appState.tag,
      posts: [],
    };

    this.onHomeBtnClicked = this.onHomeBtnClicked.bind(this);
    this.generateCards = this.generateCards.bind(this);
  }

  componentDidMount() {

    let options = {
      uri: 'http://localhost:1337/search',
      qs: {
        tag: this.state.tag
      },
      json: true
    };

    let context = this;
    let currState = this.state;

    rp(options)
      .then(function(data) {

        currState.posts = data.posts;
        currState.isResultLoaded = true;
        context.setState(currState);

      })
      .catch(function(err) {
        console.log('failed to retreive results from the server');
      });
  }

  onHomeBtnClicked = (e) => {
    this.props.history.push({
      pathname: '/'
    });
  };

  generateCards = (context) => {
    return function(post) {
      return (<SoPost
        title={post.postTitle}
        tag={context.state.tag}
        description={post.postText}
        url={post.url}
        aggregateValue={post.aggregateValue}
        viewCount={post.viewCount}
        maxUpvote={post.maxUpvote}
        pageRankValue={post.pageRankValue}
      />)
    };
  };

  render() {
    return (
      <div className="ResultPage" style={styles.resultPage}>
        <div style={styles.querySection}>
          <div style={styles.resultsPageLogo} onClick={(e) => this.onHomeBtnClicked(e)}>
            tags-overflow
          </div>
          <div style={styles.queryBox}>
            <QueryBox mode={'compact'}/>
          </div>
        </div>
        <div style={!this.state.isResultLoaded ? styles.loaderOn : styles.loaderOff}>
          <Loader
            type="Triangle"
            color="#81D294"
            height="300"
            width="300"
          />
        </div>
        <div style={styles.resultSection}>
          <Card.Group>
            {
              this.state.posts.map(this.generateCards(this))
            }
          </Card.Group>

          {/*<div>*/}
            {/*{*/}
              {/*this.state.posts.map(this.generateCards(this))*/}
            {/*}*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

const styles = {
  resultPage: {
    width: '100vw',
    height: '100vh'
  },
  queryBox: {
    position: 'absolute',
    // left: '30vw',
    // textAlign: 'center',
    // marginTop: '10vh'
    margin: '3vh',
    paddingBottom: '3vh',
    // borderBottom: '1px solid #eee',
    // display: 'inline-block',
    width: '100vw'
  },
  resultsPageLogo: {
    marginTop: '3vh',
    marginLeft: '3vh',
    fontSize: '36px',
    letterSpacing: '2px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  querySection: {
    position: 'fixed',
    top: '0',
    left: '0',
    borderBottom: '1px solid #eee',
    width: '100vw',
    height: '20vh',
    zIndex: 5,
    backgroundColor: '#fff'
  },
  resultSection: {
    marginTop: '25vh',
    zIndex: -1
  },
  loaderOn: {
    position: 'absolute',
    top: '30vh',
    left: '40vw'
  },
  loaderOff: {
    display: 'none'
  }
};

export default SearchResult;
