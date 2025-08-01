// 国际化工具类
class I18n {
    constructor() {
        this.currentLang = 'zh_CN';
        this.messages = {};
        this.init();
    }

    init() {
        // 初始化消息
        this.messages = {
            zh_CN: {
                // 标题和基本文本
                title: 'GitHub 高级搜索助手',
                keywordLabel: '🔍 搜索关键词',
                keywordPlaceholder: '输入搜索关键词...',
                
                // 搜索范围
                scopeTitle: '📊 搜索范围',
                inNameLabel: '项目名称',
                inDescriptionLabel: '项目描述',
                inReadmeLabel: 'README文件',
                inFileLabel: '文件内容',
                
                // 数量筛选
                metricsTitle: '⭐ 数量筛选',
                starsLabel: 'Stars:',
                forksLabel: 'Forks:',
                sizeLabel: '仓库大小(KB):',
                minPlaceholder: '最小值',
                maxPlaceholder: '最大值',
                toText: '到',
                
                // 时间筛选
                timeTitle: '📅 时间筛选',
                createdLabel: '创建时间:',
                pushedLabel: '更新时间:',
                customDateLabel: '自定义日期:',
                noLimit: '不限制',
                after2024: '2024年以后',
                after2023: '2023年以后',
                after2022: '2022年以后',
                after2021: '2021年以后',
                lastMonth: '最近1个月',
                last3Months: '最近3个月',
                lastYear: '最近1年',
                last2Years: '最近2年',
                
                // 技术栈
                techTitle: '💻 技术栈',
                languageLabel: '编程语言:',
                licenseLabel: '许可证:',
                extensionLabel: '文件扩展名:',
                allLanguages: '所有语言',
                allLicenses: '所有许可证',
                extensionPlaceholder: '如: js, py, md',
                
                // 其他选项
                otherTitle: '🌍 其他选项',
                locationLabel: '地区:',
                userLabel: '用户:',
                orgLabel: '组织:',
                filenameLabel: '文件名:',
                pathLabel: '路径:',
                locationPlaceholder: '如: china, usa',
                userPlaceholder: 'GitHub用户名',
                orgPlaceholder: 'GitHub组织名',
                filenamePlaceholder: '如: package.json',
                pathPlaceholder: '如: src/, docs/',
                
                // 特殊搜索
                specialTitle: '✨ 特殊搜索',
                awesomeLabel: 'Awesome项目',
                trendingLabel: '热门项目 (Stars > 1000)',
                
                // 按钮
                searchBtnText: '搜索',
                saveBtnText: '保存条件',
                clearBtnText: '清空',
                historyBtnText: '搜索历史',
                helpBtnText: '帮助',
                
                // 历史记录
                historyModalTitle: '搜索历史',
                savedConditions: '💾 保存的条件',
                searchHistory: '📜 搜索历史',
                noHistory: '暂无搜索历史',
                
                // 消息提示
                pleaseEnterKeyword: '请输入搜索条件',
                noConditionsToSave: '没有搜索条件可保存',
                conditionsSaved: '搜索条件已保存',
                saveFailed: '保存失败',
                noConditionsToCopy: '没有搜索条件可复制',
                conditionsCopied: '搜索条件已复制到剪贴板',
                enterConditionName: '请输入保存的条件名称:',
                openPageFailed: '打开搜索页面失败',
                
                // 工具提示
                toggleLanguage: '切换语言'
            },
            
            en_US: {
                // Title and basic text
                title: 'GitHub Advanced Search Helper',
                keywordLabel: '🔍 Search Keywords',
                keywordPlaceholder: 'Enter search keywords...',
                
                // Search scope
                scopeTitle: '📊 Search Scope',
                inNameLabel: 'Repository Name',
                inDescriptionLabel: 'Description',
                inReadmeLabel: 'README File',
                inFileLabel: 'File Content',
                
                // Metrics filtering
                metricsTitle: '⭐ Metrics Filter',
                starsLabel: 'Stars:',
                forksLabel: 'Forks:',
                sizeLabel: 'Repository Size(KB):',
                minPlaceholder: 'Min',
                maxPlaceholder: 'Max',
                toText: 'to',
                
                // Time filtering
                timeTitle: '📅 Time Filter',
                createdLabel: 'Created:',
                pushedLabel: 'Updated:',
                customDateLabel: 'Custom Date:',
                noLimit: 'No Limit',
                after2024: 'After 2024',
                after2023: 'After 2023',
                after2022: 'After 2022',
                after2021: 'After 2021',
                lastMonth: 'Last Month',
                last3Months: 'Last 3 Months',
                lastYear: 'Last Year',
                last2Years: 'Last 2 Years',
                
                // Tech stack
                techTitle: '💻 Tech Stack',
                languageLabel: 'Language:',
                licenseLabel: 'License:',
                extensionLabel: 'File Extension:',
                allLanguages: 'All Languages',
                allLicenses: 'All Licenses',
                extensionPlaceholder: 'e.g: js, py, md',
                
                // Other options
                otherTitle: '🌍 Other Options',
                locationLabel: 'Location:',
                userLabel: 'User:',
                orgLabel: 'Organization:',
                filenameLabel: 'Filename:',
                pathLabel: 'Path:',
                locationPlaceholder: 'e.g: china, usa',
                userPlaceholder: 'GitHub username',
                orgPlaceholder: 'GitHub organization',
                filenamePlaceholder: 'e.g: package.json',
                pathPlaceholder: 'e.g: src/, docs/',
                
                // Special search
                specialTitle: '✨ Special Search',
                awesomeLabel: 'Awesome Projects',
                trendingLabel: 'Trending Projects (Stars > 1000)',
                
                // Buttons
                searchBtnText: 'Search',
                saveBtnText: 'Save Conditions',
                clearBtnText: 'Clear',
                historyBtnText: 'Search History',
                helpBtnText: 'Help',
                
                // History
                historyModalTitle: 'Search History',
                savedConditions: '💾 Saved Conditions',
                searchHistory: '📜 Search History',
                noHistory: 'No search history',
                
                // Messages
                pleaseEnterKeyword: 'Please enter search conditions',
                noConditionsToSave: 'No search conditions to save',
                conditionsSaved: 'Search conditions saved',
                saveFailed: 'Save failed',
                noConditionsToCopy: 'No search conditions to copy',
                conditionsCopied: 'Search conditions copied to clipboard',
                enterConditionName: 'Please enter a name for the conditions:',
                openPageFailed: 'Failed to open search page',
                
                // Tooltips
                toggleLanguage: 'Toggle Language'
            }
        };
    }

