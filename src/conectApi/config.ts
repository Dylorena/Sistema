import axios from 'axios';
import { Modulos } from '../components/modulesMenu/modulos';

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

export async function getEntities() {
  let session = sessionStorage.getItem('SessionID');
  if (session) {
    session = JSON.parse(session);
  }
  const resp = await api.get('restauth/entitiesdeff', { headers: { 'Content-Type': 'application/json', User: 'admin', sessionid: session } });
  console.log(resp);
  
}
