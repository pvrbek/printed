import React, { Component, Fragment } from "react";
import PosterItem from "./PosterItem";
import withContext from "../withContext";

const PosterList = props => {
    const { products } = props.context;
    return (
    <Fragment>
        <div className="hero is-primary">
            <div className="hero-body container">
                <h4 className="title">Pick your poster</h4>
            </div>
        </div>
        <br />
        <div className="container">
            <div className="column columns is-multiline">
                {products && products.length ? (
                products.map((product, index) => (
                <PosterItem
                product={product}
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
