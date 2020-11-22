import React, { Component } from 'react'
import logo from '../images/logo.png'
import profilePicture from '../images/profile_picture.jpg'
import RoundedImage from './RoundedImage'
export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <img className='header-logo' src={logo} alt='Scoutium Logo'/>
        <RoundedImage src={profilePicture} alt='Profile' height='80%' />
      </div>
    )
  }
}
