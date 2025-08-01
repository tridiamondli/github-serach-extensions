// GitHub高级搜索助手 - 弹窗脚本
class GitHubSearchPopup {
    constructor() {
        this.currentLang = 'zh_CN';
        this.init();
    }

    async init() {
        // 加载保存的设置
        await this.loadSettings();
        
        // 初始化国际化
        this.initI18n();
        
        // 绑定事件
        this.bindEvents();
        
        // 加载上次的搜索条件
        await this.loadLastSearchConditions();
        
        // 自动保存搜索条件
        this.setupAutoSave();
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get(['language']);
            this.currentLang = result.language || 'zh_CN';
        } catch (error) {
            console.error('加载设置失败:', error);
        }
    }

    initI18n() {
        // 使用国际化工具更新界面文本
        if (window.I18n) {
            window.I18n.updateLanguage(this.currentLang);
        }
    }

    bindEvents() {
        // 语言切换
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // 搜索按钮
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.performSearch();
        });

        // 清空按钮
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearAllFields();
        });

        // 帮助按钮
        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelp();
        });

        // 特殊搜索选项
        document.getElementById('trending').addEventListener('change', (e) => {
            if (e.target.checked) {
                document.getElementById('starsMin').value = '1000';
            }
        });

        // 回车键搜索
        document.getElementById('keyword').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }

    buildSearchQuery() {
        const searchBuilder = new GitHubSearchBuilder();
        
        // 基础关键词
        const keyword = document.getElementById('keyword').value.trim();
        if (keyword) {
            // 检查是否启用了awesome搜索
            if (document.getElementById('awesome').checked) {
                searchBuilder.addKeyword(`awesome ${keyword}`);
            } else {
                searchBuilder.addKeyword(keyword);
            }
        }

        // 搜索范围 (in 条件)
        const inConditions = ['name', 'description', 'readme', 'file'];
        inConditions.forEach(condition => {
            const checkbox = document.getElementById(`in${condition.charAt(0).toUpperCase() + condition.slice(1)}`);
            if (checkbox && checkbox.checked) {
                searchBuilder.addInCondition(condition, '');
            }
        });

        // Stars 范围
        const starsMin = document.getElementById('starsMin').value;
        const starsMax = document.getElementById('starsMax').value;
        if (starsMin || starsMax) {
            searchBuilder.addStarsRange(starsMin || 0, starsMax);
        }

        // Forks 范围
        const forksMin = document.getElementById('forksMin').value;
        const forksMax = document.getElementById('forksMax').value;
        if (forksMin || forksMax) {
            searchBuilder.addForksRange(forksMin || 0, forksMax);
        }

        // 创建时间范围
        const createdStart = document.getElementById('createdStart').value;
        const createdEnd = document.getElementById('createdEnd').value;
        if (createdStart || createdEnd) {
            searchBuilder.addCreatedTimeRange(createdStart, createdEnd);
        }

        // 更新时间范围
        const pushedStart = document.getElementById('pushedStart').value;
        const pushedEnd = document.getElementById('pushedEnd').value;
        if (pushedStart || pushedEnd) {
            searchBuilder.addPushedTimeRange(pushedStart, pushedEnd);
        }

        // 编程语言
        const language = document.getElementById('language').value;
        if (language) {
            searchBuilder.addLanguage(language);
        }

        // 许可证
        const license = document.getElementById('license').value;
        if (license) {
            searchBuilder.addLicense(license);
        }

        // 文件扩展名
        const extension = document.getElementById('extension').value.trim();
        if (extension) {
            searchBuilder.addExtension(extension);
        }

        // 地区
        const location = document.getElementById('location').value.trim();
        if (location) {
            searchBuilder.addLocation(location);
        }

        // 用户
        const user = document.getElementById('user').value.trim();
        if (user) {
            searchBuilder.addUser(user);
        }

        // 组织
        const org = document.getElementById('org').value.trim();
        if (org) {
            searchBuilder.addOrg(org);
        }

        // 文件名
        const filename = document.getElementById('filename').value.trim();
        if (filename) {
            searchBuilder.addFilename(filename);
        }

        // 路径
        const path = document.getElementById('path').value.trim();
        if (path) {
            searchBuilder.addPath(path);
        }

        return searchBuilder.build();
    }

    async performSearch() {
        const query = this.buildSearchQuery();
        
        if (!query.trim()) {
            this.showMessage('请输入搜索条件', 'warning');
            return;
        }
        
        // 构建GitHub搜索URL
        const searchUrl = `https://github.com/search?q=${encodeURIComponent(query)}&type=repositories`;
        
        // 在新标签页中打开搜索结果
        try {
            await chrome.tabs.create({ url: searchUrl });
            window.close(); // 关闭弹窗
        } catch (error) {
            console.error('打开搜索页面失败:', error);
            this.showMessage('打开搜索页面失败', 'error');
        }
    }

    getCurrentConditions() {
        // 收集当前所有搜索条件
        const conditions = {};
        
        // 获取所有表单元素的值
        const formElements = document.querySelectorAll('input, select');
        formElements.forEach(element => {
            if (element.type === 'checkbox') {
                conditions[element.id] = element.checked;
            } else {
                conditions[element.id] = element.value;
            }
        });

        return conditions;
    }

    restoreConditions(conditions) {
        // 恢复搜索条件
        Object.keys(conditions).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = conditions[id];
                } else {
                    element.value = conditions[id];
                }
            }
        });
    }

    clearAllFields() {
        // 清空所有输入字段
        const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]');
        inputs.forEach(input => {
            input.value = '';
        });

        // 清空所有选择框
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });

        // 清空所有复选框
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // 清空后也要保存空的状态
        this.autoSaveConditions();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh_CN' ? 'en_US' : 'zh_CN';
        
        // 保存语言设置
        chrome.storage.sync.set({ language: this.currentLang });
        
        // 更新界面
        if (window.I18n) {
            window.I18n.updateLanguage(this.currentLang);
        }
    }

    showHelp() {
        const helpUrl = 'https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories';
        chrome.tabs.create({ url: helpUrl });
    }

    showMessage(message, type = 'info') {
        // 创建消息提示
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            border-radius: 6px;
            color: white;
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        // 根据类型设置颜色
        switch (type) {
            case 'success':
                messageDiv.style.background = '#238636';
                break;
            case 'warning':
                messageDiv.style.background = '#fb8500';
                break;
            case 'error':
                messageDiv.style.background = '#da3633';
                break;
            default:
                messageDiv.style.background = '#0969da';
        }

        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        // 3秒后移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(messageDiv);
                }, 300);
            }
        }, 3000);
    }

    setupAutoSave() {
        // 监听所有输入变化，自动保存搜索条件
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.autoSaveConditions());
            input.addEventListener('change', () => this.autoSaveConditions());
        });
    }

    async autoSaveConditions() {
        // 延迟保存，避免过于频繁的存储操作
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        
        this.saveTimeout = setTimeout(async () => {
            const conditions = this.getCurrentConditions();
            try {
                await chrome.storage.local.set({ lastSearchConditions: conditions });
            } catch (error) {
                console.error('自动保存搜索条件失败:', error);
            }
        }, 500); // 500ms延迟
    }

    async loadLastSearchConditions() {
        try {
            const result = await chrome.storage.local.get(['lastSearchConditions']);
            if (result.lastSearchConditions) {
                this.restoreConditions(result.lastSearchConditions);
            }
        } catch (error) {
            console.error('加载上次搜索条件失败:', error);
        }
    }
}

// 添加动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 初始化弹窗
document.addEventListener('DOMContentLoaded', () => {
    new GitHubSearchPopup();
});
