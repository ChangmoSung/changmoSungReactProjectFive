import React from 'react';
import { Switch, Route } from "react-router-dom";
import Links from './Links';
import UserImages from './userItems/UserImages';
import UserVideos from './userItems/UserVideos';
import Journal from "./userItems/Journal";

const Main = props => {
  return (
    <main className="gallery">
      <Links uid={props.uid} />

      <ul className="wrapper">
        <Switch>
          <Route path={`/changmoSungReactProjectFive/${props.uid}/journal`}>
            <Journal />
          </Route>

          <Route path={`/changmoSungReactProjectFive/${props.uid}/video`}>
            <UserVideos
              userVideos={props.userVideos}
              deleteItem={props.deleteItem}
            />
          </Route>

          <Route path={`/changmoSungReactProjectFive/${props.uid}`}>
            <UserImages
              userImages={props.userImages}
              deleteItem={props.deleteItem}
            />
          </Route>
        </Switch>
      </ul>
    </main>
  )
}

export default Main;