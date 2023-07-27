import React, { useRef } from 'react';
import NativeDialog from '@cmsgov/design-system/src/components/NativeDialog/NativeDialog.tsx';
import uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';
import mergeRefs from '@cmsgov/design-system/src/components/utilities/mergeRefs.ts';

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
}

/**
 *
 */
export const FilterDialog = (props: FilterDialogProps) => {
  const headingRef = mergeRefs([props.headingRef, useRef()]);
  const headingId = useRef(props.headingId || uniqueId('filter-dialog-')).current;
  const Heading = `h${props.headingLevel}` as const;

  return (
    <NativeDialog
      className={classNames(props.className, 'ds-c-filter-dialog')}
      // We're not using the NativeDialog as a modal, so exit is never called
      exit={() => {}}
    >
      <div className="ds-c-filter-dialog__window" tabIndex={-1} aria-labelledby={headingId}>
        <div className="ds-c-filter-dialog__header">
          <Heading id={headingId} className="ds-c-filter-dialog__heading" ref={headingRef}>
            {props.heading}
          </Heading>
        </div>
        <div className={classNames('ds-c-filter-dialog__body')} tabIndex={0}>
          {props.children}
        </div>
        <div className="ds-c-filter-dialog__actions">{props.actions}</div>
      </div>
    </NativeDialog>
  );
};

FilterDialog.defaultProps = {
  headingLevel: '3',
};

export default FilterDialog;
