var categories = document.querySelectorAll('.category');
categories.forEach(function(category) {
    category.addEventListener('click', function() {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
        } else {
            categories.forEach(function(c) {
                c.classList.remove('selected');
            });
            this.classList.add('selected');
        }
    });
});