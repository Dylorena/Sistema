import React, { ChangeEvent, Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import LZString from 'lz-string';
import InputLogin from '../components/inputLogin/inputLogin';
import { login, getModules, getEntities } from '../conectApi/config';
import DefaultComponent from './defaultComponent/defaultComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface props {

}

interface state {
  User: string;
  Pass: string;
  hiddenPass: string;
}

class Login extends Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      User: '',
      Pass: '',
      hiddenPass: '',
    }
  }

  handleChange(name: string, event: ChangeEvent<HTMLInputElement>) {
    const setValue = event.target.value;
    this.setState({ ...this.state, [name]: setValue });
  }

  async entrar() {
    const obj = {
      User: this.state.User,
      Pass: LZString.compressToBase64(this.state.Pass),
    }

    const resp = await login(obj);
    if (resp && resp.Success) {
      sessionStorage.setItem('SessionID', JSON.stringify(resp.Value));

      const respModules = await getModules();
      localStorage.setItem('Modules', JSON.stringify(respModules.Value));

      let entidades = localStorage.getItem('entitiesdeff');
      if (entidades === null) {
        getEntities();
      }

      ReactDOM.render(<DefaultComponent />, document.getElementById('root'));
    } else {
      toast.error(resp.Message[0]);
    }
  }

  render() {
    return (
      <div className="login container">
        <ToastContainer position="top-center" autoClose={5000} style={{ zIndex: 999999 }} />
        <InputLogin
          onChange={this.handleChange.bind(this, 'User')}
          placeholder="Usuário"
          value={this.state.User}
          icon={<i className="fa fa-user-o" aria-hidden="true" />}
        />
        <InputLogin
          onChange={this.handleChange.bind(this, 'Pass')}
          placeholder="Senha"
          value={this.state.Pass}
          icon={<i className="fa fa-unlock-alt" aria-hidden="true" />}
        />
        <Button color="success" onClick={this.entrar.bind(this)}>Entrar</Button>
      </div>
    )
  }
}

export default Login;