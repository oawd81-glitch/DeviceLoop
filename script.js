document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // 1. حالة تسجيل الدخول وحماية الصفحات
    // ==================================================

    const loggedIn =
        localStorage.getItem("deviceLoopLoggedIn") === "true" ||
        sessionStorage.getItem("deviceLoopLoggedIn") === "true";

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const publicPages = [
        "index.html",
        "register.html"
    ];

    // منع فتح صفحات الموقع قبل تسجيل الدخول
    if (!loggedIn && !publicPages.includes(currentPage)) {
        window.location.href = "index.html";
        return;
    }

    // تحويل رابط تسجيل الدخول إلى تسجيل الخروج بعد الدخول
    if (loggedIn && !publicPages.includes(currentPage)) {

        const loginLink =
            document.querySelector('nav a[href="index.html"]');

        if (loginLink) {

            loginLink.textContent = "تسجيل الخروج";
            loginLink.href = "#";

            loginLink.addEventListener("click", function (event) {

                event.preventDefault();

                localStorage.removeItem("deviceLoopLoggedIn");
                sessionStorage.removeItem("deviceLoopLoggedIn");

                window.location.href = "index.html";
            });
        }
    }


    // ==================================================
    // 2. تسجيل الدخول
    // ==================================================

    const loginForm =
        document.getElementById("login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                loginForm.querySelector("#email").value.trim();

            const password =
                loginForm.querySelector("#password").value;

            const remember =
                document.getElementById("remember");

            if (email === "" || password === "") {
                alert(
                    "يرجى تعبئة البريد الإلكتروني وكلمة المرور."
                );
                return;
            }

            // تسجيل الدخول المؤقت في مرحلة JavaScript
            if (remember && remember.checked) {

                localStorage.setItem(
                    "deviceLoopLoggedIn",
                    "true"
                );

            } else {

                sessionStorage.setItem(
                    "deviceLoopLoggedIn",
                    "true"
                );
            }

            // الانتقال إلى الصفحة الرئيسية
            window.location.href = "home.html";
        });
    }


    // ==================================================
    // 3. إنشاء حساب
    // ==================================================

    const registerForm =
        document.getElementById("register-form");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                registerForm.querySelector("#name").value.trim();

            const email =
                registerForm.querySelector("#email").value.trim();

            const password =
                registerForm.querySelector("#password").value;

            const confirmPassword =
                registerForm.querySelector(
                    "#confirm-password"
                ).value;

            if (
                name === "" ||
                email === "" ||
                password === "" ||
                confirmPassword === ""
            ) {
                alert("يرجى تعبئة جميع البيانات.");
                return;
            }

            if (password.length < 6) {
                alert(
                    "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل."
                );
                return;
            }

            if (password !== confirmPassword) {
                alert("كلمتا المرور غير متطابقتين.");
                return;
            }

            alert(
                "البيانات صحيحة. سيتم إنشاء الحساب فعليًا عند ربط الموقع بقاعدة البيانات."
            );
        });
    }


    // ==================================================
    // 4. تواصل معنا
    // ==================================================

    const contactForm =
        document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameInput =
                contactForm.querySelector(
                    'input[type="text"]'
                );

            const emailInput =
                contactForm.querySelector(
                    'input[type="email"]'
                );

            const messageType =
                contactForm.querySelector("select");

            const messageInput =
                contactForm.querySelector("textarea");

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const message =
                messageInput
                    ? messageInput.value.trim()
                    : "";

            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {
                alert(
                    "يرجى تعبئة جميع بيانات التواصل."
                );
                return;
            }

            if (
                !messageType ||
                messageType.value === ""
            ) {
                alert(
                    "يرجى اختيار نوع الرسالة."
                );
                return;
            }

            alert(
                "تم التحقق من بيانات الرسالة بنجاح. سيتم إرسالها فعليًا عند ربط الموقع بالخادم."
            );
        });
    }


    // ==================================================
    // 5. بيع جهاز
    // ==================================================

    const sellForm =
        document.getElementById("sell-form");

    if (sellForm) {

        sellForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const textInputs =
                sellForm.querySelectorAll(
                    'input[type="text"]'
                );

            const emailInput =
                sellForm.querySelector(
                    'input[type="email"]'
                );

            const numberInput =
                sellForm.querySelector(
                    'input[type="number"]'
                );

            const selects =
                sellForm.querySelectorAll("select");

            const description =
                sellForm.querySelector("textarea");

            for (let input of textInputs) {

                if (input.value.trim() === "") {

                    alert(
                        "يرجى تعبئة جميع بيانات الجهاز والبائع."
                    );

                    return;
                }
            }

            if (
                !emailInput ||
                emailInput.value.trim() === ""
            ) {
                alert(
                    "يرجى إدخال البريد الإلكتروني."
                );
                return;
            }

            for (let select of selects) {

                if (select.value === "") {

                    alert(
                        "يرجى اختيار الفئة وحالة الجهاز."
                    );

                    return;
                }
            }

            if (
                !numberInput ||
                numberInput.value.trim() === "" ||
                Number(numberInput.value) <= 0
            ) {
                alert(
                    "يرجى إدخال سعر صحيح أكبر من صفر."
                );
                return;
            }

            if (
                !description ||
                description.value.trim() === ""
            ) {
                alert(
                    "يرجى كتابة وصف للجهاز."
                );
                return;
            }

            alert(
                "تم التحقق من بيانات الجهاز بنجاح. سيتم نشر الإعلان فعليًا عند ربط الموقع بقاعدة البيانات."
            );
        });
    }


    // ==================================================
    // 6. البحث وتصفية الأجهزة
    // ==================================================

    const deviceSearch =
        document.getElementById("device-search");

    const categoryFilter =
        document.getElementById("category-filter");

    const noResults =
        document.getElementById("no-results");

    if (deviceSearch && categoryFilter) {

        const deviceCards =
            document.querySelectorAll(
                ".devices-section article"
            );

        function filterDevices() {

            const searchText =
                deviceSearch.value
                    .trim()
                    .toLowerCase();

            const selectedCategory =
                categoryFilter.value;

            let visibleDevices = 0;

            deviceCards.forEach(function (card) {

                const deviceText =
                    card.textContent
                        .toLowerCase();

                const deviceCategory =
                    card.getAttribute(
                        "data-category"
                    );

                const matchesSearch =
                    deviceText.includes(searchText);

                const matchesCategory =
                    selectedCategory === "" ||
                    deviceCategory === selectedCategory;

                if (
                    matchesSearch &&
                    matchesCategory
                ) {

                    card.style.display = "";
                    visibleDevices++;

                } else {

                    card.style.display = "none";
                }
            });

            if (noResults) {

                if (visibleDevices === 0) {

                    noResults.style.display =
                        "block";

                } else {

                    noResults.style.display =
                        "none";
                }
            }
        }

        deviceSearch.addEventListener(
            "input",
            filterDevices
        );

        categoryFilter.addEventListener(
            "change",
            filterDevices
        );
    }
// ==================================================
// 7. قائمة الهاتف Hamburger Menu
// ==================================================

const menuToggle =
    document.getElementById("menu-toggle");

const navigation =
    document.querySelector("header nav");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

        navigation.classList.toggle("active");

    });
}

});