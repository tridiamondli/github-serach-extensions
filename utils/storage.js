// 存储工具类
class StorageUtils {
    constructor() {
        this.keys = {
            LANGUAGE: 'language',
            SEARCH_HISTORY: 'searchHistory',
            SAVED_CONDITIONS: 'savedConditions',
            USER_SETTINGS: 'userSettings',
            LAST_SEARCH: 'lastSearch'
        };
    }

    // 保存数据到Chrome存储
    async save(key, data) {
        try {
            await chrome.storage.sync.set({ [key]: data });
            return true;
        } catch (error) {
            console.error('保存数据失败:', error);
            // 降级到本地存储
            try {
                await chrome.storage.local.set({ [key]: data });
                return true;
            } catch (localError) {
                console.error('本地存储也失败:', localError);
                return false;
            }
        }
    }

    // 从Chrome存储获取数据
    async get(key, defaultValue = null) {
        try {
            const result = await chrome.storage.sync.get([key]);
            return result[key] !== undefined ? result[key] : defaultValue;
        } catch (error) {
            console.error('获取数据失败:', error);
            // 降级到本地存储
            try {
                const result = await chrome.storage.local.get([key]);
                return result[key] !== undefined ? result[key] : defaultValue;
            } catch (localError) {
                console.error('本地存储获取也失败:', localError);
                return defaultValue;
            }
        }
    }

    // 删除数据
    async remove(key) {
        try {
            await chrome.storage.sync.remove(key);
            await chrome.storage.local.remove(key);
            return true;
        } catch (error) {
            console.error('删除数据失败:', error);
            return false;
        }
    }

    // 清空所有数据
    async clear() {
        try {
            await chrome.storage.sync.clear();
            await chrome.storage.local.clear();
            return true;
        } catch (error) {
            console.error('清空数据失败:', error);
            return false;
        }
    }

    // 保存语言设置
    async saveLanguage(language) {
        return await this.save(this.keys.LANGUAGE, language);
    }

    // 获取语言设置
    async getLanguage() {
        return await this.get(this.keys.LANGUAGE, 'zh_CN');
    }

    // 保存搜索历史
    async saveSearchHistory(history) {
        // 限制历史记录数量
        const limitedHistory = Array.isArray(history) ? history.slice(0, 20) : [];
        return await this.save(this.keys.SEARCH_HISTORY, limitedHistory);
    }

    // 获取搜索历史
    async getSearchHistory() {
        return await this.get(this.keys.SEARCH_HISTORY, []);
    }

    // 添加搜索记录
    async addSearchRecord(query, conditions) {
        const history = await this.getSearchHistory();
        
        const newRecord = {
            query: query,
            conditions: conditions,
            timestamp: Date.now(),
            id: this.generateId()
        };

        // 移除重复的查询
        const filteredHistory = history.filter(item => item.query !== query);
        
        // 添加到开头
        filteredHistory.unshift(newRecord);
        
        // 保存更新后的历史
        return await this.saveSearchHistory(filteredHistory);
    }

    // 删除搜索记录
    async removeSearchRecord(id) {
        const history = await this.getSearchHistory();
        const filteredHistory = history.filter(item => item.id !== id);
        return await this.saveSearchHistory(filteredHistory);
    }

    // 保存已保存的条件
    async saveSavedConditions(conditions) {
        const limitedConditions = Array.isArray(conditions) ? conditions.slice(0, 10) : [];
        return await this.save(this.keys.SAVED_CONDITIONS, limitedConditions);
    }

    // 获取已保存的条件
    async getSavedConditions() {
        return await this.get(this.keys.SAVED_CONDITIONS, []);
    }

    // 添加保存的条件
    async addSavedCondition(name, query, conditions) {
        const saved = await this.getSavedConditions();
        
        const newCondition = {
            name: name,
            query: query,
            conditions: conditions,
            timestamp: Date.now(),
            id: this.generateId()
        };

        // 检查是否已存在相同名称
        const existingIndex = saved.findIndex(item => item.name === name);
        if (existingIndex !== -1) {
            // 更新现有条件
            saved[existingIndex] = newCondition;
        } else {
            // 添加新条件到开头
            saved.unshift(newCondition);
        }

        return await this.saveSavedConditions(saved);
    }

