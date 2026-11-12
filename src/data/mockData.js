export const demoUser = { id: 'user_1', name: 'Alex Morgan', email: 'alex@example.com', role: 'admin', interests: ['Design', 'Reading', 'Productivity'] }

export const initialNotes = [
  { id: 'note_1', title: 'Ideas for the next sprint', content: 'Keep onboarding focused on one clear success moment. Remove the extra confirmation step and measure completion.', color: 'violet', owner: demoUser, createdAt: '2026-11-12T08:40:00Z', updatedAt: '2026-11-12T08:40:00Z' },
  { id: 'note_2', title: 'Books to revisit', content: 'The Design of Everyday Things\nThinking in Systems\nOn Writing Well', color: 'amber', owner: demoUser, createdAt: '2026-11-10T10:20:00Z', updatedAt: '2026-11-11T06:15:00Z' },
  { id: 'note_3', title: 'Interview checklist', content: 'Review indexing decisions, aggregation pipelines, auth flow, and deployment configuration.', color: 'sky', owner: demoUser, createdAt: '2026-11-09T13:05:00Z', updatedAt: '2026-11-09T13:05:00Z' },
  { id: 'note_4', title: 'Small wins', content: 'Shipped the dashboard. Wrote tests. Took an actual lunch break.', color: 'emerald', owner: demoUser, createdAt: '2026-11-07T09:00:00Z', updatedAt: '2026-11-08T16:45:00Z' },
]

export const initialUsers = [
  demoUser,
  { id: 'user_2', name: 'Maya Chen', email: 'maya@example.com', role: 'user', interests: ['Reading', 'Travel'] },
  { id: 'user_3', name: 'Noah Williams', email: 'noah@example.com', role: 'user', interests: ['Chess', 'Technology'] },
  { id: 'user_4', name: 'Samira Khan', email: 'samira@example.com', role: 'user', interests: ['Design', 'Photography'] },
  { id: 'user_5', name: 'Liam Carter', email: 'liam@example.com', role: 'user', interests: ['Chess', 'Reading'] },
]

export const initialPosts = [
  { id: 'post_1', author: initialUsers[1], content: 'A quiet morning, a blank page, and enough coffee. My favorite way to begin.', createdAt: '2026-11-12T07:20:00Z', likes: 18 },
  { id: 'post_2', author: initialUsers[2], content: 'Today I learned that a good index is as much about what you leave out as what you add.', createdAt: '2026-11-11T15:10:00Z', likes: 31 },
  { id: 'post_3', author: demoUser, content: 'Turning scattered thoughts into something useful, one small note at a time.', createdAt: '2026-11-10T12:45:00Z', likes: 24 },
]
