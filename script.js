
const themeBtn = document.getElementById('theme-btn');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

themeBtn.onclick = function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
};


document.getElementById('contactForm').onsubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    
    if (name.length < 5) {
        alert("خطأ: يرجى كتابة الاسم بالكامل (أكثر من 5 حروف)");
    } else if (!email.includes("@") || email.length < 5) {
        alert("خطأ: يرجى كتابة بريد إلكتروني صحيح");
    } else if (message.length < 10) {
        alert("خطأ: الرسالة قصيرة جداً");
    } else {
       
        const userData = {
            userName: name,
            userEmail: email,
            date: new Date().toLocaleDateString()
        };
        localStorage.setItem('lastContact', JSON.stringify(userData));
        
        alert("شكراً يا " + name + "، تم إرسال رسالتك وحفظ بياناتك بنجاح!");
        this.reset();
    }
};