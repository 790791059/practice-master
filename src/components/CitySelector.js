import React, { Component } from 'react';
import { Form, Select, Button } from 'antd';

export class CitySelector extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
  render() {
    return (
        <Select mode={this.props.mode}>
          {
            this.props.province.map((item, index) => {
              return <Select.Option key={index} value={item.city}>{item.city}</Select.Option>
            })
          }

        </Select>
    )
  }
}
