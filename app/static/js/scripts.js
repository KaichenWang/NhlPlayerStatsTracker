/*
 * Messages
 */

var messageIsVisible = false;

var showMessage = function(msgClass, msg) {
    $('.wrapper').animate({
        scrollTop: 0
    }, 200);
    if(!messageIsVisible) {
        messageIsVisible = true;
        $('.message').toggleClass(msgClass);
        $('.message h4').text(msg);
        $('.message').toggleClass('show');
        function wait() {
            $('.message').toggleClass('show');
            $('.message').toggleClass(msgClass)
            $('.message h4').text('');
            messageIsVisible = false;
        }
        setTimeout(wait, 2000);
    }
}


/*
 * Poll
 */

var canVote;
function checkCookie() {
    var status = '';
    if (document.cookie && document.cookie.indexOf('PD_poll_9559362') != -1) {
        canVote = false;
    } else {
        canVote = true;
    }
}
checkCookie();

function onClickVote (model, e) {
    if (stats.selectedSeason().isLatest || stats.selectedSeason().id === 'total') {
        if(canVote) {
            canVote = false;

            var playerA = $(e.srcElement).closest('.container').data('player');
            var isSubban = playerA === 'subban';
            var playerB = isSubban ? 'weber' : 'subban';
            var playerAFullName = isSubban ? 'P.K. Subban' : 'Shea Weber'

            if (isSubban) {
                $('#PDI_answer43654459').prop("checked", true);
            } else {
                $('#PDI_answer43654460').prop("checked", true);
            }

            PD_prevote9559362(1);

            // Latest season
            var currentA = stats.seasons[0][playerA].votes();
            var currentB = stats.seasons[0][playerB].votes();
            var newCurrent =
                isSubban ?
                    mapPollToObject(currentA.votes + 1, currentB.votes, 0, 0)
                    :
                    mapPollToObject(currentB.votes, currentA.votes + 1, 0, 0);

            stats.seasons[0][playerA].votes(newCurrent[playerA].votes);
            stats.seasons[0][playerB].votes(newCurrent[playerB].votes);

            // Totals
            var index = stats.seasons.length - 1;
            var totalsA = stats.seasons[index][playerA].votes();
            var totalsB = stats.seasons[index][playerB].votes();
            var newTotals =
                isSubban ?
                    mapPollToObject(totalsA.votes + 1, totalsB.votes, 0, 0)
                    :
                    mapPollToObject(totalsB.votes, totalsA.votes + 1, 0, 0);

            stats.seasons[index][playerA].votes(newTotals[playerA].votes);
            stats.seasons[index][playerB].votes(newTotals[playerB].votes);

            showMessage('success', '+1 vote for ' + playerAFullName);
        }
        else {
            showMessage('error', "Sorry, you've already voted");
        }
    }
    else {
        showMessage('error', 'Voting has ended for ' + stats.selectedSeason().name);
    }
}


/*
 * Comments
 */

var commentClickable = true;
$(".trigger-comments").click(function() {
    var trigger = $(this);
    if (commentClickable) {
        commentClickable = false;
        if (trigger.is('#close-comments')) {
            function wait() {
                $('#page-1').addClass('hidden');
            }
            setTimeout(wait, 500);
        }
        else {
            $('#page-1').removeClass('hidden');
        }
        $('#page-1').toggleClass('slide-in');
        $('#page-1').toggleClass('slide-out');
        commentClickable = true;
    }
});


/*
 * Stats
 */

function StatsModel() {
    this.seasons = [
        {
            id : 'p2017',
            name :  'PLAYOFFS 2017',
            isLatest: false,
            isPlayoff: true,
            subban : {
                stats: {
                    played: 22,
                    goals: 2,
                    assists: 10,
                    points: 12,
                    plusMinus: 5
                },
                team: {
                    wins: 14,
                    losses: 8,
                    otLosses: '',
                    points: '',
                    status: 'CUP FINAL'
                },
                votes: {
                    votes: 12271,
                    percent: 64
                }
            },
            weber : {
                stats: {
                    played: 6,
                    goals: 1,
                    assists: 2,
                    points: 3,
                    plusMinus: 1
                },
                team: {
                    wins: 2,
                    losses: 4,
                    otLosses: '',
                    points: '',
                    status: '1ST RND'
                },
                votes: {
                    votes: 6870,
                    percent: 36
                }
            }
        },
        {
            id : 'r2016',
            name :  'REG. SEASON 2016-2017',
            isLatest: false,
            isPlayoff: false,
            subban : {
                stats: {
                    played: 66,
                    goals: 10,
                    assists: 30,
                    points: 40,
                    plusMinus: -8
                },
                team: {
                    wins: 41,
                    losses: 29,
                    otLosses: 12,
                    points: 94,
                    status: ''
                },
                votes: {
                    votes: 11433,
                    percent: 20
                }
            },
            weber : {
                stats: {
                    played: 78,
                    goals: 17,
                    assists: 25,
                    points: 42,
                    plusMinus: 20
                },
                team: {
                    wins: 47,
                    losses: 26,
                    otLosses: 9,
                    points: 103,
                    status: ''
                },
                votes: {
                    votes: 45061,
                    percent: 80
                }
            }
        }
    ];
    this.isDataLoaded = ko.observable(false);
    this.selectedSeason = ko.observable();
}

var stats = new StatsModel();

// ko.applyBindings(stats);

