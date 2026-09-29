import type { Localized } from '../core/i18n';
export interface Skill {id:string;name:string;power:number;level:Localized;context:Localized;projectIds:string[]}
export const skills:Skill[]=[
{id:'ts',name:'TypeScript',power:90,level:{'pt-BR':'TODO · Nível de exemplo',en:'TODO · Example level'},context:{'pt-BR':'TODO · Contratos tipados, interfaces previsíveis e manutenção segura.',en:'TODO · Typed contracts, predictable interfaces and maintainable code.'},projectIds:['orbit','pulse']},
{id:'react',name:'React',power:85,level:{'pt-BR':'TODO · Nível de exemplo',en:'TODO · Example level'},context:{'pt-BR':'TODO · Componentes reutilizáveis e experiências acessíveis.',en:'TODO · Reusable components and accessible experiences.'},projectIds:['orbit']},
{id:'node',name:'Node.js',power:80,level:{'pt-BR':'TODO · Nível de exemplo',en:'TODO · Example level'},context:{'pt-BR':'TODO · APIs, integrações e serviços resilientes.',en:'TODO · APIs, integrations and resilient services.'},projectIds:['orbit']},
{id:'sql',name:'PostgreSQL',power:75,level:{'pt-BR':'TODO · Nível de exemplo',en:'TODO · Example level'},context:{'pt-BR':'TODO · Modelagem de dados e consultas eficientes.',en:'TODO · Data modeling and efficient queries.'},projectIds:['verde']},
{id:'design',name:'UI / UX',power:82,level:{'pt-BR':'TODO · Nível de exemplo',en:'TODO · Example level'},context:{'pt-BR':'TODO · Interfaces claras, responsivas e acessíveis.',en:'TODO · Clear, responsive and accessible interfaces.'},projectIds:['verde','pulse']},
{id:'git',name:'Git & tests',power:88,level:{'pt-BR':'TODO · Nível de exemplo',en:'TODO · Example level'},context:{'pt-BR':'TODO · Colaboração, revisão e testes de fluxos críticos.',en:'TODO · Collaboration, review and critical-path testing.'},projectIds:['orbit','verde','pulse']},
];
