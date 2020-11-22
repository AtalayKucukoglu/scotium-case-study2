import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import LineupPage from './pages/LineupPage'

export default class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <Header />
        <div className='page-container' style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
          <LineupPage />
        </div>
      </div>
    )
  }
}