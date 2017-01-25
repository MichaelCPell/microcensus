console.log(data)

document.getElementById("address").innerHTML = data["address"];
document.getElementById("radius").innerHTML = data["radius"];

document.getElementById("total-families").innerHTML = data["Total Families"];
document.getElementById("total-families-poverty").innerHTML = data["Total Families Below Poverty"];






var totalFamiliesWithSchoolchildren =
  (data["married_family_children_5_to_17"] + data["single_dad_children_5_to_17"] + data["single_mom_children_5_to_17"])

document.getElementById("total-families-poverty-with-schoolchildren").innerHTML = totalFamiliesWithSchoolchildren;

document.getElementById("two-parent-poverty-with-schoolchildren").innerHTML = data["married_family_children_5_to_17"];

document.getElementById("single-dad-poverty-with-schoolchildren").innerHTML = data["single_dad_children_5_to_17"]

document.getElementById("single-mom-poverty-with-schoolchildren").innerHTML = data["single_mom_children_5_to_17"]
