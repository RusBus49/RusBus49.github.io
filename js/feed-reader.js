console.log('Feed reader script loaded');

class FeedReader {
    constructor() {
        console.log('FeedReader initialized');
        this.feeds = [];
        this.currentCategory = 'all';
        this.loadingState = document.getElementById('loadingState');
        this.feedItems = document.getElementById('feedItems');
        this.feedCategories = document.getElementById('feedCategories');
        
        this.init();
    }

    async init() {
        try {
            console.log('Starting initialization');
            await this.loadFeeds();
            this.setupCategories();
            this.fetchAllFeeds();
        } catch (error) {
            console.error('Failed to initialize feed reader:', error);
        }
    }

    async loadFeeds() {
        try {
            console.log('Loading feeds from JSON');
            const response = await fetch('data/feeds.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.feeds = data.feeds;
            console.log('Loaded feeds:', this.feeds);
        } catch (error) {
            console.error('Error loading feeds:', error);
            this.feeds = [];
        }
    }

    setupCategories() {
        console.log('Setting up categories');
        // Get unique categories
        const categories = ['all', ...new Set(this.feeds.map(feed => feed.category))];
        
        // Create category buttons
        const categoryHtml = categories.map(category => `
            <button 
                class="category-button ${category === 'all' ? 'active' : ''}"
                data-category="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
        `).join('');
        
        this.feedCategories.innerHTML = categoryHtml;
        console.log('Categories setup complete');
        
        // Add event listeners
        this.feedCategories.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-button')) {
                this.filterByCategory(e.target.dataset.category);
                
                // Update active state
                document.querySelectorAll('.category-button').forEach(btn => 
                    btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    async fetchAllFeeds() {
        console.log('Fetching all feeds');
        this.showLoading(true);
        
        try {
            const parser = new DOMParser();
            const allItems = [];
            
            for (const feed of this.feeds) {
                try {
                    console.log(`Fetching feed: ${feed.name}`);
                    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`);
                    const data = await response.json();
                    
                    if (data.contents) {
                        const doc = parser.parseFromString(data.contents, 'text/xml');
                        const items = Array.from(doc.querySelectorAll('item'));
                        
                        items.forEach(item => {
                            allItems.push({
                                title: item.querySelector('title')?.textContent || 'No title',
                                link: item.querySelector('link')?.textContent || '#',
                                description: item.querySelector('description')?.textContent || '',
                                pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now()),
                                source: feed.name,
                                category: feed.category
                            });
                        });
                    }
                } catch (error) {
                    console.error(`Error fetching feed ${feed.name}:`, error);
                }
            }
            
            // Sort by date
            allItems.sort((a, b) => b.pubDate - a.pubDate);
            
            this.renderItems(allItems);
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

    renderItems(items) {
        console.log('Rendering items:', items.length);
        const html = items
            .filter(item => this.currentCategory === 'all' || item.category === this.currentCategory)
            .map(item => `
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
            
        this.feedItems.innerHTML = html || `
            <div class="text-center py-4">
                No items found for this category.
            </div>
        `;
    }

    filterByCategory(category) {
        console.log('Filtering by category:', category);
        this.currentCategory = category;
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