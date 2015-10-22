package hql.common.utils;

import java.util.Calendar;

public class CalendarUtil {
	
	public static  Calendar cal = Calendar.getInstance();
	
	public static int getDay()
	{
		return cal.get(Calendar.DATE);
	}
	public static  int getMonth()
	{
		return cal.get(Calendar.MONTH)+1;	
	}
	
	public static int getYear()
	{
		return cal.get(Calendar.YEAR);
	}

}
