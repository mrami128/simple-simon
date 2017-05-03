/**
 * Created by user on 5/3/17.
 */




$(document).ready(function () {
    "use strict";


// ======= Variable List ===================

    var simonArr = [];
    var marcArr = [];
    var level = 0;
    var newNum = 0;
    var btnValue =0;

// ======= function list ===================

    function youWin() {
        $('#level').html('YOU WIN !! Level: ' + level);
    };

    function youLose() {
        start();
        $('#level').html('YOU LOSE !! Level: ' + level);
    };

    function flasher(element) {                             // This is used in the blink action function
        $(element)
            .animate({opacity: .40}, 150)
            .animate({opacity: 1}, 150);
    }

    function getNextNum() {                                 // This gets the RANDOM number 1-4

        var newNum = Math.floor((Math.random() * 4) + 1);

        simonArr.push(newNum);                              //==== push this new number onto end of simonArr

        // ==== simonArr info =============================
        //        console.log("number at index:" + i + " is " + simonArr[i]);
        //        console.log('  simonArr consist of these numbers:' + simonArr);
        //        console.log('    length is: ' + simonArr.length);
    }


// ===== GAME START ==============

    $('#hiScore').click(function () {               // High score button
        alert('Simon Always Has the Hi score');
        youLose();
    });

    function start() {                              // START Button -sends game into RESET()
        $('#start').on('click', function () {
            resetGame();
            $('#start').off('click');               // start button now turns OFF until game ends
        });
    }

    function resetGame() {                          // reset func Clears all  variables then goes into NEXT ROUND ()
        simonArr = [];
        marcArr = [];
        level = 0;
        nextRound();
    }
    //============================================= NEXT Round Function ========

    function nextRound() {

        // ==========xx ======xx SET DELAY between levels here

//                var delay = 1000; // delay time in milliseconds
//
//                var timeoutId = setTimeout(function () {
//                alert('Here is the delay between levels!');
//                }, delay);

        // to cancel the timeout, you can call
        // clearTimeout(timeoutId);
        // prior to the delay expiring


        //another option --> $("#div1").delay(1500).fadeIn();
        // ==========xx========xx ===========================

        level++;                                    // increase LEVEL +1.

        if (level >= 21) {                          // checks level less than 20 ?

            youWin();                                    // if level 20 YOU WIN

        } else {                                         // if below level 20 --> MOVE forward

            $('#level').html('Level: ' + level);

            getNextNum();                               // get next random number

            blinkAction();                              // blink the code of simonArr
        }
    }

// ===================================== USER INPUT function

    function userInput() {

        var i = 0;                                    // this var i - is used below for cycling through Simon ARR elements

        $('.box').on('click', function () {             // turn on  buttons - Listening for user click

            var btnValue = $(this).attr('data-num');    // save the USER click in btnValue


            // ===========                          // blink the button that user selected - blinkAction2 function
            blinkAction2( btnValue );


            //=================================== Compare button clicks to Simon Array elements

            if (btnValue == simonArr[i]) {               // 1st compare the user click to Simon Array element #1

                if (i == simonArr.length - 1) {         // THEN..if user click = array item #1...THEN check SIMON array length.

                    //=======================================================
                    $('#level').html('Level Complete.');     // if ALL GOOD (clicks = array) length then next level

                    $('.box').off('click');                             // turn off  click listener while game is presenting the simon array
                    setTimeout(nextRound, 1000);    // this sets delay between intervals
//                    nextRound();                  // replaced by delay -see above- goto new random number - push onto Simom ARRAY

                    //=======================================================

                } else {                            // if ARRAY has more than 1 element -then increase i++ cycle again for next user click
                    i++;
                }
            } else {                               // if USER Click not = Array element --turn off clicker & goto youLose()
                $('.box').off('click');
                youLose();
            }
        });
    }

// === Light up buttons for simonArr -use Switch Case ===== set some delaytime  and then light the button for user.

    function blinkAction() {
        var i = 0;
        var intervalId = setInterval(function () {

            switch (simonArr[i]) {

                case 1:
                    console.log("activate red1");
                    flasher('#red1');
                    break;

                case 2:
                    console.log("activate green2 ");
                    flasher('#green2');
                    break;

                case 3:
                    console.log("activate blue3 ");
                    flasher('#blue3');
                    break;

                case 4:
                    console.log("activate yellow4 ");
                    flasher('#yellow4');
                    break;

                default:
            }  //end of switch cases

            if (i >= simonArr.length - 1) {      // this allows simon code to show array by blinks
                userInput();
                clearInterval(intervalId);
            } else {
                i++;
            }
        }, 400);
    } //end of blink action
    start();
// =============== ============ ========= This BLINKS the user selected buttons

    function blinkAction2(btnValue) {       // to flash button user just clicked -- feed in btnValue
//        console.log(btnValue);

        switch (btnValue) {
            case '1':
                console.log("r1");
                flasher('#red1');
                break;

            case '2':
                console.log("g2");
                flasher('#green2');
                break;

            case '3':
                console.log("b3");
                flasher('#blue3');
                break;

            case '4':
                console.log("y4 ");
                flasher('#yellow4');
                break;

            default:

        }                               //end of switch cases
    }                                       //end of blink action 2


// ============= =========== ===============
}); // this is end of iffe


