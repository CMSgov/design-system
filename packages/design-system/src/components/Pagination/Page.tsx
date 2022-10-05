import Button from '../Button/Button';

export interface PageProps {
  /**
   * Defines the page number.
   */
  index: number;
  /**
   * Renders current page if true, other links if false.
   */
  isActive: boolean;
  /**
   * A callback function used to handle state changes.
   */
  onPageChange?: (evt: React.MouseEvent) => void;
  /**
   * Defines application-specific routing in url for links.
   */
  href: string;
}

export default function Page({
  href,
  index,
  isActive,
  onPageChange,
}: PageProps): React.ReactElement {
  return (
    <li>
      {isActive ? (
        <span
          className="ds-c-button ds-c-button--ghost ds-c-pagination__current-page"
          aria-current="true"
        >
          {index}
        </span>
      ) : (
        <Button variation="ghost" href={href} onClick={onPageChange} aria-label={`page ${index}`}>
          {index}
        </Button>
      )}
    </li>
  );
}
