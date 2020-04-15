import React, { Component } from 'react';
import Loading from '../Loading';
import axios from 'axios';
import './bestStories.css'

export default class BestStories extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      baseUrl: 'https://hacker-news.firebaseio.com/v0/item/',
      storyObjects: []
    }
  }

  componentDidMount(){
    axios.get("https://hacker-news.firebaseio.com/v0/beststories.json")
    .then((res) => {
      this.fetchStories(res.data.slice(0,30));
    });
  }
  
  fetchStories(storyIds){
    storyIds.map((storyId) => {
      axios.get(this.state.baseUrl + storyId + ".json")
      .then((res) => {
        this.setState((currentState) => {
          return{
            storyObjects: currentState.storyObjects.concat([res.data])
          }
        })
      });
      return true;
    });
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        { this.state.loading
          ? <Loading></Loading>
          : (
            <div>
              <h1>Best Stories</h1>
              <ul>
                {this.state.storyObjects.map((storyObject) => (
                  <div key={storyObject.id}>
                    <a href={storyObject.url}>{storyObject.title}</a>
                    <p className="author">By: {storyObject.by}</p>
                    <br/>
                  </div>
                ))}
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}
