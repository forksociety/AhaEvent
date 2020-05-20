const helpText = {
  name: 'Please provide a valid event name which should include year. e.g. PyCon 2020',
  description: 'Please describe the event and related details here.',
  keywords: 'Please keywords, separated by commas, related to search the event. e.g. PyCon, Python, PSF Foundation etc.',
  location: 'Please enter complete venue address.',
  logo: 'Please provide a valid link to logo of the event, preferably a png with transparent background.',
  orgnization: 'Name of the orgnizing team.',
  link: 'Please provide the website link here.',
};

const AppStrings = {
  loadingText: 'Loading...',
};

export const getHelpText = (key) => ((key in helpText) ? helpText[key] : '');

const getAppString = (key) => ((key in AppStrings) ? AppStrings[key] : '');

export default getAppString;
