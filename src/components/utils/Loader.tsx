import { ImSpinner9 } from "solid-icons/im";
import { Component } from "solid-js";



type Props = {
  size: number;
};

const Loader: Component<Props> = (props) => {
  return (
    <div class="flex-it text-white justify-center items-center h-full">
      <div class="rotating">
        <ImSpinner9 size={props.size} />
      </div>
    </div>
  );
};

export default Loader;
