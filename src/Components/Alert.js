import React, { Component } from "react";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { Row } from "reactstrap";
import { getErrorMessage } from "../Functions/getErrorMessage";
import { t } from "../Components/Translation";
// import loadingImg from '../Layouts/img/Londing.gif'
import images from "../Themes/Images";
import { Button } from "../components_new";

class Alert extends Component {
  alertSuccess(show = false, content = "") {
    return (
      <SweetAlert
        success
        show={show}
        title={t("success")}
        onConfirm={() => {
          this.props.onConfirm();
        }}
        btnSize="sm"
      >
        {t(content)}
      </SweetAlert>
    );
  }

  alertError(
    show = false,
    content = "",
    ErrorSubcode = 0,
    validateCode = true
  ) {
    if (parseInt(ErrorSubcode)) {
      ErrorSubcode = parseInt(ErrorSubcode);
    }
    return (
      <SweetAlert
        error
        show={show}
        title={t("error")}
        onConfirm={() => {
          this.props.onConfirm();
        }}
        btnSize="sm"
      >
        <div>
          <Row>{t(content)}</Row>
          {validateCode && (
            <Row>
              {typeof ErrorSubcode === "string"
                ? ErrorSubcode
                : getErrorMessage(parseInt(ErrorSubcode), this.props.language)}
            </Row>
          )}
        </div>
      </SweetAlert>
    );
  }

  alertConfirm(show = false, content = "") {
    return (
      <SweetAlert
        custom
        showCancel
        customIcon={images.questionMark}
        show={show}
        confirmBtnText={t("yes")}
        cancelBtnText={t("no")}
        // confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        // customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
        title={t("confirm")}
        onConfirm={() => {
          this.props.onConfirm();
        }}
        onCancel={() => {
          this.props.onCancel();
        }}
        btnSize="sm"
      >
        {this.props.language === "en" ? (
          <span>
            {t("confirm_sure")} {t(content)}
          </span>
        ) : (
          <span>
            {t("confirm_sure")}
            {t(content)}
          </span>
        )}
      </SweetAlert>
    );
  }

  alertInformation(show = false, content = "", messageList = []) {
    return (
      <SweetAlert
        info
        show={show}
        title={t("information")}
        onConfirm={() => {
          this.props.onConfirm();
        }}
        btnSize="sm"
        fontSize="md"
      >
        {t(content)}

        {messageList.length > 0 && (
          <ul>
            {messageList.map((message, key) => {
              return (
                <li style={{ textAlign: "left" }} key={key}>
                  {t(message)}
                </li>
              );
            })}
          </ul>
        )}
      </SweetAlert>
    );
  }

  alertLoading(show = false, content = "") {
    return (
      <SweetAlert
        custom
        show={show}
        style={{ width: 250, height: 150 }}
        showConfirm={false}
        customIcon={images.loading}
        onConfirm={() => {
          this.props.onConfirm();
        }}
        title=""
      >
        {content} {t("loading")}
      </SweetAlert>
    );
  }

  alertProcessing(show = false) {
    return (
      <SweetAlert
        custom
        show={show}
        style={{ width: 150, height: 150 }}
        showConfirm={false}
        customIcon={images.loading}
        onConfirm={() => {
          this.props.onConfirm();
        }}
        title=""
      >
        {t("processing")}
      </SweetAlert>
    );
  }

  alertUploading(show = false) {
    return (
      <SweetAlert
        custom
        show={show}
        style={{ width: 150, height: 150 }}
        showConfirm={false}
        customIcon={images.loading}
        onConfirm={() => {
          this.props.onConfirm();
        }}
        title=""
      >
        {t("uploading")}
      </SweetAlert>
    );
  }
  alertSuccessConfirm(show = false, content = "", title = "") {
    return (
      <SweetAlert
        success
        // custom
        showCancel
        // customIcon={images.questionMark}
        show={show}
        confirmBtnText={t("yes")}
        cancelBtnText={t("no")}
        cancelBtnBsStyle="default"
        title={t(title)}
        onConfirm={() => {
          this.props.onConfirm();
        }}
        onCancel={() => {
          this.props.onCancel();
        }}
        customButtons={
          <>
            <Button
              size="large"
              width={100}
              text="no"
              isCancelButton={true}
              onClick={() => this.props.onCancel()}
            />

            <Button
              size="large"
              width={100}
              text="yes"
              isSaveButton={true}
              onClick={() => this.props.onConfirm()}
            />
          </>
        }
      >
        <span>{t(content)}</span>
      </SweetAlert>
    );
  }

  render() {
    let { setting } = this.props;

    return (
      <div>
        {setting.type === 1
          ? this.alertSuccess(setting.show, setting.content)
          : setting.type === 2
          ? this.alertError(
              setting.show,
              setting.content,
              setting.ErrorSubcode,
              setting.validateCode
            )
          : setting.type === 3
          ? this.alertConfirm(setting.show, setting.content)
          : setting.type === 4
          ? this.alertInformation(setting.show, setting.content)
          : setting.type === 5
          ? this.alertLoading(setting.show, setting.content)
          : setting.type === 6
          ? this.alertProcessing(setting.show)
          : setting.type === 7
          ? this.alertUploading(setting.show)
          : setting.type === 8
          ? this.alertSuccessConfirm(
              setting.show,
              setting.content,
              setting.title
            )
          : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
});

export default connect(mapStateToProps)(Alert);

// <Alert setting.type={3} show={true} onConfirm={() => ""} content="THIS CONTENT" />
//#region  this.props
// setting.type  : 1 = Success
//                 2 = Error
//                 3 = Confirm
//                 4 = Information
//                 5 = Loading
//                 6 = Processing
// show         : show alert modal
// content      : content
//#endregion

// #ALERT
// 1. Success
//          btn : OK
//          title : Success
//          content : [Add/Update/Delete] Driver Successed

// 2. Error
//          btn : OK
//          title : Error
//          content :  [Add/Update/Delete] Driver Failed
//          errorMessage : ???

// 3. Confirm
//          btn : Cancel/Yes
//          title : Confirm?
//          content : Are you sure to [Add/Update/Delete] Driver

// 4. Information
//          btn : OK
//          title : Informaion
//          content : ???

// 5. Loading
//          btn : OK
//          content : Loading

// 6. Processing
//          btn : OK
//          content : Processing

// REF : https://github.com/djorg83/react-bootstrap-sweetalert#propsconfirmbtntext
