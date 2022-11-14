import Badge from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    size: {
      options: ['default', 'big'],
      control: { type: 'select' },
    },
    variation: {
      options: ['default', 'info', 'success', 'warn', 'alert'],
      control: { type: 'select' },
    },
    children: { control: 'text' },
  },
};

const Template = (args) => (
  <>
    <div>
      <Badge {...args}>{args.children ?? <>1</>}</Badge>
      <Badge {...args}>{args.children ?? <>Badge</>}</Badge>
      <Badge {...args} size="big">
        {args.children ?? <>Badge with size &apos;big&apos;</>}
      </Badge>
    </div>
  </>
);

export const Default = Template.bind({});
export const Alert = Template.bind({});
Alert.args = { variation: 'alert' };
export const Warn = Template.bind({});
Warn.args = { variation: 'warn' };
export const Success = Template.bind({});
Success.args = { variation: 'success' };
export const Info = Template.bind({});
Info.args = { variation: 'info' };
