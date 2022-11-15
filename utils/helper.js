let moment = require("moment");
module.exports = {
  format_date: function (date) {
    return (formattedDate = moment(date).format("MMMM Do YYYY"));
  },
};
