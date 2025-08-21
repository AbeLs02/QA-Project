# 🎓 دانشجویار (Daneshjuyar)

یک پلتفرم پرسش‌و‌پاسخ برای دانشجویان 🚀
در این پروژه هر دانشجو می‌تواند سوال خود را مطرح کند و برای هر سوال یک لایو چت ایجاد می‌شود که تمام کاربران می‌توانند در آن شرکت کرده و پاسخ دهند.

## ✨ ویژگی‌ها (Features)
* 📝 امکان ثبت سوال توسط هر دانشجو
* 💬 ایجاد چت زنده اختصاصی برای هر سوال
* 👥 امکان مشارکت تمام کاربران در پاسخ‌دهی
* 🔍 قابلیت مشاهده سوالات و پاسخ‌های قبلی
* 📊 سیستم امتیازدهی به پاسخ‌ها (در نسخه‌های آینده)

 ## 🛠 تکنولوژی‌های استفاده‌شده (Tech Stack)
* Frontend: Next.js
* Backend: Django
* Database: PostgreSQL
* Real-time: WebSocket / Django Channels / redis
* Authentication: JWT / AuthContext

## 🚀 نصب و راه‌اندازی (Installation)
1- ریپازیتوری را کلون کنید:<br>
  ``` git clone https://github.com/AbeLs02/daneshjuyar.git ```
  
2- وارد پوشه uni_project شده و نیازمندی های بخش فرانت را نصب کنید:<br>
 ``` npm install ```
 
3- وارد پوشه backend شده و توسط فایل requirments.txt نیازمندی های مربوط به بخش بک اند را نصب کنید:<br>
 ``` pip install -r requirements.txt ```
 
4- سپس در پوشه uni_project دستور زیر را برای اجرای بخش فرانت وارد کنید:<br>
  ``` npm run dev ```
  
5- وارد مسیر backend/uni_project شده و دستور زیر را برای اجرای بخش بک اند اجرا کنید؛
  ``` daphne uni_project.asgi:application ```

## 📷 پیش‌نمایش (Screenshots / Demo)


### 📜 مجوز (License)
این پروژه تحت لایسنس MIT منتشر شده است.
