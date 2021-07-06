const wsSlider = {
	container: '.ws-slider__container', //Основной блок
	slidIn: 4, //Сколько слайдов выводить
	margins: '20', // Отступы у слайдов
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

const $container = document.querySelector(wsSlider.container);
// const $btnBack = $container.querySelector(wsSlider.slideBack);
// const $btnNext = $container.querySelector(wsSlider.slideNext);
const $SliderBlock = $container.querySelector(wsSlider.content);
const $slideWrap = $container.querySelector(wsSlider.slideWrap);
const $slides = $container.querySelectorAll(wsSlider.slides);
const $paginationSelector = $container.querySelector(wsSlider.paginationSelector);
// const $domEl = $container.querySelector('wsSlider.');

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
	for (let i = 0; i < slidesLength; i++) {
		let span = document.createElement('span');
		span.className = "ws-slider__pg-items";
		selector.prepend(span);
	}
	$container.querySelector('.ws-slider__pg-items').classList.add('ws-slider__pg-active')
};
renderPagination($paginationSelector);


// Добавлен отступов между слайдами
function margens(margins = wsSlider.margins) {
	
	if(margins !== '0'){
		return sliderIteratingAndChangeCssVar($slides, '--ws-slides--margin', margins, 'px');
	}
}
margens(wsSlider.margins);


// Просчет ширины слайдов
function slidesWidth(wrap) {
	let marginValue = Number(wsSlider.margins);
	let slideQuantity =  Number(wsSlider.slidIn);
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
	if(widthValue <= +wsSlider.autoAdaptive340[0]){
		return wsSlider.slidIn = wsSlider.autoAdaptive340[1];
	}
	if(widthValue <= +wsSlider.autoAdaptive480[0]){
		return wsSlider.slidIn = wsSlider.autoAdaptive480[1];
	}
	if(widthValue <= +wsSlider.autoAdaptive580[0]){
		return wsSlider.slidIn = wsSlider.autoAdaptive580[1];
	}
	if(widthValue <= +wsSlider.autoAdaptive620[0]){
		return wsSlider.slidIn = wsSlider.autoAdaptive620[1];
	}
	if(widthValue <= +wsSlider.autoAdaptive780[0]){
		return wsSlider.slidIn = wsSlider.autoAdaptive780[1];
	}
	if(widthValue <= +wsSlider.autoAdaptive980[0]){
		return wsSlider.slidIn = wsSlider.autoAdaptive980[1];
	}
	if(widthValue <= +wsSlider.autoAdaptive1040[0]){
		return wsSlider.slidIn = wsSlider.autoAdaptive1040[1];
	}
}


// События клиск
function sliderEvents(selector){
	selector.addEventListener('click', ()=>{
		if(event.target.classList.contains(wsSlider.slideNext)){
			slideNext()
		}
		if(event.target.classList.contains(wsSlider.slideBack)){
			slideBack()
		}
	});
}
sliderEvents($container)

// Перелистываение сдйдов
{

let valueLength = Number(slidesLength) - Number(wsSlider.slidIn);
let countLength = valueLength;
let count = 0;

function slideNext(){
	if(count < valueLength){}
		countLength--;
		count++;
		console.log('valueLength',valueLength);
		console.log('Count = ',count);
};
function slideBack(){
	if(countLength < valueLength)
		countLength++;
		count++;
		console.log('valueLength',valueLength);
		console.log('Count = ',count);
};

}
















