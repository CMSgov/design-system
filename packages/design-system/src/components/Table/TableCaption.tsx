import classNames from 'classnames';

export interface TableCaptionProps {
  /**
   * The table caption contents.
   */
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the caption element.
   */
  className?: string;
  /**
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _id?: string;
  /**
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _scrollActive?: boolean;
  /**
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _scrollableNotice?: React.ReactNode;
}

export const TableCaption: React.FC<TableCaptionProps> = ({
  children,
  className,
  _id,
  _scrollActive,
  _scrollableNotice,
  ...tableCaptionProps
}: TableCaptionProps) => {
  const classes = classNames('ds-c-table__caption', className);
  return (
    <caption className={classes} id={_id} {...tableCaptionProps}>
      {children}
      {_scrollActive && _scrollableNotice}
    </caption>
  );
};

// Set component name to make child.type.displayName available to other components (eg. Table)
TableCaption.displayName = 'TableCaption';

export default TableCaption;
