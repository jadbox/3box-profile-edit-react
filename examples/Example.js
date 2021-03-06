import React from 'react';
import Box from '3box';
import SVG from 'react-inlinesvg';

import EditProfile from '../src/index';
import Logo from '../src/assets/3BoxLogoWhite.svg';
import Loading from '../src/assets/Loading.svg';
import Mollie from '../src/assets/Mollie.png';

import './index.scss';

const spaceName = '3boxtestcomments';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // box: {},
      myProfile: {},
      myAddress: '',
      isReady: false,
    }
  }

  componentDidMount() {
    this.handleLogin();
  }

  handleLogin = async () => {
    const addresses = await window.ethereum.enable();
    const myAddress = addresses[0];

    console.log('ethereum', window.ethereum);

    const box = await Box.openBox(myAddress, window.ethereum, {});
    const myProfile = await Box.getProfile(myAddress);
    const space = await box.openSpace(spaceName);

    this.setState({ box, myProfile, myAddress, space });
    box.onSyncDone(() => console.log('syncdone'));
  }

  render() {
    const {
      box,
      myAddress,
      myProfile,
      space
    } = this.state;

    const customFields = [
      {
        key: 'preferredCoin',
        field: 'Preferred Coin',
        inputType: 'dropdown',
        options: [{
          value: 'eth',
          display: 'Ethereum'
        }, {
          value: 'btc',
          display: 'Bitcoin'
        }, {
          value: 'ltc',
          display: 'Litecoin'
        }]
      }, {
        key: 'backupAddress',
        field: 'Backup Address',
        inputType: 'text'
      }, {
        key: 'spiritCryptoKittie',
        field: 'Spirit CryptoKitty',
        inputType: 'textarea'
      }
    ];

    return (
      <div className="App">
        <div className="example_page">
          <div className="example_page_header">
            <SVG src={Logo} alt="Logo" className="example_page_header_logo" />
            <h2>Edit Profile<br /> Component<br /> Demo</h2>
            <p>This component is compatible with all web3 providers, though the example only works with injected ones.</p>
          </div>

          <div className="userscontainer">
            {box ? (
              <EditProfile
                // required
                box={box}
                space={space}
                currentUserAddr={myAddress}

                // optional
                customFields={customFields}
              // currentUser3BoxProfile={myProfile}
              // redirectFn
              // onSaveComplete={(address) => console.log('saved!', address)}
              />
            ) : (
                <div className="Loading_modal_container">
                  <div className="Loading_modal">
                    <img src={Mollie} alt="Mollie" className="Loading_modal_mollie" />
                    <h3>Loading profile</h3>
                    <SVG src={Loading} alt="Logo" className="Loading_modal_load" />
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
