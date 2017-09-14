// 7. import components we can route to
import List from './components/List'

const routes = [
    {
        path: '/',
        redirect: '/list?listName=今日待办',
        component: List
    },
    {
        path: '/list',
        component: List,
        name:'list'
    },
];
export default routes;