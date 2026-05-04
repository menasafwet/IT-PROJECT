
function toggleTheme() {
    const body = document.getElementById('body-tag');
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    }
}

function validateContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const errorBox = document.getElementById('error-message');
    let errors = [];

    if (name.trim().length < 10) {
        errors.push("الاسم يجب أن يكون كاملاً (أكثر من 10 حروف)");
    }
    if (!email.includes("@")) {
        errors.push("البريد الإلكتروني غير صالح");
    }

    if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
        errorBox.style.color = "red";
    } else {
        alert("شكراً لك! تم الحفظ بنجاح");
        localStorage.setItem('lastUser', name);
    }
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('my_cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('my_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('my_cart')) || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.innerText = cart.length;
}

document.addEventListener('click', function(e) {
    const isBookContent = e.target.closest('.book-card img') || e.target.closest('.book-card h3');
    if (isBookContent) {
        window.location.href = 'product-detail.html';
    }
});

window.onload = () => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.getElementById('body-tag').className = savedTheme;
    updateCartCount();
}
        const library = [
            {
                category: "سلسلة خوف",
                books: [
                    { name: "خوف 1", price: 150, img: "khof1.jpg" },
                    { name: "خوف 2", price: 160, img: "khof2.jpg" },
                    { name: "خوف 3", price: 170, img: "khof3.jpg" }
                ]
            },
            {
                category: "ملحمة البحور السبعة (لج)",
                books: [
                    { name: "لج", price: 140, img: "laj1.jpg" },
                    { name: "ملكة الغرانيق", price: 145, img: "laj2.jpg" },
                    { name: "ثورة الحور", price: 150, img: "laj3.jpg" },
                    { name: "صراع الملكات", price: 155, img: "laj4.jpg" },
                    { name: "فجر السايرينات", price: 160, img: "laj5.jpg" }
                ]
            },
            {
                category: "سلسلة بساتين عربستان",
                books: [
                    { name: "بساتين عربستان", price: 180, img: "bas1.jpg" },
                    { name: "عصبة الشياطين", price: 180, img: "bas2.jpg" },
                    { name: "رياح الهجر", price: 180, img: "bas3.jpg" },
                    { name: "عرجاء", price: 190, img: "bas4.jpg" },
                    { name: "الساحرة الهجينة", price: 190, img: "bas5.jpg" },
                    { name: "عرين الأسد", price: 195, img: "bas6.jpg" }
                ]
            },
            {
                category: "ثلاثية صخب الخسيف",
                books: [
                    { name: "صخب الخسيف 1", price: 130, img: "sakhb1.jpg" },
                    { name: "صخب الخسيف 2", price: 135, img: "sakhb2.jpg" },
                    { name: "صخب الخسيف 3", price: 140, img: "sakhb3.jpg" }
                ]
            },
            {
                category: "روايات منفردة وإصدارات أخرى",
                books: [
                    { name: "الدوائر الخمس", price: 120, img: "circles.jpg" },
                    { name: "مخطوطات مدفونة", price: 130, img: "manuscripts.jpg" },
                                    { name: "الانتهازية", price: 110, img: "opportunism.jpg" },
                    { name: "أرض القرابين", price: 140, img: "land.jpg" },
                    { name: "شبكة العنكبوت", price: 135, img: "spider.jpg" },
                    { name: "جحيم العابرين", price: 145, img: "hell.jpg" }
                ]
            }
        ];

        const container = document.getElementById('library-container');

        library.forEach(section => {
            let sectionHTML = `<h2 class="category-title">${section.category}</h2><div class="products-grid">`;
            section.books.forEach(book => {
                sectionHTML += `
                    <div class="book-card">
                        <img src="${book.img}" alt="${book.name}">
                        <h4>${book.name}</h4>
                        <p>${book.price} EGP</p>
                        <button onclick="addToCart('${book.name}', ${book.price})" class="btn">إضافة للسلة</button>
                    </div>
                `;
            });
            sectionHTML += `</div>`;
            container.innerHTML += sectionHTML;
        });
    
        
        function saveUserData() {
            const user = document.getElementById('reg-user').value;
            const pass = document.getElementById('reg-pass').value;
            const status = document.getElementById('reg-status');

            if (user.length < 5 || pass.length < 5) {
                status.innerText = "الاسم وكلمة المرور يجب أن يكونا أكثر من 5 أحرف";
                status.style.color = "red";
            } else {
                
                localStorage.setItem('registeredUser', user);
                localStorage.setItem('registeredPass', pass);
                
                status.innerText = "تم إنشاء الحساب بنجاح! يمكنك الدخول الآن.";
                status.style.color = "green";
                
                setTimeout(() => {
                    window.location.href = "dashdoard.html";
                }, 2000);
            }
        }
   
        window.onload = () => {
            const savedTheme = localStorage.getItem('theme') || 'light-theme';
            document.getElementById('body-tag').className = savedTheme;
            displayCart();
        };

        function displayCart() {
            let cart = JSON.parse(localStorage.getItem('my_cart')) || [];
            let tableBody = document.getElementById('cart-items');
            let total = 0;
            tableBody.innerHTML = "";

            cart.forEach((item, index) => {
                total += item.price;
                tableBody.innerHTML += `
                    <tr>
                        <td style="padding:10px; border-bottom:1px solid #ddd;">${item.name}</td>
                        <td style="border-bottom:1px solid #ddd;">${item.price}</td>
                        <td style="border-bottom:1px solid #ddd;"><button onclick="removeFromCart(${index})" style="color:red;">حذف</button></td>
                    </tr>`;
            });
            document.getElementById('total-amount').innerText = total;
        }

        function removeFromCart(index) {
            let cart = JSON.parse(localStorage.getItem('my_cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('my_cart', JSON.stringify(cart));
            displayCart();
        }
        function processCheckout() {
            let cart = JSON.parse(localStorage.getItem('my_cart')) || [];
            if (cart.length === 0) {
                alert("السلة فارغة حالياً!");
            } else {
                alert("شكراً لشرائك من مكتبة المعلم! سيتم معالجة طلبك.");
            }
        }
    