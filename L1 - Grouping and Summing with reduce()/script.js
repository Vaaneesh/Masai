function count(product) {
    const productCount = product.reduce((acc, category) => {
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    }, {});
  
    return productCount; 
}
const inputCategories = ["electronics", "clothing", "electronics", "toys", "clothing", "toys", "toys"];
const categoryCount = count(inputCategories);
console.log(categoryCount);
