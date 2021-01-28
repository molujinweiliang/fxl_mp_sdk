const store = {
	save: function(key, value) {
		wx.setStorageSync(key, value);
	},
	get: function(key,isObject) {
		return isObject ? JSON.parse(wx.getStorageSync(key)) : wx.getStorageSync(key);
	}
};
export default store;
