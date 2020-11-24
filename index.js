const fruitsList = document.querySelector('.fruits__list'); 
const shuffleButton = document.querySelector('.shuffle__btn'); 
const filterButton = document.querySelector('.filter__btn'); 
const sortKindLabel = document.querySelector('.sort__kind'); 
const sortTimeLabel = document.querySelector('.sort__time'); 
const sortChangeButton = document.querySelector('.sort__change__btn'); 
const sortActionButton = document.querySelector('.sort__action__btn'); 
const kindInput = document.querySelector('.kind__input');
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input');
const minweightInput = document.querySelector('.minweight__input'); 
const maxweightInput = document.querySelector('.maxweight__input');
const addActionButton = document.querySelector('.add__action__btn'); 

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);


const display = () => {
  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    var newil = document.createElement("il");
    var div = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
      div.appendChild(div1);
      div.appendChild(div2);
      div.appendChild(div3);
      div.appendChild(div4);
      newil.appendChild(div);
      fruitsList.appendChild(newil);

      newil.classList.add("fruit__item");
      div.classList.add("fruit__info");
      div1.innerHTML = 'index: ' + i;
      div2.innerHTML = 'kind: ' + fruits[i]["kind"];
      div3.innerHTML = 'color: ' + fruits[i]["color"];
      div4.innerHTML = 'weight: ' + fruits[i]["weight"];
  }
};


display();



const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const shuffleFruits = () => {
  let result = [];

  while (fruits.length > 0) {
    var randomIndex = getRandomInt(0,fruits.length-1);
    var arrayElement = fruits[randomIndex];
    fruits.splice(randomIndex,1);
    result.push(arrayElement);
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});



const filterFruits = () => {
	let result = [];
	var min = minweightInput.value;
	var max = maxweightInput.value;
	fruits.filter((item) => {
		if (min <= item["weight"] && max >= item["weight"]) {
			result.push(item);
		} 
	});
	fruits = result;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});



let sortKind = 'bubbleSort'; 
let sortTime = '-'; 
let colorweight = {'розово-красный':1, 'желтый':2, 'зеленый':3, 'фиолетовый':4, 'светло-коричневый':5};

const comparationColor = (a, b) => {
  return colorweight[a.color] < colorweight[b.color]?true : false; 

};

const sortAPI = {
  bubbleSort(arr, comparation) {
	const n = arr.length;
    for (let i = 0; i < n-1; i++) { 
	   for (let j = 0; j < n-1-i; j++) { 
		   if (comparation(arr[j], arr[j+1])) { 
			   let temp = arr[j+1]; 
			   arr[j+1] = arr[j]; 
			   arr[j] = temp; 
		   }
	   }
	}                    

  },

  quickSort(arr, comparation) {
    var sortres = quickSort(arr);
    arr = sortres.reverse();
  },

  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  if (sortKind == 'bubbleSort') {
		sortKind = 'quickSort';
  } else {
		sortKind = 'bubbleSort';
  }
  sortKindLabel.textContent = sortKind;
  
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});


addActionButton.addEventListener('click', () => {
    var newkind = kindInput.value;
    var newcolor = colorInput.value;
    var newweight = weightInput.value;
    if ( newkind == '' || newcolor == '' || newweight == '' ){
      alert('Вы не заполнили все поля.');
    } else {
      result = {'kind':newkind, 'color':newcolor, 'weight':newweight};
      fruits.push(result);
      kindInput.value = '';
      colorInput.value = '';
      weightInput.value = '';
    }
    
  display();
});




//////////////////////////////////////////////////////
function swap(items, firstIndex, secondIndex){
   const temp = items[firstIndex];
   items[firstIndex] = items[secondIndex];
   items[secondIndex] = temp;
}

function partition(items, left, right) {
   var pivot = items[Math.floor((right + left) / 2)],
       i = left,
       j = right;
	   pivot = colorweight[pivot.color]; 
	
   while (i <= j) {
       while (colorweight[items[i].color] < pivot) { 
           i++;
       }
       while (colorweight[items[j].color] > pivot) { 
           j--;
       }
       if (i <= j) {
           swap(items, i, j);
           i++;
           j--;
       }
   }
   return i;
}

function quickSort(items, left, right) {
   var index;
   if (items.length > 1) {
       left = typeof left != "number" ? 0 : left;
       right = typeof right != "number" ? items.length - 1 : right;
       index = partition(items, left, right);
       if (left < index - 1) {
           quickSort(items, left, index - 1);
       }
       if (index < right) {
           quickSort(items, index, right);
       }
   }
   return items;
}






