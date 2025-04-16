# Global Currency Converter

## Overview
The **Global Currency Converter** is a web application that allows users to convert currencies between different countries. It features a user-friendly interface, real-time currency conversion, a chart for exchange rate trends, and a list of popular conversions.

## Features
- **Real-time Currency Conversion**: Input an amount and convert it between any two supported currencies.
- **Swap Currencies**: Easily swap the "From" and "To" currencies with a single click.
- **Popular Conversions**: Displays a list of frequently converted currency pairs.
- **Exchange Rate Trends**: Visualize exchange rate trends using a chart powered by Chart.js.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used
- **HTML5**: Structure of the web application.
- **CSS3**: Styling and layout.
- **JavaScript**: Functionality and interactivity.
- **Font Awesome**: Icons for a modern and intuitive user experience.
- **Google Fonts**: Custom fonts for a polished design.
- **Chart.js**: Visual representation of exchange rate trends.
- **ExchangeRate-API**: Source of real-time exchange rate data.

## Setup Instructions
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/global-currency-converter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd global-currency-converter
   ```
3. Open the `index.html` file in your web browser to run the application locally.

## File Structure
```
project-folder/
├── index.html          # Main HTML file
├── styles.css          # CSS file for styling
├── script.js           # JavaScript file for functionality
├── README.md           # Project documentation
├── assets/             # (Optional) Directory for additional assets (e.g., images)
```

## How to Use
1. Enter the amount you wish to convert in the input field.
2. Select the source currency (From) and the target currency (To) from the dropdown menus.
3. Click on the "Convert" button to see the conversion result.
4. View the latest exchange rate trends in the chart below.
5. Check out popular currency conversions for quick access.

## API Integration
This application uses the [ExchangeRate-API](https://www.exchangerate-api.com) to fetch real-time currency exchange rates. Ensure you have an API key from ExchangeRate-API and update the `script.js` file to include your key:

```javascript
const apiKey = 'your-api-key-here';
```

## Dependencies
- [Font Awesome](https://fontawesome.com)
- [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
- [Chart.js](https://www.chartjs.org)

## License
This project is licensed under the MIT License. Feel free to use and modify the code as per your needs.

## Credits
- Exchange rate data provided by [ExchangeRate-API](https://www.exchangerate-api.com).
- Icons by [Font Awesome](https://fontawesome.com).
- Charting library by [Chart.js](https://www.chartjs.org).

---

**Note**: The application requires a stable internet connection to fetch live exchange rate data and to load external libraries.
