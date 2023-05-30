import { createStore } from "solid-js/store";
import {
  Form,
  IInputEvent,
  SubmitCallback,
} from "../interfaces/form.types";

const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore(initialForm);

  const handelInput = (inputEvent: IInputEvent) => {
    const { name, value } = inputEvent.currentTarget;
    setForm(name as any, value as any);
  };

  const submitForm = (submitCallback: SubmitCallback<T>) => () => {
    submitCallback(form);
  };

  return {
    handelInput,
    submitForm,
  };
};

export default useForm;
