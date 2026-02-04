# Rule Constraints and Validation Behavior

## Overview

This document explains the validation rules and constraints available for option groups and how they interact with each other.

---

## Validation Levels

### 1. Option-Level Validation

Applied to individual options within a group.

#### Min Quantity
- **Default**: 0
- **Purpose**: Minimum quantity customers can select for this option
- **Example**: `minQty: 1` means customers must select at least 1

#### Max Quantity
- **Default**: 99
- **Purpose**: Maximum quantity customers can select for this option
- **Example**: `maxQty: 10` means customers can select up to 10

#### Step
- **Default**: 1
- **Purpose**: Increment/decrement step for quantity adjustment
- **Example**: `step: 5` means quantities go 0, 5, 10, 15...

**Validation Logic:**
```
quantity >= minQty
quantity <= maxQty
quantity % step === 0 (if step > 1)
```

---

### 2. Group-Level Validation

Applied to the entire option group.

#### Required
- **Default**: true
- **Purpose**: Whether customers must select from this group
- **Behavior**: 
  - If `true`: At least one option must be selected
  - If `false`: Group can be skipped

#### Selection Mode
- **Values**: "single" | "multi"
- **Purpose**: Controls how many options can be selected

**Single Mode:**
- Only one option can have quantity > 0
- Selecting a new option automatically deselects others
- maxSelections is forced to 1

**Multi Mode:**
- Multiple options can have quantity > 0
- Each option is independent

#### Min Selections
- **Default**: undefined (no minimum)
- **Purpose**: Minimum number of different options to select
- **Applies to**: Multi mode only
- **Example**: `minSelections: 2` means select at least 2 different options

#### Max Selections
- **Default**: undefined (no maximum)
- **Purpose**: Maximum number of different options to select
- **Applies to**: Multi mode only
- **Constraint**: Must be 1 if selectionMode is "single"
- **Example**: `maxSelections: 3` means select up to 3 different options

#### Min Total Quantity
- **Default**: undefined (no minimum)
- **Purpose**: Minimum sum of quantities across all selected options
- **Example**: `minTotalQty: 5` means total items must be ≥ 5

#### Max Total Quantity
- **Default**: undefined (no maximum)
- **Purpose**: Maximum sum of quantities across all selected options
- **Example**: `maxTotalQty: 20` means total items must be ≤ 20

---

## Validation Flow

### Step 1: Option-Level Check
```
For each selected option:
  1. Check quantity >= option.minQty
  2. Check quantity <= option.maxQty
  3. Check quantity is valid step
```

### Step 2: Group-Level Check
```
For each group:
  1. Check required constraint
  2. Check selection mode constraints
  3. Check minSelections/maxSelections
  4. Check minTotalQty/maxTotalQty
```

### Step 3: Cross-Group Check
```
Check if any group constraints conflict with others
(Performed in admin interface only)
```

---

## Rule Interaction Matrix

| Rule Combination | Valid? | Notes |
|-----------------|--------|-------|
| single + maxSelections > 1 | ❌ | Single mode forces maxSelections = 1 |
| minSelections > maxSelections | ❌ | Impossible to satisfy |
| minTotalQty > maxTotalQty | ❌ | Impossible to satisfy |
| required + minSelections = 0 | ⚠️ | Redundant but valid |
| single + minSelections > 1 | ❌ | Impossible in single mode |
| multi + minSelections = 1 | ✅ | Must select at least 1 |
| multi + maxSelections = 1 | ⚠️ | Effectively single mode |

---

## Common Validation Scenarios

### Scenario 1: Simple Single Selection
```javascript
{
  required: true,
  selectionMode: "single",
  // maxSelections automatically = 1
}
```
**Behavior**: Customer must select exactly one option

### Scenario 2: Optional Multiple Selection
```javascript
{
  required: false,
  selectionMode: "multi",
  maxSelections: 3
}
```
**Behavior**: Customer can select 0-3 different options

### Scenario 3: Required Bundle
```javascript
{
  required: true,
  selectionMode: "multi",
  minSelections: 2,
  maxSelections: 4,
  minTotalQty: 3,
  maxTotalQty: 10
}
```
**Behavior**: 
- Must select 2-4 different options
- Total quantity must be 3-10

### Scenario 4: Quantity-Limited Single Selection
```javascript
{
  required: true,
  selectionMode: "single",
  minTotalQty: 5,
  maxTotalQty: 20
}
```
**Behavior**: 
- Must select one option
- Quantity for that option must be 5-20

---

## Error Messages

### Option-Level Errors
- `"Quantity cannot be less than {minQty}"`
- `"Quantity cannot exceed {maxQty}"`
- `"Quantity must be in steps of {step}"`

### Group-Level Errors
- `"{groupLabel} is required"`
- `"{groupLabel}: Select at least {minSelections} options"`
- `"{groupLabel}: Select at most {maxSelections} options"`
- `"{groupLabel}: Total quantity must be at least {minTotalQty}"`
- `"{groupLabel}: Total quantity cannot exceed {maxTotalQty}"`

### Configuration Errors (Admin)
- `"Single selection mode cannot have maxSelections > 1"`
- `"minSelections cannot be greater than maxSelections"`
- `"minTotalQty cannot be greater than maxTotalQty"`
- `"Configuration error: minTotalQty exceeds sum of all maxQty"`

---

## Validation Timing

### Real-Time Validation
- Option quantity changes
- Selection/deselection
- Tab switching

### On Submit Validation
- Next button click
- Form submission
- API calls

### Admin Validation
- Form field changes (with debounce)
- Save button click
- Rule preview updates

---

## Best Practices

### 1. Avoid Impossible Configurations
```javascript
// ❌ Bad
{
  minSelections: 3,
  maxSelections: 2  // Impossible!
}

// ✅ Good
{
  minSelections: 1,
  maxSelections: 3
}
```

### 2. Consider Option maxQty When Setting Group Limits
```javascript
// ❌ Bad
{
  options: [
    { maxQty: 5 },
    { maxQty: 5 }
  ],
  minTotalQty: 15  // Impossible: max possible is 10
}

// ✅ Good
{
  options: [
    { maxQty: 10 },
    { maxQty: 10 }
  ],
  minTotalQty: 5,
  maxTotalQty: 15
}
```

### 3. Use Appropriate Defaults
```javascript
// For optional add-ons
{
  required: false,
  selectionMode: "multi",
  maxSelections: 5
}

// For required base selection
{
  required: true,
  selectionMode: "single"
}
```

---

## Testing Validation

### Unit Test Examples
```typescript
describe("Validation", () => {
  it("should fail when required group has no selection", () => {
    const result = validateGroup(requiredGroup, {});
    expect(result.isValid).toBe(false);
  });

  it("should pass when all constraints are satisfied", () => {
    const result = validateGroup(group, { opt1: 2, opt2: 3 });
    expect(result.isValid).toBe(true);
  });
});
```

### Manual Testing Checklist
- [ ] Test minimum boundaries
- [ ] Test maximum boundaries
- [ ] Test exact boundary values
- [ ] Test zero values
- [ ] Test negative values (should be rejected)
- [ ] Test step increments
- [ ] Test multiple simultaneous constraints

---

## Performance Considerations

Validation is performed:
- **Client-side**: On every quantity change (debounced 100ms)
- **Server-side**: On API requests
- **Admin**: On form changes (debounced 300ms)

Complex validation (checking sum of maxQty) is only performed in admin interface to prevent impossible configurations.
