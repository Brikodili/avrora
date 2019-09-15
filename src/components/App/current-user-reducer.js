export default function(state, {type, payload}) {
  switch (type) {
    case 'SET_CURRENT_USER':
      return {...payload};
    case 'CLEAR_CURRENT_USER':
      return undefined;
    default:
      throw new Error();
  }
};
