package hql.common.utils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

/**
 * json过滤器
 * @author Administrator
 *
 */
public class JsonFilterValueProcessor implements JsonValueProcessor {

    private String[] properties; //需要留下的字段

    private Class<?> clazz;    //需要做处理的复杂属性类型
    
    public JsonFilterValueProcessor(String[] properties, Class<?> clazz) {
        this.properties = properties;
        this.clazz = clazz;
    }
    
	@Override
	public Object processArrayValue(Object arg0, JsonConfig arg1) {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public Object processObjectValue(String s, Object o, JsonConfig jsonConfig) {
		PropertyDescriptor pd = null;
        Method method = null;
        StringBuffer json = new StringBuffer("{");
        try{
            for(int i=0;i<properties.length;i++){
                pd = new PropertyDescriptor(properties[i], clazz);
                method = pd.getReadMethod();
                String v = String.valueOf(method.invoke(o));
                json.append("'"+properties[i]+"':'"+v+"'");
                json.append(i != properties.length-1?",":"");
            }
            json.append("}");
        }catch (Exception e) {
            e.printStackTrace();
        }
        return JSONObject.fromObject(json.toString());
	}

}
