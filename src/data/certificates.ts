export interface Certificate {file:string;pt:string;en:string;redacted?:boolean}
export const certificates:Record<string,Certificate[]>={
trybe:[
{file:'trybe-web',pt:'Formação em Desenvolvimento Web · cerca de 1.500 h',en:'Web Development training · about 1,500 h'},
{file:'trybe-fundamentos',pt:'Módulo 1 · Fundamentos do Desenvolvimento Web',en:'Module 1 · Web Development Fundamentals'},
{file:'trybe-frontend',pt:'Módulo 2 · Desenvolvimento Front-End',en:'Module 2 · Front-End Development'},
{file:'trybe-backend',pt:'Módulo 3 · Desenvolvimento Back-End',en:'Module 3 · Back-End Development'},
{file:'trybe-computacao',pt:'Módulo 4 · Ciência da Computação',en:'Module 4 · Computer Science'}],
ifrn:[{file:'git-40h',pt:'Versionamento com Git · 40 h · 2025',en:'Version control with Git · 40 h · 2025',redacted:true},{file:'java-60h',pt:'Introdução à Programação em Java · 60 h · 2026',en:'Introduction to Java Programming · 60 h · 2026',redacted:true}],
embarcatech:[{file:'residencia-1040h',pt:'Declaração da residência · 1.040 h · abr. 2025 a abr. 2026',en:'Residency statement · 1,040 h · Apr 2025 to Apr 2026',redacted:true},{file:'sistemas-embarcados-160h',pt:'FIC em Sistemas Embarcados · 160 h · 2024–2025',en:'Embedded Systems course · 160 h · 2024–2025',redacted:true},{file:'fic-residencia-240h',pt:'FIC em Residência Tecnológica · 240 h · 2025–2026',en:'Technological Residency course · 240 h · 2025–2026',redacted:true}],
publication:[{file:'publicacao-artigo',pt:'Certificado de publicação · Revista FT · 30/04/2026',en:'Publication certificate · Revista FT · 30 Apr 2026'}],
secitex:[{file:'secitex-2025',pt:'VII SECITEX · Participação · 24 h · outubro de 2025',en:'VII SECITEX · Participation · 24 h · October 2025'}]
};
