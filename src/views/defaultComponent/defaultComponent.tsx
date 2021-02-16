import React from 'react';
import Header from '../../components/header/header';
import ModulesMenu from '../../components/modulesMenu/modulos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowModule from '../../components/showModule/showModule';

class DefaultComponent extends React.Component {


  render() {
    return (
      <>
        <ToastContainer position="top-center" autoClose={5000} style={{ zIndex: 999999 }} />
        <Header />
        <div id="body" style={{ display: 'flex' }}>
          <ModulesMenu />
          <ShowModule />
        </div>
      </>
    );
  }
}

export default DefaultComponent;