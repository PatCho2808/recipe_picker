const path = window.location.pathname;
let item = null;

switch (path) {
	case '/add':
		item = document.querySelector('#header__item--add');
		break;
	default:
		item = document.querySelector('#header__item--main');
}

item.classList += ' header__item--active';
