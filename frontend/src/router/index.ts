import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard/Dashboard.vue'
import EditorLayout from '../views/editor/EditorLayout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/editor',
            name: 'editor',
            component: EditorLayout
        },
        {
            path: '/module-diagram',
            name: 'module-diagram',
            component: () => import('../views/tools/ModuleDiagram.vue')
        },
        {
            path: '/resources',
            name: 'resources',
            component: () => import('../views/tools/ResourceHub.vue')
        },
        {
            path: '/architecture-diagram',
            name: 'architecture-diagram',
            component: () => import('../views/tools/ArchitectureDiagram.vue')
        },
        {
            path: '/er-diagram',
            name: 'er-diagram',
            component: () => import('../views/tools/ERDiagram.vue')
        }
    ]
})

export default router
