function visual(){
	

	am4core.ready(function() {
									
		// Themes begin
		am4core.useTheme(am4themes_dark);
		am4core.useTheme(am4themes_animated);
    	// Themes end
    
    	// Create chart instance
    	var chart = am4core.create("chartdiv3", am4charts.XYChart);
	
		var title = chart.titles.push(new am4core.Label());
		title.text = "Over/Under";
		title.fontSize = 20;
		title.marginBottom = 10;

		var user_email = localStorage.getItem("user_Email");
		var db = firebase.firestore();

		var logEntertainment;
		var logHousing;
		var logUtilities;
		var logFood;
		var logTransportation;
		var logEducation;
		var logLoans;
		var logChildCare;
		var logSavings;
		var recEntertainment;
		var recHousing;
		var recUtilities;
		var recFood;
		var recTransportation;
		var recEducation;
		var recLoans;
		var recChildCare;
		var recSavings;

		
		db.collection(user_email).doc("Budget").get().then(function(doc) {
			overallBudget = doc.data().overallBudget;
			selfRecommended = doc.data().selfRecommend;

			logEntertainment = doc.data().entertainment;
			logHousing = doc.data().housing;
			logUtilities = doc.data().utilities;
			logFood = doc.data().food;
			logTransportation = doc.data().transportation;
			logEducation = doc.data().education;
			logLoans = doc.data().loan_repayment;
			logChildCare = doc.data().child_care;
			logSavings = doc.data().savings;

			if(selfRecommended == 0) {
				recEntertainment = overallBudget * 0.10;
				recHousing = overallBudget * 0.35;
				recUtilities = overallBudget * 0.05;
				recFood = overallBudget * 0.20;
				recTransportation = overallBudget * 0.05;
				recEducation = overallBudget * 0.10;
				recLoans = overallBudget * 0.05;
				recChildCare = overallBudget * 0.05;
				recSavings = overallBudget * 0.05;

				// Add data
				chart.data = [{
					"category": "Entertainment",
					"value": recEntertainment-logEntertainment
					}, {
					"category": "Housing",
					"value": recHousing-logHousing
					}, {
					"category": "Utilities",
					"value": recUtilities-logUtilities
					}, {
					"category": "Food",
					"value": recFood-logFood
					}, {
					"category": "Transportation",
					"value": recTransportation-logTransportation
					}, {
					"category": "Education",
					"value": recEducation-logEducation
					}, {
					"category": "Loan Repayment",
					"value": recLoans-logLoans
					}, {
					"category": "Child Care",
					"value": recChildCare-logChildCare
					}, {
					"category": "Savings",
					"value": recSavings-logSavings
				}];
			}
			else {
				db.collection(user_email).doc("Recommendations").get().then(function(doc) {
					recEducation = doc.data().Education*overallBudget/100;
					recEntertainment = doc.data().Entertainment*overallBudget/100;
					recFood = doc.data().Food*overallBudget/100;
					recHousing = doc.data().Housing*overallBudget/100;
					recLoans = doc.data().Loans*overallBudget/100;
					recSavings = doc.data().Savings*overallBudget/100;
					recTransportation = doc.data().Transportation*overallBudget/100;
					recUtilities = doc.data().Utilities*overallBudget/100;
					recChildCare = doc.data().ChildCare*overallBudget/100;

					// Add data
					chart.data = [{
						"category": "Entertainment",
						"value": recEntertainment-logEntertainment
						}, {
						"category": "Housing",
						"value": recHousing-logHousing
						}, {
						"category": "Utilities",
						"value": recUtilities-logUtilities
						}, {
						"category": "Food",
						"value": recFood-logFood
						}, {
						"category": "Transportation",
						"value": recTransportation-logTransportation
						}, {
						"category": "Education",
						"value": recEducation-logEducation
						}, {
						"category": "Loan Repayment",
						"value": recLoans-logLoans
						}, {
						"category": "Child Care",
						"value": recChildCare-logChildCare
						}, {
						"category": "Savings",
						"value": recSavings-logSavings
					}];
				}).catch(function(error) {
					console.log("Error getting document:", error);
				}); //nested db.collection call
			}
		
		
			// Create axes
			var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "category";
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.minGridDistance = 20;
			categoryAxis.renderer.axisFills.template.disabled = false;
			categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;
			
			
			var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
			valueAxis.min = -overallBudget/2;
			valueAxis.max = overallBudget/2;
			valueAxis.renderer.minGridDistance = 50;
			valueAxis.renderer.ticks.template.length = 5;
			valueAxis.renderer.ticks.template.disabled = false;
			valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
			valueAxis.renderer.labels.template.adapter.add("text", function(text) {
			return text == "Male" || text == "Female" ? text : text + "";
			})
			
			
			// Create series
			function createSeries(field, name) {
				var series = chart.series.push(new am4charts.ColumnSeries());
				series.dataFields.valueX = field;
				series.dataFields.categoryY = "category";
				series.stacked = true;
				series.name = name;
				series.stroke = am4core.color("#5a5");
				series.fill = am4core.color("#5a5");
				series.columns.template.adapter.add("fill", function(fill, target) {
					if (target.dataItem && (target.dataItem.valueX < 0)) {
					return am4core.color("#a55");
					}
					else {
					return fill;
					}
				});
				series.columns.template.adapter.add("stroke", function(stroke, target) {
					if (target.dataItem && (target.dataItem.valueX < 0)) {
					return am4core.color("#a55");
					}
					else {
					return stroke;
					}
				});

				series.columns.template.tooltipText = "{categoryY}\n[bold]${valueX}";
				series.columns.template.alwaysShowTooltip = false;
				series.columns.template.tooltipY = 12;
				
				var label = series.bullets.push(new am4charts.LabelBullet);
				label.label.text = "{valueX}";
				label.label.fill = am4core.color("#fff");
				label.label.strokeWidth = 0;
				label.label.truncate = false;
				label.label.hideOversized = true;
				label.locationX = 0.5;

				return series;
			}
			
			createSeries("value", "Under");
			//createSeries("positive", "Over", positiveColor);
			
			
			var cellSize = 40;
			chart.events.on("datavalidated", function(ev) {
				// Get objects of interest
				var chart = ev.target;
				var categoryAxis = chart.yAxes.getIndex(0);
				// Calculate how we need to adjust chart height
				var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
				// get current chart height
				var targetHeight = chart.pixelHeight + adjustHeight;
				// Set it on chart's container
				chart.svgContainer.htmlElement.style.height = targetHeight + "px";
			});

		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
    }); // end am4core.ready()

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	am4core.ready(function() {
									
	// Themes begin
	am4core.useTheme(am4themes_dark);
	am4core.useTheme(am4themes_animated);
	// Themes end
	
	// Create chart instance
	var chart = am4core.create("chartdiv", am4charts.PieChart);

	var title = chart.titles.push(new am4core.Label());
	title.text = "Your Spending";
	title.fontSize = 20;
	title.marginBottom = 0;

	// Add data
	
	var user_email = localStorage.getItem("user_Email");
	var catEntertainment;
	var catHousingRent;
	var catUtilities;
	var catFood;
	var catTransportation;
	var catEducation;
	var catLoanRepay;
	var catChildCare;
	var catSavings;
	var overallBudget;
	
	var db = firebase.firestore();
	
	db.collection(user_email).doc("Budget").get().then(function(doc) {
		catEntertainment = doc.data().entertainment;
		catHousingRent = doc.data().housing;
		catUtilities = doc.data().utilities;
		catFood = doc.data().food;
		catTransportation = doc.data().transportation;
		catEducation = doc.data().education;
		catLoanRepay = doc.data().loan_repayment;
		catChildCare = doc.data().child_care;
		catSavings = doc.data().savings;

		if(doc.exists){
			chart.data = [ {
			"category": "Entertainment",
			"amount": catEntertainment
			}, {
			"category": "Housing",
			"amount": catHousingRent
			}, {
			"category": "Utilities",
			"amount": catUtilities
			}, {
			"category": "Food",
			"amount": catFood
			}, {
			"category": "Transportation",
			"amount": catTransportation
			}, {
			"category": "Education",
			"amount": catEducation
			}, {
			"category": "Loan Repayment",
			"amount": catLoanRepay
			}, {
			"category": "Child Care",
			"amount": catChildCare
			}, {
			"category": "Savings",
			"amount": catSavings
			} ];
			
			// Add and configure Series
			var pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = "amount";
			pieSeries.dataFields.category = "category";
			pieSeries.slices.template.stroke = am4core.color("#fff");
			pieSeries.slices.template.strokeWidth = 1;
			pieSeries.slices.template.strokeOpacity = 1;
			
			// This creates initial animation
			pieSeries.hiddenState.properties.opacity = 1;
			pieSeries.hiddenState.properties.endAngle = -90;
			pieSeries.hiddenState.properties.startAngle = -90;
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }

		}).catch(function(error) {
		    console.log("Error getting document:", error);
	});

	}); // end am4core.ready()	


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    am4core.ready(function() {
									
	// Themes begin
	am4core.useTheme(am4themes_dark);
	am4core.useTheme(am4themes_animated);
	// Themes end
	
	// Create chart instance
	var chart = am4core.create("chartdiv2", am4charts.PieChart);

	var title = chart.titles.push(new am4core.Label());
	title.text = "Our Recommendation";
	title.fontSize = 20;
	title.marginBottom = 0;

	// Add data
	
	var user_email = localStorage.getItem("user_Email");
	var overallBudget;
	var selfRecommended;
	var entertainment;
	var education;
	var food;
	var housing;
	var loans;
	var savings;
	var transportation;
	var utilities;
	var childCare;

	
	var db = firebase.firestore();

	db.collection(user_email).doc("Budget").get().then(function(doc) {
			overallBudget = doc.data().overallBudget;
			selfRecommended = doc.data().selfRecommend;
			//alert(selfRecommended);
			//alert(overallBudget);
			if(selfRecommended == 0){
				chart.data = [ {
					"category": "Entertainment",
					"amount": overallBudget * 0.10
					}, {
					"category": "Housing",
					"amount": overallBudget * 0.35
					}, {
					"category": "Utilities",
					"amount": overallBudget * 0.05
					}, {
					"category": "Food",
					"amount": overallBudget * 0.20
					}, {
					"category": "Transportation",
					"amount": overallBudget * 0.05
					}, {
					"category": "Education",
					"amount": overallBudget * 0.10
					}, {
					"category": "Loan Repayment",
					"amount": overallBudget * 0.05
					}, {
					"category": "Child Care",
					"amount": overallBudget * 0.05
					}, {
					"category": "Savings",
					"amount": overallBudget * 0.05
					} ];

			}
			else{

				db.collection(user_email).doc("Recommendations").get().then(function(doc) {
    // Document was found in the cache. If no cached document exists,
    // an error will be returned to the 'catch' block below.
		   		    education = doc.data().Education;
					entertainment = doc.data().Entertainment;
					food = doc.data().Food;
					housing = doc.data().Housing;
					loans = doc.data().Loans;
					savings = doc.data().Savings;
					transportation = doc.data().Transportation;
					utilities = doc.data().Utilities;
					childCare = doc.data().ChildCare;
					
					housing = housing / 100;
					food = food / 100;
					utilities = utilities / 100;
					savings = savings / 100;
					education = education / 100;
					entertainment = entertainment / 100;
					transportation = transportation / 100;
					loans = loans / 100;
					childCare = childCare / 100;

					chart.data = [ {
					"category": "Entertainment",
					"amount": overallBudget * entertainment
					}, {
					"category": "Housing",
					"amount": overallBudget * housing
					}, {
					"category": "Utilities",
					"amount": overallBudget * utilities
					}, {
					"category": "Food",
					"amount": overallBudget * food
					}, {
					"category": "Transportation",
					"amount": overallBudget * transportation
					}, {
					"category": "Education",
					"amount": overallBudget * education
					}, {
					"category": "Loan Repayment",
					"amount": overallBudget * loans
					}, {
					"category": "Child Care",
					"amount": overallBudget * childCare
					}, {
					"category": "Savings",
					"amount": overallBudget * savings
					} ];

				}).catch(function(error) {
			    console.log("Error getting document:", error);
				}); //nested db.collection call

			}

			var pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = "amount";
			pieSeries.dataFields.category = "category";
			pieSeries.slices.template.stroke = am4core.color("#fff");
			pieSeries.slices.template.strokeWidth = 1;
			pieSeries.slices.template.strokeOpacity = 1;
			
			// This creates initial animation
			pieSeries.hiddenState.properties.opacity = 1;
			pieSeries.hiddenState.properties.endAngle = -90;
			pieSeries.hiddenState.properties.startAngle = -90;



		console.log("Cached document data:", doc.data());
	}).catch(function(error) {
	    console.log("Error getting cached document:", error);
	}); //first db.collection call

	}); // end am4core.ready()
}
