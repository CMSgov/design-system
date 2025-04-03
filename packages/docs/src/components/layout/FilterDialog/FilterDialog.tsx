import { useRef } from 'react';
import type * as React from 'react';
import { Dialog } from '@cmsgov/design-system';
import uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';

export interface FilterDialogProps {
  /**
   * Buttons or other HTML to be rendered in the "actions" bar at the bottom of
   * the dialog. Should include a button for applying the user's selections and
   * one for closing the dialog.
   */
  actions: React.ReactNode;
  /**
   * The main dialog content
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root dialog element.
   */
  className?: string;
  /**
   * Text for the FilterDialog heading. Required because the `heading` will be focused on mount.
   */
  heading: string | React.ReactNode;
  /**
   * A unique `id` to be used on heading element to label multiple instances of FilterDialog.
   */
  headingId?: string;
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel?: '1' | '2' | '3' | '4' | '5';
  /**
   * Ref to heading element
   */
  headingRef?: React.MutableRefObject<any>;
  /**
   * A custom `id` attribute for the dialog element
   */
  id?: string;
  /**
   * Controls whether the dialog is in an open state
   */
  isOpen: boolean;
  /**
   * Called when the user triggers an exit event, like by pressing the ESC key.
   * The parent of this component is responsible for showing or not showing the
   * dialog, so you need to use this callback to make that happen. The dialog
   * does not hide itself.
   */
  onExit(event: React.MouseEvent | React.KeyboardEvent): void;
}

/**
 *
 */
export const FilterDialog = (props: FilterDialogProps) => {
  const id = useRef(props.id || uniqueId('filter-dialog-')).current;
  // const headingRef = mergeRefs([props.headingRef, useRef()]);
  // const headingId = props.headingId ?? `${id}__heading`;
  // const Heading = `h${props.headingLevel}` as const;

  const actions = <div className="ds-c-filter-dialog__actions">{props.actions}</div>;

  return (
    <Dialog
      className={classNames(props.className, 'ds-c-filter-dialog')}
      // We're not using the NativeDialog as a modal, so exit is never called
      onExit={props.onExit}
      id={id}
      isOpen={props.isOpen}
      heading={props.heading}
      alert={false}
      backdropClickExits={true}
      actions={actions}
      ariaCloseLabel="Close"
      headerClassName="ds-c-filter-dialog__header"
    >
      {props.children}
    </Dialog>
  );
};

FilterDialog.defaultProps = {
  headingLevel: '3',
};

export default FilterDialog;
