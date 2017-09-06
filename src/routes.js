// 7. import components we can route to
import Today from './components/Today'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

const routes = [
        {
            path: '/',
            component: Today
        },
        {
            path: '/todolist',
            component: TodoList
        },
        {
            path: '/addtodo',
            component: AddTodo
        }
        ];
export default routes;