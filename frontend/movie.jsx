import React from 'react';
import ReactDom from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { signup } from './util/session_api_util';
import { logoutUser, loginUser } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  //debugging remove from window after
  window.dispatch = store.dispatch
  window.getState = store.getState 
  window.login = loginUser
  window.logout = logoutUser
  window.signup = signup
  const demoUser = { email: 'demo2@email.com', name: 'demo', password: 'movieo' }
  window.demoUser = demoUser
  //for debugging


  ReactDom.render(<Root store={store}>React Is Working</Root>, root)

/// splash video movement ///

  window.addEventListener('scroll', EventDown) //initial state

  function EventDown() {
    let latestKnownScrollY = window.scrollY
    console.log(latestKnownScrollY) // debug remove
    if (latestKnownScrollY > 500){
      window.removeEventListener('scroll', EventDown) //removes event listener
      slideVideoDown() //slides video down
      addEventUp() //adds event for up
    }
  }
  
  function slideVideoDown() {
    
    let id = setInterval(frame, 5);
    let pos = 0;
    let video = document.getElementById('video-wrapper');
    
    function frame() {
      if (pos === 350) {
        clearInterval(id)
      } else {
        pos ++;
        pos ++;
        // debugger
        video.style.top = pos + 'px';
        video.style.left = pos + 'px';
      }
    }
  }
  
  function addEventUp() {
    let video = document.getElementById('video-wrapper');
    window.addEventListener('scroll', EventUp)
  }
  
  function EventUp() {
    let latestKnownScrollY = window.scrollY
    if (latestKnownScrollY < 400) {
      window.removeEventListener('scroll', EventUp) //removes event listener
      slideVideoUp() //slides video up
      addEventDown() //adds event for down
    }
  }

  function slideVideoUp(){
    let id = setInterval(frame, 5);
    let pos = 350;
    let video = document.getElementById('video-wrapper');

    function frame() {
      if (pos === 0) {
        clearInterval(id)
      } else {
        pos--;
        // debugger
        video.style.top = pos + 'px';
        video.style.left = pos + 'px';
      }
    }
  }

  function addEventDown() {
    let video = document.getElementById('video-wrapper');
    window.addEventListener('scroll', EventDown)
  }

/// END Splash Video Movement ///



  // window.addEventListener('scroll', () => {
  //   let latestKnownScrollY = window.scrollY
  //   console.log(latestKnownScrollY)
  //   if(latestKnownScrollY === 500){
  //     console.log('should slide')
  //     slideVideoDown()
  //   } else if ( latestKnownScrollY === 550 ) {
  //     console.log('up')
  //     slideVideoUp()
  //   }

  // })
})
