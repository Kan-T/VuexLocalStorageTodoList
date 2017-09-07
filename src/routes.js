// 7. import components we can route to
import Today from './components/Today'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import Done from './components/Done'

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
    },
    {
        path: '/done',
        component: Done
    }
];
export default routes;