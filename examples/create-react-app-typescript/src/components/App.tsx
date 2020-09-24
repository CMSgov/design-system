import { Alert, Badge, MonthPicker, getMonthNames } from '@cmsgov/design-system';
import React, { SyntheticEvent, useState } from 'react';
import usflag from '../images/us_flag_small.png';

const LOCALE = 'en';
const NUM_MONTHS = 12;
const monthNumbers: number[] = Array.from(new Array(NUM_MONTHS), (_, i) => i + 1);
const monthNames = getMonthNames(LOCALE);

function App() {
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const month = parseInt(event.currentTarget.value, 10);
    const months = selectedMonths.slice();
    if (months.includes(month)) {
      months.splice(months.indexOf(month), 1);
    } else {
      months.push(month);
    }
    setSelectedMonths(months.sort((a, b) => a - b));
  };

  const handleSelectAll = () => {
    setSelectedMonths(monthNumbers.slice());
  };

  const handleClearAll = () => {
    setSelectedMonths([]);
  };

  return (
    <div className="ds-base">
      <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block ds-u-fill--primary-darkest">
        <h1 className="ds-u-margin--0 ds-u-color--white ds-u-font-size--display ds-u-text-align--center">
          Hello, world!
        </h1>
        <div className="ds-u-text-align--center">
          <Badge variation="info" size="big">
            <img className="c-usa-banner__header-flag" src={usflag} alt="U.S. flag" />
            &nbsp;CMS Design system
          </Badge>
        </div>
      </header>

      <div className="ds-l-container">
        <div className="ds-u-measure--base">
          <MonthPicker
            name="month-picker"
            label="Select your favorite months"
            selectedMonths={selectedMonths}
            onChange={handleChange}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
            locale={LOCALE}
          />

          {selectedMonths.length > 0 && (
            <Alert heading="Your favorite months" hideIcon>
              <ul>
                {selectedMonths.map((monthNumber) => (
                  <li key={monthNumber}>{monthNames[monthNumber - 1]}</li>
                ))}
              </ul>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
