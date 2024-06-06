# RVTGTR
**Kas ir RVTGTR?**

RVTGTR sastāv no divām daļām, mājaslapas un audio spraudņa (audio plugin). Majaslapā ir logins un reģistrācija, downloadpage, kā arī forums, kurā tu vari izveidot forumā rakstus, lai atstātu ieteikumus uzlabojumiem un komentēt zem viņiem. Protams ir arī administrācijas panelis, kurā var rediģēt lietotāju informāciju, kā arī ir izdzēšanas iespējas. Otrā daļa ir pats spraudnis, ar kuru ir iespējams izmainīt audio signāla īpašības.

**Kas tika izmantots:**
Mājaslapai

    Laravel
    Node.js
    Vue.js
    MySQL

Priekš plugina 

 C++ ar JUCE framework


**lai mājaslapu palaistu:**
backenda setups
     
    cd laravelBackend    
    composer update
    cp .env.example .env 

    composer install

    php artisan key:generate   
    php artisan passport:keys    
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

**palaišana**
    
    cd frontend    
    npm run dev
    
    cd laravelBackend    
    php artisan serve

https://github.com/gloopjuice/spraundarepoactualfactual - spraudņa repo ar daļu no koda
