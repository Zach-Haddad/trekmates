import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';

class Greeting extends React.Component {
  constructor(){
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleLogout(e){
    this.props.logout();
  }

  handleClick(mode){
    return () => hashHistory.push(`welcome/${mode}`);
  }

  redirect(){
    this.props.router.push("/home");
  }

  handleDemo(){
    const user = {username: 'user', password: 'password'};
    this.props.login({user}).then( () => this.redirect());
  }

  render(){
    const navBarLoggedOut = () => (
      <nav className="nav-bar-logged-out">
        <div className="left-nav">
          <div className="logo"></div>
          <Link to="/" className="header-link">
            <h1 className='logo-name'>TrekMates</h1>
          </Link>
        </div>

        <div className="nav-session-buttons">
          <button onClick={this.handleClick('login')}>Log In</button>
          &nbsp;
          <button onClick={this.handleClick('signup')}>Sign Up</button>
          &nbsp;
          <button onClick={this.handleDemo}>Demo</button>
        </div>

      </nav>
    );

    const navBarLoggedIn = (currentUser) => (
      <nav className="nav-bar-logged-in">
        <div className="left-nav">
          <div className="logo"></div>
          <Link to="/" className="header-link">
            <h1 className='logo-name'>TrekMates</h1>
          </Link>
        </div>

        <div className="nav-options">
          <h2 className="header-name">Hi, {currentUser.username}!</h2>
          <Link to='/add_group'><button>Create Group</button></Link>
          <button className="header-button" onClick={this.handleLogout}>Log Out</button>
        </div>
      </nav>
    );

    return this.props.currentUser ? navBarLoggedIn(this.props.currentUser) : navBarLoggedOut()
  }
}

// <div className="dropdown">
//   <button className="dropdown-button">Dropdown</button>
//   <ul className="dropdown-content">
//     <li> <a href="#">Link 1</a></li>
//     <li> <a href="#">Link 2</a></li>
//     <li> <a href="#">Link 3</a></li>
//   </ul>
// </div>


export default withRouter(Greeting);
