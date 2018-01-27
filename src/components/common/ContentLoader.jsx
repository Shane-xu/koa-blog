import React from 'react'
import ContentLoader, { List } from 'react-content-loader'

export const ListLoader = props => <List style={props.style} />

export const BulletListLoader = props => (
  <ContentLoader {...props}>
    <circle cx="15" cy="20" r="4" />
    <rect x="30" y="16" rx="5" ry="5" width="220" height="8" />
    <circle cx="15" cy="40" r="4" />
    <rect x="30" y="36" rx="5" ry="5" width="220" height="8" />
    <circle cx="15" cy="60" r="4" />
    <rect x="30" y="56" rx="5" ry="5" width="220" height="8" />
    <circle cx="15" cy="80" r="4" />
    <rect x="30" y="76" rx="5" ry="5" width="220" height="8" />
  </ContentLoader>
)
