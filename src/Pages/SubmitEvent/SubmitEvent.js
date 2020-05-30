import React, {
  Component,
} from 'react';
import {
  reduce,
} from 'ramda';
import {
  Button,
} from 'antd';

import Content from 'Components/Content';
import Form from 'Components/Form';
import {
  getSubmitEventHelpText,
} from 'Config/AppStrings';
import {
  generateDownloadableJsonFile, readableStringToKey,
  generateBasicCardData,
} from 'Utils';

import Card from 'Components/Card';
import config from 'Config';
import FormFields, {
  isValidValue,
} from './Components/Fields';
import styles from './SubmitEvent.module.scss';

const { FormContainer } = Form;

class SubmitEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
    };
  }

  componentDidMount() {
    const formDataInit = reduce((acc, key) => ({
      ...acc, [key]: FormFields[key].value,
    }), {
    }, Object.keys(FormFields));
    this.setState({
      formData: formDataInit,
    });
  }

  getColConfig() {
    return ({
      labelCol: {
        xs: 24,
        sm: 24,
        md: 8,
        lg: 8,


      },
      wrapperCol: 24,
    });
  }

  handleInputChange(para, key, type) {
    const { formData } = this.state;
    const { target } = para;
    let fieldVal = '';
    switch (type) {
      case 'date':
        fieldVal = para;
        break;
      case 'color':
        const { hex } = para;
        fieldVal = hex;
        break;
      case 'checkbox':
        if (target) {
          const { checked } = target;
          fieldVal = checked;
        }
        break;
      case 'input':
      default:
        if (target) {
          const { value } = target;
          fieldVal = value;
        }
        break;
    }

    const { validate } = FormFields[key];
    FormFields[key].error = validate ? !validate(fieldVal) : false;

    this.setState({
      formData: {
        ...formData,
        [key]: fieldVal,
      },
    });
  }

  getFormFormFields() {
    const { formData } = this.state;
    if (formData) {
      return Object.keys(FormFields).map((key) => {
        const { text, component: Component, error, type, required, showIf } = FormFields[key];
        const helpText = getSubmitEventHelpText(key);
        const value = formData[key];
        const show = showIf ? formData[showIf] : true;

        if (show) {
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
        }
        return null;
      });
    }
    return null;
  }

  downloadFile() {
    const { formData } = this.state;

    const isComplete = reduce((acc, key) => {
      const { formData } = this.state;
      const noErrorFound = 'error' in FormFields[key] ? !FormFields[key].error : true;

      const requiredField = (FormFields[key].required ? (isValidValue(formData[key])) : true);
      if (!requiredField) {
        FormFields[key].error = true;
      }
      return (acc && noErrorFound && requiredField);
    }, true, Object.keys(FormFields));

    if (isComplete) {
      const { name } = formData;
      const fileName = readableStringToKey(name);
      generateDownloadableJsonFile(fileName, formData);
    } else {
      this.forceUpdate();
    }
  }

  getFormDataForCard() {
    const { formData } = this.state;
    if (formData) {
      const { logo } = formData;
      return ({
        ...formData,
        logo: logo || config.get('defaults').noImageAvailable,
      });
    }
    return formData;
  }

  render() {
    const formItemLayout = this.getColConfig();
    const cardData = generateBasicCardData(this.getFormDataForCard());
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
          {this.getFormFormFields()}
          <span className={styles.card}>
            <Card {...cardData} />
          </span>

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
