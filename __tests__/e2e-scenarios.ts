/**
 * E2E Test Scenarios for Option Groups Feature
 * 
 * 這些測試需要在真實瀏覽器環境中執行（使用 Playwright 或 Cypress）
 */

export const e2eTestScenarios = `
# E2E 測試情境

## 情境 1: 基本下單流程

### 前置條件
- 使用者已登入
- 購物車中有商品

### 測試步驟
1. 訪問商店頁面
2. 點擊商品卡片
3. 在 OrderWizard Step 1:
   - 確認 Tabs 顯示正確
   - 選擇第一個類別的選項
   - 調整數量
   - 點擊下一步
4. 完成 Step 2-4
5. 確認訂單提交成功

### 預期結果
- 訂單成功建立
- 資料正確無誤

---

## 情境 2: 多類別選擇

### 測試步驟
1. 選擇有兩個類別的商品
2. 在第一個類別選擇 1 個選項
3. 切換到第二個類別
4. 選擇 2 個選項
5. 確認總價計算正確

### 預期結果
- 兩個類別的選項都被記錄
- 總價 = (選項1 × 數量) + (選項2 × 數量) + (選項3 × 數量)

---

## 情境 3: 驗證錯誤處理

### 測試步驟
1. 選擇必選類別商品
2. 不選擇任何選項
3. 嘗試點擊下一步

### 預期結果
- 顯示驗證錯誤訊息
- 下一步按鈕禁用
- 提示哪個類別需要選擇

---

## 情境 4: Admin 管理流程

### 前置條件
- 管理員已登入

### 測試步驟
1. 訪問 /admin/products
2. 點擊「管理選項類別」
3. 新增類別:
   - 輸入名稱
   - 設定規則
   - 儲存
4. 在類別下新增選項:
   - 輸入名稱、價格
   - 上傳圖片
   - 儲存
5. 在前台確認新選項顯示

### 預期結果
- 類別和選項成功建立
- 前台立即顯示新選項

---

## 情境 5: 行動裝置響應式

### 測試步驟
1. 使用手機版瀏覽器
2. 訪問商店頁面
3. 點擊商品
4. 確認:
   - Tabs 可水平捲動
   - 選項卡片可正常顯示
   - 數量調整按鈕可點擊

### 預期結果
- 所有功能在手機上正常運作
- 無水平捲動條問題

---

## 情境 6: 效能測試

### 測試步驟
1. 建立包含 50+ 選項的商品
2. 測量頁面載入時間
3. 測量選項切換時間
4. 測量數量調整反應時間

### 預期結果
- 頁面載入 < 3 秒
- 選項切換 < 100ms
- 數量調整 < 50ms

---

## 自動化測試腳本範例 (Playwright)

\`\`\`typescript
import { test, expect } from '@playwright/test';

test('basic order flow with option groups', async ({ page }) => {
  // 1. 訪問商店
  await page.goto('/');
  
  // 2. 選擇商品
  await page.click('[data-testid="game-card"]:first-child');
  
  // 3. 等待 OrderWizard 開啟
  await page.waitForSelector('[data-testid="order-wizard"]');
  
  // 4. 選擇選項
  await page.click('[data-testid="option-card"]:first-child');
  await page.click('[data-testid="quantity-increase"]');
  
  // 5. 下一步
  await page.click('[data-testid="next-button"]');
  
  // 6. 驗證進入 Step 2
  await expect(page.locator('[data-testid="step-2"]')).toBeVisible();
});

test('admin creates option group', async ({ page }) => {
  // 1. 登入管理員
  await page.goto('/admin/login');
  await page.fill('[name="email"]', 'admin@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('[type="submit"]');
  
  // 2. 訪問商品管理
  await page.goto('/admin/products');
  
  // 3. 點擊管理選項類別
  await page.click('[data-testid="manage-option-groups"]');
  
  // 4. 新增類別
  await page.click('[data-testid="add-group-button"]');
  await page.fill('[name="label"]', '新類別');
  await page.selectOption('[name="selectionMode"]', 'multi');
  await page.click('[data-testid="save-group-button"]');
  
  // 5. 驗證成功
  await expect(page.locator('text=新類別')).toBeVisible();
});
\`\`\`
`;

// 輸出測試情境供參考
console.log("E2E Test Scenarios created. See __tests__/e2e-scenarios.ts");
