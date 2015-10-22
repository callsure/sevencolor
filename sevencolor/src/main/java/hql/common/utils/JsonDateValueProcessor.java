package hql.common.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

/**
 * json日期格式处理
 */
public class JsonDateValueProcessor implements JsonValueProcessor {
	
	public static final String Default_DATE_PATTERN = "yyyy-MM-dd";
	private DateFormat dateFormat;
	
	public JsonDateValueProcessor(String datePattern){
		try {
			dateFormat = new SimpleDateFormat(datePattern);
		} catch (Exception e) {
			dateFormat = new SimpleDateFormat(Default_DATE_PATTERN);
		}
	}

	@Override
	public Object processArrayValue(Object o, JsonConfig arg1) {
		return process(o);
	}

	@Override
	public Object processObjectValue(String arg0, Object o, JsonConfig arg2) {
		return process(o);
	}
	
	private Object process(Object o){
		if(o == null){
			return "";
		}else{
			return dateFormat.format((Date)o);
		}
	}

}
