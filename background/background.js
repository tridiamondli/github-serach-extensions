// 后台脚本 - 处理扩展的后台逻辑
class GitHubSearchBackground {
    constructor() {
        this.init();
    }

    init() {
        // 监听扩展安装
        chrome.runtime.onInstalled.addListener((details) => {
            this.handleInstalled(details);
        });

        // 监听消息
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            this.handleMessage(request, sender, sendResponse);
            return true; // 保持消息通道开放以支持异步响应
        });

        // 监听标签页更新
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            this.handleTabUpdated(tabId, changeInfo, tab);
        });

        // 监听快捷键
        chrome.commands.onCommand.addListener((command) => {
            this.handleCommand(command);
        });
    }

    // 处理扩展安装
    async handleInstalled(details) {
        console.log('GitHub搜索助手已安装/更新', details);

        if (details.reason === 'install') {
            // 首次安装时的初始化
            await this.initializeExtension();
        } else if (details.reason === 'update') {
            // 更新时的处理
            await this.handleUpdate(details.previousVersion);
        }
    }

    // 初始化扩展
    async initializeExtension() {
        try {
            // 设置默认设置
            const defaultSettings = {
                language: 'zh_CN',
                theme: 'light',
                autoSearch: false,
                showPreview: true,
                searchHistory: [],
                savedConditions: []
            };

            await chrome.storage.sync.set(defaultSettings);

            console.log('扩展初始化完成');
        } catch (error) {
            console.error('扩展初始化失败:', error);
        }
    }

    // 处理扩展更新
    async handleUpdate(previousVersion) {
        try {
            console.log(`从版本 ${previousVersion} 更新`);
            
            // 这里可以添加数据迁移逻辑
            // 例如：从旧版本格式迁移到新版本格式
            
        } catch (error) {
            console.error('更新处理失败:', error);
        }
    }

    // 处理标签页更新
    handleTabUpdated(tabId, changeInfo, tab) {
        // 当GitHub页面加载完成时，注入内容脚本增强功能
        if (changeInfo.status === 'complete' && 
            tab.url && tab.url.includes('github.com')) {
            
            // 可以在这里添加页面特定的逻辑
            this.enhanceGitHubPage(tabId, tab);
        }
    }

    // 增强GitHub页面
    async enhanceGitHubPage(tabId, tab) {
        try {
            // 检查是否为搜索结果页面
            if (tab.url.includes('/search?')) {
                // 向内容脚本发送消息，增强搜索结果页面
                chrome.tabs.sendMessage(tabId, {
                    action: 'enhanceSearchResults',
                    url: tab.url
                });
            }
        } catch (error) {
            console.error('增强GitHub页面失败:', error);
        }
    }

    // 处理快捷键命令
    async handleCommand(command) {
        try {
            switch (command) {
                case 'open-search':
                    // 打开搜索助手弹窗
                    chrome.action.openPopup();
                    break;
            }
        } catch (error) {
            console.error('处理快捷键命令失败:', error);
        }
    }

    // 处理来自其他脚本的消息
    async handleMessage(request, sender, sendResponse) {
        try {
            switch (request.action) {
                case 'performSearch':
                    await this.handlePerformSearch(request.data, sendResponse);
                    break;

                case 'openTab':
                    await this.handleOpenTab(request.data, sendResponse);
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
        } catch (error) {
            console.error('处理消息失败:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    // 处理执行搜索请求
    async handlePerformSearch(data, sendResponse) {
        try {
            const { query, openInNewTab = true } = data;
            const searchUrl = `https://github.com/search?q=${encodeURIComponent(query)}&type=repositories`;
            
            if (openInNewTab) {
                const tab = await chrome.tabs.create({ url: searchUrl });
                sendResponse({ success: true, tabId: tab.id });
            } else {
                const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tabs.length > 0) {
                    await chrome.tabs.update(tabs[0].id, { url: searchUrl });
                    sendResponse({ success: true, tabId: tabs[0].id });
                }
            }
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
    }

    // 处理获取搜索建议请求
    async handleGetSearchSuggestions(data, sendResponse) {
        try {
            const suggestions = await this.generateSearchSuggestions(data.query);
            sendResponse({ success: true, suggestions });
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
    }

    // 处理打开标签页请求
    async handleOpenTab(data, sendResponse) {
        try {
            const tab = await chrome.tabs.create({ 
                url: data.url,
                active: data.active !== false 
            });
            sendResponse({ success: true, tabId: tab.id });
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
    }

    // 生成唯一ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// 初始化后台脚本
new GitHubSearchBackground();
