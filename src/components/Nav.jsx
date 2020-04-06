import React, { Component } from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";
import BestStories from "./BestStories";
import NewStories from "./NewStories";
import TopStories from "./TopStories";
import Default from "./Default";

export class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      navItems: [
        {
          url: "/top",
          label: "Top Stories",
        },
        {
          url: "/best",
          label: "Best Stories",
        },
        {
          url: "/new",
          label: "New Stories",
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
    }
  }

  render() {
    return (
      <Route
        path="/"
        render={({ location }) => (
          <div>
            <AppBar position="static">
              <Tabs
                value={location.pathname}
                variant="standard"
              >
                {this.state.navItems.map((navItem) => (
                  <Tab
                    component={Link}
                    to={navItem.url}
                    key={navItem.url}
                    label={navItem.label}
                    value={navItem.url}
                  />
                ))}
              </Tabs>
            </AppBar>

            <Switch>
              <Route exact path="/">
                <Default />
              </Route>
              <Route path="/top">
                <TopStories />
              </Route>
              <Route path="/best">
                <BestStories />
              </Route>
              <Route path="/new">
                <NewStories />
              </Route>
            </Switch>
          </div>
        )}
      />
    );
  }
}
