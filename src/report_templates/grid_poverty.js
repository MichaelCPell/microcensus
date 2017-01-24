console.log(data)

document.getElementById("address").innerHTML = data["address"];
document.getElementById("radius").innerHTML = data["radius"];

document.getElementById("total-families").innerHTML = data["Total Families"];
document.getElementById("total-families-poverty").innerHTML = data["Total Families Below Poverty"];



document.getElementById("two-parent-poverty-with-schoolchildren").innerHTML = data["Married Family - Children under 18"] - data["Married Family - Children under 18 - under 5"];


var totalFamiliesWithSchoolchildren =
  (data["Married Family - Children under 18"] - data["Married Family - Children under 18 - under 5"])
  + (data["Single Dad - Children under 18"] - data["Single Dad - Children under 18 - under 5"])
  + (data["Single Mom - Children under 18"] = data["Single Mom - Children under 18 - under 5"])

document.getElementById("total-families-poverty-with-schoolchildren").innerHTML = totalFamiliesWithSchoolchildren;

document.getElementById("single-dad-poverty-with-schoolchildren").innerHTML = data["Single Dad - Children under 18"] - data["Single Dad - Children under 18 - under 5"];


document.getElementById("single-mom-poverty-with-schoolchildren").innerHTML = data["Single Mom - Children under 18"] = data["Single Mom - Children under 18 - under 5"];
