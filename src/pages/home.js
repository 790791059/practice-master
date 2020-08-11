import React, { Component } from 'react';
import { Form, Select, Button } from 'antd';
import { getCitys, getProvince } from '../service/api';
import { CitySelector } from '../components/CitySelector'
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      practices: [],
      citys: []
    }
  }
  formRef = React.createRef()
  onFinish = values => {
    console.log('Success:', values);
  };
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  getCitLists(province) {
    getCitys({ province: province }).then(res => {
      this.setState({
        citys: res.list
      });
    });
  }

  componentWillMount(){
    getProvince().then(res => {
      this.setState({
        practices: res.list
      });
    });
  }
  render() {
    return (
      <Form name="practice" ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
        <Form.Item label="省">
          <Select onChange={(v) => this.getCitLists(v)}>
            {
              this.state.practices.map((item, index) => {
                return <Select.Option key={index} value={item.province}>{item.province}</Select.Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name="gender" label="市" rules={[{ required: true }]}>
          <CitySelector province={this.state.citys} mode='multiple' />
        </Form.Item>
        <Form.Item >
          <Button>Button</Button>
        </Form.Item>
      </Form>
    )
  }
}
