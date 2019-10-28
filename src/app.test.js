//__test__ to keep test in one place
import React from "react";
import { App } from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

//automatic mock ,telling jest to mock get and post request
//no server request
jest.mock("./axios");

test("App shows nothing at first", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "upasana",
            last: "garg",
            url: "pup.jpg"
        }
    });

    const { container } = render(<App />);
    //this is how we check if nothing has been rendered
    // expect(container.children.length).toBe();

    // await waitForElement(() => container.querySelector("div"));
    expect(container.children.length).toBe(1);
});
