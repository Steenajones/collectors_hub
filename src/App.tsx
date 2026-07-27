import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { communityPosts as initialCommunityPosts, marketplaceItems as initialMarketplaceItems } from './data'
import type { CommunityPost, MarketplaceItem } from './types'
import { addCollectionItem, moveCollectionItem, removeCollectionItem, type CollectionItem, type CollectionType } from './utils/collection'

const collectionNames: Record<CollectionType, string> = {
  owned: 'Owned',
  wishlist: 'Wishlist',
  selling: 'Selling',
}

function AppContent() {
  const [marketplaceItems] = useState<MarketplaceItem[]>(initialMarketplaceItems)
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(initialCommunityPosts)
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([
    {
      id: 'col-1',
      sourceId: 'listing-1',
      title: 'Vintage Leica Camera',
      category: 'Photography',
      image: initialMarketplaceItems[0].image,
      dateAdded: '2026-07-20',
      estimatedValue: 2400,
      collection: 'owned',
    },
    {
      id: 'col-2',
      sourceId: 'listing-2',
      title: 'Mid-Century Lamp',
      category: 'Decor',
      image: initialMarketplaceItems[1].image,
      dateAdded: '2026-07-18',
      estimatedValue: 900,
      collection: 'wishlist',
    },
    {
      id: 'col-3',
      sourceId: 'listing-3',
      title: 'Baseball Card Binder',
      category: 'Sports',
      image: initialMarketplaceItems[2].image,
      dateAdded: '2026-07-22',
      estimatedValue: 180,
      collection: 'selling',
    },
  ])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCondition, setSelectedCondition] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [activeCollection, setActiveCollection] = useState<CollectionType | 'all'>('all')
  const [feedback, setFeedback] = useState('')
  const [loading] = useState(false)
  const [error] = useState('')

  useEffect(() => {
    const stored = window.localStorage.getItem('collector-hub-data')
    if (stored) {
      const parsed = JSON.parse(stored) as {
        collectionItems?: CollectionItem[]
        communityPosts?: CommunityPost[]
      }
      if (parsed.collectionItems) setCollectionItems(parsed.collectionItems)
      if (parsed.communityPosts) setCommunityPosts(parsed.communityPosts)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('collector-hub-data', JSON.stringify({ collectionItems, communityPosts }))
  }, [collectionItems, communityPosts])

  const filteredMarketplace = useMemo(() => {
    const term = search.trim().toLowerCase()
    const next = marketplaceItems.filter((item) => {
      const matchesSearch = !term || item.title.toLowerCase().includes(term)
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition
      return matchesSearch && matchesCategory && matchesCondition
    })

    return [...next].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    })
  }, [marketplaceItems, search, selectedCategory, selectedCondition, sortBy])

  const filteredCommunity = useMemo(() => {
    const term = search.trim().toLowerCase()
    return communityPosts.filter((post) => {
      const matchesSearch = !term || post.title.toLowerCase().includes(term) || post.caption.toLowerCase().includes(term)
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [communityPosts, search, selectedCategory])

  const filteredCollection = useMemo(() => {
    const term = search.trim().toLowerCase()
    return collectionItems.filter((item) => {
      const matchesCollection = activeCollection === 'all' || item.collection === activeCollection
      const matchesSearch = !term || item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term)
      return matchesCollection && matchesSearch
    })
  }, [collectionItems, search, activeCollection])

  const handleAddToCollection = (item: MarketplaceItem) => {
    const result = addCollectionItem(collectionItems, {
      id: `${item.id}-${Date.now()}`,
      sourceId: item.id,
      title: item.title,
      category: item.category,
      image: item.image,
      dateAdded: new Date().toISOString().slice(0, 10),
      estimatedValue: Math.round(item.price * 1.35),
      collection: 'owned',
    })

    setFeedback(result.message)
    if (result.success) setCollectionItems(result.items)
  }

  const handleToggleLike = (postId: string) => {
    setCommunityPosts((posts) => posts.map((post) => post.id === postId ? { ...post, likes: post.likes + 1 } : post))
  }

  const handleToggleSave = (postId: string) => {
    setCommunityPosts((posts) => posts.map((post) => post.id === postId ? { ...post, saved: !post.saved } : post))
  }

  const handleMoveItem = (itemId: string, nextCollection: CollectionType) => {
    const result = moveCollectionItem(collectionItems, itemId, nextCollection)
    setFeedback(result.message)
    setCollectionItems(result.items)
  }

  const handleRemoveItem = (itemId: string) => {
    const result = removeCollectionItem(collectionItems, itemId)
    setFeedback(result.message)
    setCollectionItems(result.items)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Collector&apos;s Hub</p>
          <h1>Track, discover, and share rare finds.</h1>
        </div>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>Marketplace</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/collection">My Collection</NavLink>
        </nav>
      </header>

      {feedback ? <div className="feedback-banner">{feedback}</div> : null}

      <main className="content-grid">
        <section className="sidebar-card">
          <h2>Collector snapshot</h2>
          <div className="stats-grid">
            <div>
              <strong>{marketplaceItems.length}</strong>
              <span>Listings</span>
            </div>
            <div>
              <strong>{communityPosts.length}</strong>
              <span>Posts</span>
            </div>
            <div>
              <strong>{collectionItems.filter((item) => item.collection === 'owned').length}</strong>
              <span>Owned</span>
            </div>
          </div>
          <div className="sidebar-card__footer">
            <p>Thoughtful collection management, built for passionate collectors.</p>
          </div>
        </section>

        <section className="main-panel">
          <Routes>
            <Route
              path="/"
              element={
                <MarketplacePage
                  items={filteredMarketplace}
                  search={search}
                  onSearchChange={setSearch}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedCondition={selectedCondition}
                  onConditionChange={setSelectedCondition}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onAddToCollection={handleAddToCollection}
                  loading={loading}
                  error={error}
                />
              }
            />
            <Route
              path="/community"
              element={
                <CommunityPage
                  posts={filteredCommunity}
                  search={search}
                  onSearchChange={setSearch}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  onToggleLike={handleToggleLike}
                  onToggleSave={handleToggleSave}
                  loading={loading}
                  error={error}
                />
              }
            />
            <Route
              path="/collection"
              element={
                <CollectionPage
                  items={filteredCollection}
                  search={search}
                  onSearchChange={setSearch}
                  activeCollection={activeCollection}
                  onCollectionChange={setActiveCollection}
                  onMoveItem={handleMoveItem}
                  onRemoveItem={handleRemoveItem}
                  loading={loading}
                  error={error}
                />
              }
            />
          </Routes>
        </section>
      </main>
    </div>
  )
}

function MarketplacePage({
  items,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCondition,
  onConditionChange,
  sortBy,
  onSortChange,
  onAddToCollection,
  loading,
  error,
}: {
  items: MarketplaceItem[]
  search: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedCondition: string
  onConditionChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  onAddToCollection: (item: MarketplaceItem) => void
  loading: boolean
  error: string
}) {
  const categories = ['All', ...new Set(initialMarketplaceItems.map((item) => item.category))]

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">Marketplace</p>
          <h2>Discover pieces that fit your taste.</h2>
        </div>
        <Link to="/collection" className="ghost-button">View collection</Link>
      </div>
      <div className="filters">
        <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search marketplace" />
        <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select value={selectedCondition} onChange={(event) => onConditionChange(event.target.value)}>
          {['All', 'Excellent', 'Very Good', 'Good', 'Fair'].map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="newest">Newest</option>
          <option value="price">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? <div className="empty-state">Loading listings…</div> : null}
      {error ? <div className="empty-state">{error}</div> : null}

      {!loading && !error && items.length === 0 ? (
        <div className="empty-state">No listings match your current search. Try broadening your filters.</div>
      ) : null}

      <div className="card-grid">
        {items.map((item) => (
          <article key={item.id} className="card">
            <img src={item.image} alt={item.title} />
            <div className="card-body">
              <div className="card-topline">
                <span>{item.category}</span>
                <span>{item.condition}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="meta-row">
                <span>${item.price}</span>
                <span>{item.seller}</span>
              </div>
              <div className="meta-row muted">
                <span>{item.location}</span>
                <span>{item.dateAdded}</span>
              </div>
              <div className="card-actions">
                <button type="button" onClick={() => onAddToCollection(item)}>
                  Add to Collection
                </button>
                <button type="button" className="secondary">
                  View Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function CommunityPage({
  posts,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onToggleLike,
  onToggleSave,
  loading,
  error,
}: {
  posts: CommunityPost[]
  search: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  onToggleLike: (id: string) => void
  onToggleSave: (id: string) => void
  loading: boolean
  error: string
}) {
  const categories = ['All', ...new Set(initialMarketplaceItems.map((item) => item.category))]

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">Community Feed</p>
          <h2>See what other collectors are sharing.</h2>
        </div>
      </div>
      <div className="filters">
        <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search posts" />
        <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading ? <div className="empty-state">Loading feed…</div> : null}
      {error ? <div className="empty-state">{error}</div> : null}
      {!loading && !error && posts.length === 0 ? (
        <div className="empty-state">No posts match your current search. Try another term.</div>
      ) : null}

      <div className="feed-list">
        {posts.map((post) => (
          <article key={post.id} className="feed-card">
            <div className="feed-user">
              <img src={post.avatar} alt={post.user} />
              <div>
                <strong>{post.user}</strong>
                <p>{post.title}</p>
              </div>
            </div>
            <img src={post.image} alt={post.title} className="feed-image" />
            <div className="card-body">
              <p>{post.caption}</p>
              <div className="meta-row muted">
                <span>♥ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
              <div className="card-actions">
                <button type="button" onClick={() => onToggleLike(post.id)}>Like</button>
                <button type="button" className="secondary" onClick={() => onToggleSave(post.id)}>
                  {post.saved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function CollectionPage({
  items,
  search,
  onSearchChange,
  activeCollection,
  onCollectionChange,
  onMoveItem,
  onRemoveItem,
  loading,
  error,
}: {
  items: CollectionItem[]
  search: string
  onSearchChange: (value: string) => void
  activeCollection: CollectionType | 'all'
  onCollectionChange: (value: CollectionType | 'all') => void
  onMoveItem: (itemId: string, collection: CollectionType) => void
  onRemoveItem: (itemId: string) => void
  loading: boolean
  error: string
}) {
  const collections: Array<{ value: CollectionType | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'owned', label: collectionNames.owned },
    { value: 'wishlist', label: collectionNames.wishlist },
    { value: 'selling', label: collectionNames.selling },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">My Collection</p>
          <h2>Organize your favorite pieces.</h2>
        </div>
      </div>
      <div className="filters">
        <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search collection" />
        <select value={activeCollection} onChange={(event) => onCollectionChange(event.target.value as CollectionType | 'all')}>
          {collections.map((collection) => (
            <option key={collection.value} value={collection.value}>
              {collection.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? <div className="empty-state">Loading collection…</div> : null}
      {error ? <div className="empty-state">{error}</div> : null}
      {!loading && !error && items.length === 0 ? (
        <div className="empty-state">Your collection is empty. Add a few listings and they will appear here.</div>
      ) : null}

      <div className="card-grid">
        {items.map((item) => (
          <article key={item.id} className="card">
            <img src={item.image} alt={item.title} />
            <div className="card-body">
              <div className="card-topline">
                <span>{item.category}</span>
                <span>{collectionNames[item.collection]}</span>
              </div>
              <h3>{item.title}</h3>
              <div className="meta-row muted">
                <span>Added {item.dateAdded}</span>
                <span>Est. ${item.estimatedValue}</span>
              </div>
              <div className="card-actions">
                <select value={item.collection} onChange={(event) => onMoveItem(item.id, event.target.value as CollectionType)}>
                  <option value="owned">Owned</option>
                  <option value="wishlist">Wishlist</option>
                  <option value="selling">Selling</option>
                </select>
                <button type="button" className="secondary" onClick={() => onRemoveItem(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function App() {
  return <AppContent />
}

export default App
