import React from 'react';
import _ from 'lodash';
import { Entities, KeyValue, Attributes } from '../entity/entity';
import { AttrType } from '../../enums';
import Input from '../input/input';
import Select from '../select/select';
import Collection from '../collection/collection';
import InputReference from '../reference/reference';

interface state {
  collection: Attributes[];
  Inputs: Attributes[];
}

interface props {

}

class ShowModule extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      collection: [],
      Inputs: [],
    }
  }

  componentDidMount() {
    let att = localStorage.getItem('entitiesdeff');
    if (att) {
      const entity: KeyValue<number, Entities>[] = JSON.parse(att);
      let tempCollection: Attributes[] = [];
      let tempInputs: Attributes[] = [];
      _.map(entity[1].Value.Attributes, (atrib) => {
        if (atrib.Type === AttrType.Collection) {
          tempCollection.push(atrib);
        } else {
          tempInputs.push(atrib);
        }
      });

      this.setState({ collection: tempCollection, Inputs: tempInputs });

    }
  }

  getCollections() {
    return <Collection Attributes={this.state.collection} />;
  }

  ordenaComponents() {
    this.state.Inputs.sort((a, b) => {
      if (a.DefaultOrder < b.DefaultOrder) {
        return -1;
      } else if (a.DefaultOrder > b.DefaultOrder) {
        return 1;
      }
      return 0;
    })
  }

  getInput() {
    this.ordenaComponents();

    return _.map(this.state.Inputs, (atrib, index) => {
      if (atrib.Visible) {
        switch (atrib.Type) {
          case AttrType.Aggregate:
            return;
          case AttrType.Attribute:
            return <Input Attribute={atrib} index={index} />;
          case AttrType.Dynamic:
            return;
          case AttrType.List:
            return <Select Attribute={atrib} />;
          case AttrType.Reference:
            return <InputReference Attribute={atrib} index={index} />;
          default:
            break;
        }
      }
    });
  }

  render() {
    return (
      <main style={{ backgroundColor: '#f5f5f5', width: '100%', display: 'flex' }}>
        <div className="collection" style={{ width: '20%', border: '1px solid #a0a0a0' }}>
          {this.getCollections()}
        </div>
        <div>
          <div className="attributes container" style={{ width: '100%', height: '92%' }}>
            {this.getInput()}
          </div>
          <div style={{ display: 'fixed', marginTop: '20px' }}>
            {/* Definido se é disabled na collection Ativa/selecionada
            <button disabled={this.state.collectionSelected.Insert}>Novo</button>
            <button disabled={this.state.collectionSelected.Delete}>Excluir</button>
            <button disabled={this.state.collectionSelected.Update}>Salvar</button> */}
          </div>
        </div>
      </main>
    );
  }
};

export default ShowModule;
