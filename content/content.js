// 内容脚本 - 增强GitHub页面功能
class GitHubSearchContentScript {
    constructor() {
        this.isSearchPage = false;
        this.searchEnhancementsAdded = false;
        this.init();
    }

    init() {
        // 检查是否为GitHub搜索页面
        this.checkIfSearchPage();
        
        // 监听来自背景脚本的消息
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            this.handleMessage(request, sender, sendResponse);
            return true;
        });

        // 如果是搜索页面，添加增强功能
        if (this.isSearchPage) {
            this.enhanceSearchPage();
        }

        // 监听页面导航变化（SPA导航）
        this.observePageChanges();

        // 添加全局快捷键监听
        this.addGlobalKeyboardShortcuts();
    }

    checkIfSearchPage() {
        this.isSearchPage = window.location.pathname.includes('/search') && 
                          window.location.search.includes('type=repositories');
    }

    // 增强搜索页面
    enhanceSearchPage() {
        if (this.searchEnhancementsAdded) return;

        // 等待页面加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.addSearchEnhancements();
            });
        } else {
            this.addSearchEnhancements();
        }
    }

    // 添加搜索增强功能
    addSearchEnhancements() {
        try {
            // 添加快速筛选按钮
            this.addQuickFilters();
            
            // 添加结果统计
            this.addResultsStats();
            
            // 添加导出功能
            this.addExportFeature();

            this.searchEnhancementsAdded = true;
        } catch (error) {
            console.error('添加搜索增强功能失败:', error);
        }
    }

    // 添加快速筛选按钮
    addQuickFilters() {
        const searchContainer = document.querySelector('.subnav-search') || 
                               document.querySelector('[data-testid="search-input"]')?.closest('.d-flex');
        
        if (!searchContainer || document.querySelector('.github-search-quick-filters')) {
            return;
        }

        const quickFiltersContainer = document.createElement('div');
        quickFiltersContainer.className = 'github-search-quick-filters';
        quickFiltersContainer.innerHTML = `
            <div style="display: flex; gap: 8px; margin: 8px 0; flex-wrap: wrap;">
                <button class="btn btn-sm quick-filter-btn" data-filter="stars:>1000">
                    ⭐ 热门项目
                </button>
                <button class="btn btn-sm quick-filter-btn" data-filter="language:JavaScript">
                    📘 JavaScript
                </button>
                <button class="btn btn-sm quick-filter-btn" data-filter="language:Python">
                    🐍 Python
                </button>
                <button class="btn btn-sm quick-filter-btn" data-filter="awesome">
                    ✨ Awesome
                </button>
                <button class="btn btn-sm quick-filter-btn" data-filter="pushed:>=2024-01-01">
                    🔄 最近更新
                </button>
                <button class="btn btn-sm quick-filter-btn" data-filter="license:mit">
                    📄 MIT许可证
                </button>
                <button class="btn btn-sm" id="open-search-helper" style="background: #0969da; color: white;">
                    🔍 高级搜索
                </button>
            </div>
        `;

        // 插入到搜索容器后面
        searchContainer.parentNode.insertBefore(quickFiltersContainer, searchContainer.nextSibling);

        // 绑定快速筛选按钮事件
        quickFiltersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-filter-btn')) {
                this.applyQuickFilter(e.target.dataset.filter);
            } else if (e.target.id === 'open-search-helper') {
                this.openSearchHelper();
            }
        });
    }

    // 应用快速筛选
    applyQuickFilter(filter) {
        const searchInput = document.querySelector('input[name="q"]') || 
                           document.querySelector('[data-testid="search-input"]');
        
        if (searchInput) {
            let currentQuery = searchInput.value.trim();
            
            // 检查是否已包含该筛选条件
            if (!currentQuery.includes(filter)) {
                const newQuery = currentQuery ? `${currentQuery} ${filter}` : filter;
                searchInput.value = newQuery;
                
                // 触发搜索
                const form = searchInput.closest('form');
                if (form) {
                    form.submit();
                } else {
                    // 如果没有表单，触发键盘事件
                    const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });
                    searchInput.dispatchEvent(event);
                }
            }
        }
    }

    // 添加搜索条件显示
    // addSearchConditionsDisplay() 方法已移除
    // 不再在搜索结果页面显示"🔍 当前搜索条件:"

    // 解析当前搜索查询
    parseCurrentSearchQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q') || '';
        
        const conditions = [];
        const keywords = [];

        // 分析查询条件
        const parts = query.split(' ');
        parts.forEach(part => {
            if (part.includes(':')) {
                conditions.push(part);
            } else if (part.trim()) {
                keywords.push(part);
            }
        });

        return {
            original: query,
            keywords: keywords.join(' '),
            conditions: conditions
        };
    }

    // 添加结果统计
    addResultsStats() {
        const resultsHeader = document.querySelector('.subnav') ||
                             document.querySelector('[data-testid="results-header"]');
        
        if (!resultsHeader || document.querySelector('.results-stats')) {
            return;
        }

        // 获取结果数量
        const resultCountElement = document.querySelector('[data-testid="results-count"]') ||
                                  document.querySelector('.codesearch-results h3');
        
        if (resultCountElement) {
            const statsContainer = document.createElement('div');
            statsContainer.className = 'results-stats';
            statsContainer.style.cssText = `
                background: #dbeafe;
                border: 1px solid #93c5fd;
                border-radius: 6px;
                padding: 8px 12px;
                margin: 8px 0;
                font-size: 13px;
                color: #1e40af;
            `;

            const resultText = resultCountElement.textContent || '';
            const resultCount = this.extractResultCount(resultText);
            
            statsContainer.innerHTML = `
                📊 找到 <strong>${resultCount.toLocaleString()}</strong> 个仓库
                <span style="margin-left: 16px;">⏱️ 搜索时间: ${new Date().toLocaleTimeString()}</span>
            `;

            resultsHeader.parentNode.insertBefore(statsContainer, resultsHeader.nextSibling);
        }
    }

    // 提取结果数量
    extractResultCount(text) {
        const match = text.match(/[\d,]+/);
        return match ? parseInt(match[0].replace(/,/g, '')) : 0;
    }

    // 添加导出功能
    addExportFeature() {
        const actionsContainer = document.querySelector('.subnav-links') ||
                                document.querySelector('[data-testid="search-sort-dropdown"]')?.parentNode;
        
        if (!actionsContainer || document.querySelector('.export-results-btn')) {
            return;
        }

        const exportButton = document.createElement('button');
        exportButton.className = 'btn btn-sm export-results-btn';
        exportButton.innerHTML = '📥 导出结果';
        exportButton.style.marginLeft = '8px';

        exportButton.addEventListener('click', () => {
            this.exportSearchResults();
        });

        actionsContainer.appendChild(exportButton);
    }

    // 导出搜索结果
    exportSearchResults() {
        try {
            const results = this.collectSearchResults();
            const csvContent = this.convertToCSV(results);
            this.downloadCSV(csvContent, `github-search-${Date.now()}.csv`);
        } catch (error) {
            console.error('导出搜索结果失败:', error);
            alert('导出失败，请稍后重试');
        }
    }

    // 收集搜索结果数据
    collectSearchResults() {
        const results = [];
        const resultItems = document.querySelectorAll('[data-testid="results-list"] .Box-row') ||
                           document.querySelectorAll('.codesearch-results .Box-row');

        resultItems.forEach(item => {
            try {
                const nameElement = item.querySelector('a[data-testid="results-list-repo-name"]') ||
                                   item.querySelector('.text-normal a');
                const descElement = item.querySelector('[data-testid="results-list-repo-description"]') ||
                                   item.querySelector('.color-fg-muted');
                const languageElement = item.querySelector('[data-testid="results-list-repo-language"]') ||
                                       item.querySelector('.mr-3 .color-fg-muted');
                const starsElement = item.querySelector('[data-testid="results-list-repo-stars"]') ||
                                    item.querySelector('.octicon-star')?.parentNode;

                if (nameElement) {
                    results.push({
                        name: nameElement.textContent.trim(),
                        url: nameElement.href,
                        description: descElement?.textContent.trim() || '',
                        language: languageElement?.textContent.trim() || '',
                        stars: starsElement?.textContent.trim() || '0'
                    });
                }
            } catch (error) {
                console.error('解析结果项失败:', error);
            }
        });

        return results;
    }

    // 转换为CSV格式
    convertToCSV(results) {
        const headers = ['仓库名称', '链接', '描述', '编程语言', 'Stars'];
        const rows = results.map(result => [
            result.name,
            result.url,
            result.description,
            result.language,
            result.stars
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${(field || '').replace(/"/g, '""')}"`).join(','))
            .join('\n');

        return csvContent;
    }

    // 下载CSV文件
    downloadCSV(content, filename) {
        const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 监听页面变化
    observePageChanges() {
        const observer = new MutationObserver((mutations) => {
            let shouldRecheck = false;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldRecheck = true;
                }
            });

            if (shouldRecheck) {
                const wasSearchPage = this.isSearchPage;
                this.checkIfSearchPage();
                
                if (!wasSearchPage && this.isSearchPage) {
                    // 从非搜索页面导航到搜索页面
                    this.searchEnhancementsAdded = false;
                    setTimeout(() => this.enhanceSearchPage(), 1000);
                } else if (wasSearchPage && this.isSearchPage && !this.searchEnhancementsAdded) {
                    // 搜索页面内容更新
                    setTimeout(() => this.enhanceSearchPage(), 500);
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 添加全局键盘快捷键
    addGlobalKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + F: 打开搜索助手
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                this.openSearchHelper();
            }
            
            // Ctrl/Cmd + Shift + S: 快速搜索选中文本
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                const selectedText = window.getSelection().toString().trim();
                if (selectedText) {
                    this.performQuickSearch(selectedText);
                }
            }
        });
    }

    // 处理来自背景脚本的消息
    handleMessage(request, sender, sendResponse) {
        switch (request.action) {
            case 'enhanceSearchResults':
                this.enhanceSearchPage();
                sendResponse({ success: true });
                break;

            case 'getSelectedText':
                const selectedText = window.getSelection().toString().trim();
                sendResponse({ text: selectedText });
                break;

            case 'applyQuickFilter':
                this.applyQuickFilter(request.filter);
                sendResponse({ success: true });
                break;

            default:
                sendResponse({ success: false, error: 'Unknown action' });
        }
    }

    // 打开搜索助手
    openSearchHelper() {
        // 发送消息给背景脚本打开弹窗
        chrome.runtime.sendMessage({
            action: 'openSearchHelper'
        });
    }

    // 执行快速搜索
    performQuickSearch(query) {
        chrome.runtime.sendMessage({
            action: 'performSearch',
            data: { query: query }
        });
    }

    // 保存当前搜索
    saveCurrentSearch() {
        const searchQuery = this.parseCurrentSearchQuery();
        
        chrome.runtime.sendMessage({
            action: 'saveSearchHistory',
            data: { 
                query: searchQuery.original,
                conditions: searchQuery
            }
        }, (response) => {
            if (response.success) {
                alert('搜索条件已保存到历史记录');
            } else {
                alert('保存失败，请稍后重试');
            }
        });
    }
}

// 初始化内容脚本
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GitHubSearchContentScript();
    });
} else {
    new GitHubSearchContentScript();
}
