import React from "react";
import ProfilePic from "./profilepic";
import { render, fireEvent } from "@testing-library/react";

test("render img with src set to url prop", () => {
    const { container } = render(<ProfilePic url="/dog.png" />);

    expect(container.querySelector("img").getAttribute("src")).toBe("/dog.png");
});

test("renders img with src set to /default.jpeg when no url prop is passed", () => {
    const { container } = render(<ProfilePic />);

    expect(container.querySelector("img").getAttribute("src")).toBe(
        "/default.jpg"
    );
});

test("renders first and last props in alt attribute", () => {
    const { container } = render(<ProfilePic first="ivana" last="garg" />);
    expect(container.querySelector("img").getAttribute("alt")).toBe(
        "ivanagarg"
    );
});

test("onClick prop gets called when img is clicked", () => {
    //here i am creating an onClick mock coz i want to test if onClickis invoked when the user clicks on the imgUrl
    //this what mock function exists for ,they exists to give us a way to check if a function is being invoked when we expect it to
    const onClick = jest.fn();
    const { container } = render(<ProfilePic onClick={onClick} />);
    //fire fireEvent
    fireEvent.click(container.querySelector("img"));
    fireEvent.click(container.querySelector("img"));
    fireEvent.click(container.querySelector("img"));

    expect(onClick.mock.calls.length).toBe(3);
});
