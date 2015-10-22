package hql.common.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
/**
 * json转换工具
 */
public class JsonUtil {

	/**
     * 将Object对象转化为json文本
     */
	public static String toStringFromObject(final Object o){
		JSONObject jsonObject = JSONObject.fromObject(o);
		return jsonObject.toString();
	}
	
	/**
     * 将List对象序列化为JSON文本
     */
    public static <T> String toJSONString(List<T> list)
    {
        JSONArray jsonArray = JSONArray.fromObject(list);

        return jsonArray.toString();
    }
    
    /**
     * 将JSON对象数组序列化为JSON文本
     * @param jsonArray
     * @return
     */
    public static String toJSONString(JSONArray jsonArray)
    {
        return jsonArray.toString();
    }
    
    /**
     * 将JSON对象序列化为JSON文本
     * @param jsonObject
     * @return
     */
    public static String toJSONString(JSONObject jsonObject)
    {
        return jsonObject.toString();
    }
    
    /**
     * 将Object对象转换为List对象
     * @param object
     * @return
     */
    public static List toArrayList(Object object)
    {
        List arrayList = new ArrayList();

        JSONArray jsonArray = JSONArray.fromObject(object);

        Iterator it = jsonArray.iterator();
        while (it.hasNext())
        {
            JSONObject jsonObject = (JSONObject) it.next();

            Iterator keys = jsonObject.keys();
            while (keys.hasNext())
            {
                Object key = keys.next();
                Object value = jsonObject.get(key);
                arrayList.add(value);
            }
        }

        return arrayList;
    }
    
    /***
     * 将Object对象转换为Collection对象
     * @param object
     * @return
     */
    public static Collection toCollection(Object object)
    {
        JSONArray jsonArray = JSONArray.fromObject(object);

        return JSONArray.toCollection(jsonArray);
    }
    
    /***
     * 将Object对象转换为jsonArray
     * @param object
     * @return
     */
    public static JSONArray toJSONArray(Object object)
    {
        return JSONArray.fromObject(object);
    }
	
	/**
	 * 将Object对象转化为jsonArray(过滤某些字段)
	 */
	public static String toString(final Object o, final String... fields){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setExcludes(fields);
		JSONArray jsonArray = JSONArray.fromObject(o, jsonConfig);
		return jsonArray.toString();
	}
	
	/**
     * 将对象转换为JSON对象
     * @param object
     * @return
     */
	public static JSONObject toJSONObject(Object object)
    {
        return JSONObject.fromObject(object);
    }
	
	/***
     * 将对象转换为HashMap
     * @param object
     * @return
     */
    public static HashMap toHashMap(Object object)
    {
        HashMap<String, Object> data = new HashMap<String, Object>();
        JSONObject jsonObject = JsonUtil.toJSONObject(object);
        Iterator it = jsonObject.keys();
        while (it.hasNext())
        {
            String key = String.valueOf(it.next());
            Object value = jsonObject.get(key);
            data.put(key, value);
        }

        return data;
    }
	
	/**
	 * 将操作结果提示转化为json字符串(成功)
	 */
	public static String toRes(String msg, Map<String, Object>... res){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", true);
		map.put("msg", msg);
		if(res != null && res.length > 0){
			map.putAll(res[0]);
		}
		return JsonUtil.toStringFromObject(map);
	}
	
	/**
	 * 将操作结果提示转化为json字符串(失败)
	 * @param msg
	 * @param res
	 * @return
	 */
	public static String toResOfFail(String msg, Map<String, Object>... res){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", false);
		map.put("msg", msg);
		if(res != null && res.length > 0){
			map.putAll(res[0]);
		}
		return JsonUtil.toStringFromObject(map);
	}
	
	/**
	 * 转化json并格式化日期
	 * @param o
	 * @param pattern 日期
	 * @return
	 */
	public static String toStringFormatDate(Object o, String pattern){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor(pattern));
		JSONObject jsonObject = JSONObject.fromObject(o, jsonConfig);
		return jsonObject.toString();
	}
	
	/**
	 * 转化json并格式化日期，并且解决要转换的对象包含自身对象时问题
	 * @param o
	 * @param pattern 日期
	 * @return
	 */
	public static String toStringFormatDateVO(Object o, String pattern){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor(pattern));
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		JSONObject jsonObject = JSONObject.fromObject(o, jsonConfig);
		return jsonObject.toString();
	}
	
	/**
	 * 转化json数组并格式化日期
	 * @param o
	 * @param pattern 日期
	 * @return
	 */
	public static String toArrayFormatDate(Object o, String pattern){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor(pattern));
		JSONArray jsonArray = JSONArray.fromObject(o, jsonConfig);
		return jsonArray.toString();
	}
	
	/**
	 * 将Object对象转化为json对象(要留下某些字段)
	 */
	public static String toStringPreventCycleFormatDate(Object o,
			Class<?> clazz, String[] properties, String datePattern) {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(clazz,
				new JsonFilterValueProcessor(properties, clazz));
		jsonConfig.registerJsonValueProcessor(Date.class,
				new JsonDateValueProcessor(datePattern));
		JSONObject jsonObject = JSONObject.fromObject(o, jsonConfig);
		return jsonObject.toString();
	}
	
}