    // 获取当前语言的消息
    getMessage(key) {
        return this.messages[this.currentLang]?.[key] || key;
    }

    // 更新界面语言
    updateLanguage(lang) {
        this.currentLang = lang;
        this.updateUI();
    }

    // 更新UI文本
    updateUI() {
        // 更新所有带有id的文本元素
        const elements = [
            // 基本文本
            { id: 'title', key: 'title' },
            { id: 'keywordLabel', key: 'keywordLabel' },
            
            // 搜索范围
            { id: 'scopeTitle', key: 'scopeTitle' },
            { id: 'inNameLabel', key: 'inNameLabel' },
            { id: 'inDescriptionLabel', key: 'inDescriptionLabel' },
            { id: 'inReadmeLabel', key: 'inReadmeLabel' },
            { id: 'inFileLabel', key: 'inFileLabel' },
            
            // 数量筛选
            { id: 'metricsTitle', key: 'metricsTitle' },
            { id: 'starsLabel', key: 'starsLabel' },
            { id: 'forksLabel', key: 'forksLabel' },
            { id: 'sizeLabel', key: 'sizeLabel' },
            
            // 时间筛选
            { id: 'timeTitle', key: 'timeTitle' },
            { id: 'createdLabel', key: 'createdLabel' },
            { id: 'pushedLabel', key: 'pushedLabel' },
            { id: 'customDateLabel', key: 'customDateLabel' },
            
            // 技术栈
            { id: 'techTitle', key: 'techTitle' },
            { id: 'languageLabel', key: 'languageLabel' },
            { id: 'licenseLabel', key: 'licenseLabel' },
            { id: 'extensionLabel', key: 'extensionLabel' },
            
            // 其他选项
            { id: 'otherTitle', key: 'otherTitle' },
            { id: 'locationLabel', key: 'locationLabel' },
            { id: 'userLabel', key: 'userLabel' },
            { id: 'orgLabel', key: 'orgLabel' },
            { id: 'filenameLabel', key: 'filenameLabel' },
            { id: 'pathLabel', key: 'pathLabel' },
            
            // 特殊搜索
            { id: 'specialTitle', key: 'specialTitle' },
            { id: 'awesomeLabel', key: 'awesomeLabel' },
            { id: 'trendingLabel', key: 'trendingLabel' },
            
            // 按钮
            { id: 'searchBtnText', key: 'searchBtnText' },
            { id: 'saveBtnText', key: 'saveBtnText' },
            { id: 'clearBtnText', key: 'clearBtnText' },
            { id: 'historyBtnText', key: 'historyBtnText' },
            { id: 'helpBtnText', key: 'helpBtnText' },
            
            // 预览
            { id: 'previewTitle', key: 'previewTitle' },
            
            // 历史记录
            { id: 'historyModalTitle', key: 'historyModalTitle' }
        ];

        elements.forEach(({ id, key }) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = this.getMessage(key);
            }
        });

        // 更新占位符文本
        this.updatePlaceholders();
        
        // 更新选择框选项
        this.updateSelectOptions();
        
        // 更新工具提示
        this.updateTooltips();
    }

    updatePlaceholders() {
        const placeholders = [
            { id: 'keyword', key: 'keywordPlaceholder' },
            { id: 'starsMin', key: 'minPlaceholder' },
            { id: 'starsMax', key: 'maxPlaceholder' },
            { id: 'forksMin', key: 'minPlaceholder' },
            { id: 'forksMax', key: 'maxPlaceholder' },
            { id: 'sizeMin', key: 'minPlaceholder' },
            { id: 'sizeMax', key: 'maxPlaceholder' },
            { id: 'extension', key: 'extensionPlaceholder' },
            { id: 'location', key: 'locationPlaceholder' },
            { id: 'user', key: 'userPlaceholder' },
            { id: 'org', key: 'orgPlaceholder' },
            { id: 'filename', key: 'filenamePlaceholder' },
            { id: 'path', key: 'pathPlaceholder' }
        ];

        placeholders.forEach(({ id, key }) => {
            const element = document.getElementById(id);
            if (element) {
                element.placeholder = this.getMessage(key);
            }
        });
    }

    updateSelectOptions() {
        // 更新时间选择器选项
        this.updateTimeOptions('createdTime');
        this.updateTimeOptions('pushedTime');
        
        // 更新语言选择器
        this.updateLanguageOptions();
        
        // 更新许可证选择器
        this.updateLicenseOptions();
    }

    updateTimeOptions(selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;

        const options = [
            { value: '', key: 'noLimit' },
            { value: '>=2024-01-01', key: 'after2024' },
            { value: '>=2023-01-01', key: 'after2023' },
            { value: '>=2022-01-01', key: 'after2022' },
            { value: '>=2021-01-01', key: 'after2021' }
        ];

        if (selectId === 'pushedTime') {
            options.splice(1, 0, 
                { value: '>=2024-07-01', key: 'lastMonth' },
                { value: '>=2024-05-01', key: 'last3Months' },
                { value: '>=2024-01-01', key: 'lastYear' },
                { value: '>=2023-01-01', key: 'last2Years' }
            );
        }

        // 保存当前选中的值
        const currentValue = select.value;
        
        // 清空并重新填充选项
        select.innerHTML = '';
        options.forEach(({ value, key }) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = this.getMessage(key);
            select.appendChild(option);
        });

        // 恢复选中状态
        select.value = currentValue;
    }

    updateLanguageOptions() {
        const select = document.getElementById('language');
        if (!select) return;

        const currentValue = select.value;
        const firstOption = select.querySelector('option');
        
        if (firstOption) {
            firstOption.textContent = this.getMessage('allLanguages');
        }

        select.value = currentValue;
    }

    updateLicenseOptions() {
        const select = document.getElementById('license');
        if (!select) return;

        const currentValue = select.value;
        const firstOption = select.querySelector('option');
        
        if (firstOption) {
            firstOption.textContent = this.getMessage('allLicenses');
        }

        select.value = currentValue;
    }

    updateTooltips() {
        const tooltips = [
            { id: 'langToggle', key: 'toggleLanguage' }
        ];

        tooltips.forEach(({ id, key }) => {
            const element = document.getElementById(id);
            if (element) {
                element.title = this.getMessage(key);
            }
        });
    }

    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLang;
    }

    // 切换语言
    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh_CN' ? 'en_US' : 'zh_CN';
        this.updateUI();
        return this.currentLang;
    }

    // 设置语言
    setLanguage(lang) {
        if (this.messages[lang]) {
            this.currentLang = lang;
            this.updateUI();
        }
    }

    // 获取支持的语言列表
    getSupportedLanguages() {
        return Object.keys(this.messages);
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.I18n = new I18n();
}
