/*---MY PERSONAL DATA--*/

var bio = {
	"name": "Marco GUDINI",
	"role": "Logistics & Transports Specialist",
	"contacts": {
		"mobile": "+39 338 4134834",
		"email": "marcogudini@gmail.com",
		"github": "marcogudini",
		"twitter": "marcogudini",
		"location": "Terni"
	},
	"welcomeMessage": "HTML5 Rocks!!",
	"skills": [
		"WEB DEVELOPMENT","GRAPHIC DESIGN","DATA ANALYSIS","MANAGEMENT"
	],
	"bioPic": "images/me.jpg"
};

var education = {
	"schools": [
		{
			"name": "Università degli studi di Perugia",
			"degree": "MD in Economics & Management",
			"dates": 2013,
			"location": "Via Alessandro Pascoli, 06123 Perugia",
			"majors": "CS"
		},
		{
			"name": "Università degli studi di Perugia",
			"degree": "BD in Business Economics",
			"dates": 2012,
			"location": "Via Alessandro Pascoli, 06123 Perugia",
			"majors": "CS"
		}
	],
	"onlineCourses": [
		{
			"title": "Front-End Web Developer Nanodegree",
			"school": "Udacity Inc.",
			"dates": 2015,
			"url": "www.udacity.com"
		}
	]
};

var work = {
	"jobs": [
		{
			"employer": "Gefco Italy",
			"title": "Logistics & Transports Specialist",
			"location": "Strada Provinciale 15a, 79, Bivio di Capanelle RM",
			"dates": "Dec 2014 - Present",
			"description":"<ul><li>- Managing Nissan and Renault spare parts logistics and transports</li><li>- Organising the work of 20 warehousemen</li><li>- Monitoring KPI and elaborating big amounts of data to optimise warehouse logistics</li><li>- Developing logistics projects in collaboration with company suppliers</li><li>- Planning packing materials supplying</li><li>- Enhancing customer satisfaction through After Sales assistance for 1140 dealers</li></ul>"
		},
		{
			"employer": "Google Scholarship",
			"title": "Digital Consultant",
			"location": "Largo Don Giovanni Minzoni, 6, 05100 Terni TR",
			"dates": "Sep 2014 - Dec 2014",
			"description":"<ul><li>- Helped SMBs to understand the importance of web through digital strategy development and websites improvement </li><li>- Deepened Google Analytics and Webmaster Tools</li><li>- Mastered website development, UX & UI design</li><li>- Held meetings for SMBs on Digital Marketing, Social Media & SEO optimisation</li></ul>"
		},
		{
			"employer": "Indesit Company",
			"title": "Product Analyst",
			"location": "Viale A. Merloni, 47, 60044 Fabriano AN",
			"dates": "Feb 2014 - Aug 2014",
			"description":"<ul><li>- Managed an outsourcing project related to Laundry BU</li><li>- Developed an eCommerce platform business plan for custom washing machines and washer dryers</li><li>- Studied markets through deep data analysis</li><li>- Supported the marketing team ineveryday activities</li><li>- Realised and presented many product benchmarking</li></ul>"
		}
	]
};

var projects = {
	"projects": [
		{
			"title": "Nokia University Program",
			"dates": "Mar-Jul 2014",
			"description":"I took part, with other two students, to the Nokia University Program, a challenge between students. The purpose of the challenge was to invent a new smartphone application. We have created an app called Cardiobeat",
			"image": "images/cardiobeat.png"
		}
	],
};




/*--- BIO ---*/

