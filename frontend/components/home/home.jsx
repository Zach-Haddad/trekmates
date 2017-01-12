import React from 'react';
import { Link, withRouter } from 'react-router';


class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId: this.props.currentUser.id
    };
  }
    componentDidUpdate(){
      if (!this.props.currentUser){
        this.props.router.push('/welcome');
      }
    }

  render(){
    return(
      <p>home page</p>
    );
  }
}


export default withRouter(Home);