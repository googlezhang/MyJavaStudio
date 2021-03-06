/*
 * 日期相关的工具 
 * author: XuJijun
 */

/**
 * 返回ISO格式的日期字符串（去掉时分秒）
 * 如："2016-09-22T08:37:43.438Z" --> "2016-09-22"
 */
Date.prototype.toIsoDateString = function() {
	return this.toISOString().slice(0,-14);
};

/**
 * 返回一个加上days天的新Date
 */
Date.prototype.plusDays = function(days) {
	return new Date(this.getTime() + days*60*60*24*1000);
};

/**
 * 返回一个减去days天的新Date
 */
Date.prototype.minusDays = function(days) {
	return new Date(this.getTime() - days*60*60*24*1000);
};

/**
 * 返回一个加上若干个月的新Date
 * 注1：Date(2-28).plusMonth(1)=Date(3-28)。如果需要变成3-31，需要另外的函数来处理。
 * 注2：Date(1-31).plusMonth(1)=Date(2-28)或Date(2-29)
 */
Date.prototype.plusMonths = function(num) {
	var newDate = new Date(this);
	newDate.setMonth(this.getMonth() + num); //setMonth()会自动除以12
	//注意：此时，月数可能会自动进位，比如：1-31加上num=1的情况，会变成3-3（非闰年）或3-2（闰年），即2-31自动转换为下个月的某一天。
	
	var currentMonth = this.getMonth() + this.getFullYear() * 12; //获得月的绝对值
	var diff = (newDate.getMonth() + newDate.getFullYear() * 12) - currentMonth; //计算新旧两个月绝对值的差

	if (diff != num) { //如果月绝对值的差和加上的月数不一样，说明月进位了，此时需要退一个月
		//setDate(0)表示变成上个月的最后一天
	    newDate.setDate(0);
	}
		
	return newDate;	
};

/**
 * 返回下个月的第一天的Date对象
 */
Date.prototype.getStartOfNextMonth = function(){
	var newDate = new Date(this);
	newDate.setDate(15); //确保月数不会进位
	newDate.setMonth(this.getMonth()+1);
	newDate.setDate(1);
	return newDate;
} 

/**
 * 返回下个月的最后一天的Date对象
 */
Date.prototype.getEndOfNextMonth = function(){
	var newDate = new Date(this);
	newDate.setDate(15); //确保月数不会进位
	newDate.setMonth(this.getMonth() + 2); //加两个月
	newDate.setDate(0); //再退回上个月的最后一天
	return newDate;
}

