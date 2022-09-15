import FormControl from './FormControl';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  label: 'Foo',
  component: 'div',
  labelComponent: 'label',
  errorPlacement: 'top',
  render: ({ id, labelId, setRef }) => {
    return <input id={id} aria-describedby={labelId} ref={setRef} />;
  },
};

function makeFormControl(customProps = {}) {
  const props = { ...defaultProps, ...customProps };

  return render(<FormControl {...props} />);
}

describe('FormControl', function () {
  it('renders default component and labelComponent elements', () => {
    const { container } = makeFormControl();

    expect(container).toMatchSnapshot();
  });

  it('renders custom component and labelComponent elements', () => {
    const { container } = makeFormControl({
      component: 'fieldset',
      labelComponent: 'legend',
    });

    const legend = container.querySelectorAll('legend');
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(legend.length).toEqual(1);
    expect(container).toMatchSnapshot();
  });

  it('passes label to FormLabel', () => {
    makeFormControl();

    const label = screen.getByLabelText('Foo');
    expect(label).toBeInTheDocument();
  });

  it('passes hint to FormLabel', () => {
    makeFormControl({ hint: '123' });

    const hint = screen.getByText('123');
    expect(hint).toBeInTheDocument();
  });

  it('passes errorMessage to FormLabel', () => {
    makeFormControl({ errorMessage: 'error' });

    const error = screen.getByText('error');
    expect(error).toBeInTheDocument();
  });

  it('renders bottom placed errors ', () => {
    makeFormControl({ errorMessage: 'Error', errorPlacement: 'bottom' });

    const labelError = screen.getByRole('alert');
    expect(labelError).toBeInTheDocument();
    expect(labelError).toMatchSnapshot();
  });

  it('uses aria-invalid for fieldsets with errorMessage', () => {
    makeFormControl({ errorMessage: 'Error', component: 'fieldset' });

    const fieldset = screen.getByRole('group');
    expect(fieldset).toHaveAttribute('aria-invalid');
    expect(fieldset).toMatchSnapshot();
  });

  it('passes inversed to FormLabel', () => {
    makeFormControl({ inversed: true, hint: '123' });

    const label = screen.getByText('123');
    expect(label).toHaveClass('ds-c-field__hint ds-c-field__hint--inverse');
  });

  it('adds className to root element', () => {
    makeFormControl({ className: 'bar', component: 'fieldset' });

    const fieldset = screen.getByRole('group');
    expect(fieldset).toHaveClass('bar');
  });

  it('generates a unique label id when labelId is not defined', () => {
    makeFormControl();

    const uniqueLabel = screen.getByText('Foo', { name: /field_.*/i });
    expect(uniqueLabel).toBeInTheDocument();
  });

  it('passes labelId to the label', () => {
    makeFormControl({ labelId: '1' });

    const labelID = screen.getByText('Foo', { name: '1' });
    expect(labelID).toBeInTheDocument();
  });

  it('generates a unique field input id when id is not defined', () => {
    makeFormControl();

    const input = screen.getByRole('textbox', { name: 'Foo' });
    expect(input).toHaveAttribute('id', expect.stringMatching(/field_.*/i));
    expect(input).toBeInTheDocument();
  });

  it('passes id to the field input', () => {
    makeFormControl({ id: '1' });

    const input = screen.getByRole('textbox', { name: 'Foo' });
    expect(input).toHaveAttribute('id', '1');
  });

  it('returns reference to input field', () => {
    let ref;
    makeFormControl(
      {
        defaultValue: 'Yay',
        inputRef: (el) => {
          ref = el;
        },
      },
      true
    );

    setTimeout(() => {
      expect(ref.value).toEqual('Yay');
    }, 20);
  });

  it('focuses the input when focusTrigger is passed', () => {
    makeFormControl(
      {
        id: 'focus',
        focusTrigger: true,
      },
      true
    );

    setTimeout(() => {
      expect(screen.getByRole('textbox')).toHaveFocus();
    }, 20);
  });
});
