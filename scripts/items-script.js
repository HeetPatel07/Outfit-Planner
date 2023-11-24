window.addEventListener('load', function() {
    var categories = document.querySelectorAll('.category');
    var tables = document.querySelectorAll('.table');

    // Default selected category is tops([1])
    categories[1].classList.add('selected');

    categories.forEach(function(category) {
        category.addEventListener('click', function() {
            console.log('Category clicked');
            categories.forEach(function(c) {
                c.classList.remove('selected');
            });
            this.classList.add('selected');

            // Hide all tables
            tables.forEach(function(table) {
                table.style.display = 'none';
            });

            // Show the table corresponding to the selected category
            var selectedCategory = this.getAttribute('data-category');
            var selectedTable = document.querySelector('.' + selectedCategory);
            selectedTable.style.display = 'block';
        });
    });
});