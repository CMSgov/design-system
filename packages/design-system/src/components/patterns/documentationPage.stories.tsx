import React from 'react';
import { SkipNav } from '../SkipNav';
import { VerticalNav } from '../VerticalNav';

export default {
  title: 'Patterns/Documentation Page',
};

const navItems = [
  {
    label: 'Page title',
    url: '#',
    id: 'page-title',
  },
  {
    label: 'Page heading (h1)',
    selected: true,
    items: [
      {
        id: 'section-2',
        label: 'Section Heading (h2)',
        url: '#section-heading-h2',
      },
      {
        id: 'section-3',
        label: 'Section Heading (h3)',
        url: '#section-heading-h3',
      },
      {
        id: 'section-4',
        label: 'Section Heading (h4)',
        url: '#section-heading-h4',
      },
    ],
  },
  {
    label: 'Page title',
    url: '#',
    id: 'page-title2',
  },
];

export const DocumentationPage = () => {
  return (
    <main className="ds-l-container">
      <SkipNav href="#content" />
      <div className="ds-l-row">
        <aside className="ds-u-margin-bottom--4 ds-u-md-margin-bottom--0 ds-l-md-col--4 ds-l-lg-col--3">
          <VerticalNav items={navItems} />
        </aside>
        <article id="content" className="ds-l-md-col--8 ds-l-lg-col--9">
          <h1 className="ds-h1">Page heading (h1)</h1>
          <p className="ds-text--lead">
            The page heading communicates the main focus of the page. Make your page heading
            descriptive and keep it succinct.
          </p>
          <h2 className="ds-h2" id="section-heading-h2">
            Section heading (h2)
          </h2>
          <p className="ds-text">
            These headings introduce, respectively, sections and subsections within your body copy.
            As you create these headings, follow the same guidelines that you use when writing
            section headings: Be succinct, descriptive, and precise.
          </p>
          <h3 className="ds-h3" id="section-heading-h3">
            Subsection heading (h3)
          </h3>
          <p className="ds-text">
            The particulars of your body copy will be determined by the topic of your page.
            Regardless of topic, it’s a good practice to follow the inverted pyramid structure when
            writing copy: Begin with the information that’s most important to your users and then
            present information of less importance.
          </p>
          <p className="ds-text">
            Keep each section and subsection focused — a good approach is to include one theme
            (topic) per section.
          </p>
          <h4 className="ds-h4" id="section-heading-h4">
            Subsection heading (h4)
          </h4>
          <p className="ds-text">
            Use the vertical navigation menu to help your users quickly skip to different sections
            of your page. The menu is best suited to displaying a hierarchy with one to three levels
            and, as we mentioned, to display the sub-navigation of a given page.
          </p>
        </article>
      </div>
    </main>
  );
};
