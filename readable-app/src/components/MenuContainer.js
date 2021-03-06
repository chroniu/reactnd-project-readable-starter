import React from 'react';
import {connect} from 'react-redux';
import Menu from './Menu';
import CategoryActions from '../redux/categories/actions';


const mapStateToProps = (state, props) =>{
    
    if(state.loading.categories)
        return {categories: []};
    else
        return {categories:Object.values(state.categories)};
};

/**
   @description A container component for the Menu.
*/
class MenuContainer extends React.Component{
    componentDidMount(){
        this.props.dispatch(CategoryActions.fetchCategories());
    }
    
    render(){
        return(
            <Menu categories={this.props.categories} selectedKey={this.props.selectedCategory}/>
        );
    }

};

export default connect(mapStateToProps)(MenuContainer);
