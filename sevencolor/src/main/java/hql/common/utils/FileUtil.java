package hql.common.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
/**
 * 文件上传工具类
 * @author yangsg
 *
 */
public class FileUtil {

	public static void copyFile(File source, File destiny){
		FileInputStream fis = null;	
		BufferedInputStream bis = null;
		FileOutputStream fos = null;
		BufferedOutputStream bos = null;
		
		try {
			fis = new FileInputStream(source);
			bis = new BufferedInputStream(fis);
			
			fos = new FileOutputStream(destiny);
			bos = new BufferedOutputStream(fos);
			
			byte[] b = new byte[2048];
			int len = bis.read(b);
			while(len >= 0){
				bos.write(b, 0, len);
				len = bis.read(b);
			}
			bos.flush();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			try {
				if(fis != null){
					fis.close();
				}
				if(fos != null){
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
	}
	/**
	 * 根据年月日创建文件夹
	 * @return
	 */
	public static String makeDirByDate() {
		StringBuffer uploadPath = new StringBuffer();
		uploadPath.append(CalendarUtil.getYear()).append("/").append(CalendarUtil.getMonth()).append("/").append(CalendarUtil.getDay());
		//从配置文件中读取
		File file = new File(ConfigUtil.get("uploadPath") + uploadPath.toString());
		file.mkdirs();
		uploadPath.append("/");
		return uploadPath.toString();
	}
	
	/**
	 * 根据年月日创建文件夹
	 * @return
	 */
	public static String makeDirByDate(String servletContextPath) {
		StringBuffer uploadPath = new StringBuffer();
		uploadPath.append(CalendarUtil.getYear()).append("/").append(CalendarUtil.getMonth()).append("/").append(CalendarUtil.getDay());
		//从配置文件中读取
		File file = new File(servletContextPath + uploadPath.toString());
		file.mkdirs();
		uploadPath.append("/");
		return uploadPath.toString();
	}

	/**
	 * 获取文件扩展名
	 * @param filename
	 * @return
	 */
	public static String getExtensionName(String filename) {
		if ((filename != null) && (filename.length() > 0)) {
			int dot = filename.lastIndexOf('.');
			if ((dot > -1) && (dot < (filename.length() - 1))) {
				return filename.substring(dot + 1);
			}
		}
		return filename;
	}

	/**
	 * 获取不带扩展名的文件名
	 * @param filename
	 * @return
	 */
	public static String getFileNameNoEx(String filename) {
		if ((filename != null) && (filename.length() > 0)) {
			int dot = filename.lastIndexOf('.');
			if ((dot > -1) && (dot < (filename.length()))) {
				return filename.substring(0, dot);
			}
		}
		return filename;
	}
}
