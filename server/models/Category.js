class Category {
    constructor(category_id, title, description) {
      this.category_id = category_id;
      this.title = title;
      this.description = description;
    }
  
    // Method to update category details
    updateDetails({ title, description }) {
      if (title) this.title = title;
      if (description) this.description = description;
    }
}

export default Category;