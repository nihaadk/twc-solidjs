import { Component, For, ParentComponent, Show } from "solid-js";

export const ErrorMessage: ParentComponent = (props) => {
  const errors = () => (props.children as string[]) || [];

  return (
    <Show when={errors().length > 0}>
      <div class="flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md">
        <For each={errors()}>{(error) => <div>{error}</div>}</For>
      </div>
    </Show>
  );
};
