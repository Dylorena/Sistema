import axios from 'axios';
import { Modulos } from '../components/modulesMenu/modulos';
import { respEntity } from '../components/entity/entity';

export interface Ilogin {
  User: string;
  Pass: string;
  Encrypted: boolean;
  TypeRequest: number;
}

export interface respPadrao<T = string> {
  Code: null;
  Message: string[] | [];
  Success: boolean;
  Value: T;
}

interface RespLogin extends respPadrao<string> {
  CpfCnpj: string;
  CurrentDate: string;
  EnvironmentName: string;
  FullName: string;
  PublicToken: string | null;
  StatusIntegracao: number;
  Tokenized: boolean;
  User: string | null;
}

const api = axios.create({
  baseURL: '',
});

const apiEnt = axios.create({
  baseURL: 'http://localhost:8080/',
});

export function login(obj: Pick<Ilogin, "User" | "Pass">) {
  const objLogin: Ilogin = {
    User: obj.User,
    Pass: obj.Pass,
    Encrypted: true,
    TypeRequest: 0,
  };

  return entrar(objLogin);
}

async function entrar(obj: Ilogin): Promise<RespLogin> {
  const resp = await api.post('rest/login', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  return resp.data;
}

export async function getModules(): Promise<respPadrao<Modulos[]>> {
  let session = sessionStorage.getItem('SessionID');
  if (session) {
    session = JSON.parse(session);
  }
  const resp = await api.get('restauth/modules', { headers: { 'Content-Type': 'application/json', User: 'admin', sessionid: session } });
  return resp.data;
}

// export async function getEntities() {
//   let session = sessionStorage.getItem('SessionID');
//   if (session) {
//     session = JSON.parse(session);
//   }
//   const resp = await api.get('restauth/entitiesdeff', { headers: { 'Content-Type': 'application/json', User: 'admin', sessionid: session } });
//   console.log(resp.data);

// }

export async function getEntities() {
  // Retornando somente 1 entidade
  const resp = await apiEnt.get<respEntity>('dados', {});
  if (resp && resp.data.Success) {
    localStorage.setItem('entitiesdeff', JSON.stringify(resp.data.Entities));
  }
}