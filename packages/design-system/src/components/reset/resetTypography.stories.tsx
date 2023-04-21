import React from 'react';

export default {
  title: 'Reset/Typography',
};

export const Typography = () => {
  return (
    <>
      <article>
        <hgroup>
          <h2>Headings</h2>
          <p>
            Heading elements (<code>h1</code> - <code>h6</code>) that exist on their own (e.g.,
            there&apos;s no class attribute or the tag doesn&apos;t exist within a component) will
            be stylistically indistinguishable from body text. This is an intentional decision meant
            as a gentle reminder that structure and style are distinct from one another and you
            should have the flexibility to choose any heading that fits the needs of the user before
            choosing a heading based on aesthetics.
          </p>
        </hgroup>

        <div className="preview">
          <h1>I am an h1 heading</h1>
          <h2>I am an h2 heading</h2>
          <h3>I am an h3 heading</h3>
          <h4>I am an h4 heading</h4>
          <h5>I am an h5 heading</h5>
          <h6>I am an h6 heading</h6>
        </div>
      </article>

      <article>
        <h2>Body text</h2>

        <div className="preview">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A sit placeat illum voluptates
            iste quaerat deserunt corporis provident natus, quibusdam doloremque eius odit,
            voluptatibus quis! Eos officiis soluta quia facilis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis architecto enim quos
            nostrum ut odit natus libero commodi nisi eligendi. Sapiente consectetur quasi
            exercitationem voluptatibus quaerat cumque nesciunt dolor laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa officiis qui quod quam
            repellat fugit inventore voluptatum mollitia. Nihil ipsum esse ipsa officiis debitis
            consequatur maiores dignissimos eveniet quis dicta!
          </p>
        </div>
      </article>

      <article>
        <h2>Inline text elements</h2>

        <div className="preview">
          <p>
            The <a href="#">a element</a>,{' '}
            <a href="#!" target="_blank">
              external a element
            </a>
            , and{' '}
            <a href="#" title="Example Title">
              a element with title
            </a>{' '}
            examples
          </p>
          <p>
            The <b>b element</b> example
          </p>
          <p>
            The <em>em element</em> example
          </p>
          <p>
            The <i>i element</i> example
          </p>
          <p>
            The <strong>strong element</strong> example
          </p>
        </div>
      </article>
    </>
  );
};
