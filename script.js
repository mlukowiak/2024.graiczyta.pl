const ctx = document.getElementById('multilayerPieChart').getContext('2d');

// Dane głównych kategorii i podkategorii
const mainCategories = ['Granie', 'Czytanie', 'Oglądanie', 'Sport'];
const subcategories = [
    'Steam', 'Xbox', 'PlayStation', 'Nintendo Switch',       // Podkategorie Gry
    'Książki', 'Komiksy',                                    // Podkategorie Czytanie
    'Filmy', 'Seriale',                                      // Podkategorie Oglądanie
    'Bieganie', 'Rower', 'Spacery', 'Siłownia'               // Podkategorie Sport
];

// Dane przypisane do głównych kategorii i podkategorii
const data = {
    labels: mainCategories,
    datasets: [
        // Zewnętrzny pierścień (główne kategorie)
        {
            data: [617, 20, 367, 20],
            backgroundColor: ['#1b2838', '#36a2eb', '#ffcd56', '#ffde56'],
            label: 'Main Categories'
        },
        // Wewnętrzny pierścień (podkategorie)
        {
            data: [ // Dane dla podkategorii
                362, // Steam (Gry)
                52, // Xbox (Gry)
                197, // PS (Gry)
                6,  // Switch (Gry)
                15, // Książki (Czytanie)
                5,  // Komiksy (Czytanie)
                257, // Filmy (Oglądanie)
                110, // Seriale (Oglądanie)
                5,  // Bieganie (Sport)
                5,  // Rower (Sport)
                5,  // Spacery (Sport)
                5   // Siłownia (Sport)
            ], 
            backgroundColor: [
                '#2a475e', // Steam (Gry)
                '#107C10', // Xbox (Gry)
                '#006FCD', // PS (Gry)
                '#e4000f', // Switch (Gry)
                '#9ad0f5', // Książki (Czytanie)
                '#a2d2ff', // Komiksy (Czytanie)
                '#ffd56b', // Filmy (Oglądanie)
                '#ffcb91'  // Seriale (Oglądanie)
            ],
            // Dodajemy subcategory labels
            labels: subcategories
        }
    ]
};

// Konfiguracja wykresu
const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    // Wyświetlanie tytułu tooltipa
                    title: function (tooltipItems) {
                        const tooltipItem = tooltipItems[0]; // Pierwszy tooltipItem w przypadku grup
                        if (tooltipItem.datasetIndex === 1) {
                            // Dla podkategorii obliczamy tytuł: "Główna kategoria: Podkategoria"
                            const mainCategoryIndex = tooltipItem.dataIndex < 4 ? 0 : 
                                                      tooltipItem.dataIndex < 6 ? 1 : 
                                                      tooltipItem.dataIndex < 8 ? 2 :3;
                            const mainCategory = mainCategories[mainCategoryIndex];
                            const subcategory = subcategories[tooltipItem.dataIndex];
                            return `${mainCategory}: ${subcategory}`;
                        }
                        // Dla głównych kategorii (zewnętrzny pierścień)
                        return data.labels[tooltipItem.dataIndex];
                    },
                    // Wyświetlanie treści tooltipa
                    label: function (tooltipItem) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const value = dataset.data[tooltipItem.dataIndex];
                        return `Ilość godzin: ${value}`;
                    }
                }
            },
            legend: {
                position: 'top',
            },
        }
    }
};

// Tworzenie wykresu
const multilayerPieChart = new Chart(ctx, config);
