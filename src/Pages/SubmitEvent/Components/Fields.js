import React from 'react';
import moment from 'moment';

import Form from 'Components/Form';
import C from 'Config/Constants';

const { Input, DatePicker, ColorPicker, Checkbox } = Form;
const { INPUT_TYPES, DATE_TYPES } = C;

const formElements = {
  input: (props) => (<Input {...props} />),
  text: (props) => (<Input {...props} type={INPUT_TYPES.TEXTAREA} />),
  range: (props) => (<DatePicker {...props} type={DATE_TYPES.RANGE_TIME} />),
  color: (props) => (<ColorPicker {...props} />),
  checkbox: (props) => (<Checkbox {...props} />),
};

const validations = {
  input: (v) => (/^[a-z 0-9]+$/i.test(v)),
  date: (v) => {
    const [start, end] = v;
    return (start.isValid() && end.isValid());
  },
  color: (v) => (/^#[0-9A-F]{6}$/i.test(v)),
  notEmpty: (v) => (/^.{1,}$/i.test(v)),
  isBool: (v) => (v === false || v === true),
};

export const isValidValue = (v) => (validations.notEmpty(v) || validations.isBool(v));

const defaultDate = () => moment().startOf('day');

const Fields = {
  name: {
    text: 'Name',
    value: '',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  description: {
    text: 'Description',
    value: '',
    component: formElements.text,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  keywords: {
    text: 'Keywords',
    value: '',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  location: {
    text: 'Location Address',
    value: '',
    component: formElements.text,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  logo: {
    text: 'Event Logo Link',
    value: '',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  organization: {
    text: 'Organization',
    value: '',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  link: {
    text: 'Event URL',
    value: '',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  date: {
    text: 'Event Date and Time',
    value: [defaultDate(), defaultDate()],
    component: formElements.range,
    type: 'date',
    required: true,
    validate: validations.date,
  },
  hasCfp: {
    text: 'Accepting propsals for talks?',
    value: false,
    component: formElements.checkbox,
    type: 'checkbox',
    required: true,
  },
  cfpDate: {
    text: 'Call For Proposal Dates',
    value: [defaultDate(), defaultDate()],
    component: formElements.range,
    type: 'date',
    validate: validations.date,
    showIf: 'hasCfp',
  },
  cover: {
    text: 'Event Cover Link',
    value: '',
    component: formElements.input,
    type: 'input',
    validate: validations.notEmpty,
  },
  coverBgColor: {
    text: 'Cover Background Color',
    value: '#fff',
    component: formElements.color,
    type: 'color',
    required: true,
    validate: validations.color,
  },
  twitterHandle: {
    text: 'Event Twitter Handle',
    value: '',
    component: formElements.input,
    type: 'input',
    required: true,
    validate: validations.notEmpty,
  },
  streamLink: {
    text: 'Streaming Link',
    value: '',
    component: formElements.input,
    type: 'input',
  },
  submitterTwitterHandle: {
    text: 'Your Twitter Handle',
    value: '',
    component: formElements.input,
    type: 'input',
  },
};

export default Fields;
