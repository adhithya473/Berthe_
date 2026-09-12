/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }


    /* Stop Singer when leaving */

    if (pageId !== "singerGame") {

        clearSingerTimer();

        songAudio.pause();
        songAudio.currentTime = 0;
    }


    /* Stop Spin sound when leaving */

    if (pageId !== "spinGame") {

        laughAudio.pause();
        laughAudio.currentTime = 0;
    }
}
function enterBerthe() {

    const butterfly =
        document.getElementById("flyingButterfly");

    const transition =
        document.getElementById("butterflyTransition");

    const pageRoll =
        document.getElementById("pageRoll");

    /* Show butterfly */
    transition.classList.add("active");

    /* Butterfly flies from ENTER area to top-right */
    butterfly.classList.add("fly");

    /* After butterfly reaches corner */
    setTimeout(() => {

        butterfly.classList.add("disappear");

        /* Show next page behind the roll */
        showPage("games");

        /* Start rolled-page opening */
        setTimeout(() => {

            pageRoll.classList.add("open");

        }, 250);

    }, 1300);

    /* Remove transition after animation */
    setTimeout(() => {

        transition.classList.remove("active");
        butterfly.classList.remove("fly", "disappear");
        pageRoll.classList.remove("open");

    }, 2500);
}

/* =====================================================
   OPEN SPIN
===================================================== */

function openSpin() {

    showPage("spinGame");

}


/* =====================================================
   BACK FROM SPIN
===================================================== */

function backFromSpin() {

    laughAudio.pause();
    laughAudio.currentTime = 0;

    document
        .getElementById("reveal")
        .classList.remove("show");

    showPage("games");
}
/* =====================================================
   BACK FROM REVEAL
===================================================== */

function backFromReveal() {

    /*
       Stop laugh immediately
    */

    laughAudio.pause();
    laughAudio.currentTime = 0;


    /*
       Stop singer song also
    */

    songAudio.pause();
    songAudio.currentTime = 0;

    clearSingerTimer();


    /*
       Hide reveal
    */

    document
        .getElementById("reveal")
        .classList.remove("show");


    /*
       Go back to game selection
    */

    showPage("games");
}


/* =====================================================
   OPEN SINGER
===================================================== */

function openSinger() {

    showPage("singerGame");

    loadSingerQuestion();
}


/* =====================================================
   BACK FROM SINGER
===================================================== */

function backFromSinger() {

    songAudio.pause();
    songAudio.currentTime = 0;

    clearSingerTimer();

    document
        .getElementById("reveal")
        .classList.remove("show");

    showPage("games");
}


/* =====================================================
   SPIN DATA
===================================================== */

const spinFriends = [

    {
        photo: "images/spin1_funny.jpg",
        audio: "audio/laugh1.mp3",
        text: "here's fant-astic ladyyy... 😂"
    },

    {
        photo: "images/spin2_funny.jpg",
        audio: "audio/laugh2.mp3",
        text: "hammeeee "
    },

    {
        photo: "images/spin3_funny.jpg",
        audio: "audio/laugh3.mp3",
        text: "superstar"
    }

];


/* =====================================================
   SPIN NON-REPEAT SYSTEM
===================================================== */

let availableSpinIndexes = [];


function resetSpinList() {

    availableSpinIndexes = [];

    for (
        let i = 0;
        i < spinFriends.length;
        i++
    ) {

        availableSpinIndexes.push(i);

    }
}


function getNextSpinPerson() {

    /*
       All people used?
       Start a new cycle.
    */

    if (availableSpinIndexes.length === 0) {

        resetSpinList();

    }


    /*
       Pick random available person
    */

    const randomPosition =
        Math.floor(
            Math.random() *
            availableSpinIndexes.length
        );


    const selectedIndex =
        availableSpinIndexes[randomPosition];


    /*
       Remove selected person
    */

    availableSpinIndexes.splice(
        randomPosition,
        1
    );


    return spinFriends[selectedIndex];
}


/* =====================================================
   SPIN AUDIO
===================================================== */

const laughAudio =
    document.getElementById("laughAudio");


/*
   Laugh keeps repeating until Back.
*/

laughAudio.addEventListener(
    "ended",
    function () {

        const spinPage =
            document.getElementById("spinGame");


        if (
            spinPage.classList.contains("active")
        ) {

            laughAudio.currentTime = 0;

            laughAudio.play().catch(() => {

                console.log(
                    "Laugh replay blocked."
                );

            });

        }

    }
);


/* =====================================================
   SPIN
===================================================== */

