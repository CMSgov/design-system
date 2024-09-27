import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-tooltip';
import './ds-tooltip-icon';
import '../ds-button/ds-button';

export default {
  title: 'Web Components/ds-tooltip',
  argTypes: {
    'active-class-name': {
      description: 'Classes applied to the tooltip trigger when the tooltip is active.',
      control: 'text',
    },
    'aria-label': {
      description: 'Helpful description of the tooltip for screenreaders',
      control: 'text',
    },
    'class-name': {
      description: 'Additional classes to be added to the root element.',
      control: 'text',
    },
    'close-button-label': {
      description: "Configurable text for the aria-label of the tooltip's close button",
      control: 'text',
    },
    component: {
      description:
        'When provided, will render the passed in component for the tooltip trigger. Typically will be a `button`, `a`, or rarely an `input` element.',
      control: 'text',
    },
    dialog: {
      description:
        "Tooltip that behaves like a dialog, i.e. a tooltip that only appears on click, traps focus, and contains interactive content. For more information, see Deque's [tooltip dialog documentation](https://dequeuniversity.com/library/aria/tooltip-dialog)",
      control: 'boolean',
    },
    'interactive-border': {
      description:
        'Sets the size of the invisible border around interactive tooltips that prevents it from immediately hiding when the cursor leaves the tooltip.',
      control: 'number',
    },
    inversed: {
      description: 'Set to "true" to apply the "inverse" theme',
      control: 'boolean',
    },
    'max-width': { description: '`maxWidth` styling applied to the tooltip body', control: 'text' },
    offset: {
      description:
        'Applies `skidding` and `distance` offsets to the tooltip relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/modifiers/popper-offsets/) for more info.',
      control: 'text',
    },
    placement: {
      description:
        'Placement of the tooltip body relative to the trigger. See the [`popperjs` docs](https://popper.js.org/docs/v2/constructors/#options) for more info.',
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
      ],
      control: 'text',
    },
    'root-id': {
      control: 'text',
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
    },
    'show-close-button': {
      description:
        'Determines if close button is shown in tooltip. It is recommended that the close button is only used if `dialog=true`',
      control: 'boolean',
    },
    'transition-duration': {
      description:
        'Duration of the `react-transition-group` CSSTransition. See the [`timeout` option](http://reactcommunity.org/react-transition-group/transition#Transition-prop-timeout) for more info.',
      control: 'text',
    },
    'z-index': {
      description: '`zIndex` styling applied to the tooltip body',
      control: 'text',
    },
  },
  args: {
    title: 'This content is specified by the title attribute.',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/tooltip/).`,
      },
    },
  },
  decorators: [
    webComponentDecorator,
    (Story) => (
      <div style={{ margin: '11rem auto', textAlign: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => {
  return (
    <>
      {args.exampleText && (
        <p className="ds-u-margin--0 ds-u-display--inline">{args.exampleText}</p>
      )}
      <ds-tooltip {...args} />
    </>
  );
};

const iconTrigger = (
  <>
    <ds-tooltip-icon />
    <div slot="title">
      <p>Tooltip trigger uses &lt;ds-tooltip-icon&gt; for the trigger content</p>
    </div>
  </>
);

const inlineTrigger = (
  <>
    inline trigger
    <div slot="title">
      Tooltip trigger uses &lt;a&gt; for the trigger, styled with dotted underline.
    </div>
  </>
);

const withInteractiveContent = (
  <>
    Tooltip with interactive content.
    <div slot="title">
      <p className="ds-u-margin--0">
        Tooltip dialogs only activate on click and include a focus trap. Intended for tooltips with
        complex layout and <a href="/#">interactive elements</a>
      </p>
      <ds-button
        size="small"
        className="ds-u-margin-top--2"
        href="https://dequeuniversity.com/library/aria/tooltip-dialog"
      >
        More info
      </ds-button>
    </div>
  </>
);

const withCloseButton = (
  <>
    Tooltip trigger.
    <div slot="title">
      <p>
        Entering your Social Security Number helps the plan confirm with your state that you have
        Medicaid.
      </p>
    </div>
    <div slot="contentHeading">Really long Heading for tooltip</div>
  </>
);

const inversedTrigger = (
  <>
    <div slot="title">Tooltip trigger uses &lt;TooltipIcon&gt; for the trigger content</div>
    <ds-tooltip-icon inversed="true"></ds-tooltip-icon>
  </>
);

export const TitleAsAttribute = {
  render: Template,
  args: {
    component: 'a',
    id: '1',
    ariaLabel: 'Label describing the subject of the tooltip',
    'class-name': 'ds-c-tooltip__trigger-link',
    title: 'Check out the `title` value in the developer console!',
    children: <span>an attribute</span>,
    exampleText: 'This tooltip has the `title` value set as ',
  },
};

export const ContentHeadingAsAttribute = {
  render: Template,
  args: {
    id: '1',
    ariaLabel: 'Label describing the subject of the tooltip',
    'class-name': 'ds-c-button',
    title: 'This is the title attribute set on the ds-tooltip.',
    'content-heading': 'This is the content heading attribute.',
    children: 'Hover to see the tooltip content.',
  },
};

export const IconTrigger = {
  render: Template,
  args: {
    component: 'a',
    id: '1',
    ariaLabel: 'Lets adjust this right now!',
    'class-name': 'ds-c-tooltip__trigger-icon ds-u-display--inline',
    children: iconTrigger,
    exampleText: 'Tooltip with icon trigger',
  },
};

export const InlineTrigger = {
  render: Template,
  args: {
    component: 'a',
    id: '1',
    ariaLabel: 'Label describing the subject of the tooltip',
    'class-name': 'ds-c-tooltip__trigger-link',
    children: inlineTrigger,
    exampleText: 'Tooltip with ',
  },
};

export const InteractiveContent = {
  render: Template,
  args: {
    component: 'button',
    dialog: 'true',
    id: '1',
    'class-name': 'ds-c-button',
    children: withInteractiveContent,
  },
};

export const WithCloseButton = {
  render: Template,
  args: {
    children: withCloseButton,
    'class-name': 'ds-c-button',
    dialog: 'true',
    id: '1',
    'show-close-button': 'true',
  },
};

export const InversedTrigger = {
  render: Template,
  args: {
    component: 'a',
    children: inversedTrigger,
    'class-name': 'ds-c-tooltip__trigger-icon ds-u-display--inline',
    inversed: 'true',
    id: '1',
    exampleText: 'Tooltip with icon trigger ',
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
};
