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

type Validator = (elmenet: HTMLInputElement, ...rest: any[]) => string;
type ValidatorConfig = {
  element: HTMLInputElement;
  validators: Validator[];
};


const niceName = (text: string) => {
  const REGEX = /(?=[A-Z])/;
  const words = text.split(REGEX);
  return words
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(" ");
};

const EMPTY_STRING = "";

export const requiredValidator: Validator = (element: HTMLInputElement) => {
  const invalid = element.value.length === 0;
  const name = niceName(element.name);
  const msg = `${name} is required`;
  return invalid ? msg : EMPTY_STRING;
};

export const minLengthValidator: Validator = (
  element: HTMLInputElement,
  minLength = 7
) => {
  const isZero = element.value.length === 0;
  const isBiggerThenMin = element.value.length > minLength;
  const invalid = isZero || isBiggerThenMin;
  const name = niceName(element.name);
  const msg = `${name} should be more then ${minLength} characters`;
  return invalid ? EMPTY_STRING : msg;
};

export const maxLengthValidator: Validator = (
  element: HTMLInputElement,
  maxLength = 7
) => {
  const isZero = element.value.length === 0;
  const isSmallerThenMax = element.value.length < maxLength;
  const invalid = isZero || isSmallerThenMax;
  const name = niceName(element.name);
  const msg = `${name} should be less then ${maxLength} characters`;
  return invalid ? EMPTY_STRING : msg;
};

export const firstUppercaseLetter = (element: HTMLInputElement) => {
  const { value } = element;
  if (value.length === 0) return EMPTY_STRING;
  const invalid = value[0] !== value[0].toLocaleUpperCase();
  const msg = `${niceName(element.name)} first letter should be uppercased`;
  return invalid ? msg : EMPTY_STRING;
};

const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore(initialForm);
  const [errors, setError] = createStore<FormErrors>();

  const validatorFields: {[key:string]: ValidatorConfig} = {};

  const handelInput = (inputEvent: IInputEvent) => {
    const { name, value } = inputEvent.currentTarget;
    setForm(name as any, value as any);
  };

  const submitForm = (submitCallback: SubmitCallback<T>) => () => {
    
    for (const key in validatorFields) {
      const config = validatorFields[key];
      checkValidity(config)();
    }

    submitCallback(form);
  };

  const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
    const validators = accessor() || [];
    let config: ValidatorConfig;

    validatorFields[ref.name] = config = {
      element: ref,
      validators,
    };

    ref.onblur = checkValidity(config);
  };

  const checkValidity =
    ({element, validators}: ValidatorConfig) => () => {
      setError(element.name, []);

      for (const validator of validators) {
        const message = validator(element);

        if (!!message) {
          setError(produce((errors) => errors[element.name].push(message)));
        }
      }
      console.log(JSON.stringify(errors));
    };

  return {
    handelInput,
    submitForm,
    validate,
    errors,
  };
};

export default useForm;
