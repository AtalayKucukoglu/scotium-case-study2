import React, { Component } from 'react'
import { Button } from 'reactstrap'
import PlayerListItem from './PlayerListItem'

export default class PlayersContainerCard extends Component {

  render() {
    return (
      <div className='card-container'>
        <div>{this.props.title}</div>
        {
          !this.props.players ? null : this.renderPlayers()
        }
        {
          this.props.mode === 'subs' && this.isLineupFull() ?
          this.renderAddSubsButton() : null
        }
      </div>
    )
  }

  renderPlayers() {
    if (this.props.mode === 'all') {
      if (this.isEmpty()) return this.renderEmptyList() 
      return this.props.players.map(player => {
        const picked = this.isPicked(player.id)
        if (player) {
          return <PlayerListItem key={this.props.mode + player.id} player={player} actionButton={this.renderPickButton(picked, player.id)} />
        }
        else return null
      })
    }
    else if (this.props.mode === 'lineup') {
      if (this.isEmpty()) return this.renderEmptyList() 
      return this.props.players.map(player => {
        if (player) {
          return <PlayerListItem key={player.id} player={player} actionButton={this.renderPickButton(true, player.id)} />
        }
        else return null
      })
    }
    else if (this.props.mode === 'subs') {
      if (this.isEmpty() && !this.isLineupFull()) return this.renderEmptyList();
      if (this.props.subs) {
        return this.props.players.map(player => {
          if (player) {
            return <PlayerListItem key={player.id} player={player} actionButton={this.renderSubsInfo(true, player.id)} />
          }
          else return null
        })
      }
    }
  }

  renderPickButton(picked, id) {
    return (
      <Button color='link' style={picked ? styles.picked : styles.unpicked} onClick={() => this.handlePlayerSelect(picked, id)}>
        {picked ? 'UNPICK' : 'PICK'}
      </Button>
    )
  }

  renderEmptyList() {
    if (this.props.mode === 'lineup') {
      return (
        <div style={{color: '#9699BE'}} >You haven't selected any player for lineup yet.</div>
      )
    } else if (this.props.mode === 'subs') {
      if (!this.isLineupFull()) {
        return (
          <div style={{color: '#9699BE'}} >Select 11 players.</div>
        )
      }
    }
    return null
  }

  renderSubsInfo(isPlayerIn, playerId) {
    return null

  }

  renderAddSubsButton() {
    return (
      <Button color='link' style={{color: '#12C990'}} onClick={() => this.toggleSubsModal()}>
        + Add Substitution
      </Button>
    )
  }

  isPicked(id) {
    const lineup = this.props.lineup;
    let picked = false
    if (lineup.length > 0) {
      lineup.forEach(player => {
        if (player.id === id) picked = true
      })
    }
    return picked
  }

  isEmpty() {
    return this.props.players.length === 0
  }

  isLineupFull() {
    return this.props.lineup && this.props.lineup.length === 11
  }

  handlePlayerSelect(picked, id) {
    console.log("child handle select: ", picked, id)
    this.props.onPlayerSelect(picked, id)
  }

  toggleSubsModal() {
    this.props.onAddSubs()
  }

}


const styles = {
  picked: {
    color: '#E63846'
  },
  unpicked: {
    color: '#3852FF'
  }
}