export interface Project {
  id: string; title: string; category: string; description: string; problem: string;
  stack: string[]; role: string; result: string; color: number;
  demo?: string; repository?: string; image?: string; imageAlt: string; todo: boolean;
}
export const projects: Project[] = [
  { id: 'orbit', title: 'Orbit', category: 'PRODUTIVIDADE', description: 'Menos organização. Mais realização. Um espaço para transformar tarefas em progresso.', problem: 'Centralizar tarefas e prioridades de equipes em uma interface clara.', stack: ['React', 'TypeScript', 'Node.js'], role: 'TODO · Exemplo: design da interface e desenvolvimento full stack.', result: 'TODO · Adicione resultados verificáveis e métricas reais.', color: 0x7769ab, imageAlt: 'TODO · Screenshot do Orbit', todo: true },
  { id: 'verde', title: 'Verde', category: 'E-COMMERCE', description: 'Uma experiência de compra simples para quem quer consumir de forma mais consciente.', problem: 'Tornar a descoberta de produtos e o checkout mais intuitivos.', stack: ['Next.js', 'PostgreSQL', 'Stripe'], role: 'TODO · Exemplo: catálogo, carrinho e integração de pagamentos.', result: 'TODO · Adicione resultados verificáveis e métricas reais.', color: 0x427c65, imageAlt: 'TODO · Screenshot do Verde', todo: true },
  { id: 'pulse', title: 'Pulse', category: 'DADOS & INTERFACES', description: 'Dados complexos, decisões simples. Um painel para acompanhar o que realmente importa.', problem: 'Reunir indicadores dispersos em uma visualização acessível.', stack: ['TypeScript', 'D3.js', 'API REST'], role: 'TODO · Exemplo: visualização de dados e integração com APIs.', result: 'TODO · Adicione resultados verificáveis e métricas reais.', color: 0xc17c45, imageAlt: 'TODO · Screenshot do Pulse', todo: true },
];

export const projectEnglish:Record<string,Partial<Project>>={
 orbit:{category:'PRODUCTIVITY',description:'Less organizing. More doing. A workspace that turns tasks into progress.',problem:'Bring team tasks and priorities together in a clear interface.',role:'TODO · Example: interface design and full-stack development.',result:'TODO · Add verifiable results and real metrics.',imageAlt:'TODO · Orbit screenshot'},
 verde:{category:'E-COMMERCE',description:'A simple shopping experience for more conscious consumption.',problem:'Make product discovery and checkout more intuitive.',role:'TODO · Example: catalog, cart and payment integration.',result:'TODO · Add verifiable results and real metrics.',imageAlt:'TODO · Verde screenshot'},
 pulse:{category:'DATA & INTERFACES',description:'Complex data, simple decisions. A dashboard for tracking what matters.',problem:'Bring scattered indicators together in an accessible visualization.',role:'TODO · Example: data visualization and API integration.',result:'TODO · Add verifiable results and real metrics.',imageAlt:'TODO · Pulse screenshot'},
};
