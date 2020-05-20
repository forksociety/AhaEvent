import React, {Component} from 'react';
import { reduce } from 'ramda';
import { Button } from 'antd';

import Content from 'Components/Content'
import Form from 'Components/Form';
import C from 'Config/Constants';
import { getHelpText } from 'Config/AppStrings';
import { generateDownloadableJsonFile, readableStringToKey } from 'Utils';

import styles from './SubmitEvent.module.scss';

const { INPUT_TYPES, DATE_TYPES } = C;

const { FormContainer, Input, DatePicker, ColorPicker } = Form;


const formElements = {
  input: (props) => (<Input {...props} />),
  text: (props) => (<Input {...props} type={INPUT_TYPES.TEXTAREA} />),
  range: (props) => (<DatePicker {...props} type={DATE_TYPES.RANGE_TIME} />),
  color: (props) => (<ColorPicker {...props} />)
}
const elements = {
  name: {
    text: 'Name',
    component: formElements.input,
    type: 'input',
  },
  description:{
    text: 'Description',
    component: formElements.text,
    type: 'input',
  },
  keywords:{
    text: 'Keywords',
    component: formElements.input,
    type: 'input',
  },
  location:{
    text: 'Location Address',
    component: formElements.text,
    type: 'input',
  },
  logo:{
    text: 'Event Logo Link',
    component: formElements.input,
    type: 'input',
  },
  organization:{
    text: 'Orgianization',
    component: formElements.input,
    type: 'input',
  },
  link:{
    text: 'Event URL',
    component: formElements.input,
    type: 'input',
  },
  date:{
    text: 'Event Date and Time',
    component: formElements.range,
    type: 'date',
  },
  cfpDate:{
    text: 'Call For Proposal Dates',
    component: formElements.range,
    type: 'date',
  },
  cfpLink:{
    text: 'Call For Proposal Link',
    component: formElements.input,
    type: 'input',
  },
  cover:{
    text: 'Event Cover Link',
    component: formElements.input,
    type: 'input',
  },
  coverBgColor:{
    text: 'Cover Color',
    component: formElements.color,
    type: 'color',
  },
  twitterHandle:{
    text: 'Event Twitter Handle',
    component: formElements.input,
    type: 'input',
  },
  submitterTwitterHandle:{
    text: 'Your Twitter Handle',
    component: formElements.input,
    type: 'input',
  },
}

class SubmitEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null
    };
  }

  componentDidMount() {
    const formDataInit = reduce((acc, i) => ({...acc, [i]: ''}), {}, Object.keys(elements))
    this.setState({
      formData: formDataInit
    });
  }

  getColConfig() {
    return ({
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: 24,
    });
  }

  handleInputChange(para, key, type) {
    console.log('############', para, '@', key, '%', type)
    const { formData } = this.state;
    let fieldVal = '';
    switch(type) {
      case 'date':
        fieldVal = para;
        break;
      case 'color':
        const { hex } = para;
        fieldVal = hex;
        break;
      case 'input':
      default:
        const { target } = para;
        if(target) {
          const { value } = target;
          fieldVal = value;
        }
        break;
    }

    this.setState({
      formData: {
        ...formData,
        [key]: fieldVal,
      }
    })
  }

  getFormElements() {
    const { formData } = this.state;
    if (formData) {
      return Object.keys(elements).map((key) => {
        const { text, component: Component, error, type } = elements[key];
        const helpText = getHelpText(key)
        const value = formData[key];

        const compProps = {};
        if(type === 'color') {
          compProps[type] = value;
        }else {
          compProps['value'] = value;
        }
        return (
          <FormContainer.Item
            key={key}
            label={text}
            validateStatus={error ? 'error' : null}
            help={error ? helpText : null}
          >
            <Component
              {...compProps}
              placeholder={helpText}
              onChange={(e) => this.handleInputChange(e, key, type)}
            />
          </FormContainer.Item>
        )})
    }

    return null
  }

  downloadFile() {
    const { formData } = this.state;
    const { name } = formData;
    const fileName = readableStringToKey(name);
    generateDownloadableJsonFile(fileName, formData)
  }

  render() {
    const { formData } = this.state;
    console.log('000000', formData)
    const formItemLayout = this.getColConfig();

    return (
      <main>
        <Content>
          <span className={styles.info}>
            <h1>Submit an event</h1>
            <p>Fill the form below</p>
          </span>
        </Content>
        <FormContainer
          className={styles.form}
          {...formItemLayout}
        >
          {this.getFormElements()}
          <Button
            onClick={() => this.downloadFile()}
            type="primary"
            htmlType="submit"
          >
            Download JSON
          </Button>
        </FormContainer>
      </main>
    )
  }
}

export default SubmitEvent;
