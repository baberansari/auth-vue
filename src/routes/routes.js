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
                path: 'password/forget',
                name: 'forget-password',
                component: () => import('@/views/auth/ForgetPassword.vue')
            },
            {
                path: 'password/reset',
                name: 'reset-password',
                component: () => import('@/views/auth/ResetPassword.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/errors/NotFound.vue')
    }
];
