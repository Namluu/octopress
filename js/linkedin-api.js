jQuery(document).ready(function($) {
    displayProfiles(profiles, skill);
    displayAbout(profiles);
});

function onLinkedInLoad() {
    IN.Event.on(IN, "auth", onLinkedInAuth);
}
function onLinkedInAuth() {
    IN.API.Profile("http://www.linkedin.com/in/namluuduc")
    .fields("firstName", "lastName", "industry", "headline", "id", "pictureUrl", "positions", "projects")
    .result(displayProfiles)
    .error(displayProfilesErrors);
}
function displayProfiles(profiles, skill) {
    var projects = profiles.values[0].projects.values,
        linkedinLink = profiles.values[0]._key;

    var template = Handlebars.compile( $('#projectsTemplate').html() );

    var skill = [
        [skill.php, skill.mysql, skill.joomla],
        [skill.php, skill.mysql, skill.symfony],
        [skill.html5, skill.php, skill.mysql, skill.wordpress],
        [skill.html5, skill.php, skill.mysql, skill.wordpress],
        [skill.html5, skill.php, skill.mongodb, skill.wordpress, skill.symfony],
    ];

    Handlebars.registerHelper("stripes", function(array, even, odd, options) {
        var buffer = "";
            
        for (var i = 0, j = array.length; i < j; i++) {
            var item = array[i];
            // we'll just put the appropriate stripe class name onto the item for now
            item.stripeClass = (i % 2 == 0 ? even : odd);
            item.linkedinLink = linkedinLink.replace("url=", "");

            item.descriptionRaw = "- ";
            var desArray = item.description.split("- ");
            for (var k = 0, l = desArray.length; k < l; k++) {
                if (desArray[k]) {
                    item.descriptionRaw += (k == 0 || k == l - 1 ? desArray[k] : desArray[k] + "<br>- ");
                }
            }

            item.skill = skill[i];

            buffer += options.fn(item);
        }
        // return the finished buffer
        return buffer;
    });

    //console.log(projects[0]);

    $('#projects').empty().html(template(projects));

    //console.log(projects);
}
function displayAbout(profiles) {
    var data = profiles.values[0];

    var template = Handlebars.compile( $('#aboutTemplate').html() );

    // https://github.com/SparkartGroupInc/handlebars-helper/blob/master/lib/helpers/reverse.js
    Handlebars.registerHelper("reverse", function(array, options) {
        var result = '';
        for( var i = array.length - 1; i >= 0; i-- ){
            result += options.fn( array[i] );
        }
        return result;
    });

    $('#about').empty().html(template(data));
}
function displayProfilesErrors(error) {
    console.log(error);
}