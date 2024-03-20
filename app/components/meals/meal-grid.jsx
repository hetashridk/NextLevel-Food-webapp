import React from 'react'
import classes from "./meal-grid.module.css"
import MealItem from './meal-item'

function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
        {meals.map((meal) => <li key={meals.id}>
            <MealItem {...meal}/>
        </li>)}
    </ul>
  )
}

export default MealsGrid