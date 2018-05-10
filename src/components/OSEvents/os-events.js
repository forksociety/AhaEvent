import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Collapse, Form, Radio, Checkbox, Icon } from 'antd'

import AppStrings from '../../config/app-strings'
import CustomGrid from '../CustomGrid/custom-grid'
import { defaultResponse, generateResponse } from '../DefaultResponse/default-response'

const Panel = Collapse.Panel
const FormItem = Form.Item

class OSEvents extends Component {
  constructor (prop) {
    super(prop)
    let searchQueryItems = config.get('searchQueryItems')
    let allFilters = searchQueryItems.filters
    let allSortBy = searchQueryItems.sortBy
    let filterInitialState = {}

    for (let k in allFilters) {
      filterInitialState[k] = false
    }

    this.state = {
      api: config.get('api'),
      events: [],
      sortBy: '',
      filterComponents: [],
      sortByComponents: [],
      filterState: filterInitialState,
      allFilters: allFilters,
      allSortBy: allSortBy,
      updateDom: false
    }
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

  componentWillMount () {
    let filters = []
    for (let k in this.state.allFilters) {
      let id = k
      filters.push(
        <Checkbox
          id={id}
          key={id}
          value={this.state.filterState[id]}
          onChange={this.handleFilterChange}
        >
          {this.state.allFilters[k]}
        </Checkbox>
      )
    }
    this.setState({filterComponents: filters})

    let sortBy = []
    for (let k in this.state.allSortBy) {
      sortBy.push(
        <Radio.Button key={k} value={k}>
          {this.state.allSortBy[k].text} <Icon type={this.state.allSortBy[k].icon} />
        </Radio.Button>
      )
    }
    this.setState({sortByComponents: sortBy})
    this._loadContent()
  }

  componentDidUpdate () {
    if (this.state.events.length === 0) {
      this._loadContent()
    }
  }

  _loadContent () {
    fetch(this.generateApiUrlWithQuery())
      .then(results => {
        if (results.status === 200) return results.json()
        else { return generateResponse(false, results.status, defaultResponse.httpError) }
      }).then(data => {
        if (data.success) {
          let e = data.extras.events.map((i) => i)
          this.setState({events: e})
        } else {
          console.log(data)
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  handleFilterChange (e) {
    let tmpFilter = this.state.filterState
    tmpFilter[e.target.id] = e.target.checked
    this.setState({filterState: tmpFilter})
    this.setState({updateDom: true})
    this.setState({events: []})
  }

  handleSortByChange (e) {
    this.setState({sortBy: e.target.value})
    this.setState({events: []})
  }

  render () {
    return (
      <div>
        <div className='filters' style={{ margin: '20px 50px' }}>
          <Collapse bordered={false}>
            <Panel header='Filters' key='1'>
              <FormItem style={{margin: '0px'}}>
                {this.state.filterComponents}
              </FormItem>
              <Radio.Group defaultValue={AppStrings.sortBy.DATE_ASC} onChange={this.handleSortByChange}>
                {this.state.sortByComponents}
              </Radio.Group>
            </Panel>
          </Collapse>
        </div>
        <CustomGrid {...{ items: this.state.events }} />
      </div>
    )
  }
}
export default OSEvents
