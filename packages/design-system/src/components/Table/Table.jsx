import PropTypes from 'prop-types';
import React from 'react';
import TableBody from './TableBody';
import TableCaption from './TableCaption';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import classNames from 'classnames';

export const Table = (props) => {
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
  } = props;

  const classes = classNames(
    'ds-c-table',
    striped === true ? 'ds-c-table--striped' : '',
    stacked === true ? 'ds-c-table--stacked' : '',
    className
  );

  return (
    <table className={classes} role="table" {...attributeOptions}>
      {caption && <TableCaption tableCaption={caption} />}

      <TableHead>
        <TableRow>
          {headers.map((header) => {
            if (stacked) {
              return (
                <TableHeader
                  key={header.key}
                  title={header.title}
                  type={header.type}
                  width={header.width}
                  scope="col"
                  id={header.key}
                />
              );
            } else {
              return (
                <TableHeader
                  key={header.key}
                  title={header.title}
                  type={header.type}
                  width={header.width}
                  scope="col"
                />
              );
            }
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row}>
            {headers.map((header, columnIndex) => {
              // render first cell in rows as a header?
              if (columnIndex === 0 && firstCellIsHeader === true) {
                if (stacked) {
                  return (
                    <TableHeader
                      key={header.key}
                      scope="row"
                      title={row[header.key] ? row[header.key] : ''}
                      headers={header.key}
                      titleTag={
                        <span
                          aria-hidden="true"
                          className="ds-c-table--stacked__col-header ds-u-font-weight--bold"
                        >
                          {header.title}
                          <br />
                        </span>
                      }
                    />
                  );
                } else {
                  return (
                    <TableHeader
                      key={header.key}
                      scope="row"
                      title={row[header.key] ? row[header.key] : ''}
                    />
                  );
                }
              } else {
                if (stacked) {
                  return (
                    <TableCell
                      key={header.key}
                      data={row[header.key] ? row[header.key] : ''}
                      type={header.type}
                      headers={header.key}
                      titleTag={
                        <span
                          aria-hidden="true"
                          className="ds-c-table--stacked__col-header ds-u-font-weight--bold"
                        >
                          {header.title}
                          <br />
                        </span>
                      }
                    />
                  );
                } else {
                  return (
                    <TableCell
                      key={header.key}
                      data={row[header.key] ? row[header.key] : ''}
                      type={header.type}
                      cellFunc={header.cellFunc ? header.cellFunc(row[header.key], row) : null}
                    />
                  );
                }
              }
            })}
          </TableRow>
        ))}
      </TableBody>
    </table>
  );
};

Table.defaultProps = {
  captionClassName: '',
  className: '',
  stacked: false,
  striped: false,
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
   * Responsive design to stack cells on detacting the viewpoint is smaller than the media breakpoint width.
   */
  stacked: PropTypes.bool,
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
};

export default Table;
