import { createStore } from "solid-js/store";
import {
  Form,
  IInputEvent,
  SubmitCallback,
} from "../interfaces/form.types";
import { Accessor } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      validate: Validator[];
    }
  }
}

type Validator =  (elmenet: HTMLInputElement, ...rest: any[]) => string;

const EMPTY_STRING = '';

export const maxLengthValidator: Validator = (element: HTMLInputElement, maxLength = 7) => {
  const msg = `${element.name} should be less then ${maxLength} characters`;
  return element.value.length === 0 || element.value.length < maxLength ? EMPTY_STRING : msg;
}


export const firstUppercaseLetter = (element: HTMLInputElement) => {
  const {value} = element;

  if(value.length === 0) { return EMPTY_STRING};

  return value[0] !== value[0].toLocaleUpperCase() ? `${element.name} first letter should be uppercased` : EMPTY_STRING;
}



const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore(initialForm);
  const [errors, setError] = createStore<Form>();

  const handelInput = (inputEvent: IInputEvent) => {
    const { name, value } = inputEvent.currentTarget;
    setForm(name as any, value as any);
  };

  const submitForm = (submitCallback: SubmitCallback<T>) => () => {
    submitCallback(form);
  };

  const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
    const validators = accessor() || [];
    ref.onblur = checkValidity(ref, validators);
  };


  const checkValidity = (ref: HTMLInputElement, validators: Validator[]) => () => {
    for (const validator of validators) {
      const message = validator(ref);
    
      if(!!message) {
        setError(ref.name, message);
      } else {
        setError(ref.name, EMPTY_STRING);
      }
    }
    console.log(JSON.stringify(errors));
    
  }

  return {
    handelInput,
    submitForm,
    validate
  };
};

export default useForm;
