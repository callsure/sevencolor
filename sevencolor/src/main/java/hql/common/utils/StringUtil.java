package hql.common.utils;

import java.util.ArrayList;
import java.util.List;

public class StringUtil {
	/**
	 * 判断字符串是否为空或者为空值
	 * @param tmp
	 * @return
	 */
	public static boolean isEmpty(String tmp) {
		if (tmp == null || "".equals(tmp))
			return true;
		return false;
	}

	/**
	 * 切割以"，"分隔的字符串，以String数组形式放回
	 * @param str
	 * @return
	 */
	public static List<String> splitStringToStringList(String str){
		List<String> list = new ArrayList<String>();
		String s[] = str.split(",");
		for(int i=0;i<s.length;i++)
			if(!isEmpty(s[i]))
				list.add(s[i]);
		return list;
	}
	/**
	 * 切割以"，"分隔的字符串，以Int数组形式放回
	 * @param str
	 * @return
	 */
	public static List<Integer> splitStringToIntList(String str){
		List<String> list = splitStringToStringList(str);
		List<Integer> ilist = new ArrayList<Integer>();
		try{
			for(int i=0;i<list.size();i++){
				ilist.add(Integer.parseInt(list.get(i)));
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return ilist;
	}
}
