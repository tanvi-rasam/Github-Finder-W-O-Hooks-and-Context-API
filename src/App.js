import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Navbar from './Components/Layouts/Navbar'
import './App.css';
import Users from './Components/Users/Users'
import axios from 'axios' // To get the api
import Search from './Components/Users/Search';
import Alert from './Components/Layouts/Alert';
import About from './Components/Pages/About';
import User from './Components/Users/User'
class App extends Component {
  
  state={
    users:[],
    loading:false,
    alert:null,
    user:{},
    repos:[]
  }
  
  searchUser= async text =>{
    this.setState({loading:true});
    const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    
    this.setState({users:res.data.items, loading:false});
  };

// Get the github user basic info
  getUser= async (username)=>{
    this.setState({loading:true});
    const res= await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    
    this.setState({user:res.data, loading:false});

  }
//Get User Repos
getUserRepos= async (username)=>{
  this.setState({loading:true});
  const res= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
  
  this.setState({repos:res.data, loading:false});

}
  clearUser=()=>{
    this.setState({users:[],loading:false})
  }

  setAlert=(msg,type)=>{
    this.setState({alert:{msg, type}});
    setTimeout(()=>{this.setState({alert:null})},5000)
  }

  render() {
  return (
    <Router>
    <div className="App">
     
    <Navbar /> { /*You can set custom title and icon */} 
    
    <div className="container">
    
    <Alert alert={this.state.alert} />
    <Switch>
      <Route exact path='/' render={props=>
      (<Fragment>
          <Search searchUser={this.searchUser} 
          clear={this.clearUser} 
          showClear={ this.state.users.length>0?true:false }
          setAlert={this.setAlert}
          /> { /* Down to up prop passing */} 

          <Users loading={this.state.loading} users={this.state.users} />

      </Fragment>  
      )} />
      
      <Route  exact path='/about'component={About} />
        
      <Route exact path='/user/:login' render={props=>
      (<User {...props} user={this.state.user} getUser={this.getUser} loading={this.state.loading}
        repos={this.state.repos}
        getUserRepos={this.getUserRepos} />

      )} />
      

    </Switch>
    
    </div>
    </div>
    </Router>
  );
}
}

export default App;
