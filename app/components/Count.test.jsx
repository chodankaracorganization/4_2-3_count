const { render, screen } = require("@testing-library/react");
const { default: Count } = require("./Count");
const { default: userEvent } = require("@testing-library/user-event");

describe("Count component", () => {
  test("renders with default count 0", () => {
    render(<Count />);
    // heading is the <h1> so we can use heading role
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Count: 0");

    // buttons exist
    expect(
      screen.getByRole("button", { name: /increment/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /decrement/i })
    ).toBeInTheDocument();
  });

  test("increments the counter when Increment button is clicked", async () => {
    render(<Count />);
    const user = userEvent.setup();

    const incBtn = screen.getByRole("button", { name: /increment/i });
    const heading = screen.getByRole("heading", { level: 1 });

    await user.click(incBtn);
    expect(heading).toHaveTextContent("Count: 1");

    // multiple clicks
    await user.click(incBtn);
    await user.click(incBtn);
    expect(heading).toHaveTextContent("Count: 3");
  });

  test("decrements the counter when Decrement button is clicked", async () => {
    render(<Count />);
    const user = userEvent.setup();

    const incBtn = screen.getByRole("button", { name: /increment/i });
    const decBtn = screen.getByRole("button", { name: /decrement/i });
    const heading = screen.getByRole("heading", { level: 1 });

    // bump up to 2 first
    await user.click(incBtn);
    await user.click(incBtn);
    expect(heading).toHaveTextContent("Count: 2");

    // decrement once
    await user.click(decBtn);
    expect(heading).toHaveTextContent("Count: 1");

    // decrement again
    await user.click(decBtn);
    expect(heading).toHaveTextContent("Count: 0");
  });

  test("allows negative numbers (edge case) when decremented below zero", async () => {
    render(<Count />);
    const user = userEvent.setup();

    const decBtn = screen.getByRole("button", { name: /decrement/i });
    const heading = screen.getByRole("heading", { level: 1 });

    // click twice to go negative
    await user.click(decBtn);
    await user.click(decBtn);

    expect(heading).toHaveTextContent("Count: -2");
  });

  test("works correctly with a mix of increments and decrements", async () => {
    render(<Count />);
    const user = userEvent.setup();

    const incBtn = screen.getByRole("button", { name: /increment/i });
    const decBtn = screen.getByRole("button", { name: /decrement/i });
    const heading = screen.getByRole("heading", { level: 1 });

    // sequence: +1, +1, -1, +1, -1 => result should be 1
    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(decBtn);
    await user.click(incBtn);
    await user.click(decBtn);

    expect(heading).toHaveTextContent("Count: 1");
  });
});
