import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import VisionBoard from './components/VisionBoard';
import Calendar from './components/Calendar';
import MoodTracker from './components/MoodTracker';
import SleepTracker from './components/SleepTracker';
import Conquistas from './components/Conquistas';
import Mantras from './components/Mantras';
import Metas from './components/Metas';
import HowToUseModal from './components/HowToUseModal';
import CategorySettingsModal from './components/CategorySettingsModal';
import { Category, CheckedState, Activity, Frequency, VisionBoardState, CalendarState, VisionBoardItem, MoodState, SleepState, ConquistasState, MantrasState, MetasState } from './types';
import { INITIAL_CATEGORIES, ALL_POSSIBLE_CATEGORIES, POST_IT_COLORS } from './data';
import useLocalStorage from './hooks/useLocalStorage';

const themes = {
  graphiteOrange: {
    '--color-bg-primary': '#111827', // bg-gray-900
    '--color-bg-secondary': '#1f2937', // bg-gray-800
    '--color-bg-tertiary': '#374151', // bg-gray-700
    '--color-text-primary': '#f3f4f6', // text-gray-100 / text-white
    '--color-text-secondary': '#9ca3af', // text-gray-400
    '--color-text-tertiary': '#d1d5db', // text-gray-300
    '--color-border': '#374151', // border-gray-700
    '--color-border-input': '#4b5563', // border-gray-600
    '--color-accent': '#ea580c', // orange-600
    '--color-accent-text': '#f97316', // orange-500
    '--color-accent-text-faded': '#fb923c', // orange-400
    '--color-accent-bg-subtle': 'rgba(234, 88, 12, 0.2)',
  },
  lightBlue: {
    '--color-bg-primary': '#f1f5f9', // slate-100
    '--color-bg-secondary': '#ffffff', // white
    '--color-bg-tertiary': '#e2e8f0', // slate-200
    '--color-text-primary': '#020617', // slate-950
    '--color-text-secondary': '#475569', // slate-600
    '--color-text-tertiary': '#334155', // slate-700
    '--color-border': '#cbd5e1', // slate-300
    '--color-border-input': '#94a3b8', // slate-400
    '--color-accent': '#1e40af', // blue-800
    '--color-accent-text': '#1d4ed8', // blue-700
    '--color-accent-text-faded': '#2563eb', // blue-600
    '--color-accent-bg-subtle': 'rgba(37, 99, 235, 0.15)',
  },
  midnightViolet: {
    // Light Backgrounds
    '--color-bg-primary': '#F7F5FA',       // Very light lavender
    '--color-bg-secondary': '#FFFFFF',      // White for cards
    '--color-bg-tertiary': '#EFEBF5',      // Light lavender for hovers
    
    // Dark & Palette Texts
    '--color-text-primary': '#341C8C',      // Dark violet for main text
    '--color-text-secondary': '#657EBE',      // Periwinkle for secondary text
    '--color-text-tertiary': '#9475BF',      // Medium lavender for tertiary text
    
    // Borders
    '--color-border': '#EAE6F3',          // Light lavender border
    '--color-border-input': '#B4A3D9',      // Palette light lavender for input borders
    
    // Accent (using dark for contrast)
    '--color-accent': '#341C8C',          // Dark violet accent for high contrast buttons
    '--color-accent-text': '#657EBE',      // Periwinkle for links/accented text
    '--color-accent-text-faded': '#F2E1AE',// Gold from palette for special highlights
    '--color-accent-bg-subtle': 'rgba(52, 28, 140, 0.1)', // transparent dark violet for selections
  }
};

const INITIAL_VISION_BOARD_STATE: VisionBoardState = [];
const INITIAL_MANTRAS_STATE: MantrasState = [];
const INITIAL_METAS_STATE: MetasState = [];

