export interface IEntity{
  DynamicAttributes: [];
  Fields: KeyValue[] | null;
  Guid: string | null;
  ModuleKey: number | null;
  State: number | null;
  Type: number | null;
  __type?: string | null;
}

export interface KeyValue <T = IEntity> {
  key: string;
  Value: T;
}

