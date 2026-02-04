/**
 * Component Tests for OptionCard and QuantityAdjuster
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "@jest/globals";
import { OptionCard } from "@/components/storefront/OptionCard";
import { QuantityAdjuster } from "@/components/storefront/QuantityAdjuster";
import { Option } from "@/lib/types";

describe("QuantityAdjuster", () => {
  it("renders with initial value", () => {
    render(
      <QuantityAdjuster
        value={5}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("increments value when + button clicked", () => {
    const onChange = vi.fn();
    render(
      <QuantityAdjuster
        value={5}
        onChange={onChange}
      />
    );
    
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]); // + button
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("decrements value when - button clicked", () => {
    const onChange = vi.fn();
    render(
      <QuantityAdjuster
        value={5}
        onChange={onChange}
      />
    );
    
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // - button
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("respects min boundary", () => {
    const onChange = vi.fn();
    render(
      <QuantityAdjuster
        value={0}
        min={0}
        onChange={onChange}
      />
    );
    
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // - button
    expect(onChange).not.toHaveBeenCalled();
  });

  it("respects max boundary", () => {
    const onChange = vi.fn();
    render(
      <QuantityAdjuster
        value={10}
        max={10}
        onChange={onChange}
      />
    );
    
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]); // + button
    expect(onChange).not.toHaveBeenCalled();
  });

  it("respects step value", () => {
    const onChange = vi.fn();
    render(
      <QuantityAdjuster
        value={5}
        step={5}
        onChange={onChange}
      />
    );
    
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]); // + button
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("disables buttons when disabled prop is true", () => {
    render(
      <QuantityAdjuster
        value={5}
        disabled={true}
        onChange={vi.fn()}
      />
    );
    
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
});

describe("OptionCard", () => {
  const mockOption: Option = {
    id: "test-opt",
    name: "測試選項",
    price: 100,
    image: "/test-image.jpg",
    description: "測試描述",
    minQty: 1,
    maxQty: 10,
  };

  it("renders option details correctly", () => {
    render(
      <OptionCard
        option={mockOption}
        quantity={0}
        onQuantityChange={vi.fn()}
      />
    );
    
    expect(screen.getByText("測試選項")).toBeInTheDocument();
    expect(screen.getByText("測試描述")).toBeInTheDocument();
    expect(screen.getByText("NT$ 100")).toBeInTheDocument();
  });

  it("shows selected state when quantity > 0", () => {
    render(
      <OptionCard
        option={mockOption}
        quantity={3}
        onQuantityChange={vi.fn()}
      />
    );
    
    expect(screen.getByText("x3")).toBeInTheDocument();
  });

  it("calls onQuantityChange when quantity adjusted", () => {
    const onQuantityChange = vi.fn();
    render(
      <OptionCard
        option={mockOption}
        quantity={1}
        onQuantityChange={onQuantityChange}
      />
    );
    
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]); // + button
    expect(onQuantityChange).toHaveBeenCalledWith(2);
  });

  it("disables interaction when disabled", () => {
    const onQuantityChange = vi.fn();
    render(
      <OptionCard
        option={mockOption}
        quantity={1}
        onQuantityChange={onQuantityChange}
        disabled={true}
      />
    );
    
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it("shows fallback image when no image provided", () => {
    const optionWithoutImage = { ...mockOption, image: undefined };
    render(
      <OptionCard
        option={optionWithoutImage}
        quantity={0}
        onQuantityChange={vi.fn()}
      />
    );
    
    // Should show Package icon
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
