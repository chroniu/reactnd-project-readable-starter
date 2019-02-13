import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout,  Breadcrumb} from 'antd';
import MenuContainer from './components/MenuContainer';
import PostListContainer from './components/PostListContainer';
import PostContainer from './components/PostContainer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
const {Header, Content, Footer} = Layout;


class App extends Component {

    componentDidMount(){

    }
    
    render() {
        return(
            <Router>
              <Layout className="layout">
                <Route path='/'>
                  <MenuContainer />
                </Route>
                <Content style={{padding: '0 50px'}}>
                  <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>

                    <Route exact path='/' component={PostListContainer} todo='TODO FIX'/> 
                    <Route path='/:category' component={PostListContainer} />
                    
                    <Route path='/:category/:post_id' component={PostContainer}/>
                  </div>
                </Content>
              </Layout>
            </Router>
        );
  }
}

export default connect()(App);
