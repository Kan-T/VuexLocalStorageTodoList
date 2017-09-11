// 7. import components we can route to
import Today from './components/Today'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import Done from './components/Done'
import Others from './components/Others'

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
    },
    {
        path: '/others',
        component: Others,
        name:'others',
    },
];
export default routes;