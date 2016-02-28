var table = $(".leaderboard-header");

var getScores = $.ajax({
  url: 'http://leaderboard-rafipatel.rhcloud.com/api/scores',
  type: 'GET',
  contentType: 'json',
  success: function(data) {
    console.log(data);
  }
});

getScores();
