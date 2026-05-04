/**
 * 1. PRODUCT DATA
 * An array of objects representing our inventory.
 */
const products = [
    { name: "Smartphone X", price: 45000, desc: "High-end flagship phone.", img: "prod1.jpg" },
    { name: "Laptop Pro", price: 85000, desc: "16GB RAM, 512GB SSD.", img: "prod2.jpg" },
    { name: "Bluetooth Buds", price: 2500, desc: "Noise cancelling wireless buds.", img: "prod3.jpg" },
    { name: "Smart Watch", price: 5000, desc: "Fitness tracking and GPS.", img: "prod4.jpg" },
    { name: "Gaming Mouse", price: 1500, desc: "RGB lighting, 12000 DPI.", img: "prod5.jpg" },
    { name: "Keyboard", price: 3000, desc: "Mechanical switches.", img: "prod6.jpg" },
    { name: "Monitor", price: 12000, desc: "24-inch Full HD Display.", img: "prod7.jpg" },
    { name: "Power Bank", price: 1200, desc: "20000mAh fast charging.", img: "prod8.jpg" },
    { name: "External HDD", price: 4000, desc: "1TB Portable storage.", img: "prod9.jpg" },
    { name: "Webcam", price: 2200, desc: "1080p HD video calls.", img: "prod10.jpg" },
    { name: "USB Hub", price: 800, desc: "4-in-1 USB 3.0 connector.", img: "prod11.jpg" },
    { name: "Desk Lamp", price: 1100, desc: "LED with adjustable brightness.", img: "prod12.jpg" }
];

/**
 * 2. PAGINATION STATE
 * rowsPerPage: How many items to show at once.
 * currentPage: Tracks which page the user is currently viewing.
 */
const rowsPerPage = 10;
let currentPage = 1;

/**
 * 3. FUNCTION: displayTable
 * Filters the product list based on the current page and renders them to the HTML.
 */
function displayTable(page) {
    const tableBody = document.getElementById('product-body');
    
    // Clear existing rows to prevent duplicates when switching pages
    tableBody.innerHTML = ""; 
    
    /**
     * Logic for slicing the array:
     * If page = 1: start = 0, end = 10 (Items 0-9)
     * If page = 2: start = 10, end = 20 (Items 10-19)
     */
    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    
    // Get only the items for the current page
    let paginatedItems = products.slice(start, end);

    // Loop through the sliced array and create HTML rows
    paginatedItems.forEach(item => {
        let row = `<tr>
            <td><img src="${item.img}" alt="${item.name}" class="product-img" style="width:50px;"></td>
            <td><strong>${item.name}</strong></td>
            <!-- .toLocaleString('en-IN') formats the number with Indian commas (e.g., 85,000) -->
            <td>₹${item.price.toLocaleString('en-IN')}</td>
            <td>${item.desc}</td>
        </tr>`;
        
        // Append the row string to the table body
        tableBody.innerHTML += row;
    });
}

/**
 * 4. FUNCTION: setupPagination
 * Calculates total pages and generates the clickable buttons at the bottom.
 */
function setupPagination() {
    const paginationControls = document.getElementById('pagination-controls');
    
    // Clear existing buttons
    paginationControls.innerHTML = "";
    
    // Calculate total pages (e.g., 12 items / 10 per page = 1.2, rounded up to 2 pages)
    let pageCount = Math.ceil(products.length / rowsPerPage);

    // Loop to create a button for each page
    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement('li');
        
        // Add Bootstrap classes. Add 'active' class if this button is the current page.
        btn.className = `page-item ${currentPage === i ? 'active' : ''}`;
        
        // Create the button element inside the list item
        btn.innerHTML = `<button class="page-link">${i}</button>`;
        
        // Add click event listener to handle page switching
        btn.addEventListener('click', () => {
            currentPage = i;          // Update global current page
            displayTable(currentPage); // Re-render table with new page data
            setupPagination();        // Re-render buttons to update the 'active' state
        });
        
        // Append the list item to the pagination <ul>
        paginationControls.appendChild(btn);
    } //for 
}

/**
 * 5. INITIALIZATION
 * Run these functions once when the script loads to show the first page.
 */
displayTable(currentPage);
setupPagination();