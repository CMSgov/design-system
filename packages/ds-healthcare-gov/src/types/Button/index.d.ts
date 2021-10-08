import { Button as CoreButton } from '@cmsgov/design-system';
import {
  ButtonVariation,
  ButtonProps,
} from '@cmsgov/design-system/dist/types/Button';

interface Button extends CoreButton {
  variation?: ButtonVariation | 'secondary';
}

type OmitProps = 'size';

export class Button extends React.Component<
  Omit<React.HTMLProps<HTMLButtonElement>, OmitProps> & ButtonProps,
  any
> {
  render(): JSX.Element;
}
