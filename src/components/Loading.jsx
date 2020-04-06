import React from "react";
import { LinearProgress } from "@material-ui/core";
import "../styles/Loading.css";

export default function Loading() {
  return (
    <div >
      <LinearProgress className="progress-bar" variant="query" />
    </div>
  );
}
