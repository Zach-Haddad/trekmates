// <form>
//   internal state: searchTerm
//   // onchange --> updateFilter--may not need
//   onsubmit --> fetchGroups(filter)
// </form>

import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserGroups = this.handleUserGroups.bind(this);
    this.handleAllGroups = this.handleAllGroups.bind(this);
  }

  // componentDidUpdate(){
  //   this.setState({'filter': ''});
  //   this.props.fetchGroups();
  // }

  update(){
    return e => {
      this.setState({'filter': e.target.value});
    };
  }

  handleSubmit(e){
    this.props.fetchGroups(this.state);
  }

  handleUserGroups(e){
    this.props.fetchGroups({filter: '//user'});
  }

  handleAllGroups(e){
    this.props.fetchGroups({filter: '//all'});
  }

  render() {
    return(
      <div>
        <form className='search'>
          <input
            value={this.state.filter}
            className='search-input'
            type='text'
            placeholder='Find a Group!'
            onChange={this.update('filter')} />
          <button onClick={this.handleSubmit}> Search </button>
        </form>

        <button onClick={this.handleUserGroups}>My Groups</button>
        <button onClick={this.handleAllGroups}>All Groups</button>
      </div>

    );
  }
}
export default Search;
