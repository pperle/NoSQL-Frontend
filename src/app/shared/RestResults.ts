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
  data: Error | LoginResult | CourseResult | Quiz | CourseMetadata | QuizUserResult | CourseMetadata[] | string[] | QuizUserResult[];
}

export class LoginResult {
  _id: string;
  level: UserLevel;
  token: string;
}

export interface Error {
  message: string;
}

export class CourseResult {
  _id: string;
  name: string;
  topics?: Topic[];
  quizs?: QuizMetadata[];
}

export class Topic {
  _id: string;
  name: string;
  description: string;
  files?: FileMetadata[];
}

export class FileMetadata {
  _id: string;
  name: string;
  link: string;
}

export class QuizMetadata {
  _id: string;
  name: string;
}

export class Quiz {
  _id: string;
  name: string;
  questions: Question[];
}

export class Question {
  _id: string;
  question: string;
  answers: string[];
}

export class QuizResult {
  quizId: string;
  answers: UserAnswer[];
}

export class UserAnswer {
  questionId: string;
  givenAnswerIndizies: number[];
}

export class CourseMetadata {
  _id: string;
  name: string;
}

export class QuizUserResult {
  user_id: string;
  points: string;
}

export class NewCourse {
  name: string;
  topics: NewTopic[];
  quizs: NewQuiz[];
  users: string[];
}

export class NewTopic {
  name: string;
  description: string;
  files: NewFile[];
}

export class NewFile  {
  name: string;
  visibilityStartDate: Date;
  visibilityEndDate: Date;
  data: number[];
}

export class NewQuiz {
  name: string;
  visibilityStartDate: Date;
  visibilityEndDate: Date;
  questions: NewQuestion[];
}

export class NewQuestion {
  questionText: string;
  possibleAnwsers: string[];
  correctAnwsers: number[];
}
