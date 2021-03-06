import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeBlockie from 'ethereum-blockies-base64';
import { Picker } from 'emoji-mart';
import SVG from 'react-inlinesvg';

import { CustomFields } from './ProfileComponents';
import FormControls from './FormControls';
import EditOptions from './EditOptions';
import TwitterIcon from '../assets/TwitterIcon.svg';
import GithubIcon from '../assets/GithubIcon.svg';
import EmailIcon from '../assets/EmailIcon.svg';
import InfoIcon from '../assets/InfoIcon.svg';

class GeneralProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {
      coverPhoto,
      image,
      currentUserAddr,
      emoji,
      description,
      verifiedTwitter,
      verifiedGithub,
      verifiedEmail,
      isShowEmoji,
      redirectFn,
      name,
      handleRemovePicture,
      handleUpdatePic,
      handleAddEmoji,
      handleFormChange,
      shouldRemoveCoverPhoto,
      shouldRemoveImage,
      handleShowEmojiPicker,
      spaceProfileImage,
      handleSubmit,
      customFields,
      space,
      isAppProfileDefault,
      handleSelectDefaultProfile,
      isSaveLoading,
      isShowGeneralProfile,
      showOptions,
      handleShowOptionsMenu,
      isSaveSuccessful,
      onSaveComplete,
    } = this.props;

    const isCoverImage = !!coverPhoto.length || (this.coverUpload && !!this.coverUpload.files.length);
    const isImage = !!image.length || (this.fileUpload && !!this.fileUpload.files.length);

    return (
      <div className={`edit ${isShowGeneralProfile ? 'show' : ''}`}>
        <div className="edit_form">

          <div className="edit_profile_section">
            <div className="edit_profile_canvas">
              <div className="edit_profile_editCanvas_wrapper">
                <button
                  className="removeCoverPic removeButton"
                  onClick={() => handleRemovePicture('coverPhoto', true)}
                  text="remove"
                  type="button"
                >
                  {!shouldRemoveCoverPhoto ? <p>&#10005;</p> : <p className="undoArrow">&#8617;</p>}

                </button>
              </div>

              <div className="coverWrapper">
                <label htmlFor="coverInput" className="edit_profile_canvas_overlay">
                  <input
                    id="coverInput"
                    type="file"
                    name="coverPic"
                    className="light coverInput"
                    accept="image/*"
                    onChange={e => handleUpdatePic(e.target.files[0], e, 'coverPhoto')}
                    ref={ref => this.coverUpload = ref}
                  />
                  <p>Change picture</p>
                </label>

                {(isCoverImage && !shouldRemoveCoverPhoto)
                  ? (
                    <img
                      className="coverPic"
                      alt="profile"
                      src={(this.coverUpload && !!this.coverUpload.files.length)
                        ? URL.createObjectURL(this.coverUpload.files[0])
                        : `https://ipfs.infura.io/ipfs/${coverPhoto[0].contentUrl['/']}`}
                    />
                  ) : (
                    <div className="coverPic" />
                  )}
              </div>
            </div>
          </div>

          <div className="edit_profile_section">
            <div className="edit_profile_picAndAddress">
              <div className="edit_userPicture">
                <label htmlFor="fileInput" className="chooseFile">
                  <input
                    id="fileInput"
                    type="file"
                    name="pic"
                    className="light fileInput"
                    accept="image/*"
                    onChange={e => handleUpdatePic(e.target.files[0], e, 'image')}
                    ref={ref => this.fileUpload = ref}
                  />

                  <button
                    className="removeButton removePic"
                    onClick={() => handleRemovePicture('image', false)}
                    text="remove"
                    type="button"
                  >
                    {!shouldRemoveImage ? <p>&#10005;</p> : <p className="undoArrow">&#8617;</p>}
                  </button>

                  {(isImage && !shouldRemoveImage)
                    ? (
                      <div className="profPic_div">
                        <div className="profPic_div_overlay">
                          <p>Change picture</p>
                        </div>
                        <img
                          className="profPic clearProfPic"
                          src={(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])
                            ? URL.createObjectURL(this.fileUpload.files[0])
                            : `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`}
                          alt="profile"
                        />
                      </div>
                    ) : (
                      <div className="profPic_div">
                        <div className="profPic_div_overlay">
                          <p>Change picture</p>
                        </div>
                        {currentUserAddr ? (
                          <img
                            className="profPic"
                            src={makeBlockie(currentUserAddr)}
                            alt="profile"
                          />
                        ) : <div className="profPic" />}
                      </div>
                    )}
                </label>

              </div>

              <EditOptions
                space={space}
                isAppProfileDefault={isAppProfileDefault}
                handleSelectDefaultProfile={handleSelectDefaultProfile}
                spaceProfileImage={spaceProfileImage}
                image={image}
                showOptions={showOptions}
                handleShowOptionsMenu={handleShowOptionsMenu}
                currentUserAddr={currentUserAddr}
              />
            </div>

          </div>

          <div className="edit_profile_section">
            <div className="edit_profile_info">

              <div className="edit_profile_fields_entry noMargin">
                <div className="edit_profile_keyContainer currentAddress">
                  <div className="edit_profile_keyContainer_currentAddressWrapper">
                    <p className="edit_profile_keyContainer_currentAddress">
                      3BOX PROFILE
                      </p>

                    <div className="edit_profile_verifiedFields_info infoIcon">
                      <SVG src={InfoIcon} className="edit_profile_verifiedFields_icons" alt="Info" />
                      <div className="edit_profile_verifiedFields_hover">
                        <span className="edit_profile_verifiedFields_info_text">
                          These fields are saved to your 3Box profile
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="edit_profile_fields_entry nameAndEmoji">
                <div className="edit_profile_fields_entry_name">
                  <div className="edit_profile_keyContainer">
                    <p className="edit_profile_keyContainer_currentAddress">
                      Name
                    </p>
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    className="edit_profile_value nameField"
                    onChange={e => handleFormChange(e, 'name')}
                  />
                </div>

                <div className="edit_profile_fields_entry_emoji">
                  <div className="edit_profile_keyContainer">
                    <p className="edit_profile_keyContainer_currentAddress">
                      Emoji
                    </p>
                  </div>

                  {isShowEmoji
                    && (
                      <div
                        className="edit_profile_value_emojiMenu"
                      >
                        <Picker
                          onSelect={selectedEmoji => handleAddEmoji(selectedEmoji)}
                          title="Pick your spirit emoji"
                        />
                      </div>
                    )}

                  {isShowEmoji && <div className='onClickOutside' onClick={handleShowEmojiPicker} />}

                  <div
                    className="edit_profile_value--spirit"
                    onClick={handleShowEmojiPicker}
                  >
                    {
                      emoji
                        ? (
                          <span className="edit_profile_value--spirit_character" role="img">
                            {emoji.code ? emoji.code : emoji}
                          </span>
                        )
                        : (
                          <span className="edit_profile_value--spirit_character" role="img" aria-label="unicorn">
                            🦄
                          </span>
                        )
                    }
                  </div>
                </div>
              </div>

              <div className="edit_profile_verifiedFields">
                {verifiedTwitter && (
                  <div className="edit_profile_verifiedFields_fields">
                    <SVG src={TwitterIcon} className="edit_profile_verifiedFields_icons" alt="Verified Twitter" />
                    <p>
                      {verifiedTwitter}
                    </p>
                  </div>
                )}

                {verifiedGithub && (
                  <div className="edit_profile_verifiedFields_fields">
                    <SVG src={GithubIcon} className="edit_profile_verifiedFields_icons" alt="Verified Github" />
                    <p>
                      {verifiedGithub}
                    </p>
                  </div>
                )}

                {verifiedEmail && (
                  <div className="edit_profile_verifiedFields_fields">
                    <SVG src={EmailIcon} className="edit_profile_verifiedFields_icons email" alt="Verified Email" />
                    <p>
                      {verifiedEmail}
                    </p>
                  </div>
                )}

                {(verifiedTwitter || verifiedGithub || verifiedEmail) && (
                  <div className="edit_profile_verifiedFields_info infoIcon">
                    <SVG src={InfoIcon} className="edit_profile_verifiedFields_icons" alt="Info" />
                    <div className="edit_profile_verifiedFields_hover">
                      <span className="edit_profile_verifiedFields_info_text">
                        Add or edit verified fields at
                              <a
                          href={`https://3box.io/${currentUserAddr}/edit`}
                          className="edit_profile_verifiedFields_info_text_link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          3Box.io
                        </a>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="edit_profile_fields_entry">
                <div className="edit_profile_keyContainer">
                  <p className="edit_profile_key">Description</p>
                </div>
                <textarea
                  name="description"
                  type="text"
                  className="edit_profile_value--description"
                  value={description}
                  onChange={e => handleFormChange(e, 'description')}
                />
              </div>
            </div>
          </div>

          {customFields.length ? (
            <CustomFields
              customFields={customFields}
              handleFormChange={handleFormChange}
              handleSubmit={handleSubmit}
              onSaveComplete={onSaveComplete}
              redirectFn={redirectFn}
              currentUserAddr={currentUserAddr}
              isSaveLoading={isSaveLoading}
              {...this.props}
            />
          ) : (
              <FormControls
                handleSubmit={handleSubmit}
                onSaveComplete={onSaveComplete}
                redirectFn={redirectFn}
                currentUserAddr={currentUserAddr}
                isSaveLoading={isSaveLoading}
                isSaveSuccessful={isSaveSuccessful}
              />
            )}
        </div>
      </div>
    );
  }
}

GeneralProfile.propTypes = {
  box: PropTypes.object,
  allData: PropTypes.object,
  space: PropTypes.object,
  list: PropTypes.array,
  name: PropTypes.string,
  spaceName: PropTypes.string,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  verifiedEmail: PropTypes.string,
  did: PropTypes.string,
  emoji: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  currentUserAddr: PropTypes.string,
  image: PropTypes.array,
  customFields: PropTypes.array,
  spaceProfileImage: PropTypes.array,
  coverPhoto: PropTypes.array,
  isFetchingThreeBox: PropTypes.bool,
  copySuccessful: PropTypes.bool,
  isShowEmoji: PropTypes.bool,
  shouldRemoveCoverPhoto: PropTypes.bool,
  shouldRemoveImage: PropTypes.bool,
  isAppProfileDefault: PropTypes.bool,
  isShowGeneralProfile: PropTypes.bool,
  isSaveLoading: PropTypes.bool,
  isSaveSuccessful: PropTypes.bool.isRequired,
  showOptions: PropTypes.bool,
  onSaveComplete: PropTypes.func,
  handleShowOptionsMenu: PropTypes.func,
  redirectFn: PropTypes.func,
  handleRemovePicture: PropTypes.func.isRequired,
  handleUpdatePic: PropTypes.func.isRequired,
  handleAddEmoji: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleShowEmojiPicker: PropTypes.func.isRequired,
  handleSelectDefaultProfile: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

GeneralProfile.defaultProps = {
  box: {},
  allData: {},
  space: {},
  did: '',
  verifiedEmail: '',
  verifiedGithub: '',
  verifiedTwitter: '',
  name: '',
  spaceName: '',
  description: '',
  emoji: '',
  email: '',
  currentUserAddr: '',
  image: [],
  coverPhoto: [],
  customFields: [],
  spaceProfileImage: [],
  isFetchingThreeBox: false,
  copySuccessful: false,
  isAppProfileDefault: false,
  isSaveLoading: false,
};

export default GeneralProfile;