document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.category-btn');
    const level1 = document.querySelector('.level1');
    const level2 = document.querySelector('.level2');
    const level3 = document.querySelector('.level3');
    const womanImage = document.querySelector('.main-category-block img');

    function clearSubMenus() {
        level1.innerHTML = '';
        level2.innerHTML = '';
        level3.innerHTML = '';
        level2.style.display = 'none';
        level3.style.display = 'none';
    }

    function clearArrows(level) {
        level.querySelectorAll('.category-btn > .arrow').forEach(arrow => arrow.remove());
    }

    function addArrowToItem(item) {
        if (!item.querySelector('.arrow')) {
            const arrow = document.createElement('span');
            arrow.classList.add('arrow');
            arrow.innerHTML = '>';
            item.appendChild(arrow);
        }
    }

    function populateMenu(menu, data) {
        let menuHtml = '';
        data.forEach(sub => {
            for (const key in sub) {
                if (Array.isArray(sub[key])) {
                    menuHtml += `<li class="submenu-item category-btn" data-sub='${JSON.stringify(sub[key])}'>${key} <span class="arrow">></span></li>`;
                } else {
                    menuHtml += `<li class="category-btn">${sub[key].name}</li>`;
                }
            }
        });
        menu.innerHTML = menuHtml;

        // Add event listeners to submenu items
        document.querySelectorAll('.submenu-item').forEach(submenuItem => {
            submenuItem.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent triggering parent click event
                const subMenuData = JSON.parse(submenuItem.getAttribute('data-sub'));

                // Add arrow to the clicked submenu item
                clearArrows(menu); // Ensure only one arrow per level
                addArrowToItem(submenuItem);

                if (menu === level1) {
                    if (!level2.classList.contains('open')) {
                        level2.style.display = 'block';
                        level3.style.display = 'none';
                        level1.classList.add('open');
                        level2.classList.remove('open');
                        level3.classList.remove('open');
                        populateMenu(level2, subMenuData);
                    }
                } else if (menu === level2) {
                    if (!level3.classList.contains('open')) {
                        level3.style.display = 'block';
                        level2.classList.add('open');
                        level3.classList.remove('open');
                        populateMenu(level3, subMenuData);
                    }
                }
            });
        });
    }

    function addCategoryButtonEventListeners() {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Hide the woman image when a category button is clicked
                womanImage.style.display = 'none';

                // Remove open class from all menu items
                document.querySelectorAll('.main-category-block ul').forEach(ul => ul.classList.remove('open'));
                // Add open class to the clicked item's parent ul
                item.parentElement.classList.add('open');

                // Add arrow to the clicked item
                clearArrows(item.parentElement); // Ensure only one arrow per level
                addArrowToItem(item);

                // Clear previous submenus
                clearSubMenus();

                // Show and populate level1 menu
                const subMenuData = JSON.parse(item.getAttribute('data-sub'));
                level1.style.display = 'block';
                populateMenu(level1, subMenuData);
            });
        });
    }

    addCategoryButtonEventListeners();
});
