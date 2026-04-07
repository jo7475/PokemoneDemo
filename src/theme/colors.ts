export const TYPE_COLORS: Record<string, string> = {
  normal: '#605F41',
  fire: '#AB480B',
  water: '#285CC4',
  electric: '#B09110',
  grass: '#448B1A',
  ice: '#439C98',
  fighting: '#8A1A14',
  poison: '#732371',
  ground: '#AA8831',
  flying: '#6D51D1',
  psychic: '#C5265B',
  bug: '#707F10',
  rock: '#817020',
  ghost: '#503C6B',
  dragon: '#4F18E2',
  dark: '#47362B',
  steel: '#767694',
  fairy: '#AA5180',
};

export const TYPE_BACKGROUND_COLORS: Record<string, string> = {
  normal: '#DCDCC8',
  fire: '#F9D0B0',
  water: '#C0D5F5',
  electric: '#FCE48A',
  grass: '#BBE0B4',
  ice: '#CAECEB',
  fighting: '#EABFB9',
  poison: '#E2BBE1',
  ground: '#EEDDA9',
  flying: '#CEC3EE',
  psychic: '#F5BDD0',
  bug: '#E0E8A8',
  rock: '#E1D6AF',
  ghost: '#CCC2DF',
  dragon: '#C8BEF7',
  dark: '#CCC3BD',
  steel: '#D8D8E2',
  fairy: '#EEBFD8',
};

export const getTypeColor = (type: string) => {
  return TYPE_COLORS[type.toLowerCase()] || '#A8A77A'; 
};

export const getBackgroundColor = (type: string) => {
  return TYPE_BACKGROUND_COLORS[type.toLowerCase()] || '#F5F5F5'; 
};
