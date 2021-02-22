import React from 'react';
import { Attributes } from '../entity/entity';
import { DataType } from '../../enums';
import './input.scss';

interface Props {
  Attribute: Attributes;
  index: number;
}

class Input extends React.Component<Props, any> {
  getPlaceholder(dataType: number) {
    switch (dataType) {
      case DataType.Date:
        return '__/__/__';
      case DataType.DateTime:
        return '__/__/____ __:__:__';
      default:
        break;
    }
  }

  getDisplayOnReference(campo: Attributes) {
    console.log(this.props.Attribute.DisplayOnReference !== null);
    
    return <div style={{ fontSize: '0.85em' }}>
      <label style={{ width: '290px', textAlign: 'right' }}>{campo.Description}: </label>
      <span></span>
    </div>
  }

  render() {
    const { Attribute, index } = this.props;
    return (
      <div>
        <label
          htmlFor={`${Attribute.Name}`}
          style={{ color: Attribute.Required ? 'red' : '', width: '170px', textAlign: 'right' }}
        >{Attribute.Description}</label>
        <input
          key={`Input-${index}`}
          type="text"
          className="inputs"
          readOnly={Attribute.ReadOnly}
          required={Attribute.Required}
          style={{ width: Attribute.DisplayWidth, height: Attribute.DisplayHeight }}
          name={Attribute.Name}
          placeholder={this.getPlaceholder(Attribute.DataType)}
        />
        {/* {this.getDisplayOnReference()} */}
      </div>
    );
  }
}

export default Input;
