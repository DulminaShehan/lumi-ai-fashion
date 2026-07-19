import { useState } from 'react';
import { PageHeader } from '@/components/ui';
import { CategoriesSection } from './CategoriesSection';
import { AdminsSection } from './AdminsSection';
import styles from './SettingsPage.module.css';

const TABS = [
  { key: 'categories', label: 'Categories' },
  { key: 'admins', label: 'Admins' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('categories');

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage categories and admin access" />

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={[styles.tab, activeTab === tab.key && styles.tabActive].filter(Boolean).join(' ')}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'categories' && <CategoriesSection />}
      {activeTab === 'admins' && <AdminsSection />}
    </div>
  );
}
