import Alert from './ds-alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {},
};

export const WebComponent = (args) =>
  `<ds-alert heading="Hello World">Lorem ipsum dolor sit <a href="https://design.cms.gov/">link text</a>, consectetur
    adipiscing elit, sed do eiusmod. Alerts can have chidren, or they can be left off and used
    with just a heading prop.</ds-alert>`;
