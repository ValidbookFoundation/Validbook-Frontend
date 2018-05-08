import {
  SHOW_FORM,
  SHOW_FORM_STEPS,
  SHOW_POPUP,
  SHOW_PEOPLE_TAB
} from '../constants/form';

const initialState = {
  activeForm: 'default',
  activeFormSteps: 'step-1',
  visible: false,
  currentImage: '',
  activePeopleTab: 'people',
  activePopUp: '',
};

export default function formsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_FORM: {
      return {
        ...state,
        activeForm: action.formName
      };
    }

    case SHOW_FORM_STEPS: {
      return {
        ...state,
        activeFormSteps: action.formSteps
      };
    }

    case SHOW_POPUP: {
      return {
        ...state,
        visible: action.visible,
        currentImage: action.currentImage,
        activePopUp: action.activePopUp,
        file: action.file
      };
    }

    case SHOW_PEOPLE_TAB: {
      return {
        ...state,
        activePeopleTab: action.peopleTab
      };
    }

    default:
      return state;
  }
}
