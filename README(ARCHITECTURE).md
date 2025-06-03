📁 Folder Responsibilities

components/

    Purpose: UI-only components shared across features.

    Examples: Button, ProductCard, Navbar, Modal.

    Rule: No business logic or Firebase here — pure layout and styling.

features/

    Purpose: Handle full logic and views for each app domain (auth, products, cart).

    Structure: Keep everything scoped per feature.

    Each feature should include:

    A main view (e.g. CartPage.jsx)

    A service file to handle API/Firestore (cartService.js)

    Optional helper or hook files if needed

features/auth/

    Purpose: Handle sign in, sign up, logout, and user session

    Key File: authService.js

    Uses Firebase Auth methods (createUserWithEmail, signInWithEmail, signOut)

features/products/

    Purpose: Create, view, list, and manage products

    Key File: productService.js

    Handles CRUD in Firestore (addProduct, getProducts, getProductById)

    Trending logic based on views or purchases can be added here

features/cart/

    Purpose: Shopping cart UI and logic

    Key File: cartService.js

    Stores cart in localStorage for guests

    For signed-in users, sync with Firestore

pages/

    Purpose: Route-level containers, which compose features and layout

    Examples: HomePage, ProductDetailPage

    You can have conditional rendering for guest vs. signed-in layouts

services/

    Purpose: General services like Firebase initialization

    Key File: firebase.js

    Contains your firebaseConfig, getFirestore(), getAuth() setup

contexts/

    Purpose: Provide global state using React Context API

    Files:

    AuthContext.jsx: Wraps app and exposes currentUser

    CartContext.jsx: Manages global cart state across pages

App.jsx

    Purpose: Define routes, layout wrappers, protected routes

main.jsx

    Purpose: App entry — wraps App with Context Providers

🧠 Learning Outcomes

Modular app structure

Clear separation of UI, logic, and services

Easy to maintain and extend with new features

Readable and scalable architecture
