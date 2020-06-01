import PropTypes from 'prop-types';
import React from 'react';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class Table extends React.PureComponent {
  createStackedTitle(title) {
    return (
      <span
        aria-hidden="true"
        className="ds-c-table--stacked__col-header ds-u-font-weight--bold ds-u-padding-bottom--2"
      >
        {title}
      </span>
    );
  }

  render() {
    const {
      caption,
      captionClassName,
      className,
      data,
      firstCellIsHeader,
      headers,
      stacked,
      striped,
      ...attributeOptions
    } = this.props;

    const classes = classNames(
      'ds-c-table',
      striped ? 'ds-c-table--striped' : '',
      stacked ? `ds-c-table--stacked-${stacked}` : '',
      className
    );

    const tableId = uniqueId('tbl_') + '_';

    const theadMarkup = (
      <TableRow>
        {headers.map((header) => {
          return (
            <TableHeader
              key={header.key}
              title={header.title}
              type={header.type}
              width={header.width}
              scope="col"
              id={tableId + 'col_' + header.key}
            />
          );
        })}
      </TableRow>
    );

    const tbodyMarkup = (
      <>
        {data.map((row, rowIndex) => (
          <TableRow key={uniqueId('row_')}>
            {headers.map((header, columnIndex) => {
              // render first cell in rows as a header?
              if (columnIndex === 0 && firstCellIsHeader === true) {
                return (
                  <TableHeader
                    key={header.key}
                    scope="row"
                    title={row[header.key] ? row[header.key] : ''}
                    headers={header.key}
                    id={tableId + 'row_' + rowIndex}
                    stackedTitle={stacked && this.createStackedTitle(header.title)}
                  />
                );
              } else {
                return (
                  <TableCell
                    key={header.key}
                    data={row[header.key] ? row[header.key] : ''}
                    type={header.type}
                    headers={
                      tableId +
                      'col_' +
                      header.key +
                      ' ' +
                      (firstCellIsHeader === true && tableId + 'row_' + rowIndex)
                    }
                    stackedTitle={stacked && this.createStackedTitle(header.title)}
                    render={header.render ? header.render(row[header.key], row) : null}
                  />
                );
              }
            })}
          </TableRow>
        ))}
      </>
    );

    return (
      <table className={classes} role="table" {...attributeOptions}>
        {/* {caption && <TableCaption tableCaption={caption} className={captionClassName} />} */}
        <TableHead>{theadMarkup}</TableHead>
        <TableBody>{tbodyMarkup}</TableBody>
      </table>
    );
  }
}

Table.defaultProps = {
  captionClassName: '',
  className: '',
};

Table.propTypes = {
  /**
   * The description or title of the table.
   */
  caption: PropTypes.string,
  /**
   * Additional classes to be added to the caption element.
   */
  captionClassName: PropTypes.string,
  /**
   * Additional classes to be added to the root table element.
   */
  className: PropTypes.string,
  /**
   * A list of all the rows to be rendered.
   */
  data: PropTypes.arrayOf(Object).isRequired,
  /**
   * Heading in the first cell of the body rows.
   */
  firstCellIsHeader: PropTypes.bool,
  /**
   * The table column headings.
   */
  headers: PropTypes.arrayOf(Object).isRequired,
  /**
   * Responsive design breakpoint prefix to apply stack cells style at different viewpoint sizes.
   */
  stacked: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
};

export default Table;
