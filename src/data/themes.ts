import type { ThemeId } from './journey';
export interface Theme{background:number;far:number;mid:number;ground:number;accent:number;enemy:'bug'|'agent'|'boss'|null;mechanic:string;music:number}
export const themes:Record<ThemeId,Theme>={
origin:{background:0x101e2c,far:0x23384b,mid:0x415949,ground:0x849363,accent:0xf3cf71,enemy:null,mechanic:'training',music:440},
contracts:{background:0x10191a,far:0x1c3430,mid:0x375749,ground:0x748562,accent:0xe4c177,enemy:'bug',mechanic:'senses',music:330},
camp:{background:0x151720,far:0x252c36,mid:0x3a433c,ground:0x6e654d,accent:0xe9b570,enemy:null,mechanic:'dialogue',music:294},
ring:{background:0x0d1623,far:0x152b3e,mid:0x294655,ground:0x578795,accent:0x8bd5ed,enemy:'boss',mechanic:'muay-thai',music:220},
ranking:{background:0x0b1c25,far:0x153244,mid:0x295571,ground:0x366955,accent:0x96e3fb,enemy:null,mechanic:'football',music:523},
crew:{background:0x17282c,far:0x254943,mid:0x467362,ground:0x88966c,accent:0xe3d292,enemy:'agent',mechanic:'journey',music:392},
final:{background:0x101312,far:0x252720,mid:0x393c29,ground:0x6b6c49,accent:0xf9d985,enemy:null,mechanic:'briefcase',music:660},
};

export const themeVisuals:Record<ThemeId,{outfit:string;background:number}>={origin:{outfit:"casual",background:4},contracts:{outfit:"hunter",background:1},camp:{outfit:"cowboy",background:2},ring:{outfit:"casual",background:4},ranking:{outfit:"casual",background:4},crew:{outfit:"hunter",background:1},final:{outfit:"matrix",background:0}};
