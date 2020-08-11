import React from 'react'
import { Select } from 'antd';
import { Form } from 'antd';
import {getCitys} from "../service/api";
const { Option } = Select;

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class city extends React.Component {
  constructor(props){
    super(props);
    this.state={
      province:[],
      provinceData: [],
      cityData:{},
      cities:[],

    }
  }
  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  };

  componentDidMount() {
    // 城市数据可参照下面的API获取
    getCitys({ province: '四川省' }).then(res =>{
        console.log(res)

this.setState({
  province:res,
  provinceData:res.province
})
      }
    );
    getCitys({ province: '广东省' }).then(res => {
      console.log(res)
      this.setState({
        province:this.province.push(res)
      })
    });
  }
onFinish = values => {
  console.log('Success:', values);
};
 onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
   handleProvinceChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  };
  onSecondCityChange = value => {
    this.setState({
      secondCity: value,
    });
  };
    render() {
        return (
            <div>
              <Form name="practice" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                {/*此处放入CitySelector */}
                <Select
                  defaultValue={this.state.provinceData}
                  style={{width: 120}}
                  onChange={this.handleProvinceChange}
                >
                  {this.state.provinceData.map(province => (
                    <Option key={province}>{province}</Option>
                  ))}
                </Select>
                <Select
                  style={{width: 120}}
                  value={this.state.secondCity}
                  onChange={this.onSecondCityChange}
                >
                  {this.state.cities.map(city => (
                    <Option key={city}>{city}</Option>
                  ))}
                </Select>
              </Form>
            </div>

        )

    }
}

export {city as default}
