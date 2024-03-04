import React, { Component, Suspense } from "react";
import "react-dropdown/style.css";
import { Row, Col } from "reactstrap";
import FormInput from "../../../../Components/FormControls/FormInput";
import FormSelectSearch from "../../../../Components/FormControls/FormSelectSearch";
import FormUpload from "../../../../Components/FormControls/FormUpload";
import { get } from "lodash";

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
    };

    this.checkVinno = this.checkVinno.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.formData });
  }

  handleChange(event) {
    this.validate();
  }

  //DateRangePicker
  handleChangeS = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ inputStart: event.target.value });
  };
  handleChangeF = (event) => {
    this.setState({ inputFinish: event.target.value });
  };
  handleEvent(event, picker) {
    this.setState({
      inputStart: picker.startDate.format("DD/MM/YYYY"),
      inputFinish: picker.endDate.format("DD/MM/YYYY"),
    });
  }
  setHeaderSection(title, showLine = true) {
    return (
      <div>
        {showLine && <div className="hr-line-dashed" />}
        <h3>{title}</h3>
        <div style={{ minHeight: "2rem" }}></div>
      </div>
    );
  }

  onCheckedButton(isActive, fieldForm) {
    this.setState(
      {
        [fieldForm]: isActive,
      },
      () => this.props.onChange(this.state)
    );
  }

  onChange(name, nativeElement = true) {
    return (event) => {
      let value = nativeElement ? event.target.value : event.label;
      !nativeElement &&
        this.setState({ [name + "_value"]: event.value }, () =>
          this.props.onChange(this.state)
        );

      this.setState(
        {
          [name]: value,
        },
        () => this.props.onChange(this.state)
      );
    };
  }

  //#region  DATE PICKER
  onChangeDate(name, value) {
    let sta = { [name]: value };
    this.setState(sta, () => this.props.onChange(this.state));
  }

  onChangeInputDate(fieldForm) {
    this.setState(
      {
        [fieldForm]: this.state[fieldForm],
      },
      () => this.props.onChange(this.state)
    );
  }

  //#endregion

  checkVinno(vehicleBrandNav, vinNo) {
    this.props.checkVinno(vehicleBrandNav, vinNo);

    if (get(this.props.infoVinno, "canCreate", "true") === true) {
      // alert("สามารถเพิ่มข้อมูลได้")
    } else if (get(this.props.infoVinno, "canCreate", "") === false) {
      // alert("รถมีข้อมูลอยุ่เเล้ว")
    }
  }

  render() {
    const {
      displayName,
      mobile,
      email,
      lineId,
      defaultLanguageNav,
      attachInfo,
      attachCode,
    } = this.state;
    const { schema } = this.props;

    return (
      <Suspense fallback={null}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={displayName}
                  label={schema.label.displayName}
                  fieldForm={"displayName"}
                  placeholder={"display_name"}
                  flex={1}
                  onChange={this.onChange("displayName")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={mobile}
                  label={schema.label.mobile}
                  fieldForm={"mobile"}
                  placeholder={"mobile"}
                  flex={1}
                  onChange={this.onChange("mobile")}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  type={email}
                  schema={schema}
                  value={email}
                  label={schema.label.email}
                  fieldForm={"email"}
                  placeholder={"email"}
                  flex={1}
                  onChange={this.onChange("email")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={lineId}
                  label={schema.label.lineId}
                  fieldForm={"lineId"}
                  placeholder={"line_Id"}
                  flex={1}
                  onChange={this.onChange("lineId")}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormUpload
                  schema={{ required: [""] }}
                  fieldForm="avartar"
                  listType="picture-card"
                  label={schema.label.attachInfo}
                  attachCode={attachCode}
                  attachInfo={attachInfo}
                  endPoint="UserManage/Files/Avatar"
                  response={(res) => {
                    if (res.status) {
                      this.setState(
                        {
                          ["attachCode"]: res.attachInfo.attachCode,
                          ["attachInfo"]: res.attachInfo,
                          ["fileUrl"]: res.attachInfo.fileUrl,
                        },
                        () => this.props.onChange(this.state)
                      );
                    }
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={defaultLanguageNav}
                  label={schema.label.defaultLanguageNav}
                  list={schema.list.defaultLanguageNav}
                  fieldForm={"defaultLanguageNav"}
                  placeholder={"default_language"}
                  flex={1}
                  onChange={(selected) => {
                    let id = selected;
                    if (id === undefined) {
                      if (schema.list.defaultLanguageNav.length)
                        id = "" + schema.list.defaultLanguageNav[0].key;
                      else id = [];
                    }
                    this.setState(
                      {
                        ["defaultLanguageNav"]: id,
                      },
                      () => this.props.onChange(this.state)
                    );
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Suspense>
    );
  }
}
