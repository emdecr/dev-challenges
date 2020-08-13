const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("../raw_data.csv")
  .pipe(csv())
  .on("data", data => results.push(data))
  .on("end", () => {
    // Calculate a count for each unique value in a column
    var tempResult = {};

    for (let { case_category } of results)
      tempResult[case_category] = {
        case_category,
        count: tempResult[case_category]
          ? tempResult[case_category].count + 1
          : 1
      };

    let finalCount = Object.values(tempResult);

    let finalAlphabetical = finalCount.sort(function(a, b) {
      var textA = a.case_category.toUpperCase();
      var textB = b.case_category.toUpperCase();
      return textA.localeCompare(textB);
    });

    // console.log("The count for each category is:", finalAlphabetical);

    // Find the min (earliest) and max (latest) values for each case_category

    let datesArray = finalAlphabetical.map(obj => {
      let rObj = {};
      rObj["case_category"] = obj.case_category;
      let byCategory = results.filter(
        c => c.case_category == obj.case_category
      );
      let dates = byCategory.map(c => c.case_date);
      var min = dates.reduce(function(a, b) {
        return a < b ? a : b;
      });
      var max = dates.reduce(function(a, b) {
        return a > b ? a : b;
      });
      rObj["earliest"] = min;
      rObj["latest"] = max;
      return rObj;
    });

    // console.log(
    //   "The earliest and latest case for each category is:",
    //   datesArray
    // );

    // Final summary

    let summaryArray = finalAlphabetical.map(obj => {
      let rObj = {};
      rObj["case_category"] = obj.case_category;
      rObj["count"] = obj.count;
      let byCategory = results.filter(
        c => c.case_category == obj.case_category
      );
      let dates = byCategory.map(c => c.case_date);
      var min = dates.reduce(function(a, b) {
        return a < b ? a : b;
      });
      var max = dates.reduce(function(a, b) {
        return a > b ? a : b;
      });
      rObj["earliest"] = min;
      rObj["latest"] = max;
      return rObj;
    });

    console.log("Summary:", summaryArray);
  });
