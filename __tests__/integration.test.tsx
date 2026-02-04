/**
 * Integration Tests for OrderWizard Step 1
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "@jest/globals";
import { Step1OptionSelection } from "@/components/storefront/modals/Step1OptionSelection";
import { Game, OptionGroup } from "@/lib/types";

// 測試資料
const mockGame: Game = {
  id: "test-game",
  name: "測試遊戲",
  englishName: "Test Game",
  image: "/test.jpg",
  category: "hot",
  packages: [],
  optionGroups: [
    {
      id: "group-1",
      label: "方案 A",
      order: 0,
      required: true,
      selectionMode: "single",
      options: [
        { id: "opt-1", name: "選項 1", price: 100 },
        { id: "opt-2", name: "選項 2", price: 200 },
      ],
    },
    {
      id: "group-2",
      label: "方案 B",
      order: 1,
      required: false,
      selectionMode: "multi",
      options: [
        { id: "opt-3", name: "選項 3", price: 50 },
        { id: "opt-4", name: "選項 4", price: 75 },
      ],
    },
  ],
};

describe("Step1OptionSelection Integration", () => {
  it("renders option groups as tabs", () => {
    render(
      <Step1OptionSelection
        game={mockGame}
        onNext={vi.fn()}
      />
    );
    
    expect(screen.getByText("方案 A")).toBeInTheDocument();
    expect(screen.getByText("方案 B")).toBeInTheDocument();
  });

  it("switches between tabs", () => {
    render(
      <Step1OptionSelection
        game={mockGame}
        onNext={vi.fn()}
      />
    );
    
    // Initially shows group 1 options
    expect(screen.getByText("選項 1")).toBeInTheDocument();
    
    // Click on second tab
    fireEvent.click(screen.getByText("方案 B"));
    
    // Should show group 2 options
    expect(screen.getByText("選項 3")).toBeInTheDocument();
  });

  it("disables next button when required group not selected", () => {
    render(
      <Step1OptionSelection
        game={mockGame}
        onNext={vi.fn()}
      />
    );
    
    const nextButton = screen.getByText("下一步");
    expect(nextButton).toBeDisabled();
  });

  it("enables next button when required group is selected", async () => {
    render(
      <Step1OptionSelection
        game={mockGame}
        onNext={vi.fn()}
      />
    );
    
    // Select an option from required group
    const buttons = screen.getAllByRole("button");
    // Find and click the + button for first option
    const plusButton = buttons.find((btn) => 
      btn.querySelector("svg")?.getAttribute("data-icon") === "plus"
    );
    
    if (plusButton) {
      fireEvent.click(plusButton);
    }
    
    await waitFor(() => {
      const nextButton = screen.getByText("下一步");
      expect(nextButton).not.toBeDisabled();
    });
  });

  it("shows validation errors for incomplete selection", async () => {
    const gameWithConstraints: Game = {
      ...mockGame,
      optionGroups: [
        {
          ...mockGame.optionGroups![0],
          minSelections: 2,
        },
      ],
    };
    
    render(
      <Step1OptionSelection
        game={gameWithConstraints}
        onNext={vi.fn()}
      />
    );
    
    // Select only one option
    const buttons = screen.getAllByRole("button");
    const plusButton = buttons.find((btn) => 
      btn.querySelector("svg")?.getAttribute("data-icon") === "plus"
    );
    
    if (plusButton) {
      fireEvent.click(plusButton);
    }
    
    await waitFor(() => {
      expect(screen.getByText(/至少需要選擇 2 個選項/)).toBeInTheDocument();
    });
  });

  it("calculates total price correctly", async () => {
    render(
      <Step1OptionSelection
        game={mockGame}
        onNext={vi.fn()}
      />
    );
    
    // Select options
    const buttons = screen.getAllByRole("button");
    const plusButtons = buttons.filter((btn) => 
      btn.querySelector("svg")?.getAttribute("data-icon") === "plus"
    );
    
    if (plusButtons.length >= 2) {
      fireEvent.click(plusButtons[0]);
      fireEvent.click(plusButtons[1]);
    }
    
    await waitFor(() => {
      expect(screen.getByText(/總計/)).toBeInTheDocument();
    });
  });

  it("calls onNext when validation passes", async () => {
    const onNext = vi.fn();
    render(
      <Step1OptionSelection
        game={mockGame}
        onNext={onNext}
      />
    );
    
    // Select required option
    const buttons = screen.getAllByRole("button");
    const plusButton = buttons.find((btn) => 
      btn.querySelector("svg")?.getAttribute("data-icon") === "plus"
    );
    
    if (plusButton) {
      fireEvent.click(plusButton);
    }
    
    await waitFor(() => {
      const nextButton = screen.getByText("下一步");
      expect(nextButton).not.toBeDisabled();
    });
    
    fireEvent.click(screen.getByText("下一步"));
    expect(onNext).toHaveBeenCalled();
  });
});
