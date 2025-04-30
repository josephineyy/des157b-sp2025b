// JS here
(function(){


    'use strict'



    Parse.initialize("5GTBj9fFfGiGXegRDtptX70AGCRiFT45x1GScKGZ", "u2OYKxtXzTJC57LPgpRfCq5klG3sL6vW6JmOhQK2"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/"

    const newBtn = document.querySelector('#newbtn')
    const editBtns = document.querySelectorAll('.fa-edit')
    const addFriendForm = document.getElementById('add-friend')
    const editFriendForm = document.getElementById('edit-friend')    
     const friendList = document.querySelector("main ol");
    
    async function displayFriends() {
        const friends = Parse.Object.extend('Friend');
        const query = new Parse.Query(friends);
        const results = await query.ascending('lname').find();
        console.log(results);
        results.forEach(function(eachfriend){
            const id = eachfriend.id
            const lname = eachfriend.get('lname')
            const fname = eachfriend.get('fname')
            const email = eachfriend.get('email')
            const facebook = eachfriend.get('facebook')
            const twitter = eachfriend.get('twitter')
            const instagram = eachfriend.get('instagram')
            const linkedin = eachfriend.get('linkedin')

            const theListItem = document.createElement("li")
            theListItem.setAttribute("id",`r-${id}`)
           
            theListItem.innerHTML=`<div class="name">
                    ${fname} ${lname}
                </div>
                <div class="email">
                    <i class="fas fa-envelope-square"></i> ${email}
                </div>
                <div class="social">
                    <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                    <a href="h${twitter}"><i class="fab fa-twitter-square"></i></a>
                    <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                    <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                </div>
                <i class="fas fa-edit" id="e-${id}"></i>
                <i class="fas fa-times-circle" id="d-${id}"></i>`;
            friendList.append(theListItem);
        
        })
    }

    displayFriends();

    newBtn.addEventListener('click',function(event){
        event.preventDefault();
        addFriendForm.className = "add-friend-onscreen"

    
    })
    addFriendForm.addEventListener('submit',function(event){
        event.preventDefault();
        addFriendForm.className="add-firend-offscreen"
    })

    for(let i=0;i<editBtns.length;i++){
        editBtns[i].addEventListener("click",function(event
        ){
            event.preventDefault();
            editFriendForm.className="edit-friend-onscreen"
        
        })
        
    }
    
    editFriendForm.addEventListener("submit",function(event
        ){
            event.preventDefault();
            editFriendForm.className="edit-friend-offscreen"
        
        })


})()