function spin() {

    const reveal =
        document.getElementById("reveal");

    const photo =
        document.getElementById("funnyPhoto");

    const message =
        document.getElementById("funnyMessage");


    /*
       Get next unused person
    */

    const person =
        getNextSpinPerson();


    /*
       Show photo
    */

    photo.src =
        person.photo;


    /*
       Show message
    */

    message.innerText =
        person.text;


    /*
       Load corresponding laugh
    */

    laughAudio.src =
        person.audio;

    laughAudio.currentTime = 0;


    /*
       Show result
    */

    reveal.classList.add("show");


    /*
       Start laugh
    */

    laughAudio.play().catch(() => {

        console.log(
            "Audio could not autoplay."
        );

    });

}


/* =====================================================
   SINGER QUESTIONS
===================================================== */

/*
   IMPORTANT:

   song1.mp3 = Singer 1's song
   song2.mp3 = Singer 2's song
   song3.mp3 = Singer 3's song

   The order in which songs appear is RANDOM.

   The option position DOES NOT decide the answer.
*/

const singerQuestions = [

    /* ================= SONG 1 ================= */

    {
        song: "audio/song1.mp3",

        choices: [

            {
                id: 1,

                name: "Singer 2",

                photo: "images/singer2.jpg",

                funny: "images/singer2_funny.jpg"
            },

            {
                id: 0,

                name: "Singer 1",

                photo: "images/singer1.jpg",

                funny: "images/singer1_funny.jpg"
            }

        ]
    },


    /* ================= SONG 2 ================= */

    {
        song: "audio/song2.mp3",

        choices: [

            {
                id: 2,

                name: "Singer 3",

                photo: "images/singer3.jpg",

                funny: "images/singer3_funny.jpg"
            },

            {
                id: 1,

                name: "Singer 2",

                photo: "images/singer2.jpg",

                funny: "images/singer2_funny.jpg"
            }

        ]
    },


    /* ================= SONG 3 ================= */

    {
        song: "audio/song3.mp3",

        choices: [

            {
                id: 0,

                name: "Singer 1",

                photo: "images/singer1.jpg",

                funny: "images/singer1_funny.jpg"
            },

            {
                id: 2,

                name: "Singer 3",

                photo: "images/singer3.jpg",

                funny: "images/singer3_funny.jpg"
            }

        ]
    }

];


/* =====================================================
   SINGER NON-REPEAT SYSTEM
===================================================== */

let availableSingerIndexes = [];

let currentQuestion = null;


function resetSingerList() {

    availableSingerIndexes = [];

    for (
        let i = 0;
        i < singerQuestions.length;
        i++
    ) {

        availableSingerIndexes.push(i);

    }
}


function getNextSingerQuestion() {

    /*
       All 3 songs used?
       Start a new cycle.
    */

    if (
        availableSingerIndexes.length === 0
    ) {

        resetSingerList();

    }


    /*
       Pick random unused song
    */

    const randomPosition =
        Math.floor(
            Math.random() *
            availableSingerIndexes.length
        );


    const questionIndex =
        availableSingerIndexes[randomPosition];


    /*
       Remove from current cycle
    */

    availableSingerIndexes.splice(
        randomPosition,
        1
    );


    return singerQuestions[questionIndex];
}


/* =====================================================
   SONG AUDIO
===================================================== */

const songAudio =
    new Audio();


let singerTimer = null;


/* =====================================================
   CLEAR TIMER
===================================================== */

function clearSingerTimer() {

    if (singerTimer !== null) {

        clearTimeout(singerTimer);

        singerTimer = null;

    }
}


/* =====================================================
   LOAD NEW QUESTION
===================================================== */

function loadSingerQuestion() {

    clearSingerTimer();


    /*
       Get random unused song
    */

    currentQuestion =
        getNextSingerQuestion();


    /*
       FIRST CHOICE
    */

    document.getElementById(
        "singerPhoto1"
    ).src =
        currentQuestion.choices[0].photo;


    document.getElementById(
        "singerName1"
    ).innerText =
        currentQuestion.choices[0].name;


    /*
       SECOND CHOICE
    */

    document.getElementById(
        "singerPhoto2"
    ).src =
        currentQuestion.choices[1].photo;


    document.getElementById(
        "singerName2"
    ).innerText =
        currentQuestion.choices[1].name;


    /*
       Hide choices before song
    */

    document.getElementById(
        "singerOptions"
    ).classList.add("hidden");


    /*
       Status
    */

    document.getElementById(
        "singerStatus"
    ).innerText =
        "Press PLAY SONG to start.";
}


/* =====================================================
   PLAY SONG
===================================================== */