export default function App(): React.ReactElement {
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const [checkedState, setCheckedState] = useLocalStorage<CheckedState>('checkedState', {});
  const [visionBoard, setVisionBoard] = useLocalStorage<VisionBoardState>('visionBoard', INITIAL_VISION_BOARD_STATE);
  const [calendarEvents, setCalendarEvents] = useLocalStorage<CalendarState>('calendarEvents', {});
  const [moodState, setMoodState] = useLocalStorage<MoodState>('moodState', {});
  const [sleepState, setSleepState] = useLocalStorage<SleepState>('sleepState', {});
  const [conquistas, setConquistas] = useLocalStorage<ConquistasState>('conquistas', []);
  const [mantras, setMantras] = useLocalStorage<MantrasState>('mantras', INITIAL_MANTRAS_STATE);
  const [metas, setMetas] = useLocalStorage<MetasState>('metas', INITIAL_METAS_STATE);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('reports'); // Default to reports
  const [theme, setTheme] = useLocalStorage<string>('lightBlue', 'lightBlue');
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [isCategorySettingsOpen, setIsCategorySettingsOpen] = useState(false);

  useEffect(() => {
    // Migration from old "film roll" format to new "mood board" format.
    if (Array.isArray(visionBoard) && visionBoard.length > 0 && !('width' in visionBoard[0])) {
      const migratedBoard = visionBoard.map((oldItem: any, index: number) => {
        const newItem: VisionBoardItem = {
          id: `item-${Date.now()}-${index}`,
          src: oldItem.src,
          x: (index * 260) % 800, // Stagger initial positions
          y: Math.floor((index * 260) / 800) * 200,
          width: 256, // Default width
          height: 192, // Default height (4:3 ratio)
          rotation: 0,
          zIndex: index + 1,
        };
        return newItem;
      });
      setVisionBoard(migratedBoard);
    }
  }, []); 

  useEffect(() => {
    // Migration for Mantras to add color property
    if (mantras.length > 0 && mantras.some(m => !m.color)) {
      const migratedMantras = mantras.map((mantra, index) => ({
        ...mantra,
        color: mantra.color || POST_IT_COLORS[index % POST_IT_COLORS.length]
      }));
      setMantras(migratedMantras);
    }
  }, []);

  useEffect(() => {
    // Migration for Conquistas to add color property
    if (conquistas.length > 0 && conquistas.some(c => !c.color)) {
      const migratedConquistas = conquistas.map((conquista, index) => ({
        ...conquista,
        color: conquista.color || POST_IT_COLORS[(index + 1) % POST_IT_COLORS.length] // offset index to vary colors
      }));
      setConquistas(migratedConquistas);
    }
  }, []);

  useEffect(() => {
    // Migration for Conquistas importance from medals to stars
    if (conquistas.length > 0 && conquistas.some(c => typeof c.importance === 'string')) {
      const migratedConquistas = conquistas.map(c => {
        if (typeof c.importance === 'string') {
          const newImportance = { 'gold': 3, 'silver': 2, 'bronze': 1 }[c.importance];
          return { ...c, importance: newImportance };
        }
        return c;
      });
      // @ts-ignore
      setConquistas(migratedConquistas);
    }
  }, []);

  useEffect(() => {
    // Migration for Metas importance from medals to stars
    if (metas.length > 0 && metas.some(m => typeof m.importance === 'string')) {
      const migratedMetas = metas.map(m => {
        if (typeof m.importance === 'string') {
          const newImportance = { 'gold': 3, 'silver': 2, 'bronze': 1 }[m.importance];
          return { ...m, importance: newImportance };
        }
        return m;
      });
       // @ts-ignore
      setMetas(migratedMetas);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const selectedTheme = themes[theme as keyof typeof themes] || themes.graphiteOrange;
    for (const [key, value] of Object.entries(selectedTheme)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  const selectedCategory = useMemo(() => {
    if (['reports', 'vision-board', 'conquistas', 'mantras', 'metas', 'how-to-use', 'calendar', 'mood-tracker', 'sleep-tracker'].includes(selectedCategoryId)) {
      return null;
    }
    return categories.find(cat => cat.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  const handleCheck = (activityId: string, key: string, isIncrement: boolean, frequency: Frequency) => {
    setCheckedState(prev => {
      const currentChecks = prev[activityId] || [];
      let newChecks;

      if (isIncrement) {
        newChecks = [...currentChecks, key];
      } else {
        if (frequency === Frequency.SEMANAL || frequency === Frequency.MENSAL) {
          const index = currentChecks.lastIndexOf(key);
          if (index > -1) {
            newChecks = [...currentChecks.slice(0, index), ...currentChecks.slice(index + 1)];
          } else {
            newChecks = currentChecks;
          }
        } else {
          newChecks = currentChecks.filter(k => k !== key);
        }
      }
      return {
        ...prev,
        [activityId]: newChecks,
      };
    });
  };

  const handleUpdateCategoryActivities = (categoryId: string, newActivities: Activity[]) => {
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, activities: newActivities } 
          : cat
      )
    );
  };

  const handleSaveCategories = (selectedIds: string[]) => {
    const newActiveCategories = selectedIds.map(id => {
        const existingCategory = categories.find(c => c.id === id);
        const masterCategory = ALL_POSSIBLE_CATEGORIES.find(c => c.id === id)!;
        return {
            ...masterCategory,
            // If category exists, keep its activities. If it's new, use the master list's default activities.
            activities: existingCategory ? existingCategory.activities : masterCategory.activities,
        };
    });
    setCategories(newActiveCategories);
    if (!selectedIds.includes(selectedCategoryId)) {
      setSelectedCategoryId('reports');
    }
    setIsCategorySettingsOpen(false);
  };

  const renderContent = () => {
    if (selectedCategoryId === 'reports') {
      return <Reports categories={categories} checkedState={checkedState} moodState={moodState} sleepState={sleepState} />;
    }
    if (selectedCategoryId === 'vision-board') {
      return <VisionBoard visionBoard={visionBoard} onUpdate={setVisionBoard} />;
    }
    if (selectedCategoryId === 'conquistas') {
      return <Conquistas conquistas={conquistas} onUpdate={setConquistas} />;
    }
    if (selectedCategoryId === 'mantras') {
      return <Mantras mantras={mantras} onUpdate={setMantras} />;
    }
    if (selectedCategoryId === 'metas') {
      return <Metas metas={metas} onUpdate={setMetas} />;
    }
    if (selectedCategoryId === 'calendar') {
      return <Calendar calendarEvents={calendarEvents} onUpdate={setCalendarEvents} />;
    }
    if (selectedCategoryId === 'mood-tracker') {
      return <MoodTracker moodState={moodState} onUpdate={setMoodState} />;
    }
    if (selectedCategoryId === 'sleep-tracker') {
      return <SleepTracker sleepState={sleepState} onUpdate={setSleepState} />;
    }
    
    if (selectedCategory) {
      return (
        <div key={selectedCategory.id}>
          <Dashboard
            category={selectedCategory}
            checkedState={checkedState}
            onCheck={handleCheck}
            onUpdateCategoryActivities={handleUpdateCategoryActivities}
            currentTheme={theme}
          />
        </div>
      );
    }
    
    return null; // Handle case where selectedCategory might not be found
  };

  return (
    <div className="flex h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans">
      <Sidebar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        currentTheme={theme}
        onThemeChange={setTheme}
        onShowHowToUse={() => setShowHowToUse(true)}
        onOpenCategorySettings={() => setIsCategorySettingsOpen(true)}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {renderContent()}
      </main>
      {showHowToUse && <HowToUseModal onClose={() => setShowHowToUse(false)} />}
      {isCategorySettingsOpen && (
        <CategorySettingsModal 
          activeCategories={categories}
          allCategories={ALL_POSSIBLE_CATEGORIES}
          onClose={() => setIsCategorySettingsOpen(false)}
          onSave={handleSaveCategories}
        />
      )}
    </div>
  );
}