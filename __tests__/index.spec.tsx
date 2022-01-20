import * as React from "react";
import { render, RenderResult } from "../lib/test-utils";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";
import Album from "../components/Album";

let documentBody: RenderResult;

describe("<TopBar />", () => {
  beforeEach(() => {
    // Arrange
    documentBody = render(<TopBar />);
  });
  it("shows initial text with style", () => {
    // ASSERT
    const logo = documentBody.getByText("FINN");
    const sublogo = documentBody.getByText("Musik");
    const sublogoStyle = window.getComputedStyle(sublogo);
    const button = documentBody.getByRole("button", {
      name: /favorite-list/i,
    });
    expect(logo).toBeInTheDocument();
    expect(sublogo).toBeInTheDocument();
    expect(sublogoStyle.color).toEqual("rgb(255, 152, 0)");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  it("renders button", () => {
    // ASSERT

    const button = documentBody.getByRole("button", {
      name: /favorite-list/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

describe("<SearchBar />", () => {
  beforeEach(() => {
    // Arrange
    documentBody = render(<SearchBar />);
  });
  it("shows initial text", () => {
    // ASSERT
    const input = documentBody.getByText("Search Albums");
    expect(input).toBeInTheDocument();
  });
});

describe("<Album />", () => {
  const mockData = {
    "im:name": { label: "test" },
    "im:image": [{ label: "test", attributes: { height: "100" } }],
    "im:artist": { label: "test" },
    "im:releaseDate": { label: new Date() },
    "im:price": { label: "test" },
    link: { attributes: { href: "test" } },
    id: {
      label: "test",
    },
  };
  beforeEach(() => {
    // Arrange
    documentBody = render(<Album data={mockData} />);
  });

  it("renders all buttons", () => {
    // ASSERT
    const buttons = documentBody.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  })
  
});
