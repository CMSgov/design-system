import React from 'react';
import ContentRenderer from './content/ContentRenderer';
import format from 'date-fns/format';
import { Link } from 'gatsby';

interface BlogArticleProps {
  title: string;
  date: string;
  slug: string;
  body: string;
  theme: string;
}

const BlogArticle = (props: BlogArticleProps) => {
  return (
    <article>
      <header>
        <h2>
          <Link to={`/${props.slug}`}>{props.title}</Link>
        </h2>
        <time dateTime={props.date} className="ds-text-body--sm">
          {format(new Date(props.date), 'PPP')}
        </time>
      </header>
      <div>
        <ContentRenderer data={props.body} theme={props.theme} />
      </div>
    </article>
  );
};

export default BlogArticle;
