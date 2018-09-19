import React, { Component } from 'react';
import './Recipe.css';
import PropTypes from 'prop-types';



const Recipe = (props) => {

    const { title, img, instructions, ingredients } = props;
    const ings = ingredients.map((ing, index) => (
        <li key={index} className="b-list"> {ing} </li>
    ));
    
    return (
        <div className="recipe-card">
            <div className="recipe-card-img">
                <img src={img} alt={title} />
            </div>
            <div className="recipe-card-content">
                <h3 className="recipe-title">{title}</h3>
                <h4>Ingredients:</h4>
                <ul>
                    {ings}
                </ul>
                <h4>Instructions:</h4>
                <p>{instructions}</p>
            </div>
        </div>
    );
}

export default Recipe;