import React, { useState } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  onSelectCategory: (category: 'house' | 'land') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
    <button className={styles['toggle-button']} onClick={toggleSidebar}>
      ☰
    </button>
  
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <nav>
        <ul>
          <li>
            <button onClick={() => { onSelectCategory('house'); setIsOpen(false); }} className={styles['sidebar-link']}>
              🏠 House Accessories
            </button>
          </li>
          <li>
            <button onClick={() => { onSelectCategory('land'); setIsOpen(false); }} className={styles['sidebar-link']}>
              🌿 Land Accessories
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </>
  
  );
};

export default Sidebar;