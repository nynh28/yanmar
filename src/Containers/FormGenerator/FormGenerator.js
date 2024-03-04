import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BasicField } from './BasicField'
import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"

export const fields = {
  basicField: BasicField,
}

export const uiSchema = {
  section1: {
    basicField: {
      "ui:field": "basicField",
    },
  }
}

export const schema = {
  type: "object",
  // required: ["UserDetail : ", "CompanyDetail"],
  properties: {
    section1: {
      type: "object",
      title: "",
      properties: {
        basicField: {
          type: "object",
          // required: ['prefix', 'name', 'lastName'],
          label: {
            prefix: 'Prefix',
            name: 'Name',
            files: 'ไฟล์'
          },
          list: {
            prefix: [
              { label: "นาย", detail: "นาย" },
              { label: "นาง ", detail: "นาง" },
              { label: "นางสาว ", detail: "นางสาว" },
            ]
          }
        },
      },
    },
  }
}

class FormGenerator extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentDidMount() {

  }


  submit(FormData) {
    console.log("SUBMIT", FormData)
  }

  render() {
    const log = (type) => console.log.bind(console, type);
    return (
      <div className="contrainner">
        <div>{this.props.data.idToken}</div>
        <PannelBox title={'Example Form'}>
          <Form schema={schema}
            uiSchema={uiSchema}
            fields={fields}
            formData={{
              section1: {
                basicField: {
                  name: 'abc'
                }
              }
            }}
            onChange={log("changed")}
            onSubmit={v => this.submit(v)}
            onError={() => { }}
          >
          </Form>
        </PannelBox>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  data: state.signin.header
});

const mapDispatchToProps = (dispatch) => ({
  // setTest: test => dispatch(PopupActions.setTest(test))
});


export default connect(mapStateToProps, mapDispatchToProps)(FormGenerator)
