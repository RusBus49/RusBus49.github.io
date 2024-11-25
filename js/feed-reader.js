class FeedReader {
    constructor() {
        console.log('FeedReader initialized');
        this.feeds = [
            {
                "name": "Yahoo Finance",
                "url": "https://finance.yahoo.com/news/rssindex",
                "category": "finance"
            },
            {
                "name": "Bloomberg",
                "url": "https://feeds.bloomberg.com/markets/news.rss",
                "category": "finance"
            },
            {
                "name": "Y Combinator",
                "url": "https://news.ycombinator.com/rss",
                "category": "tech"
            },
            {
                "name": "TechCrunch",
                "url": "https://techcrunch.com/feed/",
                "category": "tech"
            },
        ];
        this.currentCategory = 'all';
        this.loadingState = document.getElementById('loadingState');
        this.feedItems = document.getElementById('feedItems');
        this.feedCategories = document.getElementById('feedCategories');
        
        this.itemsPerPage = 6;
        this.currentItems = [];
        this.currentPage = 1;

        this.init();
    }

    async init() {
        try {
            console.log('Starting initialization');
            this.setupCategories();
            await this.fetchAllFeeds();
        } catch (error) {
            console.error('Failed to initialize feed reader:', error);
        }
    }

    setupCategories() {
        console.log('Setting up categories');
        const categories = ['all', ...new Set(this.feeds.map(feed => feed.category))];
        
        const categoryHtml = categories.map(category => `
            <button 
                class="category-button ${category === 'all' ? 'active' : ''}"
                data-category="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
        `).join('');
        
        this.feedCategories.innerHTML = categoryHtml;
        
        this.feedCategories.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-button')) {
                this.filterByCategory(e.target.dataset.category);
                
                document.querySelectorAll('.category-button').forEach(btn => 
                    btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    async fetchFeed(feed) {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
            const data = await response.json();
            
            if (data.status === 'ok' && data.items) {
                return data.items.map(item => ({
                    title: item.title,
                    link: item.link,
                    description: item.description,
                    pubDate: new Date(item.pubDate),
                    source: feed.name,
                    category: feed.category
                }));
            }
            return [];
        } catch (error) {
            console.error(`Error fetching feed ${feed.name}:`, error);
            return [];
        }
    }

    async fetchAllFeeds() {
        console.log('Fetching all feeds');
        this.showLoading(true);
        
        try {
            const feedPromises = this.feeds.map(feed => this.fetchFeed(feed));
            const feedResults = await Promise.all(feedPromises);
            
            this.currentItems = feedResults
                .flat()
                .sort((a, b) => b.pubDate - a.pubDate);
            
            this.renderItems();
        } catch (error) {
            console.error('Error fetching feeds:', error);
            this.feedItems.innerHTML = `
                <div class="text-red-500 text-center py-4">
                    Failed to load feeds. Please try again later.
                </div>
            `;
        } finally {
            this.showLoading(false);
        }
    }

    renderItems() {
        console.log('Rendering items:', this.currentItems.length);
        const filteredItems = this.currentItems.filter(item => 
            this.currentCategory === 'all' || item.category === this.currentCategory
        );

        const itemsToShow = filteredItems.slice(0, this.itemsPerPage * this.currentPage);
        
        const html = itemsToShow.map(item => `
            <article class="feed-item">
                <div class="feed-item-content">
                    <div class="feed-item-header">
                        <span class="feed-source">${escapeHtml(item.source)}</span>
                        <span class="feed-date">${formatDate(item.pubDate)}</span>
                    </div>
                    <h3 class="feed-title">
                        <a href="${escapeHtml(item.link)}" target="_blank">
                            ${escapeHtml(item.title)}
                        </a>
                    </h3>
                    <p class="feed-description">
                        ${truncateText(stripHtml(item.description), 200)}
                    </p>
                </div>
            </article>
        `).join('');
        
        const showMoreButton = filteredItems.length > itemsToShow.length ? `
            <div class="show-more-container">
                <button class="show-more-button" onclick="window.feedReader.loadMore()">
                    Show More
                </button>
            </div>
        ` : '';

        this.feedItems.innerHTML = html || `
            <div class="text-center py-4">
                No items found for this category.
            </div>
        `;

        if (showMoreButton) {
            this.feedItems.insertAdjacentHTML('beforeend', showMoreButton);
        }
    }

    loadMore() {
        this.currentPage++;
        this.renderItems();
    }

    filterByCategory(category) {
        console.log('Filtering by category:', category);
        this.currentCategory = category;
        this.currentPage = 1; // Reset to first page when changing categories
        this.showLoading(true);
        this.fetchAllFeeds();
    }

    showLoading(show) {
        this.loadingState.classList.toggle('hidden', !show);
        this.feedItems.classList.toggle('hidden', show);
    }
}

// Initialize feed reader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing FeedReader');
    window.feedReader = new FeedReader();
});