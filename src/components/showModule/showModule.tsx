import React from 'react';
import _ from 'lodash';
import { Entities, KeyValue, Attributes } from '../entity/entity';
import { AttrType } from '../../enums';
import Input from '../input/input';
import Select from '../select/select';
import Collection from '../collection/collection';

interface state {
  collection: Attributes[];
  Inputs: Attributes[];
  // collectionSelected: Attributes;
}

interface props {

}

class ShowModule extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      collection: [],
      Inputs: [],
      // collectionSelected: {} ,
    }
  }

  componentDidMount() {
    let att = localStorage.getItem('entitiesdeff');
    if (att) {
      const entity: KeyValue<number, Entities>[] = JSON.parse(att);
      let tempCollection: Attributes[] = [];
      let tempInputs: Attributes[] = [];
      _.map(entity[0].Value.Attributes, (atrib) => {
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

  getInput() {
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
            return;
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
          <button disabled={false}>Novo</button>
          <button disabled={false}>Excluir</button>
          <button disabled={true}>Salvar</button>
        </div>
      </main>
    );
  }
};

export default ShowModule;
