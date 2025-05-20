const apiUrl = '/api/products';
const productForm = document.getElementById('productForm');
const productsList = document.getElementById('productsList');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
let editMode = false;

document.addEventListener('DOMContentLoaded', loadProducts);

productForm.addEventListener('submit', handleFormSubmit);

cancelBtn.addEventListener('click', resetForm);

async function loadProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        
        productsList.innerHTML = '';
        
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>€${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="edit-btn" data-id="${product.id}">Editar</button>
                    <button class="delete-btn" data-id="${product.id}">Eliminar</button>
                </td>
            `;
            productsList.appendChild(row);
        });
        
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editProduct(btn.dataset.id));
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
        });
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar los productos. Inténtelo de nuevo más tarde.');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value)
    };
    
    try {
        let response;
        
        if (editMode) {
            const productId = document.getElementById('productId').value;
            response = await fetch(`${apiUrl}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
        } else {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
        }
        
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        
        loadProducts();
        resetForm();
        
    } catch (error) {
        console.error('Error al guardar producto:', error);
        alert('Error al guardar el producto. Inténtelo de nuevo más tarde.');
    }
}

async function editProduct(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }
        
        const product = await response.json();
        
        document.getElementById('productId').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('description').value = product.description;
        document.getElementById('price').value = product.price;
        document.getElementById('stock').value = product.stock;
        
        editMode = true;
        submitBtn.textContent = 'Actualizar';
        cancelBtn.style.display = 'inline-block';
        
    } catch (error) {
        console.error('Error al cargar producto para editar:', error);
        alert('Error al cargar el producto para editar.');
    }
}

async function deleteProduct(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        return;
    }
    
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar');
        }
        
        loadProducts();
        
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto.');
    }
}

function resetForm() {
    productForm.reset();
    document.getElementById('productId').value = '';
    editMode = false;
    submitBtn.textContent = 'Guardar';
    cancelBtn.style.display = 'none';
}