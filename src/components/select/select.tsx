import React from 'react';
import _ from 'lodash';
import { Attributes } from '../entity/entity';

interface Props {
  Attribute: Attributes;
}

class Select extends React.Component<Props, any> {
  getOptions(source: string[]) {
    return _.map(source, (op, index) => {
      return <option id={`op-${index}`} value={index} >{op}</option>
    });
  }

  render() {
    return (
      <div>
        <label
          htmlFor={`${this.props.Attribute.Name}`}
          style={{ color: this.props.Attribute.Required ? 'red' : '', width: '170px', textAlign: 'right' }}
        >{this.props.Attribute.Description}</label>
        <select
          name={this.props.Attribute.Name}
          id=""
          style={{ width: this.props.Attribute.DisplayWidth }}
          className="inputs">
          {this.props.Attribute.Source !== null && this.getOptions(this.props.Attribute.Source)}
        </select>
      </div>

    );
  }
}

export default Select;
