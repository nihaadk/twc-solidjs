import { A } from "@solidjs/router";
import { Component, createSignal } from "solid-js";

type ControlInput = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
};

const RegisterScreen: Component = () => {
  const [form, setForm] = createSignal({
    fullName: "",
    nickName: "",
    email: "",
    avatar: "",
    password: "",
    passwordConfirmation: "",
  });

  const inputHandler = (inputEvent: ControlInput, controlName: string) => {
    setForm({
      ...form(),
      [controlName]: inputEvent?.currentTarget?.value,
    });
    console.log(form());
    
  };

  return (
    <div class="flex-it justify-center items-center h-full">
      <div class="text-white text-4xl font-bold">Create Account</div>
      <div class="mt-10 flex-it h-100 xs:w-100 w-full bg-white p-10 rounded-2xl">
        <div class="flex-it">
          <form class="flex-it">
            <div class="flex-it overflow-hidden sm:rounded-md">
              <div class="flex-it">
                <div class="flex-it">
                  <div class="flex-it py-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      onInput={(e) => inputHandler(e, "fullName")}
                      type="text"
                      name="fullName"
                      id="fullName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <div class="flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md">
                      Error Error Beep Beep!
                    </div>
                  </div>

                  <div class="flex-it py-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Nick Name
                    </label>
                    <input
                      onInput={(e) => inputHandler(e, "nickName")}
                      type="text"
                      name="nickName"
                      id="nickName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="flex-it py-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      onInput={(e) => inputHandler(e, "email")}
                      type="text"
                      name="email"
                      id="email"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="flex-it py-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Avatar
                    </label>
                    <input
                      onInput={(e) => inputHandler(e, "avatar")}
                      type="text"
                      name="avatar"
                      id="avatar"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="flex-it py-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      onInput={(e) => inputHandler(e, "password")}
                      type="password"
                      name="password"
                      id="password"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div class="flex-it py-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Password Confirmation
                    </label>
                    <input
                      onInput={(e) => inputHandler(e, "passwordConfirmation")}
                      type="password"
                      name="passwordConfirmation"
                      id="passwordConfirmation"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="text-sm text-gray-600 pb-4">
                Already Registered?{" "}
                <A class="underline" href="/auth/login">
                  Go to Login
                </A>
              </div>
              <div class="flex-it py-2">
                <button
                  type="button"
                  class="
                  bg-blue-400 hover:bg-blue-500 focus:ring-0
                  disabled:cursor-not-allowed disabled:bg-gray-400
                  inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-offset-2"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
