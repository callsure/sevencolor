package hql.common.utils;

import java.util.ResourceBundle;

/**
 * 参数读取类
 * 
 * @author Chane
 * 
 */

public class ConfigUtil {

	private static final ResourceBundle bundle = java.util.ResourceBundle
			.getBundle("config");

	/**
	 * 通过键获取值
	 * 
	 * @param key
	 * @return
	 */
	public static final String get(String key) {
		return bundle.getString(key);
	}
}
