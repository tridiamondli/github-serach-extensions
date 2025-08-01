// GitHub搜索条件构建器
class GitHubSearchBuilder {
    constructor() {
        this.conditions = [];
    }

    addKeyword(keyword) {
        if (keyword && keyword.trim()) {
            this.conditions.push(keyword.trim());
        }
        return this;
    }

    addInCondition(type, value = '') {
        if (type) {
            this.conditions.push(`in:${type}`);
        }
        return this;
    }

    addStarsRange(min, max) {
        if (min || max) {
            if (max && min !== max) {
                this.conditions.push(`stars:${min || 0}..${max}`);
            } else if (min) {
                this.conditions.push(`stars:>=${min}`);
            }
        }
        return this;
    }

    addForksRange(min, max) {
        if (min || max) {
            if (max && min !== max) {
                this.conditions.push(`forks:${min || 0}..${max}`);
            } else if (min) {
                this.conditions.push(`forks:>=${min}`);
            }
        }
        return this;
    }

    addSizeRange(min, max) {
        // 此方法已移除，仓库大小搜索条件不再支持
        return this;
    }

    addCreatedTime(timeCondition) {
        if (timeCondition) {
            this.conditions.push(`created:${timeCondition}`);
        }
        return this;
    }

    addCreatedTimeRange(startDate, endDate) {
        if (startDate || endDate) {
            if (startDate && endDate) {
                this.conditions.push(`created:${startDate}..${endDate}`);
            } else if (startDate) {
                this.conditions.push(`created:>=${startDate}`);
            } else if (endDate) {
                this.conditions.push(`created:<=${endDate}`);
            }
        }
        return this;
    }

    addPushedTime(timeCondition) {
        if (timeCondition) {
            this.conditions.push(`pushed:${timeCondition}`);
        }
        return this;
    }

    addPushedTimeRange(startDate, endDate) {
        if (startDate || endDate) {
            if (startDate && endDate) {
                this.conditions.push(`pushed:${startDate}..${endDate}`);
            } else if (startDate) {
                this.conditions.push(`pushed:>=${startDate}`);
            } else if (endDate) {
                this.conditions.push(`pushed:<=${endDate}`);
            }
        }
        return this;
    }

    addLanguage(language) {
        if (language) {
            this.conditions.push(`language:${language}`);
        }
        return this;
    }

    addLicense(license) {
        if (license) {
            this.conditions.push(`license:${license}`);
        }
        return this;
    }

    addExtension(extension) {
        if (extension) {
            // 移除可能的点号前缀
            const cleanExtension = extension.replace(/^\./, '');
            this.conditions.push(`extension:${cleanExtension}`);
        }
        return this;
    }

    addLocation(location) {
        if (location) {
            this.conditions.push(`location:${location}`);
        }
        return this;
    }

    addUser(user) {
        if (user) {
            this.conditions.push(`user:${user}`);
        }
        return this;
    }

    addOrg(org) {
        if (org) {
            this.conditions.push(`org:${org}`);
        }
        return this;
    }

    addFilename(filename) {
        if (filename) {
            this.conditions.push(`filename:${filename}`);
        }
        return this;
    }

    addPath(path) {
        if (path) {
            this.conditions.push(`path:${path}`);
        }
        return this;
    }

    addFileContent(content) {
        if (content) {
            this.conditions.push(`in:file ${content}`);
        }
        return this;
    }

    build() {
        return this.conditions.join(' ');
    }

    clear() {
        this.conditions = [];
        return this;
    }

    // 获取条件数量
    getConditionCount() {
        return this.conditions.length;
    }

    // 获取所有条件
    getConditions() {
        return [...this.conditions];
    }

    // 移除特定条件
    removeCondition(condition) {
        this.conditions = this.conditions.filter(c => c !== condition);
        return this;
    }
}

// 搜索工具类
class GitHubSearchUtils {
    // 验证搜索查询
    static validateQuery(query) {
        if (!query || !query.trim()) {
            return { valid: false, message: '搜索关键词不能为空' };
        }

        // 检查查询长度（GitHub限制）
        if (query.length > 256) {
            return { valid: false, message: '搜索条件过长，请简化查询' };
        }

        return { valid: true };
    }

    // 格式化数字输入
    static formatNumber(value) {
        const num = parseInt(value);
        return isNaN(num) || num < 0 ? null : num;
    }

    // 格式化日期
    static formatDate(dateString) {
        if (!dateString) return null;
        
        try {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        } catch (error) {
            return null;
        }
    }

    // 构建GitHub搜索URL
    static buildGitHubSearchUrl(query, type = 'repositories', sort = '', order = '') {
        const baseUrl = 'https://github.com/search';
        const params = new URLSearchParams({
            q: query,
            type: type
        });

        if (sort) params.append('s', sort);
        if (order) params.append('o', order);

        return `${baseUrl}?${params.toString()}`;
    }

