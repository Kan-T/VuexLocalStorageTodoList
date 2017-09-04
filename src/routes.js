// 7. import components we can route to
import Today from './components/Today'
import TodoList from './components/TodoList'
import ThirdAPI from './components/ThirdAPI'

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
            path: '/thirdapi',
            component: ThirdAPI
        }
        ];
export default routes;