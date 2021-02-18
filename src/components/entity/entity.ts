import { respPadrao } from "../../conectApi/config";
import { DataType } from "../../enums";

enum ObjectType { Table, View, Select, Custom, ViewTable };

export interface loadEntity {
  DynamicAttributes: [];
  Fields: KeyValue<string, string | loadEntity>[] | null;
  Guid: string | null;
  ModuleKey: number | null;
  State: number | null;
  Type: number | null;
  __type?: string | null;
}

export interface KeyValue<K = string, T = string> {
  key: K;
  Value: T;
}

// [] - criar as tipagens
export interface Entities {
  Attributes: Attributes[];
  AutoRefresh: number;
  BaseType: string;
  Command: string;
  ConfirmBeforeNew: boolean;
  DefaultFilters: [];
  DefaultOrder: string;
  DefaultSearch: string;
  Description: string;
  DynamicAttributes: [];
  InnerView: string;
  Lockups: [];
  ModuleKey: number;
  MultiCompany: boolean;
  Name: string;
  ObjectManipulationKey: number;
  ObjectSearchKey: number;
  Operations: [];
  OrderDesc: boolean;
  PreConfirmation: boolean;
  ReadOnly: boolean;
  Type: ObjectType;
  TypeLog: string;
  TypeName: string;
  UIControllers: [];
  UrlSupport: string;
}

export interface Attributes {
  Description: string;
  Name: string;
  DisplayWidth: number;
  Required: boolean;
  ReadOnly: boolean;
  Type: number;
  Visible: boolean;
  DataType: DataType;

  Source: string[];
  Insert:boolean;
  Update:boolean;
  Delete:boolean;
  grid: boolean;
  MaxItems: number;
  CollectionType: string;
  PropertyFk: string;

  
}

interface systemOperations {

}

export interface respEntity extends Omit<respPadrao, 'Value'> {
  Entities: KeyValue<number, Entities>[];
  Operations: KeyValue<number, systemOperations>[];
}