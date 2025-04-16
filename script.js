document.addEventListener('DOMContentLoaded', function() {
    // API endpoint for currency data
    const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
    const API_URL = 'https://v6.exchangerate-api.com/v6/';
    
    // DOM elements
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency-select');
    const toCurrencySelect = document.getElementById('to-currency-select');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-currencies');
    const resultElement = document.getElementById('conversion-result');
    const updateTimeElement = document.getElementById('update-time');
    const resultAnimation = document.querySelector('.result-animation');
    const popularList = document.getElementById('popular-list');
    
    // Chart element
    const chartCanvas = document.getElementById('exchange-chart');
    let exchangeChart;
    
    // Currency data
    let currencyData = {};
    let popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];
    
    // Initialize the app
    init();
    
    // Initialize function
    async function init() {
        try {
            // Fetch currency data
            await fetchCurrencyData();
            
            // Populate currency dropdowns
            populateCurrencyDropdowns();
            
            // Set default values
            fromCurrencySelect.value = 'USD';
            toCurrencySelect.value = 'EUR';
            
            // Perform initial conversion
            convertCurrency();
            
            // Create popular conversions
            createPopularConversions();
            
            // Initialize chart
            initChart();
            
            // Add event listeners
            addEventListeners();
        } catch (error) {
            console.error('Initialization error:', error);
            alert('Failed to initialize the currency converter. Please try again later.');
        }
    }
    
    // Fetch currency data from API
    async function fetchCurrencyData() {
        try {
            // For demo purposes, we'll use a free API that doesn't require an API key
            // In a production environment, you should use a proper API with your key
            const response = await fetch('https://open.er-api.com/v6/latest/USD');
            const data = await response.json();
            
            if (data.result === 'success') {
                currencyData = {
                    base: data.base_code,
                    rates: data.rates,
                    timeLastUpdated: new Date(data.time_last_update_unix * 1000)
                };
                
                updateTimeElement.textContent = formatDate(currencyData.timeLastUpdated);
            } else {
                throw new Error('Failed to fetch currency data');
            }
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    
    // Populate currency dropdowns
    function populateCurrencyDropdowns() {
        const currencies = Object.keys(currencyData.rates);
        
        // Sort currencies alphabetically
        currencies.sort();
        
        // Clear existing options
        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';
        
        // Add options to dropdowns
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = `${currency} - ${getCurrencyName(currency)}`;
            
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = `${currency} - ${getCurrencyName(currency)}`;
            
            fromCurrencySelect.appendChild(option1);
            toCurrencySelect.appendChild(option2);
        });
    }
    
    // Convert currency
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }
        
        // Show loading animation
        resultAnimation.classList.add('active');
        
        setTimeout(() => {
            try {
                // Get exchange rates
                const fromRate = currencyData.rates[fromCurrency];
                const toRate = currencyData.rates[toCurrency];
                
                // Calculate conversion
                const convertedAmount = (amount / fromRate) * toRate;
                
                // Format result
                const formattedAmount = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: toCurrency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4
                }).format(convertedAmount);
                
                // Display result
                resultElement.textContent = `${amount} ${fromCurrency} = ${formattedAmount}`;
                
                // Update chart
                updateChart(fromCurrency, toCurrency);
            } catch (error) {
                console.error('Conversion error:', error);
                resultElement.textContent = 'Conversion failed. Please try again.';
            } finally {
                // Hide loading animation
                resultAnimation.classList.remove('active');
            }
        }, 800); // Simulate API delay for better UX
    }
    
    // Create popular conversions
    function createPopularConversions() {
        popularList.innerHTML = '';
        
        // Base currency (USD by default)
        const baseCurrency = 'USD';
        
        // Create popular conversion items
        popularCurrencies.forEach(currency => {
            if (currency !== baseCurrency) {
                const rate = currencyData.rates[currency];
                const convertedAmount = rate.toFixed(2);
                
                const popularItem = document.createElement('div');
                popularItem.className = 'popular-item';
                popularItem.innerHTML = `
                    <p><strong>1 ${baseCurrency} = ${convertedAmount} ${currency}</strong></p>
                    <p>${getCurrencyName(currency)}</p>
                `;
                
                // Add click event to set the conversion
                popularItem.addEventListener('click', () => {
                    fromCurrencySelect.value = baseCurrency;
                    toCurrencySelect.value = currency;
                    amountInput.value = 1;
                    convertCurrency();
                });
                
                popularList.appendChild(popularItem);
            }
        });
    }
    
    // Initialize chart
    function initChart() {
        const ctx = chartCanvas.getContext('2d');
        
        exchangeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['7 days ago', '6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Today'],
                datasets: [{
                    label: 'Exchange Rate',
                    data: [0, 0, 0, 0, 0, 0, 0],
                    borderColor: '#6c5ce7',
                    backgroundColor: 'rgba(108, 92, 231, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
        
        // Initial chart update
        updateChart('USD', 'EUR');
    }
    
    // Update chart with simulated historical data
    function updateChart(fromCurrency, toCurrency) {
        // Get current rate
        const fromRate = currencyData.rates[fromCurrency];
        const toRate = currencyData.rates[toCurrency];
        const currentRate = toRate / fromRate;
        
        // Generate simulated historical data (in a real app, you would fetch this from an API)
        const historicalRates = generateSimulatedHistoricalRates(currentRate);
        
        // Update chart data
        exchangeChart.data.datasets[0].data = historicalRates;
        exchangeChart.data.datasets[0].label = `${fromCurrency} to ${toCurrency} Exchange Rate`;
        exchangeChart.update();
    }
    
    // Generate simulated historical rates for the chart
    function generateSimulatedHistoricalRates(currentRate) {
        const rates = [];
        const volatility = 0.05; // 5% max volatility
        
        for (let i = 0; i < 7; i++) {
            // Generate a random fluctuation within the volatility range
            const fluctuation = (Math.random() * 2 - 1) * volatility;
            
            // Calculate a historical rate based on the current rate and the fluctuation
            // The further back in time, the more potential for difference
            const historicalRate = currentRate * (1 + fluctuation * (i / 7));
            
            rates.push(historicalRate);
        }
        
        // The last value should be the current rate
        rates[6] = currentRate;
        
        return rates;
    }
    
    // Add event listeners
    function addEventListeners() {
        // Convert button click
        convertBtn.addEventListener('click', convertCurrency);
        
        // Swap currencies button click
        swapBtn.addEventListener('click', () => {
            const tempCurrency = fromCurrencySelect.value;
            fromCurrencySelect.value = toCurrencySelect.value;
            toCurrencySelect.value = tempCurrency;
            
            // Add animation class
            swapBtn.classList.add('swap-animation');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                swapBtn.classList.remove('swap-animation');
            }, 500);
            
            convertCurrency();
        });
        
        // Input and select change events
        amountInput.addEventListener('input', debounce(convertCurrency, 500));
        fromCurrencySelect.addEventListener('change', convertCurrency);
        toCurrencySelect.addEventListener('change', convertCurrency);
    }
    
    // Helper function to format date
    function formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
    
    // Helper function to get currency name
    function getCurrencyName(code) {
        const currencyNames = {
            'USD': 'US Dollar',
            'EUR': 'Euro',
            'GBP': 'British Pound',
            'JPY': 'Japanese Yen',
            'AUD': 'Australian Dollar',
            'CAD': 'Canadian Dollar',
            'CHF': 'Swiss Franc',
            'CNY': 'Chinese Yuan',
            'INR': 'Indian Rupee',
            'MXN': 'Mexican Peso',
            'SGD': 'Singapore Dollar',
            'NZD': 'New Zealand Dollar',
            'SEK': 'Swedish Krona',
            'NOK': 'Norwegian Krone',
            'KRW': 'South Korean Won',
            'TRY': 'Turkish Lira',
            'RUB': 'Russian Ruble',
            'BRL': 'Brazilian Real',
            'ZAR': 'South African Rand',
            'HKD': 'Hong Kong Dollar'
            // Add more currencies as needed
        };
        
        return currencyNames[code] || code;
    }
    
    // Debounce function to limit how often a function is called
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
});