function playSong() {

    clearSingerTimer();


    const singerOptions =
        document.getElementById(
            "singerOptions"
        );


    /*
       Hide choices
    */

    singerOptions.classList.add("hidden");


    /*
       Stop previous song
    */

    songAudio.pause();

    songAudio.currentTime = 0;


    /*
       Load CURRENT RANDOM SONG
    */

    songAudio.src =
        currentQuestion.song;


    /*
       Play song
    */

    songAudio.play().catch(() => {

        console.log(
            "Song autoplay blocked."
        );

    });


    /*
       Status
    */

    document.getElementById(
        "singerStatus"
    ).innerText =
        "🎵 Listen carefully...";


    /*
       Play ONLY 10 seconds
    */

    singerTimer =
        setTimeout(() => {

            /*
               Stop song
            */

            songAudio.pause();

            songAudio.currentTime = 0;


            /*
               Show singer choices
            */

            singerOptions.classList.remove(
                "hidden"
            );


            document.getElementById(
                "singerStatus"
            ).innerText =
                "🤔 ITH AARADA? Make your guess!";


            singerTimer = null;

        }, 10000);
}


/* =====================================================
   GUESS SINGER
===================================================== */

function guessSinger(selectedIndex) {

    const singerOptions =
        document.getElementById(
            "singerOptions"
        );


    /*
       Don't allow early click
    */

    if (
        singerOptions.classList.contains(
            "hidden"
        )
    ) {

        document.getElementById(
            "singerStatus"
        ).innerText =
            "⏳ 10 seconds kazhinjittu guess cheyyu!";

        return;
    }


    clearSingerTimer();


    /*
       Stop song
    */

    songAudio.pause();

    songAudio.currentTime = 0;


    /*
       IMPORTANT:

       Get the ACTUAL singer
       from the option clicked.

       selectedIndex = position of clicked card
    */

    const selectedSinger =
        currentQuestion.choices[selectedIndex];


    /*
       IMPORTANT:

       The song itself decides
       who the correct singer is.

       song1.mp3 → Singer 1
       song2.mp3 → Singer 2
       song3.mp3 → Singer 3
    */

    let correctSingerId;


    if (
        currentQuestion.song ===
        "audio/song1.mp3"
    ) {

        correctSingerId = 0;

    }

    else if (
        currentQuestion.song ===
        "audio/song2.mp3"
    ) {

        correctSingerId = 1;

    }

    else if (
        currentQuestion.song ===
        "audio/song3.mp3"
    ) {

        correctSingerId = 2;

    }


    /*
       Compare ACTUAL singer ID.

       NOT option position.
    */

    const correct =
        selectedSinger.id === correctSingerId;


    /*
       IMPORTANT:

       Show the funny photo
       of the person user clicked.
    */

    const resultPerson =
        selectedSinger;


    let resultMessage;


    if (correct) {

        resultMessage =
            "🎉  Ith thanne aal! 😂";

    }

    else {

        resultMessage =
            "😂 machuuu njn allaa";

    }


    /*
       Show result
    */

    showSingerResult(
        resultPerson.funny,
        resultMessage
    );
}


/* =====================================================
   SHOW SINGER RESULT
===================================================== */

function showSingerResult(
    photoSrc,
    text
) {

    const reveal =
        document.getElementById(
            "reveal"
        );

    const photo =
        document.getElementById(
            "funnyPhoto"
        );

    const message =
        document.getElementById(
            "funnyMessage"
        );


    /*
       Clear timer
    */

    clearSingerTimer();


    /*
       Stop song
    */

    songAudio.pause();

    songAudio.currentTime = 0;


    /*
       Set funny photo
    */

    photo.src =
        photoSrc;


    /*
       Set message
    */

    message.innerText =
        text;


    /*
       Show result
    */

    reveal.classList.add("show");


    /*
       Keep result for 3.5 seconds
    */

    setTimeout(() => {

        curtainTransition();


        /*
           After curtain transition,
           load next unused song.
        */

        setTimeout(() => {

            reveal.classList.remove(
                "show"
            );

            loadSingerQuestion();

        }, 900);

    }, 3500);
}


/* =====================================================
   CURTAIN TRANSITION
===================================================== */

function curtainTransition() {

    const reveal =
        document.getElementById(
            "reveal"
        );

    const left =
        document.getElementById(
            "curtainLeft"
        );

    const right =
        document.getElementById(
            "curtainRight"
        );


    /*
       CLOSE CURTAINS
    */

    left.className =
        "curtain curtain-left active close-left";

    right.className =
        "curtain curtain-right active close-right";


    /*
       Wait for curtains to close
    */

    setTimeout(() => {

        reveal.classList.remove(
            "show"
        );


        /*
           OPEN CURTAINS
        */

        left.className =
            "curtain curtain-left active open-left";

        right.className =
            "curtain curtain-right active open-right";


        /*
           Remove curtain after opening
        */

        setTimeout(() => {

            left.className =
                "curtain curtain-left";

            right.className =
                "curtain curtain-right";

        }, 800);

    }, 800);
}


/* =====================================================
   START
===================================================== */

resetSpinList();

resetSingerList();

showPage("home");