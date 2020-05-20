import React, {
  Component,
} from 'react';
import moment from 'moment';
import {
  reduce,
} from 'ramda';
import {
  Button,
} from 'antd';

import Content from 'Components/Content';
import Form from 'Components/Form';
import C from 'Config/Constants';
import {
  getSubmitEventHelpText,
} from 'Config/AppStrings';
import {
  generateDownloadableJsonFile, readableStringToKey,
} from 'Utils';

import styles from './SubmitEvent.module.scss';

const { INPUT_TYPES, DATE_TYPES } = C;

const { FormContainer, Input, DatePicker, ColorPicker } = Form;


const formElements = {
  input: (props) => (<Input {...props} />),
  text: (props) => (<Input {...props} type={INPUT_TYPES.TEXTAREA} />),
  range: (props) => (<DatePicker {...props} type={DATE_TYPES.RANGE_TIME} />),
  color: (props) => (<ColorPicker {...props} />),
};

const validations = {
  input: (v) => (/^[a-z 0-9]+$/i.test(v)),
  date: (v) => {
    const [start, end] = v;
    return (start.isValid() && end.isValid());
  },
  color: (v) => (/^#[0-9A-F]{6}$/i.test(v)),
  notEmpty: (v) => (/^.{1,}$/i.test(v))
};

const elements = {
  name: {
    text: 'Name',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  description: {
    text: 'Description',
    component: formElements.text,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  keywords: {
    text: 'Keywords',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  location: {
    text: 'Location Address',
    component: formElements.text,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  logo: {
    text: 'Event Logo Link',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  organization: {
    text: 'Organization',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  link: {
    text: 'Event URL',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  date: {
    text: 'Event Date and Time',
    component: formElements.range,
    type: 'date',
    required: true,
    validate: validations.date,
  },
  cfpDate: {
    text: 'Call For Proposal Dates',
    component: formElements.range,
    type: 'date',
    required: true,
    validate: validations.date,
  },
  cover: {
    text: 'Event Cover Link',
    component: formElements.input,
    type: 'input',
    validate: validations.notEmpty,
  },
  coverBgColor: {
    text: 'Cover Color',
    component: formElements.color,
    type: 'color',
    required: true,
    validate: validations.color,
  },
  twitterHandle: {
    text: 'Event Twitter Handle',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  streamLink: {
    text: 'Streaming Link',
    component: formElements.input,
    type: 'input',
    validate: validations.notEmpty,
  },
  submitterTwitterHandle: {
    text: 'Your Twitter Handle',
    component: formElements.input,
    type: 'input',
    validate: validations.notEmpty,
  },
};

class SubmitEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
    };
  }

  componentDidMount() {
    const formDataInit = reduce(
      (acc, i) => {
        const val = ['cfpDate', 'date'].includes(i) ? [moment(), moment()] : '';
        return ({
          ...acc, [i]: val,
        });
      },
      {
      },
      Object.keys(elements),
    );
    this.setState({
      formData: formDataInit,
    });
  }

  getColConfig() {
    return ({
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },
      },
      wrapperCol: 24,
    });
  }

  handleInputChange(para, key, type) {
    const { formData } = this.state;
    let fieldVal = '';
    switch (type) {
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
        if (target) {
          const { value } = target;
          fieldVal = value;
        }
        break;
    }

    const validate = elements[key].validate;

    elements[key].error = !validate(fieldVal);

    this.setState({
      formData: {
        ...formData,
        [key]: fieldVal,
      },
    });
  }

  getFormElements() {
    const { formData } = this.state;
    if (formData) {
      return Object.keys(elements).map((key) => {
        const { text, component: Component, error, type, required } = elements[key];
        const helpText = getSubmitEventHelpText(key);
        const value = formData[key];

        const compProps = {
        };
        if (type === 'color') {
          compProps[type] = value;
        } else {
          compProps.value = value;
        }
        return (
          <FormContainer.Item
            key={key}
            label={text}
            className={styles.field}
            validateStatus={error ? 'error' : null}
            help={error ? helpText : null}
            rules={[{
              required, message: helpText,
            }]}
          >
            <Component
              {...compProps}
              placeholder={helpText}
              onChange={(e) => this.handleInputChange(e, key, type)}
            />
          </FormContainer.Item>
        );
      });
    }

    return null;
  }

  downloadFile() {
    const { formData } = this.state;

    const isComplete = reduce((acc, key) => {
      const { formData } = this.state;
      const noErrorFound = 'error' in elements[key] ? elements[key].error : true;

      const requiredField = (elements[key].required ? (!!formData[key]) : true);
      if (!requiredField) {
        elements[key].error = true;
      }
      return (acc && noErrorFound && requiredField);
    }, true, Object.keys(elements));

    if (isComplete) {
      const { name } = formData;
      const fileName = readableStringToKey(name);
      generateDownloadableJsonFile(fileName, formData);
    } else {
      this.forceUpdate();
    }
  }

  render() {
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
    );
  }
}

export default SubmitEvent;
