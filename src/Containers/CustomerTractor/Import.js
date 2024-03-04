import React, { Component, Suspense } from "react";
import { BoxContrainer, Button } from "../../components_new";
import { Row, Col, Select, AutoComplete } from "antd";
import FormInput from "../../Components/FormControls/FormInput";

export default class Import extends Component {
  render() {
    return (
      <Suspense fallback={null}>
        <BoxContrainer
          title="Import"
          toolbarRight={
            <div style={{}}>
              <Row>
                <Col>test</Col>
                <Col>test2</Col>
              </Row>
            </div>
          }
          footer={
            <div style={{ textAlign: "right" }}>
              <Button isCancelButton={true} />
              <Button isSaveButton={true} />
            </div>
          }
        >
          <div className="flex-1">
            <FormInput
              schema={""}
              value={""}
              label={"customer_80"}
              fieldForm={"customerName"}
              placeholder={"customer_80"}
              flex={1}
            />
          </div>
        </BoxContrainer>
      </Suspense>
    );
  }
}
