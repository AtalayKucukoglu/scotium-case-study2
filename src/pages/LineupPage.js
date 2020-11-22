import React, { Component } from 'react'
import PlayersContainerCard from '../components/PlayersContainerCard'
import { Button, Dropdown, DropdownItem, DropdownMenu, Input, Modal, ModalBody, ModalHeader } from 'reactstrap'

export default class LineupPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: [],
      lineup: {},
      subsIn: {},
      subsInfo: [],

      subsModalOpen: false,
      subsInSearch: '',
      subsOutSearch: '',
      subsInPlayer: null,
      subsOutPlayer: null,
    }
  }

  componentDidMount() {
    this.fetchPlayerData()
  }

  async fetchPlayerData() {
    const rawData = await fetch('https://api.scoutium.com/api/clubs/4029/players?count=100')
    const jsonData = await rawData.json()
    this.setState({ players: jsonData.players })
  }

  render() {
    if (!this.state.players) return null
    console.log("main component linuep: ", this.state.lineup)

    return (
      <div style={styles.pageContainer}>
        <div style={styles.topContainer}>
          <div style={styles.title}>
            Beşiktaş
          </div>
          <Button disabled={!this.isLineupFull()} color='primary' style={styles.confirmButton}>
            Confirm
          </Button>
        </div>
        <div style={styles.listsContainer}>
          <div style={styles.playersContainer}>
            <PlayersContainerCard mode='all' players={this.state.players} lineup={this.getPlayersAsArray(this.state.lineup)}
              onPlayerSelect={(picked, id) => this.handlePlayerSelect(picked, id)} />
          </div>
          <div style={styles.playersContainer}>
            <PlayersContainerCard mode='lineup' players={this.getPlayersAsArray(this.state.lineup)} subsInfo={this.state.subsInfo}
              onPlayerSelect={(picked, id) => this.handlePlayerSelect(picked, id)} />
          </div>
          <div style={styles.playersContainer}>
            <PlayersContainerCard mode='subs' players={this.getPlayersAsArray(this.state.subsIn)} subsInfo={this.state.subsInfo}
              lineup={this.getPlayersAsArray(this.state.lineup)} onPlayerSelect={() => { }} onAddSubs={() => this.toggleSubsModal()} />
          </div>
        </div>
        {this.renderSubsModal()}
      </div>
    )
  }

  // renderer methods

  renderSubsModal() {
    return (
      <Modal isOpen={this.state.subsModalOpen} toggle={this.toggleSubsModal} >
        <ModalHeader>
          Add Substitution
        </ModalHeader>
        <ModalBody>
          <Input type='search' placeholder='Select out player' value={this.state.subsOutSearch}
            onChange={ev => this.setState({ subsOutSearch: ev.target.value })} />
          {this.renderDropdownPlayers(false, this.getPlayersAsArray(this.state.lineup), this.state.subsOutSearch)}
          <Input type='search' placeholder='Select in player' value={this.state.subsInSearch}
            onChange={ev => this.setState({ subsInSearch: ev.target.value })} />
          {this.renderDropdownPlayers(true, this.state.players, this.state.subsInSearch)}
        </ModalBody>
      </Modal>
    )
  }

  renderDropdownPlayers(playerIn, players, value) {
    console.log("dropdown");
    return (
      <div style={{ height: 100, width: '100%', overflow: 'auto', overflowX: 'hidden', }} >
        {
          players.map(player => {
            console.log("dropdown player");
            if (!player.display_name.toLowerCase().startsWith(value)) return null
            return <DropdownItem
              onClick={() => playerIn ? this.setState({ subsInPlayer: player, subsInSearch: value }) : this.setState({ subsOutPlayer: player, subsOutSearch: value })} >
              {player.display_name}
            </DropdownItem>
          })
        }
      </div>
    )
  }

  // handler methods

  getPlayerById(id) {
    console.log("searching id: ", id)
    let foundPlayer = null;
    const players = this.state.players;
    if (players) {
      players.forEach(player => {
        if (player.id === id) foundPlayer = player
      })
    }
    return foundPlayer
  }

  getPlayersAsArray(players) {
    return Object.values(players)
  }

  isLineupFull() {
    return this.getPlayersAsArray(this.state.lineup).length === 11
  }

  handlePlayerSelect(picked, id) {
    console.log("main handle select: ", picked, id)
    if (!picked && this.isLineupFull()) {
      console.log("lineup full")
      // TODO
      return
    }
    let lineup = this.state.lineup;
    if (picked) {
      console.log("unpicked")
      delete lineup[id]
    } else {
      console.log("picked")
      lineup[id] = this.getPlayerById(id)
    }
    this.setState({ lineup })
  }

  handleNewSubs(inId, outId, minute) {
    if (this.state.subs.length >= 3) {
      console.log("subs limit reached")
      // TODO
      return
    }
    let { subsIn, subsInfo } = this.state;
    subsInfo.push({ in: inId, out: outId, minute: minute })
    subsIn[inId] = this.getPlayerById(inId)
    this.setState({ subsInfo, subsIn })
  }

  toggleSubsModal() {
    this.setState({ subsModalOpen: !this.state.subsModalOpen })
  }




}


const styles = {
  pageContainer: {
    height: 'inherit',
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  topContainer: {
    heigth: '10%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  confirmButton: {
    width: '20%',
    minWidth: 100,
  },
  listsContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '90%',
    marginBottom: 10,
  },
  playersContainer: {
    width: '33%',
    height: '100%',
  }
}