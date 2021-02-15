import React from 'react';
import _ from 'lodash';
import './asideModules.scss';

type stringOrNull = string | null;
enum ViewMode { Search, Inserting, OnlyInserting };

export interface Modulos {
  Command: string;
  Description: stringOrNull;
  DescriptionSearch: stringOrNull;
  ImageIndex: number | null;
  KeyCode: stringOrNull;
  ModuleKey: number;
  ModuleName: stringOrNull;
  ModuleType: number;
  OpenMode: ViewMode;
  SubItems: Modulos[] | null;
  Type: number;
}

interface state {
  modules: Modulos[];
  moduleSelected: Modulos[] | [];
}

interface props {

}

class modulesMenu extends React.Component<props, state> {
  constructor(props: props) {
    super(props)

    this.state = {
      modules: [],
      moduleSelected: [],
    }
  }

  componentDidMount() {
    const respMod = (localStorage.getItem('Modules'));
    if (respMod !== null) {
      const tempMod = JSON.parse(respMod);
      this.setState({ modules: tempMod, moduleSelected: tempMod })
    }
  }

  renderList() {
    return _.map(this.state.moduleSelected, (module, index) => {
      return (
        <li key={index}>
          <button
            key={`b-${index}`}
            onClick={this.selectModule.bind(this, module)}>
            {module.Description}
            {module.SubItems !== null && <span><i className="fa fa-arrow-right" style={{ color: 'gray' }} /></span>}
          </button>
        </li>
      );
    })

  }

  selectModule(module: Modulos) {
    if (module.SubItems !== null) {
      this.setState({ moduleSelected: module.SubItems })
    }
  }

  returnMenu() {
    this.setState({ moduleSelected: this.state.modules });
    this.renderList();
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <aside id="asideModules" className="menu" >
          <h3 style={{ textAlign: 'center' }}>Módulos</h3>
          <ul>
            {this.state.modules !== this.state.moduleSelected && (
              <li>
                <button
                  key={`btn`}
                  onClick={this.returnMenu.bind(this)}>
                  <i className="fa fa-arrow-left" style={{ color: 'gray' }} />
                </button>
              </li>)}
            {this.renderList()}
          </ul>
        </aside>
        <main>
        </main >
      </div >
    );
  }
}

export default modulesMenu;