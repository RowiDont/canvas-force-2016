var ajax = {
    getScores: function(callback) {
      $.ajax({
        crossDomain: true,
        url: 'http://leaderboard-rafipatel.rhcloud.com/api/scores',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          callback(data);
        }
      });
    },

    sendScore: function (name, score) {
      $.ajax({
        crossDomain: true,
        url: 'http://leaderboard-rafipatel.rhcloud.com/api/scores',
        type: 'POST',
        dataType: 'json',
        data: {name: name, score: score},
        success: function() {
          console.log("I got here");
          document.location.reload(true);
        }
      });
    }
};

var table = $(".leaderboard-header");

$("#scoreSubmit").on('click', function(e) {
  e.preventDefault();
  var name = $("input")[0].value;
  var score = parseInt(scoreEl.innerHTML);
  ajax.sendScore(name, score);
  $(e.currentTarget.parentNode).toggleClass('hidden');
});


var addToTable = function (scores) {
  scoresList = scores.reverse();

  scoresList.forEach(function (el, idx) {
    var name = el.name;
    var score = el.score;
    var num = scores.length - parseInt(idx);

    var html = "<tr><td>" + num + ". " + name + "</td><td>" + score + "</td></tr>";

    $(html).insertAfter(table);
  }, this);
};
