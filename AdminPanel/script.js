const firebaseConfig = {
    apiKey: "AIzaSyAeSH61bHvzIGaHZQkVNTm0h_JwPDBkwR8",
    authDomain: "adminpanel-4f546.firebaseapp.com",
    databaseURL: "https://adminpanel-4f546-default-rtdb.firebaseio.com",
    projectId: "adminpanel-4f546",
    storageBucket: "adminpanel-4f546.firebasestorage.app",
    messagingSenderId: "297227669007",
    appId: "1:297227669007:web:bc29affb495f376afd5d7a",
    measurementId: "G-NZK4NW6CZD"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            database.ref('users/' + userId).set({
                email: email,
                role: role
            }).then(() => {
                alert('Registration successful');
                window.location.href = 'login.html';
            });
        })
        .catch((error) => {
            alert(error.message);
        });
});
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            const userId = userCredential.user.uid;
            const userSnapshot = await database.ref('users/' + userId).once('value');
            const role = userSnapshot.val().role;

            sessionStorage.setItem('role', role);
            if (role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        })
        .catch((error) => {
            alert("Incorrect email or password!");
        });
});
function fetchProducts() {
    const userRole = sessionStorage.getItem('role');
    database.ref('products').on('value', (snapshot) => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const product = childSnapshot.val();
            const productElement = document.createElement('div');
            productElement.innerHTML = `<h3>${product.title}</h3><p>Price: $${product.price}</p><img src="${product.image}" alt="${product.title}" style="width:100px;"><hr>`;
            productList.appendChild(productElement);
        });
    });
}
if (document.title === "Admin Dashboard" || document.title === "User Dashboard") {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
        fetchProducts();
    } else if (role === 'user') {
        fetchProducts();
    } else {
        window.location.href = 'login.html';
    }
}
document.getElementById('add-product-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('product-title').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;

    const newProductRef = database.ref('products').push();
    newProductRef.set({
        title: title,
        price: price,
        image: image
    }).then(() => {
        alert('Product added successfully');
        fetchProducts();
    }).catch((error) => {
        alert(error.message);
    });
});
