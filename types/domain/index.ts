export type Tier = 'Beginner' | 'Good' | 'Elite' | 'Master' | 'Legendary';

export type Category = 'Dating' | 'Work' | 'Social' | 'Other';

export type ActivityCategory = 'First Impressions' | 'Dates & Hangouts' | 'Milestones & Intimacy' | 'Commitment & Special';

export interface ActivityDefinition {
  id: string;
  name: string;
  xp: number;
  description: string;
  category: ActivityCategory;
  icon: string;
}

export interface PersonActivity {
  activityId: string;
  activityName: string;
  claimedAt: string;
  note?: string;
  xpAwarded: number;
}

/**
 * Full Person record — PRIVATE DOMAIN ONLY.
 * Never imported into or rendered by features/friends or features/leaderboard.
 */
export interface Person {
  id: string;
  ownerId: string;
  name: string;
  photoUrl?: string;
  socialHandle?: string;
  dateFirstMet?: string;
  category?: Category;
  notes?: string;
  tier: Tier;
  xpFromPerson: number;
  activitiesClaimed: PersonActivity[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Narrow reference — SOCIAL DOMAIN ONLY.
 * Strictly strictly limited to the allow-list: Display name, Avatar, XP, Rank, optional badge.
 * Compile-time enforcement against private leaks.
 */
export interface SocialPersonRef {
  userId: string;
  displayName: string;
  username?: string;
  avatarUrl: string;
  totalXp: number;
  rank: number;
  achievementBadge?: string;
  isFollowing?: boolean;
  isMutual?: boolean;
  isBlocked?: boolean;
  requestStatus?: 'none' | 'pending_sent' | 'pending_received' | 'accepted';
  weeklyXp?: number;
  monthlyXp?: number;
}

export type FriendRequestStatus = 'pending' | 'accepted' | 'declined';

export interface FriendRequest {
  id: string;
  fromUserId: string;
  fromDisplayName: string;
  fromUsername: string;
  fromAvatarUrl: string;
  totalXp: number;
  rank?: number;
  badge?: string;
  status: FriendRequestStatus;
  createdAt: string;
}

export type AchievementCategory = 'milestone' | 'xp' | 'social' | 'collection' | 'special';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string;
  criteria: string;
  maxProgress: number;
  currentProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  category: AchievementCategory;
}

export type TimelineEventType =
  | 'person_added'
  | 'milestone_unlocked'
  | 'xp_earned'
  | 'note_memory'
  | 'tier_change'
  | 'achievement_unlocked';

export interface TimelineEvent {
  id: string;
  eventType: TimelineEventType;
  timestamp: string;
  personId?: string;
  personName?: string;
  personPhotoUrl?: string;
  activityName?: string;
  xpAwarded?: number;
  tier?: Tier;
  noteText?: string;
  achievementTitle?: string;
  achievementIcon?: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  username?: string;
  avatarUrl: string;
  totalXp: number;
  currentRank: number;
  leaderboardOptIn: boolean;
  allowFollowerXpView: boolean;
  createdAt: string;
  selectedAchievementBadge?: string;
}

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all-time' | 'friends';

export interface DashboardStats {
  totalXp: number;
  peopleCount: number;
  milestonesCount: number;
  leaderboardRank: number | null;
  tierDistribution: Record<Tier, number>;
  nextThresholdXp: number;
  prevThresholdXp: number;
}

export interface LogActivityPayload {
  activityId: string;
  dateOfActivity?: string;
  note?: string;
}

export interface LogActivityResponse {
  xpAwarded: number;
  newTotalXp: number;
  personUpdated: Person;
  achievementUnlocked?: Achievement;
}
