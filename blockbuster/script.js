(function() {
            'use strict';

            const myVideo = document.querySelector('#myVideo');
            const fs = document.querySelector('.fa-expand');

            // add the rest of the script here
            const line1 = document.querySelector('#line1');
            const line2 = document.querySelector('#line2');
            const line3 = document.querySelector('#line3');

            const poem = {
                start: [0, 1.5, 2.5,3.5],
                stop: [1.5, 2.5, 3.5,4.5],
                line: [line1, line2, line3,line4]
            }

            const intervalID = setInterval(checkTime, 1000);

            function checkTime() {
                console.log(parseInt(myVideo.currentTime));

                if (poem.start[0] < myVideo.currentTime && myVideo.currentTime < poem.stop[0]) {
                 poem.line[0].className = "showing";
                } else {
                    poem.line[0].className = "hidden";
                }
                if (poem.start[1] < myVideo.currentTime && myVideo.currentTime < poem.stop[1]) {
                    poem.line[1].className = "showing";
                } else {
                    poem.line[1].className = "hidden";
                 }
                if (poem.start[2] < myVideo.currentTime && myVideo.currentTime < poem.stop[2]) {
                    poem.line[2].className = "showing";
                } else {
                    poem.line[2].className = "hidden";
                }
                if (poem.start[3] < myVideo.currentTime && myVideo.currentTime < poem.stop[3]) {
                    poem.line[3].className = "showing";
                } else {
                    poem.line[3].className = "hidden";
                }
            }
            
            
            fs.addEventListener('click', function() {
                // The fullscreenElement attribute returns null if the element is in windowed mode
                if (!document.fullscreenElement) {
                    // document.documentElement returns the Element that is a direct child of the document, the <html> element
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();

                }
            });

         const danmuContainer = document.querySelector('#danmu-container');
        const danmuLines = [
            "Go Yorkie go!",
            "He's beating the human!",
            "4 pounds of speed!",
            "Run run run!",
            "Best race ever!",
            "Catch him if you can!",
            "He's just warming up!",
            "I'm crying this is so good",
            "Zoom zoom zoom",
            "Look at those tiny legs go!",
            "Give that dog a medal!",
            "He’s training for the Olympics!"];
        function createDanmu(text) {
            const el = document.createElement("div");
            el.className = "danmu-line";
            el.textContent = text;
            const trackHeight = 2; // in %
            const track = Math.floor(Math.random() * 20); // 0 to 9
            el.style.top = `${track * trackHeight + 5}%`;

            danmuContainer.appendChild(el);

            el.addEventListener("animationend", () => { el.remove();});
        }   
        setInterval(() => {
        for (let i = 0; i < 5; i++) { 
            const text = danmuLines[Math.floor(Math.random() * danmuLines.length)];
            createDanmu(text);
        }
    }, 800); 


        })();