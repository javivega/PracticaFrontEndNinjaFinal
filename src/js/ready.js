var $ = require('jquery');
var commentsManager = require('./commentsManager');
var datesManager = require('./dates-manager');
require('./noframework.waypoints.min');


$(document).ready(function () {
    
    
    

    var waypoint = new Waypoint({
        element: document.getElementById('js--comments-section')
        , handler: function (direction) {
            if (direction == "down") {
                this.element.classList.add("comment-shown");
                commentsManager.loadComments();
            }
            else {
                this.element.classList.remove("comment-shown");
            }
        }
        , offset: 800
    })
    

    
    
});
