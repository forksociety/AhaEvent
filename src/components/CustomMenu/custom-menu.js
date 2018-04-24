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
  }

  showModal () {
    this.setState({
      modalVisibility: true
    })
  }

  handleCancel (e) {
    console.log(e)
    this.setState({
      modalVisibility: false
    })
  }

  render () {
    let menuItems = []
    let menuData = config.get('menu')
    menuData.forEach((e) => {
      let menuItemLink = (
        <a href={e.link}>
          <Icon type={e.icon} />
        </a>
      )
      if (typeof e.newTab !== 'undefined' && e.newTab) {
        menuItemLink = (
          <a href={e.link} target='_blank'>
            <Icon type={e.icon} />
          </a>
        )
      }
      if (typeof e.onClick !== 'undefined' && e.onClick) {
        menuItemLink = (
          <a onClick={this.showModal}>
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
          title={'About ' + config.get('siteName')}
          wrapClassName='vertical-center-modal'
          visible={this.state.modalVisibility}
          onCancel={this.handleCancel}
          onOk={this.handleCancel}
          footer={null}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    )
  }
}

export default CustomMenu
