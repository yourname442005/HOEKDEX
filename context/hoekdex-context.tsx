'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Person,
  User,
  Achievement,
  TimelineEvent,
  SocialPersonRef,
  FriendRequest,
  Tier,
  LeaderboardPeriod,
  DashboardStats,
  LogActivityPayload,
  LogActivityResponse,
} from '@/types/domain';
import {
  INITIAL_USER,
  INITIAL_PEOPLE,
  INITIAL_TIMELINE,
  INITIAL_FRIENDS,
  INITIAL_FRIEND_REQUESTS,
  MOCK_SEARCHABLE_USERS,
} from '@/lib/mock-data';
import { INITIAL_ACHIEVEMENTS, STANDARD_ACTIVITIES } from '@/lib/constants';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface HoekdexContextType {
  user: User;
  people: Person[];
  achievements: Achievement[];
  timeline: TimelineEvent[];
  friends: SocialPersonRef[];
  friendRequests: FriendRequest[];
  pendingRequestsCount: number;
  leaderboard: Record<LeaderboardPeriod, SocialPersonRef[]>;
  dashboardStats: DashboardStats;
  recentXpGain: { amount: number; key: number } | null;
  achievementModalPayload: Achievement | null;
  toasts: ToastItem[];
  themeMode: 'dark' | 'light' | 'system';
  resolvedTheme: 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light' | 'system') => void;
  
  // Actions
  addPerson: (data: {
    name: string;
    photoUrl?: string;
    socialHandle?: string;
    dateFirstMet?: string;
    category?: Person['category'];
    notes?: string;
    tier?: Tier;
  }) => Promise<Person>;
  
  updatePerson: (id: string, updates: Partial<Person>) => Promise<Person>;
  deletePerson: (id: string) => Promise<void>;
  updatePersonTier: (id: string, tier: Tier) => Promise<void>;
  
  logActivity: (personId: string, payload: LogActivityPayload) => Promise<LogActivityResponse>;
  
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  blockUser: (userId: string) => Promise<void>;
  reportUser: (userId: string, reason: string, note?: string) => Promise<void>;
  
  // Friend Request Actions
  sendFriendRequest: (userIdOrUsername: string) => Promise<{ success: boolean; message: string }>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  declineFriendRequest: (requestId: string) => Promise<void>;
  searchUsers: (query: string) => SocialPersonRef[];
  
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  updatePrivacySettings: (settings: { leaderboardOptIn?: boolean; allowFollowerXpView?: boolean }) => Promise<void>;
  
  exportData: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  
  showToast: (message: string, type?: 'success' | 'error' | 'info', action?: { label: string; onClick: () => void }) => void;
  removeToast: (id: string) => void;
  closeAchievementModal: () => void;
  showAchievementUnlock: (achievement: Achievement) => void;
  resetToDefaults: () => void;
}

const HoekdexContext = createContext<HoekdexContextType | null>(null);

const STORAGE_PREFIX = 'hoekdex_mvp_v1_';

