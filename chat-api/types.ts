export interface Message {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

export type MessageMutation = {
  author: string;
  message: string;
};