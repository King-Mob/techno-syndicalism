import React from "react";

import MyComponent from "../Post";

it("renders without crashing", () => {
  const props = {
    id: 1,
    userId: 1,
    title: "test",
    body: "test"
  };
  shallow(<MyComponent {...props} />);
});
