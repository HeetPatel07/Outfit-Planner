window.addEventListener('load', function() {
    var categories = document.querySelectorAll('.category');
    var tables = document.querySelectorAll('.table');
    var currentIndex = 0; // Index of the currently displayed page
    var pages = document.querySelectorAll('.page');

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

    // Add event listener to the next button
    document.getElementById('next').addEventListener('click', function() {
        // Hide the current page
        pages[currentIndex].style.display = 'none';
        // Show the next page
        currentIndex++;
        if (currentIndex >= pages.length) { // If we're at the last page, go back to the first one
            currentIndex = 0;
        }
        pages[currentIndex].style.display = 'block';
    });

    // Add event listener to the previous button
    document.getElementById('prev').addEventListener('click', function() {
        // Hide the current page
        pages[currentIndex].style.display = 'none';
        // Show the previous page
        currentIndex--;
        if (currentIndex < 0) { // If we're at the first page, go to the last one
            currentIndex = pages.length - 1;
        }
        pages[currentIndex].style.display = 'block';
    });
});