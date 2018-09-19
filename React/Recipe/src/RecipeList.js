import React, { Component } from 'react';
import Recipe from './Recipe';
import './RecipeList.css';
import PropTypes from 'prop-types';



class RecipeList extends Component {
    constructor(props) {
        super(props);

        this.renderRecipes = this.renderRecipes.bind(this);
    }

    static defaultProps = {
        recipes: [
            {
                title: "Mumms spaghetti",
                instructions: "Ask Eminem",
                ingredients: ["Spaghetti"],
                img: "em.jpeg"
            },
            {
                title: "Pesto Genovese",
                instructions: "In this classic version of pesto, the basil leaves are blanched in boiling water, then quickly shocked in ice water, to give the sauce a brilliant green hue and to reduce any bitterness.",
                ingredients: ["pesto", "bacon", "pasta"],
                img: "pesto.jpg"
            },
            {
                title: "Paprika chicken",
                instructions: "In a large bowl, whisk the flour with salt, black pepper, and oregano. Gently press the chicken breasts into the flour mixture to coat, and shake off the excess flour.",
                ingredients: ["chicken", "paprika", "salt", "black pepper", "oregano"],
                img: "paprika.jpeg"
            },
        ]
    }

    // static propTypes = {
    //     recipes: PropTypes.arrayOf(PropTypes.object)
    // }

    renderRecipes() {
        return this.props.recipes.map((r, index) => (
            <Recipe key={index} title={r.title} instructions={r.instructions} ingredients={r.ingredients} img={r.img}/>))
    }

    render() {

        // const recipes = this.props.recipes.map((r, index) => (
        //     <Recipe key = {index} {...r} />
        // ));

        return (
            <div className="recipe-list">
                {/* {recipes} */}
                {this.renderRecipes()}
            </div>
        )
    }
}



export default RecipeList;