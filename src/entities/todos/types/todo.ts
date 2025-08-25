interface Todo {
    userId: number
    id: number
    title: string
    completed: boolean
}

type NewTodo = Omit<Todo, 'id'>;

export type { Todo, NewTodo };
