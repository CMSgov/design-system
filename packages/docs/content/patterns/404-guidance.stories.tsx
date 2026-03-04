import { Button } from '@cmsgov/design-system';

export default {
  title: 'Patterns/404 Page guidance',
};

const PageContent = ({ alignment }) => {
  return (
    <main className="ds-l-container">
      <div className={`ds-l-row ${alignment === 'center' ? 'ds-u-justify-content--center' : ''}`}>
        <h1 className="ds-text-heading--5xl">Page Not Found</h1>
        <p>
          Sorry, we cannot find the page. It have moved or be renamed. Check the address is correct
          and update any bookmarks when you find the page you want.
        </p>
        <Button className="ds-u-margin-top--4" variation="solid" href="javascript:void(0)">
          Go to home
        </Button>
      </div>
    </main>
  );
};

export const CenterAligned = () => {
  return <PageContent alignment="center" />;
};

export const LeftAligned = () => {
  return <PageContent alignment="left" />;
};
