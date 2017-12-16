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
  data: any;
}

export interface LoginResult extends Message {
  data: {
    userId: number;
    level: UserLevel;
  };
}
