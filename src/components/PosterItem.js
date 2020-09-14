import React, { Component } from "react";
const PosterItem = props => {
    const { poster } = props;
    return (
    <div className=" column is-half">
        <div className="box">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img
                        src="https://bulma.io/images/placeholders/128x128.png"
                        alt="Image"
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <b style={{ textTransform: "capitalize" }}>
                        {poster.name}{" "}
                        <span className="tag is-primary">${poster.price}</span>
                    </b>
                    <div>{poster.shortDesc}</div>
                    {poster.stock > 0 ? (
                    <small>{poster.stock + " Available"}</small>
                    ) : (
                    <small className="has-text-danger">Out Of Stock</small>
                    )}
                    <div className="is-clearfix">
                        <button
                        className="button is-small is-outlined is-primary   is-pulled-right"
                        onClick={() =>
                        props.addToCart({
                            id: poster.name,
                            poster,
                            amount: 1
                        })
                        }
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
export default PosterItem;
