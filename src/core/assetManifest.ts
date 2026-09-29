export const assetManifest={
 frameSize:64,
 outfitsAtlas:'assets/art/player-poses.png',
 matrixIdle:'assets/art/matrix-idle-v4.png',
 matrixWalk:'assets/art/matrix-walk-keys-v5.png',
 matrixWalkBetween:'assets/art/matrix-walk-between-v5.png',
 matrixGesture:'assets/art/matrix-gesture-v4.png',
 environmentsAtlas:'assets/art/environments.png',
 campus:'assets/art/ifrn-campus.png',
 animations:['idle','walk','run','jump','fall','jab','kick','knee','elbow','block','dodge','hurt','defeat','digitize_in','digitize_out'] as const,
 player:'assets/sprites/player/player.json',agent:'assets/sprites/agent/agent.json',bug:'assets/sprites/bug/bug.json',boss:'assets/sprites/boss/boss.json',npc:'assets/sprites/npc-sage/npc-sage.json',
};
