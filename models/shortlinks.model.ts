export type Id = string;

type Link = string;

type HostName = string;

export type Destination = string;

type Url = string;

export type BaseUrl = Url;

type HasError = boolean;
export interface ErrorResponse {
  hasError: HasError;
}

export interface ShortlinkFormat {
  id: Id;
  hostname: HostName;
  link: Link;
}

export type ShortlinkProps = ShortlinkFormat;

export interface Shortlink {
  id: Id;
  destination: Destination;
}
