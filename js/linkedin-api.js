jQuery(document).ready(function($) {
    displayProfiles(profiles);
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
function displayProfiles(profiles) {
    var projects = profiles.values[0].projects.values,
        linkedinLink = profiles.values[0]._key;

    var template = Handlebars.compile( $('#projectsTemplate').html() );
    
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

            buffer += options.fn(item);
        }
        // return the finished buffer
        return buffer;
    });

    $('#projects').empty().append(template(projects));

    //console.log(projects);
}
function displayProfilesErrors(error) {
    console.log(error);
}