import React from 'react';

export default {
  title: 'Reset / Lists',
};

export const Lists = () => {
  return (
    <article>
      <hgroup>
        <h2>Lists</h2>
        <p>This page showcases how reset styles impact HTML list tags.</p>
      </hgroup>

      <article>
        <h3>Ordered lists</h3>

        <div className="preview">
          <ol>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
            <li>List Item 4</li>
          </ol>

          <hr />

          <ol>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>
              List Item 3
              <ol>
                <li>List Item 3.1</li>
                <li>
                  List Item 3.2
                  <ol>
                    <li>List Item 3.2.1</li>
                    <li>List Item 3.2.2</li>
                  </ol>
                </li>
                <li>List Item 3.3</li>
              </ol>
            </li>
            <li>List Item 4</li>
          </ol>
        </div>
      </article>

      <article>
        <h3>Unordered lists</h3>

        <div className="preview">
          <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
            <li>List Item 4</li>
          </ul>

          <hr />

          <ul>
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>
              List Item 3
              <ul>
                <li>List Item 3.1</li>
                <li>
                  List Item 3.2
                  <ul>
                    <li>List Item 3.2.1</li>
                    <li>List Item 3.2.2</li>
                  </ul>
                </li>
                <li>List Item 3.3</li>
              </ul>
            </li>
            <li>List Item 4</li>
          </ul>
        </div>
      </article>

      <article>
        <hgroup>
          <h3>Unstyled lists</h3>
          <p>
            To create an unstyled list, apply <code>role=`&quot;`list`&quot;`</code> to either{' '}
            <code>ol</code> or <code>ul</code> HTML tag. Unstyled lists (lists with{' '}
            <code>list-style: none</code> applied) lose semantic meaning for assistive technology in
            Safari. Tying the unstyled styles to this attribute ensures the attribute is used.
          </p>
        </hgroup>

        <div className="preview">
          <ol role="list">
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
            <li>List Item 4</li>
          </ol>

          <hr />

          <ul role="list">
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
            <li>List Item 4</li>
          </ul>
        </div>
      </article>
    </article>
  );
};
