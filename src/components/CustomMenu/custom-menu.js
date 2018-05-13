import React, { Component } from 'react'
import { Menu, Modal, Icon } from 'antd'
import config from 'react-global-configuration'

class CustomMenu extends Component {
  constructor (prop) {
    super(prop)
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
    let menuItems = []
    let menuData = config.get('menu')
    let modalHeader = <h2>About {config.get('appName')}</h2>
    menuData.forEach((e) => {
      let menuItemLink = (
        <a href={e.link}>
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
          <a href={e.link} target='_blank'>
            <Icon type={e.icon} />
          </a>
        )
      }

      // open modal if link is '#'
      if (e.link === '#') {
        menuItemLink = (
          <a id={e.key} onClick={this.showModal.bind(this)}>
            <Icon type={e.icon} />
          </a>
        )
      }
      menuItems.push(
        <Menu.Item
          key={e.key}
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
          {menuItems}
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