    // 解析GitHub搜索URL中的查询
    static parseGitHubSearchUrl(url) {
        try {
            const urlObj = new URL(url);
            const query = urlObj.searchParams.get('q');
            const type = urlObj.searchParams.get('type') || 'repositories';
            const sort = urlObj.searchParams.get('s') || '';
            const order = urlObj.searchParams.get('o') || '';

            return { query, type, sort, order };
        } catch (error) {
            return null;
        }
    }

    // 获取流行的编程语言列表
    static getPopularLanguages() {
        return [
            'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C',
            'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart',
            'HTML', 'CSS', 'Shell', 'PowerShell', 'Lua', 'R',
            'Scala', 'Perl', 'Haskell', 'Clojure', 'F#', 'Assembly'
        ];
    }

    // 获取常用许可证列表
    static getCommonLicenses() {
        return [
            { value: 'mit', name: 'MIT License' },
            { value: 'apache-2.0', name: 'Apache License 2.0' },
            { value: 'gpl-3.0', name: 'GNU GPLv3' },
            { value: 'bsd-3-clause', name: 'BSD 3-Clause' },
            { value: 'bsd-2-clause', name: 'BSD 2-Clause' },
            { value: 'lgpl-3.0', name: 'GNU LGPLv3' },
            { value: 'unlicense', name: 'The Unlicense' },
            { value: 'agpl-3.0', name: 'GNU AGPLv3' },
            { value: 'mpl-2.0', name: 'Mozilla Public License 2.0' },
            { value: 'isc', name: 'ISC License' }
        ];
    }

    // 获取预设的时间范围
    static getTimeRanges() {
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

        return [
            { value: `>=${oneMonthAgo.toISOString().split('T')[0]}`, name: '最近1个月' },
            { value: `>=${threeMonthsAgo.toISOString().split('T')[0]}`, name: '最近3个月' },
            { value: `>=${oneYearAgo.toISOString().split('T')[0]}`, name: '最近1年' },
            { value: `>=${twoYearsAgo.toISOString().split('T')[0]}`, name: '最近2年' },
            { value: '>=2024-01-01', name: '2024年以后' },
            { value: '>=2023-01-01', name: '2023年以后' },
            { value: '>=2022-01-01', name: '2022年以后' },
            { value: '>=2021-01-01', name: '2021年以后' }
        ];
    }

    // 生成搜索建议
    static generateSearchSuggestions(keyword) {
        if (!keyword) return [];

        const suggestions = [];
        const lowerKeyword = keyword.toLowerCase();

        // 基于关键词的建议
        if (lowerKeyword.includes('api')) {
            suggestions.push(`${keyword} in:readme`);
            suggestions.push(`${keyword} language:JavaScript`);
        }

        if (lowerKeyword.includes('framework')) {
            suggestions.push(`${keyword} stars:>1000`);
            suggestions.push(`${keyword} language:JavaScript OR language:TypeScript`);
        }

        if (lowerKeyword.includes('tutorial') || lowerKeyword.includes('guide')) {
            suggestions.push(`${keyword} in:readme`);
            suggestions.push(`${keyword} filename:README`);
        }

        // 添加awesome前缀建议
        suggestions.push(`awesome ${keyword}`);

        // 添加热门项目建议
        suggestions.push(`${keyword} stars:>500`);

        return suggestions.slice(0, 5); // 限制建议数量
    }

    // 检查是否为有效的GitHub用户名
    static isValidGitHubUsername(username) {
        if (!username) return false;
        
        // GitHub用户名规则：只能包含字母数字字符和连字符，不能以连字符开头或结尾，最长39个字符
        const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
        return regex.test(username);
    }

    // 美化数字显示
    static formatNumberDisplay(num) {
        if (!num) return '0';
        
        const number = parseInt(num);
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number.toString();
    }

    // 获取相对时间显示
    static getRelativeTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        const week = 7 * day;
        const month = 30 * day;
        const year = 365 * day;

        if (diff < minute) {
            return '刚刚';
        } else if (diff < hour) {
            return Math.floor(diff / minute) + ' 分钟前';
        } else if (diff < day) {
            return Math.floor(diff / hour) + ' 小时前';
        } else if (diff < week) {
            return Math.floor(diff / day) + ' 天前';
        } else if (diff < month) {
            return Math.floor(diff / week) + ' 周前';
        } else if (diff < year) {
            return Math.floor(diff / month) + ' 个月前';
        } else {
            return Math.floor(diff / year) + ' 年前';
        }
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.GitHubSearchBuilder = GitHubSearchBuilder;
    window.GitHubSearchUtils = GitHubSearchUtils;
}