export function HoekdexProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded: isClerkLoaded, user: clerkUser } = useUser();

  const [user, setUser] = useState<User>(INITIAL_USER);
  const [people, setPeople] = useState<Person[]>(INITIAL_PEOPLE);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE);
  const [friends, setFriends] = useState<SocialPersonRef[]>(INITIAL_FRIENDS);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(INITIAL_FRIEND_REQUESTS);
  
  const [recentXpGain, setRecentXpGain] = useState<{ amount: number; key: number } | null>(null);
  const [achievementModalPayload, setAchievementModalPayload] = useState<Achievement | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [themeMode, setThemeModeState] = useState<'dark' | 'light' | 'system'>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage & sync with Clerk identity
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedTheme = localStorage.getItem(`${STORAGE_PREFIX}theme_mode`) as 'dark' | 'light' | 'system' | null;
        if (savedTheme && ['dark', 'light', 'system'].includes(savedTheme)) {
          setThemeModeState(savedTheme);
        }

        const userPrefix = clerkUser ? `${STORAGE_PREFIX}${clerkUser.id}_` : STORAGE_PREFIX;
        const savedUser = localStorage.getItem(`${userPrefix}user`);
        const savedPeople = localStorage.getItem(`${userPrefix}people`);
        const savedAchievements = localStorage.getItem(`${userPrefix}achievements`);
        const savedTimeline = localStorage.getItem(`${userPrefix}timeline`);
        const savedFriends = localStorage.getItem(`${userPrefix}friends`);
        const savedRequests = localStorage.getItem(`${userPrefix}friend_requests`);

        const baseUser: User = savedUser ? JSON.parse(savedUser) : INITIAL_USER;

        if (clerkUser) {
          const email = clerkUser.primaryEmailAddress?.emailAddress || baseUser.email;
          const displayName =
            clerkUser.fullName ||
            clerkUser.firstName ||
            baseUser.displayName ||
            'Explorer';
          const username =
            clerkUser.username ||
            baseUser.username ||
            email.split('@')[0];
          const avatarUrl = clerkUser.imageUrl || baseUser.avatarUrl;

          setUser({
            ...baseUser,
            id: clerkUser.id,
            clerkId: clerkUser.id,
            email,
            displayName,
            username,
            avatarUrl,
          });
        } else if (savedUser) {
          setUser(baseUser);
        }

        if (savedPeople) setPeople(JSON.parse(savedPeople));
        if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
        if (savedTimeline) setTimeline(JSON.parse(savedTimeline));
        if (savedFriends) setFriends(JSON.parse(savedFriends));
        if (savedRequests) setFriendRequests(JSON.parse(savedRequests));
      } catch (e) {
        console.error('Failed loading saved Hoekdex data:', e);
      }
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [isClerkLoaded, clerkUser]);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const keyPrefix = user.clerkId ? `${STORAGE_PREFIX}${user.clerkId}_` : STORAGE_PREFIX;
      localStorage.setItem(`${keyPrefix}user`, JSON.stringify(user));
      localStorage.setItem(`${keyPrefix}people`, JSON.stringify(people));
      localStorage.setItem(`${keyPrefix}achievements`, JSON.stringify(achievements));
      localStorage.setItem(`${keyPrefix}timeline`, JSON.stringify(timeline));
      localStorage.setItem(`${keyPrefix}friends`, JSON.stringify(friends));
      localStorage.setItem(`${keyPrefix}friend_requests`, JSON.stringify(friendRequests));
      localStorage.setItem(`${STORAGE_PREFIX}theme_mode`, themeMode);
    } catch (e) {
      console.error('Failed saving Hoekdex state:', e);
    }
  }, [user, people, achievements, timeline, friends, friendRequests, themeMode, isHydrated]);

  // Sync theme mode to DOM classes
  useEffect(() => {
    const applyTheme = () => {
      let isDark = true;
      if (themeMode === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        isDark = themeMode === 'dark';
      }

      setResolvedTheme(isDark ? 'dark' : 'light');

      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };

    applyTheme();

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [themeMode]);

  const setThemeMode = useCallback((mode: 'dark' | 'light' | 'system') => {
    setThemeModeState(mode);
  }, []);

  const showToast = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    action?: { label: string; onClick: () => void }
  ) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type, action }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const closeAchievementModal = useCallback(() => {
    setAchievementModalPayload(null);
  }, []);

  const showAchievementUnlock = useCallback((achievement: Achievement) => {
    setAchievementModalPayload(achievement);
  }, []);

  // Compute tier distribution
  const tierDistribution: Record<Tier, number> = {
    Beginner: 0,
    Good: 0,
    Elite: 0,
    Master: 0,
    Legendary: 0,
  };
  people.forEach((p) => {
    if (tierDistribution[p.tier] !== undefined) {
      tierDistribution[p.tier] += 1;
    }
  });

  const totalMilestonesCount = people.reduce((acc, p) => acc + p.activitiesClaimed.length, 0);

  // Compute next threshold
  let prevThresholdXp = 0;
  let nextThresholdXp = 100;
  if (user.totalXp >= 5000) {
    prevThresholdXp = 5000;
    nextThresholdXp = 10000;
  } else if (user.totalXp >= 1000) {
    prevThresholdXp = 1000;
    nextThresholdXp = 5000;
  } else if (user.totalXp >= 100) {
    prevThresholdXp = 100;
    nextThresholdXp = 1000;
  }

  // Leaderboard computations for all periods
  const currentUserSocialRef: SocialPersonRef = {
    userId: user.id,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    totalXp: user.totalXp,
    weeklyXp: Math.min(user.totalXp, 325),
    monthlyXp: Math.min(user.totalXp, 575),
    rank: user.currentRank,
    achievementBadge: user.selectedAchievementBadge,
    isFollowing: false,
    isMutual: false,
  };

  const getRankedPool = (period: LeaderboardPeriod): SocialPersonRef[] => {
    if (!user.leaderboardOptIn) {
      return [];
    }

    let pool: SocialPersonRef[] = [];
    if (period === 'friends') {
      pool = friends.filter((f) => f.isMutual && !f.isBlocked);
    } else {
      pool = friends.filter((f) => !f.isBlocked);
    }

    const fullList = [...pool, currentUserSocialRef];

    // Sort based on period
    fullList.sort((a, b) => {
      if (period === 'weekly') {
        return (b.weeklyXp ?? b.totalXp) - (a.weeklyXp ?? a.totalXp);
      }
      if (period === 'monthly') {
        return (b.monthlyXp ?? b.totalXp) - (a.monthlyXp ?? a.totalXp);
      }
      return b.totalXp - a.totalXp;
    });

    // Assign ranking numbers
    return fullList.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  };

  const leaderboard: Record<LeaderboardPeriod, SocialPersonRef[]> = {
    weekly: getRankedPool('weekly'),
    monthly: getRankedPool('monthly'),
    'all-time': getRankedPool('all-time'),
    friends: getRankedPool('friends'),
  };

  const currentRankInWeekly = leaderboard.weekly.find((r) => r.userId === user.id)?.rank ?? null;

  const dashboardStats: DashboardStats = {
    totalXp: user.totalXp,
    peopleCount: people.length,
    milestonesCount: totalMilestonesCount,
    leaderboardRank: user.leaderboardOptIn ? currentRankInWeekly : null,
    tierDistribution,
    nextThresholdXp,
    prevThresholdXp,
  };

  // Check achievements against current stats
  const evaluateAchievements = (
    newTotalXp: number,
    newPeopleCount: number,
    hasLegendary: boolean,
    totalMilestones: number
  ): Achievement | undefined => {
    let unlockedTarget: Achievement | undefined;

    setAchievements((prevAchievements) =>
      prevAchievements.map((ach) => {
        if (ach.isUnlocked) return ach;

        let newProgress = ach.currentProgress;
        let shouldUnlock = false;

        if (ach.id === 'first_entry' && newPeopleCount >= 1) {
          newProgress = 1;
          shouldUnlock = true;
        } else if (ach.id === 'first_date_logged' && totalMilestones >= 1) {
          newProgress = 1;
          shouldUnlock = true;
        } else if (ach.id === 'xp_100') {
          newProgress = Math.min(ach.maxProgress, newTotalXp);
          shouldUnlock = newTotalXp >= 100;
        } else if (ach.id === 'xp_1000') {
          newProgress = Math.min(ach.maxProgress, newTotalXp);
          shouldUnlock = newTotalXp >= 1000;
        } else if (ach.id === 'xp_5000') {
          newProgress = Math.min(ach.maxProgress, newTotalXp);
          shouldUnlock = newTotalXp >= 5000;
        } else if (ach.id === 'ten_people_added') {
          newProgress = Math.min(ach.maxProgress, newPeopleCount);
          shouldUnlock = newPeopleCount >= 10;
        } else if (ach.id === 'legendary_added' && hasLegendary) {
          newProgress = 1;
          shouldUnlock = true;
        }

        if (shouldUnlock && !ach.isUnlocked) {
          const unlockedItem: Achievement = {
            ...ach,
            currentProgress: ach.maxProgress,
            isUnlocked: true,
            unlockedAt: new Date().toISOString(),
          };
          if (!unlockedTarget) {
            unlockedTarget = unlockedItem;
          }
          return unlockedItem;
        }

        return { ...ach, currentProgress: newProgress };
      })
    );

    return unlockedTarget;
  };

  // Add Person Action
  const addPerson = async (data: {
    name: string;
    photoUrl?: string;
    socialHandle?: string;
    dateFirstMet?: string;
    category?: Person['category'];
    notes?: string;
    tier?: Tier;
  }): Promise<Person> => {
    const newId = `person_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const newPerson: Person = {
      id: newId,
      ownerId: user.id,
      name: data.name.trim(),
      photoUrl: data.photoUrl || `https://picsum.photos/seed/${encodeURIComponent(data.name)}/400/400`,
      socialHandle: data.socialHandle?.trim(),
      dateFirstMet: data.dateFirstMet || new Date().toISOString().split('T')[0],
      category: data.category || 'Dating',
      notes: data.notes?.trim() || '',
      tier: data.tier || 'Beginner',
      xpFromPerson: 0,
      activitiesClaimed: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextPeople = [newPerson, ...people];
    setPeople(nextPeople);

    // Add Timeline Event
    const timelineEvt: TimelineEvent = {
      id: `evt_${Date.now()}`,
      eventType: 'person_added',
      timestamp: new Date().toISOString(),
      personId: newPerson.id,
      personName: newPerson.name,
      personPhotoUrl: newPerson.photoUrl,
      tier: newPerson.tier,
    };
    setTimeline((prev) => [timelineEvt, ...prev]);

    // Check achievement for 1st person or 10 people or legendary
    const hasLegendary = nextPeople.some((p) => p.tier === 'Legendary');
    const unlocked = evaluateAchievements(
      user.totalXp,
      nextPeople.length,
      hasLegendary,
      totalMilestonesCount
    );

    if (unlocked) {
      setTimeout(() => {
        setAchievementModalPayload(unlocked);
      }, 300);
    }

    showToast(`Added ${newPerson.name} to your private collection!`, 'success');
    return newPerson;
  };

  // Update Person Action
  const updatePerson = async (id: string, updates: Partial<Person>): Promise<Person> => {
    let updatedTarget: Person | null = null;
    const nextPeople = people.map((p) => {
      if (p.id === id) {
        const updated = {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        updatedTarget = updated;
        return updated;
      }
      return p;
    });

    if (!updatedTarget) throw new Error('Person not found');
    setPeople(nextPeople);
    showToast(`Updated details for ${(updatedTarget as Person).name}`, 'success');
    return updatedTarget;
  };

  // Delete Person Action
  const deletePerson = async (id: string): Promise<void> => {
    const target = people.find((p) => p.id === id);
    if (!target) return;

    setPeople((prev) => prev.filter((p) => p.id !== id));
    // Remove timeline events referencing this person
    setTimeline((prev) => prev.filter((e) => e.personId !== id));

    showToast(`Removed ${target.name} from your collection`, 'info');
  };

  // Update Person Tier Action
  const updatePersonTier = async (id: string, tier: Tier): Promise<void> => {
    const target = people.find((p) => p.id === id);
    if (!target) return;

    const nextPeople = people.map((p) => (p.id === id ? { ...p, tier, updatedAt: new Date().toISOString() } : p));
    setPeople(nextPeople);

    // Add Tier change timeline event
    const timelineEvt: TimelineEvent = {
      id: `evt_${Date.now()}`,
      eventType: 'tier_change',
      timestamp: new Date().toISOString(),
      personId: target.id,
      personName: target.name,
      personPhotoUrl: target.photoUrl,
      tier,
    };
    setTimeline((prev) => [timelineEvt, ...prev]);

    // Check achievement if changed to Legendary
    const hasLegendary = nextPeople.some((p) => p.tier === 'Legendary');
    const unlocked = evaluateAchievements(
      user.totalXp,
      nextPeople.length,
      hasLegendary,
      totalMilestonesCount
    );

    if (unlocked) {
      setTimeout(() => {
        setAchievementModalPayload(unlocked);
      }, 300);
    }

    showToast(`Tier updated to ${tier}`, 'success');
  };

  // Log Activity Action (Awards XP, updates person & user total XP, checks achievements)
  const logActivity = async (personId: string, payload: LogActivityPayload): Promise<LogActivityResponse> => {
    const targetPerson = people.find((p) => p.id === personId);
    if (!targetPerson) {
      showToast('Could not log activity. Person not found.', 'error');
      throw new Error('Person not found');
    }

    // Check if already claimed
    const isAlreadyClaimed = targetPerson.activitiesClaimed.some((a) => a.activityId === payload.activityId);
    if (isAlreadyClaimed) {
      showToast('This activity has already been claimed for this person.', 'error');
      throw new Error('Activity already claimed');
    }

    const activityDef = STANDARD_ACTIVITIES.find((a) => a.id === payload.activityId);
    const xpAwarded = activityDef ? activityDef.xp : 50;
    const activityName = activityDef ? activityDef.name : 'Milestone Logged';

    const newClaimedItem = {
      activityId: payload.activityId,
      activityName,
      claimedAt: payload.dateOfActivity ? new Date(payload.dateOfActivity).toISOString() : new Date().toISOString(),
      note: payload.note,
      xpAwarded,
    };

    const updatedPerson: Person = {
      ...targetPerson,
      xpFromPerson: targetPerson.xpFromPerson + xpAwarded,
      activitiesClaimed: [...targetPerson.activitiesClaimed, newClaimedItem],
      updatedAt: new Date().toISOString(),
    };

    const nextPeople = people.map((p) => (p.id === personId ? updatedPerson : p));
    setPeople(nextPeople);

    // Update user XP
    const newTotalXp = user.totalXp + xpAwarded;
    setUser((prev) => ({
      ...prev,
      totalXp: newTotalXp,
    }));

    // Trigger Floating XP Gain Animation
    setRecentXpGain({ amount: xpAwarded, key: Date.now() });

    // Add Timeline Event
    const timelineEvt: TimelineEvent = {
      id: `evt_${Date.now()}`,
      eventType: 'milestone_unlocked',
      timestamp: newClaimedItem.claimedAt,
      personId: updatedPerson.id,
      personName: updatedPerson.name,
      personPhotoUrl: updatedPerson.photoUrl,
      activityName,
      xpAwarded,
      noteText: payload.note,
    };
    setTimeline((prev) => [timelineEvt, ...prev]);

    // Check achievements
    const hasLegendary = nextPeople.some((p) => p.tier === 'Legendary');
    const newTotalMilestones = totalMilestonesCount + 1;
    const unlocked = evaluateAchievements(
      newTotalXp,
      nextPeople.length,
      hasLegendary,
      newTotalMilestones
    );

    if (unlocked) {
      setTimeout(() => {
        setAchievementModalPayload(unlocked);
      }, 500);
    }

    showToast(`Claimed "${activityName}" (+${xpAwarded} XP)`, 'success');

    return {
      xpAwarded,
      newTotalXp,
      personUpdated: updatedPerson,
      achievementUnlocked: unlocked,
    };
  };

  // Follow Actions
  const followUser = async (userId: string): Promise<void> => {
    // Optimistic update
    setFriends((prev) =>
      prev.map((f) => {
        if (f.userId === userId) {
          return { ...f, isFollowing: true, isMutual: true };
        }
        return f;
      })
    );
    showToast('Following user', 'success');
  };

  const unfollowUser = async (userId: string): Promise<void> => {
    setFriends((prev) =>
      prev.map((f) => {
        if (f.userId === userId) {
          return { ...f, isFollowing: false, isMutual: false };
        }
        return f;
      })
    );
    showToast('Unfollowed user', 'info');
  };

  const blockUser = async (userId: string): Promise<void> => {
    setFriends((prev) =>
      prev.map((f) => {
        if (f.userId === userId) {
          return { ...f, isBlocked: true, isFollowing: false, isMutual: false };
        }
        return f;
      })
    );
    showToast('User has been blocked', 'info');
  };

  const reportUser = async (userId: string, reason: string, note?: string): Promise<void> => {
    showToast(`Report submitted (${reason}). Thank you for keeping Hoekdex safe.`, 'success');
  };

  const pendingRequestsCount = friendRequests.filter((r) => r.status === 'pending').length;

  const sendFriendRequest = async (userIdOrUsername: string): Promise<{ success: boolean; message: string }> => {
    const cleanHandle = userIdOrUsername.trim().toLowerCase().replace(/^@/, '');
    
    // Check if user is already in friends list
    const existingFriend = friends.find(
      (f) => f.userId === userIdOrUsername || f.username?.toLowerCase() === cleanHandle
    );

    if (existingFriend) {
      if (existingFriend.requestStatus === 'pending_sent') {
        return { success: false, message: 'Friend request already sent to this user' };
      }
      // Update existing friend's requestStatus to pending_sent
      setFriends((prev) =>
        prev.map((f) =>
          f.userId === existingFriend.userId || f.username?.toLowerCase() === cleanHandle
            ? { ...f, requestStatus: 'pending_sent', isFollowing: true }
            : f
        )
      );
      showToast(`Friend request sent to @${existingFriend.username || existingFriend.displayName}!`, 'success');
      return { success: true, message: 'Friend request sent!' };
    }

    // Check searchable mock users
    const mockUser = MOCK_SEARCHABLE_USERS.find(
      (u) => u.userId === userIdOrUsername || u.username?.toLowerCase() === cleanHandle
    );

    const newUserRef: SocialPersonRef = mockUser
      ? { ...mockUser, isFollowing: true, requestStatus: 'pending_sent' }
      : {
          userId: `usr_custom_${Date.now()}`,
          displayName: cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1),
          username: cleanHandle,
          avatarUrl: `https://picsum.photos/seed/${cleanHandle}/200/200`,
          totalXp: 350,
          rank: friends.length + 5,
          achievementBadge: 'Novice Adventurer',
          isFollowing: true,
          requestStatus: 'pending_sent',
        };

    setFriends((prev) => [newUserRef, ...prev]);
    showToast(`Friend request sent to @${newUserRef.username}!`, 'success');
    return { success: true, message: 'Friend request sent!' };
  };

  const acceptFriendRequest = async (requestId: string): Promise<void> => {
    const req = friendRequests.find((r) => r.id === requestId);
    if (!req) return;

    setFriendRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'accepted' as const } : r))
    );

    // Add to friends list if not present
    setFriends((prev) => {
      const exists = prev.some((f) => f.userId === req.fromUserId);
      if (exists) {
        return prev.map((f) =>
          f.userId === req.fromUserId
            ? { ...f, isFollowing: true, isMutual: true, requestStatus: 'accepted' as const }
            : f
        );
      }
      return [
        {
          userId: req.fromUserId,
          displayName: req.fromDisplayName,
          username: req.fromUsername,
          avatarUrl: req.fromAvatarUrl,
          totalXp: req.totalXp,
          rank: req.rank || 5,
          achievementBadge: req.badge || 'Novice Adventurer',
          isFollowing: true,
          isMutual: true,
          requestStatus: 'accepted' as const,
        },
        ...prev,
      ];
    });

    showToast(`Accepted friend request from ${req.fromDisplayName}!`, 'success');
  };

  const declineFriendRequest = async (requestId: string): Promise<void> => {
    const req = friendRequests.find((r) => r.id === requestId);
    setFriendRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'declined' as const } : r))
    );
    if (req) {
      showToast(`Declined request from ${req.fromDisplayName}`, 'info');
    }
  };

  const searchUsers = (query: string): SocialPersonRef[] => {
    const q = query.trim().toLowerCase().replace(/^@/, '');
    if (!q) return [];

    const matchesInFriends = friends.filter(
      (f) =>
        f.displayName.toLowerCase().includes(q) ||
        (f.username && f.username.toLowerCase().includes(q))
    );

    const matchesInMock = MOCK_SEARCHABLE_USERS.filter(
      (m) =>
        (m.displayName.toLowerCase().includes(q) || (m.username && m.username.toLowerCase().includes(q))) &&
        !friends.some((f) => f.userId === m.userId)
    );

    return [...matchesInFriends, ...matchesInMock];
  };

  const updateUserProfile = async (updates: Partial<User>): Promise<void> => {
    setUser((prev) => ({ ...prev, ...updates }));
    if (clerkUser && updates.displayName) {
      try {
        await clerkUser.update({ firstName: updates.displayName });
      } catch (err) {
        console.error('Failed updating Clerk user profile:', err);
      }
    }
    showToast('Profile updated successfully', 'success');
  };

  const updatePrivacySettings = async (settings: { leaderboardOptIn?: boolean; allowFollowerXpView?: boolean }): Promise<void> => {
    setUser((prev) => ({ ...prev, ...settings }));
    showToast('Privacy settings saved', 'success');
  };

  const exportData = async (): Promise<void> => {
    showToast('Your data export has been requested. Check your email shortly.', 'success');
  };

  const deleteAccount = async (): Promise<void> => {
    try {
      if (clerkUser) {
        await clerkUser.delete();
      }
    } catch (err) {
      console.error('Error deleting Clerk account:', err);
    }
    localStorage.clear();
    setUser({ ...INITIAL_USER, totalXp: 0 });
    setPeople([]);
    setTimeline([]);
    setAchievements(INITIAL_ACHIEVEMENTS.map((a) => ({ ...a, isUnlocked: false, currentProgress: 0 })));
    showToast('Your account and private records have been permanently deleted.', 'info');
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setUser(INITIAL_USER);
    setPeople(INITIAL_PEOPLE);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setTimeline(INITIAL_TIMELINE);
    setFriends(INITIAL_FRIENDS);
    showToast('Reset data to initial demonstration state', 'info');
  };

  return (
    <HoekdexContext.Provider
      value={{
        user,
        people,
        achievements,
        timeline,
        friends,
        friendRequests,
        pendingRequestsCount,
        leaderboard,
        dashboardStats,
        recentXpGain,
        achievementModalPayload,
        toasts,
        themeMode,
        resolvedTheme,
        setThemeMode,
        addPerson,
        updatePerson,
        deletePerson,
        updatePersonTier,
        logActivity,
        followUser,
        unfollowUser,
        blockUser,
        reportUser,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        searchUsers,
        updateUserProfile,
        updatePrivacySettings,
        exportData,
        deleteAccount,
        showToast,
        removeToast,
        closeAchievementModal,
        showAchievementUnlock,
        resetToDefaults,
      }}
    >
      {children}
    </HoekdexContext.Provider>
  );
}

export function useHoekdex() {
  const context = useContext(HoekdexContext);
  if (!context) {
    throw new Error('useHoekdex must be used within a HoekdexProvider');
  }
  return context;
}
