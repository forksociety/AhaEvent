import React, { Component } from 'react'
import { Menu, Modal, Icon } from 'antd'
import config from 'react-global-configuration'

class CustomMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisibility: false
    }
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  showModal (e) {
    this.setState({
      modalVisibility: true
    })
  }

  handleCancel (e) {
    this.setState({
      modalVisibility: false
    })
  }

  render () {
    let menuBarItems = {
      left: [],
      right: []
    }
    let menuData = config.get('menu')
    let modalHeader = <h2>About {config.get('appName')}</h2>
    menuData.forEach((e) => {
      let menuItemLink = (
        <a href={e.link} title={e.text}>
          <Icon type={e.icon} />
        </a>
      )

      let redirectUrls = config.get('redirectUrls')

      // if url refers to a different domain, open in a new tab
      if (e.link.indexOf('http://') !== -1 ||
        e.link.indexOf('https://') !== -1 ||
        e.link.substring(1) in redirectUrls
      ) {
        menuItemLink = (
          <a href={e.link} title={e.text} target='_blank'>
            <Icon type={e.icon} />
          </a>
        )
      }

      // open modal if link is '#'
      if (e.link === '#') {
        menuItemLink = (
          <a title={e.text} onClick={this.showModal.bind(this)}>
            <Icon type={e.icon} />
          </a>
        )
      }
      menuBarItems.left.push(
        <Menu.Item
          key={e.icon}
          style={{
            float: 'right',
            color: '#fff',
            fontSize: '150%',
            borderBottom: '0px',
            padding: '0 10px 0px 0px'
          }}
        >
          {menuItemLink}
        </Menu.Item>
      )
    })

    if (this.props.showLogo) {
      menuBarItems.right.push(
        <Menu.Item
          key='logo'
          className='logo'
          style={{
            float: 'left',
            color: '#fff',
            fontSize: '150%',
            borderBottom: '0px',
            padding: '0 0px 0px 20px'
          }}
        >
          <a href='/'>{config.get('appName')}</a>
        </Menu.Item>
      )
    }

    return (
      <div>
        <Menu
          id='aha-menu'
          selectedKeys={['home']}
          mode='horizontal'
          // onClick={this.handleClick}
          style={{
            borderBottom: '0px',
            background: 'rgba(255, 255, 255, 0)'
          }}
        >
          {menuBarItems.left}
          {menuBarItems.right}
        </Menu>

        <Modal
          title={modalHeader}
          wrapClassName='vertical-center-modal'
          visible={this.state.modalVisibility}
          onCancel={this.handleCancel}
          onOk={this.handleCancel}
          footer={null}
        >
          <p style={{ fontSize: '16px' }}>A FLOSS conference discovery platform</p>
        </Modal>
      </div>
    )
  }
}

export default CustomMenu
