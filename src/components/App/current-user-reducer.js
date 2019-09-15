export default function(state, {type, payload}) {
  const ROLE_MAPPINGS = {
    provider: 1,
    customer: 2,
  };
  switch (type) {
    case 'SET_CURRENT_USER':
      return {...payload, ...{role: ROLE_MAPPINGS[payload.role]}};
    case 'CLEAR_CURRENT_USER':
      return undefined;
    default:
      throw new Error();
  }
};
