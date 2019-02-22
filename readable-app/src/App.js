import React, { Component } from 'react';
import {Layout} from 'antd';
import MenuContainer from './components/MenuContainer';
import PostListContainer from './components/PostListContainer';
import PostContainer from './components/PostContainer';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from 'react-redux';
import PostEditContainer from './components/PostEditContainer';
import 'antd/dist/antd.css';
import './App.css';

const {Content} = Layout;


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
                    <Route exact path='/:category' component={PostListContainer} />
                    
                    <Route exact path='/:category/:post_id' component={PostContainer}/>

                    <Route exact path='/posts/:post_id/edit' component={PostEditContainer}/>
                  </div>
                </Content>
              </Layout>
            </Router>
        );
  }
}

export default connect()(App);
