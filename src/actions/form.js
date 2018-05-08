import {
  SHOW_FORM,
  SHOW_FORM_STEPS,
  SHOW_POPUP,
  SHOW_PEOPLE_TAB
} from '../constants/form';

export const showActiveForm = (formName) => {
  return {
    type: SHOW_FORM,
    formName
  };
};

export const showActiveFormSteps = (formSteps) => {
  return {
    type: SHOW_FORM_STEPS,
    formSteps
  };
};

export const showPopUp = (visible, currentImage, activePopUp) => {
  return {
    type: SHOW_POPUP,
    visible,
    currentImage,
    activePopUp,
  };
};

export const showActivePeopleTab = (peopleTab) => {
  return {
    type: SHOW_PEOPLE_TAB,
    peopleTab
  };
};
