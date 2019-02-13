import React from 'react';
import {connect} from 'react-redux';
import Menu from './Menu';
import CategoryActions from '../redux/categories/actions';

const mapStateToProps = (state, props) =>{
    if(state.loading.categories.loading)
        return {categories: []};
    else
        return {categories:Object.values(state.categories)};
};

/*const mapDispatchToProps = (dispatch, props) =>{
    
};
*/

class MenuContainer extends React.Component{
    componentDidMount(){
        this.props.dispatch(CategoryActions.fetchCategories());
    }

    render(){
        return(
            <Menu categories={this.props.categories}/>
        );
    }

};

export default connect(mapStateToProps)(MenuContainer);