    // 删除保存的条件
    async removeSavedCondition(id) {
        const saved = await this.getSavedConditions();
        const filteredSaved = saved.filter(item => item.id !== id);
        return await this.saveSavedConditions(filteredSaved);
    }

    // 保存用户设置
    async saveUserSettings(settings) {
        const defaultSettings = {
            theme: 'light',
            autoSearch: false,
            defaultLanguage: 'JavaScript',
            showPreview: true,
            searchResultsPerPage: 10
        };
        
        const mergedSettings = { ...defaultSettings, ...settings };
        return await this.save(this.keys.USER_SETTINGS, mergedSettings);
    }

    // 获取用户设置
    async getUserSettings() {
        const defaultSettings = {
            theme: 'light',
            autoSearch: false,
            defaultLanguage: 'JavaScript',
            showPreview: true,
            searchResultsPerPage: 10
        };
        
        const settings = await this.get(this.keys.USER_SETTINGS, defaultSettings);
        return { ...defaultSettings, ...settings };
    }

    // 保存最后一次搜索
    async saveLastSearch(searchData) {
        return await this.save(this.keys.LAST_SEARCH, searchData);
    }

    // 获取最后一次搜索
    async getLastSearch() {
        return await this.get(this.keys.LAST_SEARCH, null);
    }

    // 导出所有数据
    async exportData() {
        try {
            const data = {
                language: await this.getLanguage(),
                searchHistory: await this.getSearchHistory(),
                savedConditions: await this.getSavedConditions(),
                userSettings: await this.getUserSettings(),
                lastSearch: await this.getLastSearch(),
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };
            
            return JSON.stringify(data, null, 2);
        } catch (error) {
            console.error('导出数据失败:', error);
            return null;
        }
    }

    // 导入数据
    async importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            // 验证数据格式
            if (!this.validateImportData(data)) {
                throw new Error('无效的数据格式');
            }

            // 导入各项数据
            const results = await Promise.all([
                this.saveLanguage(data.language || 'zh_CN'),
                this.saveSearchHistory(data.searchHistory || []),
                this.saveSavedConditions(data.savedConditions || []),
                this.saveUserSettings(data.userSettings || {}),
                this.saveLastSearch(data.lastSearch || null)
            ]);

            return results.every(result => result);
        } catch (error) {
            console.error('导入数据失败:', error);
            return false;
        }
    }

    // 验证导入数据
    validateImportData(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // 检查基本结构
        const requiredKeys = ['language', 'searchHistory', 'savedConditions'];
        return requiredKeys.every(key => key in data);
    }

    // 生成唯一ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 获取存储使用情况
    async getStorageInfo() {
        try {
            // 获取同步存储使用情况
            const syncUsage = await chrome.storage.sync.getBytesInUse();
            const syncQuota = chrome.storage.sync.QUOTA_BYTES;
            
            // 获取本地存储使用情况
            const localUsage = await chrome.storage.local.getBytesInUse();
            const localQuota = chrome.storage.local.QUOTA_BYTES;

            return {
                sync: {
                    used: syncUsage,
                    total: syncQuota,
                    percentage: Math.round((syncUsage / syncQuota) * 100)
                },
                local: {
                    used: localUsage,
                    total: localQuota,
                    percentage: Math.round((localUsage / localQuota) * 100)
                }
            };
        } catch (error) {
            console.error('获取存储信息失败:', error);
            return null;
        }
    }

    // 清理过期数据
    async cleanupExpiredData(maxAge = 30 * 24 * 60 * 60 * 1000) { // 默认30天
        try {
            const now = Date.now();
            
            // 清理过期的搜索历史
            const history = await this.getSearchHistory();
            const validHistory = history.filter(item => 
                item.timestamp && (now - item.timestamp) < maxAge
            );
            
            if (validHistory.length !== history.length) {
                await this.saveSearchHistory(validHistory);
            }

            // 清理过期的保存条件（保存的条件不自动过期，除非用户手动删除）
            
            return true;
        } catch (error) {
            console.error('清理过期数据失败:', error);
            return false;
        }
    }

    // 监听存储变化
    onStorageChanged(callback) {
        if (chrome.storage && chrome.storage.onChanged) {
            chrome.storage.onChanged.addListener((changes, namespace) => {
                callback(changes, namespace);
            });
        }
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.StorageUtils = new StorageUtils();
}
