import React from "react";
import axios from "./axios";

jest.mock("./axios");

test("When no bio is passed to it, an Add button is rendered.", () => {
    const onClick = jest.fn();
    const { container } = render(<BioEditior onClick={onClick} />);
});
