import Logo from './Logo';
import { HHSLogo, UsaLogo, WhiteHouseLogo } from '@cmsgov/design-system';

interface LogosRowProps {
  t: (string) => string;
}

/**
 * The logos row includes agency/branch logos and address info
 */
const LogosRow = function (props: LogosRowProps) {
  return (
    <div className="ds-l-container ds-u-margin-top--4">
      <div className="ds-l-form-row">
        <div className="ds-l-col ds-l-col--3 ds-l-sm-col--2 ds-l-md-col--auto">
          <Logo href="http://www.hhs.gov/" width="67px">
            <HHSLogo className="hc-c-logo--hhs-logo" ariaHidden={false} />
          </Logo>
        </div>
        <div className="ds-l-col ds-l-col--9 ds-l-sm-col--10 ds-l-md-col--auto">
          <p
            className="ds-u-font-size--small ds-u-color--muted ds-u-measure--base ds-u-margin--0"
            dangerouslySetInnerHTML={{ __html: props.t('footer.address') }}
          />
        </div>
        <div className="ds-l-col ds-l-col--12 ds-l-lg-col--auto ds-u-lg-margin-top--0 ds-u-margin-top--2 ds-u-margin-left--auto">
          <Logo className="ds-u-margin-right--2" href="http://www.whitehouse.gov/" width="76px">
            <WhiteHouseLogo className="hc-c-logo--wh-logo" ariaHidden={false} />
          </Logo>
          <Logo href="http://www.usa.gov/" width="162px">
            <UsaLogo className="hc-c-logo--usa-logo" ariaHidden={false} />
          </Logo>
        </div>
      </div>
    </div>
  );
};

export default LogosRow;
