export enum Status {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export enum UserLevel {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR'
}


export interface Message {
  status: Status;
  data: Error | User | Course;
}

export interface Error {
  message: string;
}

export class User {
  id: number;
  level: UserLevel;
}

export interface Course {
  id: number;
  name: string;
  topics?: Topic[];
  tests?: Test[];
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  files?: File[];
}

export interface Test {
  id: number;
  name: string;
}

export interface File {
  id: number;
  name: string;
  link: string;
}
