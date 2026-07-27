import { describe, expect, it } from 'vitest'
import { addCollectionItem, moveCollectionItem, removeCollectionItem } from './utils/collection'

describe('collection helpers', () => {
  it('prevents duplicate items in the same collection', () => {
    const existing = [
      {
        id: '1',
        sourceId: 'listing-1',
        title: 'Vintage Camera',
        category: 'Photography',
        image: 'camera.jpg',
        dateAdded: '2026-07-20',
        estimatedValue: 1200,
        collection: 'owned' as const,
      },
    ]

    const result = addCollectionItem(existing, {
      id: '2',
      sourceId: 'listing-1',
      title: 'Vintage Camera',
      category: 'Photography',
      image: 'camera.jpg',
      dateAdded: '2026-07-21',
      estimatedValue: 1250,
      collection: 'owned' as const,
    })

    expect(result.success).toBe(false)
    expect(result.message).toContain('already exists')
  })

  it('moves an item between collections and removes it from the original one', () => {
    const items = [
      {
        id: '1',
        sourceId: 'listing-1',
        title: 'Vintage Camera',
        category: 'Photography',
        image: 'camera.jpg',
        dateAdded: '2026-07-20',
        estimatedValue: 1200,
        collection: 'owned' as const,
      },
    ]

    const result = moveCollectionItem(items, '1', 'wishlist')

    expect(result.success).toBe(true)
    expect(result.items).toHaveLength(1)
    expect(result.items[0].collection).toBe('wishlist')
  })

  it('removes an item from a collection', () => {
    const items = [
      {
        id: '1',
        sourceId: 'listing-1',
        title: 'Vintage Camera',
        category: 'Photography',
        image: 'camera.jpg',
        dateAdded: '2026-07-20',
        estimatedValue: 1200,
        collection: 'owned' as const,
      },
    ]

    const result = removeCollectionItem(items, '1')

    expect(result.success).toBe(true)
    expect(result.items).toHaveLength(0)
  })
})
