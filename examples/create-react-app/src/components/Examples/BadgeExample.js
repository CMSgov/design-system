import { Badge } from '@cmsgov/design-system';
import React from 'react';
import usflag from '../../images/us_flag_small.png';

function BadgeExample() {
  return (
    <div>
      <h2>Badge Example</h2>
      <Badge variation="info" size="big">
        <img className="c-usa-banner__header-flag" src={usflag} alt="U.S. flag" />
        &nbsp;CMS Design system
      </Badge>
    </div>
  );
}

export default BadgeExample;
