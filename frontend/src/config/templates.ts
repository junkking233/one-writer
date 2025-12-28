export interface FabricObjectConfig {
    type: 'text' | 'rect' | 'circle' | 'line';
    left: number;
    top: number;
    content?: string; // For text
    width?: number;
    height?: number;
    fill?: string;
    fontSize?: number;
    fontFamily?: string;
}

export interface TemplateConfig {
    id: string;
    name: string;
    category: 'architecture' | 'er';
    thumbnail: string; // url
    bgImage: string; // url
    overlayObjects: FabricObjectConfig[];
}

export const MOCK_TEMPLATES: TemplateConfig[] = [
    {
        id: 'arch_001',
        name: '经典分层架构',
        category: 'architecture',
        thumbnail: 'https://placehold.co/300x200/1e293b/white?text=Arch+Template',
        bgImage: 'https://placehold.co/1200x800/e2e8f0/475569?text=Architecture+Background+Grid', // Placeholder for now
        overlayObjects: [
            { type: 'rect', left: 400, top: 100, width: 400, height: 80, fill: 'transparent' }, // Header box
            { type: 'text', left: 420, top: 120, content: 'Presentation Layer', fontSize: 24, fill: '#1e293b' },

            { type: 'rect', left: 400, top: 250, width: 400, height: 200, fill: 'transparent' }, // Middle box
            { type: 'text', left: 420, top: 320, content: 'Business Logic Layer', fontSize: 24, fill: '#1e293b' },

            { type: 'rect', left: 400, top: 500, width: 400, height: 80, fill: 'transparent' }, // Bottom box
            { type: 'text', left: 420, top: 520, content: 'Data Access Layer', fontSize: 24, fill: '#1e293b' }
        ]
    },
    {
        id: 'er_001',
        name: '三线表 E-R 模型',
        category: 'er',
        thumbnail: 'https://placehold.co/300x200/0f172a/white?text=ER+Template',
        bgImage: 'https://placehold.co/1200x800/f1f5f9/94a3b8?text=Row-based+Table+Layout',
        overlayObjects: [
            { type: 'text', left: 100, top: 100, content: 'User Table', fontSize: 20, fill: '#000' },
            { type: 'text', left: 100, top: 140, content: 'PK  id          int', fontSize: 16, fill: '#333' },
            { type: 'text', left: 100, top: 170, content: '    username    varchar', fontSize: 16, fill: '#333' },
            { type: 'text', left: 100, top: 200, content: '    password    varchar', fontSize: 16, fill: '#333' }
        ]
    }
]
