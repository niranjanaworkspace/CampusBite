# CampusBite - Canteen Order Management System

CampusBite is a simple website for managing student food orders in a college canteen. It helps staff add orders, manage waiting orders, update order status, and search order records.

## Technologies Used
HTML, CSS, JavaScript, and Java.

## Data Structures
- **Queue:** Manages waiting orders in the order they arrive.
- **Linked List:** Stores order records.
- **Binary Search Tree:** Searches for orders by order number.

## Files
- `index.html` – Website structure
- `style.css` – Website design
- `script.js` – Website functionality
- `CampusBite.java` – Java demonstration of the data structures

Keep these files together in the same project folder.

## How to Use the Website
Open `index.html` in a browser. Enter the student's name, choose a food item and quantity, then click **Add order**. Use **Start next order** to begin preparing the next order. Use **Search** to find an order by its number.

## Run the Java Program
Install the Java JDK and open Command Prompt or Terminal in the project folder. Run:

```bash
javac CampusBite.java
java CampusBite
```

The output appears in the terminal. The Java program runs separately from the website.

## Publish the Website
Upload the project files to a public GitHub repository. Open **Settings → Pages**, select the `main` branch and `/ (root)` folder, and save. GitHub Pages will provide a website link after publishing. GitHub Pages hosts the website files; it does not run the Java program.

## Note
This project is for educational purposes. Website demo orders reset when the page is refreshed.
