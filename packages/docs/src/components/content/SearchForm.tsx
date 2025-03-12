import { Button, TextInput } from '@cmsgov/design-system';
import { sendSearchInitiatedEvent } from '../../helpers/analytics';

const SearchForm = ({ className }) => {
  return (
    <form
      className={`ds-u-display--flex ${className ?? ''}`}
      action="/search"
      method="GET"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const query = formData.get('query').toString();
        sendSearchInitiatedEvent(query === '' ? 'no value' : query);
      }}
    >
      <TextInput
        type="search"
        size="medium"
        name="query"
        className="ds-u-margin--0 ds-c-field ds-c-field--medium"
      />
      <Button
        isAlternate
        variation="solid"
        type="submit"
        className="search-button ds-u-margin-left--1"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
