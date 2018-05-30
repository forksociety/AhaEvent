import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Radio, Checkbox, Icon, Row, message } from 'antd'

import AppStrings from '../../config/app-strings'
import CustomGrid from '../CustomGrid/custom-grid'
import { generateResponse, showNotification } from '../../models/Utils'

class OSEvents extends Component {
  constructor (props) {
    super(props)
    let searchQueryItems = config.get('searchQueryItems')
    let allFilters = searchQueryItems.filters
    let allSortBy = searchQueryItems.sortBy
    let filterInitialState = {}

    for (let k in allFilters) {
      filterInitialState[k] = false
    }

    this.state = {
      api: config.get('api'),
      appStrings: config.get('appStrings'),
      events: [],
      sortBy: '',
      filterComponents: [],
      sortByComponents: [],
      filterState: filterInitialState,
      allFilters: allFilters,
      allSortBy: allSortBy,
      updateDom: false,
      componentMinHeight: 500
    }
    this.getMinHeight = this.getMinHeight.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSortByChange = this.handleSortByChange.bind(this)
  }

  generateApiUrlWithQuery () {
    let filterStr = Object.keys(this.state.filterState)
      .filter((key) => this.state.filterState[key])
      .map((key) => { return key })

    let query = ''
    if (this.state.sortBy.length > 0 || filterStr.length > 0) {
      query = '?'
    }
    if (this.state.sortBy.length > 0) {
      query += AppStrings.queryParameters.sortBy + '=' +
        this.state.sortBy +
        (filterStr.length > 0 ? '&' : '')
    }
    if (filterStr.length > 0) {
      query += AppStrings.queryParameters.filters + '=' + filterStr
    }

    let url = this.state.api.eventsUrl + query
    return url
  }

  getMinHeight () {
    let n = Math.ceil(this.state.events.length / 4)
    n = (n === 0) ? 1 : n
    return (64 + 316 * n)
  }

  componentWillMount () {
    const hide = message.loading(this.state.appStrings.LOADING_TEXT, 0)
    setTimeout(hide, 500)
    let filters = []
    for (let k in this.state.allFilters) {
      filters.push(
        <Checkbox
          id={k}
          key={k}
          style={{
            margin: "0px 10px 10px 0px"
          }}
          value={this.state.filterState[k]}
          onChange={this.handleFilterChange}
        >
          {this.state.allFilters[k]}
        </Checkbox>
      )
    }
    this.setState({filterComponents: filters})

    let sortByArray = []
    for (let k in this.state.allSortBy) {
      sortByArray.push(
        <Radio.Button key={k} value={k} style={{ marginBottom: '10px' }}>
          {this.state.allSortBy[k].text} <Icon type={this.state.allSortBy[k].icon} />
        </Radio.Button>
      )
    }
    let sortBy = <Radio.Group
      defaultValue={AppStrings.sortBy.DATE_ASC}
      onChange={this.handleSortByChange}
      style={{
        margin: "0px 10px 0px 0px"
      }}
    >
      {sortByArray}
    </Radio.Group>
    this.setState({sortByComponents: sortBy})
    this._loadContent()
  }

  componentDidUpdate () {
    if (this.state.updateDom) {
      this.setState({updateDom: false})
      this._loadContent()
    }
  }

  _loadContent () {
    fetch(this.generateApiUrlWithQuery())
      .then(results => {
        if (results.status === 200) return results.json()
        else {
          return generateResponse(
            false,
            results.status,
            this.state.appStrings.error.HTTP_ERROR
          )
        }
      }).then(data => {
        if (data.success) {
          let e = data.extras.events.map((i) => i)
          if (data.extras.numberOfEvents === 0) {
            e = [{success: false}]
          }
          this.setState({events: e})
          this.setState({componentMinHeight: this.getMinHeight()})
        } else {
          showNotification(
            data.extras.message,
            (data.extras.message ? data.extras.message : this.state.appStrings.error.SOMETHING_WRONG)
          )
        }
      }).catch((error) => {
        showNotification(
          this.state.appStrings.error.NETWORK_ERROR,
          error.toString()
        )
      })
  }

  handleFilterChange (e) {
    let tmpFilter = this.state.filterState
    tmpFilter[e.target.id] = e.target.checked
    this.setState({filterState: tmpFilter})
    this.setState({updateDom: true})
  }

  handleSortByChange (e) {
    this.setState({sortBy: e.target.value})
    this.setState({updateDom: true})
  }

  render () {
    return (
      <div style={{ minHeight: this.state.componentMinHeight }}>
        <Row
          className='filters'
          style={{
            background: '#fff',
            margin: '20px 50px',
            padding: '16px 16px 6px 16px'
          }}
        >
          {this.state.sortByComponents}
          {this.state.filterComponents}
        </Row>
        <CustomGrid {...{ items: this.state.events }} />
      </div>
    )
  }
}
export default OSEvents
