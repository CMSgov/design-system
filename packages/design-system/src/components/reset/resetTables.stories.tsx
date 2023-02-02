import React from 'react';

export default {
  title: 'Reset / Tables',
};

export const Tables = () => {
  return (
    <article>
      <hgroup>
        <h2>Tables</h2>
        <p>This page showcases how reset styles impact HTML table tags.</p>
      </hgroup>

      <div className="preview">
        <table>
          <caption>This is a table caption</caption>
          <thead>
            <tr>
              <th>Table Header 1</th>
              <th>Table Header 2</th>
              <th>Table Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Division 1</td>
              <td>Division 2</td>
              <td>Division 3</td>
            </tr>
            <tr>
              <td>Division 1</td>
              <td>Division 2</td>
              <td>Division 3</td>
            </tr>
            <tr>
              <td>Division 1</td>
              <td>Division 2</td>
              <td>Division 3</td>
            </tr>
            <tr>
              <td colSpan={3}>A row with a cell spanning all 3 columns</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Table Footer 1</th>
              <th>Table Footer 2</th>
              <th>Table Footer 3</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </article>
  );
};
