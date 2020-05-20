const submitEventHelpText = {
  name: 'Please provide a valid event name which should include year. e.g. PyCon 2020',
  description: 'Please describe the event and related details here.',
  keywords: 'Please keywords, separated by commas, related to search the event. e.g. PyCon, Python, PSF Foundation etc.',
  location: 'Please enter complete venue address.',
  logo: 'Please provide a valid link to logo of the event, preferably a png with transparent background.',
  organization: 'Name of the orgnizing team.',
  link: 'Please provide the website link here.',
  date: 'Please provide starting and end date of the event.',
  cfpDate: 'Please provide starting and end date for call for proposals.',
  cover: 'Cover image of the event.',
  coverBgColor: 'Please select a color for event cover background.',
  twitterHandle: 'Please provide twitter handle of the event, so that we can give them a shout out.',
  streamLink: 'Add online streaming link here, if available.',
  submitterTwitterHandle: 'Please provide your Twitter handle to get an applaud from us.',
};

const AppStrings = {
  loadingText: 'Loading...',
};

export const getSubmitEventHelpText = (key) => ((key in submitEventHelpText) ? submitEventHelpText[key] : '');

const getAppString = (key) => ((key in AppStrings) ? AppStrings[key] : '');

export default getAppString;
