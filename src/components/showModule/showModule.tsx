import React from 'react';
import _ from 'lodash';
import { Entities, KeyValue } from '../entity/entity';
import { AttrType } from '../../enums';
import Input from '../input/input';

interface props {

}

class ShowModule extends React.Component<props, any> {

  getInput() {
    let att = localStorage.getItem('entitiesdeff');
    if (att) {
      const temp: KeyValue<number, Entities>[] = JSON.parse(att);

      return _.map(temp[0].Value.Attributes, (atrib, index) => {
        if (atrib.Type === AttrType.Attribute && atrib.Visible)
          return <Input Attribute={atrib} />
      });

    }
  }

  render() {
    return (
      <main style={{ backgroundColor: '#e7e2e2', width: '100%', display: 'flex' }}>
        <div className="collection" style={{ width: '20%', border: '1px solid gray' }}>

        </div>
        <div className="attributes container" style={{ width: '70%' }}>
          {this.getInput()}
        </div>
      </main>
    );
  }
};

export default ShowModule;