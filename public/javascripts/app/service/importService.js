testsystem.factory('ImportService',function($http){
	return {
		importExcel : function(importData) {
			var fd = new FormData();
			fd.append("type", importData.type);
			fd.append("excel", new File([importData.file], "excel.xls"));
			return $http.post("/users/import", fd, {
				transformRequest : angular.identify,
				headers : {
					'Content-type' : undefined
				}
			})
		}
	}
})