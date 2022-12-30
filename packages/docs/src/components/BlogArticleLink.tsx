import React from 'react';
import ContentRenderer from './content/ContentRenderer';
import format from 'date-fns/format';
import { Link } from 'gatsby';

interface BlogArticleLinkProps {
  title: string;
  date: string;
  slug: string;
}

const BlogArticleLink = (props: BlogArticleLinkProps) => {
  return (
    <article>
      <header>
        <h2 className="ds-text-heading--2xl ds-u-margin-bottom--0">
          <Link to={`/${props.slug}`}>{props.title}</Link>
        </h2>
        <time dateTime={props.date} className="ds-text-body--sm">
          {format(new Date(props.date), 'PPP')}
        </time>
      </header>
    </article>
  );
};

export default BlogArticleLink;
