import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/diagram-generator',
        name: 'DiagramGenerator',
        component: () => import('../views/DiagramGenerator.vue')
    },
    {
        path: '/usecase-diagram',
        name: 'UsecaseDiagram',
        component: () => import('../views/UsecaseDiagram.vue')
    },
    {
        path: '/architecture-diagram',
        name: 'ArchitectureDiagram',
        component: () => import('../views/ArchitectureDiagram.vue')
    },
    {
        path: '/er-diagram',
        name: 'ERDiagram',
        component: () => import('../views/ERDiagram.vue')
    },
    {
        path: '/other-diagrams',
        name: 'OtherDiagrams',
        component: () => import('../views/OtherDiagrams.vue')
    },
    {
        path: '/reference-processor',
        name: 'ReferenceProcessor',
        component: () => import('../views/ReferenceProcessor.vue')
    },
    {
        path: '/markdown-converter',
        name: 'MarkdownConverter',
        component: () => import('../views/MarkdownConverter.vue')
    },
    {
        path: '/tool-links',
        name: 'ToolLinks',
        component: () => import('../views/ToolLinks.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
