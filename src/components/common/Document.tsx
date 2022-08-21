import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutingContent } from "@frontend/components/common/Routing";

export type DocumentProps = {
  children?: React.ReactElement;
};
export const Document: React.FC<DocumentProps> = () => {
  return (
    <Router>
      <RecoilRoot>
        <RoutingContent />
      </RecoilRoot>
    </Router>
  );
};
