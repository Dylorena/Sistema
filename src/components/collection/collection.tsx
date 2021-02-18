import React from 'react';
import _ from 'lodash';
import { Attributes } from '../entity/entity';

interface Props {
  Attributes: Attributes[];
}

class Collection extends React.Component<Props, any> {


  getcollections() {
    const { Attributes } = this.props;
    return _.map(Attributes, (atrib, index) => {
      return (
        <li style={{ listStyle: 'none' }}>
          <span>
            <i className="fa fa-folder" aria-hidden="true" style={{color: '#ebba44'}}/>
          </span>
          <span>
            {atrib.Description}
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h4 style={{ textAlign: 'center' }}>Árvore</h4>
        <ul>
          {this.getcollections()}
        </ul>
      </div>

    );
  }
}

export default Collection;
