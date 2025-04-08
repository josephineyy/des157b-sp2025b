(function() {
    'use strict';

    const button = document.querySelector('#switch');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section')
    const cats = document.querySelectorAll('#banner img')
    const h2 = document.querySelector('h2')
    let mode = 'light';

    const title = document.getElementById('title');
    // title.addEventListener('mouseenter', () => {
    // title.src = 'images/Banner2.png';
    // });
    // title.addEventListener('mouseleave', () => {
    //     title.src = 'images/Banner1.png';
    // });

    for(let i=0; i<cats.length;i++){
        cats[i].addEventListener('mouseover',function(){
            cats[i].src=`images/Cat${(i%5)+1}_2.png`       
        })
    }   
    
    for(let i=0; i<cats.length;i++){
        cats[i].addEventListener('mouseleave',function(){
            cats[i].src=`images/Cat${(i%5)+1}.png`
        
        })
    }


    button.addEventListener('click', function() {
        if (mode === 'light') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            h2.className='switch'
            for (const section of sections) {
                section.className = 'switch';
            }
            title.src = 'images/Banner1.png';
            mode = 'dark';

        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            h2.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            title.src = 'images/Banner1.png';
            mode = 'light'
        }
    })
})()