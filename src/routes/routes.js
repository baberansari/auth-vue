import AppLayout from '@/layout/AppLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
import Login from '@/views/auth/Login.vue';

export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/Home.vue')
            },
            {
                path: 'male',
                name: 'male',
                component: () => import('@/views/MaleListing.vue')
            },
            {
                path: 'female',
                name: 'female',
                component: () => import('@/views/FemaleListing.vue')
            },
            {
                path: 'setting',
                name: 'setting',
                component: () => import('@/views/Setting.vue')
            }

        ]
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'signup',
                name: 'signup',
                component: () => import('@/views/auth/Signup.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/auth/Register.vue')
            },
            {
                path: 'password/forget',
                name: 'forget-password',
                component: () => import('@/views/auth/ForgetPassword.vue')
            },
            {
                path: '/auth/reset-password/:token',
                name: 'reset-password',
                component: () => import('@/views/auth/ResetPassword.vue'),
                props: route => ({ token: route.params.token, email: route.query.email })
            }
            
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/errors/NotFound.vue')
    }
];
