import { createStore, produce } from "solid-js/store";
import {
  Form,
  FormErrors,
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
  const [errors, setError] = createStore<FormErrors>();

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


  const checkValidity = (element: HTMLInputElement, validators: Validator[]) => () => {
    setError(element.name, []);

    for (const validator of validators) {
      const message = validator(element);
    
      if(!!message) {
        setError(produce(errors => errors[element.name].push(message)));
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
