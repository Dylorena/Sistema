import React from 'react';
import { Attributes } from '../entity/entity';
import { DataType } from '../../enums';

interface Props {
  Attribute: Attributes;
}

class Input extends React.Component<Props, any> {
  getMask(dataType: number) {
    switch (dataType) {
      case DataType.DateTime:
        return '__/__/____ __:__:__';
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <label
          htmlFor={`${this.props.Attribute.Name}`}
          style={{ color: this.props.Attribute.Required ? 'red' : '' }}
        >{this.props.Attribute.Description}</label>
        <input
          type="text"
          readOnly={this.props.Attribute.ReadOnly}
          required={this.props.Attribute.Required}
          style={{ width: this.props.Attribute.DisplayWidth }}
          name={this.props.Attribute.Name}
          placeholder={this.getMask(this.props.Attribute.DataType)}
        />
      </div>

    )
  }
}

export default Input;