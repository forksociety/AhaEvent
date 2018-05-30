import React, { Component } from 'react'
import { Icon } from 'antd'

class CustomCard extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleCoverClick = this.handleCoverClick.bind(this)
  }

  handleCoverClick(e) {
    if(e.target.className.includes('website-link')) {
      window.open(this.props.websiteLink, '_blank')
    } else {
      window.location = this.props.cardLink
    }
  }

  render() {
    let hasCover = this.props.cover.image.length > 0
    let overlay = ''
    if (hasCover) {
      overlay = <div className='overlay'></div>
    }
  	return (
  		<div className='custom-card'> 
  			<div onClick={this.handleCoverClick} className='cover' style={this.props.cover.image.length > 0 ? {
                  background: `url(${this.props.cover.image})`,
                  backgroundSize: 'cover',
                  backgroundColor: this.props.cover.bgColor,
                } : {
                  backgroundColor: this.props.cover.bgColor
                }}>
          {overlay}
          <div className='icons'>
            <Icon className='website-link' onClick={this.handleCoverClick} type='link'/>
          </div>
          {this.props.logo}
  			</div>
  			<div className='card-content' style={{padding: '20px'}}>
  				<a href={this.props.cardLink} className='title'>{this.props.title}</a>
  				<div className='sub-title'>{this.props.subTitle}</div>
  				<div>{this.props.description}</div>
  			</div>
  		</div>
  	)
  }
}

export default CustomCard