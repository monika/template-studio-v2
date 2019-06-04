const initialState = {
  markdown: '',
  slateValue: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DOCUMENT_EDITED_SUCCESS':
      return {
        ...state,
        markdown: action.markdown,
        slateValue: action.slateValue,
      };
    case 'CLAUSE_ADDED_SUCCESS':
      return {
        ...state,
        slateValue: action.slateValue,
      };
    default:
      return state;
  }
};

export default reducer;