bio.display = function() {

	// GENERAL INFO

	var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
	$("#header").prepend(formattedRole);

	var formattedName = HTMLheaderName.replace("%data%", bio.name);
	$("#header").prepend(formattedName);

	var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic);
	$("#header").append(formattedBioPic);

	var formattedWelcome = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
	$("#header").append(formattedWelcome);

	// SKILLS

	$("#header").append(HTMLskillsStart);

	for (skill in bio.skills) {

		var formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
		$("#skills").append(formattedSkill);
	};

	// CONTACTS TOP & FOOTERS

	var formattedMobile = HTMLcontactGeneric.replace("%contact%", "mobile");
	formattedMobile = formattedMobile.replace("%data%", bio.contacts.mobile);
	$("#topContacts").append(formattedMobile);
	$("#footerContacts").append(formattedMobile);

	var formattedEmail = HTMLcontactGeneric.replace("%contact%", "email");
	formattedEmail = formattedEmail.replace("%data%", bio.contacts.email);
	$("#topContacts").append(formattedEmail);
	$("#footerContacts").append(formattedEmail);

	var formattedTwitter = HTMLcontactGeneric.replace("%contact%", "twitter");
	formattedTwitter = formattedTwitter.replace("%data%", bio.contacts.twitter);
	$("#topContacts").append(formattedTwitter);
	$("#footerContacts").append(formattedTwitter);

	var formattedGithub = HTMLcontactGeneric.replace("%contact%", "github");
	formattedGithub = formattedGithub.replace("%data%", bio.contacts.github);
	$("#topContacts").append(formattedGithub);
	$("#footerContacts").append(formattedGithub);

	var formattedLocation = HTMLcontactGeneric.replace("%contact%", "location");
	formattedLocation = formattedLocation.replace("%data%", bio.contacts.location);
	$("#topContacts").append(formattedLocation);
	$("#footerContacts").append(formattedLocation);
};	


bio.display();

/*--- WORK EXPERIENCE ---*/

work.display = function() {

	for (job in work.jobs) {

		$("#workExperience").append(HTMLworkStart);

		var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
		var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
		var formattedEmployerTitle = formattedEmployer + formattedTitle;
		$(".work-entry:last").append(formattedEmployerTitle);


		var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
		$(".work-entry:last").append(formattedDates);

		var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
		$(".work-entry:last").append(formattedLocation);

		var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
		$(".work-entry:last").append(formattedDescription);
	};
};

work.display();

/*--- PROJECTS ---*/

projects.display = function() {

	for (project in projects.projects) {

		$("#projects").append(HTMLprojectStart);

		var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
		$(".project-entry:last").append(formattedTitle);

		var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
		$(".project-entry:last").append(formattedDates);

		var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
		$(".project-entry:last").append(formattedDescription);

		var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].image);
		$(".project-entry:last").append(formattedImage);
	}
};

projects.display();

/*--- EDUCATION ---*/

education.display = function() {

	for (school in education.schools) {

		$("#education").append(HTMLschoolStart);

		var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name);
		var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
		var formattedNameDegree = formattedName + formattedDegree;
		$(".education-entry:last").append(formattedNameDegree);


		var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
		$(".education-entry:last").append(formattedSchoolDates);

		var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
		$(".education-entry:last").append(formattedSchoolLocation);

		var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors);
		$(".education-entry:last").append(formattedSchoolMajor);
	};

	//ONLINE EDUCATION
	$("#education").append(HTMLonlineClasses);

	for (course in education.onlineCourses) {
		$("#education").append(HTMLschoolStart);

		var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
		var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
		var formattedOnlineTitleSchool = formattedOnlineTitle + formattedSchool;
		$(".education-entry:last").append(formattedOnlineTitleSchool);

		var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
		$(".education-entry:last").append(formattedOnlineDates);

		var formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);
		$(".education-entry:last").append(formattedURL);
	};
};

education.display();


// SHOW A MAP ON MY RESUME

$('#mapDiv').append(googleMap);



// SKILLS CHART

var gage = {
  init: function(){
      // restart used for demo purposes - change to $('.gage').each(function(i){
    $('.chart span').css({"width" : "0"}).parent().each(function(i){
      // Loop through .gage elements
      $('p', this).html($(this).attr("data-label"));
      // Set p html value to the data-label attr set in the element
      var timeout = parseInt(i) * 60 + 1100;
      // Set a timeout based on the iteration multiplied by 60 (will affect delay between animations)
      $('span', this).delay(timeout).animate({"opacity" : "1"}, 0, function(){
        //Delay
        $(this).css({"width" : $(this).parent().attr("data-level") + "%"});
      });
    });
  }
}

$(document).ready(function(){
  // Call gage init function
  gage.init();
  // Interval used for demo purposes - remove if using
  setInterval(function() {
      gage.init();
  }, 5000);
});