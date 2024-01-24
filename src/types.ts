export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoUpdateParams = {
  title: string;
  completed: boolean;
};
