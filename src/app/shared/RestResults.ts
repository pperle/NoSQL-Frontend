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
  data: Error | User | Course | Course[] | Quiz;
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
  tests?: Quiz[];
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  files?: File[];
}

export class Question {
  question: string;
  answers: string[];
}

export interface Quiz {
  id: number;
  name: string;
  questions: Question[];
}

export interface File {
  id: number;
  name: string;
  link: string;
}
