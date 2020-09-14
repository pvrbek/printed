import React, { Component, Fragment } from "react";
import PosterItem from "./PosterItem";
import withContext from "../withContext";

const PosterList = props => {
    const { posters } = props.context;
    return (
    <Fragment>
        <div className="hero is-primary">
            <div className="hero-body container">
                <h4 className="title">Posters on sale</h4>
            </div>
        </div>
        <br />
        <div className="container">
            <div className="column columns is-multiline">
                {posters && posters.length ? (
                posters.map((poster, index) => (
                <PosterItem
                poster={poster}
                key={index}
                addToCart={props.context.addToCart}
                />
                ))
                ) : (
                <div className="column">
              <span className="title has-text-grey-light"> No posters found!</span>
                </div>
                )}
            </div>
        </div>
    </Fragment>
    );
};
export default withContext(PosterList);
