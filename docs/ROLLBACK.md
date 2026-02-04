## Rollback Procedures

### 快速回滾檢查清單

#### Phase 1: 立即停止（5 分鐘內）
- [ ] 1.1 禁用 Option Groups 功能（設定 feature flag）
  ```javascript
  // 在瀏覽器控制台執行
  window.featureFlags.disable('optionGroupsEnabled');
  ```

- [ ] 1.2 檢查錯誤監控（Sentry/LogRocket）
  - 確認錯誤類型和影響範圍
  - 評估是否需要立即回滾

- [ ] 1.3 通知團隊
  - 在 Slack/Discord 發布警報
  - 建立戰情室頻道

#### Phase 2: 資料回滾（15 分鐘內）
- [ ] 2.1 還原 GAMES 資料
  ```bash
  # 如果有備份
  git checkout HEAD~1 -- lib/storefront/constants.ts
  
  # 或手動還原（參考 migration-report-[timestamp].json）
  ```

- [ ] 2.2 清除 API 快取
  ```bash
  # 重新部署以清除記憶體內資料
  npm run build
  ```

- [ ] 2.3 驗證資料完整性
  - 檢查所有遊戲是否仍有 packages
  - 確認 OrderWizard 可正常運作

#### Phase 3: 程式碼回滾（30 分鐘內）
- [ ] 3.1 回滾 Git 提交
  ```bash
  # 找到遷移前的最後一個穩定版本
  git log --oneline --all
  
  # 建立回滾分支
  git checkout -b rollback/option-groups
  
  # 回滾到特定提交
  git revert [MIGRATION_COMMIT_HASH]
  # 或
  git reset --hard [STABLE_COMMIT_HASH]
  ```

- [ ] 3.2 重新部署
  ```bash
  npm run build
  npm run deploy
  ```

- [ ] 3.3 驗證部署
  - 檢查首頁是否正常載入
  - 測試商品點擊和結帳流程
  - 確認沒有 console 錯誤

#### Phase 4: 監控與溝通（持續）
- [ ] 4.1 監控系統指標
  - 錯誤率
  - 頁面載入時間
  - 轉換率

- [ ] 4.2 客戶溝通
  - 如果影響到客戶訂單，主動聯繫
  - 在社群媒體發布狀態更新

- [ ] 4.3 事後檢討
  - 24 小時內召開事後檢討會議
  - 記錄回滾過程中的問題
  - 更新 SOP

---

### 自動化回滾腳本

```bash
#!/bin/bash
# rollback.sh - 自動回滾腳本

echo "🚨 Starting rollback procedure..."

# 1. 備份當前狀態
echo "📦 Backing up current state..."
git stash push -m "auto-rollback-backup-$(date +%Y%m%d-%H%M%S)"

# 2. 回滾到上一個版本
echo "⏮️  Reverting to previous version..."
git revert HEAD --no-edit

# 3. 重新建置
echo "🔨 Rebuilding..."
npm run build

# 4. 驗證建置
echo "✅ Verifying build..."
if [ $? -eq 0 ]; then
    echo "✓ Build successful"
else
    echo "✗ Build failed, manual intervention required"
    exit 1
fi

# 5. 部署
echo "🚀 Deploying..."
npm run deploy

echo "✅ Rollback complete!"
```

---

### 常見回滾情境

#### 情境 A: 前台 OrderWizard 崩潰
**症狀**: 使用者無法完成訂單
**回滾步驟**:
1. 立即禁用 `optionGroupsEnabled` feature flag
2. 檢查是否為資料問題（optionGroups 為空）
3. 如果需要，回滾到 packages 版本

#### 情境 B: Admin 介面無法使用
**症狀**: 管理員無法編輯商品
**回滾步驟**:
1. 禁用 `optionGroupsAdminEnabled`
2. 暫時使用直接編輯 constants.ts
3. 修復後重新啟用

#### 情境 C: API 效能問題
**症狀**: API 回應時間過長
**回滾步驟**:
1. 啟用 API 快取
2. 暫時禁用 `optionGroupsAPIEnabled`
3. 優化查詢邏輯

---

### 聯絡資訊

**緊急聯絡**:
- 技術負責人: [姓名] - [電話]
- DevOps: [姓名] - [電話]
- 產品負責人: [姓名] - [電話]

**監控工具**:
- Sentry: [URL]
- Vercel Analytics: [URL]
- LogRocket: [URL]

**部署平台**:
- Vercel Dashboard: [URL]
- Database Admin: [URL]
