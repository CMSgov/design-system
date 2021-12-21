import PrivacySettingsDialog from '../PrivacySettings/PrivacySettingsDialog';
import React from 'react';
import { withTranslation } from 'react-i18next';

class _PrivacySettingsLink extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }

  openDialog = () => {
    this.setState({ showDialog: true });
  };

  closeDialog = () => {
    this.setState({ showDialog: false });
  };

  render() {
    return (
      <>
        <button onClick={this.openDialog}>{this.props.t('footer.privacySettings')}</button>
        {this.state.showDialog && <PrivacySettingsDialog onExit={this.closeDialog} />}
      </>
    );
  }
}

export const PrivacySettingsLink = withTranslation()(_PrivacySettingsLink);
export default PrivacySettingsLink;
