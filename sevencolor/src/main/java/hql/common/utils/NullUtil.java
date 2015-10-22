package hql.common.utils;
/**
 * 判断是否为空
 */
public class NullUtil {
	/**
	 * 空的返回true
	 */
	 public static boolean isEmpty(String s){
		 if(null == s || "".equals(s) || "".equals(s.trim()) || "null".equalsIgnoreCase(s)){
			 return true;
		 }else{
			 return false;
		 }
	 }
	/**
	 * 空的返回false
	 */
	 public static boolean isNotEmpty(String s){
		 if(null == s || "".equals(s) || "".equals(s.trim()) || "null".equalsIgnoreCase(s)){
			 return false;
		 }else{
			 return true;
		 }
	 }
}
