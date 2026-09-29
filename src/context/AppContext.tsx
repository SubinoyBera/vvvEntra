import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserStage, ThemeMode, Opportunity } from '../types';

interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warn';
}

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  stage: UserStage;
  setStage: (stage: UserStage) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  savedOpportunities: string[];
  toggleSaveOpportunity: (id: string) => void;
  selectedOpportunityForNda: Opportunity | null;
  openNdaModal: (opp: Opportunity) => void;
  closeNdaModal: () => void;
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
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
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
      setActiveRoute(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      addToast(`Theme switched to ${next} mode`, 'info');
      return next;
    });
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    addToast(
      newRole === 'investor' 
        ? 'Switched to Investor / Buyer view (Orange theme)' 
        : 'Switched to Architect / Lister view (Green theme)',
      'info'
    );
  };

  const toggleRole = () => {
    setRole(role === 'investor' ? 'architect' : 'investor');
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunities(prev => {
      if (prev.includes(id)) {
        addToast('Removed from saved opportunities', 'info');
        return prev.filter(x => x !== id);
      } else {
        addToast('Saved opportunity to your dossier watchlist', 'success');
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

  const addToast = (message: string, type: 'info' | 'success' | 'warn' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
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
        activeRoute,
        setActiveRoute,
        savedOpportunities,
        toggleSaveOpportunity,
        selectedOpportunityForNda,
        openNdaModal,
        closeNdaModal,
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
