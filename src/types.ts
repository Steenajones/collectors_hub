export interface MarketplaceItem {
  id: string
  title: string
  category: string
  condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair'
  price: number
  seller: string
  location: string
  image: string
  description: string
  dateAdded: string
}

export interface CommunityPost {
  id: string
  user: string
  avatar: string
  title: string
  category: string
  image: string
  caption: string
  likes: number
  comments: number
  saved: boolean
}
