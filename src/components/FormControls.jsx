import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import Copy from '../assets/Copy.svg';
import Loading from '../assets/Loading.svg';
import Check from '../assets/Check.svg';
import { shortenEthAddr, copyToClipBoard } from '../utils';

class FormControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copySuccessful: false
    }
  }

  handleCopySuccessful = () => {
    const { currentUserAddr } = this.props;
    copyToClipBoard(currentUserAddr);

    setTimeout(() => {
      this.setState({ copySuccessful: true });
    }, 1);
    setTimeout(() => {
      this.setState({ copySuccessful: false });
    }, 2000);
  }

  render() {
    const {
      handleSubmit,
      redirectFn,
      currentUserAddr,
      isSaveLoading,
      isSaveSuccessful,
      onSaveComplete,
    } = this.props;
    const { copySuccessful } = this.state;

    return (
      <div className="edit_formControls">

        <div
          title={currentUserAddr}
          className="edit_formControls_address"
          onClick={this.handleCopySuccessful}
        >
          {shortenEthAddr(currentUserAddr)}
          <SVG
            className="edit_formControls_address_icon"
            src={Copy}
            alt="Copy to clipboard"
          />

          {copySuccessful && (
            <SVG
              className="edit_formControls_address_copy"
              src={Check}
              alt="Copy successful"
            />
          )}
        </div>

        <div className="edit_formControls_content">
          {isSaveLoading && <SVG src={Loading} alt="loading" className="edit_load" />}

          {isSaveSuccessful && (
            <SVG
              className="edit_formControls_address_copy"
              src={Check}
              alt="Save successful"
            />
          )}

          <button
            type="submit"
            className="edit_formControls_content_save"
            onClick={async (e) => {
              await handleSubmit(e);
              if (onSaveComplete) onSaveComplete(currentUserAddr);
            }}
          >
            Save
          </button>


          {redirectFn && (
            <button
              className="edit_cancel"
              onClick={() => redirectFn(currentUserAddr)}
            >
              Cancel
            </button>
          )}
        </div>
      </div >
    );
  }
}

FormControls.propTypes = {
  currentUserAddr: PropTypes.string,
  redirectFn: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSaveComplete: PropTypes.func,
  isSaveLoading: PropTypes.bool,
  isSaveSuccessful: PropTypes.bool,
};

FormControls.defaultProps = {
  currentUserAddr: '',
  isSaveLoading: false,
  isSaveSuccessful: false,
};


export default FormControls;