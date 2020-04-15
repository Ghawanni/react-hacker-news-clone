import React, { Component } from "react";
import Loading from "../Loading";
import axios from "axios";
import './NewStories.css';

export default class NewStories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      baserUrl: "https://hacker-news.firebaseio.com/v0/item/",
      storyObjects: [],
    };

    this.fetchStories = this.fetchStories.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((res) => {
        this.fetchStories(res.data.slice(0,30));
      });
  }

  fetchStories(storyIds) {
    storyIds.map((storyId) => {
      axios.get(this.state.baserUrl + storyId + ".json").then((res) => {
        this.setState((currentState) => {
          return {
            storyObjects: currentState.storyObjects.concat([res.data]),
          };
        });
      });
      return true;
    });
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <div>
            <h1>New Stories</h1>
            <ul>
              {this.state.storyObjects.map((storyObject) =>{
                if(storyObject){
                  return(
                    <div key={storyObject.id}>
                      <a href={storyObject.url}>{storyObject.title}</a>
                      <p className="author">By: {storyObject.by}</p>
                      <br/>
                    </div>
                  )
                }
              }
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
