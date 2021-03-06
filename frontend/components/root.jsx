import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from 'react-router';
import App from './app';

import SessionFormContainer from './session_form/session_form_container';
import HomeContainer from './home/home_container';
import WelcomeContainer from './welcome/welcome_container';
import GroupIndexContainer from './home/group_index_container';
// import EventIndexContainer from './home/event_index_container';

// import SearchContainer from './search/search_container';

import GroupPageContainer from './groups/group_page_container';
import GroupCalendarContainer from './groups/group_calendar_container';
import GroupPageContentContainer from './groups/group_page_content_container';
import GroupEditContainer from './groups/forms/group_edit_container';
import GroupFormContainer from './groups/forms/group_form_container';

import EventFormContainer from './events/forms/event_form_container';
import EventEditFormContainer from './events/forms/event_edit_form_container';
import EventPageContainer from './events/event_page_container';

import ProfileContainer from './profile/profile_container';
import EditProfileContainer from './profile/edit_profile_container';

const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
      const currentUser = store.getState().session.currentUser;
      if (currentUser) {
        replace('/home');
      }
  };

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if(!currentUser) {
      replace('/welcome');
    }
  };

  return(
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRedirect to='/welcome' />
          <Route path="welcome" component={ WelcomeContainer } onEnter={_redirectIfLoggedIn}>
            <Route path="login" component={ SessionFormContainer } onEnter={_redirectIfLoggedIn}/>
            <Route path="signup" component={ SessionFormContainer } onEnter={_redirectIfLoggedIn}/>
          </Route>

          <Route path="home" component={ HomeContainer } onEnter={_ensureLoggedIn}>
            {/*
            <Route path='search' component={ SearchContainer }/>
            <Route path='events' component={ EventIndexContainer }/>
            */}
          </Route>

          <Route path='add_group' component={ GroupFormContainer }/>

          <Route path='groups/:groupId' component={ GroupPageContainer } onEnter={_ensureLoggedIn}>
            <IndexRoute component={ GroupPageContentContainer } />
            <Route path='events/new' component={ EventFormContainer }/>
            <Route path='events/:eventId' component={ EventPageContainer }>
              <Route path='edit' component={ EventEditFormContainer }/>
            </Route>
            <Route path='calendar' component={ GroupCalendarContainer } />
            <Route path='edit' component={ GroupEditContainer }/>
          </Route>

          <Route path='users/:userId' component={ ProfileContainer } onEnter={_ensureLoggedIn}>

          </Route>

          <Route path='profile/edit' component={ EditProfileContainer } onEnter={_ensureLoggedIn}/>


        </Route>
     </Router>
    </Provider>
  );
};

export default Root;
