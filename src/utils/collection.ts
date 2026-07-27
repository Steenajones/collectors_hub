export type CollectionType = 'owned' | 'wishlist' | 'selling'

export interface CollectionItem {
  id: string
  sourceId: string
  title: string
  category: string
  image: string
  dateAdded: string
  estimatedValue: number
  collection: CollectionType
}

export interface CollectionActionResult<T> {
  success: boolean
  message: string
  items: T
}

export function addCollectionItem(
  items: CollectionItem[],
  itemToAdd: CollectionItem,
): CollectionActionResult<CollectionItem[]> {
  const exists = items.some((item) => item.sourceId === itemToAdd.sourceId && item.collection === itemToAdd.collection)

  if (exists) {
    return {
      success: false,
      message: 'This item already exists in that collection.',
      items,
    }
  }

  return {
    success: true,
    message: `${itemToAdd.title} added to ${itemToAdd.collection}.`,
    items: [...items, itemToAdd],
  }
}

export function moveCollectionItem(
  items: CollectionItem[],
  itemId: string,
  collection: CollectionType,
): CollectionActionResult<CollectionItem[]> {
  const nextItems = items.map((item) =>
    item.id === itemId ? { ...item, collection } : item,
  )

  const movedItem = nextItems.find((item) => item.id === itemId)

  return {
    success: Boolean(movedItem),
    message: movedItem ? `Moved to ${collection}.` : 'Item not found.',
    items: nextItems,
  }
}

export function removeCollectionItem(
  items: CollectionItem[],
  itemId: string,
): CollectionActionResult<CollectionItem[]> {
  const nextItems = items.filter((item) => item.id !== itemId)

  return {
    success: nextItems.length < items.length,
    message: nextItems.length < items.length ? 'Item removed.' : 'Item not found.',
    items: nextItems,
  }
}
