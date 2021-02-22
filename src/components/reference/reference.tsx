import React from 'react';
import { Attributes } from '../entity/entity';
import { DataType } from '../../enums';

interface Props {
  Attribute: Attributes;
  index: number;
}

const campoTeste = {
  // AllowNegative: false,
  // AutoEnabled: false,
  // AutoSearch: false,
  // AutoSearchLimit: 0,
  // AutoSource: 0,
  // AutoValue: null,
  CollectionType: null,
  // ControlTag: "",
  DataType: 0,
  DefaultOrder: 2,
  Delete: false,
  Description: "E-mail",
  // Display: null,
  DisplayHeight: -1,
  DisplayOnReference: null,
  DisplayWidth: 550,
  // DynamicFunction: null,
  // FnOnExit: 0,
  // ForceEveryAutoValue: false,
  Grid: false,
  // Hint: null,
  // HtmlPattern: null,
  // IgnoreDefaultFilters: false,
  // ImageDimension: null,
  // Index: -1,
  Insert: false,
  // ListBox: false,
  // Mask: "",
  MaxItems: 0,
  Name: "Email",
  // Nullable: false,
  // OnlyInserted: false,
  // Precision: 0,
  PropertyFk: null,
  PropertyWhere: null,
  ReadOnly: false,
  Reference: null,
  ReferenceFilters: null,
  ReloadAfterUpdate: false,
  Required: true,
  // Searchable: true,
  // ShowOnGrid: false,
  // Size: 100,
  Source: null,
  // Totalized: false,
  Type: 1,
  // TypeDisplay: 0,
  Update: false,
  // UseTypeDisplay: false,
  // Virtual: false,
  // VirtualInView: true,
  Visible: true,
  // Watermark: ""
}

class InputReference extends React.Component<Props, any> {
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
        <div style={{ display: 'flex' }} >
          <label
            htmlFor={`${Attribute.Name}`}
            style={{ color: Attribute.Required ? 'red' : '', width: '170px', textAlign: 'right' }}
          >{Attribute.Description}</label>
          <div style={{ width: Attribute.DisplayWidth }} className="focusOut">
            <input
              key={`Input-${index}`}
              type="text"
              readOnly={Attribute.ReadOnly}
              required={Attribute.Required}
              style={{ width: '21%' }}
              name={Attribute.Name}
              placeholder={this.getPlaceholder(Attribute.DataType)}
            />
            <input
              key={`Input-${index}`}
              type="text"
              readOnly={Attribute.ReadOnly}
              required={Attribute.Required}
              style={{ width: '79%' }}
              name={Attribute.Name}
              placeholder={this.getPlaceholder(Attribute.DataType)}
            />
          </div>

        </div>
        {Attribute.DisplayOnReference !== null && this.getDisplayOnReference(campoTeste)}
      </div>
    );
  }
}

export default InputReference;
