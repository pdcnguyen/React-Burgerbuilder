import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavgationItem/NavigationItem';

const navigationItems = ( ) =>(
    <ul className={classes.NavigationItems}>
       <NavigationItem link='/' >Burger Builder</NavigationItem>
       <NavigationItem link='/orders'>Order</NavigationItem>

    </ul>
)

export default navigationItems;