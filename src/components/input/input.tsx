import React from 'react';
import { Attributes } from '../entity/entity';
import { DataType } from '../../enums';

interface Props {
  Attribute: Attributes;
  index: number;
}

class Input extends React.Component<Props, any> {
  getPlaceholder(dataType: number) {
    switch (dataType) {
      case DataType.DateTime:
        return '_/__/____ __:__:__';
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <label
          htmlFor={`${this.props.Attribute.Name}`}
          style={{ color: this.props.Attribute.Required ? 'red' : '', width: '170px', textAlign: 'right' }}
        >{this.props.Attribute.Description}</label>
        <input
          key={`Input-${this.props.index}`}
          type="text"
          className="inputs"
          readOnly={this.props.Attribute.ReadOnly}
          required={this.props.Attribute.Required}
          style={{ width: this.props.Attribute.DisplayWidth }}
          name={this.props.Attribute.Name}
          placeholder={this.getPlaceholder(this.props.Attribute.DataType)}
        />
      </div>

    );
  }
}

export default Input;