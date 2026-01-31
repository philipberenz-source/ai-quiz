function CategorySelection({ categories, onSelectCategory }) {
    return (
      <div className="category-selection">
        <h2>Choose a Category</h2>
        <div className="category-grid">
          {categories.map(category => (
            <button 
              key={category.id} 
              className="category-button"
              onClick={() => onSelectCategory(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default CategorySelection;