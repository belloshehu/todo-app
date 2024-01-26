export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoUpdateParams = {
  title: string;
  completed: boolean;
};

export type TodoPostBody = {
  todo: {
    id?: number;
    title: string;
    completed: boolean;
  };
  message: string;
  success: boolean;
};

export type MissingRequestBodyProperty = {
  message: string;
  success: boolean;
};
