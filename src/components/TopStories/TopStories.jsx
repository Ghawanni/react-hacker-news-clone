import React, { Component } from "react";
import axios from "axios";
import Loading from "../Loading";

export default class TopStories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseUrl: "https://hacker-news.firebaseio.com/v0/item/",
      loading: true,
      storyObjects: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) => {
        this.fetchStories(res.data.slice(0, 30));
      });
  }

  fetchStories(storyIds) {
    console.log(storyIds);
    storyIds.map((storyId) => {
      axios.get(this.state.baseUrl + storyId + ".json")
      .then((res) => {
        this.setState((currentState) => {
          return {
            storyObjects: currentState.storyObjects.concat([res.data]),
          };
        });
      });
      return true;
    });
    console.log(this.state.storyObjects);
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        {this.state.loading
          ? <Loading></Loading>
          : <div>
              <h1>Top Stories</h1>
              <ul>
                {this.state.storyObjects.map((storyObject) => {
                  if(storyObject){
                    return (
                      <div key={storyObject.id}>
                        <a href={storyObject.url}>{storyObject.title}</a>
                        <p className="author">By: {storyObject.by}</p>
                        <br/>
                      </div>
                    )
                  }
                })}
              </ul>
          </div>
        }
      </div>
    );
  }
}
