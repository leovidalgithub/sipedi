function shareDataFtry() {
	var data = [];
	return {
		    setData: function (key, data) {
		        data[key] = data;
		    },
		    getData: function (key) {
		        return data[key];
		    }
	}
};

module.exports = shareDataFtry;
