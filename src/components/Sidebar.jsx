import React, { useState } from 'react';
    import './Sidebar.css';

    function Sidebar({ isOpen, toggleSidebar, setFilter }) {
      const [activeCategory, setActiveCategory] = useState(null);

      const categories = [
        {
          name: "Guard Pass",
          subcategories: ["All", "Closed Guard", "De La Riva Guard", "Half Guard", "Lasso Guard", "50/50 Guard", "Butterfly Guard", "Reverse De La Riva Guard", "Spider Guard", "Waiter Guard", "Worm Guard", "X Guard", "Not Specific"],
        },
        {
          name: "Takedown",
          subcategories: ["Stand Up"],
        },
        {
          name: "Guard Pull",
          subcategories: ["All", "Closed Guard", "De La Riva Guard", "Half Guard", "Lasso Guard", "50/50 Guard", "Butterfly Guard", "Reverse De La Riva Guard", "Spider Guard", "Waiter Guard", "Worm Guard", "X Guard", "Not Specific"],
        },
        {
          name: "Submission",
          subcategories: ["All", "50/50 Guard", "Back Control", "Butterfly Guard", "Closed Guard", "De La Riva Guard", "Half Guard", "Lasso Guard", "Mount", "Reverse De La Riva Guard", "Side Control", "Spider Guard", "Stand Up", "Waiter Guard", "Worm Guard", "X Guard", "Not Specific"],
        },
        {
          name: "Sweep",
          subcategories: ["All", "Closed Guard", "De La Riva Guard", "Half Guard", "Lasso Guard", "50/50 Guard", "Butterfly Guard", "Reverse De La Riva Guard", "Spider Guard", "Waiter Guard", "Worm Guard", "X Guard", "Not Specific"],
        },
        {
          name: "Defense / Escape",
          subcategories: ["All", "Back Control", "Butterfly Guard", "Closed Guard", "De La Riva Guard", "Half Guard", "Lasso Guard", "50/50 Guard", "Mount", "Reverse De La Riva Guard", "Side Control", "Spider Guard", "Stand Up", "Guard Retention", "Mount Escape", "Back Escape", "Side Control Escape", "Not Specific"],
        },
        {
          name: "Guard Control",
          subcategories: ["All", "Closed Guard", "De La Riva Guard", "Half Guard", "Lasso Guard", "50/50 Guard", "Butterfly Guard", "Reverse De La Riva Guard", "Spider Guard", "Waiter Guard", "Worm Guard", "X Guard", "Not Specific"],
        },
      ];

      const handleCategoryClick = (categoryName) => {
        setActiveCategory(activeCategory === categoryName ? null : categoryName);
        setFilter(null); // Reset the filter when a category is clicked
      };

      const handleSubcategoryClick = (category, subcategory) => {
        setFilter(`${category} -> ${subcategory}`);
        toggleSidebar(); // Close the sidebar after selecting a subcategory
      };

      return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2 className="sidebar-title">BJJ Horizons</h2>
            {isOpen && (
              <button className="close-sidebar-button" onClick={toggleSidebar}>
                ✕
              </button>
            )}
          </div>
          <nav className="sidebar-menu">
            <ul className="sidebar-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
            <hr className="sidebar-separator" />
            <h2 className="sidebar-title">BJJ Techniques</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.name} className="category">
                  <div
                    className={`category-title ${activeCategory === category.name ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {category.name}
                  </div>
                  {activeCategory === category.name && (
                    <ul className="subcategories">
                      {category.subcategories.sort((a, b) => {
                        if (a === "All") return -1;
                        if (b === "All") return 1;
                        if (a === "Not Specific") return 1;
                        if (b === "Not Specific") return -1;
                        return a.localeCompare(b);
                      }).map((subcategory) => (
                        <li key={subcategory}>
                          <a
                            href={`#${subcategory}`}
                            onClick={() => handleSubcategoryClick(category.name, subcategory)}
                          >
                            {subcategory}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      );
    }

    export default Sidebar;
