# baldinsfinal
jomajo beidzot iet

Kas tika izmantots:

    Laravel
    Node.js
    Vue.js + ts
    MySQL

Priekš plugina 
 C++ ar JUCE


lai mājaslapu palaistu:
backenda setups
 
cd laravelBackend    
cp .env.example .env (iespējams nevajag, nezinu kā ir uz cita datora)
composer install
php artisan key:generate   
php artisan passport:keys    
php artisan passport:client --personal    
php artisan storage:link              
composer require laravel/telescope --dev     
php artisan telescope:install     
php artisan migrate
php artisan migrate:fresh --seed
php artisan passport:client --personal

env faila config:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rvtgtr
DB_USERNAME=root
DB_PASSWORD=
```
frontend setup
cd frontend        
npm install

palaišana

cd frontend    
npm run dev

cd laravelBackend    
php artisan serve