var DATA_URL_SUBBAN_REGULAR = 'https://statsapi.web.nhl.com/api/v1/people/8474056?expand=person.stats&stats=yearByYear&site=en_nhlCA';
var DATA_URL_WEBER_REGULAR = DATA_URL_SUBBAN_REGULAR.replace('8474056','8470642');
var DATA_URL_SUBBAN_PLAYOFF = 'https://statsapi.web.nhl.com/api/v1/people/8474056/stats?stats=yearByYearPlayoffs&site=en_nhlCA';
var DATA_URL_WEBER_PLAYOFF = DATA_URL_SUBBAN_PLAYOFF.replace('8474056','8470642');
var DATA_URL_LEAGUE = 'https://statsapi.web.nhl.com/api/v1/standings?expand=standings.record,standings.team&season=20172018';
var DATA_URL_POLL = '/poll';
var STATS_OFFSET = {
    SUBBAN: {
        played: 88,
        goals: 12,
        assists: 40,
        points: 52,
        plusMinus: -3
    },
    WEBER: {
        played: 84,
        goals: 18,
        assists: 27,
        points: 45,
        plusMinus: 21
    }
};
var POLL_OFFSET = {
    SUBBAN: 23704,
    WEBER: 51931
};

$.when(
    fetch (DATA_URL_SUBBAN_REGULAR),
    fetch (DATA_URL_WEBER_REGULAR),
    fetch (DATA_URL_LEAGUE),
    fetch (DATA_URL_POLL)
).done(function(a1, a2, a3, a4){
    var pollChoices = a4[0].demand[0].result.answers.answer;
    var votesSubban = pollChoices[0].total;
    var votesWeber = pollChoices[1].total;
    var pollLatest = mapPollToObject(votesSubban, votesWeber, POLL_OFFSET.SUBBAN, POLL_OFFSET.WEBER);
    var pollTotal = mapPollToObject(votesSubban, votesWeber, 0, 0);

    var latest = {
        id : 'r2018',
        name :  'REG. SEASON 2017-2018',
        isLatest: true,
        isPlayoff: false,
        subban : {
            stats: mapPlayerDataToArray(a1),
            team: mapLeagueRegDataToArray(a3, 2, 18),
            votes: ko.observable(pollLatest.subban.votes)
        },
        weber : {
            stats: mapPlayerDataToArray(a2),
            team: mapLeagueRegDataToArray(a3, 1, 8),
            votes: ko.observable(pollLatest.weber.votes)
        }
    };

    var total = {
        id : 'total',
        name :  'TOTALS SINCE TRADE',
        isLatest: false,
        isPlayoff: false,
        subban : {
            stats: {
                played: latest.subban.stats.played + STATS_OFFSET.SUBBAN.played,
                goals: latest.subban.stats.goals + STATS_OFFSET.SUBBAN.goals,
                assists: latest.subban.stats.assists + STATS_OFFSET.SUBBAN.assists,
                points: latest.subban.stats.points + STATS_OFFSET.SUBBAN.points,
                plusMinus: latest.subban.stats.plusMinus + STATS_OFFSET.SUBBAN.plusMinus
            },
            team: {},
            votes: ko.observable(pollTotal.subban.votes)
        },
        weber : {
            stats: {
                played: latest.weber.stats.played + STATS_OFFSET.WEBER.played,
                goals: latest.weber.stats.goals + STATS_OFFSET.WEBER.goals,
                assists: latest.weber.stats.assists + STATS_OFFSET.WEBER.assists,
                points: latest.weber.stats.points + STATS_OFFSET.WEBER.points,
                plusMinus: latest.weber.stats.plusMinus + STATS_OFFSET.WEBER.plusMinus
            },
            team: {},
            votes: ko.observable(pollTotal.weber.votes)
        }
    };

    stats.seasons.unshift(latest);
    stats.seasons.push(total);
    ko.applyBindings(stats);
    stats.isDataLoaded(true);
});

// Helpers

function fetch (url) {
    return $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
    });
}

function mapPlayerDataToArray (json) {
    var seasons = json[0].people[0].stats[0].splits;
    var i = seasons.length - 1;
    var cur = seasons[i];
    while(cur.league.name !== "National Hockey League") {
        cur = seasons[i - 1];
        i--;
    }
    cur = cur.stat;
    return {
        played: cur.games,
        goals: cur.goals,
        assists: cur.assists,
        points: cur.points,
        plusMinus: cur.plusMinus
    };
}

function mapLeagueRegDataToArray (json, confIndex, teamId) {


    var stats = json[0].records[confIndex].teamRecords;
    var teamStats = stats.filter(function(team) {
        return team.team.id === teamId;
    })[0];
    var record = teamStats.leagueRecord;
    return {
        wins: record.wins,
        losses: record.losses,
        otLosses: record.ot,
        points: teamStats.points,
        status: ''
    };
}

function mapPollToObject (votesA, votesB, offsetA, offsetB) {
    var votesSubban = votesA - offsetA;
    var votesWeber = votesB - offsetB;
    var percentSubban = votesSubban / (votesSubban + votesWeber) * 100;
    percentSubban = Math.round(percentSubban.toFixed(2));

    return {
        subban: {
            votes: {
                votes: votesSubban,
                percent: percentSubban
            }
        },
        weber: {
            votes: {
                votes: votesWeber,
                percent: 100 - percentSubban
            }
        }
    }
}