export type Nullable<T> = T | null;

export type EnumT = [string, ...string[]];

export interface IResponseType {
  name?: string;
  error?: string;
  message: string;
  statusCode: number;
}

export interface IPaginationType {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface IPaginatedType<T> {
  data: T[];
  response: IResponseType;
  pagination: IPaginationType;
}

export type ResponsePayload<T> = {
  data: T;
  response: IResponseType;
};

export type Params = { id: string };

export type QueryParams = {
  params: Params;
};

export type NullableFile = Nullable<File>;
