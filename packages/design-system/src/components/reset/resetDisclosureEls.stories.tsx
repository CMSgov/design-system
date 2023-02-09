import React from 'react';

export default {
  title: 'Reset/Disclosure Elements',
};

export const DisclosureElements = () => {
  return (
    <>
      <article>
        <h2>Details (accordion)</h2>

        <div className="preview">
          <details>
            <summary>Details heading 1</summary>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente magnam architecto
              maxime vel officia corporis repellat dolorem excepturi laboriosam perspiciatis,
              corrupti vitae nisi minima neque quia quaerat. Reprehenderit, ea? Accusamus?
            </p>
          </details>
          <details>
            <summary>Details heading 2</summary>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe culpa similique ullam
              beatae distinctio tempore odio ducimus et, nam natus, magnam delectus quasi soluta eum
              blanditiis dolore ab consequatur amet?
            </p>
          </details>
          <details>
            <summary>Details heading 3</summary>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eos debitis vel
              quia? Vel ipsum inventore laborum neque explicabo laudantium, in distinctio saepe amet
              nihil dolorum quasi rerum, non suscipit?
            </p>
          </details>
        </div>
      </article>
    </>
  );
};
