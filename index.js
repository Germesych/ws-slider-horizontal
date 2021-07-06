const wsSlider = {
	container: '.ws-slider__container', //Основной блок
	slidIn: 4, //Сколько слайдов выводить
	margins: '0', // Отступы у слайдов
	pagination: true, // Надо ли пагинация
	content: '.ws-slider__content', //Блок в котором лежал слайны и навигация(поумлочанию там навигационные кнопки)
	slideWrap: '.ws-slider__wrap', // Обертка слайдов
	slides: '.ws-slider__slides', // Селектор слайдов
	paginationSelector: '.ws-slider__pagination', // Пагинация слайдов
	slideNext: 'ws-slider__next', // Навигация сладера (следующий)
	slideBack: 'ws-slider__back', // Навигация сладера (предыдущий)
	slidesCustom: '1', // Какой слайд сделать кастомным стилем
	autoAdaptive1040: ['1040', '4'],
	autoAdaptive980: ['980', '4'],
	autoAdaptive780: ['780', '3'],
	autoAdaptive620: ['620', '3'],
	autoAdaptive580: ['580', '2'],
	autoAdaptive480: ['480', '2'],
	autoAdaptive340: ['340', '1'],
}

let mainObj = wsSlider;
/**
 * Документация к wsSlider:
 * 
 * container //Основной блок в котором распологается весь слайдер
 * slidIn //Сколько слайдов выводить
 * margins // Отступы у слайдов
 * pagination // Надо ли пагинация
 * content: '.ws-slider__content', //Блок в котором
 * лежат слайды и навигация(поумлочанию там навигационные кнопки)
 * slideWrap // Обертка сладов
 * slides // Селектор слайдов
 * paginationSelector // Пагинация слайдов
 * slideNext // Навигация сладера (следующий)
 * slideBack // Навигация сладера (предыдущий)
 * slidesCustom // Какой слайд сделать кастомным стилем
 * 
*/

/**
 * .ws-slider__active
 * .ws-slider__slides
 * .ws-slider__pg-items
 * .ws-slider__pg-active
*/

const $container = document.querySelector(mainObj.container);
const $SliderBlock = $container.querySelector(mainObj.content);
const $slideWrap = $container.querySelector(mainObj.slideWrap);
const $slides = $container.querySelectorAll(mainObj.slides);
const $paginationSelector = $container.querySelector(mainObj.paginationSelector);

let slidesLength = $slides.length;
let widthWrap = Number($SliderBlock.clientWidth);

sliderAutoAdaptive(widthWrap);


function sliderIteratingAndChangeCssVar(selector, nameVars, valueVars, varsStr = ''){
		selector.forEach(function(i) {
		i.style.setProperty(`${nameVars}`, `${valueVars}${varsStr}`);
	});
}

// Генирация пагинации слайдера
function renderPagination(selector){
	for (let i = 0; i < (Number(slidesLength) - Number(mainObj.slidIn) + 1); i++) {
		let span = document.createElement('span');
		span.className = "ws-slider__pg-items";
		selector.prepend(span);
	}
};
renderPagination($paginationSelector);


// Добавлен отступов между слайдами
function margens(margins = mainObj.margins) {
	
	if(margins !== '0'){
		return sliderIteratingAndChangeCssVar($slides, '--ws-slides--margin', margins, 'px');
	}
}
margens(mainObj.margins);


// Просчет ширины слайдов
function slidesWidth(wrap) {
	let marginValue = Number(mainObj.margins);
	let slideQuantity =  Number(mainObj.slidIn);
	let widthSlid = (widthWrap / slideQuantity)
	if(marginValue !== 0){
		let sumWidth = (widthWrap - ((slideQuantity -1) * marginValue)) / slideQuantity;
		return sliderIteratingAndChangeCssVar($slides, '--ws-slides--width', sumWidth,'px');
	}
	let sumWidth = widthSlid;
	sliderIteratingAndChangeCssVar($slides, '--ws-slides--width', sumWidth,'px');
}
slidesWidth($SliderBlock);


// Автоматический адаптив
function sliderAutoAdaptive(widthValue) {
	if(widthValue <= Number(mainObj.autoAdaptive340[0])){
		return mainObj.slidIn = mainObj.autoAdaptive340[1];
	}
	if(widthValue <= Number(mainObj.autoAdaptive480[0])){
		return mainObj.slidIn = mainObj.autoAdaptive480[1];
	}
	if(widthValue <= Number(mainObj.autoAdaptive580[0])){
		return mainObj.slidIn = mainObj.autoAdaptive580[1];
	}
	if(widthValue <= Number(mainObj.autoAdaptive620[0])){
		return mainObj.slidIn = mainObj.autoAdaptive620[1];
	}
	if(widthValue <= Number(mainObj.autoAdaptive780[0])){
		return mainObj.slidIn = mainObj.autoAdaptive780[1];
	}
	if(widthValue <= Number(mainObj.autoAdaptive980[0])){
		return mainObj.slidIn = mainObj.autoAdaptive980[1];
	}
	if(widthValue <= Number(mainObj.autoAdaptive1040[0])){
		return mainObj.slidIn = mainObj.autoAdaptive1040[1];
	}
}


// События клиск
function sliderEvents(selector){
	selector.addEventListener('click', ()=>{
		if(event.target.classList.contains(mainObj.slideNext)){
			slideNext()
		}
		if(event.target.classList.contains(mainObj.slideBack)){
			slideBack()
		}
	});
}
sliderEvents($container)

// Перелистываение сдйдов
{

let valueLength = Number(slidesLength) - Number(mainObj.slidIn);
let countLength = valueLength;
let count = 0;
let id = 0;
let idPg = id;

let marginsNum = Number(mainObj.margins);
let shiftValue = Number($slides[0].clientWidth) + marginsNum;
let shiftCount = 0;

function slideNext(){
	if(count < valueLength){
		idPg++;
		count++;
		countLength--;
		paginstionCouunt(idPg);
		shiftCount = (shiftCount + shiftValue);
		$slideWrap.style.left = `-${shiftCount}px`;
	}
};
function slideBack(){
	if(countLength < valueLength){
		countLength++;
		count--;
		idPg--;
		paginstionCouunt(idPg);
		shiftCount = shiftCount - shiftValue;
		$slideWrap.style.left = `-${shiftCount}px`;
	}
};

//Пагинация
function paginstionCouunt(idndex = id){
	let items = $paginationSelector.querySelectorAll('.ws-slider__pg-items');
	items.forEach(function(i) {
		i.classList.remove('ws-slider__pg-active');
	});
	items[idndex].classList.add('ws-slider__pg-active');
}
paginstionCouunt();

}
















