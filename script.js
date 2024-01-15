document.addEventListener('DOMContentLoaded', function () {
    // fetch data from api for orders and filter 
    fetchOrders();
    document.querySelectorAll('.filter-order-categories input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            filterOrders();
        });
    });


    // fetch data from api for products 
    fetchProducts();


    // fetch data from api for users and filter 
    fetchUsers();
    let searchBtn = document.getElementById('userSearchBtn');
    searchBtn.addEventListener('click', displayFilterUsers);

    // user page reset 
    const searchReset = document.getElementById('userReset');
    searchReset.addEventListener('click', reset);
});



//  order page functions
function fetchOrders() {
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
        .then(res => res.json())
        .then(data => {
            displayOrders(data);
            let orderCount = document.getElementById('orderCount');
            let orderCountNo = data.length;
            orderCount.innerText = orderCountNo;
        })
}
function displayOrders(orders) {
    const ordersTableData = document.getElementById('orderTableData');
    let orderTableData = '';

    orders.map(values => {
        orderTableData += `<tr class="table-data">
            <td id="orderID" class="secondary-data">${values.id}</td>
            <td id="customer" class="primary-data">${values.customerName}</td>
            <td id="date" class="primary-data">${values.orderDate}
                <br>
                <span id="time" class="secondary-data">${values.orderTime}</span>  
            </td>
            <td id=" price" class="secondary-data">$${values.amount}</td>
            <td id="catogry" class="primary-data">${values.orderStatus}</td>
        </tr > `;
    });
    ordersTableData.innerHTML = orderTableData;
}
function filterOrders() {
    const checkboxes = document.querySelectorAll('.filter-order-categories input[type="checkbox"]:checked');
    const statusFilters = Array.from(checkboxes).map(checkbox => checkbox.value);

    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
        .then(response => response.json())
        .then(data => {
            const filteredOrders = data.filter(order => statusFilters.includes(order.orderStatus));
            displayOrders(filteredOrders);
            let orderCount = document.getElementById('orderCount');
            let orderCountNo = filteredOrders.length;
            orderCount.innerText = orderCountNo;

        })
}



//  product page functions

function fetchProducts() {
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
        .then(response => response.json())
        .then(data => {
            let filteredData = data;
            const expiredCheckbox = document.getElementById('Expired');
            const lowStockCheckbox = document.getElementById('LowStock');

            expiredCheckbox.addEventListener('change', fetchProducts);
            lowStockCheckbox.addEventListener('change', fetchProducts);
            if (!expiredCheckbox.checked) {
                filteredData = filteredData.filter(product => new Date(product.expiryDate) > new Date());
            }
            if (!lowStockCheckbox.checked) {
                filteredData = filteredData.filter(product => product.stock > 100);
            }
            displayProducts(filteredData);
            let productCount = document.getElementById('productCount');
            let productCountNo = filteredData.length;
            productCount.innerText = productCountNo;
        })
        .catch(error => console.error('Error fetching products:', error));
}
function displayProducts(Products) {
    const ProductsTableData = document.getElementById('productTableData');
    let ProductTableData = '';

    Products.map(values => {
        ProductTableData += `<tr class="product-table-data">
                     <td id="productID" class="secondary-data">${values.id}</td>
                     <td id="productName" class="primary-data">${values.medicineName}</td>
                     <td id="ProductBrand" class="secondary-data">${values.medicineBrand}</td>
                     <td id="ExpiryDate" class="primary-data">${values.expiryDate}</td>
                     <td id="UnitPrice" class="secondary-data">${values.unitPrice}</td>
                    <td id="Stock" class="secondary-data">${values.stock}</td>
               </tr > `;
    });
    ProductsTableData.innerHTML = ProductTableData;
}



//  user page functions
function fetchUsers() {
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
        .then(res => res.json())
        .then(data => {
            let usersData = data;
            displayUsers(usersData);
        });
}
function displayUsers(users) {
    const usersTableData = document.getElementById('userTableData');
    let userTableData = '';

    users.map(values => {
        userTableData += `<tr class="user-table-data">
                 <td id="userID" class="secondary-data">${values.id}</td>
                 <td id="UserAvatar"><img src="${values.profilePic}" alt="profile"></td>
                 <td id="FullName" class="primary-data">${values.fullName}</td>
                 <td id="DoB" class="secondary-data">${values.dob}</td>
                 <td id="Gender" class="secondary-data">${values.gender}</td>
                 <td id="CurrentLocation" class="secondary-data">${values.currentCity}, <br> ${values.currentCountry}</td>
             </tr > `;
    });
    usersTableData.innerHTML = userTableData;
}
// filter by search functionalities
function displayFilterUsers() {
    let searchInput = document.getElementById('userSearch').value;

    if (searchInput.length < 2) {
        alert('Please enter at least 2 characters');
        return;
    }

    let usersTableData = document.getElementById('userTableData');
    let rows = usersTableData.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let fullName = rows[i].getElementsByTagName('td')[2].innerText;
        if (fullName.toLowerCase().includes(searchInput.toLowerCase())) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}
// Function to reset search and show all users
function reset() {
    let searchInput = document.getElementById('userSearch').value;
    searchInput.value = '';
    fetchUsers();
}

//logout function
function logout(){
    SeccionStorage.removeItem('isLoggedIn');
}