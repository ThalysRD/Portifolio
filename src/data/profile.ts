import type { Localized } from '../core/i18n';
export const profile={
 name:'Seu nome',role:'Desenvolvedor Full Stack',tagline:'Ideias viram experiências.',todo:true,
 bio:'TODO · Conte sua história. Sou desenvolvedor, gamer e praticante de Muay Thai. Gosto de conectar código, design e curiosidade para criar experiências úteis e memoráveis.',
 experience:'TODO · Adicione empresas, cargos, períodos e contribuições em ordem cronológica.',education:'TODO · Adicione formação, cursos relevantes e datas.',
 email:'',github:'',linkedin:'',resume:'',
 en:{name:'Your name',role:'Full Stack Developer',tagline:'Ideas become experiences.',bio:'TODO · Tell your story. I am a developer, gamer and Muay Thai practitioner. I connect code, design and curiosity to create useful and memorable experiences.',experience:'TODO · Add companies, roles, dates and contributions in chronological order.',education:'TODO · Add education, relevant courses and dates.'},
 favorites:[
  {title:'The Witcher',icon:'⚔',note:{'pt-BR':'TODO · O que escolhas, consequências e sistemas interligados me ensinaram sobre construir produtos.',en:'TODO · What choices, consequences and interconnected systems taught me about building products.'}},
  {title:'Red Dead Redemption 2',icon:'✧',note:{'pt-BR':'TODO · Como os detalhes e a construção de mundo mudaram meu olhar para a experiência do usuário.',en:'TODO · How detail and worldbuilding changed my perspective on user experience.'}},
  {title:'God of War',icon:'ᛏ',note:{'pt-BR':'TODO · Persistência, evolução e uma experiência sem interrupções.',en:'TODO · Persistence, growth and an uninterrupted experience.'}},
  {title:'Pulp Fiction',icon:'▣',note:{'pt-BR':'TODO · Narrativa não linear e a força de uma boa surpresa.',en:'TODO · Nonlinear storytelling and the power of a good surprise.'}},
  {title:'Senhor dos Anéis',icon:'◉',note:{'pt-BR':'TODO · Uma sociedade de pessoas diferentes que vai mais longe em equipe.',en:'TODO · A fellowship of different people who go further together.'}},
  {title:'Dragon Ball',icon:'✦',note:{'pt-BR':'TODO · Treinar fundamentos e nunca parar de evoluir.',en:'TODO · Train the fundamentals and never stop improving.'}},
  {title:'One Piece',icon:'⚑',note:{'pt-BR':'TODO · Curiosidade, liberdade e confiança na tripulação.',en:'TODO · Curiosity, freedom and trusting the crew.'}},
  {title:'Blue Lock',icon:'◎',note:{'pt-BR':'TODO · Reconhecer minha melhor habilidade e saber quando colocá-la em jogo.',en:'TODO · Recognizing my best skill and knowing when to use it.'}},
  {title:'Tensei Shitara Slime Datta Ken',icon:'◇',note:{'pt-BR':'TODO · Aprender, adaptar e combinar conhecimentos.',en:'TODO · Learn, adapt and combine knowledge.'}},
  {title:'Ficção científica / Sci-fi',icon:'⌁',note:{'pt-BR':'TODO · Imaginar possibilidades e questionar os limites do que existe.',en:'TODO · Imagine possibilities and question the limits of what exists.'}},
  {title:'Muay Thai',icon:'✊',note:{'pt-BR':'Pratico Muay Thai. TODO · Conte como disciplina, respeito e repetição aparecem também no seu trabalho.',en:'I practice Muay Thai. TODO · Explain how discipline, respect and repetition show up in your work.'}},
 ] satisfies {title:string;icon:string;note:Localized}[],
};
