import React, { Component } from 'react'
import config from 'react-global-configuration'
import { Collapse, Form, Checkbox } from 'antd';

import CustomGrid from '../CustomGrid/custom-grid'
import { defaultResponse, generateResponse } from '../DefaultResponse/default-response'

const Panel = Collapse.Panel;
const FormItem = Form.Item;

class OSEvents extends Component {
  constructor (prop) {
    super(prop)
    let filterItems = [
      {
        id: 'pastEvents',
        text: 'Show Past Events'
      },
      {
        id: 'cfpOpen',
        text: 'CFP Open'
      }
    ]
    let filterInitial = {}
    for(let k of filterItems) {
      filterInitial[k.id] = true
    }
    this.state = {
      api: config.get('api'),
      events: [],
      sortby: 'date-a',
      filterComponents: [],
      filterCheck: filterInitial,
      filterItems: filterItems
    }
  }

  generateApiUrlWithQuery() {
    let filterStr = Object.keys(this.state.filterCheck)
      .filter((key) => this.state.filterCheck[key])
      .map((key) => { return key })
    console.log(filterStr, this.state.api.eventsUrl + '?sortby=' + this.state.sortby + '&filter=' + filterStr)
    return this.state.api.eventsUrl + '?sortby=' + this.state.sortby + '&filter=' + filterStr
  }

  componentWillMount() {
    let filters = []
    for(let k of this.state.filterItems) {
      let id = k.id
      //console.log('loop', id, k.id)
      filters.push(
        <Checkbox
          id={id}
          key={id}
          value={this.state.filterCheck[id]}
          onChange={this.handleChange}
          >
          {k.text}
        </Checkbox>
      )
    }
    this.setState({filterComponents: filters})
    this._loadContent()
  }

  /*componentWillUpdate() {
    this._loadContent()
  }*/

  _loadContent() {
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

  handleChange = (e) => {
    let tmpFilter = this.state.filterCheck
    tmpFilter[e.target.id] = e.target.checked
    this.setState({filterCheck: tmpFilter})
    console.log(e, e.target.id, this.state.filterCheck);
  }

  render () {
    return (
      <div>
        <div className="filters" style={{ margin: '20px 50px' }}>
          <Collapse bordered={false}>
            <Panel header="Filters" key="1">
              <FormItem style={{margin: '0px'}}>
                {this.state.filterComponents}
              </FormItem>
            </Panel>
          </Collapse>
        </div>
        <CustomGrid {...{ items: this.state.events }} />
      </div>
    )
  }
}
export default OSEvents
