# Admin User Guide - Option Group Configuration

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Creating Option Groups](#creating-option-groups)
4. [Managing Options](#managing-options)
5. [Understanding Rules](#understanding-rules)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Option groups allow you to organize product options into categories, making it easier for customers to select the right combination of items. Each game can have multiple option groups, and each group can contain multiple options.

### Key Concepts

- **Option Group**: A category of related options (e.g., "Recharge Plans", "Add-ons")
- **Option**: An individual item within a group (e.g., "60 Gems", "300 Gems")
- **Rules**: Constraints that control how customers can select options

---

## Getting Started

### Accessing the Admin Interface

1. Log in to the admin panel at `/admin`
2. Navigate to **Products** → **Product List**
3. Find the game you want to configure
4. Click **Manage Option Groups**

### Interface Overview

The option groups management page shows:
- List of existing option groups
- Options within each group (expandable)
- Quick actions (edit, delete, reorder)

---

## Creating Option Groups

### Step 1: Add a New Group

1. Click the **+ Add Group** button
2. Fill in the group details:
   - **Name**: Display name for the category (e.g., "Recharge Plans")
   - **Order**: Display order (0 = first)
   - **Required**: Whether customers must select from this group
   - **Selection Mode**: Single or Multiple

### Step 2: Configure Rules

#### Selection Mode

- **Single**: Customers can only select one option from this group
  - Example: Choose one recharge plan
  - Automatically deselects other options when one is selected

- **Multiple**: Customers can select multiple options
  - Example: Choose multiple add-ons
  - Each option can have its own quantity

#### Optional Rules

- **Min Selections**: Minimum number of different options customers must select
  - Example: "Choose at least 2 add-ons"
  
- **Max Selections**: Maximum number of different options customers can select
  - Example: "Choose up to 3 add-ons"
  
- **Min Total Quantity**: Minimum total items across all selected options
  - Example: "Total quantity must be at least 5"
  
- **Max Total Quantity**: Maximum total items across all selected options
  - Example: "Total quantity cannot exceed 20"

### Step 3: Save the Group

Click **Save** to create the group. You'll see a preview of the rules on the right side.

---

## Managing Options

### Adding Options

1. Expand the option group by clicking on it
2. Click **+ Add Option**
3. Fill in option details:
   - **Name**: Display name (e.g., "60 Gems")
   - **Price**: Price in TWD
   - **Image URL**: URL to option image (optional)
   - **Description**: Additional information (optional)
   - **Min Quantity**: Minimum quantity per option (default: 0)
   - **Max Quantity**: Maximum quantity per option (default: 99)
   - **Step**: Quantity increment step (default: 1)

### Editing Options

1. Find the option in the group
2. Click the **Edit** icon (pencil)
3. Modify the details
4. Click **Save**

### Deleting Options

1. Find the option in the group
2. Click the **Delete** icon (trash)
3. Confirm the deletion

⚠️ **Warning**: Deleting an option will remove it from the storefront immediately.

---

## Understanding Rules

### Rule Combinations

Here are common use cases and their rule configurations:

#### Use Case 1: Single Required Selection
```
Required: Yes
Selection Mode: Single
```
Customer must select exactly one option.

#### Use Case 2: Optional Multiple Selection
```
Required: No
Selection Mode: Multiple
Max Selections: 3
```
Customer can select 0-3 different options.

#### Use Case 3: Required with Quantity Limits
```
Required: Yes
Selection Mode: Multiple
Min Total Quantity: 5
Max Total Quantity: 20
```
Customer must select options totaling 5-20 items.

#### Use Case 4: Complex Bundle
```
Required: Yes
Selection Mode: Multiple
Min Selections: 2
Max Selections: 4
Min Total Quantity: 3
Max Total Quantity: 10
```
Customer must select 2-4 different options, with total quantity between 3-10.

### Validation Preview

The admin interface shows a live preview of your rules as you configure them. This helps you understand how the rules will work before saving.

---

## Best Practices

### 1. Group Organization

- **Keep it simple**: Don't create too many groups (3-5 is ideal)
- **Logical grouping**: Group related options together
- **Clear naming**: Use descriptive names customers will understand

### 2. Pricing Strategy

- **Tiered pricing**: Offer better value for larger quantities
- **Bundle discounts**: Use multiple selection groups for bundles

### 3. User Experience

- **Required vs Optional**: Only mark truly necessary groups as required
- **Reasonable limits**: Don't set max quantities too low
- **Clear descriptions**: Help customers understand what they're buying

### 4. Testing

Always test your configuration:
1. Save the group
2. Visit the storefront
3. Try different selection combinations
4. Verify the total price calculation

---

## Troubleshooting

### Common Issues

#### Issue: "Configuration Error" appears on storefront

**Cause**: Rule configuration is impossible to satisfy

**Solution**:
- Check that minSelections ≤ maxSelections
- Check that minTotalQty ≤ maxTotalQty
- Check that minTotalQty is achievable with available options

#### Issue: Customers can't proceed to next step

**Cause**: Required group not satisfied

**Solution**:
- Check if the group should really be required
- Verify minSelections is set correctly
- Test the selection flow yourself

#### Issue: Options not appearing

**Cause**: Group or options not saved properly

**Solution**:
- Refresh the admin page
- Check if options were added to the correct group
- Verify the game ID in the URL

### Getting Help

If you encounter issues not covered here:
1. Check the browser console for errors
2. Review the [API Documentation](./API.md)
3. Contact technical support

---

## Quick Reference

### Keyboard Shortcuts

- `Ctrl + S`: Save current form
- `Esc`: Close modal/dialog
- `Tab`: Navigate between fields

### Icons Reference

- ✏️ Edit
- 🗑️ Delete
- ➕ Add
- 👁️ Preview
- 📦 Option Group
- 🎁 Option

---

## Changelog

### Version 1.0 (2026-02-04)
- Initial release
- Option groups management
- Rule configuration
- Validation preview
