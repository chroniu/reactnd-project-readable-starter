import React from 'react';

import {Menu, Icon}   from 'antd';
import {Link} from "react-router-dom";
import {Layout} from 'antd';


const styles = {
    menu:{lineHeight: '64px'}
};

const MenuCategories = ({categories, loading}={categories:[], loading:true}) => {
    return(
        <Layout.Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['all']}
            style={styles.menu}>

            <Menu.Item key="all">
              <Link to='/'><Icon type="home"/></Link>
            </Menu.Item>
            {categories.map((category) =>
                            <Menu.Item key={category.path}>
                              <Link to={`/${category.path}`}>{category.name}</Link>
                            </Menu.Item>
                           )}

            <Menu.Item key="new">
              <Link to='/posts/new/edit'><Icon type="plus-circle"/>New Post</Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
    );
//            <Menu.Item key="config">Configurations</Menu.Item>
};

export default MenuCategories;
