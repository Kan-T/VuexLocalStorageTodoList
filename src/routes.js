// 7. import components we can route to
import List from './components/List'
import Primary from './components/Primary'

const routes = [
    {
        path: '/',
        component: Primary
    },
    {
        path: '/list',
        component: List,
        name:'list'
    },
];
export default routes;