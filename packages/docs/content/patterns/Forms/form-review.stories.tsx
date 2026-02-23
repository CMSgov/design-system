import { Button, Review } from '@cmsgov/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Patterns/Form Review examples',
};
export default meta;

type Story = StoryObj;

export const EditByLine: Story = {
  decorators: [
    () => (
      <div className="ds-content">
        <h1>Review & submit your application</h1>

        {/* Personal Information Section */}
        <div className="ds-u-margin-bottom--4">
          <h2>Personal Information</h2>

          <Review heading="Name" editHref="javascript:void(0)" headingLevel="3">
            Jane Doe
          </Review>

          <Review heading="Date of Birth" editHref="javascript:void(0)" headingLevel="3">
            December 21, 1981
          </Review>

          <Review heading="City you were born in" editHref="javascript:void(0)" headingLevel="3">
            Washington D.C.
          </Review>
        </div>

        <div className="ds-u-margin-bottom--4">
          <h2>Contact Information</h2>

          <Review heading="Email Address" editHref="javascript:void(0)" headingLevel="3">
            jane.doe@email.com
          </Review>

          <Review heading="Phone Number" editHref="javascript:void(0)" headingLevel="3">
            Washington D.C.
          </Review>

          <Review heading="Mailing Address" editHref="javascript:void(0)" headingLevel="3">
            123 Main Street
            <br />
            Washington, DC 20001
          </Review>
        </div>

        <div className="ds-u-margin-bottom--4">
          <h2>Employment Information</h2>

          <Review heading="Current Employer" editHref="javascript:void(0)" headingLevel="3">
            ABC Corporation
          </Review>

          <Review heading="Job Title" editHref="javascript:void(0)" headingLevel="3">
            Senior Software Engineer
          </Review>

          <Review heading="Annual Income" editHref="javascript:void(0)" headingLevel="3">
            $95,000
          </Review>
        </div>

        <Button type="button">Submit</Button>
      </div>
    ),
  ],
};

export const EditBySection: Story = {
  args: {
    children: 'Not used - using custom decorators instead',
  },
  decorators: [
    () => (
      <div className="ds-content">
        <h1>Review & submit your application</h1>

        <div className="ds-u-margin-bottom--4">
          <div className="ds-u-margin-bottom--3 ds-u-display--flex ds-u-flex-direction--row ds-u-justify-content--between">
            <h2>Personal Information</h2>
            <a href="javascript:void(0)">Edit</a>
          </div>

          <Review heading="Name" headingLevel="3">
            Jane Doe
          </Review>

          <Review heading="Date of Birth" headingLevel="3">
            December 21, 1981
          </Review>

          <Review heading="City you were born in" headingLevel="3">
            Washington D.C.
          </Review>
        </div>

        <div className="ds-u-margin-bottom--4">
          <div className="ds-u-margin-bottom--3 ds-u-display--flex ds-u-flex-direction--row ds-u-justify-content--between">
            <h2>Contact Information</h2>
            <a href="javascript:void(0)">Edit</a>
          </div>

          <Review heading="Email Address" headingLevel="3">
            jane.doe@email.com
          </Review>

          <Review heading="Phone Number" headingLevel="3">
            Washington D.C.
          </Review>

          <Review heading="Mailing Address" headingLevel="3">
            123 Main Street
            <br />
            Washington, DC 20001
          </Review>
        </div>

        <div className="ds-u-margin-bottom--4">
          <div className="ds-u-margin-bottom--3 ds-u-display--flex ds-u-flex-direction--row ds-u-justify-content--between">
            <h2>Employment Information</h2>
            <a href="javascript:void(0)">Edit</a>
          </div>

          <Review heading="Current Employer" headingLevel="3">
            ABC Corporation
          </Review>

          <Review heading="Job Title" headingLevel="3">
            Senior Software Engineer
          </Review>

          <Review heading="Annual Income" headingLevel="3">
            $95,000
          </Review>
        </div>

        <Button type="button">Submit</Button>
      </div>
    ),
  ],
};
