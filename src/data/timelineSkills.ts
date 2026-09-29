import type {Copy} from './timeline';

interface SkillGroup {title:Copy;context:Copy;items:string[];}
const c=(pt:string,en:string):Copy=>({pt,en});
const group=(title:Copy,context:Copy,items:string[]):SkillGroup=>({title,context,items});

// Groups describe their evidence and context, rather than assigning proficiency scores.
export const timelineSkills:Record<string,SkillGroup[]>={
  trybe:[
    group(c('Fundamentos e ferramentas','Foundations and tools'),c('Formação · Fundamentos do Desenvolvimento Web','Training · Web Development Fundamentals'),['HTML','CSS','JavaScript','DOM','Unix / Bash','Git','Internet','Testes unitários / Unit testing']),
    group(c('Interfaces com React','Interfaces with React'),c('Formação · Desenvolvimento Front-End','Training · Front-End Development'),['React','Componentes / Components','Estado e eventos / State and events','React Router','React Hooks','Context API','Redux','React Testing Library']),
    group(c('Backend, dados e qualidade','Backend, data and quality'),c('Formação · Desenvolvimento Back-End','Training · Back-End Development'),['Node.js','Express','TypeScript','SQL','MongoDB','APIs REST','JWT','ORM / ODM','Docker','Mocha','Chai','Sinon','POO / OOP','SOLID','APIs em camadas / Layered APIs','CI/CD · GitHub Actions']),
    group(c('Ciência da Computação','Computer Science'),c('Formação · Lógica e resolução de problemas','Training · Logic and problem solving'),['Python','POO / OOP','Algoritmos / Algorithms','Complexidade / Complexity','Estruturas de dados / Data structures'])
  ],
  ifrn:[
    group(c('Base acadêmica','Academic foundations'),c('Disciplinas cursadas na graduação','Completed undergraduate coursework'),['Desenvolvimento web / Web development','Banco de dados / Databases','POO / OOP','Estruturas de dados / Data structures','Redes / Networks','Linux','Análise de sistemas / Systems analysis']),
    group(c('Formação complementar','Additional training'),c('Cursos certificados: Git (40 h) e Java (60 h)','Certified courses: Git (40 h) and Java (60 h)'),['Git','Java']),
    group(c('Conhecimentos em desenvolvimento','Learning in progress'),c('Disciplinas em andamento na graduação','Current undergraduate coursework'),['Sistemas distribuídos / Distributed systems','Mobile','IoT','Testes de software / Software testing','Segurança de dados / Data security'])
  ],
  embarcatech:[
    group(c('Integração entre software e hardware','Software and hardware integration'),c('Aplicação no projeto · Minha contribuição em firmware e API','Project application · My firmware and API contribution'),['ESP32','RFID','Firmware','Comunicação serial / Serial communication','API','PostgreSQL']),
    group(c('Confiabilidade em campo','Reliability in the field'),c('Aplicação no projeto · Operação com conectividade limitada','Project application · Operating with limited connectivity'),['Armazenamento local / Local storage','Persistência de dados / Data persistence','Sincronização / Synchronization','Tratamento de falhas / Failure handling']),
    group(c('Desenvolvimento em equipe','Team development'),c('Formação na residência e experiência no projeto coletivo','Residency training and team project experience'),['Gestão ágil / Agile management','Sistemas embarcados / Embedded systems','Eletrônica / Electronics','Sistemas digitais / Digital systems'])
  ],
  projects:[
    group(c('Desenvolvimento Full Stack','Full Stack development'),c('Projeto didático em equipe · Stack do E-Play','Educational team project · E-Play stack'),['Next.js','React','Node.js','PostgreSQL','Docker','Jest']),
    group(c('Funcionalidades que ajudei a construir','Features I helped build'),c('Minha contribuição · Integração entre interface, API e banco','My contribution · Connecting interface, API and database'),['Autenticação / Authentication','Sessões / Sessions','Ativação de conta / Account activation','Recuperação de senha / Password recovery','Anúncios e busca / Listings and search','Carrinho e compra / Cart and checkout'])
  ],
  'ze-resolve':[
    group(c('Interface mobile','Mobile interface'),c('Minha contribuição já implementada · Telas de autenticação','My implemented contribution · Authentication screens'),['Flutter','Dart']),
    group(c('Integração do MVP','MVP integration'),c('Projeto em andamento · Stack e conceitos do trabalho em equipe','Work in progress · Team project stack and concepts'),['FastAPI','PostgreSQL','Mobile','Comunicação entre componentes / Component communication','Sistemas distribuídos / Distributed systems'])
  ],
  today:[
    group(c('Desenvolvimento web','Web development'),c('Base construída na formação e nos projetos','Foundations built through training and projects'),['JavaScript','TypeScript','React','Next.js','Node.js','Express','HTML','CSS','APIs REST']),
    group(c('Dados, ferramentas e qualidade','Data, tools and quality'),c('Tecnologias estudadas ou utilizadas ao longo da trajetória','Technologies studied or used throughout my journey'),['SQL','PostgreSQL','MongoDB','Docker','Git / GitHub','Linux','Jest','React Testing Library','Python','Java'])
  ]
};

// Bilingual technical labels keep the stored list compact while displaying one language.
export const skillLabel=(item:string,lang:'pt'|'en')=>{
  const parts=item.split(' / ');
  return parts.length===2 && !['Unix / Bash','ORM / ODM','Git / GitHub'].includes(item)
    ?parts[lang==='pt'?0:1]:item;
};
