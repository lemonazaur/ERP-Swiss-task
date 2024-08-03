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
    }

    function populateMenu(menu, data) {
        let menuHtml = '';
        data.forEach(sub => {
            for (const key in sub) {
                if (Array.isArray(sub[key])) {
                    menuHtml += `<li class="submenu-item" data-sub='${JSON.stringify(sub[key])}'>${key} <span class="arrow">></span></li>`;
                } else {
                    menuHtml += `<li>${sub[key].name}</li>`;
                }
            }
        });
        menu.innerHTML = menuHtml;

        // Add event listeners to submenu items
        document.querySelectorAll('.submenu-item').forEach(submenuItem => {
            submenuItem.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent triggering parent click event
                const subMenuData = JSON.parse(submenuItem.getAttribute('data-sub'));
                if (menu === level1) {
                    level2.style.display = 'block';
                    level3.style.display = 'none';
                    populateMenu(level2, subMenuData);
                } else if (menu === level2) {
                    level3.style.display = 'block';
                    populateMenu(level3, subMenuData);
                }
            });
        });
    }

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Hide the woman image when a category button is clicked
            womanImage.style.display = 'none';

            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active class to the clicked item
            item.classList.add('active');

            // Clear previous submenus
            clearSubMenus();

            // Show and populate level1 menu
            const subMenuData = JSON.parse(item.getAttribute('data-sub'));
            level1.style.display = 'block';
            populateMenu(level1, subMenuData);
        });
    });
});
