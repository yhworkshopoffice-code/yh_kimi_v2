# API Documentation - Option Groups

## Overview

This document describes the API endpoints for managing option groups and options within games.

## Base URL

```
/api/games
```

## Authentication

All API endpoints require authentication via session token or API key.

---

## Endpoints

### 1. Get Game Details

Returns game details including option groups and legacy packages.

**Endpoint:** `GET /api/games/[id]`

**Parameters:**
- `id` (path): Game ID

**Response:**
```json
{
  "id": "game_001",
  "name": "原神",
  "englishName": "Genshin Impact",
  "image": "/games/genshin.jpg",
  "category": "hot",
  "packages": [...], // Legacy format
  "optionGroups": [
    {
      "id": "group_001",
      "label": "儲值方案",
      "order": 0,
      "required": true,
      "selectionMode": "single",
      "minSelections": 1,
      "maxSelections": 1,
      "minTotalQty": 1,
      "maxTotalQty": 10,
      "options": [
        {
          "id": "opt_001",
          "name": "60 原石",
          "price": 30,
          "image": "/options/gem-60.jpg",
          "description": "基礎儲值方案",
          "minQty": 1,
          "maxQty": 99,
          "step": 1
        }
      ]
    }
  ]
}
```

**Status Codes:**
- `200`: Success
- `404`: Game not found
- `500`: Internal server error

---

### 2. List Option Groups

Returns all option groups for a specific game.

**Endpoint:** `GET /api/games/[id]/option-groups`

**Parameters:**
- `id` (path): Game ID

**Response:**
```json
{
  "optionGroups": [
    {
      "id": "group_001",
      "label": "儲值方案",
      "order": 0,
      "required": true,
      "selectionMode": "single",
      "options": [...]
    }
  ]
}
```

---

### 3. Create Option Group

Creates a new option group for a game.

**Endpoint:** `POST /api/games/[id]/option-groups`

**Parameters:**
- `id` (path): Game ID

**Request Body:**
```json
{
  "label": "加購商品",
  "order": 1,
  "required": false,
  "selectionMode": "multi",
  "minSelections": 0,
  "maxSelections": 3,
  "minTotalQty": 0,
  "maxTotalQty": 10
}
```

**Validation Rules:**
- `label`: Required, string
- `selectionMode`: Required, enum["single", "multi"]
- `required`: Optional, boolean, default: true
- `minSelections`: Optional, number, must be ≤ maxSelections
- `maxSelections`: Optional, number, must be 1 if selectionMode is "single"
- `minTotalQty`: Optional, number, must be ≤ maxTotalQty
- `maxTotalQty`: Optional, number

**Response:**
```json
{
  "optionGroup": {
    "id": "group_002",
    "label": "加購商品",
    "order": 1,
    "required": false,
    "selectionMode": "multi",
    "options": []
  }
}
```

**Status Codes:**
- `201`: Created
- `400`: Validation error
- `404`: Game not found
- `500`: Internal server error

---

### 4. Update Option Group

Updates an existing option group.

**Endpoint:** `PUT /api/games/[id]/option-groups/[groupId]`

**Parameters:**
- `id` (path): Game ID
- `groupId` (path): Option Group ID

**Request Body:**
```json
{
  "label": "更新的名稱",
  "required": true,
  "maxSelections": 2
}
```

**Response:**
```json
{
  "optionGroup": {
    "id": "group_001",
    "label": "更新的名稱",
    "required": true,
    "maxSelections": 2,
    "options": [...]
  }
}
```

**Status Codes:**
- `200`: Success
- `400`: Validation error
- `404`: Game or option group not found
- `500`: Internal server error

---

### 5. Delete Option Group

Deletes an option group and all its options.

**Endpoint:** `DELETE /api/games/[id]/option-groups/[groupId]`

**Parameters:**
- `id` (path): Game ID
- `groupId` (path): Option Group ID

**Response:**
```json
{
  "success": true
}
```

**Status Codes:**
- `200`: Success
- `404`: Game or option group not found
- `500`: Internal server error

---

### 6. Create Option

Creates a new option within an option group.

**Endpoint:** `POST /api/games/[id]/options`

**Parameters:**
- `id` (path): Game ID

**Request Body:**
```json
{
  "groupId": "group_001",
  "name": "300 原石",
  "price": 150,
  "image": "/options/gem-300.jpg",
  "description": "進階儲值方案",
  "minQty": 1,
  "maxQty": 50,
  "step": 1
}
```

**Validation Rules:**
- `groupId`: Required, string, must exist
- `name`: Required, string
- `price`: Required, number, must be ≥ 0
- `image`: Optional, string (URL)
- `description`: Optional, string
- `minQty`: Optional, number, default: 0
- `maxQty`: Optional, number, default: 99, must be ≥ minQty
- `step`: Optional, number, default: 1

**Response:**
```json
{
  "option": {
    "id": "opt_002",
    "name": "300 原石",
    "price": 150,
    "image": "/options/gem-300.jpg",
    "description": "進階儲值方案",
    "minQty": 1,
    "maxQty": 50,
    "step": 1
  }
}
```

**Status Codes:**
- `201`: Created
- `400`: Validation error
- `404`: Game or option group not found
- `500`: Internal server error

---

### 7. Update Option

Updates an existing option.

**Endpoint:** `PUT /api/games/[id]/options/[optionId]`

**Parameters:**
- `id` (path): Game ID
- `optionId` (path): Option ID

**Request Body:**
```json
{
  "name": "更新的名稱",
  "price": 200,
  "maxQty": 100
}
```

**Response:**
```json
{
  "option": {
    "id": "opt_002",
    "name": "更新的名稱",
    "price": 200,
    "maxQty": 100
  }
}
```

**Status Codes:**
- `200`: Success
- `400`: Validation error
- `404`: Game or option not found
- `500`: Internal server error

---

### 8. Delete Option

Deletes an option.

**Endpoint:** `DELETE /api/games/[id]/options/[optionId]`

**Parameters:**
- `id` (path): Game ID
- `optionId` (path): Option ID

**Response:**
```json
{
  "success": true
}
```

**Status Codes:**
- `200`: Success
- `404`: Game or option not found
- `500`: Internal server error

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message description"
}
```

Common validation errors:
- `Missing required fields: ...`
- `Single selection mode cannot have maxSelections > 1`
- `minSelections cannot be greater than maxSelections`
- `minTotalQty cannot be greater than maxTotalQty`
- `minQty cannot be greater than maxQty`

---

## Backward Compatibility

The API maintains backward compatibility by:

1. **Preserving `packages` field**: All game responses include the legacy `packages` array
2. **Auto-conversion**: If `optionGroups` is empty, the system automatically converts `packages` to a default option group
3. **Graceful degradation**: Clients that don't support option groups can continue using `packages`

---

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per API key

---

## Changelog

### v1.0.0 (2026-02-04)
- Initial release
- Added option groups support
- Maintained backward compatibility with packages
