import React, { PureComponent } from 'react'
import RoundedImage from './RoundedImage';

export default class PlayerListItem extends PureComponent {
  render() {
    if (!this.props.player) return null
    const {display_name, position, image_url} = this.props.player
    // console.log(position.name)
    return (
      <div style={styles.outerContainer} className='list-item'>
        <div style={styles.playerContainer}>
          <RoundedImage src={image_url} alt={display_name} />
          <div style={styles.playerInfoContainer}>
            <span>{display_name}</span>
            <span style={styles.textSecondary} >{position ? position.name : null}</span>
          </div>
        </div>
        {
          this.props.actionButton || null
        }
      </div>
    )
  }

}

const styles = {
  outerContainer: {
    display: 'flex',
    // backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  playerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerInfoContainer: {
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  textSecondary: {
    color: '#9699BE',
  }
}

