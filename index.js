// Gerar dados aleatorios para o grafico
var dados = Array.from({ length: 12 }, () => Math.floor(Math.random() * 700 + 100));


// criando os selects de product e brand
var food = ["Fruit", "Candy", "Meat", "Vegetable"];
var clothes = ["Shirt", "Pants", "Shoes", "Jacket"];
var toy = ["Ball", "Doll", "Teddy", "Car"];
var electronic = ["Laptop", "Smartphone", "Watch", "Tablet"];
var select_cat = document.getElementById("category");
var select_prod = document.getElementById("product");
var select_brand = document.getElementById("brand");
var chart = document.querySelector("#chart");
createSelect(select_prod, food);
createSelectBrand();
getGraph(dados)

// ao alterar o select de category, atualiza os outros dois selects e cria novos dados randomicos para o grafico
$("#category").change(function() {
    var selected = $("#category").val();
    if (selected == 1) {
        dados = Array.from({ length: 12 }, () => Math.floor(Math.random() * 700 + 100));
        buildSelects(food);
        getGraph(fruit1);
    } else if (selected == 2) {
        dados = Array.from({ length: 12 }, () => Math.floor(Math.random() * 700 + 100));
        buildSelects(clothes);
        getGraph(dados);
    } else if (selected == 3) {
        dados = Array.from({ length: 12 }, () => Math.floor(Math.random() * 700 + 100));
        buildSelects(toy);
        getGraph(dados);
    } else {
        dados = Array.from({ length: 12 }, () => Math.floor(Math.random() * 700 + 100));
        buildSelects(electronic);
        getGraph(dados);

    }
});

// ao alterar o select de product, atualiza o select de brand e cria novos dados randomicos para o grafico
$("#product").change(function() {
    dados = Array.from({ length: 12 }, () => Math.floor(Math.random() * 700 + 100));
    select_brand.length = 0;
    createSelectBrand();
    getGraph(dados);
});

// ao alterar o select de brand, cria novos dados randomicos para o grafico
$("#brand").change(function() {
    dados = Array.from({ length: 12 }, () => Math.floor(Math.random() * 700 + 100));
    getGraph(dados);
});

// funcao auxiliar para atualizar os selects de product e brand
function buildSelects(array) {
    select_prod.length = 0;
    select_brand.length = 0;
    createSelect(select_prod, array);
    createSelectBrand();
}


// funcao que gera o select brand com base no valor do select product
function createSelectBrand() {
    var product = $("#product").val();
    var products = [];
    for (i = 1; i < 5; i++) {
        products.push(product + i);
    }
    createSelect(select_brand, products);
}

// funcao que recebe um select e um vetor, e retorna os elementos do vetor como opcoes
function createSelect(select, options) {

    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

// Função para alternar entre os tipos de gráfico
function changeChartType(type) {
    currentChartType = type;
    getGraph(dados, currentChartType);
}

// funcao responsavel por plotar o grafico
function getGraph(dados, chartType = 'bar') {

    var options = {
        series: [{
            name: "sales",
            data: dados,
        }],
        chart: {
            type: chartType,
            height: "450px"
        },
        xaxis: {
            categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            labels: {
                style: {
                    fontSize: '14px',
                    fontWeight: 700
                }
            },
            title: {
                text: 'Months',
                style: {
                    fontSize: '14px',
                    fontWeight: 700
                }
            }
        },
        yaxis: {
            title: {
                style: {
                    fontSize: '14px',
                    fontWeight: 700
                },
                text: 'Sales'
            }
        },
        colors: ['#85b3e3'],
       

    };
    
    $("#chart").html("");
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

//ouvintes de eventos para mudanças nas categorias, produtos e marcas
document.getElementById('category').addEventListener('change', function () {
    currentCategory = parseInt(this.value);
    getGraph(dados, currentChartType);
});

document.getElementById('product').addEventListener('change', function () {
   
    getGraph(dados, currentChartType);
});

document.getElementById('brand').addEventListener('change', function () {
    
    getGraph(dados, currentChartType);
});