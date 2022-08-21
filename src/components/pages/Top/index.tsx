import React from "react";
import { useRecoilState } from "recoil";
import { sampleState as _sampleState } from "@frontend/store/atoms";

export type TopProps = {};

export const Top: React.FC<TopProps> = (props) => {
  const [sampleState, setSampleState] = useRecoilState(_sampleState);

  const onClickHandler = () =>
    setSampleState((pre) => ({ count: pre.count + 1 }));

  return (
    <div className="Top">
      <div className="Title">Top Page</div>

      <div className="Counter">
        <div>{sampleState.count}</div>
        <button onClick={onClickHandler}>count up</button>
      </div>
    </div>
  );
};
