import { Button } from '@cmsgov/design-system';

export default {
  title: 'Patterns/404 Page guidance',
};

export const Page = () => {
  return (
    <main className="ds-l-container">
      <div className="ds-l-row">
        <h1 className="ds-text-heading--3xl ds-u-font-weight--bold ds-u-color--primary">
          Page Not Found
        </h1>
        <p>
          Sorry, we cannot find the page. It may have been moved or be renamed. Check the address is
          correct and update any bookmarks when you find the page you want.
        </p>
        <Button className="ds-u-margin-top--4" variation="solid" href="javascript:void(0)">
          Go to home
        </Button>
      </div>
    </main>
  );
};
