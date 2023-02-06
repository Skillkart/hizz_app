const initialstate = {
  user: false,
  showfeedback: false,
  userdata: [],
  messages: [],
  movieid: 0,
  userdate: [],
  contactlist: [],
  countrylist: [],
  customtemplate: false,
  customlink: '',
  nav: 0,
  initialpath: '',
};

export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: true,
      };
    case 'showfeedback':
      return {
        ...state,
        showfeedback: action.payload,
      };
    case 'userdata':
      return {
        ...state,
        userdata: action.payload,
      };
    case 'messages':
      return {
        ...state,
        messages: action.payload,
      };
    case 'movieid':
      return {
        ...state,
        movieid: action.payload,
      };
    case 'userdata':
      return {
        ...state,
        userdata: action.payload,
      };
    case 'countrylist':
      return {
        ...state,
        countrylist: action.payload,
      };
    case 'contactlist':
      return {
        ...state,
        contactlist: action.payload,
      };
    case 'customtemplate':
      return {
        ...state,
        customtemplate: action.payload,
      };
    case 'customlink':
      return {
        ...state,
        customlink: action.payload,
      };
    case 'initialpath':
      return {
        ...state,
        initialpath: action.payload,
      };

    default:
      return state;
  }
};
