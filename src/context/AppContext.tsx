import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserStage, ThemeMode, Opportunity } from '../types';

interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warn';
}

export const getInitials = (name: string): string => {
  if (!name) return 'SB';
  const clean = name.trim();
  if (!clean) return 'SB';
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const formatMemberSince = (dateInput?: string): string => {
  try {
    const d = dateInput ? new Date(dateInput) : new Date();
    if (isNaN(d.getTime())) {
      return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date());
    }
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(d);
  } catch {
    return 'Oct 2026';
  }
};

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  stage: UserStage;
  setStage: (stage: UserStage) => void;
  userName: string;
  setUserName: (name: string) => void;
  userInitials: string;
  joinDate: string;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  savedOpportunities: string[];
  toggleSaveOpportunity: (id: string) => void;
  selectedOpportunityForNda: Opportunity | null;
  openNdaModal: (opp: Opportunity) => void;
  closeNdaModal: () => void;
  isApplyModalOpen: boolean;
  openApplyModal: (targetRole?: UserRole) => void;
  closeApplyModal: () => void;
  toasts: ToastItem[];
  addToast: (message: string, type?: 'info' | 'success' | 'warn') => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('vve-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Target website defaults dark / high-contrast
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('vve-role');
    if (saved === 'investor' || saved === 'architect') return saved;
    return 'investor';
  });

  const [stage, setStage] = useState<UserStage>(() => {
    const saved = localStorage.getItem('vve-stage');
    if (saved === 'verified') return 'verified';
    return 'guest';
  });

  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem('vve-user-name') || 'Subinoy Bera';
  });

  const [joinDate] = useState<string>(() => {
    const saved = localStorage.getItem('vve-join-date');
    if (saved) return saved;
    const now = new Date().toISOString();
    localStorage.setItem('vve-join-date', now);
    return now;
  });

  const setUserName = (name: string) => {
    setUserNameState(name);
    localStorage.setItem('vve-user-name', name);
  };

  const userInitials = getInitials(userName);

  const [activeRoute, setActiveRoute] = useState<string>(() => {
    return window.location.hash || '#home';
  });

  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vve-saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedOpportunityForNda, setSelectedOpportunityForNda] = useState<Opportunity | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('vve-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role);
    localStorage.setItem('vve-role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('vve-stage', stage);
  }, [stage]);

  useEffect(() => {
    localStorage.setItem('vve-saved', JSON.stringify(savedOpportunities));
  }, [savedOpportunities]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      if (hash === '#apply') {
        setIsApplyModalOpen(true);
      } else {
        setActiveRoute(hash);
      }
    };

    if (window.location.hash === '#apply') {
      setIsApplyModalOpen(true);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openApplyModal = (targetRole?: UserRole) => {
    if (targetRole) {
      setRoleState(targetRole);
    }
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    if (window.location.hash === '#apply') {
      setActiveRoute('#home');
      window.location.hash = '#home';
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const toggleRole = () => {
    setRoleState((prev) => (prev === 'investor' ? 'architect' : 'investor'));
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunities((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const openNdaModal = (opp: Opportunity) => {
    setSelectedOpportunityForNda(opp);
  };

  const closeNdaModal = () => {
    setSelectedOpportunityForNda(null);
  };

  const addToast = (_message: string, _type: 'info' | 'success' | 'warn' = 'info') => {
    // Disabled completely per user request
  };

  const removeToast = (_id: string) => {
    // Disabled completely per user request
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        role,
        setRole,
        toggleRole,
        stage,
        setStage,
        userName,
        setUserName,
        userInitials,
        joinDate,
        activeRoute,
        setActiveRoute,
        savedOpportunities,
        toggleSaveOpportunity,
        selectedOpportunityForNda,
        openNdaModal,
        closeNdaModal,
        isApplyModalOpen,
        openApplyModal,
        closeApplyModal,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
